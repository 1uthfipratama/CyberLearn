
// Basic interactions and animations for demo
document.addEventListener('DOMContentLoaded', () => {
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
  const user = localStorage.getItem('cy_user') || 'Tamu';
  // set name if exists
  const unameEls = document.querySelectorAll('.user-name');
  unameEls.forEach(el=> el.textContent = (user === 'tamu' ? 'Ferdinand Darmawan' : user.split('@')[0]));

  // demo progress values
  const done = 0;
  const total = 4;
  const pct = Math.round((done/total)*100);
  if(doneCountEl) doneCountEl.textContent = done;
  if(totalScoreEl) totalScoreEl.textContent = 0;
  if(bigPbar){ bigPbar.style.setProperty('--value', pct + '%'); setTimeout(()=>{ bigPbar.querySelector('.big-fill').style.width = pct + '%'; }, 200); }

  
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
  const quizBlurb = document.getElementById('quizBlurb');

  let qi = 0;
  let score = 0;
  let locked = false;

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

  if(startQuiz && qtext && qopts){
    startQuiz.addEventListener('click', ()=>{
      beginQuiz();
    });
  }
  if(nextBtn){
    nextBtn.addEventListener('click', ()=>{
      qi++;
      renderQ();
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
    const q = qs[qi];
    if(feedback) feedback.textContent = 'Pilih jawaban terbaikmu, lalu klik lanjut.';
    updateProgressBar();
    if(nextBtn) nextBtn.disabled = true;

    if(!q){
      qtext.textContent = 'Quiz selesai! Skor kamu: ' + score;
      qopts.innerHTML = '<div class="quiz-empty">Kamu sudah menyelesaikan semua pertanyaan. Tekan "Mulai Ulang" untuk mencoba lagi.</div>';
      if(qscore) qscore.textContent = score;
      if(progressFill) progressFill.style.width = '100%';
      if(questionNumberEl) questionNumberEl.textContent = qs.length;
      if(feedback) feedback.textContent = 'Bagikan skor ini di dashboard (demo).';
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
    if(idx === correctIdx){
      score += 10;
      if(feedback) feedback.textContent = 'Benar! Jawaban tepat menambah +10 poin.';
    } else {
      score = Math.max(0, score - 2);
      if(feedback) feedback.textContent = 'Kurang tepat. Jawaban benar diberi highlight hijau.';
    }
    if(qscore) qscore.textContent = score;
    const buttons = qopts.querySelectorAll('.choice-btn');
    buttons.forEach((b, i)=>{
      b.disabled = true;
      if(i === correctIdx) b.classList.add('is-correct');
      if(i === idx && idx !== correctIdx) b.classList.add('is-wrong');
    });
    if(progressFill) progressFill.style.width = ((qi+1)/qs.length)*100 + '%';
    if(nextBtn){
      nextBtn.disabled = false;
      nextBtn.textContent = (qi === qs.length-1) ? 'Lihat Hasil' : 'Lanjut Soal';
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
