import { Link } from "react-router-dom"
import ButtonComponent from "./ButtonComponent"
import PerfilComponent from "./PerfilComponent"
import { VscGraphLine } from "react-icons/vsc"
import { IoMdPerson } from "react-icons/io"
import { MdGroups, MdWork } from "react-icons/md"
import { TbLogout } from "react-icons/tb"
import { useState, useEffect } from "react"
import { obterUsuarioLogado, sairConta } from "../services/authService"
import MessageComponent from "./MessageComponent"
// import { IoDocumentTextOutline } from "react-icons/io5"

function SideBarComponent({display, closeMenu}) {
    const [messageConfirm, setMessageConfirm] = useState(null);
    const [usuario, setUsuario] = useState({
            nome_usuario: "",
            nome_empresa: "",
            area_profissional: "",
            foto_perfil: ""
        });
    const [fotoPerfilUrl, setFotoPerfilUrl] = useState("/person-icon.svg");
    
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
                    setFotoPerfilUrl("/person-icon.svg");
                }
            }
            carregarUsuario();
        }, []);

        const openConfirmModal = () => setMessageConfirm(true);
        const closeModal = () => setMessageConfirm(false);

        const isMobile = window.innerWidth < 1024;

    return (
        <div className={`${display} max-md:w-52 md:w-56 min-lg:w-1/5 h-screen bg-azul flex flex-col text-branco max-md:p-2 p-5 font-Roboto max-lg:text-xs max-2xl:text-sm text-lg max-lg:fixed max-lg:z-40 max-lg:shadow-[10px_0px_15px_rgba(0,0,0,0.50)]`}>
            <div className="flex flex-col items-center justify-center text-center h-1/3">
                <PerfilComponent src={fotoPerfilUrl}/>
                <h2 className="font-Poppins max-lg:text-xl text-2xl">{usuario.nome_empresa ? usuario.nome_empresa : usuario.nome_usuario}</h2>
                <p>{usuario.area_profissional}</p>
            </div>
            <div className="flex flex-col justify-around h-2/3">
                <Link to="/main/dashboard" onClick={isMobile && closeMenu}>
                    <ButtonComponent text="DASHBOARD" icon={<VscGraphLine className="w-6 h-6"/>}/>
                </Link>
                <Link to="/main/clients" onClick={isMobile && closeMenu}>
                    <ButtonComponent text="CLIENTES" icon={<MdGroups className="w-6 h-6"/>}/>
                </Link>
                <Link to="/main/services" onClick={isMobile && closeMenu}>
                    <ButtonComponent text="SERVIÇOS" icon={<MdWork className="w-6 h-6"/>}/>
                </Link>
                {/* <Link to="/main/reports" onClick={closeMenu}>
                    <ButtonComponent text="RELATÓRIOS" icon={<IoDocumentTextOutline className="w-6 h-6"/>}/>
                </Link> */}
                <Link to="/main/account" onClick={isMobile && closeMenu}>
                    <ButtonComponent text="MINHA CONTA" icon={<IoMdPerson className="w-6 h-6"/>}/>
                </Link>
                <ButtonComponent text="SAIR" action={openConfirmModal} icon={<TbLogout className="w-6 h-6"/>}/>
            </div>
            {messageConfirm && <MessageComponent message="Tem certeza que deseja sair?" title="Sair" textbtn="SIM" textbtn2="NÃO" action={sairConta} action2={closeModal}/>}
        </div>
    )
}

export default SideBarComponent