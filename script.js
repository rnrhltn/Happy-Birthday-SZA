const ribbonButton = document.getElementById('ribbonButton');
const canvas = document.getElementById('ribbonCanvas');
const popup = document.getElementById('popup');
const birthdayMusic = document.getElementById('birthdayMusic');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ribbons = [];

class Ribbon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.width = Math.random() * 20 + 10; // Ribbon width
        this.height = Math.random() * 50 + 30; // Ribbon height
        this.color = `hsl(${Math.random() * 30 + 300}, 70%, 80%)`; // Shades of pink
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2; // For slight rotation
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); // Add rotation for ribbon effect
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 2; // Slight horizontal wobble
        if (this.y > canvas.height) this.y = 0;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
    }
}

function createRibbons() {
    for (let i = 0; i < 150; i++) {
        ribbons.push(new Ribbon());
    }
}

function animateRibbons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ribbons.forEach((ribbon) => {
        ribbon.update();
        ribbon.draw();
    });
    requestAnimationFrame(animateRibbons);
}

ribbonButton.addEventListener('click', () => {
    // Start the ribbon animation
    createRibbons();
    animateRibbons();

    // Play the music
    birthdayMusic.play();

    // Show the popup
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden'); // Hide after 5 seconds
    }, 15000);
});
