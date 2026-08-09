import React from 'react'
import { useAuthStore } from '../store/authStore'
import BorderAnimatedController from '../components/BorderAnimatedController'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatList'
import ContactList from '../components/ContactList'
import ChatContainer from '../components/chatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'
import { useChatStore } from '../store/chatStore'


function ChatPage() {
    const { logout } = useAuthStore()
        const { activeTab, selectedUser } = useChatStore();


    return (

        <div className="w-full flex justify-center items-center bg-slate-900 p-4 text-white">
            <div className="relative w-full max-w-4xl md:h-[600px] h-auto">
                <BorderAnimatedController>
                    {/* Left Side */}
                    <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
                    <ProfileHeader />
                    <ActiveTabSwitch />

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {activeTab === "chats" ? <ChatList /> : <ContactList />}

                    </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
                    {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder /> }

                    </div>

                </BorderAnimatedController>
            </div>
        </div>
    )
}

export default ChatPage
