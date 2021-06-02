
/*FUNCTION CHANGE VISIBILITY ELEMENT*/
function showContainer(element_id) {
    let element = document.getElementById(element_id)
    if(element.style.display === 'none') {
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}

/*FUNCTION CHANGE INCON IN NAVBAR*/
function changeIcon(element_id){
    /*SAVE THE FIRST OCCURRENCE OF IMAGES IN THE SRC ATTRIBUTE OF THE ELEMENT*/
    let firstOcc = document.getElementById(element_id).src.indexOf('images')
    /*SET VAR2 IN THE SUBSTRING FROM FIRST OCCURRENCE TO ALL LENGTH*/
    let var2 = document.getElementById(element_id).src.substr(firstOcc,document.getElementById(element_id).src.length)
    let var1 = "../"+var2
    /*IF THE ICON IS NOT CLICKED: SET NEW SRC FOR ICON CLICKED*/
    if(var1 === "../images/header/"+element_id+".png")
    {
        document.getElementById(element_id).src = "../images/header/"+element_id+"clicked.png"
    }
    /*IF THE ICON IS CLICKED: SET NEW SRC FOR ICON NOT CLICKED*/
    else
    {
        document.getElementById(element_id).src = "../images/header/"+element_id+".png"
    }

}

/*RICORDA DI RENDERE GLOBALE LA FUNZIONA CON JQUERY*/
/*FUNCTION FOR HIDE OTHER MENU IN NAVBAR*/
function hideOtherMenu (element_id) {
    let element = document.getElementById(element_id)
    let nameContainer = [
        'container_notifications',
        'container_profile',
        'container_menu'
    ]

    if(element === document.getElementById(nameContainer[0]))
    {
        if(document.getElementById(nameContainer[1]).style.display === 'block') {
            document.getElementById(nameContainer[1]).style.display = 'none'
            changeIcon('imgProfile')
        }
        document.getElementById(nameContainer[2]).style.display= 'none'
    }

    else if (element === document.getElementById(nameContainer[1]))
    {
        if(document.getElementById(nameContainer[0]).style.display === 'block') {
            document.getElementById(nameContainer[0]).style.display= 'none'
            changeIcon('imgBell')
        }
        document.getElementById(nameContainer[2]).style.display= 'none'
    }

    else
    {
        if(document.getElementById(nameContainer[0]).style.display === 'block') {
            document.getElementById(nameContainer[0]).style.display= 'none'
            changeIcon('imgBell')
        }
        if(document.getElementById(nameContainer[1]).style.display === 'block') {
            document.getElementById(nameContainer[1]).style.display= 'none'
            changeIcon('imgProfile')
        }
    }
}


/*FUNCTION FOR CHANGE PAGE*/
function goTo(page){
    window.location.href = page;
}


function researchEle(name_p){
    for(let i in elementCart){
        if(elementCart[i].name === name_p)
            return i
    }
    return -1
}

/*VARIABLE FOR FUNCTION "ADDPRODUCTTOBILL()"*/
let semiTot = 0.0
let elementCart = []

function Elementcart(name, price, quantity){
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}

function addProductToBill(plate_name,plate_price) {
    $("#cartEmpty").css("display", "none")
    $('.button_deleteAll').css("display", "block")
    let plateName = document.getElementById(plate_name)
    let name = plateName.innerText
    let occurrPrice = document.getElementById(plate_price).innerText.indexOf(': ')
    let price = document.getElementById(plate_price).innerText.substr(occurrPrice + 2, document.getElementById(plate_price).length)
    let list = document.getElementById('list_bill')
    let item
    let trash
    let priceItem
    let count
    let x = researchEle(name)
    let cartLength = elementCart.length

    if(x < 0){
        elementCart[cartLength] = new Elementcart(name, price, 1)
        item = document.createElement("li")
        trash = document.createElement("input")
        priceItem = document.createElement("p")
        count = document.createElement("p")
        count.innerText = elementCart[cartLength].quantity
        count.classList.add('count_item')
        count.id = "item" + cartLength
        trash.type = "image";
        trash.classList.add('icon2')
        trash.addEventListener('click',function(){
            dropProduct(plate_name,plate_price)
        });
        trash.src = "../images/body_home/cestino.png"
        priceItem.innerText = elementCart[cartLength].price
        priceItem.classList.add('price_bill')
        priceItem.id = "price"+ cartLength
        item.classList.add('item_bill')
        item.innerText = elementCart[cartLength].name
        item.id = "li"+cartLength


        item.appendChild(count)
        item.appendChild(trash)
        item.appendChild(priceItem)
        list.appendChild(item)
    }else{
        elementCart[x].quantity =  elementCart[x].quantity + 1
        elementCart[x].price = parseFloat(elementCart[x].price) + parseFloat(price)
        let newQnt = parseFloat(elementCart[x].quantity)
        let newPrice = parseFloat(elementCart[x].price).toFixed(2)


        let elemQnt = document.getElementById('item'+x)
        let elemPrice = document.getElementById('price'+x)

        elemQnt.innerText = newQnt
        elemPrice.innerText = newPrice + "€"

    }

}



function dropProduct(plate_name,plate_price){
    console.log(elementCart)
    let plateName = document.getElementById(plate_name)
    let name = plateName.innerText
    let occurrPrice = document.getElementById(plate_price).innerText.indexOf(': ')
    let price = document.getElementById(plate_price).innerText.substr(occurrPrice + 2, document.getElementById(plate_price).length)
    let list = document.getElementById('list_bill')
    let x = researchEle(name)
    let cartLength = elementCart.length
    let idItem

    console.log ("X: ", x)


    if(elementCart[x].quantity === 1 ){
        idItem = "li"+x
        console.log("Sono idItem: ", idItem)

        let child = document.getElementById(idItem)
        console.log("Sono splice",elementCart[x].name)
        elementCart.splice(x, 1)
        list.removeChild(child)

    }else{
        elementCart[x].quantity = elementCart[x].quantity - 1
        elementCart[x].price = parseFloat(elementCart[x].price) - parseFloat(price)
        let newPrice = parseFloat(elementCart[x].price).toFixed(2)


        let elemQnt = document.getElementById('item'+x)
        let newQnt = parseFloat(elementCart[x].quantity)
        let elemPrice = document.getElementById('price'+x)

        elemQnt.innerText = newQnt
        elemPrice.innerText = newPrice + "€"


    }

}






//labels = Array.from(document.querySelector(`label[for='${id}']`)));





/*   DA RICORDARE

function setOpacity(element_id, x) {


    let elemento = document.getElementById("menu_opacity");
    elemento.style.opacity = 0.5;

    let a = document.getElementById("close_menu");
    a.style.opacity = 1;


}

function resetOpacity(x) {


    let elemento = document.getElementById("menu_opacity");
    elemento.style.opacity = 1;

}*/