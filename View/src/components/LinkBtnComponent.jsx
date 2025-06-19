function LinkBtnComponent({text, action, icon, active}) {
    return (
        <button onClick={action} className={`${active ? "text-branco" : "text-azul"} text-azul hover:text-verde flex self-end cursor-pointer max-lg:text-xs text-sm`}>{text}{icon}</button>
    )
}

export default LinkBtnComponent