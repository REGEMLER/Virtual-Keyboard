import keysModel from './keys.js';


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
}

const setLangLocalStarage = () => {
    localStorage.setItem("lang", lang);
}

function loader(){
    getLangLocalStarage();
    create() 
}

window.addEventListener('beforeunload', setLangLocalStarage);
window.addEventListener('load', loader);



function createKey(i){
    const div = document.createElement("DIV"); 
    div.id = keysModel[i].id; 
    div.textContent = keysModel[i][lang].text; 
    for(let item of keysModel[i].classes){
        div.classList.add(item); 
    }
    return div; 
}

function create(){
    const wrapper = document.createElement("DIV");
    wrapper.classList.add("wrapper");

    const content = document.createElement("DIV");
    content.classList.add("content");

    const h1 = document.createElement("H1");
    h1.classList.add("title");
    h1.textContent = "Virtual Keyboard"; 

    const textarea = document.createElement("textarea");
    textarea.classList.add("textarea");
    textarea.setAttribute("id", "textarea");
    textarea.setAttribute("name", "textarea");
    textarea.setAttribute("cols", "50");
    textarea.setAttribute("rows", "5");

    const main = document.createElement("MAIN");
    main.classList.add("keyboard");
    main.id = "keyboard";

    let row; 
    for(let i = 0; i < keysModel.length; i++){
        if(i === 0){
            row = document.createElement("DIV");
            row.classList.add("keyboard-row");
        }

        if(i !==0 && keysModel[i].row !== keysModel[i - 1].row){
            main.append(row); 
            row = null; 
            row = document.createElement("DIV");
            row.classList.add("keyboard-row");
        }

        let key = createKey(i); 
        row.append(key); 

        if(i === keysModel.length - 1){
            main.append(row); 
        }
    }

    const footer = document.createElement("FOOTER");
    footer.classList.add("footer");

    const p1 = document.createElement("P");
    p1.classList.add("text");
    p1.textContent = "Клавиатура создана в операционной системе Linux"; 

    const p2 = document.createElement("P");
    p2.classList.add("text");
    p2.textContent = "Для переключения языка комбинация: левыe shift + alt";

    content.append(h1);
    content.append(textarea);
    content.append(main);
    content.append(footer);
    footer.append(p1);
    footer.append(p2);
    wrapper.append(content);
    document.body.prepend(wrapper); 

    main.addEventListener("click", clickKeyboard)
}




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

;
document.body.addEventListener("keydown", pressKeyboard);