// Bootstrap ka custom validation tab tak trigger nahi hota jab tak JS code se was-validated class na lage.
// Ye code ensure karta hai ki form tabhi submit ho jab saare inputs sahi ho. HTML validation rules (jaise required, type="email", etc.) ko check karta hai.
// Agar form invalid hota hai (yaani koi required field empty hai, ya galat input diya gaya hai), to form submit nahi hoga aur user ko pata chalega ki kaunse fields correct karne hain.

(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault(); // form ko stop karo
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
