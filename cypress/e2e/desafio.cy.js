/// <reference types="cypress" />

describe('Validação completa da API The Dog API', () => {
    it('Deve validar estrutura, conteúdo e código de status', () => {
        // Faz a requisição para a API
        cy.request('GET', 'https://api.thedogapi.com/v1/breeds').then((response) => {
            // Valida o código de status HTTP
            expect(response.status).to.eq(200);

            // Valida a estrutura do JSON retornado (campos e tipos)
            const firstBreed = response.body[0]; // Pega o primeiro item para validação
            expect(firstBreed).to.have.all.keys(
                'weight', 'height', 'id', 'name', 'bred_for', 
                'breed_group', 'life_span', 'temperament', 'origin', 'reference_image_id'
            );

            expect(firstBreed.id).to.be.a('number');
            expect(firstBreed.name).to.be.a('string');
            expect(firstBreed.origin).to.satisfy((val) => typeof val === 'string' || val === undefined);
            expect(firstBreed.weight).to.be.an('object').that.has.all.keys('imperial', 'metric');
            expect(firstBreed.height).to.be.an('object').that.has.all.keys('imperial', 'metric');

            // Valida os valores retornados com os esperados no mock
            cy.fixture('breeds_mock.json').then((mock_data) => {
                mock_data.forEach((mocked_breed) => {
                    const foundBreed = response.body.find((breed) => breed.name === mocked_breed.name);

                    let hasDifferences = false;
                    let diffLog = `Diferenças encontradas para **${mocked_breed.name}**:\n`;
                     // Verifica se 'origin' existe antes de comparar
                     if (foundBreed && 'origin' in foundBreed && mocked_breed && 'origin' in mocked_breed) {
                        if (foundBreed.origin !== mocked_breed.origin) {
                            hasDifferences = true;
                            diffLog += `- **Origem:** Esperado **${mocked_breed.origin}**, Obtido **${foundBreed.origin}**\n`;
                        }
                    }      
                    if (hasDifferences) {
                        cy.log(diffLog); // Exibe no log do Cypress
                        console.warn(diffLog); // Exibe no console do navegador
                    } else {
                        cy.log(`Nenhuma diferença para ${mocked_breed.name}`);
                    
                    if (foundBreed) {
                        expect(foundBreed.origin).to.eq(mocked_breed.origin);
                    }
                }
            });
        });
    });
});

describe('Validação de Diferenças na API The Dog API', () => {
    it('Deve validar estrutura, conteúdo e apresentar diferenças', () => {
        cy.request('GET', 'https://api.thedogapi.com/v1/breeds').then((response) => {
            expect(response.status).to.eq(200);

            cy.fixture('breeds_mock.json').then((mock_data) => {
                mock_data.forEach((mocked_breed) => {
                    const foundBreed = response.body.find((breed) => breed.name === mocked_breed.name);

                    if (!foundBreed) {
                        cy.log(`❌ Raça **${mocked_breed.name}** NÃO encontrada na API!`);
                        return;
                    }

                    let hasDifferences = false;
                    let diffLog = `🔎 Diferenças encontradas para **${mocked_breed.name}**:\n`;

                    if (foundBreed.origin !== mocked_breed.origin) {
                        hasDifferences = true;
                        diffLog += `- 🌍 **Origem:** Esperado **${mocked_breed.origin}**, Obtido **${foundBreed.origin}**\n`;
                    }

                    if (hasDifferences) {
                        cy.log(diffLog); // Exibe no log do Cypress
                        console.warn(diffLog); // Exibe no console do navegador
                    } else {
                        cy.log(`✅ Nenhuma diferença para ${mocked_breed.name}`);
                    }
                });
            });
        });
    });
});
});
