/*VAR FOR CALCTOT*/
let semiTot = 0.0
let beforeClickedName
let beforeTot = 0.0
let beforeClickedElement


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
    let firstOcc = document.getElementById(element_id).src.indexOf('images')
    let var2 = document.getElementById(element_id).src.substr(firstOcc,document.getElementById(element_id).src.length)
    let var1 = "../"+var2
    if(var1 === "../images/header/"+element_id+".png")
     {
        document.getElementById(element_id).src = "../images/header/"+element_id+"clicked.png"
     }
    else
     {
        document.getElementById(element_id).src = "../images/header/"+element_id+".png"
     }

}

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

/*FUNCTION SHOW CONTENT CENTER*/
function showContent (container_id) {
    let container = document.getElementById(container_id)
    let nameContainer = [
        'container_center1',
        'container_center2'
    ]

    if (container === document.getElementById(nameContainer[1]) && container.style.display === 'none') {
        document.getElementById(nameContainer[1]).style.display = 'block'
        document.getElementById(nameContainer[0]).style.display = 'none'
    }

    if (container === document.getElementById(nameContainer[0]) && container.style.display === 'none')
    {
        document.getElementById(nameContainer[0]).style.display = 'block'
        document.getElementById(nameContainer[1]).style.display = 'none'
    }

}

/*FUNCTION FOR CHANGE PAGE*/
function goTo(page){
    window.location.href = page;
}

/*FUNCTION SELECT PLATE IN CREATE FAST MENU*/
function calcTot(plate_id, name, price){
    let plate = document.getElementById(plate_id)
    let plate_price = document.getElementById(price)
    let plate_name = document.getElementById(name)
    let plate_choose1 = document.getElementById('plate_choose')
    let total = document.getElementById('tot')
    let varName = plate_id + '_name'

    if($(plate).hasClass('prova'))
    {
        $(plate).removeClass('prova')
        semiTot = semiTot - parseFloat(plate_price.innerText.substr(0, plate_price.length))
        console.log('siamo nell if  ', semiTot)
        total.innerText = "Totale: " + semiTot + "€"
        plate_choose1.innerText = plate_choose1.innerText.replace(plate_name.innerText + ","," ")

    }
    else{
        $('.plate').removeClass('prova')
        plate_choose1.innerText = plate_choose1.innerText.replace(beforeClickedName + ","," ")
        $(plate).toggleClass('prova')
        if()
        plate_choose1.innerText =  plate_choose1.innerText  + " " + plate_name.innerText.substr(0, plate_name.length) + ", "
        semiTot = semiTot + parseFloat(plate_price.innerText.substr(0, plate_price.length))
        console.log('siamo nell else  ', semiTot)

        total.innerText = "Totale: " + semiTot + "€"
    }
    beforeClickedElement = document.getElementById(plate_id)
    beforeClickedName = document.getElementById(varName).innerText
    beforeTot = parseFloat(plate_price.innerText.substr(0, plate_price.length))
}

function reverse_color(button_id1, button_id2){

    let clicked = document.getElementById(button_id1)
    let unclicked = document.getElementById(button_id2)

    if(clicked.style.backgroundColor !== '#3b83bd') {
        unclicked.style.backgroundColor = '#3b83bd'
        unclicked.style.color = 'white'
        unclicked.style.fontWeight = 'normal'
        clicked.style.color = 'black'
        clicked.style.backgroundColor = 'whitesmoke'
        clicked.style.fontWeight = 'bold'
    }
    else if (clicked.style.backgroundColor !== 'whitesmoke') {
        clicked.style.backgroundColor = '#3b83bd'
        clicked.style.color = 'white'
        unclicked.style.backgroundColor = 'whitesmoke'
    }
}





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