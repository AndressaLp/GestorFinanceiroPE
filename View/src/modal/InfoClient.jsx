import { useEffect, useState } from "react";
import { deletarCliente, obterClienteId } from "../services/authService";
import ButtonComponent from "../components/ButtonComponent";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import MessageComponent from "../components/MessageComponent";
import EditClient from "./EditClient";
import ModalMainComponent from "../components/ModalMainComponent";

function InfoClient({ clientId }){
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [cliente, setCliente] = useState({
        nome_cliente: '',
        email_cliente: '',
        telefone: '',
        endereco_rua: '',
        numero_residencia: '',
        bairro: '',
        cidade: '',
        estado: ''
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

    const openDeleteModal = () => setDeleteModal(true);
    const closeDeleteModal = () => setDeleteModal(false);
    const openEditModal = () => setEditModal(true);
    const closeEditModal = () => setEditModal(false);

    const handleDelete = async () => {
        try {
            await deletarCliente(clientId);
            closeDeleteModal();
            window.location.reload();
        } catch (error) {
            console.log("Erro ao excluir o cliente:", error);
        }
    };

    return(
        <div className="max-w-lg max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <div className="flex flex-col gap-2 my-10">
                <p>Nome: {cliente.nome_cliente}</p>
                <p>Email: {cliente.email_cliente}</p>
                <p>Telefone: {cliente.telefone}</p>
                <p>Endereço: {cliente.endereco_rua}</p>
                <p>Número: {cliente.numero_residencia}</p>
                <p>Bairro: {cliente.bairro}</p>
                <p>Cidade: {cliente.cidade}</p>
                <p>Estado: {cliente.estado}</p>
            </div>
            <div className="flex gap-25 max-md:gap-10">
                <ButtonComponent text="EXCLUIR" icon={<RiDeleteBin6Fill/>} action={openDeleteModal}/>
                <ButtonComponent text="EDITAR" icon={<FaEdit/>} action={openEditModal}/>
            </div>
            {deleteModal && <MessageComponent message="Tem certeza que deseja excluir esse cliente?" title="Excluir Cliente" textbtn="SIM" textbtn2="NÃO" action={handleDelete} action2={closeDeleteModal}/>}
            {editModal && <ModalMainComponent text="Editar Cliente" content={<EditClient clientId={clientId}/>} onClose={closeEditModal}/>}
        </div>
    )
}

export default InfoClient