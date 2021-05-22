/*$(document).ready(function(){
    $(".liPlate").click(function(){
        $(this).toggleClass('liActive');
    });
});
*/

/*    $(document).ready(function() {
    $(".liPlate").click(function ( e ) {
        e.preventDefault();
        $("liActive").removeClass("liActive"); //Remove any "active" class
        $(this).addClass("liActive"); //Add "active" class to selected tab

// $(activeTab).show(); //Fade in the active content
    });
});*/


$(document).ready(function(){
    $('.liPlate').click(function(){
        $('.liPlate').removeClass("liActive");
        $(this).addClass("liActive");
    });
});
