let SLIDES;
let SLIDE_INDEX;

function nextSlide() {
  const previous = SLIDE_INDEX;
  SLIDE_INDEX += 1;
  SLIDE_INDEX %= SLIDES.length;
  changeSlide(previous);
}

function prevSlide() {
  const previous = SLIDE_INDEX;
  SLIDE_INDEX -= 1;
  if (SLIDE_INDEX == -1) {
    SLIDE_INDEX = SLIDES.length - 1;
  }
  changeSlide(previous);
}

function changeSlide(previous) {
  console.log(previous);
  SLIDES[previous].style.display = "none";
  SLIDES[SLIDE_INDEX].style.display = "flex";
}

window.onload = function() {
  SLIDE_INDEX = 0;
  SLIDES = document.getElementsByClassName("slide");
  for (let i = 0; i < SLIDES.length; i++) {
    SLIDES[i].style.display = "none";
  }
  changeSlide(0);

  document.getElementById("slideprev").addEventListener("click", prevSlide);
  document.getElementById("slidenext").addEventListener("click", nextSlide);
};
