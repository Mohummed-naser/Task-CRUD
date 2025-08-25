var ProductName = document.getElementById('ProductName');
var ProductPrice = document.getElementById('ProductPrice');
var ProductCategory = document.getElementById('ProductCategory');
var ProductDescription = document.getElementById('ProductDescription');
var dataSearchinput = document.getElementById('dataSearch');
var imgInput = document.getElementById('formFileLg');
var Submit = document.getElementById('Add');
var mood = 'add';
var tmp; //fakeVariableFor--i in loop list in fun.. displayProduct
var messageProduct  = document.getElementById('alert-Product');
var messageCategory  = document.getElementById('alert-category');
var messageDescription  = document.getElementById('alert-Description');
//arrayEmpty
var arrayList = []; 
//ifConditionEmptyDisplay
if(localStorage.getItem('arrayList') != null) {
    arrayList = JSON.parse(localStorage.getItem('arrayList'));
    displayProduct();
}
//funAddItem 
function addProduct() {
   if(regexValue() && regexCategory() && regexDescription() ) { //ifCondationFor validation
        var img = imgInput.files[0] ? imgInput.files[0].name :'portfolio-3.jpg'; //chain&regex
        var product = {
        name: ProductName.value,
        price: ProductPrice.value,
        category: ProductCategory.value,
        description: ProductDescription.value,
        image: `images/${img}`
        };
//ifCondationForMoodAdd
        if(mood === 'add') {
            arrayList.push(product);
            localStorage.setItem('arrayList',JSON.stringify(arrayList));
        }else {
            arrayList[tmp] = product;
            mood = 'add'; 
            Submit.innerHTML = 'Add Product';
            localStorage.setItem('arrayList',JSON.stringify(arrayList));
        }
    }
//CallFun
    displayProduct();
    deleteProduct();
}
//funDeleteInputWhenAddData
function deleteProduct() {
   if(regexValue()) {
        ProductName.value = '';
        ProductPrice.value = '';
        ProductCategory.value = '';
        ProductDescription.value = '';
        imgInput.value = ''; 
   }
}
//funDisplayItem
function displayProduct() {
    var box = '';
    for(var i=0 ; i < arrayList.length; i++) {
        box += `
            <div class="col">
                <div class="myCard inner rounded-3 overflow-hidden shadow-lg">
                    <img src="${arrayList[i].image}" alt="${arrayList[i].name}" class="w-100">
                    <div class="p-2">
                        <span class="badge text-bg-info text-white">Index : ${i}</span>
                        <h5>Product Name : ${arrayList[i].name}</h5>
                        <p>Price : ${arrayList[i].price}</p>
                        <p>Category : ${arrayList[i].category}</p>
                        <p>Description : ${arrayList[i].description}</p>
                    </div>
                    <div class="border-top display-flex gap-2 p-2">
                        <button id="update" onclick="updateItem(${i})" class="btn btn-outline-warning">Update <i
                                class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete <i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `
    }
    document.getElementById('data-box').innerHTML = box;
}
//funDeleteItem
function deleteItem(index) {
    arrayList.splice(index,1);
    localStorage.setItem('arrayList',JSON.stringify(arrayList));
    displayProduct();
}
//functionUpdate
function updateItem(i) {
    console.log(arrayList[i]);
    ProductName.value = arrayList[i].name;
    ProductPrice.value = arrayList[i].price;
    ProductCategory.value = arrayList[i].category;
    ProductDescription.value = arrayList[i].description;
    imgInput.files = arrayList[i].image;
    Submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
            top:0,
            behavior: 'smooth'
        })
    // alert("Re-enter the image after modifying the data.\nمش عارف ارجع الصورة ياهندسة (:");
    }
//functionSearch
function searchValue() {
    var inputSearch = dataSearchinput.value;
    box = '';
    for(var i=0 ; i < arrayList.length; i++) {
       if (arrayList[i].name.toLowerCase().includes(inputSearch.toLowerCase())){
            box += `
                <div class="col">
                    <div class="myCard inner rounded-3 overflow-hidden shadow-lg">
                        <img src="${arrayList[i].image}" class="w-100" alt="portfolioImage">
                        <div class="p-2">
                            <span class="badge text-bg-info text-white">Index : ${i}</span>
                            <h5>Product Name : ${arrayList[i].name}</h5>
                            <p>Price : ${arrayList[i].price}</p>
                            <p>Category : ${arrayList[i].category}</p>
                            <p>Description : ${arrayList[i].description}</p>
                        </div>
                        <div class="border-top display-flex gap-2 p-2">
                            <button id="update" onclick="updateItem(${i})" class="btn btn-outline-warning">Update <i
                                    class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete <i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `
        }
    }
    document.getElementById('data-box').innerHTML = box;
}
//functionForValidation
function regexValue() {
    var reg = /^[A-Z]{3,10}[a-z]{3,10}[0-9]{3,10}$/
    if(reg.test(ProductName.value)) {
        ProductName.classList.add('is-valid');
        ProductName.classList.remove('is-invalid');
        messageProduct.classList.add('d-none');
        return true
    }else {
        ProductName.classList.add('is-invalid');
        ProductName.classList.remove('is-valid');
        messageProduct.classList.remove('d-none'); 
        return false
    }
}


function regexCategory() {
    var  regexForCategory = /^[A-Z][a-z]{0,}$/;
    if(regexForCategory.test(ProductCategory.value)) {
        ProductCategory.classList.add('is-valid');
        ProductCategory.classList.remove('is-invalid');
        messageCategory.classList.add('d-none');
        return true 
    }else {
        ProductCategory.classList.add('is-invalid');
        ProductCategory.classList.remove('is-valid');
        messageCategory.classList.remove('d-none'); 
        return false
    }
}



function regexDescription() {
    var  regexForDescription = /^[A-Z][a-z]{0,}$/;
    if(regexForDescription.test(ProductDescription.value)) {
        ProductDescription.classList.add('is-valid');
        ProductDescription.classList.remove('is-invalid');
        messageDescription.classList.add('d-none');
        return true 
    }else {
        ProductDescription.classList.add('is-invalid');
        ProductDescription.classList.remove('is-valid');
        messageDescription.classList.remove('d-none'); 
        return false
    }
}