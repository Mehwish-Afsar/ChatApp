import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({
                authUser: res.data,
            });

            // Connect socket after authentication
            get().connectSocket();

        } catch (error) {
            console.log("Error in Auth Check", error);

            set({
                authUser: null,
            });
        } finally {
            set({
                isCheckingAuth: false,
            });
        }
    },

    signUp: async (data) => {
        set({
            isSigningUp: true,
        });

        try {
            const res = await axiosInstance.post(
                "/auth/signup",
                data
            );

            set({
                authUser: res.data,
            });

            toast.success("Account Created Successfully!");

            get().connectSocket();

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Signup failed"
            );
        } finally {
            set({
                isSigningUp: false,
            });
        }
    },

    login: async (data) => {
        set({
            isLoggingIn: true,
        });

        try {
            const res = await axiosInstance.post(
                "/auth/login",
                data
            );

            set({
                authUser: res.data,
            });

            toast.success("Logged In Successfully!");

            get().connectSocket();

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            set({
                isLoggingIn: false,
            });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");

            get().disconnectSocket();

            set({
                authUser: null,
            });

            toast.success("Logged Out Successfully!");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Logout failed"
            );

            console.log("Error logout", error);
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put(
                "/auth/update-profile",
                data
            );

            set({
                authUser: res.data,
            });

            toast.success("Image Uploaded Successfully!");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Image Upload failed"
            );

            console.log("image upload error", error);
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();

        if (!authUser) {
            console.log("Cannot connect socket: no authenticated user");
            return;
        }

        if (socket?.connected) {
            console.log("Socket already connected");
            return;
        }

        console.log("Connecting socket...");

        const newSocket = io(BASE_URL, {
            withCredentials: true,
        });

        set({
            socket: newSocket,
        });

        newSocket.on("connect", () => {
            console.log(
                "Socket connected:",
                newSocket.id
            );
        });

        newSocket.on("connect_error", (error) => {
            console.error(
                "Socket connection error:",
                error.message
            );
        });

        newSocket.on("getOnlineUsers", (userIds) => {
            console.log(
                "Online users received:",
                userIds
            );

            set({
                onlineUsers: userIds,
            });
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;

        if (socket?.connected) {
            socket.disconnect();
        }

        set({
            socket: null,
            onlineUsers: [],
        });
    },
}));