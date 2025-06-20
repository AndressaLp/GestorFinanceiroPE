import { useEffect, useState } from "react";
import FrameComponent from "../components/FrameComponent"
import TableComponent from "../components/TableComponent"
import { obterClientes, obterServicos } from "../services/authService";
import GraphicComponent from "../components/GraphicComponent";

function DashboardPage() {
    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const dataServicos = await obterServicos();
                const dataClientes = await obterClientes();
                const limite = 5;
                const servicosOrdenados = dataServicos
                    .sort((a, b) => new Date(b.data_servico) - new Date(a.data_servico))
                    .slice(0, limite);
                const clientesOrdenados = dataClientes
                    .sort((a, b) => new Date(b.data_cadastro) - new Date(a.data_cadastro))
                    .slice(0, limite);
                setServicos(servicosOrdenados);
                setClientes(clientesOrdenados);
            } catch (error) {
                console.log("Erro ao obter os dados:", error);
            }
        }
        fetchDados();
    }, []);

    return (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:text-xs max-2xl:text-sm text-lg font-Roboto text-azul-escuro">
            <div className="col-span-2 max-md:col-span-1">
                <GraphicComponent/>
            </div>
            <FrameComponent>
                <h2 className="text-azul max-lg:text-xl text-2xl font-Poppins mb-5">Últimos serviços cadastrados</h2>
                <TableComponent nome="SERVIÇO" number="PREÇO" tipo="servicos" servicos={servicos}/>
            </FrameComponent>
            <FrameComponent>
                <h2 className="text-azul max-lg:text-xl text-2xl font-Poppins mb-5">Últimos clientes cadastrados</h2>
                <TableComponent nome="NOME" number="TELEFONE" tipo="clientes" clientes={clientes}/>
            </FrameComponent>
        </div>
    )
}

export default DashboardPage