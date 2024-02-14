/* Responsive navigation menu in the header */
const nav = document.querySelector("#nav");
const open = document.querySelector("#open");
const close = document.querySelector("#close");

open.addEventListener("click", () => {
  nav.classList.add("visible");
});

close.addEventListener("click", () => {
  nav.classList.remove("visible");
});

/* Validation for form contact */
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        return; // Detener la ejecución si la validación no pasa
      }

      // Validar número de teléfono
      const phoneNumberInput = form.querySelector('#phonenumber');
      if (!isValidPhoneNumber(phoneNumberInput.value.trim())) {
        phoneNumberInput.setCustomValidity('Invalid Phone Number');
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

// Función para validar el número de teléfono
function isValidPhoneNumber(phoneNumber) {
  // Aquí puedes implementar tu lógica de validación del número de teléfono
  // Por ejemplo, verificar si tiene un formato válido
  return phoneNumber.match(/^\+?\d{1,3}\d{9}$/); // Esta expresión regular valida números de 10 o más dígitos
}

/* sweetalert2@11 */
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var formData = new FormData(form);

    fetch('http://localhost:3000/send-email', { // Cambiado a http://localhost:3000/send-email
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            Swal.fire({
                title: '¡Success!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'The email could not be sent.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el correo.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    });
});
