import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../UserMenu";

const DashboardUser = () => {
  return (
    <div>
      <section className="bg-white">
        <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
          <div className="sticky top-0 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block border-r">
            <UserMenu />
          </div>
          <div className="bg-body-bg_body-color min-h-[96vh]">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardUser;
