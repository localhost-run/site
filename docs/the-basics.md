<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vath SMM Panel - Client</title>
    <link href="https://fonts.googleapis.com/css2?family=Hanuman:wght@400;700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Poppins', 'Hanuman', sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #ffffff;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .lang-container { width: 100%; max-width: 450px; display: flex; justify-content: flex-end; margin-bottom: 10px; }
        .lang-select { width: auto; padding: 6px 12px; background-color: #1e293b; border: 1px solid #475569; color: #38bdf8; font-weight: bold; border-radius: 8px; cursor: pointer; }
        nav { display: none; width: 100%; max-width: 450px; background-color: #1e293b; border-radius: 12px 12px 0 0; border: 1px solid #334155; border-bottom: none; box-sizing: border-box; }
        nav ul { list-style: none; padding: 0; margin: 0; display: flex; justify-content: space-around; }
        nav ul li { padding: 15px; cursor: pointer; font-weight: bold; color: #94a3b8; transition: 0.3s; flex: 1; text-align: center; }
        nav ul li.active { color: #38bdf8; border-bottom: 3px solid #38bdf8; }
        .container { background-color: #1e293b; padding: 30px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); width: 100%; max-width: 450px; border: 1px solid #334155; box-sizing: border-box; }
        .container.dashboard { border-radius: 0 0 16px 16px; }
        h2 { text-align: center; color: #38bdf8; margin-bottom: 25px; font-size: 24px; margin-top: 0; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: #94a3b8; font-size: 14px; }
        input, select { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #475569; background-color: #0f172a; color: white; font-size: 15px; box-sizing: border-box; }
        .price-display { background-color: #0f172a; border: 1px dashed #38bdf8; padding: 12px; border-radius: 8px; color: #38bdf8; font-weight: bold; font-size: 16px; text-align: center; }
        button { width: 100%; padding: 14px; background-color: #0284c7; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        button:hover { background-color: #0369a1; }
        #page-order, #page-deposit, #main-nav, #qr-section { display: none; }
        .bank-card { background-color: #0f172a; border: 1px solid #475569; padding: 20px; border-radius: 12px; margin-bottom: 15px; text-align: center; }
        .qr-image { width: 180px; height: 180px; margin: 15px auto; display: block; border: 4px solid #fff; border-radius: 8px; }
        .amount-highlight { color: #34d399; font-size: 22px; font-weight: bold; }
        .timer-box { color: #fb923c; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 10px; background-color: rgba(251, 146, 60, 0.1); padding: 8px; border-radius: 6px; }
        .user-balance-box { background: #0f172a; padding: 10px; border-radius: 8px; text-align: center; font-size: 16px; font-weight: bold; color: #34d399; margin-bottom: 15px; border: 1px solid #1e293b; }
        #disabled-screen { display: none; background-color: #7f1d1d; border: 2px solid #ef4444; color: #fca5a5; padding: 40px 20px; border-radius: 16px; text-align: center; font-weight: bold; font-size: 20px; max-width: 450px; width: 100%; }
        .toggle-link { text-align: center; margin-top: 15px; font-size: 14px; color: #a5b4fc; cursor: pointer; text-decoration: underline; }
    </style>
</head>
<body>

<div class="lang-container">
    <select class="lang-select" id="language-selector" onchange="changeLanguage(this.value)">
        <option value="kh">🇰🇭 ភាសាខ្មែរ</option>
        <option value="en">🇺🇸 English</option>
        <option value="zh">🇨🇳 中文</option>
    </select>
</div>

<div id="disabled-screen" data-key="disabled_msg">🔒 វេបសាយ Vath SMM ត្រូវបានបិទជាបណ្តោះអាសន្នដោយ Admin!</div>

<div id="client-zone" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
    
    <div class="container" id="page-login">
        <h2 id="auth-title" data-key="login_title">VATH SMM - ចូលប្រព័ន្ធ</h2>
        
        <form id="auth-form" onsubmit="handleAuth(event)">
            <div class="form-group">
                <label data-key="label_email">អ៊ីមែល (Email)</label>
                <input type="email" id="auth-email" placeholder="example@gmail.com" required>
            </div>
            <div class="form-group">
                <label data-key="label_password">លេខកូដសម្ងាត់ (Password)</label>
                <input type="password" id="auth-pass" placeholder="••••••••" required>
            </div>
            <button type="submit" id="auth-btn" data-key="btn_login">Log In</button>
            <div class="toggle-link" id="auth-toggle" onclick="toggleAuthMode()" data-key="toggle_signup">មិនទាន់មានគណនី? ចុចបង្កើតគណនីថ្មីនៅទីនេះ</div>
        </form>
    </div>

    <nav id="main-nav">
        <ul>
            <li id="tab-order" class="active" onclick="switchPage('order')" data-key="tab_order">ទិញសេវាកម្ម</li>
            <li id="tab-deposit" onclick="switchPage('deposit')" data-key="tab_deposit">បញ្ចូលលុយ ($)</li>
        </ul>
    </nav>

    <div class="container dashboard" id="page-order">
        <h2 data-key="order_title">VATH SMM - ទិញសេវាកម្ម</h2>
        <div class="user-balance-box"><span data-key="user_balance">💰 ទឹកប្រាក់របស់អ្នក៖</span> <span id="client-balance">10.000</span> $</div>
        <form onsubmit="handleOrder(event)">
            <div class="form-group">
                <label data-key="label_service">ជ្រើសរើសប្រភេទសេវាកម្ម</label>
                <select id="service-select" required></select>
            </div>
            <div class="form-group"><label data-key="label_link">តំណភ្ជាប់ (Link)</label><input type="url" placeholder="https://..." required></div>
            <div class="form-group"><label data-key="label_qty">ចំនួន (Quantity)</label><input type="number" id="quantity" placeholder="1000" min="1" oninput="calculatePrice()" required></div>
            <div class="form-group"><label data-key="label_total">តម្លៃសរុប (Total Charge)</label><div id="priceBox" class="price-display">0.000$</div></div>
            <button type="submit" data-key="btn_order_now">កុម្ម៉ង់ភ្លាមៗ</button>
        </form>
    </div>

    <div class="container dashboard" id="page-deposit">
        <h2 data-key="deposit_title">VATH SMM - បញ្ចូលលុយ</h2>
        <form id="deposit-form" onsubmit="generateQR(event)">
            <div class="form-group"><label data-key="label_amount">ចំនួនទឹកប្រាក់ (Amount $)</label><input type="number" id="deposit-amount" min="1" step="0.01" required></div>
            <button type="submit" style="background-color: #059669;" data-key="btn_generate_qr">បង្កើត QR Code</button>
        </form>
        <div id="qr-section" style="margin-top: 25px; text-align: center;">
            <div class="timer-box"><span data-key="qr_timeout">⏳ QR ហួសកំណត់ក្នុង៖</span> <span id="countdown">20:00</span></div>
            <p style="color: #94a3b8;"><span data-key="qr_send_money">សូមវេរប្រាក់៖</span> <span id="display-amount" class="amount-highlight">0.00$</span></p>
            <div class="bank-card">
                <div style="font-weight: bold; color: #e91e63; font-size: 18px;">Acleda Bank</div>
                <img class="qr-image" src="https://i.postimg.co/N08ZfD9p/image.png" alt="Acleda QR">
            </div>
        </div>
    </div>
</div>

<script>
    let timerInterval;
    let isSignUpMode = false;
    let currentLang = 'kh';

    const languages = {
        kh: {
            disabled_msg: "🔒 វេបសាយ Vath SMM ត្រូវបានបិទជាបណ្តោះអាសន្នដោយ Admin!",
            login_title: "VATH SMM - ចូលប្រព័ន្ធ", signup_title: "VATH SMM - ចុះឈ្មោះថ្មី",
            label_email: "អ៊ីមែល (Email)", label_password: "លេខកូដសម្ងាត់ (Password)",
            btn_login: "Log In", btn_signup: "Sign Up (ចុះឈ្មោះ)",
            toggle_signup: "មិនទាន់មានគណនី? ចុចបង្កើតគណនីថ្មីនៅទីនេះ", toggle_login: "មានគណនីរួចហើយ? ត្រឡប់ទៅចូលប្រព័ន្ធវិញ",
            tab_order: "ទិញសេវាកម្ម", tab_deposit: "បញ្ចូលលុយ ($)", order_title: "VATH SMM - ទិញសេវាកម្ម",
            user_balance: "💰 ទឹកប្រាក់របស់អ្នក៖", label_service: "ជ្រើសរើសប្រភេទសេវាកម្ម",
            label_link: "តំណភ្ជាប់ (Link)", label_qty: "ចំនួន (Quantity)", label_total: "តម្លៃសរុប (Total Charge)",
            btn_order_now: "កុម្ម៉ង់ភ្លាមៗ", deposit_title: "VATH SMM - បញ្ចូលលុយ", label_amount: "ចំនួនទឹកប្រាក់ (Amount $)",
            btn_generate_qr: "បង្កើត QR Code", qr_timeout: "⏳ QR ហួសកំណត់ក្នុង៖", qr_send_money: "សូមវេរប្រាក់៖",
            qr-services: ["🔵 Facebook Likes", "🔵 Facebook Page Followers", "🎵 TikTok Views"],
            err_not_approved: "❌ អ៊ីមែលនេះមិនទាន់ត្រូវបានអនុម័តដោយ Admin ទេ ឬមិនទាន់បានចុះឈ្មោះ!",
            err_insufficient: "ទឹកប្រាក់មិនគ្រប់គ្រាន់ទេ!", success_signup: "🎉 ចុះឈ្មោះជោគជ័យ! សូមរង់ចាំ Admin ពិនិត្យ និងអនុម័តជាមុនសិន។",
            success_order: "កុម្ម៉ង់ជោគជ័យ!"
        },
        en: {
            disabled_msg: "🔒 Vath SMM Website is temporarily disabled by Admin!",
            login_title: "VATH SMM - Login", signup_title: "VATH SMM - Sign Up",
            label_email: "Email Address", label_password: "Password",
            btn_login: "Log In", btn_signup: "Sign Up",
            toggle_signup: "Don't have an account? Register here", toggle_login: "Already have an account? Login here",
            tab_order: "Buy Services", tab_deposit: "Deposit ($)", order_title: "VATH SMM - Purchase Service",
            user_balance: "💰 Your Balance:", label_service: "Select Service Type",
            label_link: "Link URL", label_qty: "Quantity", label_total: "Total Charge",
            btn_order_now: "Place Order Now", deposit_title: "VATH SMM - Deposit Money", label_amount: "Amount ($)",
            btn_generate_qr: "Generate QR Code", qr_timeout: "⏳ QR Expires in:", qr_send_money: "Please send money:",
            qr-services: ["🔵 Facebook Likes", "🔵 Facebook Page Followers", "🎵 TikTok Views"],
            err_not_approved: "❌ This email has not been approved by Admin yet or doesn't exist!",
            err_insufficient: "Insufficient balance!", success_signup: "🎉 Registration successful! Please wait for Admin approval.",
            success_order: "Order Successful!"
        },
        zh: {
            disabled_msg: "🔒 Vath SMM 网站已被管理员暂时关闭！",
            login_title: "VATH SMM - 用户登录", signup_title: "VATH SMM - 注册新账号",
            label_email: "电子邮箱", label_password: "密码",
            btn_login: "登录", btn_signup: "注册",
            toggle_signup: "没有账号？点击这里注册新账号", toggle_login: "已有账号？点击这里登录",
            tab_order: "购买服务", tab_deposit: "充值余额 ($)", order_title: "VATH SMM - 购买服务中心",
            user_balance: "💰 您的账户余额:", label_service: "选择服务类型",
            label_link: "链接地址 (Link)", label_qty: "数量 (Quantity)", label_total: "总费用 (Total Charge)",
            btn_order_now: "立即下单", deposit_title: "VATH SMM - 账户充值", label_amount: "充值金额 ($)",
            btn_generate_qr: "生成付款 QR 码", qr_timeout: "⏳ QR 码有效倒计时:", qr_send_money: "请转账金额:",
            qr-services: ["🔵 Facebook 点赞 (Likes)", "🔵 Facebook 主页粉丝 (Followers)", "🎵 TikTok 播放量 (Views)"],
            err_not_approved: "❌ 该邮箱尚未获得管理员批准或未注册！",
            err_insufficient: "账户余额不足！", success_signup: "🎉 注册成功！请等待管理员审核批准。",
            success_order: "下单成功！"
        }
    };

    function changeLanguage(lang) {
        currentLang = lang; const dict = languages[lang];
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (dict[key]) {
                if (key === 'login_title' && isSignUpMode) return;
                if (key === 'btn_login' && isSignUpMode) return;
                if (key === 'toggle_signup' && isSignUpMode) return;
                el.innerText = dict[key];
            }
        });
        if(isSignUpMode) {
            document.getElementById('auth-title').innerText = dict['signup_title'];
            document.getElementById('auth-btn').innerText = dict['btn_signup'];
            document.getElementById('auth-toggle').innerText = dict['toggle_login'];
        }
        const serviceSelect = document.getElementById('service-select');
        serviceSelect.innerHTML = `<option value="" disabled selected>--- ${dict['label_service']} ---</option>`;
        dict['qr-services'].forEach(item => { serviceSelect.innerHTML += `<option>${item}</option>`; });
    }

    changeLanguage('kh');

    // ប្រព័ន្ធទិន្នន័យ LocalStorage
    if(localStorage.getItem('smm_balance') === null) localStorage.setItem('smm_balance', '10.000');
    if(localStorage.getItem('smm_status') === null) localStorage.setItem('smm_status', 'open');
    if(localStorage.getItem('smm_pending_users') === null) localStorage.setItem('smm_pending_users', JSON.stringify([])); // ឈ្មោះរង់ចាំ Approve
    if(localStorage.getItem('smm_approved_users') === null) localStorage.setItem('smm_approved_users', JSON.stringify([])); // ឈ្មោះអាច Login បាន

    function checkSystemStatus() {
        const status = localStorage.getItem('smm_status');
        if(status === 'close') {
            document.getElementById('client-zone').style.display = 'none';
            document.getElementById('disabled-screen').style.display = 'block';
        } else {
            document.getElementById('disabled-screen').style.display = 'none';
            if(document.getElementById('page-login').style.display === 'none') { document.getElementById('client-zone').style.display = 'flex'; }
        }
        document.getElementById('client-balance').innerText = parseFloat(localStorage.getItem('smm_balance')).toFixed(3);
    }
    setInterval(checkSystemStatus, 1000);

    function toggleAuthMode() { isSignUpMode = !isSignUpMode; changeLanguage(currentLang); }

    function handleAuth(event) {
        event.preventDefault();
        const email = document.getElementById('auth-email').value.trim();
        const dict = languages[currentLang];

        if(isSignUpMode) {
            // ភ្ញៀវចុះឈ្មោះ (Sign Up) -> ចូលទៅកាន់បញ្ជីរង់ចាំ (Pending)
            let pendingUsers = JSON.parse(localStorage.getItem('smm_pending_users'));
            let approvedUsers = JSON.parse(localStorage.getItem('smm_approved_users'));

            if(approvedUsers.includes(email)) {
                alert(currentLang === 'kh' ? "អ៊ីមែលនេះមានរួចហើយ អាច Log In បាន!" : "This email is already approved!");
                return;
            }
            if(!pendingUsers.includes(email)) {
                pendingUsers.push(email);
                localStorage.setItem('smm_pending_users', JSON.stringify(pendingUsers));
            }
            alert(dict['success_signup']);
            toggleAuthMode();
        } else {
            // ភ្ញៀវចូលប្រព័ន្ធ (Log In) -> ត្រូវតែមានឈ្មោះក្នុងបញ្ជីបានការ (Approved) ទើបឱ្យចូល
            let approvedUsers = JSON.parse(localStorage.getItem('smm_approved_users'));

            if(approvedUsers.includes(email)) {
                if(localStorage.getItem('smm_status') === 'close') return;
                document.getElementById('page-login').style.display = 'none';
                document.getElementById('main-nav').style.display = 'block';
                document.getElementById('page-order').style.display = 'block';
                checkSystemStatus();
            } else {
                alert(dict['err_not_approved']);
            }
        }
    }

    function calculatePrice() {
        const qty = document.getElementById('quantity').value;
        document.getElementById('priceBox').innerText = qty > 0 ? ((qty * 0.010) / 1000).toFixed(3) + "$" : "0.000$";
    }

    function switchPage(page) {
        if(localStorage.getItem('smm_status') === 'close') return;
        document.getElementById('page-order').style.display = page === 'order' ? 'block' : 'none';
        document.getElementById('page-deposit').style.display = page === 'deposit' ? 'block' : 'none';
        document.getElementById('tab-order').className = page === 'order' ? 'active' : '';
        document.getElementById('tab-deposit').className = page === 'deposit' ? 'active' : '';
    }

    function generateQR(event) {
        event.preventDefault();
        const amount = document.getElementById('deposit-amount').value;
        document.getElementById('display-amount').innerText = parseFloat(amount).toFixed(2) + " $";
        document.getElementById('qr-section').style.display = 'block';
        let timeRemaining = 20 * 60; clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            let mins = Math.floor(timeRemaining / 60); let secs = timeRemaining % 60;
            document.getElementById('countdown').innerText = `${mins < 10 ? '0'+mins : mins}:${secs < 10 ? '0'+secs : secs}`;
            if (timeRemaining-- <= 0) { clearInterval(timerInterval); document.getElementById('qr-section').style.display = 'none'; }
        }, 1000);
    }

    function handleOrder(event) {
        event.preventDefault();
        let bal = parseFloat(localStorage.getItem('smm_balance'));
        const qty = document.getElementById('quantity').value; const cost = (qty * 0.010) / 1000;
        const dict = languages[currentLang];
        if (bal >= cost) {
            bal -= cost; localStorage.setItem('smm_balance', bal.toString()); checkSystemStatus();
            alert(dict['success_order']);
        } else { alert(dict['err_insufficient']); }
    }
</script>
</body>
</html>
