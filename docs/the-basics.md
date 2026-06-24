<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>আমার সম্পূর্ণ চ্যাট অ্যাপ</title>
    
    <style>
        /* --- সাধারণ ও লগইন স্টাইল --- */
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; padding: 0; background-color: #f0f2f5; 
            overflow: hidden; 
        }
        /* লগইন স্ক্রিনকে শুরুতে 'flex' করে রাখছি যাতে দেখা যায় */
        .app-screen { 
            display: none; height: 100vh; width: 100%; 
        }
        #login-screen { 
            display: flex; /* শুরুতে লগইন স্ক্রিনটি দেখানোর জন্য */
            justify-content: center; align-items: center; 
        } 
        
        /* লগইন বক্স স্টাইল */
        .auth-box { 
            background-color: #fff; padding: 40px; border-radius: 12px; 
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15); width: 350px; 
            text-align: center; 
        }
        .auth-box h2 { 
            color: #2aabf0; margin-bottom: 25px; 
        }
        .input-group { 
            margin-bottom: 15px; 
        }
        .input-group input { 
            width: 100%; padding: 12px; border: 1px solid #ccc; 
            border-radius: 8px; box-sizing: border-box; font-size: 1em;
            transition: border-color 0.3s;
        }
        button { 
            width: 100%; padding: 12px; background-color: #2aabf0; 
            color: white; border: none; border-radius: 8px; 
            font-size: 1.1em; cursor: pointer; transition: background-color 0.3s; 
            margin-top: 10px; 
        }
        .toggle-link { 
            display: block; margin-top: 15px; color: #2aabf0; 
            text-decoration: none; font-size: 0.9em; cursor: pointer; 
        }
        
        /* --- চ্যাট অ্যাপের মূল লেআউট স্টাইল --- */
        #chat-main-screen { 
            max-width: 1400px; margin: 0 auto; display: none; /* শুরুতে চ্যাট স্ক্রিনটি লুকানো থাকবে */
        }
        .sidebar { 
            width: 350px; background-color: #fff; border-right: 1px solid #eee; 
            overflow-y: auto; height: 100vh;
        }
        .sidebar-header { 
            padding: 15px; border-bottom: 1px solid #eee; background-color: #2aabf0; 
            color: white; font-size: 1.2em; font-weight: bold; position: sticky; top: 0; 
        }
        .chat-list { 
            list-style: none; padding: 0; margin: 0; 
        }
        .chat-item { 
            display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee; 
            cursor: pointer; transition: background-color 0.2s; 
        }
        .chat-item.active { 
            background-color: #e6f7ff; 
        }
        .avatar { 
            width: 50px; height: 50px; border-radius: 50%; background-color: #5d9eef; 
            color: white; display: flex; align-items: center; justify-content: center; 
            font-weight: bold; font-size: 1.2em; margin-right: 15px; 
        }
        .chat-info { flex-grow: 1; }
        .chat-info strong { display: block; }
        .chat-info p { 
            margin: 2px 0 0; color: #666; font-size: 0.9em; overflow: hidden; 
            white-space: nowrap; text-overflow: ellipsis; 
        }
        .main-chat { 
            flex-grow: 1; display: flex; flex-direction: column; 
            background-color: #f7f9fb; 
        }
        .chat-header { 
            padding: 15px; background-color: #fff; border-bottom: 1px solid #eee; 
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); 
        }
        .message-area { 
            flex-grow: 1; padding: 20px; overflow-y: auto; 
            background-color: #f7f9fb; 
        }
        .message { 
            max-width: 60%; padding: 12px 15px; border-radius: 18px; 
            margin-bottom: 10px; position: relative; clear: both; 
        }
        .incoming { 
            background-color: #fff; float: left; border-bottom-left-radius: 5px; 
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08); 
        }
        .outgoing { 
            background-color: #dcf8c6; float: right; border-bottom-right-radius: 5px; 
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08); 
        }
        .timestamp { 
            display: block; font-size: 0.75em; color: #999; margin-top: 5px; 
            text-align: right; 
        }
        .message-input { 
            display: flex; padding: 10px 15px; border-top: 1px solid #eee; 
            background-color: #fff; align-items: center; 
        }
        .message-input input { 
            flex-grow: 1; padding: 12px; border: 1px solid #ddd; border-radius: 24px; 
            margin-right: 10px; box-sizing: border-box; font-size: 1em; 
        }
        .message-input button { 
            padding: 12px 20px; background-color: #2aabf0; color: white; 
            border: none; border-radius: 24px; cursor: pointer; 
        }
    </style>
</head>
<body>

    <div id="login-screen" class="app-screen">
        <div class="auth-box">
            <h2 id="auth-title">ইমেইল দিয়ে লগইন করুন</h2>
            <form id="authForm">
                <div class="input-group">
                    <input type="email" id="email-input" placeholder="আপনার ইমেইল ঠিকানা দিন" required>
                </div>
                
                <button type="submit" id="auth-button">লগইন/নিবন্ধন</button>
            </form>

            <p class="toggle-link">
                আপনার ইমেইল ঠিকানা দিন। অ্যাকাউন্ট না থাকলে তৈরি হয়ে যাবে।
            </p>
        </div>
    </div>
    
    <div id="chat-main-screen" class="app-screen">
        
        <div class="sidebar">
            <header class="sidebar-header">আমার চ্যাট অ্যাপ</header>
            <ul class="chat-list">
                <li class="chat-item active" data-user-id="User1">
                    <div class="avatar">আপনি</div>
                    <div class="chat-info">
                        <strong id="current-user-name">আপনি</strong>
                        <p>সর্বশেষ বার্তা: কেমন আছেন?</p>
                    </div>
                </li>
                 <li class="chat-item" data-user-id="User2">
                    <div class="avatar">ইউ২</div>
                    <div class="chat-info">
                        <strong>ব্যবহারকারী ২</strong>
                        <p>সবাইকে স্বাগতম!</p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="main-chat">
            <header class="chat-header">
                <h3>ব্যবহারকারী ২</h3>
            </header>
            <div class="message-area">
                <div class="message incoming">
                    <p>অ্যাপটি চালু করে এখন বার্তা পাঠান।</p>
                    <span class="timestamp">১০:৪৫ PM</span>
                </div>
            </div>
            <footer class="message-input">
                <input type="text" id="message-text" placeholder="একটি বার্তা লিখুন...">
                <button id="send-button">প্রেরণ</button>
            </footer>
        </div>
    </div>
    
    <script src="/socket.io/socket.io.js"></script>

    <script>
        const socket = io(); 

        const loginScreen = document.getElementById('login-screen');
        const chatMainScreen = document.getElementById('chat-main-screen');
        const messageArea = document.querySelector('.message-area');
        const messageInput = document.getElementById('message-text');
        const sendButton = document.getElementById('send-button');
        const chatForm = document.getElementById('authForm');
        
        let CURRENT_USER_ID = ''; 

        // --- ১. স্ক্রিন পরিবর্তন এবং লগইন সিমুলেশন ---
        chatForm.addEventListener('submit', function(e) {
            // ফর্ম সাবমিট হওয়া বন্ধ করুন - এটি লগইন সমস্যার প্রধান সমাধান
            e.preventDefault(); 
            
            const emailInput = document.getElementById('email-input').value;
            
            if (emailInput) {
                // আইডি সেট করা
                CURRENT_USER_ID = emailInput; 
                
                // ইউজারনেম আপডেট
                const initials = emailInput.substring(0, 2).toUpperCase();
                document.getElementById('current-user-name').innerText = `আপনি (${emailInput})`;
                document.querySelector('.chat-item.active .avatar').innerText = initials;

                // স্ক্রিন পরিবর্তন: লগইন স্ক্রিন লুকান, চ্যাট স্ক্রিন দেখান
                loginScreen.style.display = 'none';
                chatMainScreen.style.display = 'flex';
                
                console.log("Log In Successful! Changing screens."); // কনসোল বার্তা
            } else {
                alert("অনুগ্রহ করে একটি ইমেইল ঠিকানা দিন।");
            }
        });

        // --- ২. বার্তা পাঠানো (Send Button) ---
        sendButton.addEventListener('click', function() {
            const text = messageInput.value.trim();
            if (text) {
                const msg = {
                    text: text,
                    senderId: CURRENT_USER_ID, 
                    recipientId: 'User2' 
                };
                
                // বার্তাটি সার্ভারে পাঠান
                socket.emit('chat message', msg);
                
                // আপনার স্ক্রিনে বার্তাটি দেখান
                appendMessage(msg.text, 'outgoing');
                
                messageInput.value = ''; 
            }
        });

        // Enter চাপলে বার্তা পাঠানোর ফাংশন 
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });


        // --- ৩. বার্তা রিসিভ করা ও দেখানো ---
        socket.on('chat message', function(msg) {
            // যদি বার্তাটি আপনার না হয়ে থাকে (অন্য কারও কাছ থেকে আসে), তবেই দেখান।
            if (msg.senderId !== CURRENT_USER_ID) {
                appendMessage(msg.text, 'incoming');
            }
        });

        function appendMessage(text, type) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', type);
            
            const p = document.createElement('p');
            p.innerText = text;
            messageDiv.appendChild(p);

            const timestampSpan = document.createElement('span');
            timestampSpan.classList.add('timestamp');
            timestampSpan.innerText = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
            messageDiv.appendChild(timestampSpan);

            messageArea.appendChild(messageDiv);
            messageArea.scrollTop = messageArea.scrollHeight; 
        }

    </script>

</body>
</html>
---
id: the-basics
title: The Basics
sidebar_label: The Basics
slug: /
---

## Put a locally running HTTP, HTTPS or TLS app on the internet

localhost.run is a client-less tool to instantly make a locally running application available on an internet accessible URL.

All major operating systems already have SSH installed, and localhost.run uses SSH as a client, so no download is necessary to use the service and no account setup is needed for free domains.

To connect an internet domain to an application running locally on port 8080 open a command terminal and run:

```bash
ssh -R 80:localhost:8080 localhost.run
```

import { useState } from 'react'

export const PortChooser = () => {
  const [port, setPort] = useState(3000);
  return (
    <>
      running on&nbsp;
      <label for="port">local port</label>
      &nbsp;
      <input style={{width: "5em"}} type="number" id="port" name="port" min="1" max="65535" value={port} onChange={(event) => setPort(event.target.value)} />
      ?
      use this command:
      <pre><code parentName="pre" {...{
              "className": "bash"
            }}>{`ssh -R 80:localhost:${port} localhost.run
`}</code></pre>
    </>
  )
};

<PortChooser />
