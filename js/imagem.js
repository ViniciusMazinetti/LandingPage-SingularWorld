function slider(){
    const imagens = ['../img/img02-tokyo.jpg','../img/img03-london.jpg','../img/img04-paris.jpg','../img/img05-dublin.jpg'];
    const cidades = ["Tokyo","London","Paris","Dublin"];
    const paises = ["Japan","England","France","Ireland"];

    const imagem = document.querySelector('#imagem');
    let cidade = document.querySelector('.cidade');
    let pais = document.querySelector('.pais');
    let index = 0;

    setInterval(()=>{
        switch(index){
            case 0:
                imagem.style.backgroundImage="url(" + `imagens[&index]` + ")";
        }
    },150);

}

slider();
