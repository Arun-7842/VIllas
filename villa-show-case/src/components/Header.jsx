import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoHeader from "../assets/logoHeader.png";
import login from "../assets/login.png";
import AdminMenu from "../admin/AdminMenu";
import { FaUser } from "react-icons/fa";
import UserMenu from "../user/UserMenu";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserRole(user?.role || null);
    };
    getUser();
    window.addEventListener("userLogin", getUser);
    return () => {
      window.removeEventListener("userLogin", getUser);
    };
  }, []);
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleOutSideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [showMenu]);

  return (
    <section className="h-24 lg:h-20 lg:shadow-md sticky px-4 md:px-0 top-0 flex z-40 justify-center flex-col gap-1 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={LogoHeader}
            alt="logoImage"
            width={250}
            height={50}
            className="hidden lg:block"
          />
          <img
            src={LogoHeader}
            alt="logoImage"
            width={220}
            height={40}
            className="lg:hidden"
          />
        </Link>
        <div className="hidden lg:block">
          <ul className="flex items-center justify-between gap-6">
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
          </ul>
        </div>
        <div className="">
          <button
            className="p-3  bg-secondary-200 text-black text-md font-semibold rounded-full"
            onClick={() => setShowMenu(true)}
          >
            <FaUser size={18} />
          </button>
          {showMenu && (
            <div className="relative ">
              <div className="absolute top-5 right-0" ref={menuRef}>
                <div className="bg-white rounded p-4 min-w-64 lg:shadow-lg">
                  {userRole === "Admin" && <AdminMenu />}
                  {userRole === "User" && <UserMenu />}
                  {!userRole && (
                    <div className="flex flex-col gap-6 items-center">
                      <img src={login} alt="login" />
                      <div className="flex items-center w-full gap-2 justify-between">
                        <button
                          className="py-2 px-4 rounded-full w-full border bg-white text-stone-950"
                          onClick={() => navigate("/register")}
                        >
                          Sign-up
                        </button>
                        <button
                          className="py-2 px-4 rounded-full w-full bg-secondary-500 text-stone-950"
                          onClick={() => navigate("/admin-login")}
                        >
                          Sign-in
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LogoHeader from "../assets/logoHeader.png";
// import login from "../assets/login.png";
// import AdminMenu from "../admin/AdminMenu";
// import { FaUser } from "react-icons/fa";
// import UserMenu from "../user/UserMenu";

// const Header = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const menuRef = useRef();
//   const navigate = useNavigate();
//   useEffect(() => {
//     const getUser = () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       setUserRole(user?.role || null);
//     };
//     getUser();
//     window.addEventListener("userLogin", getUser);
//     return () => {
//       window.removeEventListener("userLogin", getUser);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutSideClick = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//     };
//     if (showMenu) {
//       document.addEventListener("mousedown", handleOutSideClick);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleOutSideClick);
//     };
//   }, [showMenu]);

//   return (
//     <section className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex z-40 justify-center flex-col gap-1 bg-white">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link to={"/"}>
//           <img
//             src={LogoHeader}
//             alt="logoImage"
//             width={250}
//             height={50}
//             className="hidden lg:block"
//           />
//           <img
//             src={LogoHeader}
//             alt="logoImage"
//             width={150}
//             height={40}
//             className="lg:hidden"
//           />
//         </Link>
//         <div className="hidden lg:block">
//           <ul className="flex items-center justify-between gap-6">
//             <li>Home</li>
//             <li>About Us</li>
//             <li>Services</li>
//           </ul>
//         </div>
//         <div className="">
//           <button
//             className="p-3  bg-secondary-200 text-black text-md font-semibold rounded-full"
//             onClick={() => setShowMenu(true)}
//           >
//             <FaUser size={18} />
//           </button>
//           {showMenu && (
//             <div className="relative ">
//               <div className="absolute top-5 right-0" ref={menuRef}>
//                 <div className="bg-white rounded p-4 min-w-64 lg:shadow-lg">
//                   {userRole === "Admin" && <AdminMenu />}
//                   <UserMenu />}
//                   {!userRole && (
//                     <div className="flex flex-col gap-6 items-center">
//                       <img src={login} alt="login" />
//                       <div className="flex items-center w-full gap-2 justify-between">
//                         <button
//                           className="py-2 px-4 rounded-full w-full border bg-white text-stone-950"
//                           onClick={() => navigate("/register")}
//                         >
//                           Sign-up
//                         </button>
//                         <button
//                           className="py-2 px-4 rounded-full w-full bg-secondary-500 text-stone-950"
//                           onClick={() => navigate("/admin-login")}
//                         >
//                           Sign-in
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Header;
