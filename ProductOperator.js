const ProductManager = require('./ProductManager');
const productManager = new ProductManager('productsFile.json');

(async () => {
    try {
        const product1 = await productManager.registerProduct('Bota', 'Bota rosa', 55, 'caminho/bota.jpg', '00895', 11);
        const product2 = await productManager.registerProduct('Copo', 'Copo stanley', 6, 'caminho/copo.jpg', '369852', 9);

        console.log('Produtos adicionados :', await productManager.getAllProducts());

        const product = await productManager.getProductById(product1.id);
        console.log('Produto por ID :', product);

        const updatedProduct = await productManager.updateProduct(product1.id, { price: 139, stock: 75 });
        console.log('Produto atualizado:', updatedProduct);

        const deletedProduct = await productManager.deleteProduct(product2.id);
        console.log('Produto removido:', deletedProduct);

        console.log('Produtos(todos):', await productManager.getAllProducts());
    } catch (error) {

        console.error('Erro:', error.message);
    }
})();
