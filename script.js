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

// Example starter JavaScript for disabling form submissions if there are invalid fields
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

/* To allow the +1 and not have it count as prior validation */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector('.needs-validation');
  var phoneNumberInput = document.getElementById('phonenumber');

  form.addEventListener('submit', function (event) {
    // Checks if the phone number field contains more than the initial value "+1"
    if (phoneNumberInput.value.trim() === '+1' || phoneNumberInput.value.trim().length <= 3) {
      // Manually adjusts the validation to display the specific error message
      phoneNumberInput.setCustomValidity('Invalid Phone Number');
    } else {
      // Clears any previous custom validation state
      phoneNumberInput.setCustomValidity('');
    }

    // Applies Bootstrap validation
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  }, false);

  phoneNumberInput.addEventListener('input', function () {
    if (phoneNumberInput.value.trim().length > 3) {
      phoneNumberInput.setCustomValidity('');
    }
  });
});
