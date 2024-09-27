import { useState } from 'react';
import axios from 'axios';

export default function ChatHome() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessages([...messages, { text: input, isUser: true }]);
        setInput('');
        setIsLoading(true);
        try {
            const response = await axios.post('/api/', { message: input });
            setMessages([...messages, { text: input, isUser: true }, { text: response.data.answer, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <a href="/" style={{
                textDecoration: 'none',
                color: 'black'
            }}>
                <h1>Perplexity AI Chat</h1>
            </a>
            perlexy
            <div style={{
                height: '70vh',
                overflowY: 'scroll',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px'
            }}>
                {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        <span>
                            {message.text}
                        </span>
                    </div>
                ))}
                {isLoading && <>Loading...</>}
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="メッセージを入力..."
                    style={{
                        width: '80%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                        height: '40px',
                        fontSize: '16px'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: '#007bff',
                        color: 'white',
                        fontSize: '16px'
                    }}
                >送信</button>
            </form>
        </div>
    );
}