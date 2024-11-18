class Product {
    constructor(id, title, description, price, brand, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail || "https://via.placeholder.com/150";
    }
}

const products = [];
const productList = document.getElementById("product-list");

// Exibir produtos
function displayProducts() {
    productList.innerHTML = "";
    products.forEach((product) => {
        const item = document.createElement("li");
        item.className = "card";
        item.innerHTML = `
            <div><strong>Título:</strong> ${product.title}</div>
            <div><strong>Descrição:</strong> ${product.description}</div>
            <div><strong>Preço:</strong> R$${product.price.toFixed(2)}</div>
            <div><strong>Marca:</strong> ${product.brand}</div>
            <div><strong>Categoria:</strong> ${product.category}</div>
            <img src="${product.thumbnail}" alt="Imagem do produto">
            <button class="remove-btn" onclick="removeProduct(${product.id})">Remover</button>
        `;
        productList.appendChild(item);
    });
}

// Adicionar produto
function addProduct() {
    const id = products.length + 1;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const brand = document.getElementById("brand").value.trim();
    const category = document.getElementById("category").value.trim();
    const thumbnail = document.getElementById("thumbnail").value.trim();

    if (title.length >= 3 && description.length >= 3 && brand.length >= 3 && category.length >= 3 && price > 0) {
        const newProduct = new Product(id, title, description, price, brand, category, thumbnail);
        products.push(newProduct);
        displayProducts();
        document.getElementById("add-product-form").reset();
    } else {
        alert("Preencha todos os campos obrigatórios corretamente!");
    }
}

// Remover produto
function removeProduct(id) {
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        displayProducts();
    }
}

// Carregar produtos da API
function fetchProducts() {
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
            data.products.forEach((product) => {
                products.push(
                    new Product(
                        product.id,
                        product.title,
                        product.description,
                        product.price,
                        product.brand,
                        product.category,
                        product.thumbnail
                    )
                );
            });
            displayProducts();
        })
        .catch((error) => console.error("Erro ao carregar produtos:", error));
}

// Inicializar a lista de produtos ao carregar a página
document.addEventListener("DOMContentLoaded", fetchProducts);
