$(document).ready(function(){
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

    $('input[type="checkbox"]').on('change', function() {
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

});

