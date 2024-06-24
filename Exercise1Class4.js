const fs = require('fs');
const filePath = 'dateTimeFile.txt';

function getCurrentDateTime() {
    const dateTime = new Date();
    return dateTime.toLocaleString();
}

fs.writeFile(filePath, getCurrentDateTime(), (error) => {
    if (error) {
        return console.error('Erro ao adicionar no arquivo:', error);
    }
    console.log('Data e hora adicionadas com sucesso.');

    fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) {
            return console.error('Erro na leitura do arquivo:', error);
        }
        console.log('Conteúdo do arquivo:', data);
    });
});

