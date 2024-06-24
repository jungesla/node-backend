const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const webSocket = new WebSocket.Server({ server });
let messages = [];

webSocket.on('connection', (ws) => {
    console.log('Novo usuário conectado!'); 
    ws.send(JSON.stringify(messages));  
    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message.toString());      
        try {
            const objeto = JSON.parse(message.toString());
            const mensagem = { socktid: ws._socket.remoteAddress, mensagem: objeto.mensagem };
            messages.push(mensagem);
        
            webSocket.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([mensagem]));
                }
            });
        } catch (error) {
            console.error('Erro ao tentar converter para JSON:', error);
        }
    });    
    ws.on('close', () => {
        console.log('Cliente desconectado!');
    });
});

server.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
