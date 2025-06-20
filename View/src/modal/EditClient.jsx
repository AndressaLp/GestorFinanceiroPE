import { useEffect, useState } from "react";
import InputComponent from "../components/InputComponent";
import { atualizarCliente, obterClienteId } from "../services/authService";
import ButtonComponent from "../components/ButtonComponent";

function EditClient({clientId}){
    const [cliente, setCliente] = useState({
        nome_cliente: '',
        telefone: '',
        email_cliente: '',
        endereco_rua: '',
        numero_residencia: '',
        bairro: '',
        cidade: '',
        estado: '',
    })

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await obterClienteId(clientId);
                setCliente(data);
            } catch (error) {
                console.log("Erro ao obter os clientes:", error);
            }
        }
        fetchClientes();
    }, [clientId]);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await atualizarCliente(clientId, cliente);
            alert('Cliente atualizado com sucesso!');
            window.location.reload();
        } catch (error) {
            alert("Erro ao atualizar o cliente: " + error);
        }
    };

    return(
        <div>
            <InputComponent type="text" label="Nome Completo" placeholder="Digite o nome completo" name="nome_cliente" id="nome_cliente" change={handleChange} value={cliente.nome_cliente}/>
            <div className="grid grid-cols-2 gap-20">
                <InputComponent type="text" label="Telefone" placeholder="Digite o telefone" name="telefone" id="telefone" change={handleChange} value={cliente.telefone}/>
                <InputComponent type="email" label="E-mail" placeholder="Digite o e-mail" name="email_cliente" id="email_cliente" change={handleChange} value={cliente.email_cliente}/>
            </div>
            <div className="grid grid-cols-[4.5fr_1fr] gap-20">
                <InputComponent type="text" label="Endereço" placeholder="Digite o endereço" name="endereco_rua" id="endereco_rua" change={handleChange} value={cliente.endereco_rua}/>
                <InputComponent type="number" label="Nº" placeholder="Digite o nº" name="numero_residencia" id="numero_residencia" change={handleChange} value={cliente.numero_residencia}/>
            </div>
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-20">
                <InputComponent type="text" label="Bairro" placeholder="Digite o bairro" name="bairro" id="bairro" change={handleChange} value={cliente.bairro}/>
                <InputComponent type="text" label="Cidade" placeholder="Digite a cidade" name="cidade" id="cidade" change={handleChange} value={cliente.cidade}/>
                <InputComponent type="text" label="Estado" placeholder="Digite o estado" name="estado" id="estado" change={handleChange} value={cliente.estado}/>
            </div>
            <ButtonComponent text="SALVAR" action={handleUpdate} />
        </div>
    )
}

export default EditClient