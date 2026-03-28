const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('#contact-form');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('is-open', !expanded);
        document.body.classList.toggle('menu-open', !expanded);
    });

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        });
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        if (!navLinks.classList.contains('is-open')) {
            return;
        }

        if (navLinks.contains(target) || menuToggle.contains(target)) {
            return;
        }

        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1180) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        }
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.16,
    }
);

revealItems.forEach((item) => observer.observe(item));

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const nombre = String(formData.get('nombre') || '').trim();
        const telefono = String(formData.get('telefono') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const servicio = String(formData.get('servicio') || '').trim();
        const consulta = String(formData.get('consulta') || '').trim();

        const lines = [
            'Hola, quiero asesoramiento sobre Cocheria Metetieri.',
            nombre ? `Nombre: ${nombre}` : '',
            telefono ? `Telefono: ${telefono}` : '',
            email ? `Email: ${email}` : '',
            servicio ? `Tipo de servicio: ${servicio}` : '',
            consulta ? `Consulta: ${consulta}` : '',
        ].filter(Boolean);

        const message = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/5491161179940?text=${message}`, '_blank', 'noopener');
    });
}
