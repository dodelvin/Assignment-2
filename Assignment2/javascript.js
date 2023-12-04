document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
  fetchCategories();
  document.getElementById('back-button').addEventListener('click', showMainContent);
});

    let allProducts = [];
function fetchProducts() {
        
        
    fetch("https://dummyjson.com/products").then(response => response.json()).then(data => {allProducts = data.products; displayProducts(data.products)}).catch(error => document.getElementById('main-content').innerHTML = `<p>${error}</p>`);

    
}
function fetchCategories() {

        
    fetch("https://dummyjson.com/products/categories").then(response => response.json()).then(data => displayCategories(data)).catch(error => document.getElementById('main-content').innerHTML = `<p>${error}</p>`);

    
}
    
function displayCategories(categories) {
    
    const categorySelect = document.getElementById('filter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}
    document.getElementById('search-input').addEventListener('input', filterProducts);
    document.getElementById('filter').addEventListener('change', filterProducts);
    function filterProducts() {
        const searchText = document.getElementById('search-input').value.toLowerCase();
        const selectedCategory = document.getElementById('filter').value;
        
        const filteredProducts = allProducts.filter(product => {
            
            return (product.title.toLowerCase().includes(searchText) ||         
    product.description.toLowerCase().includes(searchText)) &&
                   (selectedCategory === 'all' || product.category === selectedCategory);
        });
     displayProducts(filteredProducts);
    }
    function displayProducts(products){



        const container = document.getElementById("products")
    container.innerHTML = "";
    products.forEach(product => {
        
        const productElement = document.createElement("div")
        productElement.className = "product" 
        productElement.innerHTML = `<h3>${product.title}</h3>
            <p>Price: ${product.price}</p>
<p>Discounted: ${product.discountPercentage} %</p>
            <img src="${product.thumbnail}" alt="${product.title}" style="width:100%">
            <p>Category: ${product.category}</p>
            <p>In Stock: ${product.stock}</p>` 
            productElement.addEventListener('click', () => showProductDetails(product));
            container.appendChild(productElement)


        
        



     });    
        

   

 }
function showProductDetails(product) {
    const productInfo = document.getElementById('product-info');
    productInfo.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.images[0]}" alt="${product.title}" style="width:100%">
        <p>${product.description}</p>
        
    `;
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('product-detail').style.display = 'block';
}
function showMainContent() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('product-detail').style.display = 'none';
}