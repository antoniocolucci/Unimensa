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
});

/*1) isClicked in Database
2) aggiungere attributo isClicked a tutte le card e ai checkbox*/