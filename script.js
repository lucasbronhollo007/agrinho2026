// ================================
// AGRINHO 2026 - JAVASCRIPT
// ================================

// Animação dos números nas estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Função para verificar se o elemento está visível na viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animar cards quando aparecerem
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            
            // Animar números das estatísticas
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.textContent);
                if (target > 0) {
                    animateCounter(entry.target, target);
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os cards e números
document.addEventListener('DOMContentLoaded', () => {
    // Observar cards de ideias
    const ideiaCards = document.querySelectorAll('.ideia-card');
    ideiaCards.forEach(card => {
        observer.observe(card);
    });

    // Observar cards de estatísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        observer.observe(card);
        const numberElement = card.querySelector('.stat-number');
        if (numberElement) {
            observer.observe(numberElement);
        }
    });

    // Observar items de impacto
    const impactoItems = document.querySelectorAll('.benefit-item');
    impactoItems.forEach(item => {
        observer.observe(item);
    });

    // Dados das estatísticas
    const stats = {
        stat1: 37, // Milhões de hectares
        stat2: 40, // Porcentagem da produção global
        stat3: 150, // Bilhões de dólares
        stat4: 35   // Potencial de aumento
    };

    // Preencher estatísticas com dados reais
    for (let key in stats) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = '0';
            
            // Animar quando visível
            const observer2 = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target, stats[key]);
                        observer2.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            observer2.observe(element);
        }
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Efeito de parallax nas seções
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Efeito hover nos cards
const ideiaCards = document.querySelectorAll('.ideia-card');
ideiaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Adicionar classe de ativo ao navbar ao scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
    }
});

// Função para atualizar dados em tempo real (exemplo)
function updateStatistics() {
    // Aqui você pode adicionar uma chamada para uma API para obter dados em tempo real
    console.log('Estatísticas atualizadas');
}

// Atualizar estatísticas a cada 5 minutos
setInterval(updateStatistics, 5 * 60 * 1000);

// Efeito de digitação no título hero (opcional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Ativar typewriter no título ao carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        // Descomentar a linha abaixo para ativar o efeito de digitação
        // typeWriter(heroTitle, text);
    }
});

// Gerar gráfico dinâmico (exemplo com canvas)
function createChart() {
    const canvas = document.createElement('canvas');
    if (typeof Chart !== 'undefined') {
        // Se a biblioteca Chart.js estiver disponível, criar gráfico mais avançado
        console.log('Chart.js disponível');
    }
}

// Log de sucesso
console.log('%c🌱 Agrinho 2026 - Site de Sustentabilidade Agrícola 🌱', 
    'font-size: 20px; color: #00ff41; text-shadow: 0 0 10px #00ff41; font-weight: bold;');
console.log('%cTema: Estatísticas com Verde Neon e Preto', 
    'font-size: 14px; color: #00ff41;');
console.log('%cDesenvolvido com ❤️ para um futuro sustentável', 
    'font-size: 12px; color: #00ff41;');

// Adicionar event listeners aos botões CTA
document.querySelectorAll('.cta-button, .cta-button-large').forEach(button => {
    button.addEventListener('click', function(e) {
        // Criar efeito de ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Adicionar CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
    .cta-button, .cta-button-large {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

