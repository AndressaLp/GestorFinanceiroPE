import LinkBtnComponent from "./LinkBtnComponent"
import InputComponent from "./InputComponent"
import ButtonComponent from "./ButtonComponent"

function RegisterComponent({ onLoginClick }) {
    return(
        <div className="mx-auto max-lg:w-fit w-4/5 max-lg:text-sm text-lg font-Roboto flex flex-col overflow-auto">
            <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Bem Vindo(a)</h2>
            <p>Registre sua conta.</p>
            <div className="flex flex-row justify-between max-lg:gap-0 gap-8 max-lg:flex-wrap">
                <div className="flex flex-col w-full">
                    <InputComponent type="text" label="Nome Completo" placeholder="Digite seu nome" name="name" id="name"/>
                    <InputComponent type="text" label="Nome da Empresa" placeholder="Digite o nome da empresa" name="empresa" id="empresa"/>
                    <InputComponent type="text" label="Profissão/Área" placeholder="Digite sua profissão ou área" name="profissao" id="profissao"/>
                </div>
                <div className="flex flex-col w-full">
                    <InputComponent type="email" label="E-mail" placeholder="Digite seu e-mail" name="email" id="email"/>
                    <InputComponent type="password" label="Senha" placeholder="Digite sua senha" name="password" id="password"/>
                    <InputComponent type="password" label="Confirmar Senha" placeholder="Confirme sua senha" name="password" id="password"/>
                </div>
            </div>
            <InputComponent type="checkbox" label="Não tenho uma empresa" name="sem-empresa" id="sem-empresa"/>
            <ButtonComponent text="CRIAR CONTA" action={() => {}}/>
            <p className="flex justify-center max-lg:text-xs text-sm mt-10">Já tem uma conta?<LinkBtnComponent text="Clique aqui!" action={onLoginClick}/></p>
        </div>
    )
}

export default RegisterComponent