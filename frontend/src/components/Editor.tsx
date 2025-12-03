import { useParams } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { FilePlus } from "lucide-react";

function Editor() {
  const { projectId } = useParams();

  return (
    <div className="flex flex-col bg-[#07080D] min-h-screen">
      <MainNavbar />

      <div className="w-full flex-1 p-4 flex flex-col text-white">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border-2 border-[#1C1D24] h-full w-full flex-1"
        >
          <ResizablePanel defaultSize={10}>
            <div className="flex flex-col h-full items-center px-6 py-6">
              <div className="text-white font-bold text-[1.1rem] flex flex-col gap-3 items-center">
                <p>Test Project</p>
                <button className="font-semibold text-[0.9rem] flex items-center gap-1 bg-[#1C1D24] px-8 py-2 rounded-[0.4rem] text-[#838590] duration-300 hover:opacity-85 cursor-pointer">
                    <FilePlus size={18}/> <p>New File</p>
                </button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-[#1C1D24] w-1"/>

          <ResizablePanel defaultSize={50} className="">
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>

              <ResizableHandle className="bg-[#1C1D24]"/>

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
