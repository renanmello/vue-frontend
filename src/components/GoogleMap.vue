<template>
    <div id="map">
      <GMapMap
        :center="center"
        :zoom="15"
        map-type-id="roadmap"
        style="width: 100%; height: 400px"
      >
        <GMapMarker :position="center" />
      </GMapMap>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { GMapMap, GMapMarker } from '@fawmi/vue-google-maps'
  
  export default {
    components: {
      GMapMap,
      GMapMarker,
    },
    setup() {
      const center = ref({ lat: -23.5505, lng: -46.6333 }) // Coordenadas de São Paulo
      return { center }
    }
  }
  </script>
  