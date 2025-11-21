'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './chat.module.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Namaste! 🙏 I'm FinSaarthi, your financial friend. Whether it's Bachat, Nivesh, or Government Schemes – I'm here to help! What's on your mind today? 💰",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [quickReplies, setQuickReplies] = useState(["Explain SIP", "Find schemes", "Budget help"]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        // 1. Add User Message
        const userMsg: Message = {
            id: Date.now(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setQuickReplies([]);

        try {
            // 2. Call API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();

            // 3. Add Bot Message
            const botMsg: Message = {
                id: Date.now() + 1,
                text: data.response,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);

            if (data.suggestions) {
                setQuickReplies(data.suggestions);
            }

        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={styles.chatPage}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container flex items-center gap-4">
                    <Link href="/dashboard" className={styles.backBtn}>←</Link>
                    <div className={styles.headerInfo}>
                        <h1>FinSaarthi AI</h1>
                        <span className={styles.status}>● Online</span>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className={styles.chatContainer}>
                <div className="container">
                    <div className={styles.messageList}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userWrapper : styles.botWrapper}`}>
                                {msg.sender === 'bot' && <div className={styles.avatar}>🤖</div>}

                                <div className={`${styles.message} ${msg.sender === 'user' ? styles.userMsg : styles.botMsg}`}>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    <span className={styles.timestamp}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                                <div className={styles.avatar}>🤖</div>
                                <div className={`${styles.message} ${styles.botMsg}`}>
                                    <div className={styles.typingIndicator}>
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </main>

            {/* Footer Input */}
            <footer className={styles.footer}>
                <div className="container">
                    {quickReplies.length > 0 && (
                        <div className={styles.quickReplies}>
                            {quickReplies.map((reply, idx) => (
                                <button
                                    key={idx}
                                    className={styles.replyChip}
                                    onClick={() => handleSend(reply)}
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ask in English or Hindi..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                            disabled={isTyping}
                        />
                        <button
                            className={styles.sendBtn}
                            onClick={() => handleSend(input)}
                            disabled={!input.trim() || isTyping}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
