import { Bell, Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MainNavbar() {
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();

  return (
    <div className="h-[4rem] border-b-1 border-[#1C1D24] flex gap-5 items-center justify-between sticky top-0 bg-[#07080D]">
      <div className="flex gap-7 text-[#B6BBC8] ml-[2rem] [@media(max-width:497px)]:hidden">
        <div className="hover:text-white duration-300 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="hover:text-white duration-300 cursor-pointer">
          Projects
        </div>
        <div className="hover:text-white duration-300 cursor-pointer">
          Teams
        </div>
        <div className="hover:text-white duration-300 cursor-pointer">
          Settings
        </div>
      </div>
      <div className="[@media(min-width:497px)]:hidden">
        <Sheet>
          <SheetTrigger>
            <button className="cursor-pointer">
              <Menu className="text-[#B6BBC8] ml-[1rem] cursor-pointer" />
            </button>
          </SheetTrigger>
          <SheetContent
            className="bg-[#0F0F10] border-0 text-[#C0C0C2] flex flex-col gap-5 items-center justify-center"
            side="left"
          >
            <Link to="/dashboard">
              <div className="hover:white duration-300 cursor-pointer">
                Dashboard
              </div>
            </Link>
            <div className="hover:white duration-300 cursor-pointer">
              Projects
            </div>
            <div className="hover:white duration-300 cursor-pointer">Teams</div>
            <div className="hover:white duration-300 cursor-pointer">
              Settings
            </div>
            <div className="flex gap-3 text-[0.9rem] text-gray-500 mt-[1rem]">
              <div className="hover:text-gray-300 duration-300">Docs</div>
              <div className="hover:text-gray-300 duration-300">Status</div>
              <div className="hover:text-gray-300 duration-300">Community</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex gap-4 mr-[2rem] items-center">
        <Bell className="fill-[#B6BBC8] stroke-[#B6BBC8] cursor-pointer duration-300 hover:fill-[#4E29A4] hover:stroke-[#4E29A4]" />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-48 bg-[#0f0f14] border border-white/10"
          >
            <DropdownMenuLabel className="text-gray-300">
              Signed in as
              <br />
              <span className="font-semibold">ayantik@example.com</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer text-white data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white duration-300">
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer text-white data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white duration-300">
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-400 cursor-pointer data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-red-300"
              onClick={async ()=>{
                try{
                  await axios.post(BACKEND_URL+"/auth/logout",{},{withCredentials:true});                  
                  navigate("/");
                }
                catch(e){
                  console.log(e);
                }
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default MainNavbar;
