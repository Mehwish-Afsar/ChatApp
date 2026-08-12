import React, { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";
import NoChatFound from "./NoChatFound";
import { useAuthStore } from "../store/authStore";

function ChatList() {
  const {
    getMyChatPartners,
    chats,
    isUserLoading,
    setSelectedUser,
  } = useChatStore();

  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

  if (chats.length === 0) {
    return <NoChatFound />;
  }

  return (
    <>
      {chats.map((chat) => (
        
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20"
          onClick={() => setSelectedUser(chat)}
          
        >
          <div className="flex items-center gap-3">
            <div className={`avatar avatar-${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="w-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>

            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatList;