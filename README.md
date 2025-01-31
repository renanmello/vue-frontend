# sinapsisfrontend
#📌 Projeto: Sistema de Cadastro de Subestações e Redes MT

Este repositório contém uma aplicação web para cadastro e visualização de subestações, utilizando um mapa do Google Maps para exibição de localização geográfica. O projeto é composto por um front-end desenvolvido com Vue 3 e um back-end desenvolvido com Java e Spring Boot.

🚀 Tecnologias Utilizadas

Front-end

Vue.js 3 (Composition API)

Vue Router (Gerenciamento de rotas)

Vue Google Maps (Exibição de localização geográfica)

Axios (Consumo da API do back-end)

Tailwind CSS (Estilização da interface)

## Project setup
```
npm install
```

### Configure your API key from Google maps at the file main.js
```
app.use(VueGoogleMaps, {
  load: {
    key: "YOUR_API_KEY_FROM_GOOGLE_MAPS",
  },
});
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Project Runs on port:3000
```
http://localhost:3000
```
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
