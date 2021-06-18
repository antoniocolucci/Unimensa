
function previewFile(evt) {
    /*Select a file*/
    let file = evt.target.files;
    let f = file[0];
    /*If type is not an image, show alert*/
    if (!f.type.match('image.*')) {
        alert("Attenzione: il file selezionato deve essere una immagine");
        return false;
    }

    /*FileReader is used to read the content of a file on our computer*/
    let reader = new FileReader();

    /*Onload of fileReader, put the image in the div preview*/
    reader.onload = (function (theFile) {
        return function(e) {
            /*The title is the filename, and the src is the PATH of file*/
            document.getElementById('preview').innerHTML = '<img class="resize" title="'+escape(theFile.name)+'" src="'+e.target.result+'" draggable="false" ondragstart="return false;"/>';
        };
    })(f);


    /*The readAsDataURL method is used to handle binary files, such as images in our example.
    The content of the file is interpreted as a "data URL", which is a base64 representation
    of the content of the file*/
    reader.readAsDataURL(f);
}

/*We wait for the page to be fully loaded, and at that moment we clean up the fields*/
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('imgFile').value='';
    document.getElementById('preview').value='';
    /*On change of imgFile (input button file) do function previewFile*/
    document.getElementById('imgFile').addEventListener('change', previewFile, false);
});

let numbCard = 0;
function createCard(result){
   numbCard++;
   let containerCards1 = document.getElementById('cntcards1')
   let containerCards2 = document.getElementById('cntcards2')
   let newName = result['Name']
   let newPrice = result['Price']
   let newIngredients = result['Ingredients']
   let newIdName = 'plate'+numbCard+'_name'
   let newIdPrice = 'plate'+numbCard+'_price'
   let newFilename = result['Filename']
   let externalCard
   let card
   let cardBody
   let imgCard

   externalCard = document.createElement("div")
   externalCard.classList.add('col-md-3 usCard')

   card = document.createElement("div")
   card.classList.add('card')

   cardBody = document.createElement("div")
   cardBody.classList.add('card-body')
   
   imgCard = document.createElement("img")
   imgCard.src = '../Unimensa/static/images/mensa/'+newFilename
   imgCard.classList.add('card-img-top imgCard')

   cardBody.appendChild(imgCard)
   card.appendChild(cardBody)
   externalCard.appendChild(card)
   containerCards1.appendChild(externalCard)
}