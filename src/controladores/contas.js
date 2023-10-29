let {contas , banco} = require('../bancodedados'); 
let idContas = 1;

const mostrarContas = (req, res) => {
    const { senha_banco } = req.query
    if (!senha_banco || senha_banco !== banco.senha){
        return res.status(400).json({mensagem: 'Senha Inválida ou não digitada'});
    }
    if (contas.length == 0){
        return res.status(404).json({mensagem: 'Não ha contas cadastradas'});
    }
    
    return res.status(200).json(contas);
    
}

const novaConta = (req,res) => {
    const {nome , cpf, data_nascimento, telefone, email, senha} = req.body
    
    if (!nome){
        return res.status(400).json({mensagem: "Nome invalido"});
    }
    if (!cpf){
        return res.status(400).json({mensagem: "CPF invalido"});
    }
    if (!data_nascimento){
        return res.status(400).json({mensagem: "Data Invalida"});
    }
    if (!telefone){
        return res.status(400).json({mensagem: "Telefone invalido"});
    }
    if (!email){
        return res.status(400).json({mensagem: "email invalido"});
    }
    if (!senha){
        return res.status(400).json({mensagem: "senha inválida"});
    }

    const nome_rep = contas.find((usuario) => {
        return usuario.usuario.nome === nome;
    })
    if (nome_rep){
        return res.status(400).json({mensagem: "Ja existe uma conta com este nome"});
    }

    const cpf_rep = contas.find((usuario) => {
        return usuario.usuario.cpf == cpf;
    })
    if(cpf_rep){
        return res.status(400).json({mensagem: "Ja existe uma conta com este cpf"});
    }

    const email_rep = contas.find((usuario) => {
        return usuario.usuario.email == email;
    })
    if (email_rep){
        return res.status(400).json({mensagem: "Ja existe uma conta com este email"})
    }

    const conta = {
        numero: idContas++,
        saldo: 0,
        usuario: {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha
        }
    }
    contas.push(conta);
    return res.status(201).json(conta);
}

const detalhesConta = (req, res) => {
    const {numero_conta} = req.params;
    const {nome , cpf, data_nascimento, telefone, email, senha} = req.body
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    })
        if(!conta){
            return res.status(404).json({mensagem: ' Conta não encontrada'})
        }
        
        if (nome){
            conta.usuario.nome = nome;
        }
        if (cpf){
            conta.usuario.cpf = cpf;
        }
        if (data_nascimento){
            conta.usuario.data_nascimento = data_nascimento;
        }
        if (telefone){
            conta.usuario.telefone = telefone;
        }
        if (email){
            conta.usuario.email = email;
        }
        if (senha){
            conta.usuario.senha = senha;
        }
        return res.status(200).json({mensagem: 'Os dados da conta foram modificados'})
}

const deletarConta = (req,res) => {
    const {numero_conta} = req.params;
    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    })
        if(!conta){
            return res.status(404).json({mensagem: ' Conta não encontrada'})
        }
        contas = contas.filter((conta) => {
        return conta.numero != numero_conta;
    })
    return res.status(200).json({mensagem: 'Conta apagada com sucesso'});

}

module.exports = {
    mostrarContas,
    novaConta,
    detalhesConta,
    deletarConta
}