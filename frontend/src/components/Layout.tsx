import React from "react";
import {Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (<>
    <div className="md:mx-16 lg:mx-32 md:mx-16 lg:mx-32">
        <div className="min-h-screen flex flex-col bg-white">
          <main className="flex flex-col flex-1 w-full lg:w-[768px] md:w-[768px] h-full ml-auto mr-auto shadow">
            <Outlet />
          </main>
        </div>
      </div>
      
    </>)
}

export default Layout;
