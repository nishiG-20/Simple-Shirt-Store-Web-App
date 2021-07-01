showNavbar()

function showNavbar() {
    let makeTheNav = makeNavbar()
    let nav = document.getElementById('navbar')
    nav.innerHTML = makeTheNav
}

function makeNavbar() {
    let navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ShirtSite</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" onclick="showShirts()">Shirts</a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" onclick="addShirt()">Add A Shirt</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
               `
    return navbar
}



let shirtsData = [{
    "image": "https://i.ibb.co/VvGjZnK/s1.jpg",
    "sizes": ["S", "L", "XXL"],
    "brand": "Van Heusen",
    "price": 1299,
    "discount": "10%"
},
{
    "image": "https://i.ibb.co/XyXsX4w/s2.jpg",
    "sizes": ["XS", "M", "XXL"],
    "brand": "Louis Phillipe",
    "price": 1499,
    "discount": "20%"
},
{
    "image": "https://i.ibb.co/LZbmJyK/s3.jpg",
    "sizes": ["XS", "S", "L", "XXL"],
    "brand": "Arrow",
    "price": 1199,
    "discount": "30%"
},
{
    "image": "https://i.ibb.co/swFq71s/s4.jpg",
    "sizes": ["S", "M", "L"],
    "brand": "Blackberrys",
    "price": 849,
    "discount": "10%"
}
]

let Sizes = ["XS", "S", "M", "L", "XL", "XXL"]

let Discount = ["10%", "20%", "30%", "None"]

let brands = ["Van Heusen", "Louis Phillipe", "Arrow", "Blackberrys", "Allen Solly"]

let editShirtDetails = {}

let errorShirtInfo = {}

let editIndex = -1

let prntImg = -1


//Show Shirts
function showShirts() {
    let shrtData = document.getElementById('shrtData')
    let makeShrt = MakeShirt()
    shrtData.innerHTML = makeShrt
}


//Create Shirts
function MakeShirt() {
    let cmpltInfoofShirt = shirtsData.map((data, index) => {
        let {
            image,
            brand,
            price,
            discount,
            sizes
        } = data

        let Sizes = sizes.map((sz, index) => sz)

        return `
            <div class="row">
                <div class="col-6 bd"  id="${'box' + index}" onclick="displayShirt(this,${index})">
                   <img src="${image}" alt="${'image' + index}" class="img-fluid">
                   <div style="float:right">
                      <p>Brand:${brand}</p>
                      <p>Price:${price}</p>
                      <p>Sizes: ${Sizes}</p>
                      <p>Discount:${discount}</p>
                   </div>
                </div> 

                <div class="col-6" id="${'id' + index}">
                </div> 
            </div>
           `
    })

    return `<div class="container my-4">${cmpltInfoofShirt.join('')}</div>`
}

function displayShirt(elem, index) {

    //for printing new Images
    if (prntImg >= 0) {
        showShirts()
        document.getElementById('box' + index).className = 'blue'
    } else {
        document.getElementById('box' + index).className = 'blue'
        prntImg = index
    }

    //Grab The id
    let imgPos = document.getElementById('id' + index)

    //Grab The Brand
    let brand = shirtsData[index].brand

    let brandValue = `<p class="ml">${brand}</p>`

    //Grab The Image
    let imgUrl = shirtsData[index].image

    let image = `<img style="align:center;" src="${imgUrl}" alt="image">`

    let EditButton = `<button type="button" class="btn btn-info ml" onclick="editInfo(${index})">Edit</button>`

    let cmp = `
              <div class="imgMgn">
                ${image}
                </br>
                ${brandValue}
                ${EditButton}
              </div>
            `

    imgPos.innerHTML = cmp
}


//Function To Add The Shirt
function addShirt() {
    let shrtData = document.getElementById('shrtData')
    let createShirt = createShirtsForm()
    shrtData.innerHTML = createShirt
}


function createShirtsForm() {

    let {
        image = '', sizes = [], brand = '', price = '', discount = ''
    } = editShirtDetails


    //For Avoiding Confussion we Are Assigning (editShirtDetails) variable Value in to different variable name
    let EdImage = image
    let EdSizes = sizes
    let EdBrand = brand
    let EdPrice = price
    let EdDiscount = discount


    let editValue = ''

    let hd = (editIndex < 0) ? `<h1>Add A New Shirt</h1>` : `<h1>Edit Shirt</h1>`

    let err = ''
    let str1 = ''


    //---------------------------------------------Image url Field-------------------------------------------------
    err = errorShirtInfo.image
    str1 = err ? `<span class="text-danger size">${err}</span>` : ''
    let readOnly=(editIndex>=0)?'readonly':''


    let pdImg = `
                <div class="mb-3">
                  <label for="pdimage" class="form-label">Product Image</label>
                  <input type="text" class="form-control" id="pdimage" value="${EdImage}" placeholder="Enter URL of Product Image" ${readOnly}>
                  ${str1}
               </div
              `


    //-------------------------------------------------Price Field-------------------------------------------------
    err = errorShirtInfo.price
    str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let Price = `
               <div class="mb-3">
                  <label for="prc" class="form-label">Price</label>
                  <input type="text" class="form-control" id="prc" value="${EdPrice}" placeholder="Enter Price">
                  ${str1}
              </div
            `

    //-------------------------------------------------Brand DropDown-------------------------------------------------
    err = errorShirtInfo.brand
    str1 = err ? `<span class="text-danger mr">${err}</span>` : ''


    let brandDpDownBody = brands.map(bd => {
        return `<option value="${bd}">${bd}</option>`
    })

    let selectedHeader = (EdBrand == '') ? 'Select Brand' : EdBrand
    let brandDpDownheader = `<option disabled selected>${selectedHeader}</option>`

    let cmpltDpDown = `
                   <div class="form-group dp">
                       <select id="brands" class="form-control container">
                           ${brandDpDownheader}
                           ${brandDpDownBody.join('')}
                       <select>
                       ${str1}
                   </div> `


    //-------------------------------------------------Sizes CheckBox-------------------------------------------------
    err = errorShirtInfo.sizes
    str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let chkBox = Sizes.map((sz, index) => {

        let index2 = EdSizes.findIndex(elem => {
            return elem === sz
        })

        let checked1 = (index2 !== -1) ? 'checked' : ''

        return `
             <div class="form-check container">
                 <input class="form-check-input" type="checkbox" value="${sz}" id="${'id' + index}" ${checked1}>
                 <label class="form-check-label" for="${'id' + index}">
                   ${sz}
                 </label>
            </div>
           `
    })

    let chKBoxHeading = `<span>Choose Size Options</span>`

    let cmplChkBox = `
                   <div class="container my-4">
                       ${chKBoxHeading}
                       ${chkBox.join('')}
                       ${str1}
                   </div>
                 `

    //-------------------------------------------------Discount Radio-------------------------------------------------
    err = errorShirtInfo.discount
    str1 = err ? `<span class="text-danger size">${err}</span>` : ''
    let radioBody = Discount.map((dst, index) => {
        let checked = (dst === EdDiscount) ? 'checked' : ''
        return `
            <div class="form-check form-check-inline">
               <input class="form-check-input" type="radio" name="disc" id="${'discount' + index}" value="${dst}" ${checked}>
               <label class="form-check-label" for="${'discount' + index}">${dst}</label>
            </div>
           `
    })

    let radioHd = `<p>Choose Dscount</p>`
    let cmpltRadio = `
                  <div class="container my-4">
                      ${radioHd}
                      ${radioBody.join('')}
                      ${str1}
                  </div>
                 `

    //-------------------------------------------------Submit Button-------------------------------------------------
    let btn = `<button type="button" class="btn btn-primary fix-size2" onclick="SubmitForm()">Add a Product</button>`

    let cmpltForm = ` <div class="container my-4">
                     ${hd}
                     ${pdImg}
                     ${Price}
                     ${cmpltDpDown}
                     ${cmplChkBox}
                     ${cmpltRadio}
                     ${btn}
                    </div>
                  `

    return cmpltForm
}



//Edit Shirt
function editInfo(index) {
    editIndex = index
    editShirtDetails = shirtsData[index]
    addShirt()
}



//Submit Form
function SubmitForm() {

    //grab the product image id
    let productImage = document.getElementById('pdimage').value

    //grab the product price
    let price = document.getElementById('prc').value

    //grab the product brand name  
    let brandName = document.getElementById('brands').value

    //Sizes Checkboxes
    let sizeArr = []
    for (let i = 0; i < Sizes.length; i++) {
        let id = document.getElementById('id' + i).checked
        if (id) {
            let value = document.getElementById('id' + i).value
            sizeArr.push(value)
        }
    }


    //Grab The Radio By Name
    let value = ''
    let rdname = document.getElementsByName('disc')
    for (let i = 0; i < rdname.length; i++) {
        if (rdname[i].checked) {
            value = rdname[i].value
        }
    }

    let sData = {
        "image": productImage,
        "sizes": sizeArr,
        "brand": brandName,
        "price": price,
        "discount": value
    }

    if (validateForm(sData)) {
        (editIndex >= 0) ? shirtsData[editIndex] = sData : shirtsData.push(sData)
        showShirts()

        //Clear All The value of Form After Submit
        editShirtDetails = {}
        editIndex = -1

    } else {
        editShirtDetails = sData
        addShirt()
    }
}



//validate Form
function validateForm(item) {

    //validate  image
    errorShirtInfo.image = (item.image) ? '' : 'Url of Image is Mandatory'

    //validate  Price
    errorShirtInfo.price = (+item.price) ? '' : 'price is Mandatory'

    //Validate Brand
    let index = brands.findIndex(bd => bd === item.brand)
    errorShirtInfo.brand = (index >= 0) ? '' : 'Plz Select Brand'

    //Validating Sizes
    errorShirtInfo.sizes = (item.sizes.length < 1) ? 'Select The Sizes Of Shirt' : ''

    //Validating Discount
    errorShirtInfo.discount = (item.discount) ? '' : 'Select The Discount'



    return !(errorShirtInfo.image || errorShirtInfo.price || errorShirtInfo.brand || errorShirtInfo.sizes || errorShirtInfo.discount)

}