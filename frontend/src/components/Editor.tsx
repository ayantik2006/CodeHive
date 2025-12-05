import { useParams } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { CircleAlert, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import emptyProject from "../assets/emptyProject.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Alert, AlertDescription } from "./ui/alert";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import isValidFilename from "valid-filename";

function Editor() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [IsFileExist, setIsFileExist] = useState(false);
  const languageExtension = {
    nodejs: ".js",
    python: ".py",
    cpp: ".cpp",
    java: ".java",
  };

  useEffect(() => {
    axios
      .post(
        BACKEND_URL + "/project/get-project-details",
        { id: projectId },
        { withCredentials: true }
      )
      .then((res) => {
        setProjectDetails({
          ...res.data.projectDetails,
          files: res.data.projectDetails.files.reverse(),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [BACKEND_URL, projectId]);

  return (
    <div className="flex flex-col bg-[#0F0F10] min-h-screen overflow-hidden">
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

      <div className="w-full flex-1 p-4 flex flex-col text-white">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border-2 border-[#1C1D24] h-full w-full flex-1 max-h-[36.6rem]"
        >
          <ResizablePanel
            defaultSize={10}
            className="flex max-w-[15.5rem] min-w-[2rem]"
          >
            <div className="flex flex-col h-full items-center px-6 py-4 w-[11rem] w-full">
              <div className="text-white font-bold text-[1.1rem] flex flex-col gap-3 justify-start w-full max-w-[12rem]">
                <p className="text-gray-500 text-[0.84rem]">FILE EXPLORER</p>
                <p className="text-[1.3rem]">{projectDetails.name}</p>
                <Dialog
                  onOpenChange={(e) => {
                    if (e) setIsFileExist(false);
                  }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <DialogTrigger asChild>
                      <button className="font-semibold text-[0.9rem] flex items-center gap-2 bg-[#4E29A4] pl-5 py-1 rounded-[0.4rem]  duration-300 hover:opacity-85 cursor-pointer w-[8.4rem]">
                        <SquarePlus size={18} /> <p>New File</p>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#0C0E15] border-1 border-[#1C1D24] text-white">
                      <DialogHeader>
                        <DialogTitle>New File</DialogTitle>
                        <DialogDescription>
                          Create a new file here. Just write the file name
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const fileName = e.currentTarget[0].value;
                          if (fileName.trim() === "") {
                            toast("Invalid file name!", {
                              style: {
                                border: "2px solid red",
                              },
                            });
                            return;
                          }
                          if (!isValidFilename(fileName) || fileName.includes(".")) {
                            toast("Invalid file name!", {
                              style: {
                                border: "2px solid red",
                              },
                            });
                            return;
                          }

                          try {
                            const response = await axios.post(
                              BACKEND_URL + "/project/create-file",
                              {
                                projectId: projectId,
                                fileName:
                                  e.currentTarget[0].value +
                                  languageExtension[projectDetails.language],
                              },
                              { withCredentials: true }
                            );
                            setProjectDetails({
                              ...response.data.projectDetails,
                              files:
                                response.data.projectDetails.files.reverse(),
                            });
                            toast(
                              `File "${
                                fileName +
                                languageExtension[projectDetails.language]
                              }" created`
                            );
                            setIsFileExist(true);
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name-1">File name</Label>
                            <div className="flex gap-2 items-start">
                              <div className="flex flex-col w-full">
                                <Input
                                  id="name-1"
                                  name="name"
                                  placeholder="File name"
                                  className="selection:bg-blue-700 w-full"
                                  required
                                  onInput={(e) => {
                                    const fileName =
                                      e.currentTarget.value.trim() +
                                      languageExtension[
                                        projectDetails.language
                                      ];
                                    for (let file of projectDetails.files) {
                                      if (file.name === fileName) {
                                        setIsFileExist(true);
                                        break;
                                      } else {
                                        setIsFileExist(false);
                                      }
                                    }
                                  }}
                                />
                                {IsFileExist && (
                                  <Alert
                                    variant="default"
                                    className="bg-transparent border-none p-0"
                                  >
                                    <AlertDescription className="text-[#D1010C] font-semibold ml-1 mt-2 flex">
                                      <CircleAlert
                                        size={17}
                                        className="mt-[0.12rem]"
                                      />
                                      File already exists!
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>

                              <div className="bg-[#5c5b5b] py-[0.4rem] px-4 font-semibold rounded-[0.4rem]">
                                {languageExtension[projectDetails.language]}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="mt-5">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="bg-[#17171D] border-1 border-[#2c2e3f] hover:bg-[#17171D] hover:text-white cursor-pointer"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            className={`bg-[#4E29A4] hover:bg-[#43238d] cursor-pointer px-5 ${
                              IsFileExist
                                ? "bg-gray-500 pointer-events-none"
                                : ""
                            }`}
                          >
                            Create
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>

              <div className="flex flex-col gap-2 w-full mt-3 overflow-y-auto overflow-x-hidden max-h-full scrollbar-thin scrollbar-track-[#000]">
                {projectDetails?.files?.length === 0 && (
                  <div className="flex flex-col items-center mt-[10rem] text-[]">
                    <img src={emptyProject} className="w-[2rem]" />
                    <p className="text-gray-400 italic text-center">
                      No files to show
                    </p>
                  </div>
                )}

                {projectDetails?.files?.map((file, index) => {
                  return (
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <div
                          className="bg-[#1c1d2d h-fit py-1 rounded-[0.3rem] px-2 text-[0.9rem] flex items-center justify-start w-fit min-w-[12.5rem] cursor-pointer hover:bg-[#1C1D24]"
                          key={index}
                        >
                          <div className="mr-1 bg-[#3C210E] text-[#E27311] rounded-[0.2rem] px-1 font-bold">
                            {languageExtension[projectDetails.language]
                              .toUpperCase()
                              .slice(1)}
                          </div>
                          <p className="text-gray-300 ml-1 wrap-anywhere">
                            {file.name}
                          </p>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="bg-[#0C0E15] text-white border-1 border-[#1C1D24]">
                        <ContextMenuItem className="hover:bg-[#191d2a] cursor-pointer data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-white" onClick={()=>{
                            
                        }}>
                          Rename "{file.name}"
                        </ContextMenuItem>
                        <ContextMenuItem className="text-[#D65658] hover:bg-[#0C0E15] cursor-pointer data-[highlighted]:bg-[#1C1D24] data-[highlighted]:text-[#c85153]" onClick={async ()=>{
                            try{
                                const response=await axios.post(BACKEND_URL+"/project/delete-file",{id:projectDetails._id,fileName:file.name},{withCredentials:true});
                                setProjectDetails({...response.data.projectDetails,files:response.data.projectDetails.files.reverse()});
                            }
                            catch(e){
                                console.log(e);
                            }
                        }}>
                          Delete "{file.name}"
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  );
                })}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-[#1C1D24] w-1" />

          <ResizablePanel defaultSize={50} className="">
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>

              <ResizableHandle className="bg-[#1C1D24]" />

              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <MainFooter />
    </div>
  );
}

export default Editor;
