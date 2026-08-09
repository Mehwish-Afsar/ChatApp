import { create } from "zustand"
import axios from "axios";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })

        } catch (error) {
            console.log("Error in Auth Check", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)

            set({ authUser: res.data })
            toast.success("Account Created Successfully!")

        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false })
        }

    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)

            set({ authUser: res.data })
            toast.success("Logged In Successfully!")

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false })
        }

    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({ authUser: null })

            toast.success("Logged Out Successfully!")

        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
            console.log("Error logout", error)
        }

    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data })
            toast.success("Image Uploaded Successfully!")

        } catch (error) {
            toast.error(error.response?.data?.message || "Image Upload failed");
            console.log("image uplaod error",error)
        } 
    },



}))