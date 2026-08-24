const canvas = document.getElementById("cloud-background");
const ctx = canvas.getContext("2d");

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();

window.addEventListener("resize", () => {
    ajustarCanvas();
    criarPontos();
});

let pontos = [];

function criarPontos() {
    pontos = [];

    for (let i = 0; i < 70; i++) {

        pontos.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            tamanho: Math.random() * 1.5 + 0.8,

            velocidadeX: (Math.random() - 0.5) * 0.3,
            velocidadeY: (Math.random() - 0.5) * 0.3
        });
    }
}

criarPontos();

function desenhar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pontos.length; i++) {

        let ponto = pontos[i];

        // Movimento
        ponto.x += ponto.velocidadeX;
        ponto.y += ponto.velocidadeY;

        // Faz a estrela reaparecer do outro lado
        if (ponto.x < 0) ponto.x = canvas.width;
        if (ponto.x > canvas.width) ponto.x = 0;

        if (ponto.y < 0) ponto.y = canvas.height;
        if (ponto.y > canvas.height) ponto.y = 0;

        // Estrela
        ctx.beginPath();

        ctx.arc(
            ponto.x,
            ponto.y,
            ponto.tamanho,
            0,
            Math.PI * 2
        );

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#38bdf8";

        ctx.fillStyle = "#38bdf8";
        ctx.fill();

        ctx.shadowBlur = 0;

        // Conexões
        for (let j = i + 1; j < pontos.length; j++) {

            let outro = pontos[j];

            let distancia = Math.sqrt(
                (ponto.x - outro.x) ** 2 +
                (ponto.y - outro.y) ** 2
            );

            if (distancia < 120) {

                ctx.beginPath();

                ctx.moveTo(ponto.x, ponto.y);
                ctx.lineTo(outro.x, outro.y);

                ctx.strokeStyle =
                    "rgba(56, 189, 248, 0.15)";

                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(desenhar);
}

desenhar();