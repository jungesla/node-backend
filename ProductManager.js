const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async _writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    async _readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async registerProduct(title, description, price, thumbnail, code, stock) {
        const products = await this._readFile();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        products.push(newProduct);
        await this._writeFile(products);
        return newProduct;
    }

    async getAllProducts() {
        return await this._readFile();
    }

    async getProductById(id) {
        const products = await this._readFile();
        return products.find(product => product.id === id);
    }

    async updateProduct(id, updatedProduct) {
        const products = await this._readFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            await this._writeFile(products);
            return products[index];
        } else {
            throw new Error('Produto não encontrado');
        }
    }

    async deleteProduct(id) {
        const products = await this._readFile();
        const productToDelete = products.find(product => product.id === id);
        const updatedProducts = products.filter(product => product.id !== id);
        if (products.length !== updatedProducts.length) {
            await this._writeFile(updatedProducts);
            return productToDelete;
        } else {
            throw new Error('Produto não encontrado');
        }
    }
}

module.exports = ProductManager;
