import api from "./api";

export async function cadastrarUsuario(usuarioData){
    const response = await api.post("/usuario", usuarioData);
    return response.data;
}

export async function loginUsuario(loginData){
    const response = await api.post("/usuario/login", loginData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
}