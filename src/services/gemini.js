const API_URL = import.meta.env.VITE_API_URL;

const SYSTEM_PROMPT = `You are theoGPT, a personalized AI assistant created by Theo. 
powered by theocode/google
Your responses should be:
- Friendly and conversational
- Knowledgeable but approachable
- Occasionally using emojis when appropriate
- Brief but informative
- Always maintaining a helpful and positive tone

Important: Do not start every message with a greeting. Only greet at the start of a conversation.
Continue the conversation naturally based on the context.`;

export const getGeminiResponse = async (message, chatHistory) => {
    try {
        console.log('Sending request to Gemini...'); // Debug log

        // Format chat history into parts
        const parts = [
            { text: SYSTEM_PROMPT + "\n\nConversation history:" }
        ];

        // Add chat history if it exists
        if (chatHistory.length > 0) {
            chatHistory.forEach(msg => {
                parts.push({
                    text: `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}\n`
                });
            });
        }

        // Add current message
        parts.push({ text: `Human: ${message}\nAssistant:` });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: {
                    role: "user",
                    parts: parts
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_NONE"
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 250,
                    topP: 0.8,
                    topK: 40
                }
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Gemini API Error:', data); // Debug log
            throw new Error(data.error?.message || 'Failed to get AI response');
        }

        console.log('Gemini Response:', data); // Debug log
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error in getGeminiResponse:', error);
        throw error;
    }
}; 