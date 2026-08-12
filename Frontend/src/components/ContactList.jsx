import React, { useEffect } from "react";
import { useChatStore } from '../store/chatStore';
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";
import { useAuthStore } from "../store/authStore";


function ContactList() {
    const {
        getAllContacts, allContacts, isUserLoading, setSelectedUser } = useChatStore();

    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);



    if (isUserLoading) return <UsersLoadingSkeleton />;
    return (
        <>
            {allContacts.map((contact) => {
                return (
                    <div
                        key={contact._id}
                        className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20"
                        onClick={() => setSelectedUser(contact)}
                    >
                        {/* TODO: fix the online status and make it work */}
                        <div className="flex items-center gap-3">
                            <div className={`avatar avatar-${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
                                <div className="size-12 rounded-full">
                                    <img
                                        src={contact.profilePic || "/avatar.png"}
                                        alt={contact.fullName}
                                    />
                                </div>
                            </div>

                            <h4 className="text-slate-200 font-medium truncate">
                                {contact.fullName}
                            </h4>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default ContactList
