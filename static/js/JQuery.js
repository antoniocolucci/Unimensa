$(document).ready(function(){

    }
);
/*LOAD CARD OR SANDWICHES*/
$('.liPlate').click(function(){
    let id = this.id
    if(id === 'sandwiches')
        loadSandwiches(id);
    else
        loadCard(id);
});

/*NOT WORKING*/
/*CAN SELECT ONLY ONE TYPE OF BREAD*/
$('input[type="checkbox"].bread').on('change', function() {
    $('input[type="checkbox"].bread').not(this).prop('checked', false);
});

/*LOGIN*/
$('form[name=login]').submit(function(){
    $.ajax({
        url: "http://localhost:5000/",
        type: 'POST',
        data: {
            email: $("#Email").val(),
            pwd:  $("#Password").val()
        },

    });
});

/*SET OPACITY WHEN YOU WANT ADD A NEW PLATE OR A NEW SANDWICH*/
$('.cardPlus').click(function (){
    $('.content_center').addClass('opa')
});
$('#add_ingr').click(function (){
    $('.content_center').addClass('opa')
});
$('.iconClose').click(function (){
    $('.content_center').removeClass('opa')
});


/*ADD A NEW PLATE*/
$('form[name=addPLate]').submit(function(){
    $.ajax({
        url: "/Home",
        type: "POST",
        data: {
            Name: $('#plate_name').val(),
            Price: $('#price').val(),
            imgFile: $('#imgFile').val(),
            Section_card: $('#section_card').val(),
        },
        done: function(){
            section = data['Section_card']
            loadCard(section);
        },
        error: function(){
            console.log('Error in addPlate.')
        }
    });
});

/*SIGNIN*/
$('form[name=signin]').submit(function(){
    $.ajax({
        url: "http://localhost:5000/signin",
        type: 'POST',
        data: {
            email: $("#email2").val(),
        },
    });
});

/*LOAD CARD*/
let numbCard = 1;
function loadCard(id){
    $('div').remove('.usCard');
    $('#section_card').val(id);
    setActive(id);
    $.ajax({
        url: "/LoadCard",
        type: 'POST',
        data: {
            Section_card: $('#section_card').val(),
        },
        success: function(resp){
            /*CREATE DYNAMICALLY CARDS WITH DETAILS TAKEN FROM THE DB*/
            let varTemp = resp['plates']
            for (let i = varTemp.length - 1; i >= 0; i--) {
                let newCard = varTemp[i]
                console.log('Sono in success.')
                numbCard++;
                let containerCards1 = document.getElementById('cntcards1')
                let newName = newCard['Name']
                let newPrice = newCard['Price']
                let newIdName = 'plate' + numbCard + '_name'
                let newIdPrice = 'plate' + numbCard + '_price'
                let newFilename = newCard['Filename']
                let externalCard
                let card
                let cardBody
                let imgCard
                let cardName
                let priceName
                let input

                externalCard = document.createElement("div")
                externalCard.classList.add('col-md-3')
                externalCard.classList.add('usCard')

                card = document.createElement("div")
                card.classList.add('card')

                cardBody = document.createElement("div")
                cardBody.classList.add('card-body')

                cardName = document.createElement("h5")
                cardName.classList.add('card-title')
                cardName.id = newIdName
                cardName.innerText = newName

                priceName = document.createElement("p")
                priceName.classList.add('card-text')
                priceName.id = newIdPrice
                priceName.innerText = 'Prezzo: ' + newPrice + '€'

                input = document.createElement("input")

                /*IF THE USER IS ADMIN APPEND TO THE CARD AN INPUT ELEMENT WITH REMOVE FUNCTION*/
                if(resp['Type'] === 'admin') {
                    input.classList.add('removeCard')
                    input.type = 'button'
                    input.value = 'Rimuovi'
                    input.addEventListener('click', function () {
                        removeCard(newCard['_id'])
                    });
                    /*ELSE APPEND TO THE CARD AN INPUT ELEMENT WITH ADD PRODUCT FUNCTION*/
                }else{
                    input.classList.add('button_book')
                    input.type = 'button'
                    input.value = 'Aggiungi'
                    input.addEventListener('click', function () {
                        addProductToBill(newIdName, newIdPrice)
                    });
                }



                imgCard = document.createElement("img")
                imgCard.src = '../static/images/mensa/' + newFilename
                imgCard.classList.add('card-img-top')
                imgCard.classList.add('imgCard')

                cardBody.appendChild(cardName)
                cardBody.appendChild(priceName)
                cardBody.appendChild(input)
                card.appendChild(imgCard)
                card.appendChild(cardBody)


                externalCard.appendChild(card)
                containerCards1.appendChild(externalCard)
            }

        },
        error: function(){
            console.log('Error in createCard.')
        }
    });

}

/*FUNCTION FOR SET ACTIVE THE SECTION ON MENU LIST*/
function setActive(id){
    let li = document.getElementById(id)
    $('.liPlate').removeClass("liActive");
    li.classList.add('liActive')
    if(li.getAttribute('id') === 'sandwiches'
        && document.getElementById('container_sandwiches').style.display === 'none'){
        document.getElementById('content_cards_menu').style.display = 'none'
        document.getElementById('container_sandwiches').style.display = 'inline-block'
    }
    else if(li.getAttribute('id') !== 'sandwiches'){
        document.getElementById('content_cards_menu').style.display = 'inline-block'
        document.getElementById('container_sandwiches').style.display = 'none'
    }
}

/*FUNCTION FOR REMOVECARD ON DB*/
function removeCard(idCard)
{
    $.ajax({
        url: "/DeleteCard",
        type: 'POST',
        data: {
            'Name': idCard,
        },
        success: function(){
            /*AFTER DELETE RELOAD*/
            section = $('#section_card').val();
            loadCard(section);
        },
        error: function(){
            console.log('Error in deleteCard.')
        }
    });

}

/*FUNCTION FOR LOADSANDWICHES*/
function loadSandwiches(id){
    $('.container_checkbox').empty()
    setActive(id);
    $.ajax({
        url: "/LoadSandwiches",
        type: 'POST',
        data: {
            Section_card: $('#section_card').val(),
        },
        success: function(resp){
            /*CREATE DINAMICALLY CHECKBOX WITH DETAILS TAKEN FROM DB*/
            let varTemp = resp['sandwiches']
            for (let i = varTemp.length - 1; i >= 0; i--) {
                let sandwich = varTemp[i]
                console.log('Sono in success dei panini.')
                let nameContainer = sandwich['Type']
                let containerSandwiches = document.getElementById(nameContainer)
                let newName = sandwich['Name']
                let newPrice = sandwich['Price']
                let newIdName = sandwich['Type'] + i
                let label
                let input
                let br

                br = document.createElement('br')

                label = document.createElement('label')
                label.setAttribute('for', newIdName)
                label.innerText = ' '+newName + '('+newPrice+')'
                label.classList.add('labelSandwiches')

                input = document.createElement("input")

                input = document.createElement("input")
                /*IF THE USER IS ADMIN APPEND CHECKBOXES ELEMENT WITH REMOVE FUNCTION*/
                if(resp['Type'] === 'admin') {
                    input.type = 'image'
                    input.src = '../static/images/body_home/cestino.png'
                    input.classList.add('icon3')
                    input.addEventListener('click', function () {
                        removeSandwich(sandwich['_id'])
                    });
                    /*ELSE APPEND SIMPLY CHECKBOXES*/
                }else{
                    input.type = 'checkbox'
                    input.classList.add('checkbox_sandwiches')
                    if(sandwich['Type'] === 'bread')
                    {
                        input.classList.add('bread')
                    }
                    input.setAttribute('value', newPrice);
                    input.setAttribute('id', newIdName)
                }

                containerSandwiches.appendChild(input)
                containerSandwiches.appendChild(label)
                containerSandwiches.appendChild(br)
            }

        },
        error: function(){
            console.log('Error in createCard.')
        }

    });

}


/*FUNCTION FOR REMOVE AN INGREDIENTS IN THE DB*/
function removeSandwich(idSandwiches)
{
    $.ajax({
        url: "/DeleteSandwiches",
        type: 'POST',
        data: {
            'Name': idSandwiches,
        },
        success: function(){
            /*AFTER DELETE LOAD SANDWICHES*/
            loadSandwiches('sandwiches')
        },
        error: function(){
            console.log('Error in deleteCard.')

        }
    });

}

/*FUNCTION FOR ORDER PLATES AND SANDWICHES*/
function toOrder(){
    $.ajax({
        url: "/Order",
        type: 'POST',
        data: JSON.stringify(elementCart),
        contentType: 'application/json',
        success: function(){
            /*AFTER CREATE THE ORDER REFRESH THE BILL*/
            console.log("SUCCESS ORDINI")
            drop_all_product()
        },
        error: function(){
            console.log('Error in ORDER.')

        }
    });

}

/*FUNCTION FOR LOAD ORDERS*/
function loadOrder(){
    $.ajax({
        url: "/LoadOrder",
        type: 'POST',
        success: function(resp){
            /*CREATE DYNAMICALLY ORDER WITH DETAIL TAKEN FROM THE DB*/
            console.log("SUCCESS Load ORDINI")
            let varTemp = resp['orders']
            for (let i = varTemp.length - 1; i >= 0; i--) {
                let order = varTemp[i]
                let containerOrder = document.getElementById('content_order')
                let containerSingleOrder
                let containerListOrder
                let containerBill
                let allOrder = order['Plates']
                let data
                let userName
                let priceTot
                let stringOrders
                let state
                let dvtitle1
                let dvtitle2
                let divCntLst
                let divCntBll
                let title1
                let title2
                let input

                containerSingleOrder = document.createElement('div')
                containerSingleOrder.classList.add('container-fluid')
                containerSingleOrder.classList.add('container_order')

                containerListOrder = document.createElement('div')
                containerListOrder.classList.add('content_order2')

                dvtitle1 = document.createElement('div')
                divCntLst = document.createElement('div')
                title1 = document.createElement('h3')
                title1.classList.add('hOrder')
                title1.innerText = 'Lista:'

                dvtitle2 = document.createElement('div')
                divCntBll = document.createElement('div')
                title2 = document.createElement('h3')
                title2.classList.add('hOrder')
                title2.innerText = 'Dettagli:'

                containerBill = document.createElement('div')
                containerBill.classList.add('content_order2')

                /*IF THE USER IS AN USER AND THE STATE IS CLOSED, SET THE CLASS IN CLOSED*/
                if(resp['Type'] === 'user')
                {
                    if(order['State'] === 'closed')
                    {
                        containerSingleOrder.classList.add('orderClosed')
                    }
                }

                containerOrder.appendChild(containerSingleOrder)
                containerSingleOrder.appendChild(containerListOrder)
                containerListOrder.appendChild(dvtitle1)
                dvtitle1.appendChild(title1)
                containerListOrder.appendChild(divCntLst)

                containerSingleOrder.appendChild(containerBill)
                containerBill.appendChild(dvtitle2)
                dvtitle2.appendChild(title2)
                containerBill.appendChild(divCntBll)


                priceTot = document.createElement('p')
                priceTot.innerText = 'Prezzo totale: ' + order['PriceTot'] + '€'
                priceTot.classList.add('boldText')

                data = document.createElement('p')
                data.innerText = 'Data ordine: ' + order['Data']
                data.classList.add('boldText')

                userName = document.createElement('p')
                userName.innerText = 'Nome utente: ' + order['UserName']
                userName.classList.add('boldText')

                state = document.createElement('p')
                state.innerText = 'Stato ordine: ' + order['State']
                state.classList.add('boldText')

                stringOrders = document.createElement('p')
                for (let x = allOrder.length -1; x >=0; x--)
                    stringOrders.innerText = stringOrders.innerText + '\n' + allOrder[x]

                divCntLst.appendChild(stringOrders)
                divCntBll.appendChild(priceTot)
                divCntBll.appendChild(data)
                divCntBll.appendChild(userName)
                divCntBll.appendChild(state)

                /*IF THE USER IS ADMIN APPEND AN INPUT ELEMENT FOR CLOSE THE ORDER*/
                if(resp['Type'] === 'admin')
                {
                    input = document.createElement('input')
                    input.classList.add('buttonClose')
                    input.type = 'button'
                    input.value = 'Chiudi ordine'
                    input.addEventListener('click', function () {
                        closeOrder(order['_id'])
                    });
                    divCntLst.appendChild(input)
                }
            }
        }

    });

}

/*FUNCTION FOR CLOSE THE ORDER ONLY ADMIN USER*/
function closeOrder(idOrder){
    $.ajax({
        url: "/closeOrder",
        type: 'POST',
        data: {
            'Id': idOrder
        },
        success: function(){
        }

    });
}

/*FUNCTION FOR ADD INGREDIENT IN THE LIST OF INGREDIENTS IN SANDWICHES SECTION*/
function addSandwiches()
{
    $.ajax({
        url: "/addSand",
        type: 'POST',
        data: {
            'sand_name': $('#sand_name').val(),
            'sand_price': $('#sand_price').val(),
            'typeSand': $('#typeSand').val(),
        },
        success: function(){
            window.location.reload();
        }

    });
}