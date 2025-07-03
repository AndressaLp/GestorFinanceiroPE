import { Link } from "react-router-dom"
import InputComponent from "./InputComponent"
import LinkBtnComponent from "./LinkBtnComponent"
import ButtonComponent from "./ButtonComponent"

function NewPasswordComponent({confirmarNovaSenha, handleChangeSenha, senhaData, type, senhaAtualData, handleChangeSenhaAtual}) {
    return (
        <div className="w-100 max-md:w-full">
            {type === "modalPassword" ? <h2>{null}</h2> : (
                <>
                    <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Redefinir Senha</h2>
                    <p></p>
                </>
            )}
            {type === "modalPassword" ? <InputComponent type="password" label="Senha Atual" placeholder="Digite sua senha atual" name="senhaAtual" id="senhaAtual" change={handleChangeSenhaAtual} value={senhaAtualData.senhaAtual}/> : null}
            <InputComponent type="password" label="Nova Senha" placeholder="Digite sua nova senha" name="senha_usuario" id="senha_usuario" change={handleChangeSenha} value={senhaData.senha_usuario}/>
            <InputComponent type="password" label="Confirmar Senha" placeholder="Confirme sua nova senha" name="confirmarSenha" id="confirmarSenha" change={handleChangeSenha} value={senhaData.confirmarSenha}/>
            {type === "modalPassword" ? <ButtonComponent text={"CONFIRMAR"} action={confirmarNovaSenha}/> : 
                <div className="grid grid-cols-2 gap-10 max-md:gap-0">
                    <Link to="/" className="flex justify-center self-center mt-10">
                        <LinkBtnComponent text="Cancelar"/>
                    </Link>
                    <ButtonComponent text={"CONFIRMAR"} action={confirmarNovaSenha}/>
                </div>
            }
        </div>
    )
}

export default NewPasswordComponent