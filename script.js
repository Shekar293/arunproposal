// ===== Floating Hearts Background =====
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💝', '💞'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 12000);
}

// Spawn hearts continuously
setInterval(createFloatingHeart, 600);
// Initial burst
for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// ===== Playful "No" Button (runs away) =====
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const messages = [
    "Are you sure? 🥺",
    "Really? 😢",
    "Think again! 💔",
    "Please? 🙏",
    "Don't break my heart 💔",
    "One more try? 🥹",
    "Okay last chance! 😭"
];
let messageIndex = 0;

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 60);
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    noBtn.style.transition = 'all 0.3s ease';

    // Grow the Yes button each time she tries to click No
    const currentScale = parseFloat(getComputedStyle(yesBtn).getPropertyValue('transform').split(',')[3]) || 1;
    const newScale = Math.min(currentScale + 0.15, 2.5);
    yesBtn.style.transform = `scale(${newScale})`;

    // Change the No button text to a cute message
    if (messageIndex < messages.length) {
        noBtn.textContent = messages[messageIndex];
        messageIndex++;
    }
}

// ===== Yes Button -> Celebration =====
const celebration = document.getElementById('celebration');
const replayBtn = document.getElementById('replayBtn');

yesBtn.addEventListener('click', () => {
    celebration.classList.add('show');
    startConfetti();
});

replayBtn.addEventListener('click', () => {
    celebration.classList.remove('show');
    stopConfetti();
    // Reset buttons
    noBtn.style.position = 'relative';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.textContent = 'No 😢';
    messageIndex = 0;
    yesBtn.style.transform = 'scale(1)';
});

// ===== Confetti Animation =====
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId = null;

const confettiColors = ['#ff6b9d', '#ff4d88', '#ff8fb3', '#ffd1e3', '#ffffff', '#ffb3c6'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function startConfetti() {
    canvas.classList.add('show');
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(p => {
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    });
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove('show');
}