const clickableDivs = document.querySelectorAll('.clickable');
let prevDiv = null;
let clickCount = 0;

//Cambiar de color dependiendo del texto
clickableDivs.forEach((div) => {
    div.addEventListener('click', () => {
        if (prevDiv && prevDiv.dataset.id!== div.dataset.id) {
            clickCount = 0;
        }
        prevDiv = div;
        clickCount++;
        if (clickCount === 1) {
            div.classList.add('clicked1');
        } else if (clickCount === 2) {
            div.classList.remove('clicked1');
            div.classList.add('clicked2');
        } else if (clickCount === 3) {
            div.classList.remove('clicked2');
            div.classList.add('clicked3');
            
        }else{
            div.classList.remove('clicked3');
            clickCount = 0;
        }
    });
});

//sacar el texto de los div
botonMaterias.addEventListener("click", () => {
    const clickableDivs = document.querySelectorAll(".reticula.clickable.clicked1,.reticula.clickable.clicked2,.reticula.clickable.clicked3");
    clickableDivs.forEach((div) => {
      const paragraphs = div.getElementsByTagName("p");
      if (paragraphs.length > 0) {
        const text = paragraphs[0].textContent;
        console.log(`Text: ${text}`);
      }
    });
  });