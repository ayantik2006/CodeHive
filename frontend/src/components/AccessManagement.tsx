import { useEffect, useRef, useState } from "react";
import Navbar from "./MainNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import { Toaster, toast } from "sonner";
import { io } from "socket.io-client";
import MainFooter from "./MainFooter";

function AccessManagement() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [accessManagementProjects, setAccessManagementProjects] = useState([]);
  useEffect(() => {
    document.title = "Access Management - CodeHive";
    axios
      .post(
        BACKEND_URL + "/project/access-management",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setAccessManagementProjects(
          [...res.data.accessManagementProjects].reverse()
        );
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) navigate("/");
      });
  }, [BACKEND_URL, navigate]);

  const socketRef = useRef(null);
  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ["polling", "websocket"],
      withCredentials: true,
    });
    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [BACKEND_URL]);

  return (
    <div className="flex flex-col bg-[#0F0F10] h-[100vh] items-center justify-cente bg-[url('../../grid.svg')] ">
      <div className="fixed top-0 w-full">
        <Navbar />
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
        <div className="px-10">
          <div className="bg-[#0F0F10] border-1 border-[#32333b] w-full min-h-[3rem] mt-[4rem] flex flex-col gap-2 mb-10">
            <div className="h-[3rem] flex justify-between items-center text-white w-full bg-[#0C0E15] px-10">
              <p className="flex-2 font-bold">Project</p>
              <p className="flex-2 font-bold">Requested by</p>
              <p className="flex-1 font-bold">Status</p>
            </div>
            {accessManagementProjects.length === 0 && (
              <div className="text-white p-5">Nothing to show here!</div>
            )}
            {accessManagementProjects.map((project, index) => {
              return (
                <div
                  className="flex text-white items-center p-5 py-3 bg-[#282727] px-10"
                  key={project.projectId}
                >
                  <p className="flex-2">{project.projectName}</p>
                  <p className="flex-2">{project.requestedBy}</p>
                  <p className="flex-1">
                    {project.status === "granted" ? (
                      <div className="bg-green-800 w-fit px-2 rounded-[0.4rem] text-green-100 text-[0.85rem]">
                        Access Granted
                      </div>
                    ) : (
                      <button
                        className="bg-[#4E29A4] px-3 py-1 rounded-[0.4rem] font-semibold cursor-pointer"
                        onClick={(e) => {
                          e.currentTarget.style.backgroundColor = "#016630";
                          e.currentTarget.style.pointerEvents = "none";
                          e.currentTarget.innerText = "Access Granted";
                          e.currentTarget.style.color = "#D1FAE5";
                          e.currentTarget.classList = [];
                          e.currentTarget.classList.add(
                            "bg-green-800",
                            "w-fit",
                            "px-2",
                            "rounded-[0.4rem]",
                            "text-green-100",
                            "text-[0.85rem]"
                          );
                          socketRef.current.emit("grant project access", {
                            projectId: project.projectId,
                            requestedBy: project.requestedBy,
                          });
                        }}
                      >
                        Give Access
                      </button>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full"><MainFooter/></div>
    </div>
  );
}

export default AccessManagement;
