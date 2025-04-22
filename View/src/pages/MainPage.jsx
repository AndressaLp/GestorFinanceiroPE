import { Outlet } from "react-router-dom"
import SideBarComponent from "../components/SideBarComponent"

function MainPage() {
    return (
        <div className="flex h-screen">
            <SideBarComponent/>
            <div className="h-auto w-4/5 bg-cinza overflow-auto p-12">
                <Outlet/>
            </div>
        </div>
    )
}

export default MainPage