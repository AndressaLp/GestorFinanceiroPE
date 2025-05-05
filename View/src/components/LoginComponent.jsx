import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/authService";
import { salvarToken } from "../utils/auth";
import ButtonComponent from "./ButtonComponent"
import InputComponent from "./InputComponent"
import LinkBtnComponent from "./LinkBtnComponent"
import { useState } from "react"

function LoginComponent({ onRegisterClick }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await loginUsuario({
                email_usuario: email,
                senha_usuario: senha
            });
            navigate("/main/dashboard");
            alert('Login realizado com sucesso!');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.mensagem) {
                alert("Erro ao fazer login: " + error.response.data.mensagem);
            } else {
                console.error("Erro inesperado no login:", error);
                alert("Erro ao fazer login. Tente novamente mais tarde.");
            }
        }
    }

    return (
        <div className="mx-auto max-lg:w-fit w-2/3 max-lg:text-xs max-2xl:text-sm text-lg font-Roboto flex flex-col">
            <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Bem Vindo(a)</h2>
            <p>Entre em sua conta.</p>
            <InputComponent type="email" label="E-mail" placeholder="Digite seu e-mail" name="email" id="email" change={e => setEmail(e.target.value)}/>
            <InputComponent type="password" label="Senha" placeholder="Digite sua senha" name="password" id="password" change={e => setSenha(e.target.value)}/>
            <LinkBtnComponent text="Esqueceu sua senha?" action={() => {}}/>
            <ButtonComponent text="ENTRAR" action={handleLogin}/>
            <p className="flex justify-center max-lg:text-xs text-sm mt-10">Não tem uma conta ainda?<LinkBtnComponent text="Cadastre-se aqui!" action={onRegisterClick}/></p>
        </div>
    )
}

export default LoginComponent