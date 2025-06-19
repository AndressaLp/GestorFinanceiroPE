import { useEffect, useState } from "react";
import FrameComponent from "../components/FrameComponent"
import InsertCodeComponent from "../components/InsertCodeComponent";
import NewPasswordComponent from "../components/NewPasswordComponent";
import SendEmailComponent from "../components/SendEmailComponent"
import { atualizarSenha, enviarCodigo, verificarCodigo } from "../services/authService";
import { useNavigate } from "react-router-dom";
function RecoverPage(){
    const [type, setType] = useState("email");
    const [emailData, setEmailData] = useState({email_usuario: ""});
    const [codigoData, setCodigoData] = useState({codigo_usuario: ""});
    const [senhaData, setSenhaData] = useState({senha_usuario: "", confirmarSenha: ""});
    const [usuarioId, setUsuarioId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(usuarioId !== null){
            console.log("Usuario atualizado no estado", usuarioId);
        }
    }, [usuarioId]);

    const handleChangeEmail = (e) => {
        setEmailData({...emailData, [e.target.name]: e.target.value});
    }

    const handleChangeCodigo = (e) => {
        setCodigoData({...codigoData, [e.target.name]: e.target.value});
    }

    const handleChangeSenha = (e) => {
        setSenhaData({...senhaData, [e.target.name]: e.target.value});
    }

    const enviarEmail = async () => {
        try {
            await enviarCodigo(emailData);    
            setType("codigo");
            alert("E-mail enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao enviar o e-mail");
        }
    }

    const confirmarCodigo = async () => {
        try {
            const response = await verificarCodigo({email_usuario: emailData.email_usuario, ...codigoData});
            if(response && response.mensagem === "Código correto." && response.id_usuario){
                console.log(response.id_usuario);
                setUsuarioId(response.id_usuario);
                setType("senha");
                alert(response.mensagem);
            } else{
                alert("Código incorreto");
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao confirmar o codigo");
        }
    }

    const reenviarCodigo = async () => {
        await enviarEmail();
    }

    const confirmarNovaSenha = async () => {
        if(senhaData.senha_usuario !== senhaData.confirmarSenha){
            alert("As senhas não coincidem!");
            return;
        }
        if(usuarioId === null){
            alert("Erro: Id do usuário não encontrado");
            return;
        }
        try {
            console.log(usuarioId);
            console.log(senhaData);
            const response = await atualizarSenha(usuarioId, senhaData);
            if(response && response.mensagem === "Senha atualizada com sucesso."){
                alert("Senha atualizada com sucesso!");
                navigate("/");
            } else {
                alert("Erro ao atualizar a senha");
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao atualizar a senha");
        }
    }

    return(
        <div className="bg-azul w-full h-screen flex items-center justify-center max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <FrameComponent>
                {type === "email" ? (
                    <SendEmailComponent enviarEmail={enviarEmail} handleChangeEmail={handleChangeEmail}/>
                ) : type === "codigo" ? (
                    <InsertCodeComponent confirmarCodigo={confirmarCodigo} reenviarCodigo={reenviarCodigo} handleChangeCodigo={handleChangeCodigo}/>
                ) : type === "senha" ? (
                    <NewPasswordComponent confirmarNovaSenha={confirmarNovaSenha} handleChangeSenha={handleChangeSenha} senhaData={senhaData}/>
                ) : null}  
            </FrameComponent>
        </div>
    )
}

export default RecoverPage