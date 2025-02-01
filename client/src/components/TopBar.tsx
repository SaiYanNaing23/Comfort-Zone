import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SIgnInOAuthButton from "./SIgnInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const TopBar = () => {
    const { isAdmin } = useAuthStore();
    
    return (
        <div className="flex items-center justify-between p-4 top-0 bg-zinc-900/75 z-10 backdrop-blur-md " >
            <div className='flex gap-2 items-center'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>

        <div className="flex items-center gap-4" >
            {isAdmin && (
                <Link to={"/admin"} 
                    className={cn(
                        buttonVariants( { variant : 'outline' })
                    )}
                >
                    <LayoutDashboardIcon className="size-4 mr-2" />
                    Admin Dashboard
                </Link>
            )}

            <SignedOut>
                <SIgnInOAuthButton />
            </SignedOut>

            <UserButton/>
        </div>
        </div>
    )
}

export default TopBar
