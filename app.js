

var inputButton = document.querySelector("#btn-translate");
var textInput = document.querySelector('textarea');
var outputText = document.querySelector("#output-text");


// var serverURL = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json"

var serverURL = "https://api.funtranslations.com/translate/vulcan.json"


function urlText(text){
    return serverURL + "?" + "text=" + text
}

function errorHandler(error) {
    console.log("error occured", error)
    alert("something wrong with server: try again later")
}


function clickHandler() {
//  outputDiv.innerText = "ajsjsjs " + txtInput.value;

 var inputText = txtInput.value; //taking input

 //calling server for processing
 fetch(getTranslationURL(inputText))
  .then(response => response.json())
  .then(json => {
      var translatedText = json.contents.translated;
      outputDiv.innerText = translatedText;
       })
  .catch(errorHandler)

 
};



inputButton.addEventListener("click", function userClick() {
    
    if (textInput.value === '') {

        alert('Please enter your sentence.');
    } else if (!isNaN(parseFloat(textInput.value))) {
        alert('Please Enter Text!');
    } else if (/\d/.test(textInput.value)) {
        alert('Please Enter only Text!text in english');
    } else {
        fetch(urlText(textInput.value)).then(response => response.json()).then(function getJsonLog(json) {
            console.log(urlText(textInput.value));
            console.log(json);
            outputText.innerText = json.contents.translated;
        }).catch(function errorHandling(error) {
            if (error.code === 429) {
                alert("Sorry! Currently we are overloaded with too many requests.Please try again in a while.");
            } else {
                console.log("Sorry an Error Occured", error);
                alert("Something went wrong with our server! Try again after some time");
            }
        });
    }
});



