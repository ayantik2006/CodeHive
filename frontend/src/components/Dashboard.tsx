import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";
import {
  Bot,
  CircleAlert,
  CloudCheck,
  FileText,
  FolderPlus,
  Github,
  Globe,
  GlobeLock,
  Plus,
  Radio,
  Terminal,
  UsersRound,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import emptyProject from "../assets/emptyProject.png";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { format } from "timeago.js";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProjectNameAvailable, setIsProjectNameAvailable] = useState(true);
  const languages = {
    cpp: "C++",
    python: "Python",
    nodejs: "JavaScript",
    java: "Java",
  };
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .post(BACKEND_URL + "/auth/user", {}, { withCredentials: true })
      .then(() => {
        navigate("/dashboard");
        try {
          axios
            .post(
              BACKEND_URL + "/auth/user-info",
              {},
              { withCredentials: true }
            )
            .then((res) => {
              setUserData(res.data.userData);
            });
        } catch (e) {
          console.log(e);
        }
        try {
          axios
            .post(
              BACKEND_URL + "/project/get-projects",
              {},
              { withCredentials: true }
            )
            .then((res) => {
              setUserProjects(res.data.projects.reverse());
            });
        } catch (e) {
          console.log(e);
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, [BACKEND_URL, navigate]);

  return (
    <div className="w-screen min-h-screen bg-[#0F0F10] flex flex-col ">
      <MainNavbar />
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
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between [@media(max-width:1013px)]:justify-center bg-gradient-to-b from-[#f5f3f307] to-transparent bg-[url('../../grid.svg')] opacity-[5]">
          <div className="m-8 flex flex-col [@media(max-width:1013px)]:items-center [@media(max-width:1013px)]:text-center">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge
                variant="default"
                className="bg-[#1b1b25] border border-[#2a2a37] flex items-center"
              >
                <Radio />
                Real time collaboration
              </Badge>
              <Badge
                variant="default"
                className="bg-[#1b1b25] border border-[#2a2a37]"
              >
                <CloudCheck />
                Cloud-Sync workflow
              </Badge>
              <Badge
                variant="default"
                className="bg-[#1b1b25] border border-[#2a2a37]"
              >
                <Bot />
                AI assisted coding
              </Badge>
            </div>
            <h1 className="text-white text-[2rem] font-bold [@media(max-width:631px)]:text-[2rem] flex text-shadow-[0_0_px]">
              Welcome back,&nbsp;{" "}
              <p className="bg-gradient-to-r from-[#7233e7] to-[#8d66d5] bg-clip-text text-transparent">
                {userData?.name?.split(" ")[0] || ""}{" "}
              </p>
              👋
            </h1>
            <p className="text-gray-300 text-[1.1rem] [@media(max-width:631px)]:text-[1rem]">
              Continue where you left off, Build, Edit and Collaborate instantly
            </p>
          </div>
          <Dialog
            onOpenChange={(e) => {
              if (e) {
                setIsProjectNameAvailable(true);
              }
            }}
          >
            <DialogTrigger>
              <button className="bg-[#4E29A4] font-bold text-white px-8 py-2 rounded-[0.7rem] m-8 [@media(max-width:1013px)]:hidden duration-300 cursor-pointer hover:bg-[#3a1e7a]">
                Create New Project
              </button>
            </DialogTrigger>
            <DialogContent className="border-[#1C1D24] border-1 bg-[#0c0e15] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Create a new Project
                </DialogTitle>
                <DialogDescription>
                  Give a few details about the project and click on create to
                  continue
                </DialogDescription>
              </DialogHeader>
              <form
                className="flex flex-col gap-3"
                onSubmit={async (e) => {
                  setIsLoading(true);
                  setIsProjectNameAvailable(false);
                  e.preventDefault();
                  try {
                    const res = await axios.post(
                      BACKEND_URL + "/project/create-project",
                      {
                        projectName: e.currentTarget[0].value,
                        language: e.currentTarget[2].value,
                        visibility: e.currentTarget.visibility.value,
                      },
                      { withCredentials: true }
                    );
                    setIsLoading(false);
                    toast("Project created!");
                    try {
                      axios
                        .post(
                          BACKEND_URL + "/project/get-projects",
                          {},
                          { withCredentials: true }
                        )
                        .then((res) => {
                          setUserProjects(res.data.projects.reverse());
                        });
                    } catch (e) {
                      console.log(e);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <label htmlFor="project-name" className="flex">
                  Project name{" "}
                  <p className="text-[#653fbd] font-bold text-[1.2rem]">
                    &nbsp;*
                  </p>
                </label>
                <Input
                  type="name"
                  placeholder="Name of project"
                  id="project-name"
                  required
                  onInput={(e) => {
                    let projectName = e.currentTarget.value;
                    projectName = projectName.toLowerCase().trim();
                    for (let project of userProjects) {
                      if (projectName === project.name.toLowerCase().trim()) {
                        setIsProjectNameAvailable(false);
                        break;
                      } else setIsProjectNameAvailable(true);
                    }
                  }}
                />
                {!isProjectNameAvailable && (
                  <Alert
                    variant="destructive"
                    className="bg-transparent p-0 border-0"
                  >
                    <AlertDescription className="flex items-center">
                      <CircleAlert size={17} className="mt-[0.1rem]" />
                      <p className="font-semibold">
                        Project with this name already exists
                      </p>
                    </AlertDescription>
                  </Alert>
                )}
                <label htmlFor="" className="flex">
                  Language Support
                  <p className="text-[#653fbd] font-bold text-[1.2rem]">
                    &nbsp;*
                  </p>
                </label>
                <Select required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0C0E15] text-white">
                    <SelectGroup>
                      <SelectItem
                        value="java"
                        className="bg-[#0C0E15] text-white data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white cursor-pointer"
                        color="black"
                      >
                        Java
                      </SelectItem>
                      <SelectItem
                        value="cpp"
                        className="bg-[#0C0E15] text-white data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white cursor-pointer"
                        color="black"
                      >
                        C++
                      </SelectItem>
                      <SelectItem
                        value="python"
                        className="bg-[#0C0E15] text-white data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white cursor-pointer"
                        color="black"
                      >
                        Python
                      </SelectItem>
                      <SelectItem
                        value="nodejs"
                        className="bg-[#0C0E15] text-white data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white cursor-pointer"
                        color="black"
                      >
                        JavaScript (Node)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <label>Visibility</label>
                <div className="flex gap-2 h-[2.6rem]">
                  <div className="bg-[#241840] border-1 border-[#653FBD] flex-1 rounded-[0.4rem] flex flex-col items-center">
                    <div className="flex mx-2 my-2 gap-2 cursor-pointer self-start items-center justify-center">
                      <input
                        type="radio"
                        name="visibility"
                        id="public-visibility"
                        value={"public"}
                        className="mt-[0.07rem] accent-[#54359B] size-[1rem]"
                        defaultChecked
                      />
                      <label
                        htmlFor="public-visibility"
                        className="cursor-pointer font-semibold text-gray-400 flex gap-1 items-center"
                      >
                        Public
                      </label>
                    </div>
                  </div>
                  <div className="bg-[#241840] border-1 border-[#653FBD] flex-2 rounded-[0.4rem]">
                    <div className="flex mx-2 my-2 gap-2 items-center cursor-pointer self-start">
                      <input
                        type="radio"
                        name="visibility"
                        id="collab-visibility"
                        value={"collab"}
                        className="mt-[0.07rem] accent-[#54359B] size-[1rem]"
                      />
                      <label
                        htmlFor="collab-visibility"
                        className="cursor-pointer font-semibold text-gray-400 flex gap-1 justify-between"
                      >
                        <p>Collaborators only</p>
                      </label>
                    </div>
                  </div>
                  <div className="bg-[#241840] border-1 border-[#653FBD] flex-1 rounded-[0.4rem]">
                    <div className="flex mx-2 my-2 gap-2 items-center cursor-pointer self-start">
                      <input
                        type="radio"
                        name="visibility"
                        id="private-visibility"
                        value={"private"}
                        className="mt-[0.07rem] accent-[#54359B] size-[1rem]"
                      />
                      <label
                        htmlFor="private-visibility"
                        className="cursor-pointer font-semibold text-gray-400 flex gap-1"
                      >
                        Private
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-2">
                  <button
                    className={`bg-[#513396] px-3 py-1 rounded-[0.3rem] cursor-pointer hover:bg-[#432b7c] duration-300 flex items-center gap-2 ${
                      isLoading ? "bg-gray-600" : ""
                    } ${isLoading ? "pointer-events-none" : ""} ${
                      isProjectNameAvailable
                        ? ""
                        : "pointer-events-none bg-gray-500"
                    }`}
                    type="submit"
                  >
                    {isLoading && <Spinner />}{" "}
                    <p>{isLoading ? "Creating..." : "Create"}</p>
                  </button>
                  <DialogClose asChild>
                    <button
                      className="bg-[#17171d] border-1 border-[#272831] px-3 py-1 rounded-[0.3rem] cursor-pointer hover:bg-[#272831] duration-300"
                      type="button"
                    >
                      Cancel
                    </button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-8 flex-wrap mx-8 [@media(max-width:928px)]:justify-center mb-5 mt-[-0.8rem]">
          <div className="w-[13rem] h-[3rem] bg-[#0D0D13] border-[#18191F] border-2 rounded-xl flex items-center justify-center gap-2   hover:shadow-[0_0_10px_#4E29A4] duration-300 cursor-pointer hover:-translate-y-[0.1rem] transition-all">
            <FolderPlus className="stroke-[#4E29A4]" size={"22px"} />
            <p className="text-[#acabab] text-[1rem] font-semibold">
              Create New Project
            </p>
          </div>
          <div className="w-[13.5rem] h-[3rem] bg-[#0D0D13] border-[#18191F] border-2 rounded-xl flex items-center justify-center gap-2  hover:shadow-[0_0_10px_#4E29A4] duration-300 cursor-pointer hover:-translate-y-[0.1rem] transition-all">
            <Github className="stroke-[#ffffff] fill-black" size={"21px"} />
            <p className="text-[#acabab] text-[1rem] font-semibold">
              Import from GitHub
            </p>
          </div>
          <div className="w-[12.5rem] h-[3rem] bg-[#0D0D13] border-[#18191F] border-2 rounded-xl flex items-center justify-center gap-2  hover:shadow-[0_0_10px_#4E29A4] duration-300 cursor-pointer hover:-translate-y-[0.1rem] transition-all">
            <UsersRound className="stroke-[#4E29A4]" size={"22px"} />
            <p className="text-[#acabab] text-[1rem] font-semibold">
              Create New Team
            </p>
          </div>
          <div className="w-[9rem] h-[3rem] bg-[#0D0D13] border-[#18191F] border-2 rounded-xl flex items-center justify-center gap-2 duration-300 cursor-pointer hover:shadow-[0_0_10px_#4E29A4] hover:-translate-y-[0.1rem] transition-all">
            <FileText className="stroke-[#4E29A4]" size={"21px"} />
            <p className="text-[#acabab] text-[1rem] font-semibold [@media(max-width:632px)]:text-[1rem] ">
              View Docs
            </p>
          </div>
        </div>
        <div className="flex-1 flex text-white mx-8 ">
          <div
            className="min-h-full w-full rounded-lg border-1 border-[#1C1D24] mb-2 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]
"
          >
            {/* <ResizablePanel
              defaultSize={25}
              className="flex flex-col items-center m-2"
            >
              <h1 className="text-white text-[1.3rem] font-bold mt-[0.6rem] text-center">
                Recent Activity
              </h1>
              <div className="text-gray-400  mt-4 italic text-center flex flex-col items-center mt-15">
                <img src={emptySVG} className="w-[20rem] mb-5 opacity-45" />
                <p>No activity to show</p>
              </div>
            </ResizablePanel> */}
            {/* <ResizableHandle className="bg-[#1C1D24]  data-panel-resize-handle:bg-black" /> */}
            <div
              // defaultSize={75}
              className="m-2 flex flex-col items-center"
            >
              <h1 className="text-white text-[1.3rem] font-bold mt-[0.6rem] text-center mb-4">
                Your Projects
              </h1>
              {userProjects.length === 0 && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="text-gray-400 italic text-center flex flex-col items-center mt-[3rem]">
                    <img src={emptyProject} className="w-[4rem]" />
                    <p>You have no projects. Click below to create one</p>
                  </div>
                  <button className="text-gray-300 mt-3 font-semibold bg-[#23242c] py-3 rounded-[0.4rem] text-[1rem] flex gap-1 items-center justify-center cursor-pointer hover:opacity-85 duration-300 w-[8rem] h-[2.3rem]">
                    <Plus className="mt-[0.2rem]" size={20} />
                    Create
                  </button>
                </div>
              )}
              <div className="flex flex-wrap flex-1 gap-2 w-full px-4">
                {userProjects.length !== 0 &&
                  userProjects.map((project, index) => {
                    return (
                      <div
                        className="w-fit h-fit p-4 bg-[#15151e] rounded-[0.3rem] border-2 border-[#222231] hover:scale-[1.01] duration-100"
                        key={project._id}
                      >
                        <h2 className="font-semibold">{project.name}</h2>
                        <div className="flex items-center">
                          <Badge className="bg-[#3C210E] text-[#E29017] mt-2">
                            {languages[project.language]}
                          </Badge>
                          <p className="mt-2 text-[#737376] ml-2 text-[0.9rem]">
                            {project.editedTime === 0
                              ? `Created ${format(project.creationTime)}`
                              : `Edited ${format(project.editedTime)}`}
                          </p>
                          <Avatar className="h-8 w-8 mt-2 ml-10">
                            <AvatarFallback className="text-black font-semibold">
                              {userData?.name?.split(" ")[0][0] +
                                userData?.name?.split(" ")[
                                  userData?.name?.split(" ").length - 1
                                ][0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex items-center mb-[-0.3rem] mt-1 gap-2">
                          <button className="bg-[#4E29A4] px-2 py-1 border-1 border-[#22242c] rounded-[0.4rem] text-[0.85rem] cursor-pointer font-semibold" onClick={()=>{
                            navigate("/editor/"+project._id);
                          }}>
                            Open
                          </button>
                          <Dialog>
                            <DialogTrigger>
                              <button className="bg-[#8d090c] px-2 py-1 border-1 border-[#22242c] rounded-[0.4rem] text-[0.85rem] cursor-pointer font-semibold">
                                Delete
                              </button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#0C0E15] text-white border-1 border-[#17181D]">
                              <DialogHeader>
                                <DialogTitle className="text-white">
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this project and all of its
                                  data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex gap-3 flex-row-reverse">
                                <button
                                  className="bg-[#8D090C] px-2 py-1 rounded-[0.3rem] font-semibold hover:bg-[#80090b] cursor-pointer duration-300"
                                  onClick={async () => {
                                    try {
                                      await axios.post(
                                        BACKEND_URL + "/project/delete-project",
                                        { id: project._id },
                                        { withCredentials: true }
                                      );
                                      try {
                                        axios
                                          .post(
                                            BACKEND_URL +
                                              "/project/get-projects",
                                            {},
                                            { withCredentials: true }
                                          )
                                          .then((res) => {
                                            setUserProjects(
                                              res.data.projects.reverse()
                                            );
                                          });
                                      } catch (e) {
                                        console.log(e);
                                      }
                                      toast(`Project "${project.name}" deleted!`);
                                    } catch (e) {
                                      console.log(e);
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                                <DialogClose asChild>
                                  <button className="bg-[#17171D] px-2 py-1 rounded-[0.3rem] border-1 border-[#25252e] font-semibold cursor-pointer duration-300">
                                    Cancel
                                  </button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}

export default Dashboard;
