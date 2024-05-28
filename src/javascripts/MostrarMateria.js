fetch(`/MostrarMateriasYHorario/${nombreMateria}`)
   .then(response => response.json())
   .then(data => {
        // Aquí puedes utilizar los datos obtenidos de la base de datos
    });