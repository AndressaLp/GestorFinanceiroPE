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

export async function obterUsuarioLogado(){
    const token = localStorage.getItem("token");
    const response = await api.get("/usuario", { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function atualizarUsuario(usuarioData) {
    const token = localStorage.getItem("token");
    const response = await api.put("/usuario", usuarioData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function enviarCodigo(emailData) {
    const response = await api.post("/usuario/recuperar-senha/email", emailData);
    return response.data;
}

export const verificarCodigo = async (data) => {
    const response = await api.post("/usuario/recuperar-senha/verificar-codigo", data);
    return response.data;
}

export const atualizarSenha = async (id_usuario, passwordData) => {
    const response = await api.put(`/usuario/${id_usuario}/senha_usuario`, passwordData);
    return response.data;
}

export const alterarSenhaLogado = async (data) => {
    const token = localStorage.getItem("token");
    const response = await api.put("/usuario/alterar-senha-logado", data, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
    return response.data;
}

export const uploadFotoPerfil = async (formData) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/usuario/upload-foto-perfil", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
    return response.data;
}

export async function sairConta(){
    localStorage.removeItem("token");
    window.location.href = "/";
}

export async function deletarUsuario(id) {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/usuario/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function cadastrarCliente(clienteData){
    const token = localStorage.getItem("token");
    const response = await api.post("/cliente", clienteData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function obterClientes(){
    const token = localStorage.getItem("token");
    const response = await api.get("/cliente", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function obterClienteId(id){
    const token = localStorage.getItem("token");
    const response = await api.get(`/cliente/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function atualizarCliente(id, clienteData) {
    const token = localStorage.getItem("token");
    const response = await api.put(`/cliente/${id}`, clienteData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function deletarCliente(id) {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/cliente/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function cadastrarServico(servicoData){
    const token = localStorage.getItem("token");
    const response = await api.post("/servico", servicoData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function obterServicos(){
    const token = localStorage.getItem("token");
    const response = await api.get("/servico", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function obterServicoId(id){
    const token = localStorage.getItem("token");
    const response = await api.get(`/servico/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function atualizarServico(id, servicoData) {
    const token = localStorage.getItem("token");
    const response = await api.put(`/servico/${id}`, servicoData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function deletarServico(id) {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/servico/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}