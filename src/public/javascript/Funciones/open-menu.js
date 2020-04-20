$(document).ready(function(){    
    $("#menu-button").click(function(){
        //Muestra el Menu
        $(".menu").toggleClass("open");
    });

    $('#open-navigation-mobile').click(function(e){
        e.preventDefault();
        console.log("Hola");
        $('#navigation-mobile-btns').css("display","block");
        $('#nav-bar').css("height", "40%");
    });

});