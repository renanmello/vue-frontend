<template>
    <div class="container">
      <h1 class="title">Lista de Subestações</h1>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Editar</th>
            <th>Excluir</th>
            <th>Exibir no mapa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sub in subestacoes" :key="sub.id">
            <td>{{ sub.codigo }}</td>
            <td>{{ sub.nome }}</td>
            <td><button class="edit-btn">✏️</button></td>
            <td><button class="delete-btn">🗑️</button></td>
            <td><button class="map-btn">🌍</button></td>
          </tr>
        </tbody>
      </table>
  
      <!-- Botão de Incluir Subestação -->
      <button class="add-btn" @click="$router.push('/add-subestacao')">➕ Incluir Subestação</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'DashBoard',
    setup() {
      const subestacoes = ref([]);
  
      onMounted(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
             console.error('Token não encontrado!');
            return;
    }
            const response = await axios.get('api/subestacoes',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); // Altere para a URL correta do backend
            subestacoes.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar subestações:', error);
        }
      });

      const adicionarSubestacao = () => {
      console.log("Botão 'Incluir Subestação' clicado!");
      // Aqui você pode redirecionar para uma página de cadastro ou abrir um modal
    };
  
      return { subestacoes, adicionarSubestacao };
    },
  };
  </script>
  
  <style scoped>
  .container {
    width: 80%;
    margin: auto;
    text-align: center;
    position: relative;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .styled-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff; /* Fundo branco para melhor leitura */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .styled-table th, .styled-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .styled-table th {
    background-color: #007BFF;
    color: white;
  }
  
  .edit-btn, .delete-btn, .map-btn {
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  .edit-btn {
    background-color: #ffc107;
    color: #fff;
  }
  
  .delete-btn {
    background-color: #dc3545;
    color: #fff;
  }
  
  .map-btn {
    background-color: #28a745;
    color: #fff;
  }
  
  .edit-btn:hover {
    background-color: #e0a800;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  
  .map-btn:hover {
    background-color: #218838;
  }
  
  /* Estilização do botão de Incluir */
  .add-btn {
    position: absolute;
    bottom: -50px;
    right: 0;
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
  }
  
  .add-btn:hover {
    background-color: #0056b3;
  }
  </style>