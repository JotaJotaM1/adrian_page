/* Header nav responsive */
const nav = document.querySelector("#nav");
const open = document.querySelector("#open");
const close = document.querySelector("#close");

open.addEventListener("click", () => {
  nav.classList.add("visible");
});

close.addEventListener("click", () => {
  nav.classList.remove("visible");
});

/* The floating fixed button adjusts to a fixed position according to its parent sectionBody */

document.addEventListener("scroll", function () {
  const botonFlotante = document.querySelector(".containerBtnFixed");
  const seccion = document.querySelector(".sectionBody");
  const rectSeccion = seccion.getBoundingClientRect();

  // Condición para mantener el botón dentro de los límites de sectionBody
  if (rectSeccion.top < 0 && rectSeccion.bottom > window.innerHeight) {
    botonFlotante.style.position = "fixed";
    botonFlotante.style.bottom = "25px";
    // Ajustamos el botón a la derecha con una separación de 20px del contenedor sectionBody
    botonFlotante.style.right = `${
      window.innerWidth - rectSeccion.right + 25
    }px`;
    botonFlotante.style.left = "auto"; // Aseguramos que la propiedad left no interfiera
  } else {
    botonFlotante.style.position = "absolute";
    botonFlotante.style.bottom = "25px";
    // Cuando el botón debe posicionarse en la parte inferior derecha de sectionBody
    if (rectSeccion.bottom <= window.innerHeight) {
      botonFlotante.style.right = "25px"; // Mantenemos la separación de 20px del borde derecho
    } else {
      botonFlotante.style.right = "25px";
    }
    botonFlotante.style.left = "auto"; // Aseguramos que la propiedad left no interfiera
  }
});

// Inicialización de EmailJS con tu publicKey
(function () {
  emailjs.init("D-xI_ZdXaXg9LLHE3");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      if (form.checkValidity()) {
        emailjs.sendForm("service_1xqqb2i", "template_cxnxblr", this).then(
          function () {
            console.log("SUCCESS!");
            // Usar SweetAlert2 para el mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Your message has been sent successfully.",
            });
            form.reset();
            form.classList.remove("was-validated");
          },
          function (error) {
            console.log("FAILED...", error);
            // Usar SweetAlert2 para el mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "The message could not be sent, please try again.",
            });
          }
        );
      } else {
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
});
