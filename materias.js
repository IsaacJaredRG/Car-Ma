const clickableDivs = document.querySelectorAll('.clickable');
let prevDiv = null;
let clickCount = 0;

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