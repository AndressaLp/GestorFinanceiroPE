import { Outlet } from "react-router-dom"
import SideBarComponent from "../components/SideBarComponent"
import { RxHamburgerMenu } from "react-icons/rx"
import { useState } from "react";
import LinkBtnComponent from "../components/LinkBtnComponent";

function MainPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="flex h-screen relative">
            <div className="fixed mt-2 ms-2 z-50 lg:hidden">
                <LinkBtnComponent active={menuOpen} icon={<RxHamburgerMenu className="w-6 h-6 cursor-pointer"/>} action={toggleMenu}/>
            </div>
            <SideBarComponent display={menuOpen ? "" : "hidden lg:block"} closeMenu={toggleMenu}/>
            <div className={`h-auto bg-cinza overflow-auto p-12 max-md:px-2 ${menuOpen ? "w-4/5 max-lg:w-full" : "w-full"}`}>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainPage