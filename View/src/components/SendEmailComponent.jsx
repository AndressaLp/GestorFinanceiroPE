import { Link } from "react-router-dom"
import InputComponent from "./InputComponent"
import LinkBtnComponent from "./LinkBtnComponent"
import ButtonComponent from "./ButtonComponent"

function SendEmailComponent({enviarEmail, handleChangeEmail}){
    return(
        <div className="w-100 max-md:w-60">
            <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Redefinir Senha</h2>
            <p>Enviaremos um e-mail com as instruções para redefinir sua senha.</p>
            <InputComponent type="email" label="E-mail" placeholder="Digite seu e-mail" name="email_usuario" id="email_usuario" change={handleChangeEmail}/>
            <div className="grid grid-cols-2 gap-10 max-md:gap-0">
                <Link to="/" className="flex justify-center self-center mt-10">
                    <LinkBtnComponent text="Voltar"/>
                </Link>
                <ButtonComponent text={"ENVIAR"} action={enviarEmail}/>
            </div>
        </div>
    )
}

export default SendEmailComponent