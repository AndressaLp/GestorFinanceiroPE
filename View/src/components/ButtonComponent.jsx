function ButtonComponent({text, action, icon}) {
    return (
        <>
            {icon === undefined ? (
                <button onClick={action} className="bg-azul text-branco hover:bg-verde hover:text-azul-escuro cursor-pointer max-lg:h-6 h-8 w-full mt-10 max-lg:rounded-xs rounded-xl">{text}</button>
            ) : text === "EXCLUIR" ? (
                <button onClick={action} className="border-2 border-vermelho text-vermelho hover:bg-vermelho hover:text-branco cursor-pointer max-lg:h-auto h-auto w-full max-lg:rounded-xs rounded-xl flex items-center max-md:gap-2 gap-5 px-5 py-1">
                    {icon}
                    {text}
                </button>
            ) : (
                <button onClick={action} className="bg-azul text-branco hover:bg-verde hover:text-azul-escuro cursor-pointer max-lg:h-auto h-auto w-full max-lg:rounded-xs rounded-xl flex items-center max-md:gap-2 gap-5 px-5 py-1">
                    {icon}
                    {text}
                </button>
            )}
        </>
    )
}

export default ButtonComponent