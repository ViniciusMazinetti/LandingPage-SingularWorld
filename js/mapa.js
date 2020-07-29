const country = document.querySelector(".paises").children

function createA (){
    
    for(let i = 0; i < country.length; i++){
        let name = country[i].getAttribute('data-name');
        const a = document.createElement("a");
        country[i].classList.add('active');
        country[i].innerHTML = '<title>'+name+'</title';
    }
}

const inButton = document.querySelector(".upButton");
const outButton = document.querySelector(".downButton");
const map = document.querySelector(".paises");
let num = 100;
let cIn = 1;
let cOut = 1;
var requestId;

function zoomIn(){
    num += 1.5;
    if (num >= 300) {
        num = 300;
    }else{
        map.style.width = num + '%';
        map.style.height = num + '%';
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
        }else{
            map.style.width = num + '%';
            map.style.height = num + '%';
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

waitZoom();
createA();

