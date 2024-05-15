class ProductManager {
    constructor() {
        this.products = [];
        this.counter = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error("Já existe um produto com este código");
            return;
        }

        const product = {
            id: this.counter++,
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
productManager.addProduct("Brinco", "Brinco prata flor jasmin", 89.55, "documents/larissa/brincoJasmin.jpg", "001", 60);
productManager.addProduct("Bota", "Bota arezzo preta com dourado", 139.50, "documents/larissa/botaArezzoPreta.jpg", "002", 47);
productManager.getProductById(1);
productManager.getProductById(11);
