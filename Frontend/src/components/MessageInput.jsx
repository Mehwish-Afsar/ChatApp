import React, { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/chatStore";
import { ImageIcon, SendIcon, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
    const { playRandomKeyStrokeSound } = useKeyboardSound();
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const fileInputRef = useRef(null);

    const { sendMessage, isSoundEnabled } = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;

        if (isSoundEnabled) {
            playRandomKeyStrokeSound();
        }

        sendMessage({
            text: text.trim(),
            image: imagePreview,
        });

        setText("");
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const removeImg = () => {
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="p-4 border-t border-slate-700/50">

            {imagePreview && (
                <div className="max-w-3xl mx-auto flex items-center mb-3">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-20 w-20 object-cover border border-slate-700 rounded-lg"
                        />

                        <button
                            onKeyDown={removeImg}
                            type="button"
                            className="absolute -top-2 -right-2 rounded-full w-6 h-6 bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSendMessage}
                className="max-w-3xl mx-auto flex space-x-4"
            >

                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);

                        if (isSoundEnabled) {
                            playRandomKeyStrokeSound();
                        }
                    }}
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2"
                    placeholder="Type your Message..."
                />

                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 px-4 rounded-lg transition-colors ${
                        imagePreview ? "text-cyan-500" : ""
                    }`}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>

                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-5 h-5" />
                </button>

            </form>
        </div>
    );
}

export default MessageInput;
