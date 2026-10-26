/* =========================================================
   Portfólio · João Pedro — script.js
   1. Textos em PT/EN
   2. Efeitos de texto (digitação e "decodificação")
   3. Partículas do hero (nuvem → dispersão → normal → decisão)
   4. Globo 3D dos objetivos
   5. Tela de carregamento, scroll suave e animações (GSAP)
   6. Lista de repositórios do GitHub
   7. Detalhes (cursor, inclinação 3D, copiar e-mail…)
   ========================================================= */

// Usuários do GitHub que aparecem na lista de repositórios
const GITHUB_USERS = [
  { user: "joaopbmarquesdev-dev", label: { pt: "projetos", en: "projects" } },
  { user: "joaobmarques-afk", label: { pt: "faculdade", en: "college" } },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
const hasLenis = typeof window.Lenis !== "undefined";
const animate = hasGSAP && !reduceMotion;

// Sempre abre no topo (a não ser que o link aponte para uma seção)
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!location.hash) window.scrollTo(0, 0);

// Cartões com inclinação 3D não inclinam enquanto estão entrando na tela
const entering = new WeakSet();
const guardTilt = (el, vars) => (el.hasAttribute("data-tilt")
  ? { ...vars, onStart: () => entering.add(el), onComplete: () => entering.delete(el) }
  : vars);

/* ---------------------------------------------------------
   1. TEXTOS EM PORTUGUÊS E INGLÊS
   Cada elemento com data-i18n="chave" recebe o texto daqui.
   --------------------------------------------------------- */
const TEXTS = {
  pt: {
    "skip": "Pular para o conteúdo",
    "nav.about": "Sobre",
    "nav.mind": "Como penso",
    "nav.app": "App",
    "nav.projects": "Projetos",
    "nav.goals": "Objetivos",
    "nav.contact": "Contato",
    "hero.hello": "Olá, eu sou",
    "hero.role": "Estudante de",
    "hero.cta1": "Ver projetos",
    "hero.cta2": "Fale comigo",
    "hero.hint": "Passe o mouse nos pontos",
    "hero.scroll": "role para baixo",
    "story.k1": "dados",
    "story.k2": "análise",
    "story.k3": "padrão",
    "story.k4": "decisão",
    "story.1": "Dados brutos parecem ruído…",
    "story.2": "…a análise revela como eles se relacionam…",
    "story.3": "…o padrão aparece…",
    "story.4": "…e vira uma decisão.",
    "readout.sim": "simulação",
    "readout.0": "ruído",
    "readout.1": "correlação",
    "readout.2": "distribuição normal",
    "readout.3": "decisão",
    "chart.x": "horas de estudo →",
    "chart.y": "↑ desempenho",
    "calc.reg": "Regressão linear",
    "calc.strong": "correlação forte",
    "calc.moderate": "correlação moderada",
    "calc.normal": "Distribuição normal",
    "calc.sigma": "68,3% dos dados ficam entre −σ e +σ",
    "calc.rule": "Regra de decisão",
    "calc.of": "de",
    "calc.above": "pontos acima do limite",
    "about.eyebrow": "[ sobre mim ]",
    "about.statement": "Sou movido pela curiosidade. Estudo Ciência da Computação no CEUB e Estatística na UnB ao mesmo tempo porque quero entender o código e a matemática por trás dos dados. Gosto de analisar, tirar conclusões e transformar números em decisões. Uso a IA como ferramenta, mas as ideias são minhas.",
    "about.name": "Nome",
    "about.from": "Local",
    "about.goal": "Objetivo",
    "about.goalValue": "Estágio em Ciência de Dados",
    "stats.1": "graduações em paralelo",
    "stats.2": "linguagens de programação",
    "stats.3": "grandes objetivos de vida",
    "mind.eyebrow": "[ como eu penso ]",
    "mind.title": "Curiosidade que vira decisão",
    "mind.lead": "Meu jeito de resolver problemas é um ciclo: perguntar, analisar, decidir e aprender de novo.",
    "mind.q1": "Por quê?",
    "mind.q2": "E se for diferente?",
    "mind.q3": "Como medir isso?",
    "mind.q4": "O que os dados dizem?",
    "mind.c1.title": "Sede de conhecimento",
    "mind.c1.text": "Quero entender o porquê das coisas. Por isso faço duas graduações ao mesmo tempo e estou sempre estudando algo novo, dentro e fora da faculdade.",
    "mind.c2.title": "Análise",
    "mind.c2.text": "Antes de opinar, olho os números. Organizo os dados, procuro relações entre as variáveis e testo se o que parece verdade se sustenta.",
    "mind.c3.title": "Tomada de decisão",
    "mind.c3.text": "Análise só vale quando vira ação. Gosto de transformar resultados em decisões claras, colocando prós, contras e riscos na mesa.",
    "mind.tree0": "dados",
    "app.eyebrow": "[ em desenvolvimento ]",
    "app.title": "Um app para contratar serviços no bairro",
    "app.lead": "Estou criando um aplicativo que conecta moradores a prestadores de serviço da vizinhança, como babás, passeadores de cães e diaristas. A ideia é testar primeiro no meu próprio bairro.",
    "app.f1.title": "Filtro por serviço",
    "app.f1.text": "O morador escolhe o tipo de serviço e vê quem atende perto dele.",
    "app.f2.title": "Perfil do prestador",
    "app.f2.text": "O prestador cria uma conta com os serviços que oferece e os horários disponíveis.",
    "app.f3.title": "Contato direto",
    "app.f3.text": "A conversa acontece por WhatsApp, e-mail ou telefone, sem intermediários.",
    "ph.hello": "Serviços perto de você",
    "ph.search": "Buscar no bairro…",
    "ph.c1": "Babá",
    "ph.c2": "Passeador",
    "ph.c3": "Diarista",
    "ph.p1": "Babá · seg a sex, 8h–18h",
    "ph.p2": "Babá · fins de semana",
    "ph.p3": "Babá · noites",
    "ph.call": "Ligar",
    "ph.note": "protótipo ilustrativo",
    "ph.aria": "Protótipo ilustrativo do app de serviços do bairro",
    "skills.eyebrow": "[ habilidades ]",
    "skills.title": "Minha caixa de ferramentas",
    "skills.g1": "Linguagens",
    "skills.g2": "Dados & análise",
    "skills.g3": "Frameworks & ferramentas",
    "skills.stats": "Estatística",
    "skills.prob": "Probabilidade",
    "edu.eyebrow": "[ formação ]",
    "edu.title": "Duas graduações, um caminho",
    "edu.ongoing": "Em andamento",
    "edu.cc": "Ciência da Computação",
    "edu.ccText": "Programação, estruturas de dados, engenharia de software, banco de dados e DevOps.",
    "edu.st": "Estatística",
    "edu.stText": "Cálculo, probabilidade e métodos estatísticos: a base matemática da Ciência de Dados.",
    "proj.eyebrow": "[ projetos ]",
    "proj.title": "Coisas que eu construí",
    "proj.p0.title": "App de serviços do bairro",
    "proj.p0.text": "Conecta moradores a babás, passeadores de cães e diaristas da vizinhança.",
    "proj.dev": "Em desenvolvimento · ver detalhes",
    "proj.p1.title": "Requisitos com clientes simulados por IA",
    "proj.p1.text": "Projeto em Python em que a IA faz o papel de clientes, para treinar a coleta de requisitos de software.",
    "proj.p2.title": "Análise de dados de condomínios",
    "proj.p2.text": "Trabalho da disciplina de Estatística na UnB: análise de dados de condomínios feita no Excel.",
    "proj.p3.title": "Todos os meus repositórios",
    "proj.p3.text": "Trabalhos da faculdade e projetos pessoais, direto do meu GitHub.",
    "proj.p3.cta": "Ver lista abaixo",
    "proj.p4.title": "Próximo projeto de dados",
    "proj.p4.text": "Estou desenvolvendo novos projetos de análise de dados. Volte em breve.",
    "proj.soon": "Em breve no GitHub",
    "pv.ai": "Cliente (IA)",
    "pv.me": "Analista",
    "pv.m1": "Preciso de um sistema para agendar consultas.",
    "pv.m2": "Quem vai usar o sistema no dia a dia?",
    "pv.mean": "média",
    "pv.illus": "ilustrativo",
    "tag.product": "Produto",
    "tag.community": "Comunidade",
    "tag.ai": "IA",
    "tag.req": "Requisitos",
    "tag.stats": "Estatística",
    "repos.title": "No GitHub",
    "repos.loading": "Carregando repositórios…",
    "repos.error": "Não deu para carregar a lista agora. Veja direto nos perfis abaixo.",
    "repos.empty": "Nenhum repositório público ainda. Veja os perfis abaixo.",
    "repos.noDesc": "Sem descrição",
    "repos.updated": "atualizado em",
    "goals.eyebrow": "[ objetivos ]",
    "goals.title": "Para onde eu vou",
    "goals.g1.title": "Virar cientista de dados",
    "goals.g1.text": "Começar com um estágio e crescer na área de dados e inteligência artificial.",
    "goals.g2.title": "Viajar o mundo",
    "goals.g2.text": "Conhecer outros países, culturas e jeitos de pensar. Cada lugar novo é uma aula.",
    "goals.g3.title": "Usar a tecnologia para ajudar o próximo",
    "goals.g3.text": "Criar soluções para problemas reais das pessoas, como o app que estou fazendo para o meu bairro.",
    "goals.g4.title": "Adquirir conhecimento sempre",
    "goals.g4.text": "Aprender todos os dias, na faculdade e fora dela. A curiosidade é o que me move.",
    "contact.eyebrow": "[ contato ]",
    "contact.big1": "Vamos",
    "contact.big2": "conversar?",
    "contact.text": "Estou procurando estágio em Ciência de Dados. Se quiser trocar uma ideia, me chame por aqui:",
    "contact.copy": "Copiar",
    "contact.copied": "Copiado!",
    "contact.selected": "Selecionado: Ctrl+C",
    "footer.made": "Feito com HTML, CSS e JavaScript",
    "footer.top": "Voltar ao topo ↑",
    "edu.now": "Neste semestre",
    "edu.n1": "Cálculo 2",
    "edu.n2": "Métodos Estatísticos",
    "edu.n3": "Gestão de Projetos",
    typed: ["Ciência de Dados", "Estatística", "Ciência da Computação", "Inteligência Artificial", "Análise de Dados"],
  },
  en: {
    "skip": "Skip to content",
    "nav.about": "About",
    "nav.mind": "How I think",
    "nav.app": "App",
    "nav.projects": "Projects",
    "nav.goals": "Goals",
    "nav.contact": "Contact",
    "hero.hello": "Hi, I'm",
    "hero.role": "Studying",
    "hero.cta1": "See projects",
    "hero.cta2": "Get in touch",
    "hero.hint": "Hover over the dots",
    "hero.scroll": "scroll down",
    "story.k1": "data",
    "story.k2": "analysis",
    "story.k3": "pattern",
    "story.k4": "decision",
    "story.1": "Raw data looks like noise…",
    "story.2": "…analysis shows how it relates…",
    "story.3": "…a pattern shows up…",
    "story.4": "…and becomes a decision.",
    "readout.sim": "simulation",
    "readout.0": "noise",
    "readout.1": "correlation",
    "readout.2": "normal distribution",
    "readout.3": "decision",
    "chart.x": "study hours →",
    "chart.y": "↑ performance",
    "calc.reg": "Linear regression",
    "calc.strong": "strong correlation",
    "calc.moderate": "moderate correlation",
    "calc.normal": "Normal distribution",
    "calc.sigma": "68.3% of the data falls between −σ and +σ",
    "calc.rule": "Decision rule",
    "calc.of": "of",
    "calc.above": "points above the threshold",
    "about.eyebrow": "[ about me ]",
    "about.statement": "Curiosity drives me. I study Computer Science at CEUB and Statistics at UnB at the same time because I want to understand both the code and the math behind data. I like to analyze, draw conclusions and turn numbers into decisions. I use AI as a tool, but the ideas are my own.",
    "about.name": "Name",
    "about.from": "Based in",
    "about.goal": "Goal",
    "about.goalValue": "Data Science internship",
    "stats.1": "degrees in parallel",
    "stats.2": "programming languages",
    "stats.3": "big life goals",
    "mind.eyebrow": "[ how I think ]",
    "mind.title": "Curiosity that turns into decisions",
    "mind.lead": "My way of solving problems is a cycle: ask, analyze, decide and learn again.",
    "mind.q1": "Why?",
    "mind.q2": "What if it's different?",
    "mind.q3": "How do we measure it?",
    "mind.q4": "What does the data say?",
    "mind.c1.title": "Thirst for knowledge",
    "mind.c1.text": "I want to understand why things work. That's why I'm taking two degrees at once and always learning something new, in and out of college.",
    "mind.c2.title": "Analysis",
    "mind.c2.text": "Before giving an opinion, I look at the numbers. I organize the data, look for relationships between variables and test whether what seems true holds up.",
    "mind.c3.title": "Decision making",
    "mind.c3.text": "Analysis only matters when it leads to action. I like turning results into clear decisions, with pros, cons and risks on the table.",
    "mind.tree0": "data",
    "app.eyebrow": "[ in development ]",
    "app.title": "An app to hire local services",
    "app.lead": "I'm building an app that connects residents with service providers in the neighborhood, like babysitters, dog walkers and house cleaners. The plan is to test it first in my own neighborhood.",
    "app.f1.title": "Filter by service",
    "app.f1.text": "Residents pick the type of service and see who works nearby.",
    "app.f2.title": "Provider profile",
    "app.f2.text": "Providers create an account with the services they offer and their available hours.",
    "app.f3.title": "Direct contact",
    "app.f3.text": "People talk through WhatsApp, email or phone, with no middleman.",
    "ph.hello": "Services near you",
    "ph.search": "Search the neighborhood…",
    "ph.c1": "Babysitter",
    "ph.c2": "Dog walker",
    "ph.c3": "Cleaner",
    "ph.p1": "Babysitter · Mon–Fri, 8am–6pm",
    "ph.p2": "Babysitter · weekends",
    "ph.p3": "Babysitter · nights",
    "ph.call": "Call",
    "ph.note": "illustrative prototype",
    "ph.aria": "Illustrative prototype of the neighborhood services app",
    "skills.eyebrow": "[ skills ]",
    "skills.title": "My toolbox",
    "skills.g1": "Languages",
    "skills.g2": "Data & analysis",
    "skills.g3": "Frameworks & tools",
    "skills.stats": "Statistics",
    "skills.prob": "Probability",
    "edu.eyebrow": "[ education ]",
    "edu.title": "Two degrees, one path",
    "edu.ongoing": "In progress",
    "edu.cc": "Computer Science",
    "edu.ccText": "Programming, data structures, software engineering, databases and DevOps.",
    "edu.st": "Statistics",
    "edu.stText": "Calculus, probability and statistical methods: the math behind Data Science.",
    "proj.eyebrow": "[ projects ]",
    "proj.title": "Things I've built",
    "proj.p0.title": "Neighborhood services app",
    "proj.p0.text": "Connects residents with local babysitters, dog walkers and house cleaners.",
    "proj.dev": "In development · see details",
    "proj.p1.title": "Requirements with AI-simulated clients",
    "proj.p1.text": "A Python project where AI plays the client, to practice gathering software requirements.",
    "proj.p2.title": "Condominium data analysis",
    "proj.p2.text": "Statistics course project at UnB: analysis of condominium data built in Excel.",
    "proj.p3.title": "All my repositories",
    "proj.p3.text": "College assignments and personal projects, straight from my GitHub.",
    "proj.p3.cta": "See the list below",
    "proj.p4.title": "Next data project",
    "proj.p4.text": "I'm working on new data analysis projects. Check back soon.",
    "proj.soon": "Coming soon to GitHub",
    "pv.ai": "Client (AI)",
    "pv.me": "Analyst",
    "pv.m1": "I need a system to schedule appointments.",
    "pv.m2": "Who will use the system day to day?",
    "pv.mean": "mean",
    "pv.illus": "illustrative",
    "tag.product": "Product",
    "tag.community": "Community",
    "tag.ai": "AI",
    "tag.req": "Requirements",
    "tag.stats": "Statistics",
    "repos.title": "On GitHub",
    "repos.loading": "Loading repositories…",
    "repos.error": "Couldn't load the list right now. See the profiles below.",
    "repos.empty": "No public repositories yet. See the profiles below.",
    "repos.noDesc": "No description",
    "repos.updated": "updated",
    "goals.eyebrow": "[ goals ]",
    "goals.title": "Where I'm going",
    "goals.g1.title": "Become a data scientist",
    "goals.g1.text": "Start with an internship and grow in data and artificial intelligence.",
    "goals.g2.title": "Travel the world",
    "goals.g2.text": "Get to know other countries, cultures and ways of thinking. Every new place is a lesson.",
    "goals.g3.title": "Use technology to help others",
    "goals.g3.text": "Build solutions for people's real problems, like the app I'm making for my neighborhood.",
    "goals.g4.title": "Keep learning, always",
    "goals.g4.text": "Learn something every day, in college and beyond. Curiosity is what drives me.",
    "contact.eyebrow": "[ contact ]",
    "contact.big1": "Let's",
    "contact.big2": "talk?",
    "contact.text": "I'm looking for a Data Science internship. If you'd like to chat, reach me here:",
    "contact.copy": "Copy",
    "contact.copied": "Copied!",
    "contact.selected": "Selected: Ctrl+C",
    "footer.made": "Built with HTML, CSS and JavaScript",
    "footer.top": "Back to top ↑",
    "edu.now": "This semester",
    "edu.n1": "Calculus 2",
    "edu.n2": "Statistical Methods",
    "edu.n3": "Project Management",
    typed: ["Data Science", "Statistics", "Computer Science", "Artificial Intelligence", "Data Analysis"],
  },
};

let lang = "pt";
try {
  const saved = localStorage.getItem("lang");
  if (saved === "pt" || saved === "en") lang = saved;
} catch (e) { /* sem localStorage: fica em português */ }

const t = (key) => TEXTS[lang][key] ?? TEXTS.pt[key] ?? key;
const decimal = (v, digits = 1) => v.toFixed(digits).replace(".", lang === "pt" ? "," : ".");

/* ---------------------------------------------------------
   2. EFEITOS DE TEXTO
   --------------------------------------------------------- */

// 2a. "Decodificação": letras aleatórias que viram o texto certo
const GLYPHS = "01σμΣxyz#%&<>/+=?";
const scrambles = new Map();

function scramble(el, duration = 900) {
  if (reduceMotion) return;
  cancelScramble(el);
  const final = el.textContent;
  const start = performance.now();
  const state = { final, raf: 0 };
  const labelled = el.hasAttribute("aria-label") || el.getAttribute("aria-hidden") === "true";
  if (!labelled) el.setAttribute("aria-label", final);   // leitores de tela ouvem o texto certo
  const step = (now) => {
    const k = Math.min(1, (now - start) / duration);
    const revealed = Math.floor(k * k * final.length + k * 2);
    let out = "";
    for (let i = 0; i < final.length; i++) {
      const ch = final[i];
      out += i < revealed || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (k < 1) state.raf = requestAnimationFrame(step);
    else { el.textContent = final; scrambles.delete(el); if (!labelled) el.removeAttribute("aria-label"); }
  };
  state.raf = requestAnimationFrame(step);
  scrambles.set(el, state);
}

function cancelScramble(el) {
  const s = scrambles.get(el);
  if (!s) return;
  cancelAnimationFrame(s.raf);
  el.textContent = s.final;
  el.removeAttribute("aria-label");
  scrambles.delete(el);
}

// 2b. Digitação no hero
const typedEl = document.querySelector(".typed");
let typingTimer = null;

function startTyping() {
  clearTimeout(typingTimer);
  const words = t("typed");
  if (reduceMotion) { typedEl.textContent = words[0]; return; }

  let wordIndex = 0, charIndex = 0, deleting = false;
  function tick() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, charIndex);
    let delay = deleting ? 40 : 85;
    if (!deleting && charIndex === word.length) { delay = 1900; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 350; }
    typingTimer = setTimeout(tick, delay);
  }
  tick();
}

/* ---------------------------------------------------------
   Utilidades matemáticas
   --------------------------------------------------------- */
function mulberry32(seed) {   // aleatório com semente: o desenho sai igual em toda visita
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(2026);
const gauss = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
const lerp = (a, b, k) => a + (b - a) * k;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (e0, e1, x) => { const k = clamp01((x - e0) / (e1 - e0)); return k * k * (3 - 2 * k); };
const pdf = (z) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);

// Inversa da normal padrão (algoritmo de Acklam): dá o z de cada quantil
function probit(p) {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const lo = 0.02425;
  let q, r;
  if (p < lo) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= 1 - lo) {
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

/* ---------------------------------------------------------
   3. PARTÍCULAS DO HERO
   Cada ponto tem destinos: uma nuvem (ruído), um gráfico de
   dispersão e um histograma que forma a curva normal. O scroll
   decide onde ele está. O mouse empurra os pontos, que voltam
   ao lugar como se estivessem presos por molas.
   --------------------------------------------------------- */
const canvas = document.querySelector(".hero__canvas");
const ctx = canvas.getContext("2d");
const hero = document.querySelector(".hero");

let heroProgress = 0;          // 0 → 1, controlado pelo scroll
let heroVisible = true;
let heroDirty = true;          // com movimento reduzido, só redesenha quando algo muda
let W = 0, H = 0, DPR = 1;
let particles = [];
const chart = {};
const stats = { r: 0, slope: 0, intercept: 0, above: 0 };
const pointer = { x: -9999, y: -9999, active: false };

const BIN = 0.25;                      // largura de cada coluna do histograma (em z)
const BINS = Math.round(6 / BIN);      // de -3 a +3
const THRESHOLD = 1;                   // limite de decisão: z > 1
const isSmall = () => window.innerWidth < 641;
// Celular ou tablet em pé: gráfico em cima, textos embaixo
const PORTRAIT_QUERY = "(max-width: 640px), (max-width: 1020px) and (orientation: portrait)";
const isPortrait = () => window.matchMedia(PORTRAIT_QUERY).matches;
const N = Math.min(screen.width, screen.height) < 641 ? 230 : 440;   // menos pontos em celulares
const COLORS = ["#4a7dff", "#8a5cff", "#6fd6ff", "#a98bff", "#5d6bff"];

function createParticles() {
  particles = [];
  for (let i = 0; i < N; i++) {
    const u = rand();
    const yN = Math.min(0.97, Math.max(0.03, 0.1 + 0.74 * u + gauss() * 0.09));
    particles.push({
      cx: rand(), cy: rand(),                 // nuvem (0–1 da tela)
      u, yN,                                  // dispersão (0–1 do gráfico)
      size: 1.2 + rand() * 1.6,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      phase: rand() * Math.PI * 2,
      speed: 0.35 + rand() * 0.7,
      delay: rand(),                          // cada ponto sai num momento: transição mais orgânica
      ox: 0, oy: 0, vx: 0, vy: 0,             // deslocamento e velocidade da "mola"
    });
  }

  // Ordena pelo x da dispersão e dá a cada ponto um quantil da normal:
  // assim cada ponto anda pouco de um gráfico para o outro.
  const sorted = [...particles].sort((p, q) => p.u - q.u);
  const counts = new Array(BINS).fill(0);
  sorted.forEach((p, i) => {
    const z = probit((i + 0.5) / N);
    p.bin = Math.min(BINS - 1, Math.max(0, Math.floor((z + 3) / BIN)));
    p.stack = counts[p.bin]++;
    p.zc = -3 + (p.bin + 0.5) * BIN;          // centro da coluna
  });
  chart.maxCount = Math.max(...counts);
  stats.above = particles.filter((p) => p.zc > THRESHOLD).length;

  // Regressão linear e correlação de Pearson dos pontos (valores de verdade)
  const mx = particles.reduce((s, p) => s + p.u, 0) / N;
  const my = particles.reduce((s, p) => s + p.yN, 0) / N;
  let sxy = 0, sxx = 0, syy = 0;
  particles.forEach((p) => {
    sxy += (p.u - mx) * (p.yN - my);
    sxx += (p.u - mx) ** 2;
    syy += (p.yN - my) ** 2;
  });
  stats.slope = sxy / sxx;
  stats.intercept = my - stats.slope * mx;
  stats.r = sxy / Math.sqrt(sxx * syy);
}

function layout() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = canvas.clientWidth;
  H = canvas.clientHeight;
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  // Onde o gráfico fica: à direita no computador, em cima no celular
  if (isSmall()) {
    chart.l = W * 0.1; chart.r = W * 0.92; chart.t = H * 0.21; chart.b = H * 0.43;
  } else if (isPortrait()) {
    chart.l = W * 0.1; chart.r = W * 0.9; chart.t = H * 0.24; chart.b = H * 0.5;
  } else {
    chart.l = W * 0.5; chart.r = W * 0.93; chart.t = H * 0.22; chart.b = H * 0.76;
  }
  chart.w = chart.r - chart.l;
  chart.h = chart.b - chart.t;
  chart.binPx = chart.w / BINS;
  heroDirty = true;
  // No computador a curva ocupa 74% da altura: sobra espaço em cima para o painel de cálculos
  const fill = isPortrait() ? 0.92 : 0.74;
  chart.spacing = Math.min((chart.h * fill) / chart.maxCount, chart.binPx * 0.92);

  particles.forEach((p) => {
    p.sx = chart.l + p.u * chart.w;
    p.sy = chart.b - p.yN * chart.h;
    p.nx = chart.l + (p.bin + 0.5) * chart.binPx;
    p.ny = chart.b - (p.stack + 0.5) * chart.spacing;
  });
}

// Converte o avanço geral (0–1) num avanço próprio de cada ponto
const stagger = (k, delay) => smooth(0, 1, k * 1.35 - delay * 0.35);
const zToX = (z) => chart.l + ((z + 3) / 6) * chart.w;

let lastTime = 0;
let mutedColor = "#9093b8";
const near = [];

function draw(time) {
  const dt = Math.min(50, time - lastTime || 16.7) / 16.7;   // 1 = um quadro a 60 fps
  lastTime = time;
  const sec = time / 1000;
  const p = heroProgress;

  const a = smooth(0.24, 0.42, p);   // nuvem → dispersão
  const lineK = smooth(0.4, 0.5, p) * (1 - smooth(0.52, 0.58, p));
  const b = smooth(0.54, 0.68, p);   // dispersão → normal
  const c = smooth(0.74, 0.86, p);   // normal → decisão

  ctx.clearRect(0, 0, W, H);
  ctx.font = "11px 'JetBrains Mono', ui-monospace, monospace";

  /* --- Grade e eixos --- */
  const gridA = a * (1 - b);
  if (gridA > 0.01) {
    ctx.strokeStyle = "rgba(150,160,255,0.08)";
    ctx.lineWidth = 1;
    ctx.globalAlpha = gridA;
    for (let i = 0; i <= 4; i++) {
      const y = chart.t + (chart.h * i) / 4;
      ctx.beginPath(); ctx.moveTo(chart.l, y); ctx.lineTo(chart.r, y); ctx.stroke();
    }
    ctx.fillStyle = mutedColor;
    ctx.textAlign = "left";
    ctx.fillText(t("chart.y"), chart.l - 10, chart.t - 14);
    ctx.textAlign = "right";
    ctx.fillText(t("chart.x"), chart.r, chart.b + 30);
  }
  ctx.strokeStyle = mutedColor;
  ctx.globalAlpha = Math.max(a, b) * 0.4;
  ctx.beginPath(); ctx.moveTo(chart.l - 10, chart.b + 8); ctx.lineTo(chart.r, chart.b + 8); ctx.stroke();
  ctx.globalAlpha = gridA * 0.4;
  ctx.beginPath(); ctx.moveTo(chart.l - 10, chart.t); ctx.lineTo(chart.l - 10, chart.b + 8); ctx.stroke();

  /* --- Área de ±1σ e região de decisão (atrás dos pontos) --- */
  const scale = N * BIN * chart.spacing;     // altura esperada de cada coluna
  const curveY = (z) => chart.b - pdf(z) * scale;
  if (b > 0.01) {
    const sigmaA = smooth(0.64, 0.72, p) * (1 - c * 0.7);
    if (sigmaA > 0) {
      const g = ctx.createLinearGradient(0, chart.t, 0, chart.b);
      g.addColorStop(0, "rgba(138,92,255,0.35)");
      g.addColorStop(1, "rgba(74,125,255,0.05)");
      ctx.globalAlpha = sigmaA;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(zToX(-1), chart.b);
      for (let z = -1; z <= 1.0001; z += 0.05) ctx.lineTo(zToX(z), curveY(z));
      ctx.lineTo(zToX(1), chart.b);
      ctx.closePath();
      ctx.fill();
    }
    if (c > 0.01) {
      ctx.globalAlpha = c;
      ctx.fillStyle = "rgba(111,214,255,0.10)";
      ctx.fillRect(zToX(THRESHOLD), chart.t - 10, chart.r - zToX(THRESHOLD), chart.h + 18);
    }
  }

  /* --- Pontos --- */
  const strength = lerp(1, 0.5, a);
  const R = isSmall() ? 90 : 150;
  near.length = 0;

  for (const pt of particles) {
    const drift = 1 - a * 0.92;
    let x = pt.cx * W + Math.sin(sec * pt.speed + pt.phase) * 24 * drift;
    let y = pt.cy * H + Math.cos(sec * pt.speed * 0.8 + pt.phase) * 24 * drift;
    const ka = stagger(a, pt.delay);
    const kb = stagger(b, pt.delay);
    x = lerp(lerp(x, pt.sx, ka), pt.nx, kb);
    y = lerp(lerp(y, pt.sy, ka), pt.ny, kb);

    // Física: o mouse empurra, a mola puxa de volta, o atrito acalma
    if (pointer.active) {
      const dx = x + pt.ox - pointer.x;
      const dy = y + pt.oy - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < R && dist > 0.01) {
        const f = (1 - dist / R) ** 2 * 2.4 * strength * dt;
        pt.vx += (dx / dist) * f;
        pt.vy += (dy / dist) * f;
      }
    }
    pt.vx += -pt.ox * 0.04 * dt;
    pt.vy += -pt.oy * 0.04 * dt;
    const damp = Math.pow(0.86, dt);
    pt.vx *= damp; pt.vy *= damp;
    pt.ox += pt.vx * dt; pt.oy += pt.vy * dt;

    const px = x + pt.ox, py = y + pt.oy;

    // Na fase de decisão os pontos acima do limite acendem
    const hot = pt.zc > THRESHOLD ? c : 0;
    const alpha = pt.zc > THRESHOLD ? 0.95 : lerp(0.95, 0.28, c);
    const size = pt.size * (1 + hot * 0.5);
    const color = hot > 0.5 ? "#6fd6ff" : pt.color;

    ctx.fillStyle = color;
    ctx.globalAlpha = alpha * 0.18;
    ctx.beginPath(); ctx.arc(px, py, size * 2.7, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fill();

    if (pointer.active) {
      const d = Math.hypot(px - pointer.x, py - pointer.y);
      if (d < R) near.push({ x: px, y: py, d });
    }
  }

  /* --- Constelação: linhas entre o mouse e os pontos perto dele --- */
  if (near.length) {
    near.sort((m, n) => m.d - n.d);
    const list = near.slice(0, 26);
    ctx.lineWidth = 1;
    for (let i = 0; i < list.length; i++) {
      const m = list[i];
      ctx.globalAlpha = (1 - m.d / R) * 0.55;
      ctx.strokeStyle = "#8fb1ff";
      ctx.beginPath(); ctx.moveTo(pointer.x, pointer.y); ctx.lineTo(m.x, m.y); ctx.stroke();
      for (let j = i + 1; j < list.length; j++) {
        const n = list[j];
        const dd = Math.hypot(m.x - n.x, m.y - n.y);
        if (dd < 60) {
          ctx.globalAlpha = (1 - dd / 60) * 0.35;
          ctx.strokeStyle = "#8a5cff";
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(n.x, n.y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "#6fd6ff";
    ctx.beginPath(); ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2); ctx.fill();
  }

  /* --- Reta de regressão --- */
  if (lineK > 0.001) {
    const x1 = lineK;
    const yAt = (u) => chart.b - (stats.intercept + stats.slope * u) * chart.h;
    ctx.globalAlpha = 0.95;
    ctx.strokeStyle = "#6fd6ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#6fd6ff";
    ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.moveTo(chart.l, yAt(0)); ctx.lineTo(chart.l + x1 * chart.w, yAt(x1)); ctx.stroke();
    ctx.shadowBlur = 0;
  }

  /* --- Curva normal e marcas de σ --- */
  if (b > 0.01) {
    const zEnd = -3 + 6 * smooth(0.6, 0.72, p);
    const grad = ctx.createLinearGradient(chart.l, 0, chart.r, 0);
    grad.addColorStop(0, "#4a7dff");
    grad.addColorStop(0.5, "#6fd6ff");
    grad.addColorStop(1, "#8a5cff");
    ctx.globalAlpha = b;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#6fd6ff";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    for (let z = -3; z <= zEnd; z += 0.04) {
      z === -3 ? ctx.moveTo(zToX(z), curveY(z)) : ctx.lineTo(zToX(z), curveY(z));
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.globalAlpha = smooth(0.66, 0.72, p) * 0.9;
    ctx.fillStyle = "#b8bbdf";
    ctx.font = "12px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textAlign = "center";
    ["−3σ", "−2σ", "−σ", "μ", "+σ", "+2σ", "+3σ"].forEach((label, i) => {
      ctx.fillText(label, chart.l + (i / 6) * chart.w, chart.b + 28);
    });
  }

  /* --- Limite de decisão --- */
  if (c > 0.01) {
    const xT = zToX(THRESHOLD);
    ctx.globalAlpha = c;
    ctx.strokeStyle = "#6fd6ff";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(xT, chart.b + 8); ctx.lineTo(xT, chart.b + 8 - (chart.h + 18) * c); ctx.stroke();
    ctx.setLineDash([]);
    // Etiqueta curta no topo da linha de corte
    const tag = "z = 1";
    ctx.font = "600 12px 'JetBrains Mono', ui-monospace, monospace";
    const tw = ctx.measureText(tag).width + 16;
    const tagY = isPortrait() ? chart.t - 6 : chart.t - 23;   // no celular fica longe da etiqueta do topo
    roundRect(xT - tw / 2, tagY - 11, tw, 22, 11);
    ctx.fillStyle = "rgba(10,10,26,0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(111,214,255,0.6)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#6fd6ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(tag, xT, tagY);
    ctx.textBaseline = "alphabetic";
  }

  drawCalcPanel(p);
  ctx.globalAlpha = 1;
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Painel com os cálculos de cada etapa: título, fórmula e explicação.
// No computador fica no canto superior esquerdo do gráfico (área vazia);
// no celular fica logo abaixo do gráfico.
function drawCalcPanel(p) {
  const strength = stats.r >= 0.7 ? t("calc.strong") : t("calc.moderate");
  const panels = [
    { a: smooth(0.44, 0.5, p) * (1 - smooth(0.53, 0.57, p)), title: t("calc.reg"),
      main: `ŷ = ${decimal(stats.intercept, 2)} + ${decimal(stats.slope, 2)}·x`, note: `r = ${decimal(stats.r, 2)} · ${strength}` },
    { a: smooth(0.64, 0.7, p) * (1 - smooth(0.74, 0.78, p)), title: t("calc.normal"),
      main: "μ = 0   σ = 1", note: t("calc.sigma") },
    { a: smooth(0.79, 0.85, p), title: t("calc.rule"),
      main: `z > 1  →  P ≈ ${decimal(15.87, 1)}%`, note: `${stats.above} ${t("calc.of")} ${N} ${t("calc.above")}` },
  ];
  const portrait = isPortrait();
  const fTitle = "600 11px 'JetBrains Mono', ui-monospace, monospace";
  const fMain = "600 16px 'JetBrains Mono', ui-monospace, monospace";
  const fNote = "13px 'DM Sans', system-ui, sans-serif";

  for (const pn of panels) {
    if (pn.a < 0.01) continue;
    const title = pn.title.toUpperCase();
    ctx.font = fTitle; ctx.letterSpacing = "1.5px";
    const wTitle = ctx.measureText(title).width + 14;
    ctx.letterSpacing = "0px";
    ctx.font = fMain; const wMain = ctx.measureText(pn.main).width;
    ctx.font = fNote; const wNote = ctx.measureText(pn.note).width;
    const w = Math.min(chart.w, Math.ceil(Math.max(wTitle, wMain, wNote)) + 36);
    const h = 92;
    const x = portrait ? chart.l : chart.l + 12;
    const y = (portrait ? chart.b + 48 : chart.t + 12) + (1 - pn.a) * 12;

    ctx.globalAlpha = pn.a;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 24;
    roundRect(x, y, w, h, 14);
    ctx.fillStyle = "rgba(10,10,26,0.88)";
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(150,160,255,0.28)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#6fd6ff";
    ctx.beginPath(); ctx.arc(x + 20, y + 22, 3, 0, Math.PI * 2); ctx.fill();
    ctx.font = fTitle; ctx.letterSpacing = "1.5px";
    ctx.fillText(title, x + 31, y + 22);
    ctx.letterSpacing = "0px";
    ctx.fillStyle = "#f4f4ff";
    ctx.font = fMain;
    ctx.fillText(pn.main, x + 18, y + 49);
    ctx.fillStyle = "#b8bbdf";
    ctx.font = fNote;
    ctx.fillText(pn.note, x + 18, y + 73);
    ctx.textBaseline = "alphabetic";
  }
  ctx.globalAlpha = 1;
}

function loop(time) {
  if (heroVisible && (!reduceMotion || heroDirty)) {
    draw(reduceMotion ? 16 : time);
    heroDirty = false;
  }
  requestAnimationFrame(loop);
}

// Etiqueta do canto: mostra em que "fase" o gráfico está
const readoutText = document.querySelector(".readout__text");
let readoutStage = -1;
function updateReadout(force) {
  const p = heroProgress;
  const stage = p < 0.34 ? 0 : p < 0.56 ? 1 : p < 0.74 ? 2 : 3;
  if (stage === readoutStage && !force) return;
  readoutStage = stage;
  const detail = [
    "",
    ` · r = ${decimal(stats.r, 2)}`,
    " · μ = 0 · σ = 1",
    " · z > 1",
  ][stage];
  const extra = isSmall() ? "" : detail;   // no celular os detalhes ficam no painel
  readoutText.innerHTML = `${t("readout.sim")} · n = ${N} · <span class="readout__state">${t("readout." + stage)}</span>${extra}`;
}

createParticles();
layout();
// O GSAP ajusta a largura do hero preso um pouco depois do "resize" da janela.
// O ResizeObserver avisa quando o canvas muda de tamanho de verdade, então o
// desenho e a posição do mouse sempre ficam alinhados.
new ResizeObserver(layout).observe(canvas);

function setPointer(e) {
  if (reduceMotion) return;
  const rect = canvas.getBoundingClientRect();
  pointer.x = e.clientX - rect.left;
  pointer.y = e.clientY - rect.top;
  pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
}
window.addEventListener("pointermove", setPointer, { passive: true });
window.addEventListener("pointerdown", setPointer, { passive: true });
document.documentElement.addEventListener("pointerleave", () => { pointer.active = false; });
window.addEventListener("blur", () => { pointer.active = false; });
new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; }).observe(hero);

if (reduceMotion) heroProgress = 0.5;   // mostra o gráfico de dispersão parado
requestAnimationFrame(loop);

/* ---------------------------------------------------------
   4. GLOBO 3D DOS OBJETIVOS
   Pontos numa esfera, girados e projetados no canvas. As linhas
   saem de Brasília para outros lugares do mundo.
   --------------------------------------------------------- */
const globeCanvas = document.querySelector(".globe");
const gctx = globeCanvas.getContext("2d");
const deg = Math.PI / 180;
const BSB = { lat: -15.8, lon: -47.9, code: "BSB" };
const PLACES = [   // destinos no lado do globo voltado para Brasília
  { lat: 38.7, lon: -9.1, code: "LIS" },
  { lat: 41.9, lon: 12.5, code: "ROM" },
  { lat: 40.7, lon: -74.0, code: "NYC" },
  { lat: -33.9, lon: 18.4, code: "CPT" },
  { lat: -33.4, lon: -70.6, code: "SCL" },
  { lat: 19.4, lon: -99.1, code: "MEX" },
];
const toVec = ({ lat, lon }) => [Math.cos(lat * deg) * Math.sin(lon * deg), Math.sin(lat * deg), Math.cos(lat * deg) * Math.cos(lon * deg)];

const globeDots = [];
(function makeGlobe() {
  const total = 1100;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < total; i++) {
    const y = 1 - (i / (total - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    globeDots.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
})();

let globeVisible = false;
let arcK = reduceMotion ? 1 : 0;   // rotas desenhando: começa quando o globo aparece
let globeProgress = 0;          // avanço do scroll na seção de objetivos
let globeHover = 0, globeHoverTarget = 0;
let GW = 0, GDPR = 1;
let globeDirty = true;

function globeLayout() {
  GDPR = Math.min(window.devicePixelRatio || 1, 2);
  GW = globeCanvas.clientWidth;
  globeCanvas.width = Math.round(GW * GDPR);
  globeCanvas.height = Math.round(GW * GDPR);
  gctx.setTransform(GDPR, 0, 0, GDPR, 0, 0);
  globeDirty = true;
}

function slerp(a, b, k) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-4) return a;
  const s1 = Math.sin((1 - k) * om) / Math.sin(om);
  const s2 = Math.sin(k * om) / Math.sin(om);
  return [a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2];
}

function drawGlobe(time) {
  const R = GW * 0.4;
  const cx = GW / 2, cy = GW / 2;
  globeHover += (globeHoverTarget - globeHover) * 0.05;
  // Brasília fica sempre à vista: o globo balança em volta dela
  const sway = reduceMotion ? 0 : Math.sin(time * 0.00025) * 0.3;
  const rot = BSB.lon * deg + 0.3 + sway + (globeProgress - 0.5) * 0.6 + globeHover;
  const tilt = -0.22;
  const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);

  // gira em Y (rot) e inclina em X (tilt)
  const project = (v) => {
    const x = v[0] * cr - v[2] * sr;
    const z1 = v[0] * sr + v[2] * cr;
    const y = v[1] * ct - z1 * st;
    const z = v[1] * st + z1 * ct;
    return [cx + x * R, cy - y * R, z];
  };

  gctx.clearRect(0, 0, GW, GW);

  // brilho atmosférico
  const glow = gctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
  glow.addColorStop(0, "rgba(74,125,255,0.25)");
  glow.addColorStop(1, "rgba(74,125,255,0)");
  gctx.fillStyle = glow;
  gctx.beginPath(); gctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2); gctx.fill();

  const body = gctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
  body.addColorStop(0, "#1a1640");
  body.addColorStop(1, "#07071a");
  gctx.fillStyle = body;
  gctx.beginPath(); gctx.arc(cx, cy, R, 0, Math.PI * 2); gctx.fill();

  // pontos da esfera
  for (const v of globeDots) {
    const [x, y, z] = project(v);
    if (z < -0.05) continue;
    gctx.globalAlpha = 0.25 + z * 0.75;
    gctx.fillStyle = z > 0.55 ? "#a9c0ff" : "#6a78ff";
    const s = 1.4 + z * 1.2;
    gctx.fillRect(x - s / 2, y - s / 2, s, s);
  }

  // linhas de latitude e longitude
  gctx.lineWidth = 1;
  gctx.strokeStyle = "#5d6bff";
  const graticule = (pointAt) => {
    let prev = null;
    for (let k = 0; k <= 72; k++) {
      const pnt = project(pointAt(k / 72));
      if (prev && pnt[2] > 0 && prev[2] > 0) {
        gctx.globalAlpha = pnt[2] * 0.22;
        gctx.beginPath(); gctx.moveTo(prev[0], prev[1]); gctx.lineTo(pnt[0], pnt[1]); gctx.stroke();
      }
      prev = pnt;
    }
  };
  for (let lat = -60; lat <= 60; lat += 30) graticule((f) => toVec({ lat, lon: f * 360 - 180 }));
  for (let lon = -180; lon < 180; lon += 30) graticule((f) => toVec({ lat: f * 180 - 90, lon }));

  // rotas saindo de Brasília (desenham conforme o scroll)
  const from = toVec(BSB);
  PLACES.forEach((place, i) => {
    const k = clamp01(arcK * 1.6 - i * 0.12);
    if (k <= 0) return;
    const to = toVec(place);
    gctx.lineWidth = 1.5;
    let prev = null;
    const steps = 48;
    for (let s = 0; s <= steps * k; s++) {
      const f = s / steps;
      const v = slerp(from, to, f);
      const lift = 1 + Math.sin(Math.PI * f) * 0.22;
      const pnt = project([v[0] * lift, v[1] * lift, v[2] * lift]);
      if (prev && pnt[2] > -0.15 && prev[2] > -0.15) {
        gctx.globalAlpha = 0.35 + Math.max(0, pnt[2]) * 0.6;
        gctx.strokeStyle = i % 2 ? "#8a5cff" : "#6fd6ff";
        gctx.beginPath(); gctx.moveTo(prev[0], prev[1]); gctx.lineTo(pnt[0], pnt[1]); gctx.stroke();
      }
      prev = pnt;
    }
    if (k >= 1) {
      const [x, y, z] = project(to);
      if (z > 0) {
        gctx.globalAlpha = z;
        gctx.fillStyle = "#e9e9f7";
        gctx.beginPath(); gctx.arc(x, y, 3, 0, Math.PI * 2); gctx.fill();
        gctx.font = "10px 'JetBrains Mono', monospace";
        gctx.fillStyle = "#9093b8";
        gctx.fillText(place.code, x + 6, y - 6);
      }
    }
  });

  // Brasília pulsando
  const [bx, by, bz] = project(from);
  if (bz > 0) {
    const pulse = (time / 1400) % 1;
    gctx.globalAlpha = (1 - pulse) * bz;
    gctx.strokeStyle = "#6fd6ff";
    gctx.lineWidth = 1.5;
    gctx.beginPath(); gctx.arc(bx, by, 4 + pulse * 18, 0, Math.PI * 2); gctx.stroke();
    gctx.globalAlpha = bz;
    gctx.fillStyle = "#6fd6ff";
    gctx.beginPath(); gctx.arc(bx, by, 4, 0, Math.PI * 2); gctx.fill();
    gctx.font = "600 11px 'JetBrains Mono', monospace";
    gctx.fillStyle = "#e9e9f7";
    gctx.fillText("BSB", bx + 9, by + 4);
  }
  gctx.globalAlpha = 1;
}

function globeLoop(time) {
  if (globeVisible && (!reduceMotion || globeDirty)) {
    drawGlobe(reduceMotion ? 0 : time);
    globeDirty = false;
  }
  requestAnimationFrame(globeLoop);
}

globeLayout();
new ResizeObserver(globeLayout).observe(globeCanvas);
globeCanvas.addEventListener("pointermove", (e) => {
  const r = globeCanvas.getBoundingClientRect();
  globeHoverTarget = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
});
globeCanvas.addEventListener("pointerleave", () => { globeHoverTarget = 0; });
new IntersectionObserver(([entry]) => {
  globeVisible = entry.isIntersecting;
  if (globeVisible && arcK === 0) {
    if (animate) gsap.to({ v: 0 }, { v: 1, duration: 3.2, delay: 0.4, ease: "power1.inOut", onUpdate() { arcK = this.targets()[0].v; } });
    else arcK = 1;
  }
}, { threshold: 0.35 }).observe(globeCanvas);
if (reduceMotion) globeProgress = 0.6;
requestAnimationFrame(globeLoop);

/* ---------------------------------------------------------
   Visuais gerados: mapa de calor e grade do GitHub
   --------------------------------------------------------- */
const heatRand = mulberry32(7);
const HEAT = (() => {
  const n = 6, m = [];
  for (let i = 0; i < n; i++) { m[i] = []; for (let j = 0; j < n; j++) m[i][j] = i === j ? 1 : null; }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const v = Math.round((heatRand() * 1.7 - 0.8) * 10) / 10;
    m[i][j] = m[j][i] = v;
  }
  return m;
})();

function buildHeatmap() {
  const el = document.querySelector(".mv-heatmap");
  let html = '<span class="hm-label"></span>';
  for (let j = 0; j < 6; j++) html += `<span class="hm-label">x${j + 1}</span>`;
  HEAT.forEach((row, i) => {
    html += `<span class="hm-label">x${i + 1}</span>`;
    row.forEach((v) => {
      const bg = v >= 0 ? `rgba(138,92,255,${0.12 + v * 0.8})` : `rgba(111,214,255,${0.12 + -v * 0.75})`;
      html += `<span class="hm-cell" style="background:${bg}">${decimal(v, 1)}</span>`;
    });
  });
  el.innerHTML = html;
}

(function buildGitGrid() {
  const el = document.querySelector(".pv-git");
  const r = mulberry32(42);
  let html = "";
  for (let i = 0; i < 140; i++) {
    const v = r();
    const level = v < 0.35 ? 0 : v < 0.6 ? 1 : v < 0.8 ? 2 : v < 0.94 ? 3 : 4;
    html += `<i data-l="${level}"></i>`;
  }
  el.innerHTML = html;
})();

/* ---------------------------------------------------------
   Troca de idioma
   --------------------------------------------------------- */
function applyLanguage(newLang) {
  lang = newLang;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    cancelScramble(el);
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nLabel));
  });

  document.querySelectorAll(".lang__btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  try { localStorage.setItem("lang", lang); } catch (e) { /* ignora */ }

  startTyping();
  updateReadout(true);
  buildHeatmap();
  renderRepos();
  if (animate) {
    setupWordReveal();
    ScrollTrigger.refresh();
  }
}

document.querySelectorAll(".lang__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang !== lang) applyLanguage(btn.dataset.lang);
  });
});

/* ---------------------------------------------------------
   5. CARREGAMENTO, SCROLL SUAVE E ANIMAÇÕES
   --------------------------------------------------------- */
let lenis = null;
let wordTween = null;

// Texto do "Sobre" acendendo palavra por palavra
function setupWordReveal() {
  const el = document.querySelector(".about__statement");
  if (wordTween) { wordTween.scrollTrigger?.kill(); wordTween.kill(); }
  el.innerHTML = el.textContent.split(" ").map((w) => `<span class="word">${w} </span>`).join("");
  wordTween = gsap.fromTo(el.querySelectorAll(".word"),
    { opacity: 0.1, y: 6 },
    {
      opacity: 1, y: 0, stagger: 0.08, ease: "none",
      scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 1 },
    });
}

function heroIntro() {
  document.querySelectorAll(".hero__line").forEach((el, i) => setTimeout(() => scramble(el, 1100), i * 140));
  if (!animate) return;
  gsap.from(".hero__line", { yPercent: 100, opacity: 0, rotateX: -60, transformPerspective: 800, transformOrigin: "50% 100%", duration: 1.3, stagger: 0.14, ease: "expo.out" });
  gsap.from([".hero .eyebrow", ".hero__role", ".hero__actions", ".hero__hint", ".hero__readout", ".cross"], {
    y: 24, opacity: 0, duration: 1.1, stagger: 0.07, ease: "power3.out", delay: 0.35,
  });
}

function runLoader() {
  const loader = document.querySelector(".loader");
  if (!animate) { loader.remove(); heroIntro(); return; }

  // A abertura completa aparece só na primeira visita da sessão
  let seen = false;
  try { seen = sessionStorage.getItem("introSeen") === "1"; sessionStorage.setItem("introSeen", "1"); } catch (e) { /* sem storage: mostra sempre */ }
  if (seen) {
    loader.style.animation = "none";
    gsap.to(loader, { opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => loader.remove() });
    heroIntro();
    return;
  }

  loader.style.animation = "none";
  lenis?.stop();
  const num = loader.querySelector(".loader__num");
  const counter = { v: 0 };
  gsap.timeline()
    .to(counter, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => { num.textContent = Math.round(counter.v); } }, 0)
    .to(".loader__bar span", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
    .to([".loader__logo", ".loader__bar", ".loader__count"], { y: -24, opacity: 0, duration: 0.45, stagger: 0.05, ease: "power2.in" })
    .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" })
    .add(() => { lenis?.start(); heroIntro(); }, "-=0.55")
    .add(() => loader.remove());
}

function setupScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Scroll suave (Lenis) sincronizado com o GSAP
  if (hasLenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Barra de progresso no topo
  gsap.to(".progress__bar", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  const mm = gsap.matchMedia();

  // HERO PRESO: enquanto você rola, as partículas viram gráficos
  mm.add({ portrait: PORTRAIT_QUERY, any: "all" }, (context) => {
    gsap.set(".story", { yPercent: context.conditions.portrait ? -100 : -50 });
  });

  const heroTl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=320%",
      pin: true,
      scrub: 1,
      refreshPriority: 3,   // presos de cima para baixo calculam primeiro
      onUpdate: (self) => { heroProgress = self.progress; updateReadout(); },
    },
  });

  const storyIn = { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.05 };
  const storyFrom = { y: 40, opacity: 0, filter: "blur(10px)" };
  const storyOut = { y: -40, opacity: 0, filter: "blur(10px)", duration: 0.04 };
  heroTl
    .to(".hero__copy", { y: -90, opacity: 0, filter: "blur(8px)", duration: 0.09 }, 0.03)
    .to(".scroll-cue", { opacity: 0, duration: 0.04 }, 0.01)
    .fromTo(".story--1", storyFrom, storyIn, 0.1)
    .to(".story--1", storyOut, 0.24)
    .fromTo(".story--2", storyFrom, storyIn, 0.36)
    .to(".story--2", storyOut, 0.52)
    .fromTo(".story--3", storyFrom, storyIn, 0.6)
    .to(".story--3", storyOut, 0.7)
    .fromTo(".story--4", storyFrom, storyIn, 0.78)
    .to({}, { duration: 0.17 }, 0.83);

  // Menu: fundo de vidro depois que sai do topo + link ativo
  const nav = document.querySelector(".nav");
  ScrollTrigger.create({ start: 40, end: "max", onToggle: (self) => nav.classList.toggle("is-scrolled", self.isActive) });
  document.querySelectorAll(".nav__links a").forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    ScrollTrigger.create({
      trigger: section, start: "top 50%", end: "bottom 50%",
      onToggle: (self) => link.classList.toggle("is-active", self.isActive),
    });
  });

  // Elementos que sobem com profundidade
  gsap.utils.toArray(".reveal").forEach((el) => {
    const tilt = el.hasAttribute("data-tilt");
    gsap.from(el, guardTilt(el, {
      y: 60, opacity: 0, rotateX: tilt ? 0 : 14, transformPerspective: 900, transformOrigin: "50% 100%",
      duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    }));
  });

  // Títulos que "decodificam" ao aparecer
  gsap.utils.toArray(".title[data-scramble]").forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1.1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", onEnter: () => scramble(el, 1000) },
    });
  });

  setupWordReveal();

  // Números que contam
  gsap.utils.toArray(".stat__num").forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = "0";
    gsap.to(obj, {
      v: target, duration: 1.8, ease: "power3.out",
      onUpdate: () => { el.textContent = Math.round(obj.v); },
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // COMO EU PENSO: cartas 3D presas na tela (só em telas grandes)
  mm.add("(min-width: 901px)", () => {
    const section = document.querySelector(".mind");
    section.classList.add("mind--3d");
    const cards = gsap.utils.toArray(".mind-card");
    const current = document.querySelector(".mind__current");
    gsap.set(cards, { transformOrigin: "50% 100%" });
    gsap.set(cards.slice(1), { opacity: 0, y: 180, z: -420, rotateX: -38 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: "top top", end: "+=240%", pin: ".mind__pin", scrub: 1, refreshPriority: 2,
        onUpdate: (self) => { const time = self.progress * tl.duration(); current.textContent = time < 1.2 ? "01" : time < 2.7 ? "02" : "03"; },
      },
    });
    cards.forEach((card, i) => {
      if (i === 0) return;
      const at = (i - 1) * 1.5 + 0.6;
      tl.to(cards[i - 1], { y: -150, z: -260, rotateX: 45, duration: 1, ease: "power2.in" }, at)
        .to(cards[i - 1], { opacity: 0, duration: 0.45, ease: "power1.in" }, at + 0.3)
        .to(card, { y: 0, z: 0, rotateX: 0, duration: 1, ease: "power3.out" }, at + 0.45)
        .to(card, { opacity: 1, duration: 0.5, ease: "power1.out" }, at + 0.6);
    });
    tl.fromTo(".tree-line", { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 3.0)
      .from(".tree-leaf", { scale: 0, transformOrigin: "50% 50%", stagger: 0.1, duration: 0.3 }, 3.5)
      .to({}, { duration: 0.6 });

    return () => section.classList.remove("mind--3d");
  });
  mm.add("(max-width: 900px)", () => {
    gsap.utils.toArray(".mind-card").forEach((card) => {
      gsap.from(card, {
        y: 80, opacity: 0, rotateX: -25, transformPerspective: 900, transformOrigin: "50% 100%",
        duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });
  });

  // Perguntas da primeira carta "pulando" quando a seção aparece
  gsap.from(".mv-questions span", {
    scale: 0, opacity: 0, stagger: 0.1, duration: 0.7, ease: "back.out(2)",
    scrollTrigger: { trigger: ".mind", start: "top 65%" },
  });

  // APP: celular gira em 3D enquanto passa pela tela
  gsap.fromTo(".phone",
    { rotateY: -40, rotateX: 16, y: 70 },
    { rotateY: 20, rotateX: -6, y: -50, ease: "none", scrollTrigger: { trigger: ".app", start: "top bottom", end: "bottom top", scrub: 1.2 } });
  gsap.from(".phone__screen > *", {
    y: 24, opacity: 0, stagger: 0.07, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".phone", start: "top 75%" },
  });

  // Faixas de habilidades andando em direções opostas e girando em 3D
  gsap.fromTo(".marquee__row--1", { xPercent: 0, rotateX: 25 }, {
    xPercent: -30, rotateX: -15, ease: "none",
    scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  gsap.fromTo(".marquee__row--2", { xPercent: -30, rotateX: -25 }, {
    xPercent: 0, rotateX: 15, ease: "none",
    scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 },
  });

  // Chips de habilidades "pulando" em sequência
  gsap.utils.toArray(".skill-group").forEach((group) => {
    gsap.from(group.querySelectorAll(".chips li"), {
      scale: 0.4, opacity: 0, duration: 0.6, stagger: 0.04, ease: "back.out(2.2)",
      scrollTrigger: { trigger: group, start: "top 82%" },
    });
  });

  // Linha do tempo que se desenha
  gsap.fromTo(".timeline__fill", { scaleY: 0 }, {
    scaleY: 1, ease: "none",
    scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: 1 },
  });
  gsap.utils.toArray(".tl-item").forEach((item) => {
    const body = item.querySelector(".tl-item__body");
    gsap.from(body, guardTilt(body, {
      x: 80, opacity: 0, rotateY: -25, transformPerspective: 1000, transformOrigin: "0% 50%", duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: item, start: "top 82%" },
    }));
    gsap.from(item.querySelector(".tl-item__dot"), {
      scale: 0, duration: 0.7, ease: "back.out(3)",
      scrollTrigger: { trigger: item, start: "top 82%" },
    });
  });

  // PROJETOS: carrossel 3D que anda na horizontal (computador)
  mm.add("(min-width: 641px)", () => {
    const wrap = document.querySelector(".hscroll");
    const track = document.querySelector(".hscroll__track");
    const cards = gsap.utils.toArray(".project");
    wrap.classList.add("is-pinned");
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    // Cada carta gira de acordo com a distância até o centro da tela
    let onScreen = true;
    ScrollTrigger.create({ trigger: ".projects", start: "top bottom", end: "bottom top", onToggle: (self) => { onScreen = self.isActive; } });
    const coverflow = (force) => {
      if (!onScreen && force !== true) return;
      const x = gsap.getProperty(track, "x");
      const center = window.innerWidth / 2;
      cards.forEach((card) => {
        const c = card.offsetLeft + card.offsetWidth / 2 + x;
        const d = Math.max(-1.2, Math.min(1.2, (c - center) / window.innerWidth));
        gsap.set(card, { rotateY: d * -30, z: -Math.abs(d) * 220, opacity: 1 - Math.min(0.55, Math.abs(d) * 0.5) });
      });
    };

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".projects__pin",
        start: "top top",
        end: () => "+=" + (distance() + window.innerHeight * 0.4),
        pin: true,
        scrub: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onRefresh: () => coverflow(true),
      },
    });
    gsap.ticker.add(coverflow);   // acompanha o scrub quadro a quadro
    coverflow(true);

    gsap.from(track, {
      y: 120, opacity: 0, rotateX: 18, transformPerspective: 1200, duration: 1.3, ease: "expo.out",
      scrollTrigger: { trigger: ".projects__pin", start: "top 80%" },
    });

    return () => { wrap.classList.remove("is-pinned"); gsap.ticker.remove(coverflow); gsap.set(cards, { clearProps: "transform,opacity" }); };
  });
  mm.add("(max-width: 640px)", () => {
    gsap.utils.toArray(".project").forEach((card) => {
      gsap.from(card, {
        y: 70, opacity: 0, rotateX: -20, transformPerspective: 900, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  });

  // Barras do gráfico de condomínios crescendo
  gsap.from(".pv-bar-g rect", {
    scaleY: 0, duration: 1, stagger: 0.08, ease: "expo.out",
    scrollTrigger: { trigger: ".projects__pin", start: "top 60%" },
  });

  // OBJETIVOS: globo gira com o scroll e as cartas entram em 3D
  ScrollTrigger.create({
    trigger: ".goals", start: "top bottom", end: "bottom top",
    onUpdate: (self) => { globeProgress = self.progress; },
  });
  gsap.from(".globe", {
    scale: 0.6, opacity: 0, rotate: -20, duration: 1.6, ease: "expo.out",
    scrollTrigger: { trigger: ".goals", start: "top 75%" },
  });
  gsap.utils.toArray(".goal").forEach((goal) => {
    gsap.from(goal, guardTilt(goal, {
      x: 90, z: -150, rotateY: -30, opacity: 0, transformPerspective: 1000, transformOrigin: "0% 50%",
      duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: goal, start: "top 88%" },
    }));
  });

  // "Vamos conversar?" levantando em 3D
  gsap.from(".contact__big > span", {
    yPercent: 70, rotateX: -80, opacity: 0, transformOrigin: "50% 100%", stagger: 0.15, ease: "power3.out",
    scrollTrigger: { trigger: ".contact__big", start: "top 92%", end: "top 50%", scrub: 1 },
  });
}

if (animate) {
  setupScrollAnimations();
} else if (!hasGSAP) {
  // Sem GSAP (internet bloqueou o CDN): usa o scroll normal para animar o gráfico
  window.addEventListener("scroll", () => {
    heroProgress = clamp01(window.scrollY / hero.offsetHeight);
    updateReadout();
  }, { passive: true });
}

/* ---------------------------------------------------------
   6. REPOSITÓRIOS DO GITHUB
   Busca pela API pública do GitHub (no navegador de quem visita).
   --------------------------------------------------------- */
const reposEl = document.querySelector(".repos");
let repos = null;          // null = carregando, [] = vazio/erro
let reposFailed = false;

async function loadRepos() {
  const results = await Promise.allSettled(
    GITHUB_USERS.map(async ({ user, label }) => {
      const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      return data.filter((r) => !r.fork).map((r) => ({ ...r, _label: label }));
    })
  );
  const ok = results.filter((r) => r.status === "fulfilled");
  reposFailed = ok.length === 0;
  repos = ok.flatMap((r) => r.value).sort((x, y) => new Date(y.pushed_at) - new Date(x.pushed_at));
  renderRepos();
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderRepos() {
  if (repos === null) {
    reposEl.innerHTML = `<p class="repos__msg">${t("repos.loading")}</p>`;
    return;
  }
  if (repos.length === 0) {
    reposEl.innerHTML = `<p class="repos__msg">${t(reposFailed ? "repos.error" : "repos.empty")}</p>`;
  } else {
    const fmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric" });
    reposEl.innerHTML = repos.map((r) => `
      <a class="repo" href="${escapeHTML(r.html_url)}" target="_blank" rel="noopener">
        <span class="repo__name">${escapeHTML(r.name)}</span>
        <span class="repo__desc">${escapeHTML(r.description || t("repos.noDesc"))}</span>
        <span class="repo__meta">
          ${r.language ? `<span class="repo__lang">${escapeHTML(r.language)}</span>` : ""}
          <span class="repo__badge">${escapeHTML(r._label[lang])}</span>
          <span>${t("repos.updated")} ${fmt.format(new Date(r.pushed_at))}</span>
        </span>
      </a>`).join("");

    if (animate) {
      ScrollTrigger.batch(reposEl.querySelectorAll(".repo"), {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.from(batch, { y: 50, opacity: 0, rotateX: -20, transformPerspective: 800, duration: 0.9, stagger: 0.08, ease: "expo.out" }),
      });
    }
  }
  // A altura da página mudou: recalcula as posições das animações
  if (animate) ScrollTrigger.refresh();
}

loadRepos();

/* ---------------------------------------------------------
   7. DETALHES
   --------------------------------------------------------- */

// Links internos rolam suavemente
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: reduceMotion ? "auto" : "smooth" });
  });
});

// Copiar e-mail
const copyBtn = document.getElementById("copy-email");
const emailEl = document.getElementById("email-addr");
copyBtn.addEventListener("click", () => {
  const done = () => {
    copyBtn.textContent = t("contact.copied");
    setTimeout(() => { copyBtn.textContent = t("contact.copy"); }, 1800);
  };
  const selectText = () => {
    const range = document.createRange();
    range.selectNodeContents(emailEl);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    copyBtn.textContent = t("contact.selected");
    setTimeout(() => { copyBtn.textContent = t("contact.copy"); }, 2200);
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(emailEl.textContent.trim()).then(done, selectText);
  else selectText();
});

// Cursor personalizado e inclinação 3D dos cartões
if (finePointer && animate) {
  const cursor = document.querySelector(".cursor");
  const ring = cursor.querySelector(".cursor__ring");
  const dot = cursor.querySelector(".cursor__dot");
  const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
  const dotX = gsap.quickTo(dot, "x", { duration: 0.08 });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.08 });
  window.addEventListener("pointermove", (e) => {
    cursor.classList.add("is-visible");
    ringX(e.clientX); ringY(e.clientY); dotX(e.clientX); dotY(e.clientY);
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));
  document.addEventListener("pointerover", (e) => {
    cursor.classList.toggle("is-hover", !!e.target.closest("a, button, [data-tilt], .project, .globe"));
  });

  // Botões "magnéticos": seguem o mouse de leve
  document.querySelectorAll(".btn").forEach((el) => {
    const mx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const my = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.3);
      my((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener("pointerleave", () => { mx(0); my(0); });
  });

  document.querySelectorAll("[data-tilt]").forEach((el) => {
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      if (entering.has(el)) return;
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
    });
    el.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Aplica o idioma salvo (ou português) e abre a página
applyLanguage(lang);
runLoader();
