import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
