class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error("O código do produto já existe");
            return;
        }

        const product = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
        console.log("Produto adicionado com sucesso:", product);
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log("Produto encontrado:", product);
        } else {
            console.error("Não encontrado");
        }
    }
}


const productManager = new ProductManager();
productManager.addProduct("Brinco", "Brinco prata flor jasmin", 89.55, "documents/larissa/brincoJasmin.jpg", "001", 50);
productManager.addProduct("Bota", "Bota arezzo preta", 139.50, "documnets/larissa/botaArezzoPreta.jpg", "002", 30);
productManager.getProductById(1);
productManager.getProductById(11);
