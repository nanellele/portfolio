const Slideshow = () => {
  let slide = document.getElementById("slideshow");
  let currentSlide = 1;

  let slides = slide.querySelectorAll(".slider>div").length;
  let slider = slide.querySelector(".slider");
  let previous = slide.querySelector(".previous");
  let next = slide.querySelector(".next");
  let bullets = slide.querySelector(".bullets");

  for (let i = 0; i < slides; i++) {
    let bullet = document.createElement("a");
    bullet.innerText = i + 1;
    bullet.addEventListener("click", (e) => {
      e.preventDefault();
      currentSlide = i + 1;
      update();
    });

    bullets.appendChild(bullet);
  }

  const update = () => {
    slider.style = `transform: translateX(-${(currentSlide - 1) * 100}%)`;
    bullets.querySelectorAll('a').forEach(element => {
      if((currentSlide === parseInt(element.innerText))) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  previous.addEventListener("click", (e) => {
    e.preventDefault();
    currentSlide === 1 ? (currentSlide = slides) : currentSlide--;
    update();
  });

  next.addEventListener("click", (e) => {
    e.preventDefault();
    currentSlide === slides ? (currentSlide = 1) : currentSlide++;
    update();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  Slideshow();
});
