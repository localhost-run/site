<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Trinamul Nari Uddyakta Society (Grassroots) — Empowering Women, Building Futures</title>
<meta name="description" content="A non-governmental, non-profit organization empowering grassroots women in Bangladesh through entrepreneurship, education, health, and social justice." />
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#f7f5f0;
    --surface:#ffffff;
    --ink:#1a1f2e;
    --muted:#5b6478;
    --primary:#0f3d3e;
    --primary-2:#1d6e6f;
    --accent:#c9a14a;
    --accent-soft:#f0e4c5;
    --line:rgba(15,61,62,0.12);
    --shadow:0 10px 30px -12px rgba(15,61,62,0.18);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter','Hind Siliguri',sans-serif;background:var(--bg);color:var(--ink);line-height:1.7}
  .container{max-width:1200px;margin:0 auto;padding:0 24px}
  a{color:inherit}

  /* NAV */
  nav{position:sticky;top:0;z-index:50;background:rgba(247,245,240,.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
  .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 0;gap:16px}
  .logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--primary);line-height:1.1}
  .logo small{display:block;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:2px;color:var(--accent);font-weight:600;margin-top:2px}
  .nav-links{display:flex;gap:28px;list-style:none;flex-wrap:wrap}
  .nav-links a{text-decoration:none;font-weight:500;font-size:13px;transition:color .2s}
  .nav-links a:hover{color:var(--primary-2)}

  /* HERO */
  .hero{padding:110px 0 90px;text-align:center;background:radial-gradient(circle at 20% 20%,rgba(201,161,74,.1),transparent 50%),radial-gradient(circle at 80% 70%,rgba(15,61,62,.07),transparent 50%)}
  .eyebrow{display:inline-block;padding:6px 16px;background:var(--surface);border:1px solid var(--line);border-radius:999px;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--primary);font-weight:600;margin-bottom:24px}
  .hero h1{font-family:'Playfair Display',serif;font-size:clamp(34px,5.5vw,64px);line-height:1.08;font-weight:700;max-width:980px;margin:0 auto 24px}
  .hero h1 em{font-style:italic;color:var(--primary-2)}
  .hero .tagline{font-size:15px;color:var(--accent);font-weight:600;letter-spacing:1.5px;margin-bottom:20px;text-transform:uppercase}
  .hero p.lead{font-size:17px;color:var(--muted);max-width:720px;margin:0 auto 36px}
  .hero-divider{width:60px;height:3px;background:var(--accent);margin:0 auto}
  .hero-cta{display:inline-flex;gap:12px;margin-top:32px;flex-wrap:wrap;justify-content:center}
  .btn{padding:14px 28px;border-radius:999px;font-weight:600;font-size:14px;text-decoration:none;transition:all .25s;display:inline-block}
  .btn-primary{background:var(--primary);color:#fff}
  .btn-primary:hover{background:var(--primary-2);transform:translateY(-2px)}
  .btn-ghost{border:1.5px solid var(--primary);color:var(--primary)}
  .btn-ghost:hover{background:var(--primary);color:#fff}

  /* SECTIONS */
  section{padding:90px 0}
  .section-head{text-align:center;margin-bottom:60px}
  .section-tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px}
  .section-head h2{font-family:'Playfair Display',serif;font-size:clamp(30px,4vw,46px);font-weight:700;color:var(--primary);margin-bottom:14px;line-height:1.15}
  .section-head p{color:var(--muted);max-width:640px;margin:0 auto}

  .alt-bg{background:var(--surface)}
  .dark-bg{background:var(--primary);color:#e8e3d6}
  .dark-bg .section-head h2{color:#fff}
  .dark-bg .section-head p{color:rgba(255,255,255,.75)}

  /* ABOUT */
  .about-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;align-items:start}
  .about-text p{margin-bottom:18px;color:var(--muted);font-size:15.5px}
  .about-text p strong{color:var(--ink)}
  .stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
  .stat{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:28px 20px;text-align:center}
  .stat .num{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:var(--primary);line-height:1}
  .stat .label{font-size:12px;color:var(--muted);margin-top:8px;letter-spacing:1px;text-transform:uppercase}

  /* MV cards */
  .mv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px}
  .mv-card{background:var(--surface);border-radius:20px;padding:40px 32px;border:1px solid var(--line);position:relative;overflow:hidden}
  .mv-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--accent))}
  .mv-card .icon{width:54px;height:54px;border-radius:14px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:26px}
  .mv-card h3{font-family:'Playfair Display',serif;font-size:24px;color:var(--primary);margin-bottom:12px}
  .mv-card p{color:var(--muted);font-size:15px}

  /* Values */
  .values-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}
  .value{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px;transition:transform .25s}
  .value:hover{transform:translateY(-4px);border-color:var(--accent)}
  .value h4{font-family:'Playfair Display',serif;font-size:18px;color:var(--primary);margin-bottom:8px}
  .value p{font-size:13.5px;color:var(--muted)}

  /* Programs */
  .programs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
  .program{background:var(--surface);border-radius:16px;padding:28px;border:1px solid var(--line);transition:all .25s;position:relative;padding-left:80px}
  .program:hover{box-shadow:var(--shadow);transform:translateY(-3px)}
  .program .num{position:absolute;left:24px;top:28px;width:40px;height:40px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'Playfair Display',serif}
  .program h4{font-size:16px;color:var(--ink);margin-bottom:8px;font-weight:600}
  .program p{font-size:14px;color:var(--muted)}

  /* List style */
  .check-list{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
  .check-list li{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px 20px 18px 50px;position:relative;font-size:14.5px}
  .check-list li::before{content:'✓';position:absolute;left:18px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:var(--accent);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}

  /* Achievements */
  .ach-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}
  .ach{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:24px;backdrop-filter:blur(10px)}
  .ach .num{font-family:'Playfair Display',serif;font-size:26px;color:var(--accent);font-weight:700;line-height:1;margin-bottom:10px}
  .ach p{font-size:14.5px;color:rgba(255,255,255,.85);line-height:1.6}

  /* Partners */
  .partners-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
  .partner{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px;text-align:center;font-size:14px;font-weight:500;color:var(--ink);transition:all .25s}
  .partner:hover{border-color:var(--accent);background:var(--accent-soft)}

  /* Products */
  .products-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
  .product{background:var(--surface);border-radius:16px;padding:32px 24px;text-align:center;border:1px solid var(--line);transition:transform .25s}
  .product:hover{transform:translateY(-5px);box-shadow:var(--shadow)}
  .product .icon{font-size:36px;margin-bottom:14px}
  .product h4{font-size:15px;color:var(--ink);font-weight:600}

  /* Leadership */
  .grid{display:grid;gap:28px}
  .grid-4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
  .card{background:var(--surface);border-radius:16px;padding:32px 20px;text-align:center;border:1px solid var(--line);transition:all .3s}
  .card:hover{transform:translateY(-6px);box-shadow:var(--shadow)}
  .avatar{width:110px;height:110px;border-radius:50%;margin:0 auto 18px;background:linear-gradient(135deg,#e8e3d6,#d4cdb8);display:flex;align-items:center;justify-content:center;border:3px solid var(--surface);box-shadow:0 0 0 2px var(--accent);font-family:'Playfair Display',serif;font-size:32px;font-weight:700;color:var(--primary)}
  .card .name{font-family:'Playfair Display',serif;font-size:18px;font-weight:600;margin-bottom:6px}
  .card .role{font-size:12.5px;color:var(--primary-2);font-weight:500;letter-spacing:.4px}

  .featured-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px}
  .featured-card{background:linear-gradient(180deg,#fafaf6,#f3efe5);border-radius:20px;padding:36px 24px;text-align:center;border:1px solid var(--line);position:relative;overflow:hidden}
  .featured-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--accent))}
  .featured-card .avatar{width:130px;height:130px}

  .members-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}
  .member-card{background:var(--surface);border-radius:14px;padding:20px;display:flex;align-items:center;gap:14px;border:1px solid var(--line);transition:all .25s}
  .member-card:hover{border-color:var(--accent);transform:translateY(-3px)}
  .member-card .avatar{width:54px;height:54px;margin:0;font-size:16px;flex-shrink:0;box-shadow:0 0 0 2px var(--accent)}
  .member-card .name{font-size:14.5px;font-weight:600;text-align:left;margin:0;font-family:'Inter',sans-serif}
  .member-card .role{font-size:12px;color:var(--muted);text-align:left}

  /* Hierarchy */
  .hierarchy{max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:14px;align-items:center}
  .hier-box{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px 28px;text-align:center;font-weight:600;color:var(--primary);width:100%;max-width:420px;position:relative}
  .hier-box.top{background:var(--primary);color:#fff;border-color:var(--primary)}
  .hier-box.accent{background:var(--accent);color:#fff;border-color:var(--accent)}
  .hier-arrow{color:var(--accent);font-size:20px}

  /* Contact */
  .contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
  .office{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:28px}
  .office h4{font-family:'Playfair Display',serif;font-size:20px;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:10px}
  .office h4::before{content:'📍';font-size:18px}
  .office p{font-size:14px;color:rgba(255,255,255,.8);line-height:1.7}
  .contact-meta{margin-top:40px;text-align:center;padding-top:30px;border-top:1px solid rgba(255,255,255,.15)}
  .contact-meta a{color:var(--accent);text-decoration:none;font-weight:600;margin:0 12px;font-size:15px}

  /* Registration block */
  .reg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:880px;margin:0 auto}
  .reg-card{background:var(--surface);border-left:4px solid var(--accent);padding:24px 28px;border-radius:8px;box-shadow:var(--shadow)}
  .reg-card h5{font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px}
  .reg-card p{font-size:15px;color:var(--ink);font-weight:500}
  .reg-card .num{font-family:'Inter',monospace;color:var(--primary-2);margin-top:4px;font-size:14px}

  /* Footer */
  footer{background:#0a2828;color:#e8e3d6;padding:50px 0 25px;text-align:center}
  footer .logo{color:#fff}
  footer .logo small{color:var(--accent)}
  footer .tagline-foot{margin-top:16px;font-size:14px;color:var(--accent);letter-spacing:1.5px;text-transform:uppercase;font-weight:600}
  .footer-line{width:60px;height:2px;background:var(--accent);margin:24px auto}
  .copyright{font-size:13px;opacity:.6;margin-top:14px}

  @media(max-width:720px){
    .nav-links{display:none}
    section{padding:60px 0}
    .hero{padding:70px 0 60px}
    .stat-grid{grid-template-columns:1fr 1fr}
  }
</style>
</head>
<body>

<nav>
  <div class="container nav-inner">
    <div class="logo">Grassroots<small>TRINAMUL NARI UDDYAKTA SOCIETY</small></div>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#mission">Mission</a></li>
      <li><a href="#programs">Programs</a></li>
      <li><a href="#achievements">Achievements</a></li>
      <li><a href="#leadership">Leadership</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>

<header class="hero">
  <div class="container">
    <span class="eyebrow">Established 1998 · Sylhet, Bangladesh</span>
    <h1>Empowering Women,<br/><em>Building</em> a just world.</h1>
    <p class="tagline">CURATING  DEVELOPMENT  JUSTICE   AND  PEACE POWERING HER POTENTIAL</p>
    <p class="lead">Trinamul Nari Uddyakta Society (Grassroots) is a Non governmental, non political, socio economic development non-profit organization dedicated to empowering women at the grassroots level in Bangladesh.</p>
    <div class="hero-divider"></div>
    <div class="hero-cta">
      <a href="#about" class="btn btn-primary">Discover Our Work</a>
      <a href="#contact" class="btn btn-ghost">Get in Touch</a>
    </div>
  </div>
</header>

<!-- ABOUT -->
<section id="about">
  <div class="container">
    <div class="section-head">
      <div class="section-tag">About the Organization</div>
      <h2>A nationally recognized,<br/>A PLATFORM TO EASILY EMBARK UPON BY ALL </h2>
    </div>

    <div class="about-grid">
      <div class="about-text">
        <p><strong>Trinamul Nari Uddyokta Society (GRASSROOTS)</strong> is a government-registered, non-profit, and non-political organization dedicated to promoting women's entrepreneurship, skill development, and social empowerment.</p>
        <p>Established on <strong>28 September 1998 in Sylhet city</strong>, the organization has been working towards women development and entrepreneurship across the country. Registered under the Department of Women Affairs and Bangladesh Small and Cottage Industries Corporation (BSCIC), and affiliated with <strong>HomeNet International</strong>.</p>
        <p>An initiative has been taken to set up showrooms in 9 divisions and district towns under the name <strong>"GRAM"</strong> to market the products of Bangladeshi entrepreneurs. Already, 3 showrooms have been opened in Dhaka, Sylhet, and Jamalpur cities.</p>
      </div>
      <div class="stat-grid">
        <div class="stat"><div class="num">10K+</div><div class="label">Women Trained</div></div>
        <div class="stat"><div class="num">27+</div><div class="label">Years of Service</div></div>
        <div class="stat"><div class="num">3</div><div class="label">GRAM Showrooms</div></div>
        <div class="stat"><div class="num">5+</div><div class="label">Countries Reached</div></div>
      </div>
    </div>
  </div>
</section>

<!-- REGISTRATION -->
<section class="alt-bg" style="padding:60px 0">
  <div class="container">
    <div class="reg-grid">
      <div class="reg-card">
        <h5>Department of Women Affairs</h5>
        <p>Ministry of Women and Children Affairs of Bangladesh</p>
      </div>
      <div class="reg-card">
        <h5>BSCIC Registration</h5>
        <p>Bangladesh Small & Cottage Industries Corp.</p>
      </div>
	        <div class="reg-card">
        <h5>Registrar of Joint Stock Companies And Firms</h5>
        <p>Joint Stock Company .</p>
      </div>
	        <div class="reg-card">
        <h5>Registrar of Department of cooperatives</h5>
        <p>Rural Development and Cooperatives Department.</p>
      </div>
    </div>
  </div>
</section>

<!-- MISSION VISION -->
<section id="mission" class="alt-bg" style="padding-top:30px">
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Our Purpose</div>
      <h2>Mission &amp; Vision</h2>
    </div>
    <div class="mv-grid">
      <div class="mv-card">
        <div class="icon">🎯</div>
        <h3>Mission</h3>
        <p>To transform grassroots women into self-reliant entrepreneurs through inclusive economic opportunities, education, skill development, and social empowerment — ensuring equality, dignity, and sustainable livelihoods. Specially, Grassroots works to establish the rights of home-based entrepreneurs.</p>
      </div>
      <div class="mv-card">
        <div class="icon">🌟</div>
        <h3>Vision</h3>
        <p>To create a just, inclusive, and sustainable society where women entrepreneurs are empowered to lead socio-economic transformation at both national and global levels.</p>
      </div>
    </div>
  </div>
</section>

<!-- CORE VALUES -->
<section>
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Core Values</div>
      <h2>What we stand for</h2>
    </div>
    <div class="values-grid">
      <div class="value"><h4>Empowerment</h4><p>Building the capacity and confidence of women.</p></div>
      <div class="value"><h4>Integrity</h4><p>Upholding transparency, accountability, and ethical practice.</p></div>
      <div class="value"><h4>Inclusiveness</h4><p>Promoting equality regardless of religion, caste, or status.</p></div>
      <div class="value"><h4>Sustainability</h4><p>Encouraging environmentally responsible development.</p></div>
      <div class="value"><h4>Innovation</h4><p>Fostering creativity and entrepreneurship.</p></div>
      <div class="value"><h4>Collaboration</h4><p>Working with partners for collective social impact.</p></div>
    </div>
  </div>
</section>

<!-- PROGRAMS -->
<section id="programs" class="alt-bg">
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Key Program Areas</div>
      <h2>How we create change</h2>
    </div>
    <div class="programs-grid">
      <div class="program"><div class="num">1</div><h4>Women's Entrepreneurship</h4><p>Training in business management,e-commerce in the Training, financial literacy, and enterprise growth.</p></div>
      <div class="program"><div class="num">2</div><h4>Vocational & Skills</h4><p>Tailoring, weaving, handicrafts, block-batik, food processing, bamboo & cane work.</p></div>
      <div class="program"><div class="num">3</div><h4>Health & Social Welfare</h4><p>Safe motherhood, family planning, HIV/AIDS awareness, and anti-drug campaigns.</p></div>
      <div class="program"><div class="num">4</div><h4>Education & Culture</h4><p>Scholarships, cultural activities, and educational material support for poor women.</p></div>
      <div class="program"><div class="num">5</div><h4>Environment</h4><p>Tree plantation, sanitation, and environmental conservation initiatives.</p></div>
      <div class="program"><div class="num">6</div><h4>Market Linkage</h4><p>National & international fairs; connecting home producers to retail and export markets.</p></div>
      <div class="program"><div class="num">7</div><h4>Social Advocacy</h4><p>Campaigns against gender-based violence, dowry, trafficking; women's rights & leadership.</p></div>
      <div class="program"><div class="num">8</div><h4>Marketing via "GRAM"</h4><p>3 showrooms opened to market the products of country's grassroots entrepreneurs.</p></div>
      <div class="program"><div class="num">9</div><h4>Agriculture & Fisheries</h4><p>Agriculture, food processing, and modern fisheries development.</p></div>
    </div>
  </div>
</section>

<!-- CURRENT ACTIVITIES & FUTURE -->
<section>
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Activities</div>
      <h2>Current Initiatives</h2>
    </div>
    <ul class="check-list">
      <li>Marginal Entrepreneurship Development & Handicraft Training</li>
      <li>Women's Education and Empowerment Campaign</li>
      <li>Anti-Drug and HIV/AIDS Awareness Programs</li>
      <li>Clean Environment and Tree Plantation Campaigns</li>
      <li>Marketing Support for Women's Products</li>
      <li>Gender Equality and Social Rights Advocacy</li>
    </ul>

    <div class="section-head" style="margin-top:90px">
      <div class="section-tag">Looking Ahead</div>
      <h2>Future Plans</h2>
    </div>
    <ul class="check-list">
      <li>Establish Residential Training Centers for Women Entrepreneurs</li>
      <li>Launch Women's Product Showrooms across key cities</li>
      <li>Set up Daycare Centers for working mothers</li>
      <li>Build Grassroots Schools for marginalized women</li>
      <li>Develop Digital Market Linkages for women-led enterprises</li>
      <li>Expand partnerships with national & international donor organizations</li>
    </ul>
  </div>
</section>

<!-- ACHIEVEMENTS -->
<section id="achievements" class="dark-bg">
  <div class="container">
    <div class="section-head">
      <div class="section-tag" style="color:var(--accent)">Major Achievements</div>
      <h2>A legacy of impact</h2>
      <p>Recognized nationally and internationally for outstanding contributions to women's entrepreneurship and grassroots empowerment.</p>
    </div>
    <div class="ach-list">
      <div class="ach"><div class="num">22,000+</div><p>Grassroots women trained and supported in entrepreneurship and handicrafts.</p></div>
      <div class="ach"><div class="num">2015</div><p>Outstanding Community Service Award by FOBANA, New York, USA, for exceptional contributions to women entrepreneurship.</p></div>
      <div class="ach"><div class="num">30+</div><p>Women entrepreneurs participated in the National Women Entrepreneurs Exhibition held at Barisal Town Hall.</p></div>
      <div class="ach"><div class="num">33</div><p>Women leaders empowered through national leadership and time-management training in partnership with WSAD (New Zealand) and N2.</p></div>
      <div class="ach"><div class="num">C-177</div><p>Organized nationwide Human Chain Movements supporting ILO Convention C-177 for fair labor practices for home-based workers.</p></div>
      <div class="ach"><div class="num">SDG 1·5·8</div><p>Actively contributing to UN Sustainable Development Goals: No Poverty, Gender Equality, and Decent Work & Economic Growth.</p></div>
      <div class="ach"><div class="num">3</div><p>Owned and operated training centers in Sylhet, Dhaka, and Jamalpur Sadar.</p></div>
      <div class="ach"><div class="num">Global</div><p>Partnered with reputed national & international organizations for capacity building and exhibitions.</p></div>
	  <div class="ach"><div class="num">2016</div><p>As a Best Community Based Organization, CWCCI Chittagong 2016 Award will be given.</p></div>
	  <div class="ach"><div class="num">2017</div><p>Partnership Award presented by MoiDanav (India) in 2017.</p></div>  
    </div>
  </div>
</section>

<!-- PRODUCTS -->
<section>
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Product Sectors</div>
      <h2>Crafted by women,<br/>celebrated worldwide</h2>
      <p>Products are showcased in exhibitions across Bangladesh, India, Nepal, China, and the USA.</p>
    </div>
    <div class="products-grid">
      <div class="product"><div class="icon">🧵</div><h4>Handicrafts & Embroidery</h4></div>
      <div class="product"><div class="icon">🎋</div><h4>Bamboo & Cane Products</h4></div>
      <div class="product"><div class="icon">🎨</div><h4>Natural Dye & Block Print</h4></div>
      <div class="product"><div class="icon">🌶️</div><h4>Food Processing</h4></div>
      <div class="product"><div class="icon">🏡</div><h4>Eco-Friendly Home Décor</h4></div>
      <div class="product"><div class="icon">🌾</div><h4>Agriculture & Fisheries</h4></div>
    </div>
  </div>
</section>

<!-- PARTNERS -->
<section class="alt-bg">
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Strategic Partners</div>
      <h2>In good company</h2>
    </div>
    <div class="partners-grid">
      <div class="partner">SME Foundation</div>
      <div class="partner">BSCIC</div>
      <div class="partner">AB Bank PLC</div>
	  <div class="partner">Bank Asia PLC</div>
      <div class="partner">Eastern Bank PLC</div>
      <div class="partner">PUM Netherlands</div>
      <div class="partner">Tisser International</div>
      <div class="partner">Honorat HRD Center</div>
      <div class="partner">Department of Women Affairs</div>
      <div class="partner">BSnet (GIZ)</div>
      <div class="partner">Grassroots International</div>
	  <div class="partner">Sylhet City Corporation</div>
	  <div class="partner">Tower Hamlets(UK)</div>
	  <div class="partner">Asia Foundation</div>
      <div class="partner">SAGDF</div>
      <div class="partner">HomeNet International</div>
    </div>
  </div>
</section>

<!-- ORGANIZATIONAL HIERARCHY -->
<section>
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Governance</div>
      <h2>Organizational Hierarchy</h2>
      <p>The organization follows democratic and participatory principles, ensuring transparency, accountability, and equal representation.</p>
    </div>
    <div class="hierarchy">
      <div class="hier-box top">General Council</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box top">Executive Council</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box accent">Steering Committee</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box">President / General Secretary</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box">Chief Executive Officer (CEO)</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box">Secretariat of Executive Management</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box">Field Management (District Committees)</div>
      <div class="hier-arrow">↓</div>
      <div class="hier-box">General Members</div>
    </div>
  </div>
</section>

<!-- LEADERSHIP -->
<section id="leadership" class="alt-bg">
  <div class="container">
    <div class="section-head">
      <div class="section-tag">Board of Advisors</div>
      <h2>Guiding Vision</h2>
    </div>
    <div class="grid grid-4">
      <div class="card"><div class="avatar">MF</div><div class="name">Mamtaj Faruki Chowdhury</div><div class="role">Board Advisor</div></div>
      <div class="card"><div class="avatar">AH</div><div class="name">Abul Hossain</div><div class="role">Board Advisor</div></div>
      <div class="card"><div class="avatar">KA</div><div class="name">Khan Asadujjaman Masum</div><div class="role">Board Advisor</div></div>
      <div class="card"><div class="avatar">MP</div><div class="name">Maleka Parveen Moli</div><div class="role">Board Advisor</div></div>
    </div>

    <div class="section-head" style="margin-top:80px">
      <div class="section-tag">Executive Board</div>
      <h2>Leadership Team</h2>
    </div>

    <div class="featured-grid">
      <div class="featured-card"><div class="avatar">HM</div><div class="name">Dr. Himangshu Mitra</div><div class="role">Chief Executive Officer</div></div>
      <div class="featured-card"><div class="avatar">HK</div><div class="name">Helena Khanom</div><div class="role">President</div></div>
      <div class="featured-card"><div class="avatar">AD</div><div class="name">Anita Das Gupta</div><div class="role">National Co-ordinator</div></div>
    </div>

    <div class="featured-grid" style="margin-top:28px">
      <div class="featured-card"><div class="avatar">SS</div><div class="name">Sabiha Siddique</div><div class="role">Vice President</div></div>
      <div class="featured-card"><div class="avatar">BA</div><div class="name">Mos. Tahmina Ahmed Beauty</div><div class="role">Vice President</div></div>
      <div class="featured-card"><div class="avatar">NR</div><div class="name">Nadira Hossain Rupa</div><div class="role">Joint Secretary</div></div>
      <div class="featured-card"><div class="avatar">AM</div><div class="name">Arjumanara Mukta</div><div class="role">Joint Secretary</div></div>
    </div>

    <div class="section-head" style="margin-top:80px">
      <div class="section-tag">Executive Members</div>
      <h2>Dedicated Members</h2>
    </div>
    <div class="members-grid">
      <div class="member-card"><div class="avatar">RN</div><div><div class="name">Rokeya Nasreen</div><div class="role">Executive Member</div></div></div>
      <div class="member-card"><div class="avatar">MS</div><div><div class="name">Ms. Siddiqua</div><div class="role">Executive Member</div></div></div>
      <div class="member-card"><div class="avatar">MP</div><div><div class="name">Moni Pahari</div><div class="role">Executive Member</div></div></div>
      <div class="member-card"><div class="avatar">AP</div><div><div class="name">Asma Parveen Ruma</div><div class="role">Executive Member</div></div></div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="dark-bg">
  <div class="container">
    <div class="section-head">
      <div class="section-tag" style="color:var(--accent)">Get in Touch</div>
      <h2>Visit our offices</h2>
      <p>Three regional offices serving women entrepreneurs across Bangladesh.</p>
    </div>

    <div class="contact-grid">
      <div class="office">
        <h4>Dhaka Office</h4>
        <p>Senator Shopping Complex<br/>House No: 05, Road No: 01, Block-F<br/>Banasree, Dhaka, Bangladesh</p>
      </div>
      <div class="office">
        <h4>Sylhet Office</h4>
        <p>Anando Tower, 06/D<br/>Jail Road, Sylhet<br/>Bangladesh</p>
      </div>
      <div class="office">
        <h4>Jamalpur Office</h4>
        <p>Rahima Plaza, 3rd Floor<br/>Tomal Tola, Jamalpur<br/>Bangladesh</p>
      </div>
    </div>

    <div class="contact-meta">
      <a href="tel:+8801881443802">📞 +880 1881 443 802</a>
      <a href="mailto:nariuddyakta@gmail.com">✉️ nariuddyakta@gmail.com</a>
    </div>
  </div>
</section>

<!-- Membership Section -->
<section id="membership" class="py-24 bg-gradient-to-b from-green-50 to-white">

  <div class="max-w-5xl mx-auto px-6 text-center">

    <span class="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold tracking-wide shadow">
      JOIN OUR COMMUNITY
    </span>

    <h2 class="text-4xl md:text-5xl font-extrabold text-green-700 mt-6 mb-6">
      Membership Registration
    </h2>

    <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
      Become part of Grassroots Women Empowerment Society and help create
      sustainable social impact through leadership, empowerment, and innovation.
    </p>

    <!-- Main Button -->
    <a href="membership.html"
       class="inline-flex items-center gap-4 bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white text-xl font-bold px-10 py-5 rounded-3xl shadow-2xl transition duration-300 hover:scale-105">

      <span class="text-3xl">✦</span>

      Apply For Membership

    </a>

  </div>

</section>
<footer>
  <div class="container">
    <div class="logo">Grassroots<small>TRINAMUL NARI UDDYAKTA SOCIETY</small></div>
    <div class="tagline-foot">Empowering Women • Inspiring Change • Building a Better Tomorrow</div>
    <div class="footer-line"></div>
    <p class="copyright">© 2025 Trinamul Nari Uddyakta Society (Grassroots). All rights reserved.</p>
  </div>
</footer>

</body>
</html>
