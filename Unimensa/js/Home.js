
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

/*RICORDA DI RENDERE GLOBALE LA FUNZIONA CON JQUERY*/
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

/*VARIABLE FOR FUNCTION "ADDPRODUCTTOBILL()"*/
let semiTot = 0.0
/*FUNCTION FOR ADD THE PRODUCT TO BILL*/
function addProductToBill(plate_name, plate_price){
    /*VARIABLES TO WRITE PRODUCT CHOOSE AND TOTAL*/
    let plate_choose = document.getElementById('plate_choose')
    let total = document.getElementById('tot')

    /*IF THE COSTUMER HAS COMPOSED A SANDWICH*/
    if(plate_name === 'sandwiches'){
        let price_sandwiches = 0.0
        /*GET ALL CHECKBOXES THAT HAVE THIS CLASS*/
        let checked = $(".checkbox_sandwiches")
        let lengName
        let xChecked
        let labels
        let components = "Panino("
        /*SCROLL ALL CHECKBOXES*/
        for(let x in checked){
            xChecked  = checked[x]
            /*IF THE X-TH CHECKBOX IS CHECKED*/
            if(xChecked["checked"] === true) {



                /*SAVE THE LABEL IT HAS THE "FOR" ATTRIBUTE EQUAL TO X-TH ID*/
                labels = document.querySelector(`label[for='${xChecked["id"]}']`)
                /*SAVE THE LENGTH NAME OF LABEL*/
                lengName = labels.innerText.indexOf('(')-1

                if(xChecked.matches('.pane')) {

                    components = labels.innerText.substr(0, lengName) + "("

                } else
                {
                    /*STORE A STRING MADE UP OF ALL THE NAMES OF THE SAVED LABELS*/
                    components = components + " " + labels.innerText.substr(0,lengName) +","
                }

                /*CALCULATE THE PRICE OF THE SINGLE SANDWICH*/
                price_sandwiches =  price_sandwiches + parseFloat(xChecked["value"])
            }
        }
        /*DELETE FROM THE STRING, THE LAST ","*/
        components = components.substr(0,components.length-1)
        /*IF THE PRICE OF THE SANDWICH IS GREATER THAN ZERO*/
        if(price_sandwiches > 0){
            /*ADD THE PRICE TO SEMITOT AND WRITE THE NAMES OF THE COMPONENTS OF SANDWICH*/
            semiTot = semiTot + price_sandwiches
            plate_choose.innerText = plate_choose.innerText + ' ' + components + " ),"
        }
        /*REFRESH ALL CHECKBOXES*/
        checked.prop('checked', false)
    }
    /*IF THE COSTUMER HAS CHOSEN A PLATE (CARD) MENU*/
    else{
        /*GET THE NAME, THE PRICE*/
        let name = document.getElementById(plate_name)
        let occurrPrice = document.getElementById(plate_price).innerText.indexOf(': ')
        let price = document.getElementById(plate_price).innerText.substr(occurrPrice+2, plate_price.length)
        let lengPlate = plate_choose.innerText.length
        /*ADD THE PRICE TO THE TOTAL*/
        semiTot = semiTot + parseFloat(price)
        /*WRITE THE CHOICE NAME*/
        plate_choose.innerText = plate_choose.innerText + ' ' + name.innerText + ","

    }
    /*IF THE TOTAL IS GREATER THEN ZERO, SHOW THE TOTAL*/
    if(semiTot > 0)
        total.innerText = "Totale: "+ semiTot + "€"

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