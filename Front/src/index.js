const { default: axios } = require("axios");

const URLInput = document.getElementById("UrlInput");
const URLOutput = document.getElementById("root");
const button = document.getElementById("go");
const inputshorturl = document.getElementById("shorturl");
const getstat = document.getElementById("getstates");
const stats = document.getElementById("stats");
const customeURL = document.getElementById("customeURL");
const home = document.getElementById("home");
const statsBtn = document.getElementById("statsBtn");
const header = document.getElementById("header");
const root = document.getElementById("root");

const signIn = document.getElementById("signIn");
const signUp = document.getElementById("signUp");



// const myAPI = " https://yurls.herokuapp.com"
const myAPI = " http://localhost:8080"

button.addEventListener("click", async function(){
    try {
        const shotUrl = customeURL.value;
        if(!validator.isURL(URLInput.value)){
            displayUrl("Please enter a valid URL");
            return
        }
        const data = await axios.get(`${myAPI}/makeurl`, {
            headers: {
                longurl : URLInput.value,
                shorturl: shotUrl  
            }
        })
        displayUrl(data.data);
        URLInput.value = "";
    } catch (error) {      
        console.log(error);
    }
})

getstat.addEventListener("click", async function(){
    const data = await axios.get(`${myAPI}/status`, {
        headers: {
            shorturl : inputshorturl.value 
        }
    })
    console.log(data);
    clearStatus();
    const longurl = createElement("div", "status");
    longurl.classList.add("showinfosmall")
    const date = createElement("div", "status");
    date.classList.add("showinfo")
    const counter = createElement("div", "status");
    counter.classList.add("showinfo")
    longurl.textContent = `Original URL: ${data.data.longurl}`;
    counter.textContent = `Times Visited: ${data.data.counter}`;
    date.textContent = `Date Created: ${data.data.date}`;
    stats.append(longurl, counter , date);
})

statsBtn.addEventListener("click", ()=>{
    try {
        URLInput.style.visibility = "hidden";
        button.style.visibility = "hidden";
        customeURL.style.visibility = "hidden";
        header.style.visibility = "hidden";
        stats.style.visibility = "visible";
        root.style.visibility = "hidden";
    } catch (error) {
        
    }
})

home.addEventListener("click", ()=>{
    URLInput.style.visibility = "visible";
    button.style.visibility = "visible";
    customeURL.style.visibility = "visible";
    header.style.visibility = "visible";
    stats.style.visibility = "hidden";
    root.style.visibility = "visible";
})


function displayUrl(newUrl){
    URLOutput.setAttribute("href", newUrl);
    URLOutput.innerText = newUrl
}

function createElement(tag, className){
    const element = document.createElement(tag);
    element.classList.add(className);
    return element
}

function clearStatus(){
    inputshorturl.value = "";
    const status = document.getElementsByClassName('status');
    let i = status.length-1;
    while(i>=0){ //delete all status elemnts created
        status[i].remove();
        i--;
    }
}

async function createForm(purpose){
    const div = createElement("div", "form");
    const nameInput = createElement("input", "formInput");
    const passwordInput = createElement("input", "formInput");
    const subFormBtn = createElement("button", "formBtn");
    const subFormBtn = createElement("button", "formBtn");
    nameInput.placeholder = "Enter Name"
    passwordInput.placeholder = "Enter Password"
    subFormBtn.textContent = "Enter"
    if(purpose === "Up"){
        subFormBtn.addEventListener("click", async ()=>{
            const name = nameInput.value;
            const password = passwordInput.value;
            if(!name || !password){
                return
            }
            const response = await axios.post(`${myAPI}/signUp`, {userName: name, password: password})
            if(response){
                //make a messegae
            }else{
                 document.getElementsByClassName("form").remove();
                createForm("in");
            }
        })
    }else{
        subFormBtn.addEventListener("click", async ()=>{
            const name = nameInput.value;
            const password = passwordInput.value;
            if(!name || !password){
                return
            }
            const response = await axios.put(`${myAPI}/signUp`, {userName: name, password: password});
            if(response){
                //error magase
                return
            }
             document.getElementsByClassName("form").remove();

        })
    }
    div.append(nameInput, passwordInput, subFormBtn );
    return div;
}

signIn.addEventListener("click", async ()=>{
     document.getElementsByClassName("form").remove();
    const form = await createForm("in");
    form.style.zIndex = "1";
    form.style.zIndex = "1";
    document.body.append(form);
})

signUp.addEventListener("click", async ()=>{
     document.getElementsByClassName("form").remove();
    const form = await createForm("Up");
    document.body.append(form);
})