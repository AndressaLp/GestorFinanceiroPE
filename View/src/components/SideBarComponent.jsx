import { Link } from "react-router-dom"
import ButtonComponent from "./ButtonComponent"
import PerfilComponent from "./PerfilComponent"
import { VscGraphLine } from "react-icons/vsc"
import { IoMdPerson } from "react-icons/io"
import { MdWork } from "react-icons/md"
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5"
import { TbLogout } from "react-icons/tb"

function SideBarComponent() {
    return (
        <div className="max-md:w-52 w-1/5 h-screen bg-azul flex flex-col text-branco max-md:p-2 p-5 font-Roboto max-lg:text-xs max-2xl:text-sm text-lg">
            <div className="flex flex-col items-center justify-center text-center h-1/3">
                <PerfilComponent/>
                <h2 className="font-Poppins max-lg:text-xl text-2xl">Nome</h2>
                <p>Profissão</p>
            </div>
            <div className="flex flex-col justify-around h-2/3">
                <Link to="/main/dashboard">
                    <ButtonComponent text="DASHBOARD" icon={<VscGraphLine className="w-6 h-6"/>}/>
                </Link>
                <Link to="/main/clients">
                    <ButtonComponent text="CLIENTES" icon={<IoMdPerson className="w-6 h-6"/>}/>
                </Link>
                <Link to="/main/services">
                    <ButtonComponent text="SERVIÇOS" icon={<MdWork className="w-6 h-6"/>}/>
                </Link>
                <Link to="/main/reports">
                    <ButtonComponent text="RELATÓRIOS" icon={<IoDocumentTextOutline className="w-6 h-6"/>}/>
                </Link>
                <Link to="/main/config">
                    <ButtonComponent text="CONFIGURAÇÕES" icon={<IoSettingsOutline className="w-6 h-6"/>}/>
                </Link>
                <ButtonComponent text="SAIR" action={() => {}} icon={<TbLogout className="w-6 h-6"/>}/>
            </div>
        </div>
    )
}

export default SideBarComponent