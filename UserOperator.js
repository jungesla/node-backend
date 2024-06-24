const ManagerUsers = require('./ManagerUsers.js');

const manager = new ManagerUsers();
const novoUsuario = {
    nome: 'Gisele',
    sobrenome: 'Almeida',
    idade: 27,
    curso: 'Backend'
};

manager.criarUsuario(novoUsuario)
    .then(() => {
        return manager.consultarUsuarios();
    })
    .then((users) => {
        console.log('Usuário salvo');
        console.log(users);
    })
    .catch((error) => {
        console.log('Ocorreu um erro na operação do arquivo', error);
    });

