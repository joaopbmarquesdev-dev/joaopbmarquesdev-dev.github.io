# Portfólio · João Pedro

Site pessoal feito só com HTML, CSS e JavaScript (+ GSAP para as animações de scroll e Lenis para o scroll suave).

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | Estrutura e textos em português |
| `style.css` | Cores, fontes e layout (as cores ficam no topo, em `:root`) |
| `script.js` | Textos em PT e EN (objeto `TEXTS`), partículas, globo 3D, animações e lista do GitHub |
| `preview.png` | Imagem que aparece quando o link é compartilhado (LinkedIn, WhatsApp) |
| `sitemap.xml` e `robots.txt` | Ajudam o Google a encontrar e ler o site |

## 1. Colocar o site no ar (GitHub Pages, grátis)

1. Entre no GitHub com a conta **joaopbmarquesdev-dev**.
2. Clique em **New repository** e dê o nome exato `joaopbmarquesdev-dev.github.io`. Deixe **Public** e crie.
3. Na página do repositório, clique em **uploading an existing file**, arraste todos os arquivos desta pasta e clique em **Commit changes**.
4. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e salve.
5. Em 1 a 2 minutos o site abre em **https://joaopbmarquesdev-dev.github.io**.

> Se usar outro nome de repositório, troque o endereço em `index.html` (tags `og:url`, `og:image`, `canonical` e o bloco `ld+json`), em `sitemap.xml` e em `robots.txt`.

## 2. Colocar o site no Google (Search Console)

1. Acesse **https://search.google.com/search-console** com sua conta Google.
2. Clique em **Adicionar propriedade** e escolha **Prefixo do URL** (a opção "Domínio" não funciona com github.io). Cole `https://joaopbmarquesdev-dev.github.io/`.
3. Verifique que o site é seu. Escolha uma das opções:
   - **Arquivo HTML (mais fácil):** baixe o arquivo `google....html` que o Google oferece, envie para o repositório como no passo 1.3 e clique em **Verificar**.
   - **Tag HTML:** copie a linha `<meta name="google-site-verification" ...>`, cole no `index.html` no lugar indicado (procure "Google Search Console"), envie o arquivo atualizado e clique em **Verificar**.
4. No menu **Sitemaps**, digite `sitemap.xml` e clique em **Enviar**.
5. No menu **Inspeção de URL**, cole o endereço do site e clique em **Solicitar indexação**.
6. O Google costuma levar de alguns dias a duas semanas para mostrar o site. Para conferir, pesquise `site:joaopbmarquesdev-dev.github.io` no Google.

### Para aparecer mais rápido

- Coloque o link do site no **LinkedIn** (seção "Destaques" e em "Informações de contato → Site").
- Coloque o link no campo **Website** do seu perfil do GitHub.
- Sempre que mudar algo importante, atualize a data em `sitemap.xml`.

## Personalizar

- **Foto:** coloque `foto.jpg` na pasta e troque `<span>JP</span>` dentro de `.avatar` por `<img src="foto.jpg" alt="João Pedro">`.
- **Currículo em PDF:** coloque `curriculo.pdf` na pasta e tire o comentário da linha indicada na seção de contato do `index.html`.
- **Novo projeto:** copie um `<article class="project">` no `index.html` e adicione os textos em PT e EN no `script.js`.
- **Contas do GitHub listadas:** edite `GITHUB_USERS` no começo do `script.js`.
- **Testar no computador:** abra a pasta no VS Code e use a extensão **Live Server** (botão "Go Live").
