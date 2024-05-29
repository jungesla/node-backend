const express = require('express');
const path = require('path');
const detectPort = require('detect-port');
const ProductManager = require('./ProductManager');

const app = express();
const defaultPort = 3000; 
const productManager = new ProductManager(path.resolve(__dirname, '../products.json'));

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        let products = await productManager.getAllProducts();
        if (limit) {
            products = products.slice(0, parseInt(limit));
        }
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os produtos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(parseInt(pid));
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter produto' });
    }
});

const startServer = async () => {
    try {
        const port = await detectPort(defaultPort);
        app.listen(port, () => {
            console.log('Servidor rodando em http://localhost:${port}');
        });
    } catch (error) {
        console.error('Não foi encontrada uma porta disponível', error);
    }
};

startServer();
