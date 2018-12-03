var mesaReservar;
var modalInstances;

/*
 * Instancias de materialize
 */
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    modalInstances = M.Modal.init(elems);
});


/**
 * Prepara el proceso de reserva para la mesa indicada
 */
function prepararReserva(idMesa) {
    mesaReservar = idMesa;
}

/**
 * Genera una reserva de una mesa utilizando "mesaReservar" y los datos del modal
 */
function reservar(event) {
    var comensales = document.getElementById('comensales').value;
    if (comensales < 1 || comensales > 6) {
        M.toast({ html: 'Por favor, especifica 1 o 6 comensales como maximo por mesa.' })
        return false;
    }

    // Cerramos el modal de reservas (el 1o)
    modalInstances[0].close();

    // Reservamos la mesa
    reservarMesa(mesaReservar, comensales);

    // Mostramos el modal informativo
    M.toast({ html: 'Mesa Nº' + mesaReservar + ' reservada.' })
    return true;
}


/**
 * Reserva una mesa especifica
 */
function reservarMesa(idMesa, comensales) {
    var idMesa = "mesa-" + idMesa;
    var mesa = document.querySelector("#" + idMesa);

    // Asignamos la cantidad de comensales
    mesa.querySelector(".comensales .cantidadComensales").innerHTML = comensales.toString();

    // Cambiamos el estado de la mesa
    toggleClass(mesa, "disponible", "ocupada");
}

/**
 * Cancela la reserva de una mesa
 */
function cancelarMesa(idMesa) {
    var idMesa = "mesa-" + idMesa;
    var mesa = document.querySelector("#" + idMesa);

    // Cambiamos el estado de la mesa
    toggleClass(mesa, "ocupada", "disponible");
}


function toggleClass(element, classOld, classNew) {
    element.classList.remove(classOld);
    element.classList.add(classNew);
}
