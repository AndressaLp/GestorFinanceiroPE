import { useEffect, useState } from "react";
import { CartesianGrid, Legend, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { obterClientes, obterServicos } from "../services/authService";

function GraphicComponent(){
    const [clientes, setClientes] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [dadosMensais, setDadosMensais] = useState([]);

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const dataClientes = await obterClientes();
                const dataServicos = await obterServicos();
                setClientes(dataClientes);
                setServicos(dataServicos);
            } catch (error) {
                console.log("Erro ao obter os dados:", error);
            }
        }
        fetchDados();
    }, []);

    useEffect(() => {
        const anoAtual = new Date().getFullYear();
        const dadosPorMes = meses.map((mes, index) => {
            const clientesDoMes = clientes.filter(cliente => {
                const dataCadastro = new Date(cliente.data_cadastro);
                return (
                    dataCadastro.getFullYear() === anoAtual &&
                    dataCadastro.getMonth() === index
                );
            });

            const servicosDoMes = servicos.filter(servico => {
                const dataServico = new Date(servico.data_servico);
                return (
                    dataServico.getFullYear() === anoAtual &&
                    dataServico.getMonth() === index
                );
            });

            return {
                name: mes,
                clientes: clientesDoMes.length,
                servicos: servicosDoMes.length
            };
        });

        setDadosMensais(dadosPorMes);
    }, [clientes, servicos]);

    return(
        <div className="bg-branco rounded-xl p-10 max-md:p-5 shadow-[10px_10px_15px_rgba(0,0,0,0.25)]">
            <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins mb-5">Resumo Anual</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dadosMensais}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clientes" fill="#8884d8" name="Clientes" />
                    <Bar dataKey="servicos" fill="#82ca9d" name="Serviços" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraphicComponent