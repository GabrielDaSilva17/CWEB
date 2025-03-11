// Importar as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7dD6l9ZypKZWRAnyNpUhjbL8TK9bKjLg",
  authDomain: "cweb-5a817.firebaseapp.com",
  projectId: "cweb-5a817",
  storageBucket: "cweb-5a817.firebasestorage.app",
  messagingSenderId: "397034574161",
  appId: "1:397034574161:web:27c910dfcbabc1d61f4370",
  measurementId: "G-EVK4WF04F5"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para verificar o estado de autenticação e redirecionar
export function checkAuthState() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    window.location.href = "home.html"; // Já está logado, redireciona para home
  }
}

// Função de login com verificação de e-mail
export function loginUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Verificar se o e-mail foi verificado
      if (user.emailVerified) {
        alert("Login bem-sucedido!");
        // Armazenando os dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          photoURL: user.photoURL || 'default-profile.jpg'
        }));
        // Redirecionar para a homepage
        window.location.href = "home.html";
      } else {
        alert("Por favor, verifique seu e-mail antes de fazer login.");
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Erro: " + errorMessage);
    });
}

// Função de registro com verificação de e-mail
export function registerUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Cadastro bem-sucedido!");
      
      // Enviar e-mail de verificação
      sendEmailVerification(user)
        .then(() => {
          alert("Um e-mail de verificação foi enviado para " + email);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Erro ao enviar e-mail de verificação: " + errorMessage);
        });
      
      // Redirecionar para a página de login
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Erro ao cadastrar: " + errorMessage);
    });
}

// Função de logout
export function logoutUser() {
  signOut(auth)
    .then(() => {
      // Remover o usuário do localStorage
      localStorage.removeItem('user');
      alert("Você foi desconectado com sucesso!");
      window.location.href = "index.html"; // Redireciona para a página de login após logout
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Erro: " + errorMessage);
    });
}

// Vinculando os eventos de clique aos botões de login e registro quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('.login-btn');
  const registerButton = document.querySelector('.register-btn');
  
  // Verificar se os botões existem antes de adicionar o evento
  if (loginButton) {
    loginButton.addEventListener('click', loginUser);
  } else {
    console.error('Botão de login não encontrado');
  }
  
  if (registerButton) {
    registerButton.addEventListener('click', registerUser);
  } else {
    console.error('Botão de registro não encontrado');
  }
});