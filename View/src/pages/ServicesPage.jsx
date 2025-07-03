import { IoFilter } from "react-icons/io5"
import ButtonComponent from "../components/ButtonComponent"
import FrameComponent from "../components/FrameComponent"
import InputComponent from "../components/InputComponent"
import ModalMainComponent from "../components/ModalMainComponent"
import { useEffect, useState } from "react"
import { MdWork } from "react-icons/md"
import NewServices from "../modal/NewServices"
import TableComponent from "../components/TableComponent"
import { obterServicos } from "../services/authService"
import InfoService from "../modal/InfoService"
import MessageComponent from "../components/MessageComponent"
import SelectComponent from "../components/SelectComponent"

function ServicesPage(){
    const [NewServiceModal, setNewServiceModal] = useState(false);
    const [infoServiceModal, setInfoServiceModal] = useState(false);
    const [servicos, setServicos] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [servicosFiltrados, setServicosFiltrados] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [ordenacao, setOrdenacao] = useState('maisRecente');

    const openNewServiceModal = () => setNewServiceModal(true);
    const openInfoServiceModal = (id) => {
        setSelectedServiceId(id);
        setInfoServiceModal(true);
    }
    const closeNewServiceModal = () => setNewServiceModal(false);
    const closeInfoService = () => {
        setInfoServiceModal(false);
        setSelectedServiceId(null);
    }

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const data = await obterServicos();
                setServicos(data);
                setServicosFiltrados(data);
            } catch (error) {
                console.log("Erro ao obter os serviços:", error);
            }
        }
        fetchServicos();
    }, []);

    const handleSearch = (e) => {
        setTermoBusca(e.target.value);
    }

    // useEffect(() => {
    //     const filtrarServicos = () => {
    //         if(!termoBusca){
    //             setServicosFiltrados(servicos);
    //             return;
    //         }
    //         const termoLower = termoBusca.toLowerCase();
    //         const servicosFiltrados = servicos.filter(servico => {
    //             const nomeMatch = servico.nome_servico.toLowerCase().includes(termoLower);
    //             const clienteMatch = servico.cliente?.nome_cliente.toLowerCase().includes(termoLower);
    //             return nomeMatch || clienteMatch;
    //         });
    //         setServicosFiltrados(servicosFiltrados);
    //     };
    //     filtrarServicos();
    // }, [servicos, termoBusca]);

    const aplicarFiltrosEOrdenacao = () => {
        let servicosAtuais = [...servicos];

        if(termoBusca){
            const termoLower = termoBusca.toLowerCase();
            servicosAtuais = servicosAtuais.filter(servico => {
                const nomeMatch = servico.nome_servico.toLowerCase().includes(termoLower);
                const clienteMatch = servico.cliente?.nome_cliente.toLowerCase().includes(termoLower);
                return nomeMatch || clienteMatch;
            });
        }

        switch (ordenacao) {
            case "maisRecente":
                servicosAtuais.sort((a, b) => new Date(b.data_servico) - new Date(a.data_servico));
                break;
            case "maisAntigo":
                servicosAtuais.sort((a, b) => new Date(a.data_servico) - new Date(b.data_servico));
                break;
            case "menorValor":
                servicosAtuais.sort((a, b) => a.valor_servico - b.valor_servico);
                break;
            case "maiorValor":
                servicosAtuais.sort((a, b) => b.valor_servico - a.valor_servico);
                break;
            default:
                break;
        }
        setServicosFiltrados(servicosAtuais);
    };

    useEffect(() => {
        aplicarFiltrosEOrdenacao();
    }, [servicos, termoBusca, ordenacao]);

    useEffect(() => {
        if(localStorage.getItem("servicoCadastrado") === "true"){
            setSuccessMessage(true);
            localStorage.removeItem("servicoCadastrado");
        }
    })

    return(
        <div className="max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <div className="grid grid-cols-[1fr_3fr_1.7fr] max-md:grid-cols-[1fr_3fr] md:gap-10 gap-45 max-md:gap-5 items-center mb-10">
                <SelectComponent name="filtro" id="filtro" change={(e) => setOrdenacao(e.target.value)} value={ordenacao} type="filtro">
                    <option value="maisRecente">Mais Recente</option>
                    <option value="maisAntigo">Mais Antigo</option>
                    <option value="menorValor">Menor Valor</option>
                    <option value="maiorValor">Maior Valor</option>
                </SelectComponent>
                <InputComponent type="search" placeholder="Buscar..." name="busca" id="busca" change={handleSearch} value={termoBusca}/>
                <ButtonComponent icon={<MdWork className="w-6 h-6"/>} text="NOVO SERVIÇO" action={openNewServiceModal}/>
            </div>
            <FrameComponent height="min-h-[calc(100vh-180px)] h-auto">
                <TableComponent nome="SERVIÇO" info="CLIENTE" number="PREÇO" tipo="servicos" servicos={servicosFiltrados} click={openInfoServiceModal}/>
            </FrameComponent>
            {NewServiceModal && <ModalMainComponent text={"Novo Serviço"} onClose={closeNewServiceModal} content={<NewServices/>} data-testid="new-service-modal"/>}
            {infoServiceModal && <ModalMainComponent text={"Informações do Serviço"} onClose={closeInfoService} content={<InfoService serviceId={selectedServiceId}/>} data-testid="info-service-modal"/>}
            {successMessage && <MessageComponent type={"success"} title={"Serviço cadastrado com sucesso"}/>}
        </div>
    )
}

export default ServicesPage