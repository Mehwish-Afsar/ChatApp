import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useChatStore } from '../store/chatStore'
import { LogOutIcon, Volume2, VolumeOff } from 'lucide-react'

const mouseClickSound = new Audio ("/sounds/mouse-click-sound.mp3")

function ProfileHeader() {
    const { logout, updateProfile, authUser } = useAuthStore()
    const { isSoundEnabled, toggleSound } = useChatStore()
const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if(!file) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        
        reader.onloadend = async () => {
            const base64Image = reader.result
            setSelectedImage(base64Image)
            await updateProfile({profilePic: base64Image})
        }
    }

    return (
        <div className='p-6 border-b border-slate-700/50'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className='avatar avatar-online'>
                        <button
                            className='size-14 rounded-full overflow-hidden relative group'
                            onClick={() => fileInputRef.current.click()}

                        >
                            <img
                                src={selectedImage || authUser.profilePic || "/avatar.png"}
                                alt="User Image"
                                className='size-full object-cover'
                            />

                            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                            flex items-center justify-center transition-opacity'>
                                <span className='text-xs text-white'>Change</span>

                            </div>

                        </button>
                        <input
                            type="file"
                            accept='image/*'
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className='hidden'
                        />
                    </div>
                    {/* UserName and online status */}
                    <div>
                        <h3 className='text-slate-200 font-medium text-base max-w-[180] truncate'>
                            {authUser.fullName}
                        </h3>
                        <p className="text-slate-400 text-xs">Online</p>

                    </div>


                </div>

                {/* Button */}
                <div className='flex gap-4 items-center'>
                    {/* Logout Button */}
                    <button
                    onClick={logout} 
                    className="text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        <LogOutIcon className='size-5'/>
                    </button>

                    {/* SoundToggle button */}
                    <button 
                    className="text-slate-400 hover:text-slate-200 transition-colors"
                    onClick={()=>{
                        mouseClickSound.currentTime = 0
                        mouseClickSound.play().catch((error)=>console.log("Auto Play failed" ,error))
                        toggleSound()
                    }}>
                        {isSoundEnabled? <Volume2  className='size-5'/> : <VolumeOff className='size-5' />}
                        
                    </button>

                </div>


            </div>

        </div>
    )
}

export default ProfileHeader
