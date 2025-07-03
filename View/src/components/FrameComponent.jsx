function FrameComponent({ children, height }) {;
    return (
        <div className={`flex flex-col ${height} bg-branco max-lg:p-5 p-10 font-Roboto max-lg:text-xs max-2xl:text-sm text-lg text-azul-escuro rounded-xl shadow-[10px_10px_15px_rgba(0,0,0,0.25)]`}>
            {children}
        </div>
    )
}

export default FrameComponent