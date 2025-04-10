import CarouselComponent from "../components/CarouselComponent"
import LoginComponent from "../components/LoginComponent"

function AccessPage() {
    return (
        <>
            <div className="h-full w-screen bg-azul flex max-md:flex-col-reverse text-azul-escuro">
                <div className="h-screen max-md:w-full w-1/2 min-lg:px-10 flex items-center justify-center self-center">
                    <CarouselComponent/>
                </div>
                <div className="h-screen bg-branco max-md:w-full w-1/2 px-10 flex flex-col justify-center">
                    <LoginComponent/>
                </div>
            </div>
        </>
    )
}

export default AccessPage