import keysModel from './keys.js';
let isCaps = false; 
let iShift = false; 

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


//creating
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

    main.addEventListener("click", clickKeyboard);
    main.addEventListener("mousedown", mouseDownShift);
    main.addEventListener("mouseup", mouseUpShift);
}


//keypress


function pressKeyboard(event){

    const key = document.getElementById(event.code); 
    key.classList.add("active");

    if(event.altKey && event.shiftKey){
        lang = lang === "en" ? "ru" : "en";  
        const key1 = document.getElementById("AltLeft"); 
        key1.classList.add("active"); 
        const key2 = document.getElementById("ShiftLeft"); 
        key2.classList.add("active"); 
        return;  
    }

    if(event.code ==="CapsLock"){ 
        const allKeys = [...document.querySelectorAll(".key")];
        isCaps = !isCaps; 
        for(let key of allKeys) {
            let keyInModel = keysModel.find(item => item.id == key.id);
            key.textContent = isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text; 
        }
        return; 
    }

    if((event.code ==="ShiftLeft" || event.code ==="ShiftRight") && !event.altKey ){
        const allKeys = [...document.querySelectorAll(".key")];
        iShift = true;
        for(let key of allKeys) {
            let keyInModel = keysModel.find(item => item.id == key.id);
            key.textContent = keyInModel[lang].textShift; 
        }
        return; 
    }

    if(event.code === "Enter"){
        textarea.innerHTML += "\n"; 
        return;
    }

    if(event.code === "Backspace"){
        let inner  = textarea.innerHTML.split("");
        inner.pop(); 
        let newInner = inner.join("");
        textarea.innerHTML = newInner; 
        return;
    }

    if(event.code === "Tab"){
        textarea.innerHTML += "    "; 
        return;
    }

    if(event.code === "Delete" || event.ctrlKey || (event.altKey && !event.shiftKey)){
        return;
    }


    const keyInModel = keysModel.find(item => item.id === event.code);
    if(keyInModel){
        const textarea = document.getElementById("textarea");
        if(event.shiftKey){
            textarea.innerHTML += keyInModel[lang].textShift; 
        } else {
            textarea.innerHTML += isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text; 
        }
    }
}


function deleteClass(event){
    const key = document.getElementById(event.code); 
    key.classList.remove("active"); 

    if(event.altKey && event.shiftKey){
        const key1 = document.getElementById("AltLeft"); 
        key1.classList.remove("active"); 
        const key2 = document.getElementById("ShiftLeft"); 
        key2.classList.remove("active"); 
        const wrapper = document.getElementById("wrapper");
        wrapper.remove();
        create(); 
        return;
    }

    if((event.code ==="ShiftLeft" || event.code ==="ShiftRight")){
        iShift = false;
        const allKeys = [...document.querySelectorAll(".key")];
        for(let key of allKeys) {
            let keyInModel = keysModel.find(item => item.id == key.id);
            key.textContent = keyInModel[lang].text; 
        }
        return; 
    }
}



//clicking

function clickKeyboard(event){

    if(!event.target.classList.contains("key")){
        return;
    }

    const textarea = document.getElementById("textarea");
    const allKeys = [...document.querySelectorAll(".key")];
    const keyPressed = allKeys.find(item => item.id == event.target.id); 


    if(event.target.classList.contains("e-key")){
        textarea.innerHTML += keyPressed.textContent; 
       
    } else if(event.target.classList.contains("e-code")){

        if(keyPressed.id === "Tab") {
            textarea.innerHTML += "    "; 
        }
        if(keyPressed.id === "Backspace") {
            let inner  = textarea.innerHTML.split("");
            inner.pop(); 
            let newInner = inner.join("");
            textarea.innerHTML = newInner; 
        }
        if(keyPressed.id === "Delete") {
            console.log(event.target);
        }
        if(keyPressed.id === "Enter") {
            textarea.innerHTML += "\n"; 
        }
        if(keyPressed.id === "CapsLock") {
            const keys = [...document.querySelectorAll(".key")]; 
            isCaps = !isCaps; 
            for(let key of keys) {
                let keyInModel = keysModel.find(item => item.id == key.id);
                key.textContent = isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text; 
            }
        }        
    } 
}

function mouseDownShift(event){
    if(event.target.id === "ShiftRight" || event.target.id === "ShiftLeft"){
        iShift = true;
        const keys = [...document.querySelectorAll(".key")]; 
        for(let key of keys) {
            let keyInModel = keysModel.find(item => item.id == key.id);
            key.textContent = keyInModel[lang].textShift; 
        }
    }
}

function mouseUpShift(event){
    if(event.target.id === "ShiftRight" || event.target.id === "ShiftLeft"){
        iShift = false;
        const keys = [...document.querySelectorAll(".key")]; 
        for(let key of keys) {
            let keyInModel = keysModel.find(item => item.id == key.id);
            key.textContent = keyInModel[lang].text; 
        }
    }
}


document.body.addEventListener("keydown", pressKeyboard);
document.body.addEventListener("keyup", deleteClass);