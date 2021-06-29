$(document).ready(function(){

  }
);
    $('.liPlate').click(function(){
        let id = this.id
        if(id === 'sandwiches')
             loadSandwiches(id);
        else
            loadCard(id);
    });

    $('input[type="checkbox"].pane').on('change', function(){
        $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);

    });

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

    $('.cardPlus').click(function (){
        $('.content_center').addClass('opa')
    });

    $('.iconClose').click(function (){
        $('.content_center').removeClass('opa')
    });



$('form[name=addPLate]').submit(function(){
        $.ajax({
        url: "/Home",
        type: "POST",
        data: {
            Name: $('#plate_name').val(),
            Price: $('#price').val(),
            Ingredients: $('#ingredients').val(),
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

    $('form[name=signin]').submit(function(){
        $.ajax({
            url: "http://localhost:5000/signin",
            type: 'POST',
            data: {
                email: $("#email2").val(),
            },

        });
    });

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
            let varTemp = resp['plates']
            for (let i = varTemp.length - 1; i >= 0; i--) {
                let newCard = varTemp[i]
                        console.log('Sono in success.')
                        numbCard++;
                        let containerCards1 = document.getElementById('cntcards1')
                        let newName = newCard['Name']
                        let newPrice = newCard['Price']
                        let newIngredients = newCard['Ingredients']
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
                        if(resp['Type'] === 'admin') {
                            input.classList.add('button_deleteAll')
                            input.type = 'button'
                            input.value = 'Rimuovi'
                            input.addEventListener('click', function () {
                                removeCard(newCard['_id'])
                            });
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

function removeCard(idCard)
{
    $.ajax({
        url: "/DeleteCard",
        type: 'POST',
        data: {
            'Name': idCard,
        },
        success: function(){
            section = $('#section_card').val();
            loadCard(section);
        },
        error: function(){
            console.log('Error in deleteCard.')
        }
    });

}


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
                        label.setAttribute('for', newIdName);
                        label.innerText = ' '+newName + '('+newPrice+')'
                        label.classList.add('labelSandwiches')
                        console.log(label.getAttribute('for'))

                        input = document.createElement("input")
                        input.id = newIdName

                        input = document.createElement("input")
                        if(resp['Type'] === 'admin') {
                            input.type = 'image'
                            input.src = '../static/images/body_home/cestino.png'
                            input.classList.add('icon3')
                            input.addEventListener('click', function () {
                                removeSandwich(sandwich['_id'])
                            });
                        }else{
                            input.type = 'checkbox'
                            input.classList.add('checkbox_sandwiches')
                            input.setAttribute('value', newPrice);
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



function removeSandwich(idSandwiches)
{
    $.ajax({
        url: "/DeleteSandwiches",
        type: 'POST',
        data: {
            'Name': idSandwiches,
        },
        success: function(){
            //$('.container_checkbox').remove('#'+idSandwiches);
            //$('.container_checkbox').remove('label[for='+idSandwiches+']');
            //window.location.reload();
            //$('.container_checkbox').remove('.icon3');
            //$('.container_checkbox').remove('.labelSandwiches');
            loadSandwiches('sandwiches')
        },
        error: function(){
            console.log('Error in deleteCard.')

        }
    });

}