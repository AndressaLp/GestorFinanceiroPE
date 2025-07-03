import { useEffect, useState } from "react";
import { deletarServico, obterServicoId } from "../services/authService";
import ButtonComponent from "../components/ButtonComponent";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import MessageComponent from "../components/MessageComponent";
import ModalMainComponent from "../components/ModalMainComponent";
import EditService from "./EditService";

function InfoService({ serviceId }){
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [servico, setServico] = useState({
        nome_servico: '',
        descricao: '',
        id_cliente: '',
        data_servico: '',
        valor_servico: ''
    })

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await obterServicoId(serviceId);
                setServico(data);
            } catch (error) {
                console.log("Erro ao obter os clientes:", error);
            }
        }
        fetchService();
    }, [serviceId]);

    const openDeleteModal = () => setDeleteModal(true);
    const closeDeleteModal = () => setDeleteModal(false);
    const openEditModal = () => setEditModal(true);
    const closeEditModal = () => setEditModal(false);

    const handleDelete = async () => {
        try {
            await deletarServico(servico.id_servico);
            closeDeleteModal();
            window.location.reload();
        } catch (error) {
            console.log("Erro ao excluir o serviço:", error);
        } 
    }

    return(
        <div className="max-w-lg flex flex-col justify-between h-full max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <div className="flex flex-col gap-2 my-10">
                <p>Serviço: {servico.nome_servico}</p>
                <p>Descricao: {servico.descricao}</p>
                <p>Cliente: {servico.cliente?.nome_cliente}</p>
                <p>Data: {servico.data_servico ? new Date(servico.data_servico).toLocaleDateString() : ''}</p>
                <p>Valor: {servico.valor_servico ? servico.valor_servico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}</p>
            </div>
            <div className="flex gap-25 max-md:gap-10">
                <ButtonComponent text="EXCLUIR" icon={<RiDeleteBin6Fill/>} action={openDeleteModal}/>
                <ButtonComponent text="EDITAR" icon={<FaEdit/>} action={openEditModal}/>
            </div>
            {deleteModal && <MessageComponent message="Tem certeza que deseja excluir esse serviço?" title={"Excluir serviço"} textbtn="SIM" action={handleDelete} textbtn2="NÃO" action2={closeDeleteModal}/>}
            {editModal && <ModalMainComponent content={<EditService serviceId={serviceId}/>} text="Editar Serviço" onClose={closeEditModal}/>}     
        </div>
    )
}

export default InfoService