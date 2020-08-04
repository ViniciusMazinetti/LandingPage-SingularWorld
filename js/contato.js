const estados = document.querySelector("#estado");
const cidades = document.querySelector("#cidade");
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

function getEstados(){
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados",options)
    .then(resultado => {resultado.json()
        .then(data =>{
            data.forEach(element => {
                estados.innerHTML += `<option value = ${element.id}>${element.nome}</option>`;
            });
        })})
    .catch(error=>{console.log("Erro")});
}

function getCidades(){
    estados.addEventListener("change",(e)=>{
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`,options)
        .then(resultado => {resultado.json()
            .then(data => {
                data.forEach(element => {
                    cidades.innerHTML += `<option value = ${element.nome}>${element.nome}</option>`;
                })
            })})
        .catch(error=>{console.log("Erro")});
    });
}

getEstados();
getCidades();