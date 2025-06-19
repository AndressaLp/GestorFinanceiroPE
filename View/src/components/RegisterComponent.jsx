import LinkBtnComponent from "./LinkBtnComponent"
import InputComponent from "./InputComponent"
import ButtonComponent from "./ButtonComponent"
import { cadastrarUsuario } from "../services/authService";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function RegisterComponent({ onLoginClick }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome_usuario: '',
        nome_empresa: '',
        area_profissional: '',
        email_usuario: '',
        senha_usuario: '',
    });

    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleRegister = async () => {
        if (formData.senha_usuario !== confirmarSenha){
            alert('As senhas não coincidem!');
            return;
        }
        try {
            await cadastrarUsuario(formData);
            navigate("/main/dashboard");
            alert('Cadastro realizado com sucesso!');
            setFormData({
                nome_usuario: '',
                nome_empresa: '',
                area_profissional: '',
                email_usuario: '',
                senha_usuario: '',
            })
        } catch (error) {
            alert("Erro ao fazer o cadastro:" + error.response.data.message);
        }
    };

    return(
        <div className="mx-auto max-lg:w-fit w-4/5 max-lg:text-xs max-2xl:text-sm text-lg font-Roboto flex flex-col overflow-auto">
            <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Bem Vindo(a)</h2>
            <p>Registre sua conta.</p>
            <div className="flex flex-row justify-between max-lg:gap-0 gap-8 max-lg:flex-wrap">
                <div className="flex flex-col w-full">
                    <InputComponent type="text" label="Nome Completo" placeholder="Digite seu nome" name="nome_usuario" id="nome_usuario" change={handleChange}/>
                    <InputComponent type="text" label="Nome da Empresa" placeholder="Digite o nome da empresa" name="nome_empresa" id="nome_empresa" change={handleChange}/>
                    <InputComponent type="text" label="Profissão/Área" placeholder="Digite sua profissão ou área" name="area_profissional" id="area_profissional" change={handleChange}/>
                </div>
                <div className="flex flex-col w-full">
                    <InputComponent type="email" label="E-mail" placeholder="Digite seu e-mail" name="email_usuario" id="email_usuario" change={handleChange}/>
                    <InputComponent type="password" label="Senha" placeholder="Digite sua senha" name="senha_usuario" id="senha_usuario" change={handleChange}/>
                    <InputComponent type="password" label="Confirmar Senha" placeholder="Confirme sua senha" name="confirmarSenha" id="confirmarSenha" change={e => setConfirmarSenha(e.target.value)}/>
                </div>
            </div>
            <ButtonComponent text="CRIAR CONTA" action={handleRegister}/>
            <p className="flex justify-center max-lg:text-xs text-sm mt-10">Já tem uma conta?<LinkBtnComponent text="Clique aqui!" action={onLoginClick}/></p>
        </div>
    )
}

export default RegisterComponent