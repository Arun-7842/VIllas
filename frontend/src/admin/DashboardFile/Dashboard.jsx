import React from "react";
import AdminMenu from "../AdminMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <section className="bg-white">
        <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
          <div className="sticky top-0 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block border-r">
            <AdminMenu />
          </div>
          <div className="bg-body-bg_body-color min-h-[96vh]">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
