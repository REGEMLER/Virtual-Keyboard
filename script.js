const textarea = document.getElementById("textarea"); 
const keyboard = document.getElementById("keyboard"); 


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



const keys = {
    en : [
        {id : "Backquote", text : "`", classes : ["e-key", "key"]},
        {id : "q", text : "q", classes : ["e-key", "key"]},
        {id : "w", text : "w", classes : ["e-key", "key"]},
    ],
    ru : [
        {id : "Backquote", text : "`", classes : ["e-key", "key"]},
        {id : "q", text : "й", classes : ["e-key", "key"]},
        {id : "w", text : "ц", classes : ["e-key", "key"]},
    ]
}

function pressKeyboard(event){
    console.log(event.code);
    console.log(event.key);
    if(event.altKey && event.shiftKey){
        lang = lang === "en" ? "ru" : "en"; 
        console.log(lang); 
    }
}

function clickKeyboard(event){
    if(event.target.classList.contains("e-key")){
        console.log(`This is key ${event.target.id}`)
    } else if(event.target.classList.contains("e-code")){
        console.log(`This is code ${event.target.id}`)
    } 
}

// textarea.addEventListener("keydown", handler);
keyboard.addEventListener("click", clickKeyboard);
document.body.addEventListener("keydown", pressKeyboard);