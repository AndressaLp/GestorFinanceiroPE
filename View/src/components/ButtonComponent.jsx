function ButtonComponent({text, action}) {
    return (
        <button onClick={action} className="bg-azul text-branco hover:bg-verde hover:text-azul-escuro cursor-pointer max-lg:h-6 h-8 mt-10 max-lg:rounded-xs rounded-xl">{text}</button>
    )
}

export default ButtonComponent