function InputComponent({type, label, placeholder, name, id}) {
    return (
        <div className="flex flex-col gap-1.5 mt-10 mb-0.5">
            <label htmlFor={name} className="text-azul-escuro block">{label}</label>
            <input className="border-2 border-azul focus:outline-verde rounded-xl max-lg:rounded-xs w-full max-lg:h-6 h-8 p-1" type={type} name={name} id={id} placeholder={placeholder}/>
        </div>
    )
}

export default InputComponent