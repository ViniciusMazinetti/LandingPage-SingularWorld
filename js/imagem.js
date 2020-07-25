const slides = document.querySelector("#imagem").children;
let index = 0;

//Function that put the "active" class in order to show the slide
function changeSlide(index){
    slides[index].classList.add("active");
}

//Function that remove the "active" class in order to remove the slide
function removeSlide(){
    for(let i = 0;i<slides.length;i++){
        slides[i].classList.remove("active");
    };
}

//Function that change slides automatically
function autoSlider(){
    setInterval(()=>{
        if(index==slides.length-1){
            index=0;
        }else{
            index++;
        }
        removeSlide();
        changeSlide(index);

    },6000);
}

autoSlider();