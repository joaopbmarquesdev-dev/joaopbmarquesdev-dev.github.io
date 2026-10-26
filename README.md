# João Pedro de Barros Marques · Portfólio

Site pessoal de apresentação. Sou estudante de **Ciência da Computação (CEUB)** e **Estatística (UnB)** e busco estágio em **Ciência de Dados**.

**[Acesse o site →](https://joaopbmarquesdev-dev.github.io)**

![Prévia do site](preview.png)

## Sobre o site

O topo da página conta uma pequena história com dados. Enquanto você rola, 440 pontos saem de uma nuvem aleatória, formam um gráfico de dispersão com reta de regressão, se organizam numa distribuição normal e terminam numa regra de decisão. Os valores exibidos (correlação, coeficientes da reta e probabilidades) são calculados a partir dos próprios pontos simulados.

## Destaques

- Partículas em canvas que reagem ao mouse e se reorganizam em gráficos conforme o scroll
- Animações sincronizadas com a rolagem (GSAP ScrollTrigger) e scroll suave (Lenis)
- Cartas em 3D, carrossel de projetos em perspectiva e um globo 3D desenhado em canvas
- Versões em português e inglês
- Responsivo para celular, tablet e computador
- Acessível: respeita a opção "reduzir movimento", funciona pelo teclado e com leitores de tela
- Lista de repositórios carregada automaticamente pela API do GitHub

## Tecnologias

HTML, CSS e JavaScript puro, sem frameworks e sem etapa de build.

- [GSAP](https://gsap.com) + ScrollTrigger para as animações
- [Lenis](https://lenis.darkroom.engineering) para o scroll suave
- Canvas 2D para as partículas, os gráficos e o globo
- GitHub Pages para a hospedagem

## Estrutura

```
├── index.html     estrutura da página e textos em português
├── style.css      cores, tipografia, layout e responsividade
├── script.js      traduções, partículas, globo, animações e integração com o GitHub
├── preview.png    imagem de prévia para links compartilhados
├── sitemap.xml    mapa do site para buscadores
└── robots.txt     regras para buscadores
```

## Rodar localmente

```bash
git clone https://github.com/joaopbmarquesdev-dev/joaopbmarquesdev-dev.github.io.git
cd joaopbmarquesdev-dev.github.io
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. A extensão Live Server do VS Code também funciona.

## Contato

- **LinkedIn:** [João Pedro de Barros Marques](https://www.linkedin.com/in/jo%C3%A3o-pedro-de-barros-marques-70ab53438/)
- **E-mail:** joaopbmarques.dev@gmail.com
- **GitHub:** [joaopbmarquesdev-dev](https://github.com/joaopbmarquesdev-dev)

---

### English

Personal portfolio of João Pedro de Barros Marques, a Computer Science (CEUB) and Statistics (UnB) student looking for a Data Science internship. Built with plain HTML, CSS and JavaScript, with GSAP scroll animations and a canvas data story that turns random points into a regression, a normal distribution and a decision rule. **[Visit the site →](https://joaopbmarquesdev-dev.github.io)**
