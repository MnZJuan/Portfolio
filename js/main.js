// ============= INICIALIZAÇÃO AOS (ANIMATE ON SCROLL) =============
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease',
    delay: 100
});

// ============= TEXTO DIGITADO NA SEÇÃO HERO =============
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o efeito de digitação
    const options = {
        strings: ['Front-end Developer', 'Back-end Developer', 'UI/UX Designer', 'Mobile Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        smartBackspace: true
    };
    
    const typed = new Typed('.typed-text', options);

    // Menu de navegação - adiciona classe quando rola a página
    const header = document.querySelector('header');
    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollTop.classList.remove('active');
        }
    });

    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll suave para os links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botão Scroll to Top
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Filtro para categorias de habilidades
    const techCategories = document.querySelectorAll('.category');
    
    techCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remover classe active de todas as categorias
            techCategories.forEach(item => item.classList.remove('active'));
            
            // Adicionar classe active à categoria clicada
            this.classList.add('active');
            
            // Mostrar a grade correspondente e esconder as outras
            const categoryId = this.getAttribute('data-category');
            const techGrids = document.querySelectorAll('.tech-grid');
            
            techGrids.forEach(grid => {
                grid.classList.add('hidden');
            });
            
            document.getElementById(categoryId).classList.remove('hidden');
        });
    });

    // Filtro para projetos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterBtns.forEach(item => item.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Remover animação de fade in
                card.style.animation = 'none';
                
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    
                    // Adicionar pequeno atraso para escalonamento da animação
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s forwards';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        
                        // Adicionar pequeno atraso para escalonamento da animação
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.5s forwards';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // Efeito hover nos links e botões
    const links = document.querySelectorAll('a, button, .btn, .social-icon, .filter-btn, .category');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderWidth = '1px';
            cursor.style.backgroundColor = 'rgba(130, 87, 229, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderWidth = '2px';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // Formulário de contato - validação e envio simulado
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Validação básica
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            }
            
            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            }
            
            if (isValid) {
                // Simulação de envio bem-sucedido
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 2000);
            }
        });
    }
    
    // Função para validação de email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Função para destacar campos com erro
    function highlightError(input) {
        input.style.borderColor = '#ff3860';
        input.style.backgroundColor = 'rgba(255, 56, 96, 0.05)';
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }, { once: true });
    }

    // Formulário de newsletter - simulação de inscrição
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button');
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                return;
            }
            
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            
            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                }, 3000);
            }, 1500);
        });
    }

    // Animação de carregamento progressivo dos elementos da interface
    function revealElements() {
        const elements = document.querySelectorAll('.hero-text, .hero-image, .section-header, .about-content, .tech-grid, .projects-grid, .services-grid, .contact-content');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }
    
    // Executar após um pequeno atraso para permitir que a página carregue completamente
    setTimeout(revealElements, 500);

    // Configurar os elementos flutuantes em órbita
    setupFloatingElements();

    // Animação do terminal
    animateTerminal();
});

// Função para configurar os elementos flutuantes
function setupFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-elements span');
    
    // Se não houver ícones, sair da função
    if (!floatingIcons.length) return;
    
    // Raio da órbita - determina a distância do planeta
    const orbitRadius = 170;
    
    // Remover a animação do container para permitir animações independentes
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        // Remover qualquer animação atribuída ao container
        floatingElements.style.animation = 'none';
    }
    
    // Adicionar estilos necessários para animações independentes
    addOrbitKeyframes();
    
    floatingIcons.forEach((icon, index) => {
        // Calcular ângulo inicial para distribuição uniforme em 360°
        const startAngle = (index / floatingIcons.length) * Math.PI * 2;
        
        // Definir velocidade única para cada ícone (entre 20s e 40s)
        const duration = 20 + (index * 3);
        
        // Definir direção da rotação (alguns no sentido horário, outros anti-horário)
        const direction = index % 2 === 0 ? 1 : -1;
        
        // Configurar o elemento com posição e animação próprias
        icon.setAttribute('data-orbit-index', index);
        icon.setAttribute('data-orbit-angle', startAngle);
        icon.setAttribute('data-orbit-radius', orbitRadius);
        icon.setAttribute('data-orbit-direction', direction);
        
        // Posicionar o elemento na sua posição inicial
        positionOrbitalElement(icon, startAngle, orbitRadius);
        
        // Adicionar animação orbital independente
        icon.style.animation = `orbitElement${index} ${duration}s linear infinite`;
        
        // Adicionar variação visual para cada ícone
        const hue = (index * 60) % 360;
        icon.style.boxShadow = `0 5px 15px rgba(${hue}, ${Math.max(100, hue)}, ${Math.min(255, hue + 150)}, 0.3)`;
        
        // Adicionar animação secundária de flutuação
        icon.style.animationName = `orbitElement${index}, iconFloat`;
        icon.style.animationDuration = `${duration}s, 5s`;
        icon.style.animationTimingFunction = 'linear, ease-in-out';
        icon.style.animationIterationCount = 'infinite, infinite';
        icon.style.animationDelay = `0s, ${index * 0.5}s`;
    });
}

// Função para posicionar um elemento em uma órbita
function positionOrbitalElement(element, angle, radius) {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    element.style.transform = `translate3d(${x}px, 0, ${z}px)`;
}

// Função para adicionar keyframes para cada elemento orbital
function addOrbitKeyframes() {
    // Verificar se já existe o estilo
    if (document.getElementById('orbital-animations')) {
        document.getElementById('orbital-animations').remove();
    }
    
    const style = document.createElement('style');
    style.id = 'orbital-animations';
    
    let keyframesRules = '';
    
    // Criar a animação de flutuação
    keyframesRules += `
        @keyframes iconFloat {
            0%, 100% {
                transform: translate3d(var(--x, 0), -8px, var(--z, 0));
            }
            50% {
                transform: translate3d(var(--x, 0), 8px, var(--z, 0));
            }
        }
    `;
    
    // Obter todos os ícones
    const floatingIcons = document.querySelectorAll('.floating-elements span');
    
    // Criar animações orbital personalizadas para cada ícone
    floatingIcons.forEach((icon, index) => {
        // Definir direção da rotação (alguns no sentido horário, outros anti-horário)
        const direction = index % 2 === 0 ? 1 : -1;
        
        keyframesRules += `
            @keyframes orbitElement${index} {
                0% {
                    transform: translate3d(
                        ${Math.cos(0) * 170}px, 
                        0, 
                        ${Math.sin(0) * 170}px
                    );
                }
                25% {
                    transform: translate3d(
                        ${Math.cos(Math.PI * 0.5 * direction) * 170}px, 
                        0, 
                        ${Math.sin(Math.PI * 0.5 * direction) * 170}px
                    );
                }
                50% {
                    transform: translate3d(
                        ${Math.cos(Math.PI * direction) * 170}px, 
                        0, 
                        ${Math.sin(Math.PI * direction) * 170}px
                    );
                }
                75% {
                    transform: translate3d(
                        ${Math.cos(Math.PI * 1.5 * direction) * 170}px, 
                        0, 
                        ${Math.sin(Math.PI * 1.5 * direction) * 170}px
                    );
                }
                100% {
                    transform: translate3d(
                        ${Math.cos(Math.PI * 2 * direction) * 170}px, 
                        0, 
                        ${Math.sin(Math.PI * 2 * direction) * 170}px
                    );
                }
            }
        `;
    });
    
    style.innerHTML = keyframesRules;
    document.head.appendChild(style);
}

// ============= LAZY LOADING PARA IMAGENS =============
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.getAttribute('data-src');
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback para navegadores que não suportam Intersection Observer
        lazyImages.forEach(function(image) {
            image.src = image.getAttribute('data-src');
            image.removeAttribute('data-src');
        });
    }
});

// ============= PRÉ-CARREGAMENTO DE FONTES E RECURSOS =============
document.addEventListener('DOMContentLoaded', function() {
    // Pré-carregar fontes críticas
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
    
    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(googleFonts);
});

// Função para animar o terminal
function animateTerminal() {
    const terminalContainer = document.querySelector('.terminal-container');
    const commandsToType = document.querySelectorAll('.command.typing');
    const terminalLines = document.querySelectorAll('.terminal-body .line');
    
    // Esconder todas as linhas exceto a primeira
    terminalLines.forEach((line, index) => {
        if (index > 0) {
            line.style.display = 'none';
        }
    });
    
    // Mostrar as linhas com atraso
    let delay = 1000;
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.display = 'flex';
            line.style.opacity = '0';
            line.style.animation = 'fadeIn 0.5s forwards';
            
            // Adicionar efeito de digitação para comandos
            const command = line.querySelector('.command:not(.typing)');
            if (command) {
                let text = command.textContent;
                command.textContent = '';
                typeText(command, text, 75);
            }
        }, delay);
        
        // Aumentar o atraso para cada linha
        delay += index === 0 ? 800 : 1500;
    });
    
    // Animação do cursor pulsante
    const blinkingCursor = document.querySelector('.cursor.blink');
    if (blinkingCursor) {
        blinkingCursor.style.animation = 'blink 1s infinite';
    }
    
    // Adicionar efeito de hover no terminal
    if (terminalContainer) {
        terminalContainer.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.cursor.blink');
            if (cursor) {
                cursor.style.opacity = '1';
            }
        });
        
        terminalContainer.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.cursor.blink');
            if (cursor) {
                cursor.style.opacity = '0.7';
            }
        });
    }
}

// Função para simular digitação de texto
function typeText(element, text, speed) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}