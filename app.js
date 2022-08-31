// PRODUCT CLASS: individual product

class Product {
    constructor(name, description, quantity, category) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.category = category;
    }
}



//UI Class: handle UI tasks

class UI {
    static displayProducts() {
        const products = Store.getProducts();

        /* dummy data

        const StoredProducts = [
            {
                name: 'Clamato',
                description: 'Fresh tomato juice',
                quantity: 45,
                category: 'beverages'
            },
            {
                name: 'Barilla pasta',
                description:'italian pasta',
                quantity: 20,
                category: 'grains'
            }
        ];

        const products = StoredProducts;
        */

        products.forEach((product) => UI.addProductToList(product));

    }

    static addProductToList(product) {
        const list = document.querySelector('#product-list')

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.quantity}</td>
        <td>${product.category}</td>
        <td><a href="#" class='btn btn-danger btn-sm delete'>X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteProduct(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#product-form');
        container.insertBefore(div, form);

        // Close the message in 1.5 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 1500);

    }
    

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#quantity').value = '';
        document.querySelector('#category').value = '';
    }

}


//Store class: handles storage

class Store {
    static getProduct() {
        let products;
        if(localStorage.getItem('products') === null) {
            products = [];
        } else {
            products = JSON.parse(localStorage.getItem('products'));
        }
        return products;
    }

    static addProduct(product) {
        const products = Store.getProducts();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

    }

    static removeProduct(idNumber) {
        const products = Store.getProducts();

        products.forEach((product, index) => {
            if(product.idNumber === idNumber) {
                products.splice(index, 1);
            }
        });

        localStorage.setItem('products', JSON.stringify(products))

    }
}

//Event: display products

document.addEventListener('DOMContentLoaded', UI.displayProducts);

//Event: add a product
document.querySelector('#product-form').addEventListener('submit', (e) => {

    e.preventDefault();

    //Getting form values
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const quantity = document.querySelector('#quantity').value;
    const category = document.querySelector('#category').value;


    //Validate
    if(name === '' || description === '' || quantity === '' || category === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //Instatiate products
        const product = new Product(name, description, quantity, category)

    //Add Product to UI
        UI.addProductToList(product);

    
    //Add Product to Store
        Store.addProduct(product);

    // Success message
        UI.showAlert('Product added', 'success');

    //Clear fields method
        UI.clearFields();
    }
});

//event: remove a product

document.querySelector('#product-list').addEventListener('click', (e) => {

    // Remove product from UI
    UI.deleteProduct(e.target);

    // Remove product from store
    Store.removeProduct(e.target.parentElement.previousElementSibling.textContext); // get the ISBN

    // delete message
    UI.showAlert('Product removed', 'success')
});