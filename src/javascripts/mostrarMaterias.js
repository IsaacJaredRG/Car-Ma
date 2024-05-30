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
        }else{
            div.classList.remove('clicked1');
            clickCount = 0;
        }
    });
});

//sacar el texto de los div y mandarlos a query
const botonHorario = document.querySelector("#botonHorario");

botonHorario.addEventListener("click", async () => {
    const selectedDivs = document.querySelectorAll(".reticula.clickable.clicked1");
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
            const texto2 = parrafos[1].textContent;
            const query1 = encodeURIComponent(texto); // Convertir el texto en el primer parámetro de consulta
            const query2 = encodeURIComponent(texto2); // Establecer el segundo parámetro de consulta como vacío (puedes cambiar esto según necesites)
            const fetchPromise = fetch(`/queryHorario?query1=${query1}&query2=${query2}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                });
            fetchPromises.push(fetchPromise);
        }
    });

     // Esperar a que se completen todas las solicitudes
     try {
        const results = await Promise.all(fetchPromises);
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
        // Verificar si hay nombres u horarios repetidos
        const names = new Set();
        const horarios = new Set();
        let duplicatesFound = false;

        allResponses.forEach(response => {
            if (names.has(response.Nombre) || horarios.has(response.Horario)) {
                duplicatesFound = true;
            } else {
                names.add(response.Nombre);
                horarios.add(response.Horario);
            }
        });

        // Si se encontraron duplicados, mostrar alerta y no enviar los datos al servidor
        if (duplicatesFound) {
            alert('¡Error! Se encontraron nombres u horarios duplicados.');
        } else {
            // Si no se encontraron duplicados, enviar los datos al servidor
            const response = await fetch('/storeHorario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(allResponses) // Enviar todas las respuestas juntas como un JSON
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            window.location.href = '/Horario';
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
