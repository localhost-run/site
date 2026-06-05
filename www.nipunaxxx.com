<!DOCTYPE html>
<html>
<head>
  <title>Business Website with Login & Animation</title>
  <style>
    body {
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      height: 100vh;
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
      overflow-x: hidden;
    }

    /* Login Box Styles */
    .login-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.7);
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 0 25px #00fff7;
      text-align: center;
      animation: float 3s ease-in-out infinite;
      transition: opacity 1s ease, transform 1s ease;
      z-index: 2;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(-50%, -50%) translateY(0);
        box-shadow: 0 0 25px #00fff7;
      }
      50% {
        transform: translate(-50%, -50%) translateY(-10px);
        box-shadow: 0 0 35px #00ffe0;
      }
    }

    .login-box h2 {
      margin-bottom: 20px;
      animation: fadeInDown 1.5s ease;
    }

    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    input {
      padding: 12px;
      margin: 10px;
      border-radius: 5px;
      border: none;
      width: 80%;
      font-size: 1rem;
      outline: none;
    }

    input[type="submit"] {
      background: linear-gradient(90deg, #00fff7, #00c8ff);
      color: #0b0c10;
      cursor: pointer;
      transition: background 0.4s, transform 0.3s;
      font-weight: bold;
    }

    input[type="submit"]:hover {
      background: linear-gradient(90deg, #00c8ff, #00fff7);
      transform: scale(1.05);
    }

    /* Business Page Styles */
    .business-page {
      display: none;
      padding: 40px;
      animation: fadeIn 2s forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .business-header {
      font-size: 2rem;
      margin-bottom: 20px;
      color: #66fcf1;
    }

    .card {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
    }
  </style>
  <script>
    function checkLogin(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === "Namal" && password === "web") {
        document.querySelector('.login-box').style.opacity = '0';
        document.querySelector('.login-box').style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
          document.querySelector('.login-box').style.display = 'none';
          document.querySelector('.business-page').style.display = 'block';
        }, 1000);
      } else {
        alert("❌ Incorrect Username or Password");
      }
    }
  </script>
</head>
<body>
  <!-- Login Page -->
  <div class="login-box">
    <h2>Welcome to Login creat by nipuna</h2>
    <form onsubmit="checkLogin(event)">
      <input type="text" id="username" placeholder="Username" required><br>
      <input type="password" id="password" placeholder="Password" required><br>
      <input type="submit" value="Login">
    </form>
  </div>

  <!-- Business Page -->
  <div class="business-page">
    <div class="business-header">Welcome to My Business Website</div>
    <div class="card">
      <h3>About Us</h3>
      <p>We are passionate about providing the best services to our customers. Innovation and quality are at our core.</p>
    </div>
    <div class="card">
      <h3>Our Services</h3>
      <ul>
        <li>Web Development</li>
        <li>Graphic Designing</li>
        <li>Marketing Solutions</li>
      </ul>
    </div>
    <div class="card">
      <h3>Contact Us</h3>
      <p>Email: contact nipunanamal@698gmail.com<br>Phone: +94 77 291 5479</p>
    </div>
  </div>
</body>
</html>
