
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


//sacar el texto de los div y mandarlos a query
const botonMaterias = document.querySelector("#botonMaterias");

botonMaterias.addEventListener("click", () => {
    const selectedDivs = document.querySelectorAll(".reticula.clickable.clicked1, .reticula.clickable.clicked2, .reticula.clickable.clicked3");
    const fetchPromises = [];
    let allResponses = []; // Variable para almacenar todas las respuestas

    selectedDivs.forEach((div) => {
        const parrafos = div.getElementsByTagName("p");
        if (parrafos.length > 0) {
            const texto = parrafos[0].textContent;
            const fetchPromise = fetch(`/query?query=${encodeURIComponent(texto)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                });
            fetchPromises.push(fetchPromise);
        }
    });

    Promise.all(fetchPromises)
        .then(results => {
            allResponses = allResponses.concat(...results); // Unir los arrays de resultados en uno solo
            return fetch('/storeResponses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(allResponses) // Enviar todas las respuestas juntas como un JSON
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            window.location.href = '/MostrarMateria';
        })
        .catch(error => console.error('Fetch error:', error));
});
