import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { obterUsuarioLogado } from "../services/authService";
import { atualizarUsuario } from "../services/authService";
import { useEffect, useState } from "react";

function EditUser(){
    const [usuario, setUsuario] = useState({
        nome_usuario: "",
        nome_empresa: "",
        area_profissional: "",
        email_usuario: "",
    });
    
    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const response = await obterUsuarioLogado();
                    setUsuario(response);
            } catch (error) {
                alert("Erro ao carregar o usuário: " + error.response.data.message);
            }
        }
        carregarUsuario();
    }, []);
    
    const handleChange = (e) => {
        setUsuario({...usuario, [e.target.name]: e.target.value});
    };

    const handleUpdate = async () => {
        try {
            await atualizarUsuario(usuario);
            alert('Usuário atualizado com sucesso!');
            window.location.reload();
        } catch (error) {
            alert("Erro ao atualizar o usuário: " + error.response.data.message);
        }
    }

    return (
        <div className="md:w-90 max-w-lg max-md:w-full">
            <InputComponent type="text" label="Nome Completo" name="nome_usuario" id="name" change={handleChange} value={usuario.nome_usuario}/>
            <InputComponent type="text" label="Nome da Empresa" name="nome_empresa" id="empresa" change={handleChange} value={usuario.nome_empresa}/>
            <InputComponent type="text" label="Profissão/Área" name="area_profissional" id="profissao" change={handleChange} value={usuario.area_profissional}/>
            <InputComponent type="email" label="Email" name="email_usuario" id="email" change={handleChange} value={usuario.email_usuario}/>            
            <ButtonComponent text="SALVAR" action={handleUpdate}/>
        </div>
    )
}

export default EditUser