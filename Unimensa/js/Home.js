
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

/*GLOBAL VAR FOR FUNCTION CALCTOT*/
let totalSpending = 0.0
let beforeClickedName
let beforeClickedPrice = 0.0
let beforeClickedElement
let isClicked = false

/*FUNCTION CALCTOT IN CREATE MENU IN HOMEPAGE*/
function calcTot(plate_id, name, price){
    let plate = document.getElementById(plate_id)
    let plate_price = document.getElementById(price)
    let plate_name = document.getElementById(name)
    let plate_choose1 = document.getElementById('plate_choose')
    let total = document.getElementById('tot')
    let saveName = plate_id + '_name'

    /*IF PLATE CLICKED HAS CLASS 'PLATEACTIVE' REMOVE CLASS FROM HIM AND DELETE HIS NAME IN PLATE CHOOSE*/
    if($(plate).hasClass('plateActive'))
    {
        $(plate).removeClass('plateActive')
        plate_choose1.innerText = plate_choose1.innerText.replace(plate_name.innerText + ","," ")
    }
    /*IF PLATE CLICKED NOT HAS CLASS 'PLATEACTIVE' REMOVE CLASS FROM ALL, REMOVE PLATE NAME IF IT HA ALREADY BEEN CLICKED,
        TOGGLE CLASS AT PLATE AND ADD HIS NAME TO CHOOSE PLATE*/
    else{
        $('.plate').removeClass('plateActive')
        plate_choose1.innerText = plate_choose1.innerText.replace(beforeClickedName + ","," ")
        $(plate).toggleClass('plateActive')
        plate_choose1.innerText =  plate_choose1.innerText  + " " + plate_name.innerText.substr(0, plate_name.length) + ", "
    }
    /*THEN CALCULATE THE TOTAL.
      IF THE DISH IS THE SAME ONE THAT HAS BEEN CLICKED BEFORE AND NOT HAS THE CLASS 'PLATEACTIVE':
      SUBTRACT TO THE TOTAL THE PLATE PRICE*/
    if(plate === beforeClickedElement && !($(plate).hasClass('plateActive'))){
        totalSpending = totalSpending - parseFloat(plate_price.innerText.substr(0, plate_price.length))
    }
    /*IF THE DISH IS THE SAME ONE THAT HAS BEEN CLICKED BEFORE AND HAS THE CLASS 'PLATEACTIVE': ADD TO THE TOTAL THE PLATE PRICE*/
    else if(plate === beforeClickedElement && $(plate).hasClass('plateActive')){
        totalSpending = parseFloat(totalSpending) + parseFloat(plate_price.innerText.substr(0, plate_price.length))
    }
    /*IF THE DISH IS NOT THE SAME ONE THAT HAS BEEN CLICKED BEFORE*/

    else if (plate !== beforeClickedElement){
        /*IF THE PLATE THAT HAS BEEN CLICKED BEFORE IT WAS CLICKED:
        SUBTRACT TO THE TOTAL THE PLATE PRICE OF PLATECLICKED BEFORE, AND THEN ADD TO THE TOTAL THE PRICE OF PLATE CLICKED NOW*/
        if(isClicked)
        {
            totalSpending =  totalSpending - parseFloat(beforeClickedPrice)
            totalSpending = totalSpending + parseFloat(plate_price.innerText.substr(0, plate_price.length))
        }
        /*IF THE PLATE THAT HAS BEEN CLICKED BEFORE IT NOT WAS CLICKED: ADD TO THE TOTAL ONLY THE PRICE OF PLATE CLICKED NOW*/
        else if(!(isClicked)){

            totalSpending = totalSpending + parseFloat(plate_price.innerText.substr(0, plate_price.length))
        }
        /*UPDATE THE PRICE OF PLATECLICKED BEFORE WITH THE PRICE OF THE PLATE CLICKED NOW*/
        beforeClickedPrice = parseFloat(plate_price.innerText.substr(0, plate_price.length))
    }
    /*WRITE THE TOTAL IN THE CORRECT POSITION*/
    total.innerText = 'Totale= ' + totalSpending + '€'
    /*UPDATE PLATECLICKED BEFORE WITH PLATE CLICKED NOW*/
    beforeClickedElement = document.getElementById(plate_id)
    /*UPDATE THE NAME OF PLATECLICKED BEFORE WITH THE NAME OF THE PLATE CLICKED NOW*/
    beforeClickedName = document.getElementById(saveName).innerText
    /*IF PLATE CLICKED HAS CLASS 'PLATEACTIVE' SET ISCLICKED TRUE*/
    if($(beforeClickedElement).hasClass('plateActive')){
        isClicked = true
    }
    /*IF PLATE CLICKED HAS NOT CLASS 'PLATEACTIVE' SET ISCLICKED FALSE*/
    else{
        isClicked = false
    }
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

function createIsClicked(){
    let cards = document.getElementsByClassName('plate');
    let checkboxes = document.getElementsByClassName('check_clicked')

    let attribute1 = document.createAttribute("isClicked");
    let attribute2 = document.createAttribute("beforeIsClicked");
    attribute1.value = false;
    attribute2.value = false;
    cards.setAttributeNode(attribute1);
    checkboxes.setAttributeNode(attribute2)

    console.log('isclicked ', document.getAttribute('isClicked'))
    console.log('beforeisclicked ', document.getAttribute('beforeIsClicked'))

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