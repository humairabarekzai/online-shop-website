
let products = [
{
    id:1,
    name:"Strawberry Cake",
    description: "Indulge in layers of fluffy sponge and fresh cream, topped with hand-picked strawberries. It’s the perfect sweet centerpiece for any celebration or a delightful afternoon treat.",
    price:25,
    category:"cake",
    image:"img/red.jpeg"
},
{id:2,name:"Chocolate Package", description: "A decadent assortment of premium truffles and artisanal bars. Crafted from the finest cocoa, this collection is a chocolate lover’s dream delivered straight to your door.", price:40,category:"chocolate", image:"img/choc.webp"},
{id:3,name:"Flowers Bouquet", description: "Brighten any room with this hand-tied arrangement of seasonal blooms. Fresh, fragrant, and vibrant, it’s a timeless way to show someone you’re thinking of them today.", price:45,category:"flower", image:"img/floo.webp"},
{id:4,name:"Luxury Watch List", description: "Discover timeless precision and sophisticated design. Our curated selection of high-end timepieces offers the perfect blend of heritage, craftsmanship, and modern style for your wrist.",price:120,category:"watch",image:"img/watch.jpg"},
{id:5,name:"Silver Necklace",description: "Elevate your everyday look with this elegant sterling silver piece. Featuring a delicate chain and a shimmering finish, it’s a versatile staple for any jewelry collection. you can select from the collection.", price:150,category:"jewellery", image:"img/j.webp"},
{id:6,name:"Surprise Gift Box", description: "Unwrap the unexpected! Each curated box is filled with premium mystery treats and lifestyle essentials designed to spark joy and make every occasion feel truly special.", price:35,category:"box", image:"img/box.webp"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("products");

// This function clears the current items and draws the new ones based on the filter/search
function displayProducts(data) {
    const container = document.getElementById("products");
    
    // 1. Clear the container first
    container.innerHTML = "";

    // 2. Loop through the filtered data
    data.forEach(product => {
        container.innerHTML += `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">

            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title mb-0">${product.name}</h5>
                    <span class="badge bg-dark">€${product.price}</span>
                </div>

                <p class="card-text">
                    ${product.description}
                </p>

                <div class="d-flex gap-2 mt-auto">
                    <button 
                        class="btn add-btn flex-fill"
                        onclick="showDetails(${product.id})">
                        View <i class="fa fa-eye"></i>
                    </button>

                    <button 
                        class="btn view-btn flex-fill"
                        onclick="addToCart(${product.id})">
                        Add <i class="fa fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    // 3. Handle "Not Found" case
    if (data.length === 0) {
        container.innerHTML = `<p class="text-center w-100">No products found matching your search.</p>`;
    }
}


//     products.forEach(product => {
//         container.innerHTML += `
//         <div class="card" style="">
//             <img src="${product.image}" class="card-img-top">

//             <div class="card-body">
//                 <p class="card-title">
//                     ${product.name}
//                 </p>
//                 <span style="float: right;">
//                 ${product.price}$
//                 </span>

//                 <p class="card-text">
//                     ${product.description}
//                 </p>

// <div class="d-flex gap-2 mt-3">
//                 <button 
//                     class="btn add-btn"
//                     onclick="showDetails(${product.id})">
//                     View
//                     <i class="fa fa-eye"> </i>

//                 </button>

//                 <button 
//                     class="btn view-btn"
//                     onclick="addToCart(${product.id})">
//                     Add
//                     <i class="fa fa-add"> </i>
//                 </button>
//                 </div>
//             </div>
//         </div>
//         `;
//     });


function filterProducts(category){
if(category==="all"){
displayProducts(products);
}else{
displayProducts(products.filter(p=>p.category===category));
}
}
document.getElementById("search").addEventListener("keyup", function(){
let value = this.value.toLowerCase();

let filtered = products.filter(p =>
p.name.toLowerCase().includes(value)
);

displayProducts(filtered);
});
function addToCart(id){

let existing = cart.find(item=>item.id===id);

if(existing){
existing.qty++;
}else{
let product = products.find(p=>p.id===id);
cart.push({...product, qty:1});
}

 

updateCart();
}

function updateCart(){

let list = document.getElementById("cart-list");
list.innerHTML="";

let totalItems = cart.reduce((total, item) => {
        return total + item.qty;
    }, 0);

    document.getElementById("shopping-cart").innerText = totalItems;

let total = 0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

list.innerHTML += `
<li class="list-group-item d-flex justify-content-between align-items-center">

<div>
<b>${item.name}</b><br>
€${item.price} × ${item.qty}
</div>

<div>
<button class="btn btn-sm btn-warning"
onclick="changeQty(${index},-1)">
<i class="fa fa-minus"></i>
</button>
<button class="btn btn-sm btn-success" onclick="changeQty(${index},1)"><i class="fa fa-plus"></i></button>
<button class="btn btn-sm btn-danger" onclick="removeItem(${index})"><i class="fa fa-trash"></i></button>
</div>

</li>
`;
});

document.getElementById("total").innerText = "Total: €" + total;

// save
localStorage.setItem("cart", JSON.stringify(cart));
}
function changeQty(index,amount){
cart[index].qty += amount;

if(cart[index].qty <= 0){
cart.splice(index,1);
}

updateCart();
}
function removeItem(index){
cart.splice(index,1);
updateCart();
}
function toggleDark(){
document.body.classList.toggle("light-mode");
}
function showDetails(id){

let p = products.find(x => x.id === id);

document.getElementById("modalTitle").innerText = p.name;
document.getElementById("modalPrice").innerText = "Price: €" + p.price;

let modal = new bootstrap.Modal(document.getElementById('productModal'));
modal.show();
}
displayProducts(products);
updateCart();