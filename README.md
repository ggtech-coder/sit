# GG Tech — Site Institucional / Portfólio

Site institucional da GG Tech, com identidade visual própria (conceito "engenharia digital / blueprint técnico"), separado da estética dark/cyberpunk usada em outras peças da marca — pensado para transmitir solidez e atrair clientes de diversos nichos (clínicas, advocacia, empresas em geral).

## Antes de publicar — o que trocar

Tudo isso está centralizado em `config.js`, exceto onde indicado:

1. **WhatsApp**: `config.js` → `contato.whatsapp` (formato `55DDDNUMERO`, só dígitos) e `contato.whatsappDisplay`.
2. **E-mail**: `config.js` → `contato.email`.
3. **Instagram / LinkedIn**: `config.js` → `contato.instagram` / `contato.linkedin`.
4. **Formulário de contato**: crie uma conta grátis em [Formspree](https://formspree.io) (ou similar), pegue o endpoint e cole em `config.js` → `formulario.endpoint`.
5. **Mapa**: gere o embed real no Google Maps (Compartilhar → Incorporar mapa) e cole a URL em `config.js` → `mapa.embedSrc`.
6. **Depoimentos**: em `index.html`, seção `#depoimentos`, troque os textos ilustrativos pelos relatos reais dos seus clientes (com autorização deles).
7. **Portfólio**: seção `#portfolio` em `index.html` já reflete os projetos reais (clínica de estética, advocacia, odontologia). Se quiser, troque os swatches de cor por screenshots reais dos sites — basta substituir o bloco `.case-swatch` por uma `<img>`.
8. **Imagem Open Graph**: gere uma imagem 1200×630px (pode ser uma arte simples com a logo GG Tech) e salve como `assets/icons/og-image.png`. Atualize a referência em `config.js` e no `<head>` do `index.html` se mudar o nome do arquivo.
9. **Favicon**: `assets/icons/favicon.svg` já está pronto com a marca "GG" — troque se quiser uma versão mais elaborada.
10. **CNPJ**: `config.js` → `empresa.cnpj`, se quiser exibir em algum rodapé futuro.

## Publicando no GitHub Pages

1. Crie um repositório no GitHub (ex: `gg-tech-site`).
2. Suba todos os arquivos deste pacote para a raiz do repositório (ou para uma branch `main`).
3. Vá em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
4. Aguarde alguns minutos — o GitHub gera uma URL do tipo `https://seuusuario.github.io/gg-tech-site/`.

## Domínio próprio (Registro.br)

1. Registre `ggtech.com.br` (ou o domínio escolhido) em [registro.br](https://registro.br).
2. No painel do domínio, configure os DNS apontando para o GitHub Pages:
   - Registros tipo `A` apontando para os IPs do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - Ou um `CNAME` apontando para `seuusuario.github.io`, se usar subdomínio (`www`).
3. No repositório, crie um arquivo `CNAME` (sem extensão) na raiz, contendo apenas o domínio: `ggtech.com.br`.
4. Em **Settings → Pages**, ative **Enforce HTTPS** assim que o certificado for emitido (pode levar até 24h).

## Google Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console).
2. Adicione a propriedade com seu domínio.
3. Verifique a propriedade (método DNS ou upload de arquivo HTML, conforme instruções do próprio Search Console).
4. Envie o `sitemap.xml` (já incluso neste pacote) em **Sitemaps**.

## Estrutura de arquivos

```
index.html          → página principal
style.css            → estilos (design system completo)
script.js            → interações (menu, FAQ, formulário, scroll reveal)
config.js            → dados da empresa (edite aqui primeiro)
robots.txt           → diretivas para buscadores
sitemap.xml          → mapa do site para o Google
manifest.json        → metadados de PWA básico
assets/icons/        → favicon e ícones
```

## Páginas futuras

A estrutura já está preparada para receber, quando quiser expandir:
- `/sobre` — página institucional mais completa
- `/servicos` — detalhamento de cada serviço
- `/blog` — conteúdo de SEO/autoridade
- `/contato` — página de contato dedicada
- `/politica-de-privacidade` e `/termos-de-uso` — já referenciadas no rodapé, criar como páginas simples quando possível

## Observação sobre identidade visual

Este site usa uma linguagem visual própria (tons de tinta/azul-projeto + tipografia serifada editorial + marcas de registro estilo prancheta técnica) — **diferente** da estética dark/cyberpunk usada em outras peças da GG Tech. A ideia é que o site institucional/portfólio tenha apelo mais amplo e neutro, adequado para atrair clientes de nichos variados (clínicas, escritórios, empresas), reservando o visual cyberpunk para contextos onde ele já funciona bem (ex: identidade de produto tech/gamer).
