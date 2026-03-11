// JavaScript mejorado
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navbar = document.querySelector('.navbar');
    const heroImagen = document.querySelector('.hero-imagen-sticky img');

    // Menú hamburguesa
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", (e) => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.style.overflow = 'auto';
        });
    });

    // Animaciones fade-in
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    animatedElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Efecto de scroll en navbar y zoom del hero
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (heroImagen) {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight * 0.5;
            
            if (scrollY < maxScroll) {
                const scale = 1 - (scrollY / maxScroll) * 0.03;
                heroImagen.style.transform = `scale(${scale})`;
            } else {
                heroImagen.style.transform = 'scale(0.97)';
            }
        }
    });

    // Smooth scroll para los enlaces del nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
