$(document).ready(function(){
    }
);

    $('.liPlate').click(function(){
        loadCard(this.id);
    });

    $('input[type="checkbox"]').on('change', function(){
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
        let id = $(".liPlate.liActive").attr('id')
        $.ajax({
        url: "/Home",
        type: "POST",
        data: {
            Name: $('#plate_name').val(),
            Price: $('#price').val(),
            Ingredients: $('#ingredients').val(),
            imgFile: $('#imgFile').val(),
            section: JSON.stringify(id),
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
    setActive(id);
    $.ajax({
        url: "http://localhost:5000/api/Home",
        type: 'POST',
        data: {
            section: id,
        },
        success: function(cardToInsert){
            for (let i = cardToInsert.length - 1; i >= 0; i--) {
                let newCard = cardToInsert[i]
                        console.log('Sono in success.')
                        numbCard++;
                        let containerCards1 = document.getElementById('cntcards1')
                        let containerCards2 = document.getElementById('cntcards2')
                        let newName = newCard['Name']
                        console.log('newName', newName)
                        let newPrice = newCard['Price']
                        console.log('newPrice', newPrice)
                        let newIngredients = newCard['Ingredients']
                        console.log('newIngredients', newIngredients)
                        let newIdName = 'plate' + numbCard + '_name'
                        console.log('newIdName', newIdName);
                        let newIdPrice = 'plate' + numbCard + '_price'
                        console.log('newIdPrice: ', newIdPrice)
                        let newFilename = newCard['Filename']
                        console.log('newFilename: ', newFilename)
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
                        input.classList.add('button_book')
                        input.type = 'button'
                        input.value = 'Aggiungi'
                        input.addEventListener('click', function () {
                            addProductToBill(newIdName, newIdPrice)
                        });


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
    console.log($(".liPlate.liActive").attr('id'))
}