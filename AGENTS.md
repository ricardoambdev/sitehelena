# AGENTS.md — Colégio Helena (site institucional)

## Regras de trabalho

- **Sempre que alterar qualquer arquivo** (HTML, CSS, JS, imagens, etc.), ao final do trabalho você **deve fazer commit e push** para o GitHub.
- Repositório: `ricardoambdev/sitehelena` (branch `main`).
- Comando de push:
  ```
  git add .
  git commit -m "<descrição concisa das mudanças>"
  git push origin main
  ```
- O GitHub Pages é ativado no repositório e o site é publicado em: https://ricardoambdev.github.io/sitehelena/

## Stack / Estrutura

- Site estático multi-página (HTML5), Tailwind CSS via CDN (Play) + `css/style.css` para animações/comportamentos customizados.
- `js/main.js` contém todas as interações (menu mobile, dropdowns, accordeons, lightbox, carrossel, busca do regimento, WhatsApp chat, modais, etc.).
- Páginas compartilham o mesmo template (nav, footer, dock de acesso rápido, WhatsApp float, lightbox).
- Cores: brand `#FF6600`; fontes: Plus Jakarta Sans (display) + Inter (body).
- Contato: WhatsApp (19) 98950-2031 / contato@colegiohelena.com.br.

## Servidor local

Para servir localmente (acessível pela rede, ex.: celular na mesma rede):
```
python -m http.server 8000 --bind 0.0.0.0
```
Acessar pelo IP da máquina, ex.: http://192.168.x.x:8000