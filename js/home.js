function typpingText(){
    const message = ["A Vida é curta e o Mundo é grande !!!","Colecione momentos e não Coisas !!!","Nessa vida sou apenas um viajante !!!"];
    const textHtml = document.querySelector(".message");
    let char = 0;
    let index = 0;
    let removing = false;
    let pause = 0;

    setInterval(()=>{
        if (char<message[index].length) {
            textHtml.innerHTML += message[index][char];
        }

        if(char==message[index].length + 15){
            removing = true;
        }

        if(removing){
            textHtml.innerHTML = textHtml.innerHTML.substring(0,textHtml.innerHTML.length - 1);
        }

        char++;

        if (textHtml.innerHTML.length==0){
            if (pause==10){
                char=0;
                removing = false;
                pause=0;
                if(index == message.length - 1){
                    index = 0;
                } else {
                    index++;
                }
            }
            pause++;  
        }
        
    },150);

}

typpingText();