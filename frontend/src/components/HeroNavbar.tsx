import { Menu } from "lucide-react";

function HeroNavbar() {
  return (
    <>
      <div className="text-white flex bg-[bg-[#0F0F10]] py-3 px-5 border-b-1 border-[#18191A] justify-between items-center [@media(max-width:1449px)]:hidden">
        <div className="font-bold text-[1.4rem]">CodeHive</div>
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

      <div className="text-white flex bg-[bg-[#0F0F10]] py-3 px-5 border-b-1 border-[#18191A] justify-between items-center [@media(min-width:1449px)]:hidden w-full">
        <div className="font-bold text-[1.4rem]">CodeHive</div>
        <button>
          <Menu />
        </button>
      </div>
    </>
  );
}

export default HeroNavbar;
