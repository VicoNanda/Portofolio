// ===== MATRIX RAIN ANIMATION =====
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const comingPopup = document.getElementById('coming-popup');
const closePopup = document.getElementById('close-popup');
const cvBtn = document.getElementById('cv-btn');
const emailBtn = document.getElementById('email-btn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}:<>?';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.floor(Math.random() * -100);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(6, 8, 15, 0.04)';
  ctx.fillStyle = 'rgba(3, 5, 8, 0.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00cc44';
  ctx.font = fontSize + 'px Fira Code, monospace';
  ctx.fillStyle = '#00ff66';
  ctx.font = fontSize + 'px "Share Tech Mono", monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillStyle = '#00cc44';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00aa33';
    ctx.fillStyle = '#00ff66';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00ff66';
    ctx.fillText(char, x, y);
    ctx.shadowBlur = 0;

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== TYPEWRITER =====
document.addEventListener('DOMContentLoaded', function() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = ['Hi, my name is Vico', 'Hi, my name is Vico'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 100);
    } else {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 50);
    }
  }
  type();
});

// ===== 3D TILT CARD - IMPROVED =====
const card = document.getElementById('card3d');
if (card) {
  let isHovering = false;
  
  card.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  card.addEventListener('mouseleave', () => {
    isHovering = false;
    card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateY = 15 * offsetX;
    const rotateX = -15 * offsetY;
    const scale = 1 + 0.03 * (1 - Math.abs(offsetX) - Math.abs(offsetY) / 2);
    
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${Math.max(1, scale)})`;
  });

  // Touch support
  card.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (touch.clientX - centerX) / (rect.width / 2);
    const offsetY = (touch.clientY - centerY) / (rect.height / 2);
    card.style.transform = `rotateY(${12 * offsetX}deg) rotateX(${-12 * offsetY}deg)`;
  }, { passive: true });
  
  card.addEventListener('touchend', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-bar .fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const w = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => { fill.style.width = w; }, 200);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(fill => observer.observe(fill));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

document.querySelectorAll('.btn-sertifikat').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const imgSrc = this.getAttribute('data-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});
function showComingPopup(e) {
  e.preventDefault();
  comingPopup.classList.add('show');
}

cvBtn.addEventListener('click', showComingPopup);
emailBtn.addEventListener('click', showComingPopup);

closePopup.addEventListener('click', () => {
  comingPopup.classList.remove('show');
});

comingPopup.addEventListener('click', (e) => {
  if (e.target === comingPopup) {
    comingPopup.classList.remove('show');
  }
});