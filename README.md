# Bank-API

O Bank API é um projeto de API básica de um banco virtual utilizando Javascript e Express, que foi desenvolvida para o Desafio de fim de módulo do curso de back-end da Cubos Academy. Entra as funcções da API temoos, criar e deletar novas contas, editar dados da conta, realizar saque, depósitos e transferências além de fazer uma listagem com todas as contas do banco. 

## :man_mechanic: Linguagens e Ferramentas

- Javascript
- Express
- Git

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone <urlProjeto>

# 2. Instale as dependências

npm install

# 3. Execute o programa

npm run dev

```

## :sassy_man: Endpoints

- GET /contas?senha_banco=123 - Essa é a rota que será utilizada para listar todas as contas bancárias existentes.
- POST /contas - Essa é a rota que será utilizada para criar uma conta bancária
- PUT /contas/:numeroConta/usuario - Essa é a rota que será utilizada para atualizar os dados do usuário de uma conta bancária.
- DELETE /contas/:numeroConta - Essa é a rota que será utilizada para excluir uma conta bancária existente.
- POST /transacoes/depositar - Essa é a rota que será utilizada para somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.
- POST /transacoes/sacar - Essa é a rota que será utilizada para realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.
- POST /transacoes/transferir - Essa é a rota que será utilizada para para realizar a transferência de saldo de uma conta bancária para outra e registrar essa transação.
- GET /contas/saldo?numero_conta=123&senha=123 - Essa é a rota que será utilizada para retornar o saldo de uma conta bancária.
- GET /contas/extrato?numero_conta=123&senha=123 - Essa é a rota que será utilizada para listar as transações realizadas de uma conta específica.
