import React, { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import { useAuthStore } from "../store/authStore";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";
import { useRef } from "react";

function ChatContainer() {
  const {
    getMessageByUserId,
    selectedUser,
    messages,
    isMessageLoading,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null)

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessageByUserId(selectedUser._id);
    subscribeToMessage()

    // Clean up
    return() => unsubscribeFromMessage()
  }, [selectedUser, getMessageByUserId, subscribeToMessage, unsubscribeFromMessage]);

  return (
    <div className="flex flex-col h-full">

      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length > 0 && !isMessageLoading ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${
                msg.senderId === authUser._id
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble relative ${
                  msg.senderId === authUser._id
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-200"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Message"
                    className="max-w-[250px] rounded-lg"
                  />
                )}

                {msg.text && (
                  <p className="mt-2">
                    {msg.text}
                  </p>
                )}

                <p className="text-xs mt-1 flex items-center gap-1 opacity-75">
                  {new Date(msg.createdAt)
                    .toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit"

                    })
                  }
                </p>
              </div>
              <div ref={messageEndRef}></div>
            </div>

          ))
        )
          : isMessageLoading ? (
            <MessageLoadingSkeleton />
          ) : (
            <NoChatHistoryPlaceholder
              name={selectedUser.fullName}
            />
          )}
      </div>

      {/* Input */}
      <MessageInput />

    </div>
  );
}

export default ChatContainer;