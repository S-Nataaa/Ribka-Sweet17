document.addEventListener("DOMContentLoaded", () => {
    

    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    const icon = document.getElementById('music-icon');
    const overlay = document.getElementById('welcome-overlay');
    
    window.bukaHadiah = function() {
        music.play().then(() => {
            btn.classList.add('playing');
            icon.innerText = '🎵';
        }).catch(err => console.log("Audio error:", err));

        overlay.classList.add('hide-overlay');
        document.body.style.overflow = 'auto'; 

        startTyping();
    }

    window.showPage = function(pageId) {
        document.querySelectorAll('.page-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-section');
        });

        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
            setTimeout(() => activePage.classList.add('active-section'), 10);
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.getElementById('link-' + pageId).classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.toggleMusic = function() {
        if (music.paused) {
            music.play();
            btn.classList.add('playing');
            icon.innerText = '🎵';
        } else {
            music.pause();
            btn.classList.remove('playing');
            icon.innerText = '🔇';
        }
    }

    function startTyping() {
        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            const text = typingElement.getAttribute('data-text');
            typingElement.innerText = '';
            typingElement.classList.add('typing');
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typingElement.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    typingElement.classList.remove('typing');
                }
            }
            typeWriter();
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});