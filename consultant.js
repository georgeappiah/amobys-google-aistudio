import { GoogleGenAI } from "https://esm.sh/@google/genai@^1.34.0";

const CSS = `
.ai-consultant-widget { position: fixed; bottom: 24px; right: 24px; z-index: 1000; font-family: 'Inter', sans-serif; }
.ai-bubble { background: #FFCC00; color: #003366; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease; }
.ai-bubble:hover { transform: scale(1.1); }
.ai-chat-window { position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; background: white; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); display: none; flex-direction: column; overflow: hidden; border: 1px solid #eee; }
.ai-chat-window.open { display: flex; }
.ai-chat-header { background: #003366; color: white; padding: 16px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
.ai-chat-body { flex-grow: 1; overflow-y: auto; padding: 16px; background: #f8fafc; }
.ai-chat-footer { padding: 12px; border-t: 1px solid #eee; display: flex; gap: 8px; }
.ai-chat-input { flex-grow: 1; border: 1px solid #ddd; border-radius: 20px; padding: 8px 16px; outline: none; font-size: 14px; }
.ai-chat-send { background: #FFCC00; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; }
.msg { margin-bottom: 12px; max-width: 85%; padding: 10px 14px; border-radius: 15px; font-size: 13px; line-height: 1.4; }
.msg.ai { background: white; color: #333; border-bottom-left-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.msg.user { background: #003366; color: white; margin-left: auto; border-bottom-right-radius: 2px; }
`;

class AIConsultant {
    constructor() {
        this.isOpen = false;
        this.injectStyles();
        this.render();
        this.initAI();
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
                    <span>Engineering Assistant</span>
                    <button id="closeBtn">×</button>
                </div>
                <div class="ai-chat-body" id="chatBody">
                    <div class="msg ai">Hello! I'm the Amobys Engineering Assistant. How can I help with your project in Ghana today?</div>
                </div>
                <div class="ai-chat-footer">
                    <input type="text" class="ai-chat-input" id="aiInput" placeholder="Ask about consultancy...">
                    <button class="ai-chat-send" id="sendBtn">➤</button>
                </div>
            </div>
            <div class="ai-bubble" id="aiBubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
    }

    addMessage(text, role) {
        const div = document.createElement('div');
        div.className = `msg ${role}`;
        div.textContent = text;
        this.chatBody.appendChild(div);
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    async initAI() {
        try {
            this.ai = new GoogleGenAI({ apiKey: "API_KEY_PLACEHOLDER" }); // process.env.API_KEY is handled by the platform
        } catch (e) { console.error(e); }
    }

    async handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        try {
            // Re-initializing to ensure up-to-date key as per guidelines
            const genAI = new GoogleGenAI({ apiKey: document.location.hostname === 'localhost' ? '' : 'API_KEY' }); 
            // In the actual sandbox env, process.env.API_KEY is available
            const model = "gemini-3-flash-preview";
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${window.process?.env?.API_KEY || ''}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }],
                    systemInstruction: { parts: [{ text: "You are the Amobys Engineering AI Consultant. Amobys is based in Ghana. Provide professional advice on Civil, Structural, and Electrical projects." }] }
                })
            });
            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm experiencing high traffic. Please email us at info@amobys.com.gh";
            this.addMessage(aiText, 'ai');
        } catch (e) {
            this.addMessage("Connection error. Please call +233-24-0000000.", 'ai');
        }
    }
}

new AIConsultant();
