const svg = document.querySelector(".paises");
const popup = document.querySelector(".popup");
const inButton = document.querySelector("#zoomIn");
const outButton = document.querySelector("#zoomOut");
const count = document.querySelector(".contador");

let isDown = false;
let startX;
let startY;
let walkX = 0;
let walkY = 0;
let PrevWalkX = 0;
let PrevWalkY = 0;
let totalCountryVisited = 0;
let countClick = 0;



function addLabel (){
    
    for(let i = 0; i < svg.children.length; i++){
        let name = svg.children[i].getAttribute('data-name');
        const a = document.createElement("a");
        svg.children[i].classList.add('pais');
        svg.children[i].innerHTML = '<title>'+name+'</title';
    }
}


let num = 100;
let cIn = 1;
let cOut = 1;
var requestId;

function zoomIn(){
    num += 1.5;
    if (num >= 300) {
        num = 300;
    }else{
        svg.style.width = num + '%';
        svg.style.height = num + '%';
    }
    if (cIn <= 10){
        requestId = requestAnimationFrame(zoomIn);
    } else{
        cancelAnimationFrame(requestId);
        cIn = 1;
    }
    cIn++;
}

function zoomOut(){
    num -= 1.5;
        if (num <= 100) {
            num = 100;
            cancelAnimationFrame(requestId);
            svg.setAttribute("viewBox",`0,0,2000,1001`);
            PrevWalkX = 0;
            PrevWalkY = 0;
        }else{
            svg.style.width = num + '%';
            svg.style.height = num + '%';
        }
        if (cOut <= 10){
            requestId = requestAnimationFrame(zoomOut);
        } else{
            cancelAnimationFrame(requestId);
            cOut = 1;
        }
        cOut++;
}

function waitZoom(){
    outButton.addEventListener('click', () => {
        zoomOut();
        
    })
    inButton.addEventListener('click', () => {
        zoomIn();
  
    })
}

function waitPan(){
    svg.addEventListener("mousedown",(e)=>{
        isDown = true;
        svg.classList.add("move");
        startX = e.layerX;
        startY = e.layerY;

    });

    svg.addEventListener("mouseleave",()=>{
        isDown = false;
        svg.classList.remove("move"); 

    });

    svg.addEventListener("mouseup",()=>{
        isDown = false;
        svg.classList.remove("move");
        PrevWalkX += (-1)*walkX;
        PrevWalkY += (-1)*walkY;
        walkX = 0;
        walkY = 0;

    });

    svg.addEventListener("mousemove",(e)=>{
        if(!isDown) return; //stop the fn from running
        e.preventDefault();
        const x =  e.layerX;
        const y = e.layerY;
        walkX = x - startX;
        walkY = y - startY;
        svg.setAttribute("viewBox",`${PrevWalkX + (-1)*walkX},${PrevWalkY + (-1)*walkY},2000,1001`);
        
    });
}

function clickCountry(){
    for(let i = 0;i<svg.children.length;i++){
        svg.children[i].addEventListener("click", this.click);
    }
}

function click(event){
    countClick++;
    if (countClick == 1){
        setTimeout(()=>{
            if(countClick == 1){
                singleClick(this);
            } else {
                doubleClick(this,event);
            }
            countClick = 0;
        },200);
    }
}

function singleClick(element){
    element.classList.toggle("active");
    countCountry();
}

function doubleClick(element, event){
    let x = event.clientX;
    let y = event.clientY;
    popup.classList.toggle("hide");
    popup.style.top = y + "px";
    popup.style.left = x +"px";

    panPopup(x,y);

    updateTitle(element);
    updateFlag(element);
    waitClosePopup();
    updateInfo(element)
}

function countCountry(){
    totalCountryVisited = 0;
    for(let i=0;i<svg.children.length;i++){
        if(svg.children[i].classList == "pais active"){
            totalCountryVisited++;
        }
    }
    showCountCountry(totalCountryVisited);
    console.log(totalCountryVisited);
}

function showCountCountry(totalCountryVisited){
    count.innerHTML = "Country visited: \n" + totalCountryVisited; 
}

function updateTitle(element){
    const title = popup.querySelector(".title a");
    let countryName = element.getAttribute("data-name");
    let linkGoogle = `https://www.google.com/search?q=${countryName}`;
    title.textContent = countryName;
    title.setAttribute("href",linkGoogle);
}

function updateFlag(element){
    const flag = popup.querySelector(".popup-flag img");
    let flagId = element.getAttribute("id");
    flag.setAttribute("src",`https://www.countryflags.io/${flagId.toLowerCase()}/shiny/64.png`);  
}

function waitClosePopup(){
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        popup.classList.add('hide');
    })

}

function updateInfo(element){
    const info = popup.querySelector(".popup-info");
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch('https://restcountries.eu/rest/v2/all',options)
    .then((response => {response.json()
        .then(data => {
            let totalCurrencies = "";
            let totalLanguages = "";
            for (let i = 0; i < data.length; i++){
                if (element.id == data[i].alpha2Code){
                    info.querySelector(".capital").innerHTML= `Capital: <span>${data[i].capital}</span>`;
                    info.querySelector(".region").innerHTML=`Region: <span>${data[i].region}</span>`;
                    data[i].currencies.forEach((value)=>{
                        totalCurrencies += value.name +", ";
                    });
                    info.querySelector(".currencies").innerHTML = "Currencies: " + `<span>${totalCurrencies.substr(0,totalCurrencies.length-2)}</span>`;
                    data[i].languages.forEach((value)=>{
                        totalLanguages += value.name+", ";
                    });
                    info.querySelector(".languages").innerHTML = "Languages: " + `<span>${totalLanguages.substr(0,totalLanguages.length-2)}</span>`;
                }
            }
        })}))
    .catch(error => {console.log('Deu erro: ' + e)});
}

let popupStartX = 0;
let popupStartY = 0;
let popupPrevWalkX = 0;
let popupPrevWalkY = 0;
let popupWalkX = 0;
let popupWalkY = 0;

function panPopup(){
    let Yposition = 0;
    let Xposition = 0;
    popup.addEventListener("mousedown",(e)=>{
        isDown = true;
        popup.classList.add("move");
        Yposition = popup.style.top;
        Yposition = parseInt(Yposition.substr(0,Yposition.length-2));
        Xposition = popup.style.left;
        Xposition = parseInt(Xposition.substr(0,Xposition.length-2));
        popupStartX = e.clientX;
        popupStartY = e.clientY;
    });

    popup.addEventListener("mouseleave",()=>{
        isDown = false;
        popup.classList.remove("move"); 

    });

    popup.addEventListener("mouseup",()=>{
        isDown = false;
        popup.classList.remove("move");
        popupWalkX = 0;
        popupWalkY = 0;

    });

    popup.addEventListener("mousemove",(e)=>{
        if(!isDown) return; //stop the fn from running
        e.preventDefault();
        let moveX =  e.clientX;
        let moveY = e.clientY;
        popupWalkX = moveX - popupStartX;
        popupWalkY = moveY - popupStartY;
        popup.style.top = Yposition + popupWalkY + "px";
        popup.style.left = Xposition + popupWalkX + "px";
    });
}


waitZoom();
addLabel();
waitPan();
clickCountry();

