import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom";
import LeftSIdeBar from "./components/LeftSIdeBar";
import FriendActivities from "./components/FriendActivities";
import AudioPlayer from "./components/AudioPlayer";
import PlayBackControls from "./components/PlayBackControls";
const MainLayout = () => {
    const isMobile = false;
    return (
        <div className="h-screen bg-black text-white flex flex-col">
        <ResizablePanelGroup direction='horizontal' className="flex-1 flex h-full overflow-hidden p-2 " >
            <AudioPlayer/>
            {/* Left Side Bar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30} >
                <LeftSIdeBar/>
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* Main Content */}
            <ResizablePanel defaultSize={ isMobile ? 80 : 60 }>
                <Outlet/>
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* Right Side Bar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} >
                <FriendActivities/>
            </ResizablePanel>
        </ResizablePanelGroup>

        <PlayBackControls/>
        </div>
    )
}

export default MainLayout
