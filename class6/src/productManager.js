const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } else {
            this.saveProducts();
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
            return this.products[productIndex];
        }
        return null;
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1);
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }

    getAllProducts() {
        return this.products;
    }
}

module.exports = ProductManager;
