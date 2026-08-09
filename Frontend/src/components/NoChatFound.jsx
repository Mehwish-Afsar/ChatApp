import React from 'react'
import { useChatStore } from '../store/chatStore'
import { MessageCircleIcon } from 'lucide-react'

function NoChatFound() {
    const {setActiveTab} = useChatStore()
    return (
        <div className='flex flex-col items-center justify-center py-10 text-center space-y-4'>
            <div className="h-16 w-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
            <MessageCircleIcon className='w-8 h-8 text-cyan-400'/>
            </div>
            <div>
                <h4 className="text-slate-200 font-medium mb-1">No Conversation yet</h4>
                <p className="text-slate-400 text-sm px-4">
                    Start a new chat by selecting a a contact from the contact tab.
                </p>
            </div>
            <button 
            onClick={() => setActiveTab("contacts")}
            className="px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded lg hover:bg-cyan-500/10 transition-colors">
            Find Contacts
            </button>
            
        </div>
    )
}

export default NoChatFound
