function TableComponent({ nome, info, number, tipo, clientes, servicos, click }) {
    const gridColumns = info === undefined ? "grid-cols-[2fr_1fr]" : "grid-cols-[2fr_2fr_1fr]";

    return (
        <div>
            <table className="text-azul-escuro w-full h-auto max-lg:text-xs max-2xl:text-sm text-lg font-Poppins overflow-auto">
                <thead className="border-b-2 border-azul text-azul">
                    <tr className={`text-left grid ${gridColumns} gap-10`}>
                        <th className="pb-1">{nome}</th>
                        {info === undefined ? "" : <th className="pb-1">{info}</th>}
                        <th className="pb-1">{number}</th>
                    </tr>
               </thead>
                <tbody>
                    {tipo === "clientes" && clientes && clientes.length > 0 ? 
                        clientes.map((cliente) => 
                            <tr key={cliente.id_cliente} className={`cursor-pointer hover:bg-cinza grid ${gridColumns} gap-10`} onClick={() => click(cliente.id_cliente)}>
                                <td className="py-0.5 truncate">{cliente.nome_cliente}</td>
                                {info === undefined ? "" : <td className="py-0.5 truncate">{cliente.email_cliente}</td>}
                                <td className="py-0.5 truncate">{cliente.telefone}</td>
                            </tr>) : tipo === "servicos" && servicos && servicos.length > 0 ? (
                        servicos.map((servico) =>
                            <tr key={servico.id_servico} className={`cursor-pointer hover:bg-cinza grid ${gridColumns} gap-10`} onClick={() => click(servico.id_servico)}>
                                <td className="py-0.5 truncate">{servico.nome_servico}</td>
                                {info === undefined ? "" : <td className="py-0.5 truncate">{servico.cliente?.nome_cliente}</td>}
                                <td className="py-0.5">{servico.valor_servico ? servico.valor_servico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ""}</td>
                            </tr>)
                        ) : (
                            <tr>
                                <td>{tipo === "clientes" ? "Nenhum cliente cadastrado" : "Nenhum serviço cadastrado"}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent