import { Link } from "react-router-dom"
import InputComponent from "./InputComponent"
import LinkBtnComponent from "./LinkBtnComponent"
import ButtonComponent from "./ButtonComponent"

    function InsertCodeComponent({confirmarCodigo, reenviarCodigo, handleChangeCodigo}){
        return(
            <div className="w-100 max-md:w-60">
                <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Confirmar Código</h2>
                <p>Digite o código que foi enviado para o seu e-mail</p>
                <InputComponent type="text" label="Código" placeholder="Digite o código" name="codigo_usuario" id="codigo_usuario" change={handleChangeCodigo}/>
                <div className="flex justify-end">
                    <LinkBtnComponent text="Reenviar Código" action={reenviarCodigo}/>
                </div>
                <div className="grid grid-cols-2 gap-10 max-md:gap-0">
                    <Link to="/" className="flex justify-center self-center mt-10">
                        <LinkBtnComponent text="Cancelar"/>
                    </Link>
                    <ButtonComponent text={"CONFIRMAR"} action={confirmarCodigo}/>
                </div>
            </div>
        )
    }

    export default InsertCodeComponent