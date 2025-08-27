(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();




let tax = () => {
  let taxSwitch = document.getElementById("switchCheckReverse");
  let taxInfos = document.getElementsByClassName("tax-info");

  taxSwitch.addEventListener("click", () => {
    for (let info of taxInfos) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  })
};

tax();



