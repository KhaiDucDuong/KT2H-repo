import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { UserIcon, Settings, LogOut, UserRoundPen } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { NavbarContext, SocketContext, UserSessionContext } from "@/types/context";
import { logOut } from "@/services/AuthService";
import MyProfileModal from "../MyProfile/MyProfileModal";
import { ShowNavbarModalType } from "./SideNavbar";

const MyAccountModal = () => {
  const socketContext = useContext(SocketContext);
  const userSessionContext = useContext(UserSessionContext);
  const navbarContext = useContext(NavbarContext);

  useEffect(() => {
    return () => {
      setShowNavbarModalType(ShowNavbarModalType.NONE);
    };
  }, []);

  const handleLogOut = async () => {
    console.log("****Logging out****");
    if (!socketContext?.stompClient) {
      logOut();
    } else {
      socketContext.stompClient.deactivate().then(() => logOut());
    }
  };

  if(!navbarContext) return <div>Missing navbar context</div>
  const {showNavbarModalType, setShowNavbarModalType} = navbarContext;

  if (!userSessionContext || !userSessionContext.currentUser)
    return <div>User context is null or current user is undefined</div>;

  return (
    <section className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Image
            className="rounded-full size-[48px] m-auto hover:cursor-pointer"
            src={
              userSessionContext.currentUser.image === null
                ? "/assets/images/profile-pic.jpg"
                : userSessionContext.currentUser.image
            }
            width={48}
            height={48}
            alt={
              userSessionContext.currentUser.first_name + "'s profile picture"
            }
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-dark-9 text-gray-4 origin-top-left left-full ml-20 -mt-20 shadow-2xl w-60 ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
          align="end"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setShowNavbarModalType(ShowNavbarModalType.PROFILE)}
          >
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setShowNavbarModalType(ShowNavbarModalType.SETTING)}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Setting</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <MyProfileModal
        show={showNavbarModalType === ShowNavbarModalType.PROFILE}
        setShow={setShowNavbarModalType}
      />
    </section>
  );
};

export default MyAccountModal;
