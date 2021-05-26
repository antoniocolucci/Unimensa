$(document).ready(function(){
    $('.liPlate').click(function(){
        $('.liPlate').removeClass("liActive");
        $(this).addClass("liActive");

    });

});



$('input[type="checkbox"]').on('change', function() {
    $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);
});

