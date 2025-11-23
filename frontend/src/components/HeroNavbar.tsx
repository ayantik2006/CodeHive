import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function HeroNavbar() {
  return (
    <>
      <div className="text-white flex bg-[bg-[#0F0F10]] py-3 px-5 border-b-1 border-[#18191A] justify-between items-center [@media(max-width:1449px)]:hidden sticky bg-[#0f0f10] top-0">
        <div className="font-bold text-[1.4rem] ">CodeHive</div>
        <div className="flex gap-5 text-[rgb(192,192,194)]">
          <div className="cursor-pointer hover:text-white duration-300">
            Product
          </div>
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
        <div className="flex gap-4 text-[0.9rem]">
          <button className="bg-[#15151a] border-2 border-[#1E1F20] px-4 py-2 rounded-[0.6rem] cursor-pointer">
            Try Demo
          </button>
          <button className="bg-[#512fa2] py- px-4 rounded-[0.6rem] font-semibold cursor-pointer duration-300 hover:bg-[#4c2c96]">
            Start Coding
          </button>
        </div>
      </div>

      <div className="text-white flex bg-[bg-[#0F0F10]] py-3 px-5 border-b-1 border-[#18191A] justify-between items-center [@media(min-width:1449px)]:hidden w-full sticky bg-[#0f0f10] top-0">
        <div className="font-bold text-[1.4rem]">CodeHive</div>
        <Sheet>
          <SheetTrigger>
            <button>
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[#0F0F10] border-0 text-[#C0C0C2] flex flex-col gap-5 items-center justify-center">
            <div className="hover:white duration-300 cursor-pointer">Product</div>
            <div className="hover:white duration-300 cursor-pointer">Classroom</div>
            <div className="hover:white duration-300 cursor-pointer">Docs</div>
            <div className="hover:white duration-300 cursor-pointer">Blog</div>
            <div className="hover:white duration-300 cursor-pointer text-[#683dce] font-semibold text-[1.1rem] hover:font-bold">Start Coding</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default HeroNavbar;
