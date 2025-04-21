document.addEventListener("DOMContentLoaded", () => {
    var x = 0;
    var CPC = 1;
    var score = 0;
    if (localStorage.getItem('save') != null) {
        var saveContents = JSON.parse(localStorage.getItem('save'));
        CPC = parseInt(saveContents.cpc);
        score = parseInt(saveContents.SCORE);
    }
    const button = document.getElementById('click');
    const scoreCounter = document.getElementById('counter');
    const CPCCounter = document.getElementById('counter2');

    scoreCounter.innerText = score.toLocaleString();
    CPCCounter.innerText = CPC.toLocaleString();

    function setLocalStorage() {
        const jsonData = {
            cpc: CPC,
            SCORE: score,
        };
        localStorage.setItem('save', JSON.stringify(jsonData))
    }

    function turn() {
        x+= 0.1;
        const rotation = Math.sin(x * 0.1) * 10;
        button.style.transform = `rotate(${rotation}deg)`;
    }
    function createParticles() {
        var newParticle = document.createElement('button')

        newParticle.textContent = 'click me!';
        newParticle.style.border = 'none';
        newParticle.style.borderRadius = '5px';
        newParticle.style.position = 'absolute';
        newParticle.style.opacity = 0.3;
        newParticle.style.backgroundColor = 'lightgray';
        newParticle.className = 'particles';

        newParticle.style.top = '0px';
        newParticle.style.left = `${Math.random()*window.innerWidth}px`

        document.body.appendChild(newParticle);
    }
    function click() {
        score += CPC;
        scoreCounter.innerText = score.toLocaleString();
        createParticles();
        setLocalStorage();
    }
    window.increaseCPC = function(cost, increase) {
        if (score >= cost) {
            score -= cost;
            CPC += increase;
            scoreCounter.innerText = score.toLocaleString();
            CPCCounter.innerText = CPC.toLocaleString();
            setLocalStorage();

        }
    }
    setInterval(() => {
        turn();
        const allParticles = document.querySelectorAll('.particles');

        allParticles.forEach((particle) => {
            var topPosition = parseFloat(particle.style.top);
            topPosition += 3;

            particle.style.top = `${topPosition}px`;
            if (parseFloat(particle.style.top) > 500) {
                particle.remove();
            }
        });
    }, 1);

    button.addEventListener('click', click);
});
