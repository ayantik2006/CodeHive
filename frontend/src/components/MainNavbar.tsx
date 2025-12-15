import { Bell, Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

function MainNavbar() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      axios
        .post(BACKEND_URL + "/auth/user-info", {}, { withCredentials: true })
        .then((res) => {
          setUserData(res.data.userData);
        });
    } catch (e) {
      console.log(e);
    }
  }, [BACKEND_URL]);

  return (
    <div className="h-[4rem] border-b-1 border-[#1C1D24] flex gap-5 items-center justify-between sticky top-0 bg-[#0F0F10]">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0f0f10",
            color: "white",
            border: "3px solid #512FA2",
          },
        }}
      />

      <div className="flex gap-7 text-[#B6BBC8] ml-[2rem] [@media(max-width:502px)]:hidden">
        <div className="hover:text-white duration-300 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <Link to="/access-management">
          <div className="hover:text-white duration-300 cursor-pointer">
            Access Management
          </div>
        </Link>

        <Link to="/shared-with-me">
          <div className="hover:text-white duration-300 cursor-pointer">
            Shared with Me
          </div>
        </Link>
      </div>
      <div className="[@media(min-width:503px)]:hidden mr-auto">
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
            <Link to="/access-management">
              <div className="hover:white duration-300 cursor-pointer">
                Access Management
              </div>
            </Link>
            <Link to="/shared-with-me">
              <div className="hover:white duration-300 cursor-pointer">
                Shared with Me
              </div>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex gap-4 mr-[2rem] items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-8 w-8 cursor-pointer font-semibold">
              <AvatarImage src={userData.photoUrl} alt="@shadcn" />
              <AvatarFallback>
                {userData?.name?.split(" ")[0][0] +
                  userData?.name?.split(" ")[
                    userData?.name?.split(" ").length - 1
                  ][0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="bg-[#0f0f14] border border-white/10 w-fit min-w-[13rem]"
          >
            <DropdownMenuLabel className="text-gray-300">
              Signed in as
              <br />
              <span className="font-semibold text-gray-400">
                {userData?.email?.split(" ")[0]}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-[#2a2b34]" />

            <Dialog>
              <DialogTrigger>
                <div className="cursor-pointer text-white w-full duration-300 ml-1 text-[0.88rem]">
                  Change Password
                </div>
              </DialogTrigger>
              <DialogContent className="w-full bg-[#0C0E15] border-1 border-[#1C1D24] text-white">
                <DialogHeader>
                  <DialogTitle>Change Account Password</DialogTitle>
                  <DialogDescription>
                    First enter your old password and then your new password
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await axios.post(BACKEND_URL + "/auth/change-password", {
                        oldPassword: e.currentTarget[0].value,
                        newPassword: e.currentTarget[1].value,
                      },{withCredentials:true});
                      toast("Password changed!");
                    } catch (e) {
                      toast(e.response.data.msg,{
                        style:{
                          border:"3px solid red"
                        }
                      });
                      // toast(e)
                    }
                  }}
                >
                  <label htmlFor="old-pass">Old Password</label>
                  <Input
                    id="old-pass"
                    placeholder="Old Password"
                    required={true}
                  />
                  <label htmlFor="new-pass">New Password</label>
                  <Input
                    id="new-pass"
                    placeholder="New Password"
                    required={true}
                  />
                  {/* <DialogClose asChild> */}
                  <button
                    type="submit"
                    className="bg-[#4E29A4] py-1 font-semibold rounded-[0.4rem] cursor-pointer hover:bg-[#452592] duration-300 mt-2"
                  >
                    Change
                  </button>
                  {/* </DialogClose> */}
                </form>
              </DialogContent>
            </Dialog>

            <DropdownMenuSeparator className="bg-[#2a2b34]" />

            <DropdownMenuItem
              className="text-red-400 cursor-pointer data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-red-300"
              onClick={async () => {
                try {
                  await axios.post(
                    BACKEND_URL + "/auth/logout",
                    {},
                    { withCredentials: true }
                  );
                  navigate("/");
                } catch (e) {
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
