import { useEffect, useState } from "react"
import ButtonComponent from "../components/ButtonComponent"
import InputComponent from "../components/InputComponent"
import SelectComponent from "../components/SelectComponent"
import { atualizarServico, obterClientes, obterServicoId } from "../services/authService"

function EditService({serviceId}){
    const [servico, setServico] = useState({
        nome_servico: '',
        descricao: '',
        id_cliente: '',
        data_servico: '',
        valor_servico: '',
    })

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await obterServicoId(serviceId);
                const formatarData = data.data_servico ? new Date(data.data_servico).toISOString().split('T')[0] : '';
                setServico({...data, data_servico: formatarData});
            } catch (error) {
                console.log("Erro ao obter os clientes:", error);
            }
        }
        fetchService();
    }, [serviceId]);

    const handleChange = (e) => {
        setServico({ ...servico, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await atualizarServico(serviceId, servico);
            alert('Serviço atualizado com sucesso!');
            window.location.reload();
        } catch (error) {
            alert("Erro ao atualizar o serviço: " + error);
        }
    };

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await obterClientes();
                setClientes(data);
            } catch (error) {
                console.log("Erro ao obter os clientes:", error);
            }
        }
        fetchClientes();
    }, []);

    return(
        <div>
            <InputComponent type="text" label="Nome do Serviço" placeholder="Digite o nome do serviço" name="nome_servico" id="nome_servico" change={handleChange} value={servico.nome_servico}/>
            <InputComponent type="text" label="Descrição do Serviço" placeholder="Digite a descrição do serviço" name="descricao" id="descricao" change={handleChange} value={servico.descricao}/>
            <SelectComponent label="Cliente" name="id_cliente" id="id_cliente" change={handleChange} value={servico.id_cliente}>
                <option disabled selected>Selecione um cliente</option>
                {(clientes || []).map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nome_cliente}</option>
                ))}
            </SelectComponent>
            <div className="grid grid-cols-2 min-lg:gap-15 max-md:gap-5 md:gap-10">
                <InputComponent type="date" label="Data do Serviço" placeholder="Digite a data do serviço" name="data_servico" id="data_servico" change={handleChange} value={servico.data_servico}/>
                <InputComponent type="text" label="Valor do Serviço" placeholder="Digite o valor do serviço" name="valor_servico" id="valor_servico" change={handleChange} value={servico.valor_servico}/>
            </div>
            <ButtonComponent text="SALVAR" action={handleUpdate} />
        </div>
    )
}

export default EditService