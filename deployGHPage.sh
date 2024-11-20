#!/bin/bash
vue-tsc && vite build --base=/Swapi-vue/
printf 'pagina de Swapi gallery\n' > dist/README.md
git add -f dist/
git commit -m "$1"
git subtree push --prefix dist origin gh-pages
