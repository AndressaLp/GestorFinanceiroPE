import FrameComponent from "../components/FrameComponent"
import ButtonComponent from "../components/ButtonComponent"
import InputComponent from "../components/InputComponent"
import { IoFilter } from "react-icons/io5"
import { IoMdPerson } from "react-icons/io"
import ModalMainComponent from "../components/ModalMainComponent"
import { useEffect, useState } from "react"
import NewClient from "../modal/NewClient"
import TableComponent from "../components/TableComponent"
import { obterClientes } from "../services/authService"
import InfoClient from "../modal/InfoClient"
import MessageComponent from "../components/MessageComponent"
import SelectComponent from "../components/SelectComponent"

function ClientsPage(){
    const [newClientModal, setNewClientModal] = useState(false);
    const [infoClientModal, setInfoClientModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [ordenacao, setOrdenacao] = useState('maisRecente');
    
    const openNewClientModal = () => setNewClientModal(true);
    const closeNewClient = () => setNewClientModal(false);
    const openInfoClientModal = (id) => {
        setSelectedClientId(id);
        setInfoClientModal(true);
    }
    const closeInfoClient = () => {
        setInfoClientModal(false);
        setSelectedClientId(null);
    }

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await obterClientes();
                setClientes(data);
                setClientesFiltrados(data);
            } catch (error) {
                console.log("Erro ao obter os clientes:", error);
            }
        }
        fetchClientes();
    }, []);

    const handleSearch = (e) => {
        setTermoBusca(e.target.value);
    }

    // useEffect(() => {
    //     const filtrarClientes = () => {
    //         if(!termoBusca){
    //             setClientesFiltrados(clientes);
    //             return;
    //         }
    //         const termoLower = termoBusca.toLowerCase();
    //         const clientesFiltrados = clientes.filter(cliente => {
    //             const nomeMatch = cliente.nome_cliente.toLowerCase().includes(termoLower);
    //             const emailMatch = cliente.email_cliente.toLowerCase().includes(termoLower);
    //             const telefoneMatch = cliente.telefone.toLowerCase().includes(termoLower);
    //             return nomeMatch || emailMatch || telefoneMatch;
    //         });
    //         setClientesFiltrados(clientesFiltrados);
    //     };
    //     filtrarClientes();
    // }, [termoBusca, clientes]);

    const aplicarFiltrosEOrdenacao = () => {
        let clientesAtuais = [...clientes]; 

        if (termoBusca) {
            const termoLower = termoBusca.toLowerCase();
            clientesAtuais = clientesAtuais.filter((cliente) => {
                const nomeMatch = cliente.nome_cliente.toLowerCase().includes(termoLower);
                const emailMatch = cliente.email_cliente.toLowerCase().includes(termoLower);
                const telefoneMatch = cliente.telefone.toLowerCase().includes(termoLower);
                return nomeMatch || emailMatch || telefoneMatch;
            });
        }

        switch (ordenacao) {
            case "maisRecente":
                clientesAtuais.sort((a, b) => new Date(b.data_cadastro) - new Date(a.data_cadastro));
                break;
            case "maisAntigo":
                clientesAtuais.sort((a, b) => new Date(a.data_cadastro) - new Date(b.data_cadastro));
                break;
            case "az":
                clientesAtuais.sort((a, b) => a.nome_cliente.localeCompare(b.nome_cliente));
                break;
            case "za":
                clientesAtuais.sort((a, b) => b.nome_cliente.localeCompare(a.nome_cliente));
                break;
            default:
                break;
        }

        setClientesFiltrados(clientesAtuais);
    };

    useEffect(() => {
        aplicarFiltrosEOrdenacao();
    }, [clientes, termoBusca, ordenacao]);


    useEffect(() => {
        if(localStorage.getItem("clienteCadastrado") === "true") {
            setSuccessMessage(true);
            localStorage.removeItem("clienteCadastrado");
        }
    }, []);

    return(
        <div className="max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <div className="grid grid-cols-[1fr_3fr_1fr] max-md:grid-cols-[1fr_3fr] gap-45 max-md:gap-5 md:gap-10 items-center mb-10">
                <SelectComponent name="filtro" id="filtro" type="filtro" change={(e) => setOrdenacao(e.target.value)} value={ordenacao}>
                    <option value="maisRecente">Mais Recente</option>
                    <option value="maisAntigo">Mais Antigo</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </SelectComponent>
                <InputComponent type="search" placeholder="Buscar..." name="busca" id="busca" change={handleSearch} value={termoBusca}/>
                <ButtonComponent icon={<IoMdPerson className="w-6 h-6"/>} text="NOVO CLIENTE" action={openNewClientModal}/>
            </div>
            <FrameComponent height="min-md:min-h-[calc(100vh-180px)] min-h-[calc(100vh-220px)]">
                <TableComponent nome="NOME" info="EMAIL" number="TELEFONE" tipo="clientes" clientes={clientesFiltrados} click={openInfoClientModal}/>
            </FrameComponent>
            {newClientModal && <ModalMainComponent text={"Novo Cliente"} onClose={closeNewClient} content={<NewClient/>}  data-testid="new-client-modal"/>}
            {infoClientModal && (<ModalMainComponent text={"Informações do Cliente"} onClose={closeInfoClient} content={<InfoClient clientId={selectedClientId}/>}/>)}
            {successMessage && <MessageComponent type={"success"} title="Cliente cadastrado com sucesso"/>}
        </div>
    )
}

export default ClientsPage