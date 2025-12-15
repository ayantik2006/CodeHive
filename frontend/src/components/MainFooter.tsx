import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <div className="sticky bottom-0 bg-[#0F0F10]">
      <div className="h-[3rem] border-t-1 border-[#1C1D24] flex gap-5 items-center ">
        <div className="flex gap-7 text-[#B6BBC8] ml-[2rem]">
          {/* <div className="hover:text-white duration-300 cursor-pointer">
            Docs
          </div>
          <div className="hover:text-white duration-300 cursor-pointer">
            Status
          </div>
          <div className="hover:text-white duration-300 cursor-pointer">
            Community
          </div> */}
          Made with ❤️ by Ayantik
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
