const svg = document.querySelector(".paises");
const inButton = document.querySelector("#zoomIn");
const outButton = document.querySelector("#zoomOut");

let size = 100;
let isDown = false;
let startX;
let startY;
let walkX;
let walkY;



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

    });

    svg.addEventListener("mousemove",(e)=>{
        if(!isDown) return; //stop the fn from running
        e.preventDefault();
        console.log(svg.getAttribute("viewBox"));
        const x =  e.layerX;
        const y = e.layerY;
        walkX = x - startX;
        walkY = y - startY;
        svg.setAttribute("viewBox",`${(-1)*walkX},${(-1)*walkY},2000,1001`);


    });
}

waitZoom();
addLabel();
waitPan();
