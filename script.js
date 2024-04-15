const html = document.querySelector("html");
const banner = document.querySelector(".app__image");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const text = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const timer = document.querySelector("#timer");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const playPauseBtImg = document.querySelector(".app__card-primary-butto-icon");

const somPause = new Audio("./sons/pause.mp3");
const somPlay = new Audio("./sons/play.wav");
const somFimTimer = new Audio("./sons/beep.mp3");
const musica = new Audio("./sons/luna-rise-part-one.mp3");

musica.loop = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
timer.innerHTML = tempoDecorridoEmSegundos;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  changeTheme("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  changeTheme("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  changeTheme("descanso-longo");
  longoBt.classList.add("active");
});

function changeTheme(contexto) {
  mostrarTimer();
  botoes.forEach(function (botao) {
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", `${contexto}`);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      text.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      text.innerHTML = `Que tal uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      text.innerHTML = `Hora de voltar à superficie.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    somFimTimer.play();
    alert("tempo finalizado");
    zerar();
    somFimTimer.pause();
    reiniciar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTimer();
  console.log("temporizador" + tempoDecorridoEmSegundos);
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    somPause.play();
    return;
  }
  somPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  playPauseBtImg.setAttribute("src", `./imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  playPauseBtImg.setAttribute("src", `./imagens/play_arrow.png`);
  intervaloId = null;
}

function reiniciar() {
  tempoDecorridoEmSegundos = 10;
  mostrarTimer();
}

function mostrarTimer() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${tempoFormatado}`;
}

mostrarTimer();
