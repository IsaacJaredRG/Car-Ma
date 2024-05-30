const clickableDivs = document.querySelectorAll('.clickable');
let prevDiv = null;
let clickCount = 0;
const maxClicked = 6;

function countClickedDivs() {
    return document.querySelectorAll('.clicked1, .clicked2, .clicked3').length;
}

clickableDivs.forEach((div) => {
    div.addEventListener('click', () => {
        if (prevDiv && prevDiv.dataset.id !== div.dataset.id) {
            clickCount = 0;
        }
        prevDiv = div;
        clickCount++;

        const currentClickedCount = countClickedDivs();

        if (currentClickedCount < maxClicked || div.classList.contains('clicked1') || div.classList.contains('clicked2') || div.classList.contains('clicked3')) {
            if (clickCount === 1) {
                div.classList.add('clicked1');
                div.classList.remove('clicked2', 'clicked3');
            } else if (clickCount === 2) {
                div.classList.remove('clicked1');
                div.classList.add('clicked2');
                div.classList.remove('clicked3');
            } else if (clickCount === 3) {
                div.classList.remove('clicked2');
                div.classList.add('clicked3');
            } else {
                div.classList.remove('clicked3');
                clickCount = 0;
            }
        } else {
            clickCount = 0;
        }
    });
});


//sacar el texto de los div y mandarlos a query
const botonMaterias = document.querySelector("#botonMaterias");

botonMaterias.addEventListener("click", () => {
    const selectedDivs = document.querySelectorAll(".reticula.clickable.clicked1, .reticula.clickable.clicked2, .reticula.clickable.clicked3");
    if (selectedDivs.length === 0) {
        alert("No seleccionaste ninguna materia");
        return;
    }
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
             // Organizar las respuestas por horario
                allResponses.sort((a, b) => {
                    // Convertir el horario a formato de horas para comparar
                    const horaA = parseInt(a.Horario.split(":")[0]);
                    const horaB = parseInt(b.Horario.split(":")[0]);

                    // Si la hora de A es menor que la hora de B, A va antes que B
                    if (horaA < horaB) return -1;
                    // Si la hora de A es mayor que la hora de B, A va después que B
                    if (horaA > horaB) return 1;
                    // Si las horas son iguales, se compara por minutos
                    const minutoA = parseInt(a.Horario.split(":")[1]);
                    const minutoB = parseInt(b.Horario.split(":")[1]);
                    // Si los minutos de A son menores que los minutos de B, A va antes que B
                    if (minutoA < minutoB) return -1;
                    // Si los minutos de A son mayores que los minutos de B, A va después que B
                    if (minutoA > minutoB) return 1;
                    // Si las horas y los minutos son iguales, no se hace ningún cambio
                    return 0;
                });
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
