import { HiSearch } from "react-icons/hi"

function InputComponent({type, label, placeholder, name, id, change, value, disabled}) {
    return (
        <>
            {type === "search" ? (
                <div className="flex flex-row items-center relative">
                    <input className="w-full max-lg:h-6 h-8 p-1 border-2 border-azul focus:outline-verde rounded-xl max-lg:rounded-xs z-10" type={type} name={name} id={id} placeholder={placeholder} onChange={change}/>
                    <HiSearch className="w-6 h-6 right-0 me-1 text-azul absolute z-0"/>
                </div>  
            ) : (
                <div className="flex flex-col gap-1.5 mt-10 mb-0.5">
                    <label htmlFor={name} className="text-azul-escuro block">{label}</label>
                    <input className="border-2 border-azul focus:outline-verde rounded-xl max-lg:rounded-xs w-full max-lg:h-6 h-8 p-1 text-azul-escuro" type={type} name={name} id={id} placeholder={placeholder} onChange={change} value={value} disabled={disabled}/>
                </div>
            )}
        </>
    )
}

export default InputComponent