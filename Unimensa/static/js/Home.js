
/*FUNCTION CHANGE VISIBILITY ELEMENT*/
function showContainer(element_id) {
    let element = document.getElementById(element_id)
    if(element.style.display === 'none') {
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}

/*DA RIFARE*/
/*FUNCTION CHANGE INCON IN NAVBAR*/
function changeIcon(element_id){
    /*SAVE THE FIRST OCCURRENCE OF IMAGES IN THE SRC ATTRIBUTE OF THE ELEMENT*/
    let firstOcc = document.getElementById(element_id).src.indexOf('static')
    /*SET VAR2 IN THE SUBSTRING FROM FIRST OCCURRENCE TO ALL LENGTH*/
    let var2 = document.getElementById(element_id).src.substr(firstOcc,document.getElementById(element_id).src.length)
    let var1 = "../"+var2
    /*IF THE ICON IS NOT CLICKED: SET NEW SRC FOR ICON CLICKED*/
    if(var1 === "../static/images/header/"+element_id+".png")
    {
        document.getElementById(element_id).src = "../static/images/header/"+element_id+"clicked.png"
    }
    /*IF THE ICON IS CLICKED: SET NEW SRC FOR ICON NOT CLICKED*/
    else
    {
        document.getElementById(element_id).src = "../static/images/header/"+element_id+".png"
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
let elementCart = []
let numElem = 0

function Elementcart(name, price, quantity){
    this.Id = numElem;
    this.name = name;
    this.price = price;
    this.quantity = quantity;

    numElem = numElem +1
}

function addProductToBill(plate_name,plate_price) {
    $("#cartEmpty").css("display", "none")
    $(".cart_empty").css("display", "none")
    $('.container_deleteAll').css("display", "block")
    let plateName = document.getElementById(plate_name)
    let name = plateName.innerText
    let occurrPrice = document.getElementById(plate_price).innerText.indexOf(': ')
    let price = document.getElementById(plate_price).innerText.substr(occurrPrice + 2, document.getElementById(plate_price).length)

    let x = researchEle(name)

    if(x < 0){
        addElementToList(name, price, x, 'list_bill', 'item_bill')
    }else{
        updatePriceQuantity(price, x, 0)
    }

    bill_tot(price,0)

}



function dropProduct(plate_name,plate_price){
    let list = document.getElementById('list_bill')
    let x = researchEle(plate_name)
    let cartLength = elementCart.length
    let idItem

    if(elementCart[x].quantity === 1){
        idItem = elementCart[x].Id
        let child = document.getElementById('li_item'+idItem)
        elementCart.splice(x,1)
        list.removeChild(child)
        numElem = numElem -1
        for(let i = idItem; i < cartLength-1; i++){
            let element = document.getElementById('li_item'+(i+1))
            let elementPrice = document.getElementById('price'+(i+1))
            let elementName  = document.getElementById('li_name'+(i+1))
            let elementCount = document.getElementById('count' + (i+1))
            elementCart[i].Id = (parseFloat(elementCart[i].Id) - 1)
            element.id = 'li_item' + elementCart[i].Id
            elementName.id = "li_name"+elementCart[i].Id
            elementPrice.id = "price"+elementCart[i].Id
            elementCount.id = "count" + elementCart[i].Id
        }


    }else{
        updatePriceQuantity(plate_price, x, 1)
    }
    if(elementCart.length === 0){
        $("#cartEmpty").css("display", "block")
        $(".cart_empty").css("display", "block")
        $('.container_deleteAll').css("display", "none")
    }else if(elementCart.length <= 3 ){

        $('.container_product_chosen').css('overflow-y', 'hidden')
    }
    bill_tot(plate_price, 1)
}



function drop_all_product(){

    let list = document.getElementById('list_bill')

    let cart_length = elementCart.length

    for(let i = 0; i < cart_length; i++) {
        let child = document.getElementById('li_item'+i)

        elementCart.splice(0, 1)
        numElem = numElem -1

        list.removeChild(child)


    }
    bill_tot(0,-1)
    $('.container_product_chosen').css('overflow-y', 'hidden')
    $("#cartEmpty").css("display", "block")
    $(".cart_empty").css("display", "block")
    $('.container_deleteAll').css("display", "none")


}


function addSandwichesToBill() {
    $("#cartEmpty").css("display", "none")
    $(".cart_empty").css("display", "none")
    $('.container_deleteAll').css("display", "block")
    $("#cart_empty").css("display", "none")
    let price_Float = 0.2 //RICORDA DA RECUPERARE DAL DB
    let checked = $(".checkbox_sandwiches")

    let labels
    let components = "Panino("
    for(let x in checked){
        let xChecked = checked[x]
        if(xChecked["checked"] === true) {
            labels = document.querySelector(`label[for='${xChecked["id"]}']`)
            lengName = labels.innerText.indexOf('(')-1
            if(xChecked.matches('.pane')){
                components = labels.innerText.substr(0, lengName) + " ("
                price_Float = Math.max(price_Float, parseFloat(xChecked["value"]))
            } else
            {
                components = components + "" + labels.innerText.substr(0,lengName) +","
                price_Float = price_Float + parseFloat(xChecked["value"])
            }

        }
    }
    components = components.substr(0,components.length-1)+')'
    checked.prop('checked', false)
    let y = researchEle(components)
    let price_sandwiches = ''+ price_Float.toFixed(2) + ' €'

    if(y < 0){
        addElementToList(components, price_sandwiches, y, 'list_bill', 'item_bill')
    }else{
        updatePriceQuantity(price_sandwiches, y, 0)
    }

    bill_tot(price_sandwiches,0)
}

function addElementToList (name, price, x, id_list, class_item){

    let list = document.getElementById(id_list)
    let cartLength = elementCart.length
    let item
    let trash
    let priceItem
    let count
    let li_name

        elementCart[cartLength] = new Elementcart(name, price, 1)
        item = document.createElement("li")
        li_name = document.createElement('p')
        trash = document.createElement("input")
        priceItem = document.createElement("p")
        count = document.createElement("p")
        count.innerText = elementCart[cartLength].quantity
        count.classList.add('count_item')
        count.id = "count" + cartLength
        trash.type = "image";
        trash.classList.add('icon2')
        trash.addEventListener('click',function(){
            dropProduct(name,price)
        });
        trash.src = "../static/images/body_home/cestino.png"
        priceItem.innerText = elementCart[cartLength].price
        priceItem.classList.add('price_bill')
        priceItem.id = "price"+ cartLength
        li_name.innerText = elementCart[cartLength].name
        li_name.classList.add('li_name')
        li_name.id = 'li_name' + cartLength
        item.classList.add(class_item)
        item.id = 'li_item' + cartLength
        item.appendChild(count)
        item.appendChild(li_name)
        item.appendChild(priceItem)
        item.appendChild(trash)

        list.appendChild(item)
        if (cartLength >= 3) {

            $('.container_product_chosen').css('overflow-y', 'scroll')
        }

}

function updatePriceQuantity (price, x, operand){

    if(operand === 0) {
        elementCart[x].quantity =  elementCart[x].quantity + 1
        elementCart[x].price = parseFloat(elementCart[x].price) + parseFloat(price)
        let newQnt = parseFloat(elementCart[x].quantity)
        let newPrice = parseFloat(elementCart[x].price).toFixed(2)
        let elemQnt = document.getElementById('count'+x)
        let elemPrice = document.getElementById('price'+x)
        elemQnt.innerText = newQnt
        elemPrice.innerText = newPrice + " €"
    }
    else {
        elementCart[x].quantity = elementCart[x].quantity - 1
        elementCart[x].price = parseFloat(elementCart[x].price) - parseFloat(price)
            let newPrice = parseFloat(elementCart[x].price).toFixed(2)
        let elemQnt = document.getElementById('count'+parseFloat(elementCart[x].Id))
        let newQnt = parseFloat(elementCart[x].quantity)
        let elemPrice = document.getElementById('price'+parseFloat(elementCart[x].Id))
        elemQnt.innerText = newQnt
        elemPrice.innerText = newPrice + " €"
    }

}


let tot = 0;

function bill_tot(price, operand){

    if(operand === 0){
        tot = tot + parseFloat(price)
        tot = Math.abs(tot)
        let price_total = document.getElementById('total')
        price_total.innerText = 'Totale: ' + tot.toFixed(2) + " €"

    }
    else if (operand === 1){
        tot = tot - parseFloat(price)
        tot = Math.abs(tot)
        let price_total = document.getElementById('total')
        if(tot === 0){
            price_total.innerText = 'Totale: '
        }else{
            price_total.innerText = 'Totale: ' + tot.toFixed(2) + " €"
        }

    }
    else if (operand === -1){
        tot = price
        tot = Math.abs(tot)
        let price_total = document.getElementById('total')
        if(tot === 0){
            price_total.innerText = 'Totale: '
        }else{
            price_total.innerText = 'Totale: ' + tot.toFixed(2) + " €"
        }
    }


}

function svuota(){

    $('#email').value = '';
    $('#password').value = '';

}

