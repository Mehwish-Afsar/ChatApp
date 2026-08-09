import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],

    activeTab: "chats",
    selectedUser: null,

    isUserLoading: false,
    isMessageLoading: false,

    isSoundEnabled:
        JSON.parse(localStorage.getItem("isSoundEnabled") || "true"),

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true });

        try {
            const res = await axiosInstance.get("/messages/contact");

            set({
                allContacts: res.data,
            });
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUserLoading: true });

        try {
            const res = await axiosInstance.get("/messages/chat");

            set({
                chats: res.data,
            });
        } finally {
            set({ isUserLoading: false });
        }
    },
}));