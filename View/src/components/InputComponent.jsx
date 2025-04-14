function InputComponent({type, label, placeholder, name, id, change}) {
    return (
        <>
            {type === "checkbox" ? (
                <div className="flex flex-row items-center gap-2 mt-10 mb-0.5">
                    <input className="w-4 h-4 max-lg:w-3 max-lg:h-3" type="checkbox" name={name} id={id}/>
                    <label htmlFor={name} className="text-azul-escuro block text-sm max-lg:text-xs">{label}</label>
                </div>
            ) : (
                <div className="flex flex-col gap-1.5 mt-10 mb-0.5">
                    <label htmlFor={name} className="text-azul-escuro block">{label}</label>
                    <input className="border-2 border-azul focus:outline-verde rounded-xl max-lg:rounded-xs w-full max-lg:h-6 h-8 p-1" type={type} name={name} id={id} placeholder={placeholder} onChange={change}/>
                </div>
            )}
        </>
    )
}

export default InputComponent