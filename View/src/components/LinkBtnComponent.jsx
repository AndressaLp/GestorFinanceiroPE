function LinkBtnComponent({text, action}) {
    return (
        <button onClick={action} className="text-azul hover:text-verde flex self-end cursor-pointer max-lg:text-xs text-sm">{text}</button>
    )
}

export default LinkBtnComponent