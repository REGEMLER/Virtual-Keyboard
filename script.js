import keysModel from './keys.js';
const textarea = document.getElementById("textarea"); 
const keyboard = document.getElementById("keyboard"); 
console.log(keysModel); 
let isCaps = false; 
let isShift = false; 


//language 
let lang;

const getLangLocalStarage = () => {
    if(localStorage.getItem("lang", lang)){
        lang = localStorage.getItem("lang", lang); 
    } else {
        lang = "en"
    }
    console.log(lang); 
}

const setLangLocalStarage = () => {
    localStorage.setItem("lang", lang);
}

window.addEventListener('beforeunload', setLangLocalStarage);
window.addEventListener('load', getLangLocalStarage);



function pressKeyboard(event){
    console.log(event.code);
    console.log(event.key);
    if(event.altKey && event.shiftKey){
        lang = lang === "en" ? "ru" : "en"; 
        console.log(lang); 
    }
    if(event.key ==="CapsLock"){
        isCaps = !isCaps; 
        console.log(isCaps); 
    }
}

function clickKeyboard(event){
    if(event.target.classList.contains("e-key")){
        const allKeys = [...document.querySelectorAll(".key")];
        const keyPressed = allKeys.find(item => item.id == event.target.id); 
        const keyPressedInModel = keysModel.find(item => item.id == event.target.id);
        keyPressed.textContent = isCaps? keyPressedInModel[lang].textCaps : keyPressedInModel[lang].text;  
        console.log(keyPressed); 
        console.log(keyPressedInModel);
        console.log(`This is key ${event.target.id}`)
    } else if(event.target.classList.contains("e-code")){
        console.log(`This is code ${event.target.id}`)
    } 
}


keyboard.addEventListener("click", clickKeyboard);
document.body.addEventListener("keydown", pressKeyboard);