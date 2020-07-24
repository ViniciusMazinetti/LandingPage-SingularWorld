function slider(){
    const imagens = ['img/img02-tokyo.jpg','img/img03-london.jpg','img/img04-paris.jpg','img/img05-dublin.jpg'];
    const cidades = ["Tokyo","London","Paris","Dublin"];
    const paises = ["Japan","England","France","Ireland"];

    let imagem = document.querySelector('#imagem');
    let cidade = document.querySelector('.cidade');
    let pais = document.querySelector('.pais');
    let index = 0;

    setInterval(()=>{
        
        if(index<imagens.length){
            imagem.style.backgroundImage = `url(${imagens[index]})`;
            cidade.innerHTML = cidades[index];
            pais.innerHTML = paises[index];
            index++;
        }else{
            index=0;
        } 
    },5000);
};

slider();
