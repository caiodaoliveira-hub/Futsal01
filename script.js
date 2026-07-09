// Aguarda o DOM (conteúdo da página) carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ROLAGEM SUAVE PARA OS LINKS DO MENU ---
    const linksMenu = document.querySelectorAll('nav ul li a');

    linksMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão de pulo do link
            
            const targetId = link.getAttribute('href'); // Pega o id do destino (ex: #origem)
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Rola suavemente até a seção, descontando a altura do menu fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. BOTÃO VOLTAR AO TOPO ---
    const btnTopo = document.getElementById('btn-topo');

    window.addEventListener('scroll', () => {
        // Se desceu mais de 300px da página, mostra o botão, senão esconde
        if (window.scrollY > 300) {
            btnTopo.classList.add('visible');
        } else {
            btnTopo.classList.remove('visible');
        }
    });

    // Quando clicar no botão, rola suavemente para o topo
    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 3. ANIMAÇÃO AO ROLAR A PÁGINA (FADE-IN) ---
    const secoes = document.querySelectorAll('.content-section');

    const odisseyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se a seção estiver visível na tela, adiciona a classe de animação
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.15 // Ativa quando 15% da seção aparecer na tela
    });

    secoes.forEach(secao => {
        secao.classList.add('fade-in-hidden'); // Esconde inicialmente por CSS
        odisseyObserver.observe(secao); // Começa a observar a seção
    });
});