import { GoogleGenAI } from "https://esm.sh/@google/genai@^1.34.0";

const CSS = `
.ai-consultant-widget { position: fixed; bottom: 24px; right: 24px; z-index: 1000; font-family: 'Inter', sans-serif; }
.ai-bubble { background: #FFCC00; color: #003366; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); cursor: pointer; transition: transform 0.3s ease; }
.ai-bubble:hover { transform: scale(1.1) rotate(5deg); }
.ai-chat-window { position: absolute; bottom: 80px; right: 0; width: 360px; height: 520px; background: white; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); display: none; flex-direction: column; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); }
.ai-chat-window.open { display: flex; animation: slideUp 0.3s ease-out; }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.ai-chat-header { background: #003366; color: white; padding: 20px; font-weight: 800; display: flex; justify-content: space-between; align-items: center; font-family: 'Montserrat', sans-serif; }
.ai-chat-body { flex-grow: 1; overflow-y: auto; padding: 20px; background: #fdfdfd; display: flex; flex-direction: column; gap: 12px; }
.ai-chat-footer { padding: 16px; border-t: 1px solid #f1f5f9; display: flex; gap: 10px; background: white; }
.ai-chat-input { flex-grow: 1; border: 1px solid #e2e8f0; border-radius: 24px; padding: 10px 18px; outline: none; font-size: 14px; transition: border-color 0.2s; }
.ai-chat-input:focus { border-color: #FFCC00; }
.ai-chat-send { background: #FFCC00; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #003366; font-weight: bold; }
.msg { max-width: 85%; padding: 12px 16px; border-radius: 18px; font-size: 13.5px; line-height: 1.5; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.msg.ai { background: #f1f5f9; color: #1e293b; border-bottom-left-radius: 4px; align-self: flex-start; }
.msg.user { background: #003366; color: white; border-bottom-right-radius: 4px; align-self: flex-end; }
.loading-dots::after { content: '...'; animation: dots 1.5s steps(3, end) infinite; }
@keyframes dots { 0%, 20% { content: ''; } 40% { content: '.'; } 60% { content: '..'; } 80% { content: '...'; } }
`;

class AIConsultant {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.injectStyles();
        this.render();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    render() {
        this.widget = document.createElement('div');
        this.widget.className = 'ai-consultant-widget';
        this.widget.innerHTML = `
            <div class="ai-chat-window" id="aiWindow">
                <div class="ai-chat-header">
                    <div class="flex items-center gap-2 uppercase tracking-tighter text-sm">
                        <span class="bg-[#FFCC00] text-[#003366] px-2 py-1 rounded">AI</span> Assistant
                    </div>
                    <button id="closeBtn" style="background:none; border:none; color:white; font-size:24px; cursor:pointer;">&times;</button>
                </div>
                <div class="ai-chat-body" id="chatBody">
                    <div class="msg ai shadow-sm">Welcome to Amobys Engineering. How can I assist with your EPC Supply Chain or Technical Support needs in Ghana today?</div>
                </div>
                <div class="ai-chat-footer">
                    <input type="text" class="ai-chat-input" id="aiInput" placeholder="Enter your query...">
                    <button class="ai-chat-send" id="sendBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
            <div class="ai-bubble" id="aiBubble">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
        `;
        document.body.appendChild(this.widget);

        this.bubble = document.getElementById('aiBubble');
        this.window = document.getElementById('aiWindow');
        this.closeBtn = document.getElementById('closeBtn');
        this.sendBtn = document.getElementById('sendBtn');
        this.input = document.getElementById('aiInput');
        this.chatBody = document.getElementById('chatBody');

        this.bubble.onclick = () => this.toggle();
        this.closeBtn.onclick = () => this.toggle();
        this.sendBtn.onclick = () => this.handleSend();
        this.input.onkeypress = (e) => e.key === 'Enter' && this.handleSend();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('open', this.isOpen);
        if (this.isOpen) this.input.focus();
    }

    addMessage(text, role, isLoading = false) {
        const div = document.createElement('div');
        div.className = `msg ${role} ${isLoading ? 'loading-dots' : ''}`;
        div.textContent = text;
        if (isLoading) div.id = 'loadingMsg';
        this.chatBody.appendChild(div);
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
        return div;
    }

    async handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        const loadingMsg = this.addMessage('Thinking', 'ai', true);

        try {
            // Using SDK as per rules. process.env.API_KEY is available in the environment.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: text,
                config: {
                    systemInstruction: `You are the Amobys Engineering AI Consultant. 
                    Amobys is based in Accra, Ghana. 
                    Key services: 
                    1. Supply Chain Management Outsourcing (EPC project services, Warehouse Audit/Training, Procurement).
                    2. Technical Support Services.
                    Tone: Professional, expert, helpful, concise. 
                    Context: Focus on Ghana Standards Authority (GSA) compliance and regional engineering excellence.`,
                    temperature: 0.7
                }
            });

            loadingMsg.remove();
            this.addMessage(response.text || "I'm sorry, I couldn't process that. Please contact info@amobys.com.gh", 'ai');
        } catch (e) {
            loadingMsg.remove();
            this.addMessage("I'm currently undergoing maintenance. Please reach our support at +233-24-0000000.", 'ai');
            console.error('Gemini SDK Error:', e);
        }
    }
}

// Initializing the consultant for all pages
new AIConsultant();
