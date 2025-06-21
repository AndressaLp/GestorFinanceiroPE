import { RiDeleteBin6Fill, RiImageAddLine } from "react-icons/ri"
import ButtonComponent from "../components/ButtonComponent"
import FrameComponent from "../components/FrameComponent"
import InputComponent from "../components/InputComponent"
import LinkBtnComponent from "../components/LinkBtnComponent"
import PerfilComponent from "../components/PerfilComponent"
import { FaEdit } from "react-icons/fa"
import { alterarSenhaLogado, deletarUsuario, obterUsuarioLogado, uploadFotoPerfil } from "../services/authService"
import { useEffect, useRef, useState } from "react"
import ModalMainComponent from "../components/ModalMainComponent"
import EditUser from "../modal/EditUser"
import MessageComponent from "../components/MessageComponent"
import { useNavigate } from "react-router-dom"
import NewPasswordComponent from "../components/NewPasswordComponent"

function ConfigPage() {
    const [editUserModal, setEditUserModal] = useState(null);
    const [deleteUserModal, setDeleteUserModal] = useState(null);
    const [newPasswordModal, setNewPasswordModal] = useState(null);
    const [fotoPerfilUrl, setFotoPerfilUrl] = useState("/person-icon.svg");

    const fileInputRef = useRef(null);
    const openEditModal = () => setEditUserModal(true);
    const openDeleteModal = () => setDeleteUserModal(true);
    const openNewPasswordModal = () => setNewPasswordModal(true);
    const closeModal = () => setEditUserModal(false);
    const closeDeleteModal = () => setDeleteUserModal(false);
    const closeNewPasswordModal = () => setNewPasswordModal(false);
    const navigate = useNavigate();

    const [modalSenhaData, setModalSenhaData] = useState({
        senhaAtual: "",
        senha_usuario: "",
        confirmarSenha: ""
    });
    const [usuario, setUsuario] = useState({
        nome_usuario: "",
        nome_empresa: "",
        area_profissional: "",
        email_usuario: "",
        id_usuario: null,
        foto_perfil: ""
    });

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const response = await obterUsuarioLogado();
                setUsuario(response);
                if(response.foto_perfil){
                    setFotoPerfilUrl(response.foto_perfil);
                } else{
                    setFotoPerfilUrl("/person-icon.svg");
                }
            } catch (error) {
                alert("Erro ao carregar o usuário: " + error.response.data.message);
            }
        }
        carregarUsuario();
    }, []);

    const handleDelete = async () => {
        try {
            await deletarUsuario(usuario.id_usuario);
            alert('Usuário deletado com sucesso!');
            navigate("/");
        } catch (error) {
            alert("Erro ao deletar o usuário: " + error.response.data.message);
        }
    }

    const handleChangeModalSenha = (e) => {
        setModalSenhaData({...modalSenhaData, [e.target.name]: e.target.value});
    }

    const confirmarNovaSenha = async () => {
        if(modalSenhaData.senha_usuario !== modalSenhaData.confirmarSenha){
            alert("As senhas não coincidem!");
            return;
        }
        try {
            const response = await alterarSenhaLogado(modalSenhaData);
            alert(response.mensagem);
            closeNewPasswordModal();
        } catch (error) {
            console.log(error);
            alert("Erro ao alterar a senha");
        }
    }

    const handleAlterarImagem = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if(file){
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                setFotoPerfilUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
            const formData = new FormData();
            formData.append("fotoPerfil", file);

            try {
                const response = await uploadFotoPerfil(formData);
                setFotoPerfilUrl(response.url);
                setUsuario(prevUsuario => ({...prevUsuario, foto_perfil: response.url}));
                alert("Imagem alterada com sucesso!");
            } catch (error) {
                console.log(error);
                alert("Erro ao alterar a imagem");
                setFotoPerfilUrl(usuario?.foto_perfil ? usuario.foto_perfil : "/person-icon.svg");
            }
        }
    }

    return (
        <div className="max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <FrameComponent height="min-h-[calc(100vh-180px)] h-auto">
                <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">Minha Conta</h2>
                <div className="flex flex-row justify-center">
                    <div className="w-1/3 flex flex-col items-center mt-10">
                        <PerfilComponent src={fotoPerfilUrl}/>
                        <div className="mt-3">
                            <input className="hidden" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange}/>  
                            <ButtonComponent text="ALTERAR IMAGEM" action={handleAlterarImagem} icon={<RiImageAddLine className="w-6 h-6"/>}/>
                        </div>
                        <div className="max-lg:text-xs text-sm mb-0 mt-auto flex gap-0.5">
                            <p>Deseja alterar sua senha?</p>
                            <LinkBtnComponent text="Clique aqui!" action={openNewPasswordModal}/>
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <InputComponent type="text" label="Nome Completo" name="nome_usuario" id="name" value={usuario.nome_usuario} disabled={true}/>
                        <InputComponent type="text" label="Nome da Empresa" name="nome_empresa" id="empresa" value={usuario.nome_empresa} disabled={true}/>
                        <InputComponent type="text" label="Profissão/Área" name="area_profissional" id="profissao" value={usuario.area_profissional} disabled={true}/>
                        <InputComponent type="email" label="Email" name="email_usuario" id="email" value={usuario.email_usuario} disabled={true}/>
                        <div className="grid grid-cols-2 gap-90 items-center mt-10">
                            <ButtonComponent icon={<RiDeleteBin6Fill className="w-6 h-6"/>} text="EXCLUIR" action={openDeleteModal}/>
                            <ButtonComponent icon={<FaEdit className="w-6 h-6"/>} text="EDITAR" action={openEditModal}/>
                        </div>
                    </div>
                </div>
                {editUserModal && <ModalMainComponent text={"Editar Usuário"} onClose={closeModal} content={<EditUser/>}/>}
                {deleteUserModal && <MessageComponent message={"Tem certeza que deseja excluir sua conta?"} title={"Excluir conta"} textbtn={"SIM"} action={handleDelete} textbtn2={"NÃO"} action2={closeDeleteModal}/>}
                {newPasswordModal && <ModalMainComponent text={"Redefinir Senha"} onClose={closeNewPasswordModal} content={<NewPasswordComponent confirmarNovaSenha={confirmarNovaSenha} handleChangeSenha={handleChangeModalSenha} senhaData={modalSenhaData} senhaAtualData={modalSenhaData} handleChangeSenhaAtual={handleChangeModalSenha} type={"modalPassword"}/>}/>}
            </FrameComponent>    
        </div>
    )
}

export default ConfigPage