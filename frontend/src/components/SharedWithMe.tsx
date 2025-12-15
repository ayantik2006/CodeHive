import { useEffect, useState } from "react";
import MainNavbar from "./MainNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MainFooter from "./MainFooter";

function SharedWithMe() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [sharedProjects, setSharedProjects] = useState([]);

  useEffect(() => {
    document.title = "Shared With Me - CodeHive";
    axios
      .post(
        BACKEND_URL + "/project/shared-with-me",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setSharedProjects([...res.data.sharedProjects].reverse());
      })
      .catch((e) => {
        if (e.response.status === 401) navigate("/");
        console.log(e);
      });
  }, [BACKEND_URL, navigate]);

  return (
    <div className="flex flex-col bg-[#0F0F10] h-[100vh] items-center justify-cente bg-[url('../../grid.svg')] px-10">
      <div className="fixed top-0 w-full">
        <MainNavbar />
      </div>

      <div className="bg-[#0F0F10] border-1 border-[#32333b] w-full min-h-[3rem] mt-[8rem] flex flex-col gap-2 mb-10">
        <div className="h-[3rem] flex justify-between items-center text-white w-full bg-[#0C0E15] px-10">
          <p className="flex-2 font-bold">Project</p>
          <p className="flex-2 font-bold">Owner</p>
          <p className="flex-1 font-bold"></p>
        </div>
        {
          sharedProjects.length === 0 && (
            <div className="text-white p-5">
              No projects have been shared with you.
            </div>
          )
        }
        {sharedProjects.map((project, index) => {
          return (
            <div className="flex text-white items-center p-5 py-3 bg-[#282727]">
              <div className="flex-2">{project.name}</div>
              <div className="flex-2">{project.owner}</div>
              <div className="flex-1 flex gap-2 items-center">
                <button
                  className="bg-[#4E29A4] px-3 py-1 rounded-[0.3rem] cursor-pointer font-semibold"
                  onClick={() => {
                    navigate("/editor/" + project._id);
                  }}
                >
                  Open
                </button>
                <Dialog>
                  <DialogTrigger>
                    <button className="border-red-600 border-2 px-3 py-1 rounded-[0.3rem] cursor-pointer font-semibold text-red-600">
                      Delete
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0C0E15] border-1 border-[#13151B] text-white">
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. You will permanently lose
                        access to this project.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose asChild>
                      <button
                        className="bg-red-600 px-3 py-1 rounded-[0.3rem] cursor-pointer font-semibold text-white w-[5rem] ml-auto"
                        onClick={async () => {
                          try {
                            const res = await axios.post(
                              BACKEND_URL + "/project/remove-access",
                              { projectId: project._id },
                              { withCredentials: true }
                            );
                            setSharedProjects(
                              [...res.data.sharedProjects].reverse()
                            );
                          } catch (e) {
                            if (e.response.status === 401) navigate("/");
                          }
                        }}
                      >
                        Delete
                      </button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full"><MainFooter/></div>
    </div>
  );
}

export default SharedWithMe;
