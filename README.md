# sinapsisfrontend
📌 Project: Substation and MV Network Registration System

This repository contains a web application for registering and viewing substations, using a Google Maps map to display geographic location. The project consists of a front-end developed with Vue 3 and a back-end developed with Java and Spring Boot.

🚀 Technologies Used

Front-end

Vue.js 3 (Composition API)

Vue Router (Route Management)

Vue Google Maps (Geolocation Display)

Axios (Backend API Consumption)

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
