import HeroNavbar from "./HeroNavbar.tsx";
import heroEditor from "../assets/heroEditor.png";
import { Badge } from "@/components/ui/badge";
import {
  CloudUpload,
  Code,
  MessageCircle,
  Radio,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MagicCard } from "./ui/magic-card.tsx";

function Hero() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(BACKEND_URL + "/auth/user", {}, { withCredentials: true })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        // navigate("/");
      });
  }, [BACKEND_URL, navigate]);

  return (
    <div className="min-h-screen bg-[#0F0F10] flex flex-col gap-5 [@media(max-width:1449px)]:items-center bg-[url('../../grid.svg')]">
      <HeroNavbar />

      <div className="flex flex-wrap px-[13rem] [@media(max-width:786px)]:px-2 [@media(max-width:786px)]:px-2 justify-between items-center py-[2rem]">
        <div className="flex flex-col gap-4 [@media(max-width:1449px)]:items-center">
          <div className="ml-1 mb-[-1rem] flex gap-2 self-center">
            <Badge variant="secondary" className="bg-[#262626] text-white">
              Built for teams
            </Badge>
            <Badge variant="secondary" className="bg-[#262626] text-white">
              classrooms
            </Badge>
            <Badge variant="secondary" className="bg-[#262626] text-white">
              hack nights
            </Badge>
          </div>
          <p className="text-white text-[4rem] font-bold text-center [@media(max-width:785px)]:text-[3rem]">
            Code. Collaborate. <br />
            Create. Together
          </p>
          <p className="text-[#7A7B7D] text-[1.3rem] ml-1 text-center">
            Real-time collaboration, shared cursors, <br /> cloud saves, and
            one-click runs - no setup.
          </p>
          <div className="flex gap-4 text-[0.9rem] text-white self-center">
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
        <img
          src={heroEditor}
          className="w-[30rem] [@media(max-width:1449px)]:hidden"
        />
      </div>

      <div className="flex flex-wrap gap-5 px-[13rem] [@media(max-width:948px)]:px-2 mt-[-1rem] items-center justify-center mb-5">
        <div className="w-[16rem] h-[12rem] bg-[#151518] border-1 border-gray-800 rounded-[0.7rem] p-5 flex flex-col gap-[1rem] hover:scale-[1.02] duration-300 animate-shine" >
          <h1 className="flex text-white items-center gap-2 text-[1.3rem] font-semibold">
            <Radio size={30} className="text-[#6c41d0]" />
            Real Time
          </h1>
          <p className="text-[#7A7B7D]">
            Code together with your team in real-time
          </p>
        </div>
        <div className="w-[16rem] h-[12rem] bg-[#151518] border-1 border-gray-800 rounded-[0.7rem] p-5 flex flex-col gap-[1rem] hover:scale-[1.02] duration-300">
          <h1 className="flex text-white items-center gap-2 text-[1.3rem] font-semibold">
            <UsersRound size={30} className="text-[#6c41d0] fill-[#6c41d0]" />
            Shared cursors
          </h1>
          <p className="text-[#7A7B7D]">
            See where others are working in the editor
          </p>
        </div>
        <div className="w-[16rem] h-[12rem] bg-[#151518] border-1 border-gray-800 rounded-[0.7rem] p-5 flex flex-col gap-[1rem] hover:scale-[1.02] duration-300">
          <h1 className="flex text-white items-center gap-2 text-[1.3rem] font-semibold">
            <MessageCircle
              size={30}
              className="text-[#6c41d0] fill-[rgb(108,65,208)]"
            />
            Live Chat
          </h1>
          <p className="text-[#7A7B7D]">
            Chat with your collaborators instantly
          </p>
        </div>
        <div className="w-[16rem] h-[12rem] bg-[#151518] border-1 border-gray-800 rounded-[0.7rem] p-5 flex flex-col gap-[1rem] hover:scale-[1.02] duration-300">
          <h1 className="flex text-white items-center gap-2 text-[1.3rem] font-semibold">
            <CloudUpload
              size={30}
              className="text-[#6c41d0] fill-[rgb(108,65,208)]"
            />
            Cloud Saves
          </h1>
          <p className="text-[#7A7B7D]">
            Automatically save and sync your work
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
