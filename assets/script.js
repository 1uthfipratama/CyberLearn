
// Basic interactions and animations for demo
document.addEventListener('DOMContentLoaded', () => {
  injectQuizStyles();
  injectDashboardStyles();
  injectLessonStyles();
  injectAuthStyles();
  injectForumStyles();

  function injectQuizStyles(){
    if(document.getElementById('quizEnhanceStyles')) return;
    const style = document.createElement('style');
    style.id = 'quizEnhanceStyles';
    style.textContent = `
      .choice-btn{
        position: relative;
        transition: transform 0.2s ease, box-shadow 0.35s ease, border-color 0.3s ease, background 0.3s ease;
      }
      .choice-btn.is-choosing{
        animation: choicePulse 0.45s ease forwards;
        box-shadow: 0 10px 25px rgba(43, 110, 246, 0.25);
      }
      .choice-btn.is-correct{
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 0 0 3px rgba(43, 110, 246, 0.35), 0 14px 30px rgba(43, 110, 246, 0.25);
      }
      .choice-btn.is-wrong{
        box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.25), 0 14px 30px rgba(244, 63, 94, 0.2);
      }
      .choice-btn:disabled{
        cursor: not-allowed;
      }
      .choice-btn::after{
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 10px;
        opacity: 0;
        pointer-events: none;
        background: radial-gradient(circle at center, rgba(43,110,246,0.2), transparent 60%);
        transition: opacity 0.2s ease;
      }
      .choice-btn.is-choosing::after{ opacity: 1; }
      @keyframes choicePulse{
        0%{ transform: scale(1); }
        50%{ transform: scale(1.025); }
        100%{ transform: scale(1); }
      }
      .primary.pulse-ready{
        animation: pulseReady 1.35s ease-in-out infinite;
        box-shadow: 0 15px 35px rgba(43, 110, 246, 0.25);
      }
      @keyframes pulseReady{
        0%{ box-shadow: 0 0 0 0 rgba(43, 110, 246, 0.55); }
        100%{ box-shadow: 0 0 0 18px rgba(43, 110, 246, 0); }
      }
      .sound-toggle{
        border: 1px solid rgba(255,255,255,0.15);
        background: linear-gradient(135deg, rgba(43,110,246,0.14), rgba(31,78,216,0.2));
        color: #e5edff;
        padding: 8px 12px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        cursor: pointer;
        font-size: 13px;
        transition: transform 0.2s ease, box-shadow 0.3s ease;
      }
      .sound-toggle:hover{ transform: translateY(-1px); box-shadow: 0 8px 18px rgba(43,110,246,0.25); }
      .sound-toggle.is-choosing{ animation: choicePulse 0.35s ease; }
      .sound-toggle.muted{ opacity: 0.7; }
      .confetti-piece{
        position: fixed;
        top: -12px;
        width: 8px;
        height: 14px;
        border-radius: 3px;
        background: linear-gradient(180deg, #2b6ef6, #1f4ed8);
        opacity: 0.95;
        pointer-events: none;
        transform: translate3d(0,0,0);
        animation: confettiFall var(--dur, 2.6s) ease-out forwards;
      }
      @keyframes confettiFall{
        0%{ opacity: 0.95; }
        100%{ transform: translate3d(var(--x, 0px), 110vh, 0) rotate(var(--rot, 0deg)); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function injectDashboardStyles(){
    if(document.getElementById('dashEnhanceStyles')) return;
    const style = document.createElement('style');
    style.id = 'dashEnhanceStyles';
    style.textContent = `
      .big-progress{
        position: relative;
        overflow: visible;
      }
      .radial-wrap{
        position: absolute;
        right: 12px;
        top: -10px;
        width: 110px;
        height: 110px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(43,110,246,0.08), rgba(31,78,216,0.12));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.12);
        display: grid;
        place-items: center;
        box-shadow: 0 10px 30px rgba(43,110,246,0.12);
      }
      .radial-track{
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background: conic-gradient(var(--accent, #2b6ef6) var(--val, 0%), rgba(255,255,255,0.12) 0);
        display: grid;
        place-items: center;
        position: relative;
        transition: background 0.2s ease;
      }
      .radial-track::after{
        content: '';
        position: absolute;
        inset: 8px;
        border-radius: 50%;
        background: rgba(12,20,46,0.72);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
      }
      .radial-value{
        position: relative;
        color: #e9f0ff;
        font-weight: 700;
        font-size: 18px;
        text-shadow: 0 4px 14px rgba(31,78,216,0.35);
      }
      .big-pbar{ position: relative; }
      .milestone{
        position: absolute;
        top: -14px;
        transform: translateX(-50%);
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: #cfe0ff;
        font-size: 11px;
        background: rgba(43,110,246,0.1);
        border: 1px solid rgba(43,110,246,0.25);
        padding: 3px 6px;
        border-radius: 10px;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 18px rgba(31,78,216,0.18);
        opacity: 0.92;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .milestone.hit{
        transform: translateX(-50%) translateY(-4px) scale(1.02);
        box-shadow: 0 12px 24px rgba(43,110,246,0.3);
      }
      .level-up{
        animation: levelUpGlow 1s ease;
      }
      @keyframes levelUpGlow{
        0%{ box-shadow: 0 0 0 0 rgba(43,110,246,0.15); }
        50%{ box-shadow: 0 0 0 18px rgba(43,110,246,0); }
        100%{ box-shadow: 0 0 0 0 rgba(43,110,246,0); }
      }
      canvas.progress-particles{
        position: absolute;
        inset: 0;
        pointer-events: none;
        filter: drop-shadow(0 6px 12px rgba(43,110,246,0.35));
      }
      .progress-tooltip{
        position: absolute;
        padding: 8px 10px;
        background: rgba(14,24,56,0.9);
        border: 1px solid rgba(43,110,246,0.3);
        border-radius: 10px;
        color: #dfe8ff;
        font-size: 12px;
        box-shadow: 0 12px 24px rgba(0,0,0,0.35);
        transform: translate(-50%, -120%);
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
        pointer-events: none;
        z-index: 5;
      }
      .show-tooltip .progress-tooltip{
        opacity: 1;
        transform: translate(-50%, -140%);
      }
      @media(max-width: 720px){
        .radial-wrap{ position: relative; margin: 10px auto 0; right: auto; top: auto; }
      }
    `;
    document.head.appendChild(style);
  }

  function injectLessonStyles(){
    if(document.getElementById('lessonEnhanceStyles')) return;
    const style = document.createElement('style');
    style.id = 'lessonEnhanceStyles';
    style.textContent = `
      .reading-progress{
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: 6px;
        border-radius: 0 0 10px 10px;
        background: rgba(255,255,255,0.08);
        overflow: hidden;
        z-index: 8;
        backdrop-filter: blur(12px);
      }
      .reading-progress .fill{
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #2b6ef6, #1f4ed8);
        box-shadow: 0 8px 18px rgba(43,110,246,0.35);
        transition: width 0.15s linear;
      }
      .lesson-list li{
        cursor: pointer;
        position: relative;
        padding-left: 28px;
      }
      .lesson-list li::before{
        content: '○';
        position: absolute;
        left: 6px;
        top: 0;
        color: rgba(255,255,255,0.55);
      }
      .lesson-list li.checked{
        text-decoration: line-through;
        color: #9fb6ff;
      }
      .lesson-list li.checked::before{
        content: '✔';
        color: #8bf0a2;
      }
      .reveal{
        opacity: 0;
        transform: translateY(18px);
        transition: opacity 0.5s ease, transform 0.6s ease;
      }
      .reveal.visible{
        opacity: 1;
        transform: translateY(0);
      }
      .accordion-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 10px 0;
        gap: 8px;
      }
      .accordion-head .chevron{ transition: transform 0.2s ease; }
      .accordion-head.open .chevron{ transform: rotate(90deg); }
      .accordion-body{
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.25s ease;
      }
      .accordion-body.open{
        max-height: 600px;
      }
      .note-badge{
        display: inline-block;
        margin-top: 8px;
        padding: 6px 10px;
        border-radius: 10px;
        background: rgba(43,110,246,0.15);
        color: #e6edff;
        font-size: 12px;
        box-shadow: 0 8px 16px rgba(31,78,216,0.25);
      }
      .cta-shake{
        animation: ctaShake 1s ease;
      }
      @keyframes ctaShake{
        0%,100%{ transform: translateX(0); }
        20%{ transform: translateX(-3px); }
        40%{ transform: translateX(3px); }
        60%{ transform: translateX(-3px); }
        80%{ transform: translateX(3px); }
      }
    `;
    document.head.appendChild(style);
  }

  function injectAuthStyles(){
    if(document.getElementById('authEnhanceStyles')) return;
    const style = document.createElement('style');
    style.id = 'authEnhanceStyles';
    style.textContent = `
      .input-wrap{
        position: relative;
        display: block;
        margin-bottom: 14px;
      }
      .input-wrap label{ display:block; margin-bottom:6px; font-size:13px; color:#dbe6ff; }
      .input-wrap input{
        width: 100%;
        padding: 12px 38px 12px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(255,255,255,0.04);
        color: #e6edff;
        transition: border 0.2s ease, box-shadow 0.3s ease;
      }
      .input-wrap input:focus{
        outline: none;
        border-color: rgba(43,110,246,0.6);
        box-shadow: 0 8px 16px rgba(43,110,246,0.25);
      }
      .field-msg{
        font-size: 12px;
        margin-top: 4px;
        color: #fca5a5;
      }
      .field-msg.ok{ color: #8bf0a2; }
      .eye-toggle{
        position: absolute;
        right: 10px;
        top: 34px;
        cursor: pointer;
        color: #cfdcff;
        font-size: 14px;
      }
      .strength-bar{
        height: 6px;
        border-radius: 8px;
        background: rgba(255,255,255,0.08);
        overflow: hidden;
        margin-top: 6px;
      }
      .strength-bar .fill{
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #ff8b8b, #8bf0a2);
        transition: width 0.25s ease;
      }
      .toast{
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        padding: 12px 16px;
        border-radius: 12px;
        background: rgba(14,24,56,0.92);
        color: #e6edff;
        border: 1px solid rgba(43,110,246,0.35);
        box-shadow: 0 18px 30px rgba(0,0,0,0.35);
        opacity: 0;
        transition: opacity 0.35s ease, transform 0.35s ease;
        z-index: 15;
      }
      .toast.show{
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .form.shake{
        animation: formShake 0.5s ease;
      }
      @keyframes formShake{
        0%,100%{ transform: translateX(0); }
        20%{ transform: translateX(-4px); }
        40%{ transform: translateX(4px); }
        60%{ transform: translateX(-4px); }
        80%{ transform: translateX(4px); }
      }
      .btn-loading{
        position: relative;
        pointer-events: none;
        opacity: 0.8;
      }
      .btn-loading::after{
        content: '';
        position: absolute;
        right: 12px;
        top: 50%;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.4);
        border-top-color: #fff;
        border-radius: 50%;
        transform: translateY(-50%);
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin{ to{ transform: translateY(-50%) rotate(360deg);} }
    `;
    document.head.appendChild(style);
  }

  function injectForumStyles(){
    if(document.getElementById('forumEnhanceStyles')) return;
    const style = document.createElement('style');
    style.id = 'forumEnhanceStyles';
    style.textContent = `
      .forum-post{
        position: relative;
      }
      .post-actions{
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 6px;
      }
      .mini-btn{
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(255,255,255,0.05);
        color: #e3ecff;
        cursor: pointer;
        font-size: 12px;
        transition: transform 0.15s ease, box-shadow 0.25s ease;
      }
      .mini-btn:hover{ transform: translateY(-1px); box-shadow: 0 10px 18px rgba(43,110,246,0.2); }
      .forum-post.collapsed .full-content{ display: none; }
      .forum-post .toggle-preview{ color: #9fb6ff; cursor: pointer; font-size: 13px; display: inline-block; margin-top: 6px; }
      .tag-chip{
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 10px;
        background: rgba(43,110,246,0.12);
        color: #dfe7ff;
        font-size: 12px;
        border: 1px solid rgba(43,110,246,0.25);
      }
      .trend-badge{
        position: absolute;
        right: 10px;
        top: 10px;
        background: linear-gradient(135deg,#2b6ef6,#1f4ed8);
        color: #fff;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        box-shadow: 0 10px 20px rgba(43,110,246,0.3);
      }
      .highlight{ background: rgba(255,255,0,0.15); }
      .sort-bar{
        display:flex;
        gap:8px;
        align-items:center;
        flex-wrap:wrap;
        margin-bottom:10px;
      }
      .sort-select{
        padding:6px 10px;
        border-radius:10px;
        border:1px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.04);
        color:#e6edff;
      }
    `;
    document.head.appendChild(style);
  }

// Tab switching on auth page
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.getAttribute('data-target');
      document.querySelectorAll('.form').forEach(f=>f.classList.remove('active'));
      const target = document.getElementById(t);
      if(target) target.classList.add('active');
    });
  });

  // Demo login/register (no backend)
  const doLogin = document.getElementById('doLogin');
  if(doLogin){
    doLogin.addEventListener('click', (e)=>{
      const email = document.getElementById('email').value || 'tamu';
      localStorage.setItem('cy_user', email);
      alert('Demo: login sukses sebagai '+email);
      window.location.href = 'dashboard.html';
    });
  }
  const doRegister = document.getElementById('doRegister');
  if(doRegister){
    doRegister.addEventListener('click', ()=>{
      alert('Demo: akun dibuat. Silakan login.');
      window.location.href = 'login.html';
    });
  }

  // Animate group progress bar on home
  document.querySelectorAll('.pbar').forEach(p=>{
    const w = getComputedStyle(p).getPropertyValue('--w') || '40%';
    setTimeout(()=> p.style.width = w, 200);
  });

  // Dashboard big progress animation (reads value from localStorage)
  const totalScoreEl = document.getElementById('totalScore');
  const doneCountEl = document.getElementById('doneCount');
  const bigPbar = document.getElementById('bigPbar');
  const bigFill = bigPbar ? bigPbar.querySelector('.big-fill') : null;
  const lessonStage = document.querySelector('.lesson-stage');
  const openQuiz = document.getElementById('openQuiz');
  const lessonChecklist = document.getElementById('lessonChecklist');
  const lessonOverview = document.getElementById('lessonOverview');
  const lessonBullets = document.getElementById('lessonBullets');
  const lessonQuote = document.getElementById('lessonQuote');
  const user = localStorage.getItem('cy_user') || 'Tamu';
  // set name if exists
  const unameEls = document.querySelectorAll('.user-name');
  unameEls.forEach(el=> el.textContent = (user === 'tamu' ? 'Ferdinand Darmawan' : user.split('@')[0]));

  // Progress values (localStorage untuk persistensi ringan)
  const storedDone = parseInt(localStorage.getItem('cy_done') || '0', 10);
  const storedTotal = parseInt(localStorage.getItem('cy_total') || '4', 10);
  const storedScore = parseInt(localStorage.getItem('cy_score') || '0', 10);
  const done = Number.isFinite(storedDone) ? storedDone : 0;
  const total = Number.isFinite(storedTotal) && storedTotal > 0 ? storedTotal : 4;
  const scoreVal = Number.isFinite(storedScore) ? storedScore : 0;
  const pct = Math.min(100, Math.max(0, Math.round((done/total)*100)));

  const dashAnimations = {
    targetPct: pct,
    targetScore: scoreVal,
    targetDone: done,
    total
  };

  setupDashboardProgress();
  setupAuthUX();

  function setupDashboardProgress(){
    if(!bigPbar) return;
    const container = bigPbar.parentElement;
    if(!container) return;

    const radialWrap = document.createElement('div');
    radialWrap.className = 'radial-wrap glass';
    const radialTrack = document.createElement('div');
    radialTrack.className = 'radial-track';
    const radialValue = document.createElement('div');
    radialValue.className = 'radial-value';
    radialValue.textContent = '0%';
    radialTrack.appendChild(radialValue);
    radialWrap.appendChild(radialTrack);
    container.appendChild(radialWrap);

    const milestoneContainer = document.createElement('div');
    milestoneContainer.className = 'milestone-container';
    bigPbar.appendChild(milestoneContainer);
    const milestones = [25, 50, 75, 100].map(val=>{
      const span = document.createElement('span');
      span.className = 'milestone';
      span.style.left = val + '%';
      span.innerHTML = `${val}% <span aria-hidden="true">🎯</span>`;
      span.dataset.value = val;
      milestoneContainer.appendChild(span);
      span.addEventListener('mouseenter', ()=>showTooltip(span, `Target tercapai ${val}%`));
      span.addEventListener('mouseleave', hideTooltip);
      return span;
    });

    const canvas = document.createElement('canvas');
    canvas.className = 'progress-particles';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = [];

    const tooltip = document.createElement('div');
    tooltip.className = 'progress-tooltip';
    container.appendChild(tooltip);

    function resizeCanvas(){
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const easing = easeOutCubic;
    animateCounter(totalScoreEl, 0, dashAnimations.targetScore, 900, v=> Math.round(v));
    animateCounter(doneCountEl, 0, dashAnimations.targetDone, 800, v=> Math.round(v));
    animateProgress(dashAnimations.targetPct);

    function animateProgress(target){
      if(!bigFill) return;
      const start = 0;
      const duration = 1100;
      const startTime = performance.now();
      const startWidth = parseFloat(bigFill.style.width) || 0;
      const endWidth = target;

      function frame(now){
        const t = Math.min((now - startTime)/duration, 1);
        const eased = easing(t);
        const current = startWidth + (endWidth - startWidth) * eased;
        bigFill.style.width = current + '%';
        bigPbar.style.setProperty('--value', current + '%');
        radialTrack.style.setProperty('--val', current + '%');
        radialValue.textContent = Math.round(current) + '%';
        updateMilestones(current);
        if(t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function animateCounter(el, start, end, duration, formatter = v=>v){
      if(!el) return;
      const sTime = performance.now();
      function tick(now){
        const t = Math.min((now - sTime)/duration, 1);
        const eased = easeOutExpo(t);
        const val = start + (end - start) * eased;
        el.textContent = formatter(val);
        if(t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function updateMilestones(currentPct){
      milestones.forEach(span=>{
        const val = parseInt(span.dataset.value, 10);
        const hit = currentPct >= val;
        span.classList.toggle('hit', hit);
        if(hit && !span.dataset.burst){
          span.dataset.burst = '1';
          triggerLevelUp();
          spawnBurst(val/100);
        }
      });
    }

    function spawnBurst(ratio){
      const rect = bigPbar.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const originX = (rect.left - parentRect.left) + rect.width * ratio;
      const originY = (rect.top - parentRect.top) + rect.height/2;
      for(let i=0;i<14;i++){
        particles.push({
          x: originX + (Math.random()*18 - 9),
          y: originY + (Math.random()*10 - 5),
          vx: (Math.random()*1.2 - 0.6),
          vy: (Math.random()*-1.2 - 0.3),
          life: 60 + Math.random()*30,
          size: 2 + Math.random()*2.5,
          hue: 210 + Math.random()*30
        });
      }
    }

    function drawParticles(){
      ctx.clearRect(0,0,canvas.width, canvas.height);
      particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life -= 1;
      });
      for(let i=particles.length-1;i>=0;i--){
        const p = particles[i];
        if(p.life <=0){ particles.splice(i,1); continue; }
        ctx.save();
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${p.life/90})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      }
    }
    requestAnimationFrame(function loop(){
      drawParticles();
      requestAnimationFrame(loop);
    });

    function triggerLevelUp(){
      bigPbar.classList.add('level-up');
      radialTrack.classList.add('level-up');
      setTimeout(()=>{
        bigPbar.classList.remove('level-up');
        radialTrack.classList.remove('level-up');
      }, 850);
    }

    function showTooltip(target, text){
      tooltip.textContent = text;
      const rect = target.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const centerX = rect.left - parentRect.left + rect.width/2;
      tooltip.style.left = `${centerX}px`;
      tooltip.style.top = `${rect.top - parentRect.top - 8}px`;
      container.classList.add('show-tooltip');
    }

    function hideTooltip(){
      container.classList.remove('show-tooltip');
    }

    container.addEventListener('mouseenter', ()=>showTooltip(bigPbar, `Progres: ${dashAnimations.targetPct}% (${dashAnimations.targetDone}/${dashAnimations.total})`));
    container.addEventListener('mouseleave', hideTooltip);
    radialWrap.addEventListener('mouseenter', ()=>showTooltip(radialWrap, `Skor total: ${dashAnimations.targetScore}`));
    radialWrap.addEventListener('mouseleave', hideTooltip);
  }

  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
  function easeOutExpo(t){ return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

  function setupLessonPage(){
    if(!lessonStage) return;
    const courseKey = courseParam || '1';
    buildReadingProgress();
    applyRevealAnimations();
    enableChecklistPersistence();
    enableAccordionSections();
    applyReadingTime();
    enableHighlightNotes();
    if(openQuiz){
      setInterval(()=>{
        openQuiz.classList.add('cta-shake');
        setTimeout(()=> openQuiz.classList.remove('cta-shake'), 900);
      }, 7000);
    }

    function buildReadingProgress(){
      const bar = document.createElement('div');
      bar.className = 'reading-progress';
      bar.innerHTML = '<div class="fill"></div>';
      lessonStage.prepend(bar);
      const fill = bar.querySelector('.fill');
      window.addEventListener('scroll', ()=>{
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        fill.style.width = `${Math.min(100, scrolled)}%`;
      });
    }

    function applyRevealAnimations(){
      const revealEls = lessonStage.querySelectorAll('.lesson-card, .lesson-list li, .callout, .quote-box');
      revealEls.forEach(el=> el.classList.add('reveal'));
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, {threshold: 0.12});
      revealEls.forEach(el=> obs.observe(el));
    }

    function enableChecklistPersistence(){
      if(!lessonChecklist) return;
      const key = `cy_checklist_${courseKey}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      lessonChecklist.querySelectorAll('li').forEach((li, idx)=>{
        if(saved.includes(idx)) li.classList.add('checked');
        li.addEventListener('click', ()=>{
          li.classList.toggle('checked');
          const arr = Array.from(lessonChecklist.querySelectorAll('li')).reduce((acc, item, i)=>{
            if(item.classList.contains('checked')) acc.push(i);
            return acc;
          }, []);
          localStorage.setItem(key, JSON.stringify(arr));
        });
      });
    }

    function enableAccordionSections(){
      const sections = [
        {head: lessonStage.querySelector('h3'), body: lessonOverview?.parentElement},
      ].filter(Boolean);
      sections.forEach(sec=>{
        const chevron = document.createElement('span');
        chevron.className = 'chevron';
        chevron.textContent = '›';
        const wrap = document.createElement('div');
        wrap.className = 'accordion-head open';
        wrap.appendChild(sec.head.cloneNode(true));
        wrap.appendChild(chevron);
        sec.head.replaceWith(wrap);
        const body = sec.body;
        if(body){
          body.classList.add('accordion-body','open');
          wrap.addEventListener('click', ()=>{
            const opened = body.classList.toggle('open');
            wrap.classList.toggle('open', opened);
            body.style.maxHeight = opened ? `${body.scrollHeight + 30}px` : '0px';
          });
          body.style.maxHeight = `${body.scrollHeight + 30}px`;
        }
      });
    }

    function applyReadingTime(){
      const textBlocks = [lessonOverview, lessonBullets, lessonChecklist, lessonQuote].filter(Boolean).map(el=> el.innerText || '');
      const words = textBlocks.join(' ').trim().split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.round(words / 180));
      const durationEl = document.getElementById('lessonDuration');
      if(durationEl) durationEl.textContent = `⏱️ ${minutes} menit baca`;
    }

    function enableHighlightNotes(){
      const storeKey = `cy_notes_${courseKey}`;
      const noteBox = document.createElement('div');
      noteBox.className = 'note-badge';
      noteBox.textContent = 'Catatan tersimpan: 0';
      lessonStage.appendChild(noteBox);
      const savedNotes = JSON.parse(localStorage.getItem(storeKey) || '[]');
      updateBadge();

      document.addEventListener('mouseup', ()=>{
        const sel = window.getSelection();
        if(!sel) return;
        const text = sel.toString().trim();
        if(text.length < 20) return;
        if(!lessonStage.contains(sel.anchorNode?.parentElement)) return;
        const newNotes = [...savedNotes, {text, ts: Date.now()}].slice(-8);
        localStorage.setItem(storeKey, JSON.stringify(newNotes));
        savedNotes.length = 0;
        newNotes.forEach(n=> savedNotes.push(n));
        updateBadge();
      });

      function updateBadge(){
        noteBox.textContent = `Catatan tersimpan: ${savedNotes.length}`;
      }
    }
  }

  function setupAuthUX(){
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    if(!loginForm && !registerForm) return;

    wrapFields(loginForm);
    wrapFields(registerForm, true);
    const toast = createToast();

    if(loginForm){
      const email = document.getElementById('email');
      const pass = document.getElementById('password');
      const btn = document.getElementById('doLogin');
      email?.addEventListener('input', ()=> validateEmailField(email));
      pass?.addEventListener('input', ()=> validatePasswordField(pass, false));
      btn?.addEventListener('click', ()=>{
        const okEmail = validateEmailField(email);
        const okPass = validatePasswordField(pass, false);
        if(!okEmail || !okPass) return shakeForm(loginForm);
        submitWithLoading(btn, ()=>{
          localStorage.setItem('cy_user', email.value);
          showToast('Login berhasil, selamat datang kembali!');
          setTimeout(()=> window.location.href = 'dashboard.html', 600);
        });
      });
      addEyeToggle(pass);
    }

    if(registerForm){
      const name = document.getElementById('rname');
      const email = document.getElementById('remail');
      const pass = document.getElementById('rpassword');
      const btn = document.getElementById('doRegister');
      const strength = createStrengthBar(pass);
      email?.addEventListener('input', ()=> validateEmailField(email));
      pass?.addEventListener('input', ()=> validatePasswordField(pass, true, strength));
      btn?.addEventListener('click', ()=>{
        const okName = name?.value.trim().length >= 2;
        const okEmail = validateEmailField(email);
        const okPass = validatePasswordField(pass, true, strength);
        if(!okName || !okEmail || !okPass) return shakeForm(registerForm);
        submitWithLoading(btn, ()=>{
          localStorage.setItem('cy_user', email.value);
          showToast('Akun demo dibuat. Silakan login!');
          setTimeout(()=> window.location.href = 'login.html', 700);
        });
      });
      addEyeToggle(pass);
    }

    function wrapFields(form, withTooltip=false){
      if(!form) return;
      form.querySelectorAll('label').forEach(label=>{
        const input = label.querySelector('input');
        if(!input) return;
        const text = label.childNodes[0].textContent;
        const wrap = document.createElement('div');
        wrap.className = 'input-wrap';
        const title = document.createElement('label');
        title.textContent = text;
        wrap.appendChild(title);
        wrap.appendChild(input);
        const msg = document.createElement('div');
        msg.className = 'field-msg';
        wrap.appendChild(msg);
        label.replaceWith(wrap);
        if(withTooltip && input.id === 'rpassword'){
          const tip = document.createElement('div');
          tip.className = 'muted small';
          tip.textContent = 'Minimal 6 karakter, gabungkan huruf & angka/simbol.';
          wrap.appendChild(tip);
        }
      });
    }

    function validateEmailField(input){
      if(!input) return false;
      const msg = input.parentElement.querySelector('.field-msg');
      const val = input.value.trim();
      const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val);
      msg.textContent = ok ? 'Format email valid.' : 'Masukkan email yang benar.';
      msg.classList.toggle('ok', ok);
      return ok;
    }

    function validatePasswordField(input, checkStrength=false, bar){
      if(!input) return false;
      const msg = input.parentElement.querySelector('.field-msg');
      const val = input.value;
      const ok = val.length >= 6;
      msg.textContent = ok ? 'Password siap dipakai.' : 'Minimal 6 karakter.';
      msg.classList.toggle('ok', ok);
      if(checkStrength && bar){
        const strength = Math.min(100, (val.length/12)*100 + (/[A-Z]/.test(val)?10:0) + (/\\d/.test(val)?10:0) + (/[^A-Za-z0-9]/.test(val)?10:0));
        bar.querySelector('.fill').style.width = `${strength}%`;
      }
      return ok;
    }

    function addEyeToggle(input){
      if(!input) return;
      const eye = document.createElement('span');
      eye.className = 'eye-toggle';
      eye.textContent = '👁️';
      input.parentElement.appendChild(eye);
      eye.addEventListener('click', ()=>{
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    }

    function createStrengthBar(input){
      const bar = document.createElement('div');
      bar.className = 'strength-bar';
      bar.innerHTML = '<div class="fill"></div>';
      input.parentElement.appendChild(bar);
      return bar;
    }

    function shakeForm(form){
      form.classList.add('shake');
      setTimeout(()=> form.classList.remove('shake'), 500);
    }

    function createToast(){
      const t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
      return t;
    }

    function showToast(text){
      toast.textContent = text;
      toast.classList.add('show');
      setTimeout(()=> toast.classList.remove('show'), 2200);
    }

    function submitWithLoading(btn, cb){
      btn.classList.add('btn-loading');
      setTimeout(()=>{
        cb();
        btn.classList.remove('btn-loading');
      }, 700);
    }
  }

  function setupForumUX(){
    const posts = Array.from(document.querySelectorAll('.forum-post'));
    if(!posts.length) return;
    const searchInput = document.getElementById('forumSearch');
    const sortBar = document.createElement('div');
    sortBar.className = 'sort-bar';
    const sortLabel = document.createElement('span');
    sortLabel.textContent = 'Urutkan:';
    const sortSelect = document.createElement('select');
    sortSelect.className = 'sort-select';
    sortSelect.innerHTML = `
      <option value="newest">Terbaru</option>
      <option value="helpful">Paling membantu</option>
      <option value="views">Paling dilihat</option>
    `;
    sortBar.appendChild(sortLabel);
    sortBar.appendChild(sortSelect);
    const forumStage = document.querySelector('.forum-stage');
    forumStage?.prepend(sortBar);

    posts.forEach((post, idx)=>{
      const meta = post.querySelector('p.muted');
      const tagText = (meta?.textContent.match(/Topik:\\s*([^•]+)/i) || [,'Umum'])[1].trim();
      post.dataset.tag = tagText.toLowerCase();
      const actions = document.createElement('div');
      actions.className = 'post-actions';
      const likeBtn = document.createElement('button');
      likeBtn.className = 'mini-btn';
      const likeKey = `cy_like_${idx}`;
      let likes = parseInt(localStorage.getItem(likeKey) || '0', 10);
      likeBtn.textContent = `👍 Bantu (${likes})`;
      likeBtn.addEventListener('click', ()=>{
        likes +=1;
        localStorage.setItem(likeKey, likes);
        likeBtn.textContent = `👍 Bantu (${likes})`;
      });
      const copyBtn = document.createElement('button');
      copyBtn.className = 'mini-btn';
      copyBtn.textContent = '🔗 Salin tautan';
      copyBtn.addEventListener('click', ()=>{
        navigator.clipboard.writeText(window.location.href.split('#')[0] + '#' + idx);
        copyBtn.textContent = 'Tersalin!';
        setTimeout(()=> copyBtn.textContent = '🔗 Salin tautan', 1200);
      });
      const tagChip = document.createElement('span');
      tagChip.className = 'tag-chip';
      tagChip.textContent = tagText;
      const toggle = document.createElement('span');
      toggle.className = 'toggle-preview';
      toggle.textContent = 'Tampilkan ringkas';
      post.classList.add('collapsed');
      const fullContent = document.createElement('div');
      fullContent.className = 'full-content';
      while(post.children.length > 1){
        fullContent.appendChild(post.children[1]);
      }
      post.appendChild(fullContent);
      post.appendChild(toggle);
      post.appendChild(actions);
      actions.append(likeBtn, copyBtn, tagChip);
      if(idx < 2){
        const trend = document.createElement('div');
        trend.className = 'trend-badge';
        trend.textContent = 'Trending';
        post.appendChild(trend);
      }
      toggle.addEventListener('click', ()=>{
        const collapsed = post.classList.toggle('collapsed');
        toggle.textContent = collapsed ? 'Tampilkan isi' : 'Sembunyikan';
      });
    });

    if(searchInput){
      searchInput.addEventListener('input', ()=>{
        const term = searchInput.value.trim().toLowerCase();
        posts.forEach(post=>{
          clearHighlights(post);
          const text = post.innerText.toLowerCase();
          const match = term === '' || text.includes(term);
          post.style.display = match ? '' : 'none';
          if(term && match){
            highlightText(post, term);
          }
        });
      });
    }

    const categoryLinks = document.querySelectorAll('.footer-col a[href^=\"#\"], .header-chip');
    categoryLinks.forEach(link=>{
      link.addEventListener('click', (e)=>{
        const id = link.getAttribute('href');
        if(id && id.startsWith('#')){
          e.preventDefault();
          const target = document.querySelector(id);
          target?.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      });
    });

    sortSelect.addEventListener('change', ()=> sortPosts(sortSelect.value));

    function sortPosts(mode){
      const listParent = posts[0].parentElement;
      const sorted = [...posts].sort((a,b)=>{
        if(mode === 'helpful'){
          const aLikes = parseInt((a.querySelector('.mini-btn')?.textContent.match(/\\((\\d+)\\)/)||[,0])[1],10);
          const bLikes = parseInt((b.querySelector('.mini-btn')?.textContent.match(/\\((\\d+)\\)/)||[,0])[1],10);
          return bLikes - aLikes;
        }
        if(mode === 'views'){
          return (b.innerText.length) - (a.innerText.length);
        }
        return posts.indexOf(a) - posts.indexOf(b);
      });
      sorted.forEach(p=> listParent.appendChild(p));
    }

    function highlightText(el, term){
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const ranges = [];
      while(walker.nextNode()){
        const node = walker.currentNode;
        const idx = node.nodeValue.toLowerCase().indexOf(term);
        if(idx >=0){
          ranges.push({node, idx, len: term.length});
        }
      }
      ranges.forEach(({node, idx, len})=>{
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx+len);
        const mark = document.createElement('mark');
        mark.className = 'highlight';
        range.surroundContents(mark);
      });
    }

    function clearHighlights(el){
      el.querySelectorAll('mark.highlight').forEach(m=>{
        const parent = m.parentNode;
        parent.replaceChild(document.createTextNode(m.textContent), m);
        parent.normalize();
      });
    }
  }

  
  // Quiz CyberLearn: 3 Courses (from PDF)
  const lessonBank = {
    '1': {
      title: 'Dasar-Dasar Keamanan Siber',
      intro: 'Kenali ancaman umum dan prinsip dasar menjaga data tetap aman.',
      overview: 'Belajar konsep CIA triad, contoh ancaman sehari-hari, dan kebiasaan sederhana agar tidak lengah.',
      duration: '⏱️ 12–15 menit belajar',
      level: '🔰 Level pemula',
      outcome: '🎯 Paham prinsip dasar & ancaman umum',
      bullets: [
        'Mengapa keamanan siber penting untuk semua orang.',
        'CIA Triad: Confidentiality, Integrity, Availability.',
        'Membedakan malware umum: virus, worm, ransomware.',
        'Kebiasaan aman saat online & penggunaan perangkat umum.'
      ],
      checklist: [
        'Selalu logout dari perangkat bersama.',
        'Gunakan antivirus & update sistem berkala.',
        'Hindari menginstal aplikasi dari sumber tidak jelas.'
      ],
      callout: 'Mulai dari kebiasaan kecil: update, backup, dan waspada saat klik link.',
      quote: '“Keamanan dimulai dari kebiasaan sederhana yang diulang setiap hari.”',
      quizBlurb: 'Uji pemahaman dasar keamanan siber sebelum melangkah ke topik lanjutan.'
    },
    '2': {
      title: 'Keamanan Akun & Password',
      intro: 'Bangun fondasi akun yang kuat dengan password kokoh dan 2FA.',
      overview: 'Pelajari cara membuat password unik, menyimpan kredensial dengan aman, dan kapan harus ganti.',
      duration: '⏱️ 10–12 menit belajar',
      level: '🧠 Tingkat mudah',
      outcome: '🎯 Akun lebih terlindungi dengan 2FA & password kuat',
      bullets: [
        'Ciri password kuat dan cara mengingatnya.',
        'Menggunakan password manager dengan aman.',
        'Mengaktifkan dan memanfaatkan Two-Factor Authentication.',
        'Tanda akun bocor dan langkah cepat yang harus diambil.'
      ],
      checklist: [
        'Aktifkan 2FA untuk email & media sosial utama.',
        'Gunakan password unik untuk setiap layanan.',
        'Pantau notifikasi login mencurigakan dan segera ganti password.'
      ],
      callout: 'Password kuat + 2FA = kombinasi terbaik untuk menahan serangan pembobolan akun.',
      quote: '“Password mudah diingat tidak harus lemah, asal dibuat unik dan panjang.”',
      quizBlurb: 'Pastikan kamu siap menjaga akun pribadi dari kebocoran dengan soal-soal singkat.'
    },
    '3': {
      title: 'Phishing & Social Engineering',
      intro: 'Kenali trik manipulasi manusia yang sering dipakai penyerang.',
      overview: 'Belajar pola email/pesan palsu, smishing, vishing, dan cara bereaksi ketika data sudah terlanjur dibocorkan.',
      duration: '⏱️ 12–15 menit belajar',
      level: '⚡ Pemula menengah',
      outcome: '🎯 Bisa menyaring pesan mencurigakan & melaporkannya',
      bullets: [
        'Ciri khas pesan phishing dan social engineering.',
        'Langkah aman saat menerima link/OTP dari pihak tak dikenal.',
        'Perbedaan smishing, vishing, dan phishing klasik.',
        'Langkah pemulihan cepat jika sudah terlanjur klik link palsu.'
      ],
      checklist: [
        'Selalu cek alamat pengirim dan domain.',
        'Jangan pernah membagikan OTP ke siapa pun.',
        'Laporkan pesan mencurigakan ke tim keamanan/penyedia layanan.'
      ],
      callout: 'Rasa panik dan buru-buru adalah senjata utama social engineer — ambil napas sebelum klik.',
      quote: '“Waspada pada pesan mendesak yang meminta data pribadi, bahkan jika tampilannya meyakinkan.”',
      quizBlurb: 'Cek ketelitianmu membaca tanda-tanda phishing sebelum menghadapi simulasi nyata.'
    }
  };

  const quizBank = {
    '1': {
      title: 'Dasar-Dasar Keamanan Siber',
      questions: [
        { q: 'Tujuan utama keamanan siber adalah…', a: [
          'Membuat komputer berjalan lebih cepat',
          'Mengurangi ukuran file di komputer',
          'Melindungi sistem, jaringan, dan data dari akses atau serangan tidak sah',
          'Menghemat baterai perangkat'
        ], c: 2 },
        { q: 'Yang BUKAN termasuk manfaat keamanan siber adalah…', a: [
          'Melindungi data pribadi',
          'Mencegah pencurian identitas',
          'Memastikan data hanya diakses orang yang berhak',
          'Menambah kapasitas RAM komputer'
        ], c: 3 },
        { q: 'Konsep “CIA Triad” dalam keamanan informasi adalah…', a: [
          'Control, Identity, Access',
          'Confidentiality, Integrity, Availability',
          'Configuration, Integrity, Authentication',
          'Control, Integrity, Authorization'
        ], c: 1 },
        { q: 'Contoh data yang termasuk informasi pribadi sensitif adalah…', a: [
          'Makanan favorit',
          'Warna kesukaan',
          'Nomor KTP / NIK',
          'Hobi menonton film'
        ], c: 2 },
        { q: 'Program berbahaya yang dapat menggandakan diri dan menyebar lewat jaringan tanpa bantuan pengguna disebut…', a: [
          'Firewall',
          'Worm',
          'Backup',
          'Router'
        ], c: 1 },
        { q: 'Fungsi utama antivirus adalah…', a: [
          'Menambah kapasitas hard disk',
          'Mencari dan menghapus malware dari sistem',
          'Mempercepat koneksi internet',
          'Memperbesar ukuran layar'
        ], c: 1 },
        { q: 'Kebiasaan yang PALING aman saat menginstal aplikasi di smartphone adalah…', a: [
          'Mengunduh dari link acak di grup chat',
          'Mengunduh dari toko aplikasi resmi (Google Play Store / App Store)',
          'Mengunduh file APK dari website yang tidak dikenal',
          'Menginstal aplikasi bajakan karena gratis'
        ], c: 1 },
        { q: 'Apa yang dimaksud dengan backup data?', a: [
          'Menghapus data yang tidak penting',
          'Membuat salinan data ke lokasi lain agar bisa dipulihkan jika hilang',
          'Mengompres data agar ukurannya lebih kecil',
          'Mengunci folder dengan password'
        ], c: 1 },
        { q: 'Contoh metode autentikasi “sesuatu yang kamu miliki” (something you have) adalah…', a: [
          'Password',
          'Sidik jari',
          'Kode OTP yang dikirim ke SMS',
          'Pola kunci di layar'
        ], c: 2 },
        { q: 'Saat selesai menggunakan akun email di komputer umum (warnet/lab), hal terpenting yang harus dilakukan adalah…', a: [
          'Menutup tab tanpa logout',
          'Logout dari akun dan tutup browser',
          'Menghapus riwayat download saja',
          'Menurunkan volume suara'
        ], c: 1 }
      ]
    },
    '2': {
      title: 'Keamanan Akun & Password',
      questions: [
        { q: 'Password yang kuat biasanya memiliki…', a: [
          'Hanya angka dan maksimal 4 karakter',
          'Kombinasi huruf besar, huruf kecil, angka, dan simbol, minimal 8–12 karakter',
          'Hanya huruf kecil dan nama sendiri',
          'Hanya simbol saja'
        ], c: 1 },
        { q: 'Manakah password yang PALING aman di bawah ini?', a: [
          '12345678',
          'agi123',
          'Agi2024',
          'A9!gK_27?pQ'
        ], c: 3 },
        { q: 'Mengapa tidak boleh menggunakan password yang sama untuk semua akun?', a: [
          'Karena akan membuat internet lambat',
          'Karena tidak sopan terhadap pemilik website',
          'Jika satu akun bocor, akun lain juga mudah dibobol',
          'Karena tidak bisa diingat'
        ], c: 2 },
        { q: 'Fungsi utama password manager adalah…', a: [
          'Menghapus semua password secara otomatis',
          'Menyimpan dan mengelola password secara aman untuk berbagai akun',
          'Membuat internet lebih cepat',
          'Menonaktifkan autentikasi dua faktor'
        ], c: 1 },
        { q: 'Apa itu Two-Factor Authentication (2FA)?', a: [
          'Menggunakan dua password yang sama',
          'Menggunakan password dan username',
          'Menggunakan dua metode verifikasi berbeda untuk mengakses akun',
          'Menggunakan dua perangkat secara bersamaan'
        ], c: 2 },
        { q: 'Contoh faktor autentikasi “something you are” (sesuatu yang kamu adalah)…', a: [
          'PIN ATM',
          'Kartu identitas',
          'Sidik jari',
          'Username'
        ], c: 2 },
        { q: 'Kapan relatif AMAN menyimpan password di browser?', a: [
          'Di komputer umum yang dipakai banyak orang',
          'Di komputer pribadi yang terkunci dan hanya kamu yang bisa mengakses',
          'Di warnet karena ada administrator',
          'Di laptop teman supaya bisa login bersama'
        ], c: 1 },
        { q: 'Kamu mendapat notifikasi login dari lokasi yang tidak dikenal pada akun media sosial. Tindakan terbaik adalah…', a: [
          'Mengabaikannya',
          'Logout dari semua perangkat dan segera ganti password',
          'Membagikan cerita di media sosial',
          'Menyalahkan koneksi internet'
        ], c: 1 },
        { q: 'Manakah tanda bahwa akunmu MUNGKIN telah dibobol?', a: [
          'Tidak ada perubahan apa pun',
          'Tiba-tiba ada pesan terkirim yang bukan kamu yang mengirim',
          'Aplikasi berjalan lebih cepat',
          'Kuota internet hemat'
        ], c: 1 },
        { q: 'Cara terbaik membuat jawaban “pertanyaan keamanan” agar sulit ditebak orang lain adalah…', a: [
          'Menggunakan jawaban asli yang mudah ditebak (contoh: nama ibu kandung)',
          'Menggunakan jawaban palsu yang hanya kamu yang tahu',
          'Menuliskan jawaban di bio media sosial',
          'Mengosongkan kolom jawaban'
        ], c: 1 }
      ]
    },
    '3': {
      title: 'Phishing & Social Engineering',
      questions: [
        { q: 'Apa itu phishing?', a: [
          'Serangan fisik ke server',
          'Usaha menipu korban agar memberikan data sensitif melalui pesan palsu',
          'Mempercepat koneksi internet',
          'Teknik enkripsi data'
        ], c: 1 },
        { q: 'Contoh social engineering adalah…', a: [
          'Meng-update antivirus',
          'Menipu orang lewat telepon agar mau menyebutkan OTP',
          'Menginstal aplikasi dari toko resmi',
          'Mengganti wallpaper laptop'
        ], c: 1 },
        { q: 'Ciri umum email phishing adalah…', a: [
          'Bahasa sangat rapi, tanpa kesalahan',
          'Datang dari alamat resmi yang sudah diverifikasi',
          'Mengandung rasa panik/urgency dan meminta klik link atau kirim data pribadi',
          'Tidak pernah menyebut hadiah atau ancaman'
        ], c: 2 },
        { q: 'Kamu menerima email berisi link. Cara PALING aman untuk mengecek link tersebut adalah…', a: [
          'Langsung klik link tanpa berpikir',
          'Mengarahkan kursor ke link (hover) untuk melihat alamat sebenarnya sebelum klik',
          'Membalas email dan minta link baru',
          'Meneruskan email ke semua teman'
        ], c: 1 },
        { q: 'Smishing adalah…', a: [
          'Phishing melalui SMS atau aplikasi pesan singkat',
          'Phishing melalui telepon suara',
          'Phishing melalui email',
          'Phishing melalui media sosial saja'
        ], c: 0 },
        { q: 'Vishing adalah…', a: [
          'Phishing melalui video',
          'Phishing melalui panggilan suara/telepon',
          'Phishing melalui poster',
          'Phishing melalui iklan TV'
        ], c: 1 },
        { q: 'Kamu dapat pesan WhatsApp mengaku dari “CS Bank” meminta kode OTP untuk “verifikasi”. Apa tindakan yang tepat?', a: [
          'Berikan OTP agar proses cepat',
          'Abaikan, jangan berikan OTP ke siapa pun, bahkan yang mengaku CS',
          'Screenshot dan posting di story',
          'Balas dengan data pribadi lengkap'
        ], c: 1 },
        { q: 'Teknik social engineering sering memanfaatkan…', a: [
          'Kekuatan sinyal internet',
          'Kelemahan fisik komputer',
          'Emosi manusia seperti takut, panik, atau serakah',
          'Kecepatan prosesor'
        ], c: 2 },
        { q: 'Kamu mendapat email “Anda menang hadiah 100 juta, klik link ini dan login dengan akun email Anda”. Langkah paling aman adalah…', a: [
          'Klik link dan coba saja, siapa tahu benar',
          'Teruskan ke semua teman agar mereka juga ikut',
          'Hapus email tersebut dan jangan klik link sama sekali',
          'Login di link tersebut lalu ganti password'
        ], c: 2 },
        { q: 'Jika kamu terlanjur mengisi password di website phishing, hal pertama yang HARUS dilakukan adalah…', a: [
          'Diam saja, berharap aman',
          'Segera mengganti password akun tersebut dan aktifkan 2FA',
          'Mematikan komputer tanpa melakukan apa pun',
          'Menghapus riwayat browser saja'
        ], c: 1 }
      ]
    }
  };

  function getQueryParam(name){
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const courseParam = getQueryParam('course') || '1';
  const currentQuiz = quizBank[courseParam] || quizBank['1'];
  const currentLesson = lessonBank[courseParam] || lessonBank['1'];
  const qs = currentQuiz.questions;

  const qtext = document.getElementById('qtext');
  const qopts = document.getElementById('qopts');
  const qscore = document.getElementById('qscore');
  const startQuiz = document.getElementById('startQuiz');
  const nextBtn = document.getElementById('nextBtn');
  const qtitle = document.getElementById('qtitle');
  const questionNumberEl = document.getElementById('questionNumber');
  const questionCountEl = document.getElementById('questionCount');
  const progressFill = document.getElementById('qprogress');
  const feedback = document.getElementById('qfeedback');
  const qwrap = document.getElementById('qwrap');
  const quizBlurb = document.getElementById('quizBlurb');
  const quizActions = document.querySelector('.quiz-actions');

  let audioCtx;
  let soundOn = localStorage.getItem('cy_quiz_sound') !== 'off';
  let soundToggleBtn;

  const contextualFeedback = {
    '1': {
      correct: [
        'Mantap! Kamu menerapkan prinsip CIA Triad dengan tepat.',
        'Jawaban pas, keamanan dasar jadi lebih kuat.',
        'Hebat, kebiasaan aman makin menempel di ingatanmu.'
      ],
      wrong: [
        'Perhatikan konsep kerahasiaan, integritas, dan ketersediaan untuk pilihan ini.',
        'Coba ingat kembali contoh ancaman umum dan praktik paling aman.',
        'Tinjau lagi prinsip dasar: mana yang paling melindungi data?'
      ]
    },
    '2': {
      correct: [
        'Keren! Kebiasaan password-mu sudah sesuai best practice.',
        'Pas banget, kombinasi perlindungan akunmu makin kuat.',
        'Jago! Kamu paham cara menjaga kredensial tetap aman.'
      ],
      wrong: [
        'Ingat: password unik + 2FA selalu jadi kombinasi terbaik.',
        'Coba pikirkan kembali apa yang membuat password mudah dibobol.',
        'Lihat lagi contoh pengelolaan password yang aman dan tidak diulang.'
      ]
    },
    '3': {
      correct: [
        'Cermat! Kamu mengenali pola phishing dengan sigap.',
        'Bagus, insting anti-social engineering kamu tajam.',
        'Mantap, kamu tahu kapan harus berhenti sebelum tertipu.'
      ],
      wrong: [
        'Ingat: selalu curigai pesan mendesak yang minta data atau OTP.',
        'Coba evaluasi ciri-ciri phishing: domain, urgensi, dan permintaan data.',
        'Kalau ragu, jangan klik—periksa dulu alamat dan sumber pesan.'
      ]
    }
  };

  let qi = 0;
  let score = 0;
  let locked = false;
  let revealTimeout;

  initSoundToggle();

  if(questionCountEl) questionCountEl.textContent = qs.length;
  if(quizBlurb && currentLesson?.quizBlurb) quizBlurb.textContent = currentLesson.quizBlurb;

  // Lesson page population
  const lessonTitle = document.getElementById('lessonTitle');
  if(lessonTitle && currentLesson){
    lessonTitle.textContent = currentLesson.title;
    const intro = document.getElementById('lessonIntro');
    const overview = document.getElementById('lessonOverview');
    const duration = document.getElementById('lessonDuration');
    const level = document.getElementById('lessonLevel');
    const outcome = document.getElementById('lessonOutcome');
    const bullets = document.getElementById('lessonBullets');
    const checklist = document.getElementById('lessonChecklist');
    const callout = document.getElementById('lessonCallout');
    const quote = document.getElementById('lessonQuote');
    const openQuiz = document.getElementById('openQuiz');

    if(intro) intro.textContent = currentLesson.intro;
    if(overview) overview.textContent = currentLesson.overview;
    if(duration) duration.textContent = currentLesson.duration;
    if(level) level.textContent = currentLesson.level;
    if(outcome) outcome.textContent = currentLesson.outcome;
    if(callout) callout.textContent = currentLesson.callout;
    if(quote) quote.textContent = currentLesson.quote;
    if(openQuiz) openQuiz.href = 'quiz.html?course=' + courseParam;

    if(bullets){
      bullets.innerHTML = '';
      currentLesson.bullets.forEach(item=>{
        const li = document.createElement('li');
        li.textContent = item;
        bullets.appendChild(li);
      });
    }
    if(checklist){
      checklist.innerHTML = '';
      currentLesson.checklist.forEach(item=>{
        const li = document.createElement('li');
        li.textContent = item;
        checklist.appendChild(li);
      });
    }
  }

  if(qtitle && currentQuiz){
    qtitle.textContent = 'Quiz — ' + currentQuiz.title;
  }
  if(qscore) qscore.textContent = score;
  setupLessonPage();
  setupForumUX();

  if(startQuiz && qtext && qopts){
    startQuiz.addEventListener('click', ()=>{
      beginQuiz();
    });
  }
  if(nextBtn){
    nextBtn.addEventListener('click', ()=>{
      qi++;
      renderQ();
      setTimeout(()=>{
        if(qwrap) qwrap.scrollIntoView({behavior: 'smooth', block: 'center'});
      }, 80);
    });
  }

  function beginQuiz(){
    qi = 0;
    score = 0;
    locked = false;
    if(qscore) qscore.textContent = score;
    if(startQuiz) startQuiz.textContent = 'Mulai Ulang';
    renderQ();
  }

  function updateProgressBar(){
    const pct = qs.length ? Math.min((qi/qs.length)*100, 100) : 0;
    if(progressFill) progressFill.style.width = pct + '%';
    if(questionCountEl) questionCountEl.textContent = qs.length;
    if(questionNumberEl) questionNumberEl.textContent = Math.min(qi+1, qs.length);
  }

  function renderQ(){
    if(!qtext || !qopts) return;
    locked = false;
    if(revealTimeout) clearTimeout(revealTimeout);
    const q = qs[qi];
    if(feedback) feedback.textContent = 'Pilih jawaban terbaikmu, lalu klik lanjut.';
    updateProgressBar();
    if(nextBtn){
      nextBtn.disabled = true;
      nextBtn.classList.remove('pulse-ready');
    }

    if(!q){
      qtext.textContent = 'Quiz selesai! Skor kamu: ' + score;
      qopts.innerHTML = '<div class="quiz-empty">Kamu sudah menyelesaikan semua pertanyaan. Tekan "Mulai Ulang" untuk mencoba lagi.</div>';
      if(qscore) qscore.textContent = score;
      if(progressFill) progressFill.style.width = '100%';
      if(questionNumberEl) questionNumberEl.textContent = qs.length;
      if(feedback) feedback.textContent = 'Bagikan skor ini di dashboard (demo).';
      triggerConfetti();
      return;
    }

    qtext.textContent = (qi+1) + '. ' + q.q;
    qopts.innerHTML = '';
    q.a.forEach((opt, idx)=>{
      const b = document.createElement('button');
      b.className = 'choice-btn';
      b.textContent = opt;
      b.addEventListener('click', ()=> handleAnswer(idx, q.c));
      qopts.appendChild(b);
    });
  }

  function handleAnswer(idx, correctIdx){
    if(locked || !qopts) return;
    locked = true;
    const buttons = qopts.querySelectorAll('.choice-btn');
    buttons.forEach((b)=>{
      b.disabled = true;
    });
    const selected = buttons[idx];
    if(selected) selected.classList.add('is-choosing');
    if(feedback) feedback.textContent = 'Memeriksa jawabanmu...';

    revealTimeout = setTimeout(()=>{
      const isCorrect = idx === correctIdx;
      if(isCorrect){
        score += 10;
      } else {
        score = Math.max(0, score - 2);
      }
      const message = getFeedbackText(isCorrect, courseParam);
      if(feedback) feedback.textContent = message;
      if(qscore) qscore.textContent = score;

      buttons.forEach((b, i)=>{
        b.classList.remove('is-choosing');
        if(i === correctIdx) b.classList.add('is-correct');
        if(i === idx && idx !== correctIdx) b.classList.add('is-wrong');
      });
      playTone(isCorrect ? 'success' : 'error');

      if(progressFill) progressFill.style.width = ((qi+1)/qs.length)*100 + '%';
      if(nextBtn){
        nextBtn.disabled = false;
        nextBtn.textContent = (qi === qs.length-1) ? 'Lihat Hasil' : 'Lanjut Soal';
        nextBtn.classList.add('pulse-ready');
      }
    }, 500);
  }

  function getFeedbackText(isCorrect, courseKey){
    const bank = contextualFeedback[courseKey] || contextualFeedback['1'];
    const list = isCorrect ? bank.correct : bank.wrong;
    if(list && list.length){
      const i = Math.floor(Math.random() * list.length);
      return list[i];
    }
    return isCorrect ? 'Benar! Jawaban tepat menambah +10 poin.' : 'Kurang tepat. Pelajari lagi topiknya.';
  }

  function initSoundToggle(){
    if(!quizActions || soundToggleBtn) return;
    soundToggleBtn = document.createElement('button');
    soundToggleBtn.className = 'sound-toggle';
    updateSoundToggleLabel();
    soundToggleBtn.addEventListener('click', ()=>{
      soundOn = !soundOn;
      localStorage.setItem('cy_quiz_sound', soundOn ? 'on' : 'off');
      updateSoundToggleLabel();
      soundToggleBtn.classList.add('is-choosing');
      setTimeout(()=> soundToggleBtn.classList.remove('is-choosing'), 250);
    });
    quizActions.insertBefore(soundToggleBtn, quizActions.firstChild);
  }

  function updateSoundToggleLabel(){
    if(!soundToggleBtn) return;
    soundToggleBtn.textContent = soundOn ? '🔊 Suara aktif' : '🔈 Suara mati';
    soundToggleBtn.classList.toggle('muted', !soundOn);
  }

  function playTone(type){
    if(!soundOn) return;
    try{
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const now = audioCtx.currentTime;
      const freq = type === 'success' ? 820 : 260;
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch(e){}
  }

  function triggerConfetti(){
    const pieces = 28;
    for(let i=0; i<pieces; i++){
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const randomX = Math.random()*100;
      const rotate = (Math.random()*180 - 90).toFixed(0) + 'deg';
      const duration = (Math.random()*1.3 + 1.9).toFixed(2) + 's';
      el.style.left = randomX + 'vw';
      el.style.setProperty('--x', (Math.random()*120 - 60) + 'px');
      el.style.setProperty('--rot', rotate);
      el.style.setProperty('--dur', duration);
      el.style.opacity = (Math.random()*0.3 + 0.7).toFixed(2);
      el.style.background = Math.random() > 0.5 ? 'linear-gradient(180deg, #2b6ef6, #1f4ed8)' : 'linear-gradient(180deg, #7bdcff, #2b6ef6)';
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), parseFloat(duration)*1000 + 300);
    }
  }
// Simulation choices
  document.querySelectorAll('.sim-card .choices button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const ok = b.getAttribute('data-correct') === 'true';
      const res = document.getElementById('simResult');
      if(ok){ res.textContent = 'Bagus! Pilihan aman.'; res.style.color = '#8bf0a2'; }
      else { res.textContent = 'Pilihan berisiko. Jangan lakukan ini.'; res.style.color = '#ff8b8b'; }
    });
  });

  // Certificate download (demo)
  const dl = document.getElementById('downloadCert');
  if(dl){
    dl.addEventListener('click', (e)=>{
      e.preventDefault();
      alert('Demo: sertifikat diunduh (placeholder).');
    });
  }
});
