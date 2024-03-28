document.addEventListener("DOMContentLoaded", function() {
 var modoEscuroElemento = document.getElementById("modoEscuro");
var bodyElemento = document.body;

 modoEscuroElemento.addEventListener("click", function() {
        bodyElemento.classList.toggle("modo-escuro");

        if (bodyElemento.classList.contains("modo-escuro")) {
        modoEscuroElemento.src = "./img/sol.png"; 
        } else {
        modoEscuroElemento.src = "./img/lua 1.png"; 
        }
    });
});