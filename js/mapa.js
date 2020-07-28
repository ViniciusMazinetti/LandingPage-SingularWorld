const svg = document.querySelector(".paises");
const zoomIn = document.querySelector("#zoomIn");
const zoomOut = document.querySelector("#zoomOut");
let tamanho = 100;

function addLabel(){
    
    for(let i=0;i<svg.children.length;i++){
        let countryName = svg.children[i].getAttribute("data-name");
        svg.children[i].classList.add("pais");
        svg.children[i].innerHTML = `<title>${countryName}</title>`;
    }
}
function waitButton(){
    zoomIn.addEventListener("click",()=>{
        zoom(50);
    });

    zoomOut.addEventListener("click",()=>{
        zoom(-50);

    });
}

function zoom(value){
    tamanho+=value;
    if(tamanho<100){
        tamanho=100;
    }
    svg.style.width = tamanho+"vw";
    svg.style.height = tamanho+"vh";
    
}


waitButton()
addLabel();
