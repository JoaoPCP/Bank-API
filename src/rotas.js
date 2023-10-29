//const app = require('./servidor');
//const rotas = app;
const express = require('express');
const rotas = express();
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes')


rotas.get('/', (req, res) => {
    res.send('to rodando');
    return;
})
// listagem de contas bancarias
rotas.get('/contas', contas.mostrarContas);
rotas.post('/contas', contas.novaConta);
rotas.put('/contas/:numero_conta/usuario', contas.detalhesConta);
rotas.delete('/contas/:numero_conta',contas.deletarConta);
rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', transacoes.sacar);
rotas.post('/transacoes/transferir', transacoes.transferir);
rotas.get('/contas/saldo', transacoes.consultarSaldo);
rotas.get('/contas/extrato', transacoes.extrato);

module.exports = rotas;
