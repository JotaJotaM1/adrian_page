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

/* Script to validate and submit form data as JSON, displaying success or error alerts with SweetAlert2. */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    form.classList.add("was-validated"); // Activate Bootstrap visual validation

    if (form.checkValidity()) {
      // Collect form data and convert it to a JSON object
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that the body is JSON
        },
        body: JSON.stringify(data), // Convert form data to a JSON string
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Swal.fire({
              title: "Success!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "The email could not be sent.",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "There was a problem sending the email.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    } else {
      console.error("The form is invalid.");
    }
  });
});
