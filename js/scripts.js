(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//Mostrar mensajes
document.getElementById('mensajeUsuarioForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que se recargue la página

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    // Enviar datos al servidor
    const response = await fetch('/mensajeUsuario', {
        method: 'POST',
        body: data
    });

    const comentarios = await response.json();

    // Renderizar comentarios en el contenedor
    const contenedor = document.getElementById('comentarios');
    contenedor.innerHTML = '<h3>Comentarios:</h3><ul>' +
        comentarios.map(c => `<li><strong>${c.nombre}:</strong> ${c.mensaje}</li>`).join('') +
        '</ul>';
});