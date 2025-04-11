import ButtonComponent from "./ButtonComponent"
import InputComponent from "./InputComponent"
import LinkBtnComponent from "./LinkBtnComponent"

function LoginComponent({ onRegisterClick }) {
    return (
        <div className="mx-auto max-lg:w-fit w-2/3 max-lg:text-sm text-lg font-Roboto flex flex-col">
            <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Bem Vindo(a)</h2>
            <p>Entre em sua conta.</p>
            <InputComponent type="email" label="E-mail" placeholder="Digite seu e-mail" name="email" id="email"/>
            <InputComponent type="password" label="Senha" placeholder="Digite sua senha" name="password" id="password"/>
            <LinkBtnComponent text="Esqueceu sua senha?" action={() => {}}/>
            <ButtonComponent text="ENTRAR" action={() => {}}/>
            <p className="flex justify-center max-lg:text-xs text-sm mt-10">Não tem uma conta ainda?<LinkBtnComponent text="Cadastre-se aqui!" action={onRegisterClick}/></p>
        </div>
    )
}

export default LoginComponent