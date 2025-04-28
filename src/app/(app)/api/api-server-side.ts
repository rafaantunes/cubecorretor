// app/(app)/api/apiServer.ts
import axios from 'axios';
import { cookies } from 'next/headers'; // Para pegar os cookies no Next.js

// Criação da instância do axios
const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token do cookie ao cabeçalho Authorization
apiServer.interceptors.request.use(
  async (config) => {
    // Pegando o token do cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiServer;
