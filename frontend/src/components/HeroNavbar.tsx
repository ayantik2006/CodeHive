import { Code, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

function HeroNavbar() {
  return (
    <>
      <div className="text-white flex bg-[bg-[#0F0F10]] py-3 px-5 border-b-1 border-[#18191A] justify-between items-center [@media(max-width:1449px)]:hidden sticky bg-[#0f0f10] top-0">
        <div className="font-bold text-[1.4rem] pl-[16rem] ">CodeHive</div>
        <div className="flex gap-8 text-[rgb(192,192,194)] ml-[9rem]">
          <Link to="/">
            <div className="hover:white duration-300 cursor-pointer">
              Product
            </div>
          </Link>
          <div className="cursor-pointer hover:text-white duration-300">
            Classroom
          </div>
          <div className="cursor-pointer hover:text-white duration-300">
            Docs
          </div>
          <div className="cursor-pointer hover:text-white duration-300">
            Blog
          </div>
        </div>
        <div className="flex gap-4 text-[0.9rem] mr-[15rem]">
          <button className="bg-[#15151a] border-2 border-[#1E1F20] px-4 py-2 rounded-[0.6rem] cursor-pointer">
            Try Demo
          </button>
          <Link to="/auth">
            <button className="bg-[#512fa2] px-4 py-2 rounded-[0.6rem] font-semibold cursor-pointer duration-300 hover:bg-[#4c2c96]">
              <p className="flex items-center gap-1">
                <Code />
                Start Coding
              </p>
            </button>
          </Link>
        </div>
      </div>

      <div className="text-white flex bg-[bg-[#0F0F10]] py-3 px-5 border-b-1 border-[#18191A] justify-between items-center [@media(min-width:1449px)]:hidden w-full sticky bg-[#0f0f10] top-0">
        <div className="font-bold text-[1.4rem]">CodeHive</div>
        <Sheet>
          <SheetTrigger>
            <button className="cursor-pointer">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[#0F0F10] border-0 text-[#C0C0C2] flex flex-col gap-5 items-center justify-center">
            <Link to="/">
              <div className="hover:white duration-300 cursor-pointer">
                Product
              </div>
            </Link>
            <div className="hover:white duration-300 cursor-pointer">
              Classroom
            </div>
            <div className="hover:white duration-300 cursor-pointer">Docs</div>
            <div className="hover:white duration-300 cursor-pointer">Blog</div>
            <Link to="/auth">
              <div className="hover:white duration-300 cursor-pointer text-[#683dce] font-semibold text-[1.1rem] hover:font-bold">
                Start Coding
              </div>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default HeroNavbar;
