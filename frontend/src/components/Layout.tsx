import React from "react";
import Navbar from "./Navbar";
import {Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (<>
    <div className="md:mx-16 lg:mx-32 md:mx-16 lg:mx-32">
        <div className="min-h-screen flex flex-col bg-white">
          <main className="flex flex-col flex-1 w-full h-full">
            <Outlet />
          </main>
        </div>
      </div>
      
    </>)
}

export default Layout;
