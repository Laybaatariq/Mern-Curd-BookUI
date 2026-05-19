import React from "react";

const Navbar = () => {
   

    return (
        <div className="w-full flex justify-between h-15 items-center bg-gray-200 shadow px-5" >
            <div className="w-[10%] h-full flex items-center gap-8">
                <h1 className="text-2xlfont-bold text-sky-400 ">Books</h1>
            </div>
                <div className="w-[50%] h-full ">   
                <ul className="w-full h-full flex items-center justify-around list-none text-zinc-800 font-medium">
                    <li><a href="/" className="hover:text-blue-500">Home</a></li>
                    <li><a href="/about" className="hover:text-blue-500">About</a></li>
                    <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
                </ul>
                </div>
        </div>)
};

export default Navbar;


