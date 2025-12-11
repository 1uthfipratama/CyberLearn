
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
      tempo: '📚 Baca, catat 3 contoh ancaman',
      level: '🔰 Level pemula',
      outcome: '🎯 Paham prinsip dasar & ancaman umum',
      keyTerms: [
        'CIA Triad: menjaga kerahasiaan, integritas, dan ketersediaan data.',
        'Malware: perangkat lunak berbahaya (virus, worm, ransomware).',
        'Backup: salinan data di lokasi lain untuk pemulihan cepat.'
      ],
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
      scenario: 'Kamu memakai Wi-Fi publik di kafe untuk membuka email kerja.',
      steps: [
        'Aktifkan VPN atau gunakan koneksi personal tethering.',
        'Pastikan HTTPS dan jangan membuka data sensitif di Wi-Fi terbuka.',
        'Logout setelah selesai, bersihkan tab dan history dasar.'
      ],
      actions: 'Cek jaringan aman, pastikan perangkat ter-update, dan simpan backup penting.',
      flags: 'Waspada jika ada pop-up meminta instal plugin, atau ada sertifikat SSL tidak valid.',
      practice: 'Lihat pengaturan keamanan browser kamu, aktifkan update otomatis dan proteksi phishing.',
      resources: [
        '☑️ Checklist: update OS, antivirus, dan browser.',
        '☑️ Catat 3 contoh data sensitif yang tidak boleh dibagikan.',
        '☑️ Siapkan backup mingguan di cloud terenkripsi.'
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
      tempo: '🔐 Cek password manager + aktifkan 2FA',
      level: '🧠 Tingkat mudah',
      outcome: '🎯 Akun lebih terlindungi dengan 2FA & password kuat',
      keyTerms: [
        '2FA/MFA: autentikasi dua faktor untuk menambah lapisan keamanan.',
        'Password Manager: alat untuk menyimpan dan membuat kata sandi unik.',
        'Credential leak: kebocoran data login di layanan lain yang ikut berdampak.'
      ],
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
      scenario: 'Notifikasi login mencurigakan muncul di email utama.',
      steps: [
        'Logout semua sesi dan ganti password dengan kombinasi kuat.',
        'Aktifkan atau pastikan 2FA menyala, gunakan aplikasi authenticator.',
        'Cek “recent activity” dan hapus perangkat asing.'
      ],
      actions: 'Audit password di 5 layanan paling sering dipakai dan perbaiki yang duplikat.',
      flags: 'Email minta OTP atau link reset tanpa permintaanmu; abaikan dan ganti password langsung.',
      practice: 'Buat satu kata sandi passphrase 3–4 kata unik dan simpan di password manager.',
      resources: [
        '☑️ Buat daftar akun kritikal (email, bank, media sosial).',
        '☑️ Aktifkan 2FA untuk minimal dua akun hari ini.',
        '☑️ Uji recovery: pastikan email/nomor pemulihan masih aktif.'
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
      tempo: '🎣 Baca contoh pesan, identifikasi 3 red flag',
      level: '⚡ Pemula menengah',
      outcome: '🎯 Bisa menyaring pesan mencurigakan & melaporkannya',
      keyTerms: [
        'Phishing: upaya tipu daya melalui pesan/email palsu.',
        'Smishing/Vishing: phishing via SMS dan telepon.',
        'Spoofing: menyamarkan identitas pengirim agar tampak resmi.'
      ],
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
      scenario: 'Mendapat email “admin bank” dengan link verifikasi mendesak.',
      steps: [
        'Cek domain pengirim dan arahkan kursor ke link tanpa mengklik.',
        'Verifikasi lewat kanal resmi (aplikasi/telepon resmi) sebelum tindakan.',
        'Laporkan dan tandai spam; jika sudah klik, segera ganti password dan aktifkan 2FA.'
      ],
      actions: 'Gunakan prinsip “berhenti-sejenak-cek sumber” sebelum klik link/OTP apa pun.',
      flags: 'Pesan mendesak meminta OTP atau data pribadi, alamat domain typo, lampiran .exe/.apk mencurigakan.',
      practice: 'Screenshot satu email mencurigakan (tanpa data sensitif) dan tandai 3 red flag.',
      resources: [
        '☑️ Buat template laporan phishing untuk tim/ISP.',
        '☑️ Simpan nomor CS resmi bank/e-wallet di kontak.',
        '☑️ Aktifkan filter spam dan update browser extension anti-phishing.'
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
    const durationTop = document.getElementById('lessonDurationTop');
    const tempo = document.getElementById('lessonTempo');
    const level = document.getElementById('lessonLevel');
    const outcome = document.getElementById('lessonOutcome');
    const bullets = document.getElementById('lessonBullets');
    const checklist = document.getElementById('lessonChecklist');
    const keyTerms = document.getElementById('lessonKeyTerms');
    const steps = document.getElementById('lessonSteps');
    const scenario = document.getElementById('lessonScenario');
    const actions = document.getElementById('lessonActions');
    const flags = document.getElementById('lessonFlags');
    const practice = document.getElementById('lessonPractice');
    const resources = document.getElementById('lessonResources');
    const callout = document.getElementById('lessonCallout');
    const quote = document.getElementById('lessonQuote');
    const openQuiz = document.getElementById('openQuiz');
    const quizBlurbBox = document.getElementById('lessonQuizBlurb');

    if(intro) intro.textContent = currentLesson.intro;
    if(overview) overview.textContent = currentLesson.overview;
    if(duration) duration.textContent = currentLesson.duration;
    if(durationTop) durationTop.textContent = currentLesson.duration;
    if(tempo) tempo.textContent = currentLesson.tempo || tempo.textContent;
    if(level) level.textContent = currentLesson.level;
    if(outcome) outcome.textContent = currentLesson.outcome;
    if(callout) callout.textContent = currentLesson.callout;
    if(quote) quote.textContent = currentLesson.quote;
    if(quizBlurbBox) quizBlurbBox.textContent = currentLesson.quizBlurb;
    if(scenario) scenario.textContent = currentLesson.scenario;
    if(actions) actions.textContent = currentLesson.actions;
    if(flags) flags.textContent = currentLesson.flags;
    if(practice) practice.textContent = currentLesson.practice;
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
    if(keyTerms){
      keyTerms.innerHTML = '';
      currentLesson.keyTerms.forEach(item=>{
        const li = document.createElement('li');
        li.textContent = item;
        keyTerms.appendChild(li);
      });
    }
    if(steps){
      steps.innerHTML = '';
      currentLesson.steps.forEach(item=>{
        const div = document.createElement('div');
        div.className = 'lesson-step';
        div.textContent = item;
        steps.appendChild(div);
      });
    }
    if(resources){
      resources.innerHTML = '';
      currentLesson.resources.forEach(item=>{
        const li = document.createElement('li');
        li.textContent = item;
        resources.appendChild(li);
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
  // Forum rendering & interaction
  const forumList = document.getElementById('forumList');
  if(forumList){
    const forumSearch = document.getElementById('forumSearch');
    const forumEmpty = document.getElementById('forumEmpty');
    const postCount = document.getElementById('postCount');
    const postForm = document.getElementById('postForm');
    const postFlash = document.getElementById('postFlash');
    const activeFilter = document.getElementById('activeFilter');
    const memberCount = document.getElementById('memberCount');

    const stored = JSON.parse(localStorage.getItem('cy_forum_posts') || '[]');
    const basePosts = [
      { title: 'Apa itu phishing dan bagaimana mengenalinya?', author: 'user123', time: '2 jam lalu', topic: 'Phishing', body: 'Phishing adalah upaya penipuan dengan berpura-pura menjadi pihak yang sah lewat email/pesan palsu untuk mencuri data sensitif seperti password atau OTP.', answer: 'Cek alamat pengirim, jangan klik link mencurigakan, dan jangan pernah membagikan OTP ke siapa pun.', tags: ['tips', 'pemula'], votes: 12 },
      { title: 'Password saya sudah kuat, apakah masih perlu 2FA?', author: 'cyberNewbie', time: '5 jam lalu', topic: 'Akun & Password', body: '2FA menambah lapisan keamanan kedua selain password. Jika password bocor, akunmu tetap terlindungi karena butuh kode tambahan.', answer: 'Ya, 2FA sangat disarankan untuk email, media sosial, dan akun finansial.', tags: ['akun', '2FA'], votes: 18 },
      { title: 'Apa bedanya smishing dan vishing?', author: 'studentA', time: 'kemarin', topic: 'Social Engineering', body: 'Smishing adalah phishing lewat SMS/chat, sedangkan vishing lewat panggilan suara/telepon.', answer: 'Hati-hati jika ada pesan/telepon yang mendesak kamu kirim OTP atau data pribadi.', tags: ['smishing', 'vishing'], votes: 9 },
      { title: 'Bolehkah menyimpan password di browser?', author: 'netsecLearner', time: '2 hari lalu', topic: 'Akun & Password', body: 'Relatif aman jika perangkat pribadi terkunci (PIN/password/biometrik). Jangan simpan di komputer umum.', answer: 'Lebih aman pakai password manager khusus, tapi kalau di browser pastikan hanya di device pribadi.', tags: ['password', 'browser'], votes: 7 },
    ];

    let posts = [...basePosts, ...stored];

    function saveUserPosts(){
      const userPosts = posts.filter(p=>p.userGenerated);
      localStorage.setItem('cy_forum_posts', JSON.stringify(userPosts));
    }

    function renderPosts(){
      const term = (forumSearch?.value || '').toLowerCase();
      const filtered = posts.filter(p=>
        p.title.toLowerCase().includes(term) ||
        p.topic.toLowerCase().includes(term) ||
        p.body.toLowerCase().includes(term)
      );
      forumList.innerHTML = '';
      if(activeFilter) activeFilter.textContent = term ? 'Kata kunci: ' + term : 'Semua';

      if(filtered.length === 0){
        if(forumEmpty) forumEmpty.hidden = false;
        return;
      }
      if(forumEmpty) forumEmpty.hidden = true;

      filtered.forEach((p, idx)=>{
        const art = document.createElement('article');
        art.className = 'forum-post';
        const title = document.createElement('h4');
        title.textContent = '[Q] ' + p.title;
        const meta = document.createElement('p');
        meta.className = 'muted';
        meta.textContent = `oleh ${p.author} • ${p.time} • Topik: ${p.topic}`;
        const body = document.createElement('p');
        body.textContent = p.body;
        const divider = document.createElement('div');
        divider.className = 'forum-divider';
        const answer = document.createElement('p');
        answer.className = 'muted';
        answer.innerHTML = `<strong>[A singkat]</strong> ${p.answer}`;
        const footer = document.createElement('footer');
        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.gap = '6px';
        p.tags.forEach(t=>{
          const chip = document.createElement('span');
          chip.className = 'forum-chip';
          chip.textContent = t;
          left.appendChild(chip);
        });
        const right = document.createElement('div');
        right.className = 'forum-chip';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn';
        btn.textContent = `👍 ${p.votes}`;
        btn.addEventListener('click', ()=>{
          posts[idx].votes += 1;
          renderPosts();
        });
        right.textContent = '';
        right.appendChild(btn);
        footer.appendChild(left);
        footer.appendChild(right);

        art.appendChild(title);
        art.appendChild(meta);
        art.appendChild(body);
        art.appendChild(divider);
        art.appendChild(answer);
        art.appendChild(footer);
        forumList.appendChild(art);
      });

      if(postCount) postCount.textContent = posts.length;
      if(memberCount) memberCount.textContent = '1.2k';
    }

    renderPosts();

    if(forumSearch){
      forumSearch.addEventListener('input', ()=>{
        renderPosts();
      });
    }

    if(postForm){
      postForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const title = document.getElementById('postTitle').value.trim();
        const author = document.getElementById('postName').value.trim() || 'Anon';
        const topic = document.getElementById('postTopic').value;
        const body = document.getElementById('postBody').value.trim();
        if(!title || !body) return;
        const newPost = {
          title,
          author,
          topic,
          body,
          time: 'Baru saja',
          answer: 'Menunggu tanggapan komunitas. Bagikan pengalamanmu!',
          tags: [topic, 'pengguna'],
          votes: 1,
          userGenerated: true
        };
        posts = [newPost, ...posts];
        saveUserPosts();
        renderPosts();
        postForm.reset();
        if(postFlash){
          postFlash.style.display = 'block';
          setTimeout(()=> postFlash.style.display = 'none', 1800);
        }
      });
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
