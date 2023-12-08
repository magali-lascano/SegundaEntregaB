const socketClient = io();

const addProduct = document.getElementById("addProduct");

const inputTitle = document.getElementById("productTitle");
const inputDescription = document.getElementById("productDescription");
const inputCode = document.getElementById("productCode");
const inputPrice = document.getElementById("productPrice");
const inputStatus = document.getElementById("productStatus");
const inputStock = document.getElementById("productStock");
const inputCategory = document.getElementById("productCategory");
const inputThumbnail = document.getElementById("productThumbnail");

// add product
addProduct.addEventListener("click", (e) => {
    const newProduct = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: parseInt(inputPrice.value),
        thumbnail: [],
        code: parseInt(inputCode.value),
        stock: parseInt(inputStock.value),
        status: true,
        category: inputCategory.value,
    };

    if (!newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.status ||
        !newProduct.category
    ) {
        e.preventDefault();
        return console.log("Incompleto");
    } else {
        socketClient.emit("newProduct", newProduct);
    }
});

// delete product
const deleteProduct = document.querySelector("#productsTable");

deleteProduct.addEventListener("click", (e) => {
    const element = e.target;
    const productId = element.getAttribute("data-id");
    if (element.className === "classDeleteProduct") {
        socketClient.emit("deleteProduct", parseInt(productId));
        document.location.reload()
    }
});