
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
    if (jugada === 1) return 'ROCA';
    if (jugada === 2) return 'PAPEL';
    if (jugada === 3) return 'TIJERA';
    return null; // Si la jugada no es válida
}

// Variables
let jugador = 0;
let pc = 0;
let perdidas = 0;
let ganadas = 0;
let min = 1;
let max = 3;

const choicesObject = {
    ROCA: "https://i.postimg.cc/SRr388SY/piedra.png",
    PAPEL: "https://i.postimg.cc/fLY6zp1K/papel.png",
    TIJERA: "https://i.postimg.cc/FFg22tyF/tijera.png"
};

const resultText = document.getElementById('resultText');
const win = document.getElementById('win');
const lose = document.getElementById('lose');
const playerChoiceImage = document.getElementById('player-choice');
const pcChoiceImage = document.getElementById('pc-choice');
//sonido seleccion figura
const sound = document.getElementById('click-sound');
sound.volume=0.05;
const choices = document.querySelectorAll('.choice');
//sonido ganada y perdida
const winSound = document.getElementById('win-sound');
winSound.volume=0.05;
const loseSound = document.getElementById('lose-sound');
loseSound.volume=0.05;

//audio fondo

const backgroundSound= document.getElementById('background-sound')

backgroundSound.volume=0.02;



choices.forEach(choice => {
    choice.addEventListener('click', () => {
        sound.play(); // Reproduce el sonido al hacer clic
    });
});
// Evento de clic para los botones
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', function() {
        // Obtiene la elección del jugador basada en el ID del botón
        if (this.id === 'rock') jugador = 1;
        if (this.id === 'paper') jugador = 2;
        if (this.id === 'scissors') jugador = 3;

        // Asegúrate de que se ejecute solo si el jugador ha hecho una elección válida
        if (jugador >= 1 && jugador <= 3) {
            pc = aleatorio(min, max);
            const opcionPlayer = eleccion(jugador);
            const opcionPc = eleccion(pc);

            // Actualizar las imágenes del jugador y de la PC
            playerChoiceImage.src = choicesObject[opcionPlayer];
            pcChoiceImage.src = choicesObject[opcionPc];

            // Lógica para la jugada
            let resultado;
            if (pc === jugador) {
                resultado = "EMPATE";
            } else if (jugador === 1 && pc === 3 || jugador === 2 && pc === 1 || jugador === 3 && pc === 2) {
                resultado = "GANASTE!!!";
                ganadas++;
                win.innerHTML = ganadas;
            } else {
                resultado = "PERDISTE!!!";
                perdidas++;
                lose.innerHTML = perdidas;
            }
            resultText.textContent = `${resultado}`
            //. Elegiste "${opcionPlayer}" y la PC eligió "${opcionPc}"!`;
            // Si el jugador gana o pierde 3 veces
            if (ganadas >= 3) {
                winSound.play();
                alert("GANASTE LA PARTIDA 🎉🎉🎉 ");
                reiniciojuego();
            } else if (perdidas >= 3) {
                loseSound.play();
                alert("PERDISTE LA PARTIDA 😭😭😭");
                reiniciojuego();
            }
        } else {
            alert("Por favor, elige una opción válida.");
        }
    });
});

function reiniciojuego() {
    location.reload();
}
