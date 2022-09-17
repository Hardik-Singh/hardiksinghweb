// template_6j174dj
// service_e0cmeyn
// pDlKgbHRQ6pawlQE9

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";

//   emailjs
//     .sendForm(
//       "service_e0cmeyn",
//       "template_6j174dj",
//       event.target,
//       "pDlKgbHRQ6pawlQE9"
//     )
//     .then(() => {
//       loading.classList.remove("modal__overlay--visible");
//       success.classList += " modal__overlay--visible";
//     })
//     .catch(() => {
//       loading.classList.remove("modal__overlay--visible");
//       alert(
//         "The email service is temporarily unavailable. Please contact me directly at tstanmay2000@gmail.com"
//       );
//     });

   setTimeout(() => {
    loading.classList.remove("modal__overlay--visible");
    success.classList += " modal__overlay--visible";
   }, 1000);

}

let isModalOpen = false;
function toggleModal(){
    // toggle modal
    
    if(isModalOpen){
        isModalOpen = false;
        return document.body.classList.remove("modal--open");
        
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
    
}


let contrast = false;
function toggleContrast(){
    contrast = !contrast;
    if(contrast){
        document.body.classList += " dark-theme"
    }
    else{
        document.body.classList.remove("dark-theme")
    }
}


const scaleFactor = 1/20;
function moveBackground(event){
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;
    
    for (let i =0; i<shapes.length; ++i){
        const isOdd = i % 2 !==0;
        const boolInt = isOdd? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px`
    }

}


$(window).scroll(function() {
   if(checkVisible($('section'))){
    //    $("section").css("opacity", 1);
   }
});

function checkVisible(elm, eval){
    eval = eval || "visible";
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();
    
    if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (eval == "above") return ((y < (vpH + st)));
}