import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './ai.module.css';

const DEMO_RESPONSES = [
  "That's a great question! Let me think about that for a moment...\n\nBased on my analysis, I'd say the key factors to consider here are context, clarity, and creativity. Would you like me to elaborate on any of these?",
  "I'm here to help! From what you've described, there are several approaches we could take:\n\n1. Start with the fundamentals\n2. Build incrementally\n3. Test and iterate\n\nWhich direction interests you most?",
  "Interesting perspective! I appreciate you sharing that.\n\nHere's my take: the best solutions often come from combining different viewpoints. Let me know if you'd like to explore this further.",
  "I've analyzed your request and here's what I found:\n\n**Key Insights:**\n- The core concept is solid\n- There's room for optimization\n- Consider edge cases\n\nWould you like me to dive deeper into any of these areas?",
  "Great to chat with you! I'm designed to assist with a wide range of topics.\n\nFeel free to ask me about:\n- Technical questions\n- Creative projects\n- Problem-solving\n- General knowledge\n\nWhat's on your mind?",
];

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function Message({ message, isUser }) {
  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.userMessage : styles.aiMessage}`}>
      <div className={styles.avatar}>
        {isUser ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.avatarIcon}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.avatarIcon}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        )}
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageMeta}>
          <span className={styles.messageSender}>{isUser ? 'You' : 'Nova AI'}</span>
          <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
        </div>
        <div className={styles.messageText}>
          {message.text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line.startsWith('**') && line.endsWith('**') ? (
                <strong>{line.slice(2, -2)}</strong>
              ) : line.startsWith('- ') ? (
                <div className={styles.listItem}>{line}</div>
              ) : line.match(/^\d+\./) ? (
                <div className={styles.listItem}>{line}</div>
              ) : (
                line
              )}
              {i < message.text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className={`${styles.messageWrapper} ${styles.aiMessage}`}>
      <div className={styles.avatar}>
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.avatarIcon}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div className={styles.messageContent}>
        <div className={styles.typingIndicator}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

function SuggestionChip({ text, onClick }) {
  return (
    <button className={styles.suggestionChip} onClick={() => onClick(text)}>
      {text}
    </button>
  );
}

function AI() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const aiResponse = {
      id: Date.now() + 1,
      text: DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)],
      isUser: false,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "What can you help me with?",
    "Tell me something interesting",
    "How does AI work?",
    "Help me brainstorm ideas",
  ];

  return (
    <Layout
      title="Nova AI"
      description="Chat with Nova AI - Your intelligent assistant">
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.logoSection}>
                <div className={styles.logoIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className={styles.logoText}>
                  <h1>Nova AI</h1>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot}></span>
                    Online
                  </span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button className={styles.iconButton} title="New Chat" onClick={() => setMessages([])}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.length === 0 ? (
              <div className={styles.welcomeScreen}>
                <div className={styles.welcomeIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h2>Welcome to Nova AI</h2>
                <p>Your intelligent assistant powered by advanced AI. Ask me anything!</p>
                <div className={styles.capabilities}>
                  <div className={styles.capability}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                    </svg>
                    <span>Creative Ideas</span>
                  </div>
                  <div className={styles.capability}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <span>Knowledge Base</span>
                  </div>
                  <div className={styles.capability}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                    <span>Code Help</span>
                  </div>
                  <div className={styles.capability}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
                    </svg>
                    <span>Conversations</span>
                  </div>
                </div>
                <div className={styles.suggestions}>
                  <p>Try asking:</p>
                  <div className={styles.suggestionChips}>
                    {suggestions.map((suggestion, idx) => (
                      <SuggestionChip key={idx} text={suggestion} onClick={handleSend} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.messagesList}>
                {messages.map((message) => (
                  <Message key={message.id} message={message} isUser={message.isUser} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <textarea
                ref={inputRef}
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Nova AI..."
                rows="1"
              />
              <button
                className={`${styles.sendButton} ${inputValue.trim() ? styles.active : ''}`}
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            <p className={styles.disclaimer}>
              Nova AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AI;
