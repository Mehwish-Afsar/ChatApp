import React from 'react'
import { useAuthStore } from '../store/authStore'

function ChatPage() {
    const {logout} = useAuthStore()
    return (
        <div onClick={logout} className="z-10 text-white">
            <button>Logout</button>
        </div>
    )
}

export default ChatPage
