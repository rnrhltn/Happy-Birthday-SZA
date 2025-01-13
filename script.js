const confettiButton = document.getElementById('confettiButton');
const canvas = document.getElementById('confettiCanvas');
const popup = document.getElementById('popup');
const birthdayMusic = document.getElementById('birthdayMusic');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle);
        if (this.y > canvas.height) this.y = 0;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
    }
}

function createConfetti() {
    for (let i = 0; i < 300; i++) {
        confettiParticles.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateConfetti);
}

confettiButton.addEventListener('click', () => {
    // Start the confetti animation
    createConfetti();
    animateConfetti();

    // Play the music
    birthdayMusic.play();

    // Show the popup
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden'); // Hide after 5 seconds
    }, 15000);
});
