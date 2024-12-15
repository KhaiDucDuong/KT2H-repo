import { Client } from "@stomp/stompjs";
import { Message, Reaction } from "./message";
import { SocketInvitationNotification } from "./notification";
import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "./user";
import { Setting } from "./setting";
import { ShowNavbarModalType } from "@/components/Dashboard/SideNavbar/SideNavbar";

type ISocketContext = {
  stompClient: Client | undefined;
  newConversationMessage: Message | null;
  updateConversationMessage: Reaction | null;
  setNewConversationMessage: Dispatch<
    SetStateAction<Message | null>
  >;
  setUpdatedMessage: Dispatch<
  SetStateAction<Reaction | null>
  >;
  newSocketInvitationNotifications: SocketInvitationNotification[];
  setSocketNewInvitationNotifications: Dispatch<
    SetStateAction<SocketInvitationNotification[]>
  >;
};

export const SocketContext = createContext<ISocketContext | null>(null);

type IUserSessionContext = {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  userSetting: Setting | undefined;
  setUserSetting: Dispatch<SetStateAction<Setting | undefined>>;
}

export const UserSessionContext = createContext<IUserSessionContext | null>(null);

type INavbarContext = {
  showNavbarModalType: ShowNavbarModalType;
  setShowNavbarModalType: Dispatch<SetStateAction<ShowNavbarModalType>>;
}

export const NavbarContext = createContext<INavbarContext | null>(null);