import { useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';
import GptLogo from '../assets/gpt-logo.png';

const ChatHistory = ({ messages, isLoading }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]); // Scroll when messages change or loading state changes

    return(
        <div className={`${messages.length > 0 ? 'h-[95%] mt-2' : 'h-[85%] mt-6'} 
            w-[80%] mx-auto overflow-y-auto rounded-md p-2 pb-14 transition-all duration-200 
            flex flex-col gap-3 scrollbar-hide`}
        >
            {messages.map((message, index) => (
                <div key={index} className="flex flex-col gap-4">
                    {message.role === 'user' && (
                        <UserMessage Question={message.content} />
                    )}
                    {message.role === 'assistant' && (
                        <AIMessage solution={message.content} error={message.error} />
                    )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#161616] p-1 flex items-center justify-center">
                        <img src={GptLogo} alt="TheoGPT" className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-gray-400 text-sm">theoGPT</span>
                        <div className="bg-[#2A2A2A] rounded-[15px] rounded-tl-none py-3 px-4">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
        </div>
    )
}

export default ChatHistory;
