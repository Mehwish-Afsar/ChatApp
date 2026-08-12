import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./authStore";

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
        } catch (error) {
            toast.error(error.response.data.message)

        }
        finally {
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
        } catch (error) {
            toast.error(error.response.data.message)

        }
        finally {
            set({ isUserLoading: false });
        }
    },

    getMessageByUserId: async (userId) => {
        set({ isMessageLoading: true });

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);

            set({
                messages: res.data,
            });
        }
        catch (error) {
            toast.error(error.response?.data?.message) || "Something Went Wrong"

        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };

        set((state) => ({
            messages: [...state.messages, optimisticMessage],
        }));

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages: messages.concat(res.data)})
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something Went Wrong"
            );

            set({messages: messages})
        }
    },
}));