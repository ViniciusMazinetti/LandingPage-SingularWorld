const svg = document.querySelector(".paises");
const inButton = document.querySelector("#zoomIn");
const outButton = document.querySelector("#zoomOut");

let isDown = false;
let startX;
let startY;
let walkX = 0;
let walkY = 0;
let PrevWalkX = 0;
let PrevWalkY = 0;
let totalCountryVisited = 0;



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
        svg.children[i].addEventListener("click",()=>{
            svg.children[i].classList.toggle("active");
            countCountry();
        });
    }
}

function countCountry(){
    totalCountryVisited = 0;
    for(let i=0;i<svg.children.length;i++){
        if(svg.children[i].classList == "pais active"){
            totalCountryVisited++;
        }
    }
    console.log(totalCountryVisited);
}

waitZoom();
addLabel();
waitPan();
clickCountry();

