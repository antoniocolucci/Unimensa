function showContainer(element_id) {

    let element = document.getElementById(element_id)
    if(element.style.display === 'none') {
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}

function changeIcon(element_id){
    let firstOcc = document.getElementById(element_id).src.indexOf('images')
    let var2 = document.getElementById(element_id).src.substr(firstOcc,document.getElementById(element_id).src.length)
    let var1 = "../"+var2
    if(var1 === "../images/header/"+element_id+".png")
     {
        document.getElementById(element_id).src = "../images/header/"+element_id+"clicked.png"
     }
    else
     {
        document.getElementById(element_id).src = "../images/header/"+element_id+".png"
     }

}

function hideOtherMenu (element_id) {
    let element = document.getElementById(element_id)
    let nameContainer = [
        'container_notifications',
        'container_profile',
        'lateral_menu'
    ]

    if(element === document.getElementById(nameContainer[0]))
     {
         if(document.getElementById(nameContainer[1]).style.display === 'block') {
             document.getElementById(nameContainer[1]).style.display = 'none'
             changeIcon('imgProfile')
         }
        document.getElementById(nameContainer[2]).style.display= 'none'
     }

    else if (element === document.getElementById(nameContainer[1]))
     {
         if(document.getElementById(nameContainer[0]).style.display === 'block') {
             document.getElementById(nameContainer[0]).style.display= 'none'
             changeIcon('imgBell')
         }
         document.getElementById(nameContainer[2]).style.display= 'none'
     }

    else
     {
         if(document.getElementById(nameContainer[0]).style.display === 'block') {
             document.getElementById(nameContainer[0]).style.display= 'none'
             changeIcon('imgBell')
         }
         if(document.getElementById(nameContainer[1]).style.display === 'block') {
             document.getElementById(nameContainer[1]).style.display= 'none'
             changeIcon('imgProfile')
         }
     }
}


function showContent (container_id) {
    let container = document.getElementById(container_id)
    let nameContainer = [
        'container_center1',
        'container_center2'
    ]

    if (container === document.getElementById(nameContainer[1]) && container.style.display === 'none') {
        document.getElementById(nameContainer[1]).style.display = 'block'
        document.getElementById(nameContainer[0]).style.display = 'none'
    }

    if (container === document.getElementById(nameContainer[0]) && container.style.display === 'none')
    {
        document.getElementById(nameContainer[0]).style.display = 'block'
        document.getElementById(nameContainer[1]).style.display = 'none'
    }

}


function goTo(page){
    window.location.href = page;
}









/*   DA RICORDARE

function setOpacity(element_id, x) {


    let elemento = document.getElementById("menu_opacity");
    elemento.style.opacity = 0.5;

    let a = document.getElementById("close_menu");
    a.style.opacity = 1;


}

function resetOpacity(x) {


    let elemento = document.getElementById("menu_opacity");
    elemento.style.opacity = 1;

}*/