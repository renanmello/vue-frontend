<template>
    <div class="container">
      <h1 class="title">Adicionar Subestação</h1>
  
      <!-- Formulário de Subestação -->
      <form @submit.prevent="adicionarSubestacao" class="form">
        <h2>Dados da Subestação</h2>
        <label>Código:</label>
        <input v-model="subestacao.codigo" required />
  
        <label>Nome:</label>
        <input v-model="subestacao.nome" required />
  
        <label>Latitude:</label>
        <input v-model="subestacao.latitude" type="number" required />
  
        <label>Longitude:</label>
        <input v-model="subestacao.longitude" type="number" required />
      </form>
  
      <!-- Formulário de Rede MT -->
      <form @submit.prevent="adicionarRedeMT" class="form">
        <h2>Adicionar Rede MT</h2>
        <label>Código:</label>
        <input v-model="rede.codigo" required />
  
        <label>Nome:</label>
        <input v-model="rede.nome" required />
  
        <label>Tensão Nominal:</label>
        <input v-model="rede.tensao" type="number" required />
  
        <button type="submit" class="add-btn">Adicionar Rede</button>
      </form>
  
      <!-- Tabela de Redes MT Adicionadas -->
      <table class="styled-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in subestacao.redesMT" :key="index">
            <td>{{ item.codigo }}</td>
            <td>{{ item.nome }}</td>
            <td>
              <button class="delete-btn" @click="removerRede(index)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Botões de Ação -->
      <div class="button-container">
        <button @click="cancelar" class="cancel-btn">Cancelar</button>
        <button @click="salvarSubestacao" class="save-btn">Incluir</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    // Estado da subestação
    const subestacao = ref({
      codigo: '',
      nome: '',
      latitude: '',
      longitude: '',
      redesMT: []
    });

    // Estado da rede MT temporária
    const rede = ref({
      codigo: '',
      nome: '',
      tensao: ''
    });

    // Adiciona a Rede MT à lista da subestação
    const adicionarRedeMT = () => {
      if (rede.value.codigo && rede.value.nome && rede.value.tensao) {
        subestacao.value.redesMT.push({ ...rede.value });
        rede.value = { codigo: '', nome: '', tensao: '' }; // Limpa os campos
      }
    };

    // Remove uma Rede MT da lista
    const removerRede = (index) => {
      subestacao.value.redesMT.splice(index, 1);
    };

    // Cancela e volta para a lista de subestações
    const cancelar = () => {
      router.push('/dashboard');
    };

    // Envia a Subestação e as Redes MT associadas
    const salvarSubestacao = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token não encontrado!');
          return;
        }

        // 1️⃣ Enviar a Subestação para o backend
        const response = await axios.post('api/subestacoes', subestacao.value, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const subestacaoId = response.data.id; // Obtém o ID retornado pelo backend

        // 2️⃣ Enviar cada Rede MT com o ID da Subestação
        for (const redeMT of subestacao.value.redesMT) {
          await axios.post('api/redesmt', { 
            ...redeMT, 
            subestacao: { id: subestacaoId } // Relaciona com a Subestação
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        alert('Subestação e Redes MT adicionadas com sucesso!');
        router.push('/dashboard');
      } catch (error) {
        console.error('Erro ao salvar a subestação:', error);
      }
    };

    return { subestacao, rede, adicionarRedeMT, removerRede, cancelar, salvarSubestacao };
  }
};
</script>

  
  <style scoped>
  .container {
    width: 50%;
    margin: auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .add-btn {
    background-color: #007BFF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .add-btn:hover {
    background-color: #0056b3;
  }
  
  .styled-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
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
  
  .delete-btn {
    background-color: #dc3545;
    color: white;
    padding: 6px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .cancel-btn {
    background-color: #6c757d;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .cancel-btn:hover {
    background-color: #5a6268;
  }
  
  .save-btn {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-btn:hover {
    background-color: #218838;
  }
  </style>
  