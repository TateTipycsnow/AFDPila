//Referencia a electron
const { dialog } = require('electron').remote;

//referencia al boton de verificacion de la vista
const button = document.getElementById('verificar')

//Declaracion del automata y sus partes
const automata = {
    estadoInicial: 1,
    estadoFinal: 2,
    transiciones: [{ //Serie de arrays con informacion de las transiciones
            estado: 1, //Estado en el que se encuentra
            simbolo: 'a', //Cadena con la que se va a comparar para hacer la transicion
            simboloPila: '', //Cadena que cuenta en la pila
            al_estado: 1, //El estado al que va a pasar
            al_simbolo: ['A'] //Cadena que se va a insertar en la pila
        },
        {
            estado: 1,
            simbolo: 'a',
            simboloPila: 'A',
            al_estado: 1,
            al_simbolo: ['A', 'A']
        },
        {
            estado: 1,
            simbolo: 'b',
            simboloPila: 'A',
            al_estado: 2,
            al_simbolo: ['B']
        },
        {
            estado: 2,
            simbolo: 'b',
            simboloPila: 'B',
            al_estado: 2,
            al_simbolo: ['']
        },
        {
            estado: 2,
            simbolo: 'b',
            simboloPila: 'A',
            al_estado: 2,
            al_simbolo: ['B']
        }
    ]
}

//Evento de cuando se pulsa el boton de verificar
button.addEventListener('click', (event) => {
    let cadena = document.getElementById('txtCadena').value; //Regresa el valor de lo que tenga escrito en la caja de texto
    let estadoActual = automata.estadoInicial; //Establece como el estado actual el estado inicial del automata
    let error = false; //Establece una bandera para saber si es que se encuentra un error
    let pila = ['']; //Crea un array con un string para llegar a hacer la primer comparacion

    cadena.split('').every(simbolo => { //Separa los caracteres de la cadena de texto y va recorriendolos uno a uno con every(Similar a foreach)
        let encuentraTransicion = false; //Crea una bandera para saber si se encontro una transicion

        automata.transiciones.every(transicion => { //Va a recorrer cada unno de los arrays de transiciones del automata
            if (transicion.estado == estadoActual && transicion.simbolo == simbolo && transicion.simboloPila == pila[pila.length - 1]) { //Hace una comprobacion de si coinciden estado, el simbolo y el simbolo de la pila del automata con el caracter de la caja de texto
                pila.pop(); //Entonces elimina el ultimo valor que tenga en la pila
                for (i = 0; i < (transicion.al_simbolo.length); i++) { //Y empieza a hacer un for comprobando el array que se encuentra dentro de las transiciones que es el de al_simbolo
                    if (transicion.al_simbolo[i] != '') { //Comprueba si no se cambia el valor de la pila a un valor vacio, si es falso va a hacer
                        pila.push(transicion.al_simbolo[i]); //Una insercion de ese valor a la pila
                    }
                }

                estadoActual = transicion.al_estado; //Cambia el estado actual con el de a donde se va a mover
                encuentraTransicion = true; //Establece la bandera de la transicion como verdadera    
                return false; //Va a retornar un valor falso para asi salirse del every de las transiciones
            }
            return true; //Si no coincide la transicion retorna un valor verdadero para asi segir con el every y comprobar con la siguiente comprobacion
        });

        if (!encuentraTransicion) { //Comprueba si la bandera de transicion esta apagada
            error = true; //Si es asi entonces establece la bandera de error como verdadera
            return false; //Y retorna un valor falso para asi salirse del every de la cadena de texto
        }
        return true; //Si la bandera de transicion esta activa entonces va a seguir con el every y va a comprobar con el siguiente caracter
    });

    if (!error && automata.estadoFinal == estadoActual && pila.length == 0) { //Entonces una ves finalizado los every va a hacer una comprobacion de si no hay un error, de si el estado final coincide y de que si la pila esta vacia
        let options = {
            buttons: ['Aceptar'], //Establece las opciones
            message: 'Cadena correcta' //de la ventana emergente
        }
        dialog.showMessageBox(options); //Entonces muestra la ventana
    } else {
        dialog.showErrorBox('Error', 'La cadena no es valida.'); //si no es asi entonces muestra una alerta de que no se cumplio el lenguaje
    }
});