import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";
import { cadastrarCliente } from "../services/authService";

function NewClient() {
    const [formData, setFormData] = useState({
        nome_cliente: '',
        telefone: '',
        email_cliente: '',
        endereco_rua: '',
        numero_residencia: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            await cadastrarCliente(formData);
            localStorage.setItem("clienteCadastrado", "true");
            window.location.reload();
        } catch (error) {
            alert("Erro ao cadastrar o cliente:" + error);
        }
    };

    return(
        <div>
            <InputComponent type="text" label="Nome Completo" placeholder="Digite o nome completo" name="nome_cliente" id="nome_cliente" change={handleChange}/>
            <div className="grid grid-cols-2 gap-20">
                <InputComponent type="text" label="Telefone" placeholder="Digite o telefone" name="telefone" id="telefone" change={handleChange}/>
                <InputComponent type="email" label="E-mail" placeholder="Digite o e-mail" name="email_cliente" id="email_cliente" change={handleChange}/>
            </div>
            <div className="grid grid-cols-[4.5fr_1fr] gap-20">
                <InputComponent type="text" label="Endereço" placeholder="Digite o endereço" name="endereco_rua" id="endereco_rua" change={handleChange}/>
                <InputComponent type="number" label="Nº" placeholder="Digite o nº" name="numero_residencia" id="numero_residencia" change={handleChange}/>
            </div>
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-20">
                <InputComponent type="text" label="Bairro" placeholder="Digite o bairro" name="bairro" id="bairro" change={handleChange}/>
                <InputComponent type="text" label="Cidade" placeholder="Digite a cidade" name="cidade" id="cidade" change={handleChange}/>
                <InputComponent type="text" label="Estado" placeholder="Digite o estado" name="estado" id="estado" change={handleChange}/>
            </div>
            <ButtonComponent text="SALVAR" action={handleRegister} />
        </div>
    )
}

export default NewClient