import { useState } from "react"
import CarouselComponent from "../components/CarouselComponent"
import LoginComponent from "../components/LoginComponent"
import RegisterComponent from "../components/RegisterComponent";

function AccessPage() {
    const [view, setView] = useState("login");
    const showLogin = () => setView("login");
    const showRegister = () => setView("register");

    return (
        <>
            <div className="max-md:h-full h-screen w-screen bg-azul flex max-md:flex-col-reverse text-azul-escuro">
                <div className="h-screen max-md:w-full w-1/2 min-lg:px-10 flex items-center justify-center self-center">
                    <CarouselComponent/>
                </div>
                <div className="min-h-screen bg-branco max-md:w-full w-1/2 px-10 py-16 flex flex-col justify-center">
                    {view === "login" ? (
                        <LoginComponent onRegisterClick={showRegister}/>
                    ) : (
                        <RegisterComponent onLoginClick={showLogin}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default AccessPage