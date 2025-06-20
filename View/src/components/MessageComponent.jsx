import { FaRegCheckCircle } from "react-icons/fa"
import ButtonComponent from "./ButtonComponent"
import { FiAlertTriangle } from "react-icons/fi"
import { useEffect, useState } from "react";

function MessageComponent({type, message, title, textbtn, action, textbtn2, action2}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if(type == "success") {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [type]);
    if(!visible) return null;

    return(
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] w-[100%] h-[100%] z-20 flex items-center justify-center">
            <div className="flex flex-col max-w-md min-w-sm min-h-auto h-auto bg-branco p-10 font-Roboto max-lg:text-xs max-2xl:text-sm text-lg rounded-xl shadow-[10px_10px_15px_rgba(0,0,0,0.25)] text-azul-escuro">
                {type == "success" ? 
                    <div className="flex flex-col items-center m-auto gap-5 text-center">
                        <FaRegCheckCircle className="w-20 h-20 m-auto text-verde"/>
                        <h2 className="text-verde max-lg:text-xl text-2xl font-Poppins">{title}</h2>
                    </div>
                    :
                    <div className="flex flex-col items-center m-auto gap-5">
                        <FiAlertTriangle className="w-20 h-20 text-vermelho"/>
                        <h2 className="text-vermelho max-lg:text-2xl text-3xl font-Poppins">{title}</h2>
                        <p>{message}</p>
                        <div className="flex gap-10">
                            <ButtonComponent text={textbtn} action={action}/>
                            {textbtn2 ? <ButtonComponent text={textbtn2} action={action2}/> : null}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageComponent