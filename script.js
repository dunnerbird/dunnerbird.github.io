// toggle sections
function toggleSocials(id) {
    const element = document.getElementById(id);
    const isActive = element.classList.contains("active");
    const expansion = document.getElementById("expansion");

    document.querySelectorAll('.socials-extension').forEach(section => {
        section.classList.remove("active");
        section.classList.add("inactive");
    });

    if (!isActive) {
        element.classList.remove("inactive");
        element.classList.add("active");
        expansion.style.display = "block";
    } else {
        expansion.style.display = "none";
    }

    // If no section is active, hide the expansion div
    const anyActive = Array.from(document.querySelectorAll('.socials-extension')).some(sec =>
        sec.classList.contains("active")
    );
    expansion.style.display = anyActive ? "block" : "none";
}

// tilt effect
const tiltTargets = ['container', 'music-wrapper', 'expansion'];
let mouseX = 0, mouseY = 0;

tiltTargets.forEach(id => {
    const box = document.getElementById(id);
    if (!box) return;

    let rect = null;
    let isHovering = false;

    function updateTilt() {
        if (!isHovering || !rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        const percentX = deltaX / (rect.width / 2);
        const percentY = deltaY / (rect.height / 2);

        const maxTilt = 15;
        const rotateX = -(percentY * maxTilt);
        const rotateY = percentX * maxTilt;
        const shadowX = -percentX * 30;
        const shadowY = -percentY * 30;

        box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        box.style.boxShadow = `${shadowX}px ${shadowY}px 60px rgba(0, 0, 0, 0.4)`;

        requestAnimationFrame(updateTilt);
    }

    box.addEventListener('mouseenter', () => {
        rect = box.getBoundingClientRect();
        isHovering = true;
        requestAnimationFrame(updateTilt);
    });

    box.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    box.addEventListener('mouseleave', () => {
        isHovering = false;
        box.style.transform = 'rotateX(0deg) rotateY(0deg)';
        box.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
});

// typewriter
const messages = ["😭 19", "🌙 anime fan", "🎧 mommyasmr", "🖥️ pc builder", "🤤 Manaka Nemu", "💀 TFT player"];
let index = 0, charIndex = 0;
const typeElem = document.getElementById("typewriter");

function typeEffect() {
  if (charIndex < messages[index].length) {
    typeElem.textContent += messages[index].charAt(charIndex++);
    setTimeout(typeEffect, 60);
  } else {
    setTimeout(() => {
      typeElem.textContent = "";
      charIndex = 0;
      index = (index + 1) % messages.length;
      typeEffect();
    }, 1500);
  }
}
typeEffect();
};
