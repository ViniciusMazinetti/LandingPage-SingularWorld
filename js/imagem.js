const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
const indicatorActive = indicator.children;
let index = 0;

//Function that put the "active" class in order to show the slide
function changeSlide(index){
    slides[index].classList.add("active");
}

//Function that remove the "active" class in order to remove the slide
function removeSlide(){
    for(let i = 0;i<slides.length;i++){
        slides[i].classList.remove("active");
        indicatorActive[i].classList.remove("active");
    };
}

function indicatorBalls(){
    for(let i = 0; i<slides.length;i++){
        const div = document.createElement("div");
        if(i==0){
            div.classList.add("active");
        }
        div.innerHTML = i;
        indicator.appendChild(div);
    }
}

function updateIndicator(index){
    indicatorActive[index].className = "active"
}

//Function that change slides automatically
function autoSlider(){
        if(index==slides.length-1){
            index=0;
        }else{
            index++;
        }
        removeSlide();
        changeSlide(index);
        updateIndicator(index);
}

function waitControlers(){
    prev.addEventListener("click",prevSlide);
    next.addEventListener("click",nextSlide);
    
}

function prevSlide(){
    index = index-1;
    if(index<0){
        index = slides.length - 1;
    };
    removeSlide();
    changeSlide(index);
    updateIndicator(index);
    resetTimer();
}

function nextSlide(){
    index = index+1;
    if (index>=slides.length){
        index=0;
    };
    removeSlide();
    changeSlide(index);
    updateIndicator(index);
    resetTimer();
}

function resetTimer(){
    clearInterval(timer);
    timer = setInterval(autoSlider,6000);
}

let timer = setInterval(autoSlider,6000);
indicatorBalls();
waitControlers();

