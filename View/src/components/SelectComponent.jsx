function SelectComponent({ name, id, children, label, change, value, type }) {
    return(
        <>
            {type === "filtro" ? ( 
                <select name={name} id={id} onChange={change} value={value} className="bg-azul text-branco focus:outline-none cursor-pointer rounded-xl max-lg:rounded-xs w-full max-lg:h-6 h-8 p-1 focus:bg-verde focus:text-azul-escuro">
                    {children}
                </select>
            ) : <> 
                <label htmlFor={name} className="text-azul-escuro block mt-10 mb-1.5">{label}</label>
                <select name={name} id={id} onChange={change} value={value} className="border-2 border-azul focus:outline-verde rounded-xl max-lg:rounded-xs w-full max-lg:h-6 h-8 p-1 text-azul-escuro">
                    {children}
                </select>
            </>}
        </>
    )
}

export default SelectComponent