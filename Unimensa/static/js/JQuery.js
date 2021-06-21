$(document).ready(function(){

    }
);



    $('.liPlate').click(function(){
        $('.liPlate').removeClass("liActive");
        $(this).addClass("liActive");
        if(this.getAttribute('id') === 'sandwiches'
            && document.getElementById('container_sandwiches').style.display === 'none'){
            document.getElementById('content_cards_menu').style.display = 'none'
            document.getElementById('container_sandwiches').style.display = 'inline-block'
        }
       else if(this.getAttribute('id') !== 'sandwiches'){
            document.getElementById('content_cards_menu').style.display = 'inline-block'
            document.getElementById('container_sandwiches').style.display = 'none'
       }

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



    $('form[name=addPlate]').submit(function(){
    $.ajax({
        dataType: 'json',
        url: "/Home",
        type: "POST",
        data: {
            Name: $('#plate_name').val(),
            Price: $('#price').val(),
            Ingredients: $('#ingredients').val(),
            imgFile: $('#imgFile').val()
        },
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



let numbCard = 0;
function loadCard(){
    $.ajax({
        url: "http://localhost:5000/api/Home",
        type: 'POST',
        success: function(cardToInsert){
            let newCard = cardToInsert
            console.log(cardToInsert)
            console.log(newCard)
            if(newCard){
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
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

                priceName = document.createElement("p")
                priceName.classList.add('card-text')
                priceName.id = newIdPrice

                input = document.createElement("input")
                input.classList.add('button_book')
                input.type = 'button'
                input.value = 'Aggiungi'
                input.addEventListener('click',function(){
                    addProductToBill(newIdName,newIdPrice)
                });


                imgCard = document.createElement("img")
                imgCard.src = '../static/images/mensa/' + newFilename
                imgCard.classList.add('card-img-top')
                imgCard.classList.add('imgCard')

                cardBody.appendChild(imgCard)
                cardBody.appendChild(cardName)
                cardBody.appendChild(priceName)
                cardBody.appendChild(input)
                card.appendChild(cardBody)


                externalCard.appendChild(card)
                containerCards1.appendChild(externalCard)
            }
        },
        error: function(){
            console.log('0000000000000000000000000000000000000000000000000000000000000, error in createCard')
        }

    });

}
