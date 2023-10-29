let {contas, transferencias, saques, depositos} = require('../bancodedados'); 
const {format} = require('date-fns');
function date(){
    return format(new Date(), "dd'-'MM'-'yyyy HH':'mm':'ss");
} 


const depositar = (req, res) => {
    let {numero_conta , valor} = req.body;
    numero_conta = Number(numero_conta);
    valor = Number(valor);

    if(!numero_conta || !valor){
        return res.status(400).json({mensagem: "Faltam dados na requisição"})
    }
    
    let conta = contas.find((conta) => {
        return conta.numero == numero_conta;
    })
    
    if(!conta){
        return res.status(404).json({mensagem: "Conta não encontrada"})
    }

    if(valor <= 0){
        return res.status(400).json({mensagem: "Valor de deposito invalido"})
    }

    conta.saldo = conta.saldo + valor;
    
    depositos.push({
        data: date(),
        numero_conta: numero_conta,
        valor: valor
    })

    return res.status(200).json({mensagem: "deposito feito com sucesso"});
}

const sacar = (req, res) => {
    let {numero_conta , valor, senha} = req.body;
    numero_conta = Number(numero_conta);
    valor = Number(valor);
    senha = Number(senha);
    
    if(!numero_conta || !valor || !senha){
        return res.status(400).json({mensagem: "Faltam dados na requisição"})
    }
    let conta = contas.find((conta) => {
        return conta.numero == numero_conta;
    })

    if(!conta){
        return res.status(404).json({mensagem: "Conta não encontrada"})
    }
    if(valor <= 0){
        return res.status(400).json({mensagem: "Valor de deposito invalido"})
    }
    if(conta.senha =! senha){
        return res.status(401).json({mensagem: "Senha inválida"})
    }
    if(valor > conta.saldo){
        return res.status(400).json({mensagem: "Saldo insuficiente para este saque" })
    }

    conta.saldo = conta.saldo - valor;

    saques.push({
        data: date(),
        numero_conta: numero_conta,
        valor: valor
    })

    return res.status(200).json({mensagem: "Saque realizado com sucesso"})
}

const transferir = (req, res) => {
    let {numero_conta_origem , numero_conta_destino, valor, senha} = req.body;
    numero_conta_origem = Number(numero_conta_origem);
    numero_conta_destino = Number(numero_conta_destino);
    valor = Number(valor);
    senha = Number(senha);

    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha){
        return res.status(400).json({mensagem: "Faltam dados na requisição"})
    }

    let contaOrigem = contas.find((conta) => {
        return conta.numero == numero_conta_origem;
    })
    if(!contaOrigem){
        return res.status(404).json({mensagem: "Conta não encontrada"})
    }

    let contaDestino = contas.find((conta) => {
        return conta.numero == numero_conta_destino;
    })
    if(!contaDestino){
        return res.status(404).json({mensagem: "Conta não encontrada"})
    }

    if(valor <= 0){
        return res.status(400).json({mensagem: "Valor de deposito invalido"})
    }
    if(contaOrigem.senha =! senha){
        return res.status(401).json({mensagem: "Senha inválida"})
    }

    if(valor > contaOrigem.saldo){
        return res.status(400).json({mensagem: "Saldo insuficiente para esta transação" })
    }

    contaOrigem.saldo = contaOrigem.saldo - valor;
    contaDestino.saldo = contaDestino.saldo + valor;

    transferencias.push({
        data: date(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    })

    return res.status(200).json({mensagem: " Transferencia realizado com sucesso"})
    
}

const consultarSaldo = (req, res) => {
    let {numero_conta,senha } = req.query;
    numero_conta = Number(numero_conta);
    senha = Number(senha);

    if(!numero_conta || !senha){
        return res.status(400).json({mensagem: "Faltam dados na requisição"})
    }
    let conta = contas.find((conta) => {
        return conta.numero == numero_conta;
    })

    if(!conta){
        return res.status(404).json({mensagem: "Conta não encontrada"})
    }
    
    if(conta.senha =! senha){
        return res.status(401).json({mensagem: "Senha inválida"})
    }

    return res.status(200).json({saldo: conta.saldo})
}

const extrato = (req, res) => {
    let {numero_conta,senha } = req.query;
    numero_conta = Number(numero_conta);
    senha = Number(senha);

    if(!numero_conta || !senha){
        return res.status(400).json({mensagem: "Faltam dados na requisição"})
    }
    let conta = contas.find((conta) => {
        return conta.numero == numero_conta;
    })

    if(!conta){
        return res.status(404).json({mensagem: "Conta não encontrada"})
    }
    
    if(conta.senha =! senha){
        return res.status(401).json({mensagem: "Senha inválida"})
    }

    const deposito = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    }) 

    const saque = saques.filter((saque) =>{
        return saque.numero_conta === numero_conta;
    })

    const transferenciaO = transferencias.filter((transf) => {
        return transf.numero_conta_origem === numero_conta;
    })

    const transferenciaD = transferencias.filter((transf) => {
        return transf.numero_conta_destino === numero_conta;
    })


    if(deposito == []  && saque == [] && transferencia == []){
        res.status(200).json({mensagem: "essa conta nao possui transações"})
    }
    else{
        res.status(200).json({ deposito: deposito, saques: saque, transferencias:[transferenciaO, transferenciaD] });
    }
    
}




module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    extrato,
}