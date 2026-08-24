// --- 1. CONFIGURAÇÃO DA CENA 3D (THREE.JS) ---

// Elemento container onde o canvas 3D será injetado
const container = document.getElementById('canvas-container');

// Criação da Cena 3D
const scene = new THREE.Scene();

// Configuração da Câmera (Campo de visão, proporção de aspecto, planos de renderização)
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 4; // Distancia a câmera do centro

// Inicialização do Renderizador WebGL com fundo transparente
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight); // Define dimensões
renderer.setPixelRatio(window.devicePixelRatio); // Melhora qualidade em telas Retina
container.appendChild(renderer.domElement); // Adiciona o canvas ao HTML

// Criação de uma Geometria 3D estilizada (Simulando o frasco elegante de perfume)
const geometry = new THREE.CylinderGeometry(0.8, 1, 2.2, 32); // Cilindro refinado
const material = new THREE.MeshPhysicalMaterial({
  color: 0x9333ea, // Cor roxa elegante
  metalness: 0.2, // Baixa metalicidade
  roughness: 0.1, // Altamente reflexivo (efeito de vidro)
  transmission: 0.6, // Transparência tipo vidro
  ior: 1.5 // Índice de refração da luz
});
const perfumeMesh = new THREE.Mesh(geometry, material); // Junta forma e material

// Adiciona uma "tampa" metálica ao perfume
const capGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
const capMaterial = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 }); // Dourado
const capMesh = new THREE.Mesh(capGeometry, capMaterial);
capMesh.position.y = 1.35; // Posiciona a tampa no topo
perfumeMesh.add(capMesh); // Agrupa a tampa com o corpo

scene.add(perfumeMesh); // Adiciona o objeto final à cena

// Iluminação da Cena
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Luz ambiente geral
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2); // Luz de ponto focada
pointLight.position.set(5, 5, 5); // Posição da luz
scene.add(pointLight);

// Função de Animação Contínua (Loop de renderização)
function animate3D() {
  requestAnimationFrame(animate3D); // Requisitiona o próximo quadro de animação
  perfumeMesh.rotation.y += 0.01; // Aplica rotação constante no eixo Y
  perfumeMesh.rotation.x += 0.003; // Aplica leve rotação no eixo X
  renderer.render(scene, camera); // Renderiza a cena a cada quadro
}
animate3D(); // Inicia o loop

// Ajusta o tamanho da cena 3D dinamicamente na redimensionamento da janela
window.addEventListener('resize', () => {
  if (!container) return;
  camera.aspect = container.clientWidth / container.clientHeight; // Atualiza a proporção
  camera.updateProjectionMatrix(); // Recalcula a matriz da câmera
  renderer.setSize(container.clientWidth, container.clientHeight); // Redimensiona o canvas
});

// --- 2. CONFIGURAÇÃO DO SLIDER (SWIPER JS) ---

// Inicialização do carrossel Swiper
const swiper = new Swiper(".mySwiper", {
  loop: true, // Loop infinito
  autoplay: {
    delay: 3500, // Tempo de exibição de cada imagem em milissegundos
    disableOnInteraction: false, // Mantém o autoplay funcionando após interação
  },
  pagination: {
    el: ".swiper-pagination", // Elemento paginador
    clickable: true, // Permite clicar nos pontos de navegação
  },
  navigation: {
    nextEl: ".swiper-button-next", // Botão Próximo
    prevEl: ".swiper-button-prev", // Botão Anterior
  },
});

// --- 3. CONTROLE DO TEMA (DARK / LIGHT MODE) ---

const themeToggleBtn = document.getElementById('theme-toggle'); // Seleciona botão de alternância
const themeToggleIcon = document.getElementById('theme-toggle-icon'); // Seleciona ícone do botão
const htmlElement = document.documentElement; // Referência à tag <html>

// Evento de clique para mudar o tema
themeToggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark'); // Alterna a classe 'dark' no elemento raiz
  
  // Atualiza o ícone de acordo com o estado do tema
  if (htmlElement.classList.contains('dark')) {
    themeToggleIcon.classList.remove('fa-moon'); // Remove ícone de lua
    themeToggleIcon.classList.add('fa-sun'); // Adiciona ícone de sol
  } else {
    themeToggleIcon.classList.remove('fa-sun'); // Remove ícone de sol
    themeToggleIcon.classList.add('fa-moon'); // Adiciona ícone de lua
  }
});