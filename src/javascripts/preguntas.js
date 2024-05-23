
const modalidad = document.querySelector("#modalidad");
console.log(modalidad)
modalidad.addEventListener("change", actualizarCarreras);

function actualizarCarreras() {
    const modalidad = document.getElementById("modalidad").value;
    const carrera = document.getElementById("carrera");
    //remover el place holder
    const remover_opcion0 = document.querySelector("#modalidad");
    const opcion0 = remover_opcion0.querySelector("[value='0']");
    if (opcion0) {
      opcion0.remove();
    }
    // Elimina todas las opciones existentes en el elemento carrera
    while (carrera.firstChild) {
        carrera.removeChild(carrera.firstChild);
    }
    
    // Agrega las opciones correspondientes al valor del elemento modalidad
    if (modalidad === "1") {
        // Agrega las opciones para el modalidad escolarizado
        carrera.add(new Option("Ingeniería en Tecnologias de la Información y Comunicación", "1"));
        carrera.add(new Option("Ingeniería en Gestión Empresarial", "2"));
        carrera.add(new Option("Ingeniería Logística", "3"));
        carrera.add(new Option("Ingeniería Mecatrónica", "4"));
        carrera.add(new Option("Ingeniería Industrial", "5"));

    } else if (modalidad === "2") {
        // Agrega las opciones para el modalidad sabatino
        carrera.add(new Option("Ingeniería en Gestión Empresarial", "2"));
        carrera.add(new Option("Ingeniería Industrial", "5"));
        }
  };

  //validacion de formulario
  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", function(event) {
    const carrera = document.querySelector("#carrera");
    const semestre = document.querySelector("#semestre");
    if (carrera.value === "") {
      event.preventDefault();
      const mensajeError = document.createElement("div");
      mensajeError.textContent = "Por favor, selecciona una carrera antes de enviar el formulario.";
      mensajeError.style.color = "red";
      formulario.insertBefore(mensajeError, formulario.firstChild);
      return false;
    } else if(semestre.value === ""){
      event.preventDefault();
      const mensajeError = document.createElement("div");
      mensajeError.textContent = "Por favor, selecciona el semestre antes de enviar el formulario.";
      mensajeError.style.color = "red";
      formulario.insertBefore(mensajeError, formulario.firstChild);
      return false;
    } else if(semestre.value === "" && carrera.value === ""){
        event.preventDefault();
        const mensajeError = document.createElement("div");
        mensajeError.textContent = "Por favor, selecciona el semestre y la carrera antes de enviar el formulario.";
        mensajeError.style.color = "red";
        formulario.insertBefore(mensajeError, formulario.firstChild);
        return false;
    } else {
        event.preventDefault();
        const carreraSelect = document.getElementById('carrera');
        const selectedOption = carreraSelect.options[carreraSelect.selectedIndex];
        const selectedValue = selectedOption.value;
        if (selectedValue === '1') {
          window.location.href = '/TIcs';
      } else if (selectedValue === '2') {
          window.location.href = '/gestion';
      } else if (selectedValue === '3') {
          window.location.href = '/logistica';
      } else if (selectedValue === '4') {
        window.location.href = '/mecatronica';
    }else if (selectedValue === '5') {
      window.location.href = '/Industrial';
    }


  }



  
  });