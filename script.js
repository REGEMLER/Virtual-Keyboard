const textarea = document.getElementById("textarea"); 
const keyboard = document.getElementById("keyboard"); 

function handler(event){
    console.log(event.code);
    console.log(event.key);
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
document.body.addEventListener("keydown", handler);