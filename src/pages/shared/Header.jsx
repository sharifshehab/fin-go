import React, { useState } from "react";

// react icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Container from "../../components/Container";

const Header = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)


  return (
    <header className="bg-[#2176ff] py-2.5">
      <Container>
        <nav
          className="flex items-center justify-between w-full relative">

          {/* logo */}
         <h2 className="text-white text-3xl">FinGo</h2>

          {/* nav links */}
          {/* <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">

        <li className="flex items-center hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
          <AiOutlineFire
            className="text-[1.1rem] group-hover:text-[#3B9DF8] text-gray-600" />
          Features
        </li>
        <li className="flex items-center hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
          <BiSupport className="text-[1.1rem] group-hover:text-[#3B9DF8] text-gray-600" />
          Support
        </li>

      </ul> */}

          {/* user account */}
          <div className="flex items-center gap-[15px]">
            <div className="flex items-center gap-[10px] cursor-pointer relative"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
                  alt="avatar" className="w-[35px] h-[35px] rounded-full object-cover" />
                <div
                  className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
              </div>

              <h1 className="text-white sm:block hidden">Dhon
                Deo</h1>

              <div
                className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}>
                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                  <FiUser />
                  View Profile
                </p>
                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                  <IoSettingsOutline />
                  Settings
                </p>

                <div className="mt-3 border-t border-gray-200 pt-[5px]">
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                    <TbLogout2 />
                    Logout
                  </p>
                </div>

              </div>

              <IoIosArrowUp
                className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-white sm:block hidden`} />

            </div>

            <CiMenuFries onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex" />
          </div>

          {/* mobile sidebar */}
          {/* <aside
        className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-white p-4 text-center absolute top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}>
        <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li onClick={() => setIsMegaMenuCollapse(!isMegaMenuCollapse)}
            className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
            Products
            <IoIosArrowDown
              className={`${isMegaMenuCollapse ? "rotate-0" : "rotate-[180deg]"} text-gray-600 group-hover:text-[#3B9DF8] transition-all duration-300`} />
          </li>

          <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-poin ter capitalize">Features
          </li>
          <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">Support</li>
        </ul>
      </aside> */}
        </nav>
      </Container>
    </header>
  );
};

export default Header;