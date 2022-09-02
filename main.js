const loadAllProduct = async() =>{

    const responce = await fetch("https://fakestoreapi.com/products")
    const data = await responce.json();
    // console.log(data);
 return data ;

}

const setAllMenu = async()=>{

// console.log(loadAllProduct);
 const data = await loadAllProduct();
 const uniqe = [];
 const menu = document.getElementById('all-menu')
for (const product of data) {
    // console.log(product.category);
    if(uniqe.indexOf(product.category) === -1)
    {
        uniqe.push(product.category);

        const li = document.createElement('li');
    li.innerHTML = `<a>${product.category}</a>
    
    `
    menu.appendChild(li);
    }
   
    
}

// console.log(uniqe);






}


setAllMenu();



const searchField = document.getElementById("search-field")

searchField.addEventListener("keypress", async(event)=>{

//  console.log(event.key);
if(event.key === "Enter"){

    // console.log(searchField.value);

    const searchvalue = searchField.value;
    const allProduct = await loadAllProduct();
    // console.log(allProduct);
    const foundproducts = allProduct.filter(product => product.category.includes(searchvalue))
    //  console.log(foundproducts)
    const productContainer = document.getElementById("product-container");
  const notFound = document.getElementById('not-found')
 
    productContainer.textContent = ""
notFound.textContent= ""
 if (foundproducts.length === 0) {
   notFound.innerHTML = `<h2 class= "text-2xl text-center text-orange-500">SEE The Muno And Try Valid Input </h2>`
    
 }
     foundproducts.forEach(product => {


        const {category,title,image,description} = product ;
      const div = document.createElement("div")
        div.innerHTML= `
        <div class="card card-compact w-full bg-base-100 shadow-xl">
  <figure><img src="${image}" class="h-60 w-full" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${category}</h2>
    <p>${title.length > 20 ? title.slice(0,20)+ "..." : title}</p>
    <div class="card-actions justify-end">
    <label for="my-modal-3" onclick="showModal('${description}','${image}')" class="btn btn-primary modal-button">Show details</label>
    </div>
  </div>
</div>`
productContainer.appendChild(div);
     });
}


})


const showModal = (description,image)=>{

const modalBody =document.getElementById('modal-body')

modalBody.innerHTML= `
<figure><img src="${image}" class="h-80 w-full" alt="Shoes" /></figure>
<p class="py-4">${description}</p> `
   


}