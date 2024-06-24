const fs = require('fs').promises;
const path = require('path');

class ManagerUsers {
    constructor() {
        this.filePath = path.join(__dirname, 'Users.json');
    }

    async criarUsuario(user) {
        let users = [];
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            if (data) {
                users = JSON.parse(data);
            }
        } catch (error) {       
            if (error.code !== 'ENOENT') {
                console.error('Erro ao ler o arquivo:', error);
            }
        }

        users.push(user);

        try {
            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2));
            console.log('Usuário cadastrado com sucesso');
        } catch (error) {
            console.error('Erro ao escrever no arquivo:', error);
        }
    }

    async consultarUsuarios() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const users = JSON.parse(data);
            return users;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []; 
            } else {
                console.error('Erro ao ler o arquivo:', error);
            }
        }
    }
}

module.exports = ManagerUsers;
