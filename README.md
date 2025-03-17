Comparação de Versões de API com Cypress

📌 Descrição do Projeto

Este projeto tem como objetivo comparar a versão mais recente de uma API com uma versão mockada para validar a consistência dos dados. Os testes automatizados verificam:

A estrutura do projeto retornado (campos e tipos de dados);

O conteúdo das respostas (valores esperados vs. reais);

O código de status HTTP retornado;

A capacidade do script de testar múltiplas requisições automaticamente.

🛠 Tecnologias Utilizadas

Cypress para automação de testes;

Node.js para execução dos testes.

🚀 Como Configurar o Projeto

1. Clonar o repositório

$ git clone https://github.com/karlatathiane/desafio_api_cypress.git
$ cd seu-repositorio

2. Instalar as dependências

$ npm install

3. Executar os testes

Para rodar os testes no modo interativo:

$ npx cypress open

Para rodar os testes no modo headless:

$ npx cypress run

📂 Estrutura do Projeto

📦 seu-repositorio  
 ┣ 📂 cypress  
 ┃ ┣ 📂 e2e  
 ┃ ┃ ┗ 📜 desafio.cy.js  # Testes de comparação da API  
 ┃ ┣ 📂 fixtures  
 ┃ ┃ ┗ 📜 mockData.json  # Dados mockados para comparação  
 ┃ ┣ 📂 support  
 ┃ ┃ ┗ 📜 commands.js  # Comandos customizados do Cypress  
 ┣ 📜 cypress.config.js  # Configuração do Cypress  
 ┣ 📜 package.json  # Dependências do projeto  
 ┗ 📜 README.md  # Documentação  

📌 Considerações Finais

Este projeto ajuda a garantir a integridade das versões da API, verificando possíveis alterações nos dados expostos. Caso encontre divergências, o script detalha as diferenças no log dos testes.
