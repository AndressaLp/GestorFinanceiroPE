import { IoClose } from "react-icons/io5"
import FrameComponent from "./FrameComponent"
import ButtonComponent from "./ButtonComponent"

function ModalMainComponent( {content, text , onClose} ) {
    return(
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] w-[100%] h-[100%] z-20 flex items-center justify-center p-80">
            <FrameComponent>
                <div className="grid grid-cols-[3fr_0.2fr] gap-10">
                    <h2 className="text-azul max-lg:text-2xl text-3xl font-Poppins">{text}</h2>
                    <ButtonComponent icon={<IoClose className="w-6 h-6 cursor-pointer"/>} action={onClose}/>
                </div>
                <div>
                    {content}
                </div>
            </FrameComponent>
        </div>
    )
}

export default ModalMainComponent