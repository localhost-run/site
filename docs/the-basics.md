# Creating the website files and zipping them into a ready-to-host archive.
# The HTML uses WebAudio to synthesize a soft acoustic-like guitar loop (no external mp3 required).
# Files created: index.html, README.txt, Prashita_website.zip

html = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Happy Birthday Prashita 🌸</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
<style>
  :root{
    --pink:#ff5c93;
    --soft:#ffdfe9;
    --accent:#ff3b8d;
    --green1:#9adf8a;
    --green2:#6fcf6f;
  }
  html,body{height:100%;margin:0;font-family:'Poppins',sans-serif;background:linear-gradient(180deg,#fff7fb 0%, #fff 20%);overflow:hidden}
  .center-wrap{
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap:18px;
    position:relative;
    padding:24px;
    box-sizing:border-box;
  }

  /* initial big heart container */
  .big-heart {
    width:220px;
    height:220px;
    position:relative;
    cursor:pointer;
    transition:transform .3s ease;
    display:flex;align-items:center;justify-content:center;
  }
  .big-heart:hover{ transform:scale(1.03) }
  .heart-shape{
    width:100%;
    height:100%;
    background:linear-gradient(180deg,#ff98b9 0,#ff5c93 80%);
    transform:rotate(-45deg);
    border-radius:22px 22px 22px 22px;
    position:absolute;
    left:0; top:0;
    box-shadow: 0 15px 35px rgba(255,92,147,0.25), inset 0 -8px 12px rgba(0,0,0,0.06);
  }
  .heart-shape::before, .heart-shape::after{
    content:"";
    position:absolute;
    width:100%;
    height:100%;
    background:inherit;
    border-radius:50%;
  }
  .heart-shape::before{ top:-50%; left:0; }
  .heart-shape::after{ left:50%; top:0; }

  /* sparkle birthday message */
  .birthday-msg{
    position: absolute;
    top: 24%;
    transform: translateY(-50%);
    font-size: clamp(20px,4.6vw,46px);
    font-weight:800;
    letter-spacing:2px;
    color:var(--accent);
    text-align:center;
    opacity:0;
    filter:drop-shadow(0 6px 12px rgba(255,92,147,0.15));
    pointer-events:none;
    z-index:10;
  }
  .sparkle{
    display:inline-block;
    position:relative;
  }
  /* tiny sparkles */
  .sparkle::after{
    content:"";
    position:absolute;
    width:8px;height:8px;
    background:linear-gradient(180deg,#fff,#ffe7f0);
    left:-10px; top:-10px;
    border-radius:50%;
    box-shadow: 0 0 12px rgba(255,200,220,0.9);
    opacity:0;
    transform:scale(.4);
    animation: twinkle 1.8s infinite ease-in-out;
  }
  @keyframes twinkle{
    0%{opacity:0; transform:scale(.4)}
    30%{opacity:1; transform:scale(1.1)}
    100%{opacity:0; transform:scale(.6)}
  }

  /* exploding particles */
  .particle {
    position:absolute;
    width:10px;height:10px;border-radius:50%;
    background:var(--pink); opacity:0;
    pointer-events:none;
    transform:translate(-50%,-50%) scale(.9);
  }

  /* flower */
  .flower {
    width:120px;height:120px;
    position:relative;
    margin-top:14px;
    opacity:0; transform:scale(.6);
    transition:all .9s cubic-bezier(.2,.9,.2,1);
    pointer-events:none;
  }
  .petal{
    position:absolute;
    left:50%; top:50%;
    width:54px;height:90px;
    background:linear-gradient(180deg,#ffb0c7,#ff8eb0);
    border-radius:50% 50% 45% 45%;
    transform-origin:bottom center;
    opacity:0;
  }
  .petal.p1{ transform: translate(-50%,-50%) rotate(0deg) translateY(-12px); }
  .petal.p2{ transform: translate(-50%,-50%) rotate(72deg) translateY(-12px); }
  .petal.p3{ transform: translate(-50%,-50%) rotate(144deg) translateY(-12px); }
  .petal.p4{ transform: translate(-50%,-50%) rotate(216deg) translateY(-12px); }
  .petal.p5{ transform: translate(-50%,-50%) rotate(288deg) translateY(-12px); }

  .center-flower{
    position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
    width:46px;height:46px;border-radius:50%; background:linear-gradient(180deg,#ffd24d,#ffd24d);
    box-shadow:0 8px 18px rgba(0,0,0,0.08);
    opacity:0;
  }
  .click-me{
    margin-top:10px; font-weight:600; color:#6b6b6b; opacity:0; transform:translateY(6px);
    transition:all .5s ease;
  }

  /* final meadow scene */
  .meadow {
    position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
    background:linear-gradient(180deg,#bce7a2 0%, #7fd06b 100%);
    transform:scale(1.12) translateY(10px); opacity:0; visibility:hidden;
    transition:all .9s cubic-bezier(.22,.9,.22,1);
    flex-direction:column;
    overflow:hidden;
  }
  .meadow.show{ opacity:1; visibility:visible; transform:scale(1) translateY(0); }

  .hills{
    position:absolute; bottom:0; width:120%; height:48%;
    background: radial-gradient(circle at 20% 40%, rgba(255,255,255,0.08), transparent 15%),
                linear-gradient(180deg,#9ddf90 0%, #69c95a 100%);
    border-radius:50% 50% 0 0 / 60% 60% 0 0;
    transform:translateY(12%);
    filter: drop-shadow(0 -6px 20px rgba(0,0,0,0.06));
  }
  .tree{
    position:absolute; left:12%; bottom:26%; width:90px; height:140px;
    background:linear-gradient(180deg,#4eb04b,#2f8f32);
    border-radius: 50% 50% 0 0;
    transform:skewX(-6deg);
    box-shadow: -8px 18px 22px rgba(0,0,0,0.07);
  }

  .meadow-text{
    font-size: clamp(26px,4.6vw,56px);
    color:#114b13;
    font-weight:800;
    text-align:center;
    text-shadow: 0 6px 16px rgba(0,0,0,0.12);
    z-index:5;
    opacity:0; transform:translateY(6px);
    transition:all .8s ease;
  }

  .meadow.show .meadow-text{ opacity:1; transform:translateY(0) }

  /* floating hearts in final scene */
  .floating-heart{
    position:absolute; width:22px;height:22px; background:var(--pink); transform:rotate(45deg);
    border-radius:0;
    animation: floatUp 6s linear infinite;
    opacity:0;
    z-index:6;
  }
  .floating-heart::before, .floating-heart::after{
    content:""; position:absolute; width:22px;height:22px; background:var(--pink); border-radius:50%;
  }
  .floating-heart::before{ top:-11px; left:0 }
  .floating-heart::after{ left:11px; top:0 }
  @keyframes floatUp {
    0%{ transform:translateY(0) rotate(45deg) scale(.9); opacity:0 }
    5%{ opacity:1 }
    100%{ transform:translateY(-480px) rotate(45deg) scale(.7); opacity:0 }
  }

  /* popup modal */
  .modal {
    position:fixed; left:50%; top:50%; transform:translate(-50%,-50%) scale(.96); background:rgba(255,255,255,0.98);
    padding:18px 20px; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.12);
    z-index:99; opacity:0; visibility:hidden; transition:all .45s cubic-bezier(.2,.9,.2,1);
    max-width:90%;
    text-align:center;
  }
  .modal.show{ opacity:1; visibility:visible; transform:translate(-50%,-50%) scale(1); }
  .modal h3{ margin:0 0 6px 0; font-size:18px; color:#333 }
  .modal p{ margin:0; color:#666; font-weight:600 }

  /* helper */
  .invisible{visibility:hidden; opacity:0}
  .btn-small{
    margin-top:10px; padding:10px 18px; border-radius:999px; border:none; cursor:pointer;
    background:linear-gradient(90deg,var(--accent),#ff669e); color:white; font-weight:700;
    box-shadow:0 8px 22px rgba(255,92,147,0.16);
  }

  /* responsive tweaks */
  @media (max-width:520px){
    .big-heart{width:160px;height:160px}
    .flower{width:96px;height:96px}
    .meadow-text{font-size:clamp(20px,8vw,40px)}
  }
</style>
</head>
<body>
  <div class="center-wrap" id="stageRoot">

    <!-- Stage 1: Big clickable heart -->
    <div id="heartStage" style="display:flex;flex-direction:column;align-items:center;">
      <div class="big-heart" id="bigHeart" title="Tap me" tabindex="0" aria-label="Tap the heart">
        <div class="heart-shape"></div>
      </div>
      <div style="text-align:center">
        <div style="font-weight:600;color:#6b6b6b">Tap the heart ❤️</div>
      </div>
    </div>

    <!-- birthday message overlay (hidden initially) -->
    <div class="birthday-msg" id="birthdayMsg" aria-hidden="true">
      <!-- each letter wrapped for sparkle effect -->
      <span id="bdText" class="sparkle">HAPPY BIRTHDAY PRASHITA!</span>
    </div>

    <!-- flower (appears after birthday message) -->
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div class="flower" id="flower" title="Click me" tabindex="0" aria-label="Click the flower">
        <div class="petal p1"></div>
        <div class="petal p2"></div>
        <div class="petal p3"></div>
        <div class="petal p4"></div>
        <div class="petal p5"></div>
        <div class="center-flower"></div>
      </div>
      <div class="click-me" id="clickMeSmall">Click me 🌼</div>
    </div>
  </div>

  <!-- final meadow scene -->
  <div class="meadow" id="meadow">
    <div class="hills"></div>
    <div class="tree"></div>
    <div class="meadow-text" id="finalText">I love you so much</div>
  </div>

  <!-- final popup modal -->
  <div class="modal" id="finalModal" role="dialog" aria-modal="true">
    <h3>I hope you like it</h3>
    <p>— by your Sunshine 💛</p>
    <button class="btn-small" id="closeModal">Close</button>
  </div>

<script>
  // Elements
  const bigHeart = document.getElementById('bigHeart');
  const birthdayMsg = document.getElementById('birthdayMsg');
  const bdText = document.getElementById('bdText');
  const flower = document.getElementById('flower');
  const petals = flower.querySelectorAll('.petal');
  const centerFl = flower.querySelector('.center-flower');
  const clickMeSmall = document.getElementById('clickMeSmall');
  const meadow = document.getElementById('meadow');
  const finalText = document.getElementById('finalText');
  const modal = document.getElementById('finalModal');
  const closeModal = document.getElementById('closeModal');

  // WebAudio context for soft acoustic-like guitar synthesis
  let audioCtx = null;
  function initAudio(){
    if(audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // simple plucked-string-ish synth using filtered noise + envelope (arpeggio loop)
  function startGuitarLoop(){
    if(!audioCtx) return;
    // pattern of frequencies (a gentle chord/arpeggio)
    const pattern = [440, 523.25, 392, 659.25]; // A4, C5, G4, E5-ish
    let i = 0;
    const master = audioCtx.createGain();
    master.gain.value = 0.35;
    master.connect(audioCtx.destination);

    function pluck(freq, time){
      // create a short noise burst filtered to sound plucky
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const biquad = audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      biquad.type = 'lowpass';
      biquad.frequency.value = 1200;
      biquad.Q.value = 1;

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(1.0, time + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

      osc.connect(biquad);
      biquad.connect(gain);
      gain.connect(master);

      osc.start(time);
      osc.stop(time + 2.0);
    }

    // schedule loop
    let now = audioCtx.currentTime;
    const bpm = 60;
    const beat = 60 / bpm;
    const scheduler = () => {
      const t = audioCtx.currentTime;
      // schedule next 4 notes
      for(let k=0;k<4;k++){
        const when = t + k * 0.48;
        pluck(pattern[(i + k) % pattern.length], when);
      }
      i = (i + 1) % pattern.length;
    };
    // run immediately then every 2 seconds
    scheduler();
    const id = setInterval(scheduler, 2000);

    // return a stop function
    return () => {
      clearInterval(id);
      master.disconnect();
    };
  }

  // create explosion particles utility
  function createParticle(x,y, parent){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = `hsl(${Math.random()*30 + 330},80%,60%)`;
    parent.appendChild(p);
    const rot = (Math.random()*360).toFixed(1);
    const dx = (Math.random()*360 - 180).toFixed(1);
    const dy = (Math.random()*220 - 110).toFixed(1);
    p.animate([
      { transform:`translate(0,0) scale(1)`, opacity:1 },
      { transform:`translate(${dx}px, ${dy}px) scale(.4) rotate(${rot}deg)`, opacity:0 }
    ], { duration:700 + Math.random()*600, easing:'cubic-bezier(.2,.9,.2,1)'});
    setTimeout(()=> p.remove(), 1400);
  }

  // Stage 1: heart click -> birthday reveal
  bigHeart.addEventListener('click', async (e) => {
    initAudio(); // user gesture allows audio to be created
    bigHeart.animate([{transform:'scale(1)'},{transform:'scale(0.92)'},{transform:'scale(0)'}],{duration:420,easing:'cubic-bezier(.2,.9,.2,1)'});
    const rect = bigHeart.getBoundingClientRect();
    for(let i=0;i<22;i++){
      createParticle(rect.left + rect.width/2 + (Math.random()*80-40), rect.top + rect.height/2 + (Math.random()*80-40), document.body);
    }
    setTimeout(()=> {
      birthdayMsg.style.opacity = 1;
      birthdayMsg.style.transform = 'translateY(0)';
      birthdayMsg.style.transition = 'all .9s cubic-bezier(.22,.9,.22,1)';
      const text = bdText.textContent;
      bdText.innerHTML = '';
      for(let i=0;i<text.length;i++){
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.display='inline-block';
        span.style.opacity=0;
        span.style.transform='translateY(6px) scale(.98)';
        span.style.transition = `all .5s cubic-bezier(.2,.9,.2,1) ${(i*0.03)}s`;
        bdText.appendChild(span);
      }
      requestAnimationFrame(()=> {
        const spans = bdText.querySelectorAll('span');
        spans.forEach((s, idx)=>{
          s.style.opacity = 1;
          s.style.transform = 'translateY(0) scale(1)';
          s.animate([{filter:'drop-shadow(0 0 0 rgba(255,255,255,0))'},{filter:'drop-shadow(0 12px 28px rgba(255,145,180,0.24))'}],{duration:900,delay:idx*40});
        });
      });
    }, 220);

    // after a moment show flower
    setTimeout(()=> {
      document.getElementById('heartStage').style.opacity = 0; document.getElementById('heartStage').style.visibility = 'hidden';
      flower.style.pointerEvents = 'auto';
      flower.style.opacity = 1;
      flower.style.transform = 'scale(1)';
      centerFl.style.opacity = 1;
      petals.forEach((p, i) => {
        setTimeout(()=> {
          p.style.opacity = 1;
          p.animate([{transform:'translate(-50%,-50%) scale(.2) rotate(0deg)'},{transform:p.style.transform + ' scale(1)'}],{duration:650,easing:'cubic-bezier(.22,.9,.22,1)'});
        }, 140 + i*80);
      });
      clickMeSmall.style.opacity = 1; clickMeSmall.style.transform = 'translateY(0)';
    }, 1500);
  });

  // Stage 2 -> click flower -> final meadow
  let stopAudioLoop = null;
  flower.addEventListener('click', async () => {
    flower.animate([{transform:'scale(1)'},{transform:'scale(.92)'},{transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.2,.9,.2,1)'});
    petals.forEach((p,i)=> {
      p.animate([{transform:p.style.transform+' scale(1)', opacity:1},{transform:`translate(-50%,-50%) translateY(-80px) scale(.2)`, opacity:0}],{duration:760,delay:i*60,easing:'cubic-bezier(.22,.9,.22,1)'});
    });
    centerFl.animate([{transform:'scale(1)'},{transform:'scale(0.2)', opacity:0}],{duration:700, easing:'ease-in'});
    clickMeSmall.style.opacity = 0;

    setTimeout(()=> {
      document.getElementById('stageRoot').style.opacity = 0;
      document.getElementById('stageRoot').style.visibility = 'hidden';
      meadow.classList.add('show');

      for(let i=0;i<24;i++){
        createMeadowHeart(i);
      }

      setTimeout(()=> {
        finalText.style.opacity = 1;
        finalText.style.transform = 'translateY(0)';
      }, 350);

      // start soft guitar loop
      if(audioCtx){
        stopAudioLoop = startGuitarLoop();
      }

      // show final popup automatically after short delay
      setTimeout(()=> {
        modal.classList.add('show');
      }, 1200);

    }, 920);
  });

  // create floating hearts in meadow
  function createMeadowHeart(i){
    const h = document.createElement('div');
    h.className = 'floating-heart';
    const left = Math.random()*80 + 8;
    h.style.left = left + '%';
    h.style.bottom = (20 + Math.random()*10) + '%';
    h.style.animationDelay = (Math.random()*4)+'s';
    h.style.opacity = 0.95;
    h.style.width = (12 + Math.random()*20)+'px';
    h.style.height = (12 + Math.random()*20)+'px';
    h.style.zIndex = 6;
    document.body.appendChild(h);
    setTimeout(()=> h.remove(), 18000 + Math.random()*12000);
  }

  // modal close behaviour
  closeModal.addEventListener('click', ()=> {
    modal.classList.remove('show');
  });

  // accessibility keyboard triggers
  bigHeart.addEventListener('keydown', (ev)=> {
    if(ev.key === 'Enter' || ev.key === ' ') bigHeart.click();
  });
  flower.addEventListener('keydown', (ev)=> {
    if(ev.key === 'Enter' || ev.key === ' ') flower.click();
  });

  // allow clicking meadow to create particles
  document.getElementById('meadow').addEventListener('click', (e)=>{
    for(let i=0;i<8;i++){
      createParticle(e.clientX + (Math.random()*80-40), e.clientY + (Math.random()*80-40), document.body);
    }
  });

  // stop audio on page hide/unload to be polite
  window.addEventListener('pagehide', () => {
    if(stopAudioLoop) stopAudioLoop();
    if(audioCtx && audioCtx.state !== 'closed') audioCtx.close();
  });
</script>

</body>
</html>
"""

readme = r"""Prashita Birthday Website - Ready to Host
Files:
- index.html   (interactive single-page website)
- README.txt   (this file)

How it works:
1) Open index.html in any modern browser (mobile or desktop).
2) Stage 1: Tap the heart -> "HAPPY BIRTHDAY PRASHITA!" appears.
3) Stage 2: A flower blooms with "Click me".
4) Stage 3: Click the flower -> cartoon meadow appears, "I love you so much" shows, floating hearts and soft acoustic guitar synth start.
5) A popup appears automatically: "I hope you like it — by your Sunshine 💛"

Notes:
- The audio is generated in-browser using the Web Audio API (soft acoustic-like synth). No external MP3 required.
- If you prefer to use a specific MP3 file:
  * Download your preferred mp3 (e.g. a soft acoustic guitar loop) and name it "guitar.mp3".
  * Replace the WebAudio code in index.html (search for "WebAudio" comments) or swap the audio creation with a simple <audio> tag pointing to guitar.mp3.
- To host on GitHub Pages:
  * Create a new repo, upload index.html, then enable GitHub Pages under repo Settings -> Pages -> Deploy from main branch.
  * The site will be available at https://<your-username>.github.io/<repo-name>/

If you want, I can:
- Replace the WebAudio with an embedded mp3 URL (if you give me a direct mp3 link).
- Create a GitHub repo and push this for you (I can guide you step-by-step).
Enjoy — and happy birthday to Prashita! 💛
"""

# write files and zip
import os, zipfile
os.makedirs('/mnt/data/prashita_site', exist_ok=True)
with open('/mnt/data/prashita_site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
with open('/mnt/data/prashita_site/README.txt', 'w', encoding='utf-8') as f:
    f.write(readme)

zip_path = '/mnt/data/Prashita_website.zip'
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write('/mnt/data/prashita_site/index.html', arcname='index.html')
    z.write('/mnt/data/prashita_site/README.txt', arcname='README.txt')

zip_path


<PortChooser />
