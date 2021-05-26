$(document).ready(function(){
    $('.liPlate').click(function(){
        $('.liPlate').removeClass("liActive");
        $(this).addClass("liActive");
        console.log(this.getAttribute('id'))
        if(this.getAttribute('id') === 'sandwiches'
            && document.getElementById('container_sandwiches').style.display === 'none'){
            document.getElementById('content_create_menu').style.display = 'none'
            document.getElementById('container_sandwiches').style.display = 'inline-block'
        }
       else if(this.getAttribute('id') !== 'sandwiches'){
            document.getElementById('content_create_menu').style.display = 'inline-block'
            document.getElementById('container_sandwiches').style.display = 'none'
       }

    });

});



$('input[type="checkbox"]').on('change', function() {
    $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);
    let tot = document.getElementById('tot')
    let name = this.getAttribute('id')
    let label = document.querySelector(`label[for = '${name}']`)
    let price = parseFloat(label.getAttribute('value'))

    if(this['checked'] && this === beforeClickedElement){
        totalSpending = totalSpending + price
    }else if(!(this['checked']) && this === beforeClickedElement){
        totalSpending = totalSpending - price
    }else{
        if(isClicked)
        {
            totalSpending =  totalSpending - parseFloat(beforeClickedPrice)
            totalSpending = totalSpending + price
        }else if(!(isClicked)){

            totalSpending = totalSpending + price
        }
        beforeClickedPrice = price
    }
    tot.innerText = 'Totale= ' + totalSpending + '€'
    beforeClickedElement = document.getElementById(name)
    if(beforeClickedElement['checked']){
        isClicked = true
    }else{
        isClicked = false
    }
});

/*1) isClicked in Database
2) aggiungere attributo isClicked a tutte le card e ai checkbox*/