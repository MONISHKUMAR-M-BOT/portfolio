const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const context = canvas.getContext('2d');
    const frameCount = 40;
    const currentFrame = index => (
        `assests/ezgif-295c0ba92881b527-jpg/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    );
    const images = [];
    const frames = { frame: 0 };

    const updateCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.imageSmoothingEnabled = false;
    };
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }
    };

    const drawImage = index => {
        if (index >= 0 && index < images.length) {
            const img = images[index];
            if (img.complete) {
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        }
    };

    let frameIndex = 0;
    const fps = 24;
    const interval = 1000 / fps;
    let lastTime = 0;

    const animate = (currentTime) => {
        if (!lastTime) lastTime = currentTime;
        const delta = currentTime - lastTime;
        if (delta > interval) {
            drawImage(frameIndex);
            frameIndex = (frameIndex + 1) % frameCount;
            lastTime = currentTime - (delta % interval);
        }
        requestAnimationFrame(animate);
    };
    preloadImages();
    const startAnimation = () => {
        requestAnimationFrame(animate);
    };
    const img1 = new Image();
    img1.src = currentFrame(1);
    img1.onload = startAnimation;
    if (img1.complete) startAnimation();

}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const revealElements = document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item, .edu-card');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, revealOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    revealOnScroll.observe(el);
});
revealElements.forEach(el => {
    el.style.removeProperty('opacity');
    el.style.removeProperty('transform');
    el.style.removeProperty('transition');
    el.classList.add('hidden-reveal');
});
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('mobile-active');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    hero.classList.add('glitch-active');

    setTimeout(() => {
        document.querySelector(".glitch").classList.add("clear");
        document.querySelector(".glitch-sub").classList.add("clear");
        hero.classList.remove('glitch-active');
    }, 2500);
});
const bgCanvas = document.getElementById('bg-sparkles');
if (bgCanvas) {
    const bgCtx = bgCanvas.getContext('2d');
    let width, height;
    let particles = [];

    const resizeBg = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        bgCanvas.width = width;
        bgCanvas.height = height;
    };
    window.addEventListener('resize', resizeBg);
    resizeBg();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random();
            this.color = Math.random() > 0.5 ? '#ff00ff' : '#bf00ff'; // Pink or Purple
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;

            this.opacity += (Math.random() - 0.5) * 0.1;
            if (this.opacity < 0) this.opacity = 0;
            if (this.opacity > 1) this.opacity = 1;
        }

        draw() {
            bgCtx.fillStyle = this.color;
            bgCtx.globalAlpha = this.opacity;
            bgCtx.shadowBlur = 0; // Remove glow
            bgCtx.beginPath();
            bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            bgCtx.fill();
        }
    }

    const initParticles = () => {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    };
    initParticles();

    const animateBg = () => {
        bgCtx.clearRect(0, 0, width, height); 
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateBg);
    };
    animateBg();
}


