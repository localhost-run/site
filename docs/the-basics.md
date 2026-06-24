<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prasanthi Musical Band Party</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(to right, #f5f5f5, #ddd); }
    header { background: #222; color: #fff; padding: 20px; text-align: center; }
    header h1 { margin: 0; font-size: 28px; }
    nav { background: #444; text-align: center; }
    nav a { color: white; text-decoration: none; padding: 15px 20px; display: inline-block; }
    nav a:hover { background: #666; }
    section { padding: 20px; text-align: center; }
    .services { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
    .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); width: 250px; }
    .card h3 { margin: 10px 0; }
    footer { background: #222; color: #fff; text-align: center; padding: 10px; margin-top: 20px; }
    button { background: #ff5722; color: white; border: none; padding: 10px 15px; margin-top: 10px; border-radius: 5px; cursor: pointer; }
    button:hover { background: #e64a19; }
    input { width: 80%; padding: 10px; margin: 5px 0; border-radius: 5px; border: 1px solid #ccc; }
  </style>
</head>
<body>

  <header>
    <h1>🎵 Prasanthi Musical Band Party 🎵</h1>
    <p>Established in  1973 | Founder: Shri M. Madhava Rao</p>
  </header>

  <nav>
    <a href="#about">About Us</a>
    <a href="#services">Services</a>
    <a href="#booking">Booking</a>
    <a href="#contact">Contact</a>
  </nav>

  <section id="about">
    <h2>About Us</h2>
    <p>Prasanthi Musical Band Party has been entertaining Vijayawada and surrounding areas since 1973. 
    We provide traditional + modern band music for weddings, events, and celebrations.</p>
  </section>

  <section id="services">
    <h2>Our Services</h2>
    <div class="services">
      <div class="card"><h3>Wedding Band</h3><p>Melodious tunes for grand weddings.</p></div>
      <div class="card"><h3>Events & Functions</h3><p>Live music for cultural, political, and private events.</p></div>
      <div class="card"><h3>Special Performances</h3><p>Classical + Modern fusion for special occasions.</p></div>
    </div>
  </section>

  <section id="booking">
    <h2>Book Us</h2>
    <p>Fill in your details below to book our band for your event:</p>
    
    <form id="bookingForm" action="sendmail.php" method="POST">
      <input type="text" name="name" placeholder="Your Name" required><br>
      <input type="text" name="event" placeholder="Event Type (Wedding, Function...)" required><br>
      <input type="date" name="date" required><br>
      <input type="tel" name="phone" placeholder="Phone Number" required><br>
      <button type="submit">Submit Booking</button>
    </form>
    
    <p id="msg" style="color:green; font-weight:bold;"></p>
  </section>

  <section id="contact">
    <h2>Contact Us</h2>
    <p>📍 Vijayawada, Andhra Pradesh</p>
    <p>📞 Phone: +91-XXXXXXXXXX</p>
    <p>✉️ Email: prasanthibandparty@gmail.com</p>
  </section>

  <footer>
    <p>© 2025 Prasanthi Musical Band Party. All rights reserved.</p>
  </footer>

</body>
</html>
