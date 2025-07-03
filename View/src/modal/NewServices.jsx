import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useEffect, useState } from "react";
import { cadastrarServico, obterClientes } from "../services/authService";

function NewServices() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        nome_servico: '',
        descricao: '',
        id_cliente: '',
        data_servico: '',
        valor_servico: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            console.log(formData);
            await cadastrarServico(formData);
            localStorage.setItem("servicoCadastrado", "true");
            window.location.reload();
        } catch (error) {
            alert("Erro ao cadastrar o serviço: " + error);
        }
    };

    useEffect(() => {
        const carregarClientes = async () => {
            try {
                const response = await obterClientes();
                setClientes(response);
            } catch (error) {
                alert("Erro ao carregar os clientes: " + error);
            }
        }
        carregarClientes();
    }, []);

    return(
        <div>
            <InputComponent type="text" label="Nome do Serviço" placeholder="Digite o nome do serviço" name="nome_servico" id="nome_servico" change={handleChange}/>
            <InputComponent type="text" label="Descrição do Serviço" placeholder="Digite a descrição do serviço" name="descricao" id="descricao" change={handleChange}/>
            <SelectComponent label="Cliente" name="id_cliente" id="id_cliente" change={handleChange}>
                <option disabled selected>Selecione um cliente</option>
                {(clientes || []).map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nome_cliente}</option>
                ))}
            </SelectComponent>
            <div className="grid grid-cols-2 min-lg:gap-15 max-md:gap-5 md:gap-10">
                <InputComponent type="date" label="Data do Serviço" placeholder="Digite a data do serviço" name="data_servico" id="data_servico" change={handleChange}/>
                <InputComponent type="text" label="Valor do Serviço" placeholder="Digite o valor do serviço" name="valor_servico" id="valor_servico" change={handleChange}/>
            </div>
            <ButtonComponent text="SALVAR" action={handleRegister} />
        </div>
    )
}

export default NewServices