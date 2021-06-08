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

    $('form[name=login]').submit(function(e){

        let form = $(this)
        let error = form.find(".error")
        let data = form.serialize()
        $.ajax({
            url: "http://localhost:5000/",
            type: "POST",
            data: data,
            dataType: "json"
            success: function(resp){
                    window.location.href = "/Home"
            },
            error: function(resp){
                console.log('error')
            }
        });
       e.preventDefault();
    });
});

