import { useState } from "react";
import ChatForm from "./Components/ChatForm";
import ChatHistory from "./Components/ChatHistory";
import { getGeminiResponse } from "./services/gemini";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewMessage = async (message) => {
    try {
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      // Set loading state
      setIsLoading(true);

      // Get Gemini response with full chat history
      const aiResponse = await getGeminiResponse(message, messages);

      // Add AI response to messages
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Handle error - add error message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.',
        error: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#161616] h-screen w-screen relative px-10 py-5">
      <div className="Logo text-white flex items-center gap-1 cursor-pointer">
          <img src="/src/assets/gpt-logo.png" alt="theoGpt Logo" width={40} height={60} />
          <h3 className="text-white">theoGPT</h3>
      </div>
      <header className={`text-white text-center text-4xl font-normal mt-4 transition-all duration-300 ${messages.length > 0 ? 'hidden' : 'block'}`}>
        <h1>Hey, How can I assist you today?</h1>
      </header>
      <ChatHistory messages={messages} isLoading={isLoading} />
      <div className="form-container absolute bottom-6 left-0 right-0">
        <ChatForm onSendMessage={handleNewMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default App;