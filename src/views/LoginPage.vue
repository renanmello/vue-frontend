<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Usuário</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: "LoginPage",
    setup() {
      const username = ref('');
      const password = ref('');
      const error = ref(null);
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await axios.post('/api/login', {
            username: username.value,
            password: password.value,
          });
  
          localStorage.setItem('token', response.data.token);
          router.push('/dashboard'); // Redireciona para outra página após login
        } catch (err) {
          error.value = 'Usuário ou senha inválidos';
        }
      };
  
      return { username, password, login, error };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: auto;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: #0056b3;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  