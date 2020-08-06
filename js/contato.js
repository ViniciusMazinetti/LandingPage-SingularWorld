const estados = document.querySelector("#estado");
const cidades = document.querySelector("#cidade");
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

let cidade;
let estado;

function getEstados(){
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados",options)
    .then(resultado => {resultado.json()
        .then(data =>{
            data.forEach(element => {
                estados.innerHTML += `<option id = ${element.nome} value = ${element.id}>${element.nome}</option>`;
            });
        })})
    .catch(error=>{console.log("Erro")});
}

function getCidades(){
    estados.addEventListener("change",(e)=>{
        eraseCidade();
        console.log(e.target.value);
        if (e.target.value == 0){
            cidades.setAttribute("disabled",true);   
        } else {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`,options)
            .then(resultado => {resultado.json()
                .then(data => {
                    data.forEach(element => {
                        cidades.innerHTML += `<option value = ${element.nome}>${element.nome}</option>`;
                    })
                    cidades.removeAttribute("disabled");
                })})
            .catch(error=>{console.log("Erro")});
        }
        cidades.addEventListener("change",(e)=>{
            cidade = e.target.value;
        });      
    });
}

function eraseCidade(){
    for (i=0 ; i<cidades.length ; i++){
        cidades.innerHTML = "<option>Cidades</option>";
    }
}


function whatsapp(){
    document.querySelector(".enviar").setAttribute("onclick","abrirLink()");
}

function abrirLink(){
    let number = "5512997548653";
    let nome = document.querySelector("#nome").value;
    let text = document.querySelector("#mensagem").value;
    let msg = `Ola eu sou ${nome}, moro em ${cidade}\n${text}`;

    let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
    window.open(`${target}`);
}

getEstados();
getCidades();
whatsapp();