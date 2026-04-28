import { create } from 'zustand';

interface Message {
    role: 'user' | 'chow';
    content: string;
}
interface ChatStore {
    isGenerating: boolean;
    messages: Message[];
    generateResponse: (prompt: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
    isGenerating: false,
    messages: [],

    generateResponse: async (prompt: string) => {
        const trimmedPrompt = prompt.trim()

        set((state) => ({
            isGenerating: true,
            messages: [...state.messages, { role: 'user', content: trimmedPrompt }]
        }))

        try {
            const response = await fetch("https://membership-contacts-mild-session.trycloudflare.com/api/chow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: trimmedPrompt })
            })

            const res = await response.json()

            const text = res.content.replace(/\*/g, '') || '';

            set((state) => ({
                isGenerating: false,
                messages: [...state.messages, { role: 'chow', content: text }]
            }))

        } catch (error) {
            console.log(error)

            set((state) => ({
                isGenerating: false,
                messages: [...state.messages, { role: 'chow', content: "Something went wrong. Please try again later." }]
            }))
        }
    }
}))