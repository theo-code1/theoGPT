import { useState } from "react";
import ArrowIcon from "./ArrowIcon";

const ChatForm = ({ onSendMessage, isLoading }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '' && !isLoading) {
            onSendMessage(message.trim());
            setMessage('');
        }
    }

    return(
        <form onSubmit={handleSubmit} className="relative w-1/3 mx-auto top-3/4 flex items-center justify-center -gap-[52px] rounded-full backdrop-blur-sm">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-12 w-full relative bg-transparent border border-white rounded-full p-2 text-white px-4 outline-none" 
                type="text" 
                placeholder={isLoading ? "AI is thinking..." : "What's your question?"} 
                name="message"
                disabled={isLoading}
            />
            <button 
                className={`h-12 w-12 absolute right-0 bg-white border border-white rounded-full p-2 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isLoading}
            >
                <ArrowIcon />
            </button>
        </form>
    )
}

export default ChatForm;