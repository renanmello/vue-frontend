<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const id = route.params.id; // Obtendo ID da URL
const subestacao = ref(null);
const center = ref({ lat: 0, lng: 0 }); // Inicialize com valores padrão
const isMapLoaded = ref(false); // Controle se o mapa foi carregado

// Tente carregar o Google Maps
let GMapMap, GMapMarker;
try {
  const { useGmapApi } = await import('@fawmi/vue-google-maps');
  const { isLoaded } = useGmapApi({
    key: 'AIzaSyDqWVqic-RPzXkZvTJMiJJKBvuVJzAIUQs', // Substitua pela sua chave do Google Maps
    libraries: ['places'], // Adicione outras bibliotecas, se necessário
  });
  isMapLoaded.value = isLoaded;
  ({ GMapMap, GMapMarker } = await import('@fawmi/vue-google-maps'));
} catch (error) {
  console.error('Erro ao carregar o Google Maps:', error);
  isMapLoaded.value = false;
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/subestacoes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    subestacao.value = response.data;

    // Atualize o centro do mapa com as coordenadas da subestação
    if (subestacao.value && subestacao.value.latitude && subestacao.value.longitude) {
      center.value = {
        lat: parseFloat(subestacao.value.latitude),
        lng: parseFloat(subestacao.value.longitude),
      };
    }
  } catch (error) {
    console.error('Erro ao buscar subestação:', error);
  }
});

const voltarDashboard = () => {
  router.push('/dashboard');
};
</script>

<template>
  <div class="container">
    <button @click="voltarDashboard" class="botao-voltar">⬅ Voltar ao Dashboard</button>

    <h2>Detalhes da Subestação</h2>

    <table v-if="subestacao" class="tabela-detalhes">
      <tr><th>Código</th><td>{{ subestacao.codigo }}</td></tr>
      <tr><th>Nome</th><td>{{ subestacao.nome }}</td></tr>
      <tr><th>Latitude</th><td>{{ subestacao.latitude }}</td></tr>
      <tr><th>Longitude</th><td>{{ subestacao.longitude }}</td></tr>
    </table>

    <h3>Localização no Mapa</h3>
    <div v-if="isMapLoaded && subestacao" class="mapa">
      <component :is="GMapMap"
        :center="center"
        :zoom="14"
        map-type-id="roadmap"
        style="width: 100%; height: 400px"
      >
        <component :is="GMapMarker" :position="center" />
      </component>
    </div>
    <div v-else-if="!isMapLoaded">Erro ao carregar o mapa. Verifique a conexão ou a chave da API.</div>
    <div v-else>Dados da subestação não carregados.</div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.tabela-detalhes {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
.tabela-detalhes th, .tabela-detalhes td {
  border: 1px solid #ddd;
  padding: 10px;
}
.botao-voltar {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
.botao-voltar:hover {
  background-color: #0056b3;
}
</style>