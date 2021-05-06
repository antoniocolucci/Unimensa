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
    if(var1 === "../images/"+element_id+".png")
     {
        document.getElementById(element_id).src = "../images/"+element_id+"clicked.png"
     }
    else
     {
        document.getElementById(element_id).src = "../images/"+element_id+".png"
     }

}

function hideOtherMenu (element_id) {
    let element = document.getElementById(element_id)
    let nameContainer = [
        'container_notifications',
        'container_profile',
        'lateral_menu'
    ]

    if(element == document.getElementById(nameContainer[0]))
     {
         if(document.getElementById(nameContainer[1]).style.display == 'block') {
             document.getElementById(nameContainer[1]).style.display = 'none'
             changeIcon('imgProfile')
         }
        document.getElementById(nameContainer[2]).style.display= 'none'
     }

    else if (element == document.getElementById(nameContainer[1]))
     {
         if(document.getElementById(nameContainer[0]).style.display == 'block') {
             document.getElementById(nameContainer[0]).style.display= 'none'
             changeIcon('imgBell')
         }
         document.getElementById(nameContainer[2]).style.display= 'none'
     }

    else
     {
         if(document.getElementById(nameContainer[0]).style.display == 'block') {
             document.getElementById(nameContainer[0]).style.display= 'none'
             changeIcon('imgBell')
         }
         if(document.getElementById(nameContainer[1]).style.display == 'block') {
             document.getElementById(nameContainer[1]).style.display= 'none'
             changeIcon('imgProfile')
         }
     }
}