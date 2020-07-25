//Function to do the typping effect.
function typpingText(){
    const message = ["A Vida é curta e o Mundo é grande !!!","Colecione momentos e não Coisas !!!","Nessa vida sou apenas um viajante !!!"];
    const textHtml = document.querySelector(".message");
    let char = 0;
    let index = 0;
    let removing = false;
    let pause = 0;

    setInterval(()=>{
        //Add the next character of the phrase.
        if (char<message[index].length) {
            textHtml.innerHTML += message[index][char];
        }

        //After 15*150ms, change status in order to start removing characteres.
        if(char==message[index].length + 15){
            removing = true;
        }

        //Remove the last character of the phrase 
        if(removing){
            textHtml.innerHTML = textHtml.innerHTML.substring(0,textHtml.innerHTML.length - 1);
        }

        char++;

        //After 10*150ms, change the phrase and start writing in it 
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

