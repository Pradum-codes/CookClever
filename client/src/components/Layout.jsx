import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Layout = () => (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
            <Outlet />
        </main>
    </div>
);

export default Layout;