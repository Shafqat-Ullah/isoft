/**
 * iSOFT IT Training & Software Solutions
 * Main Application Controller, Routing, UI Interactions & Event Handlers
 * Official WhatsApp Helpline: 0333 6606262 | Alternate: 0313 9999749
 * Campus: Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar
 */

class Application {
  constructor() {
    this.currentView = 'home';
    this.activeCourse = null;
    this.selectedLockedCourse = null;
    this.currentReceiptDataUrl = '';
  }

  init() {
    this.setupNavigation();
    this.setupSearch();
    this.setupCourseForm();
    this.setupReceiptUpload();
    this.setupNotifications();
    this.setupRegistrationFormModal();
    this.renderHome();
    this.renderCoursePackages();
    this.renderCatalog();
    this.renderTeamMembers();

    // Check URL hash for routing
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();

    // AUTO-OPEN REGISTRATION MODAL IMMEDIATELY ON LINK CLICK / VISIT
    setTimeout(() => {
      this.openRegistrationModal();
    }, 200);

    // Escape key listener to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeRegistrationModal();
        this.closePosterLightbox();
      }
    });
  }

  // --- ROUTING & VIEW SWITCHING ---
  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const [viewName, param] = hash.split('/');

    if (viewName === 'register' || viewName === 'apply') {
      this.openRegistrationModal(param || null);
      return;
    }

    if (viewName === 'packages') {
      setTimeout(() => {
        const sec = document.getElementById('packagesSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (viewName === 'about') {
      setTimeout(() => {
        const sec = document.getElementById('aboutSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (viewName === 'contact') {
      setTimeout(() => {
        const sec = document.getElementById('contactSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (viewName === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    this.showView(viewName || 'home');
  }

  showView(viewName) {
    if (viewName === 'admin') {
      viewName = 'home';
    }
    this.currentView = viewName;

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.style.display = 'none';
    });

    // Update nav links active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    // Show targeted view
    const target = document.getElementById(`view_${viewName}`);
    if (target) {
      target.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // View-specific initializers
    if (viewName === 'courses') {
      this.renderCatalog();
    } else if (viewName === 'about') {
      this.renderTeamMembers();
    }

    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('show');
  }

  setupNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const backdrop = document.getElementById('mobileNavBackdrop');

    const closeMobileMenu = () => {
      if (navLinks) navLinks.classList.remove('show');
      if (backdrop) backdrop.classList.remove('show');
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    };

    // Nav links click
    document.querySelectorAll('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = e.currentTarget.dataset.viewTarget;
        if (targetView === 'register') {
          this.openRegistrationModal();
        } else if (targetView === 'packages') {
          const sec = document.getElementById('packagesSection');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          window.location.hash = 'packages';
        } else if (targetView === 'about') {
          const sec = document.getElementById('aboutSection');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          window.location.hash = 'about';
        } else if (targetView === 'contact') {
          const sec = document.getElementById('contactSection');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          window.location.hash = 'contact';
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.location.hash = 'home';
        }
        closeMobileMenu();
      });
    });

    // Mobile nav toggle
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('show');
        if (backdrop) backdrop.classList.toggle('show', isOpen);
        toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileMenu);
    }
  }

  // --- HOME VIEW RENDERING ---
  renderHome() {
    // Render featured courses on homepage
    const container = document.getElementById('homeFeaturedCourses');
    if (container) {
      const featured = COURSES.slice(0, 4);
      container.innerHTML = featured.map(c => this.createCourseCardHTML(c)).join('');
    }

    // Render FAQs
    const faqContainer = document.getElementById('faqAccordion');
    if (faqContainer) {
      faqContainer.innerHTML = FAQS.map((faq, idx) => `
        <div class="faq-item" style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-md); margin-bottom:1rem; overflow:hidden;">
          <button class="faq-question-btn" onclick="app.toggleFaq(${idx})" style="width:100%; text-align:left; padding:1.25rem 1.5rem; display:flex; justify-content:space-between; align-items:center; font-weight:700; color:var(--brand-dark); font-size:1.05rem; background:transparent; border:none; cursor:pointer;">
            <span>${faq.question}</span>
            <i class="fa-solid fa-chevron-down faq-chevron" id="faqChevron_${idx}" style="transition:transform 0.2s;"></i>
          </button>
          <div class="faq-answer" id="faqAnswer_${idx}" style="display:none; padding:0 1.5rem 1.25rem; color:var(--gray-600); font-size:0.95rem; line-height:1.6; border-top:1px solid var(--gray-100);">
            <div style="padding-top:0.75rem;">${faq.answer}</div>
          </div>
        </div>
      `).join('');
    }
  }

  toggleFaq(idx) {
    const ans = document.getElementById(`faqAnswer_${idx}`);
    const chev = document.getElementById(`faqChevron_${idx}`);
    if (ans) {
      const isOpen = ans.style.display === 'block';
      ans.style.display = isOpen ? 'none' : 'block';
      if (chev) chev.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  }

  // --- COURSE PACKAGES & POSTERS SHOWCASE ---
  
  // --- FACULTY & LEADERSHIP TEAM (5 Teachers with CEO Sir Shafiq) ---
  renderTeamMembers() {
    const ceoContainer = document.getElementById('ceoShowcaseContainer');
    const facultyContainer = document.getElementById('facultyGridContainer');
    if (typeof TEAM_MEMBERS === 'undefined' || !TEAM_MEMBERS) return;

    const ceo = TEAM_MEMBERS.find(m => m.isCeo) || TEAM_MEMBERS[0];
    const faculty = TEAM_MEMBERS.filter(m => !m.isCeo);

    if (ceoContainer && ceo) {
      ceoContainer.innerHTML = `
        <div class="ceo-showcase-card">
          <div class="ceo-card-grid">
            <div class="ceo-avatar-wrap">
              <span>${ceo.initials}</span>
              <div class="ceo-crown-pill">
                <i class="fa-solid fa-crown"></i> CEO &amp; FOUNDER
              </div>
            </div>
            <div class="ceo-info-content">
              <h3>
                <span>${ceo.name} (Sir Shafiq)</span>
                <span class="ceo-role-badge">Founder &amp; CEO</span>
              </h3>
              <div class="ceo-designation">${ceo.designation}</div>
              <p class="ceo-bio">${ceo.bio}</p>
              
              <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.25rem;">
                ${ceo.specializations.map(s => `<span class="faculty-pill" style="background:#FEF2F2; color:var(--primary-red); font-weight:700;"><i class="fa-solid fa-check"></i> ${s}</span>`).join('')}
              </div>

              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; padding-top:1rem; border-top:1px solid var(--gray-200);">
                <div style="display:flex; gap:1.5rem; font-size:0.85rem; color:var(--gray-600); flex-wrap:wrap;">
                  <span><i class="fa-solid fa-award" style="color:var(--primary-red);"></i> ${ceo.experience}</span>
                  <span><i class="fa-solid fa-star" style="color:#F59E0B;"></i> <strong>${ceo.rating} Rating</strong></span>
                  <span><i class="fa-solid fa-user-graduate" style="color:var(--success);"></i> <strong>${ceo.studentsCount} Students</strong> Mentored</span>
                </div>
                <a href="https://wa.me/923336606262?text=${encodeURIComponent('Hello Sir Shafiq! I would like to inquire about courses and admission at iSOFT.')}" target="_blank" class="btn btn-whatsapp btn-sm">
                  <i class="fa-brands fa-whatsapp"></i> Chat with Sir Shafiq
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (facultyContainer) {
      facultyContainer.innerHTML = faculty.map(member => `
        <div class="faculty-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <div class="faculty-avatar-box">
              ${member.initials}
            </div>
            <span style="font-size:0.8rem; font-weight:700; color:#F59E0B; background:#FFFBEB; padding:3px 8px; border-radius:var(--radius-full); border:1px solid #FDE68A;">
              ${member.rating}
            </span>
          </div>

          <h4 class="faculty-name">${member.name}</h4>
          <div class="faculty-role">${member.role}</div>
          <div style="font-size:0.775rem; color:var(--gray-500); margin-bottom:0.75rem; font-weight:500;">${member.designation}</div>
          
          <p class="faculty-bio">${member.bio}</p>

          <div class="faculty-pills">
            ${member.specializations.map(s => `<span class="faculty-pill">${s}</span>`).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:1rem; border-top:1px solid var(--gray-100); font-size:0.8rem; color:var(--gray-500);">
            <span><i class="fa-solid fa-briefcase"></i> ${member.experience}</span>
            <span><i class="fa-solid fa-users"></i> ${member.studentsCount}</span>
          </div>
        </div>
      `).join('');
    }
  }

  renderCoursePackages() {
    const gridContainer = document.getElementById('coursePackagesGrid');
    if (!gridContainer || !COURSE_PACKAGES) return;

    // Filter out the overall master catalog poster for the grid, as it's shown in the top banner
    const individualPackages = COURSE_PACKAGES.filter(p => p.id !== 'pkg-all-packages');

    gridContainer.innerHTML = individualPackages.map(pkg => `
      <div class="poster-card" id="card_${pkg.id}">
        <div class="poster-img-wrap" onclick="app.openPosterLightbox('${pkg.posterImage}', '${this.escapeHtml(pkg.title)}', '${pkg.courseId}')" title="Click to view full poster">
          <img src="${pkg.posterImage}" alt="${this.escapeHtml(pkg.title)}" loading="lazy">
          <div class="poster-discount-ribbon">${pkg.discountBadge}</div>
          <div class="poster-overlay-btn">
            <span class="poster-overlay-badge"><i class="fa-solid fa-magnifying-glass-plus"></i> View Full Poster</span>
          </div>
        </div>

        <div class="poster-card-body">
          <div class="poster-meta-tags">
            <span class="poster-pill pill-duration"><i class="fa-solid fa-calendar-days"></i> ${pkg.duration}</span>
            <span class="poster-pill pill-mode"><i class="fa-solid fa-location-dot"></i> ${pkg.mode}</span>
            <span class="poster-pill pill-time"><i class="fa-solid fa-clock"></i> ${pkg.timing}</span>
          </div>

          <h3 class="poster-card-title">${pkg.shortTitle || pkg.title}</h3>
          <p class="poster-card-desc">${pkg.summary}</p>

          <div class="poster-price-box">
            <span class="poster-price-current">${pkg.feeFormatted}</span>
            ${pkg.regularFee ? `<span class="poster-price-original">Rs. ${pkg.regularFee.toLocaleString()}</span>` : ''}
            <span style="font-size:0.75rem; color:var(--gray-500); margin-left:auto; font-weight:600;">${pkg.feeUnit}</span>
          </div>

          <div class="poster-actions">
            <button class="btn btn-primary" onclick="app.openRegistrationModal('${pkg.courseId}')">
              <i class="fa-solid fa-file-pen"></i> Register Now
            </button>
            <a href="https://wa.me/923336606262?text=${encodeURIComponent(`Hello iSOFT! I want details and admission in: ${pkg.title}`)}" target="_blank" class="btn btn-whatsapp-outline" title="WhatsApp Admissions Desk">
              <i class="fa-brands fa-whatsapp"></i> Chat
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- POSTER LIGHTBOX MODAL ---
  openPosterLightbox(imgSrc, title, courseId = null) {
    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    if (navLinks) navLinks.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    const modal = document.getElementById('posterLightboxModal');
    const img = document.getElementById('lightboxPosterImg');
    const titleEl = document.getElementById('lightboxPosterTitle');
    const regBtn = document.getElementById('lightboxRegisterBtn');
    const waBtn = document.getElementById('lightboxWhatsAppBtn');

    if (img) img.src = imgSrc;
    if (titleEl) titleEl.innerText = title || "iSOFT Course Poster";

    if (regBtn) {
      regBtn.onclick = () => {
        this.closePosterLightbox();
        this.openRegistrationModal(courseId);
      };
    }

    if (waBtn) {
      waBtn.href = `https://wa.me/923336606262?text=${encodeURIComponent(`Hello iSOFT! I am interested in: ${title}. Please send admission information.`)}`;
    }

    if (modal) modal.classList.add('active');
  }

  closePosterLightbox() {
    const modal = document.getElementById('posterLightboxModal');
    if (modal) modal.classList.remove('active');
  }

  // --- COMPREHENSIVE COURSE REGISTRATION MODAL & WHATSAPP SUBMISSION ---
  setupRegistrationFormModal() {
    // 1. Modal Select
    const select = document.getElementById('regCourseSelect');
    if (select) {
      this.populateCourseSelectOptions(select);
      select.addEventListener('change', () => this.updateCoursePreviewCard());
    }

    // 2. Hero Form Select
    const heroSelect = document.getElementById('heroCourseSelect');
    if (heroSelect) {
      this.populateCourseSelectOptions(heroSelect);
    }

    // 3. Modal Form Submit
    const form = document.getElementById('quickRegistrationForm');
    if (form) {
      form.addEventListener('submit', (e) => this.submitRegistrationToWhatsApp(e));
    }

    // 4. Hero Quick Form Submit
    const heroForm = document.getElementById('heroQuickRegForm');
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => this.submitHeroRegistrationToWhatsApp(e));
    }
  }

  submitHeroRegistrationToWhatsApp(event) {
    event.preventDefault();

    const fullName = document.getElementById('heroStudentName')?.value.trim();
    const fatherName = document.getElementById('heroFatherName')?.value.trim();
    const phone = document.getElementById('heroStudentPhone')?.value.trim();
    const city = document.getElementById('heroStudentCity')?.value.trim() || 'Peshawar';
    const courseVal = document.getElementById('heroCourseSelect')?.value;
    const mode = document.querySelector('input[name="heroMode"]:checked')?.value || 'Online';

    if (!fullName || fullName.length < 2) {
      this.showToast('Please enter your full name.', 'danger');
      document.getElementById('heroStudentName')?.focus();
      return;
    }

    if (!fatherName || fatherName.length < 2) {
      this.showToast("Please enter father's name.", 'danger');
      document.getElementById('heroFatherName')?.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      this.showToast('Please enter a valid WhatsApp number (e.g. 0333 1234567).', 'danger');
      document.getElementById('heroStudentPhone')?.focus();
      return;
    }

    if (!courseVal) {
      this.showToast('Please select a course or package.', 'danger');
      document.getElementById('heroCourseSelect')?.focus();
      return;
    }

    const pkg = COURSE_PACKAGES.find(p => p.courseId === courseVal || p.id === courseVal);
    const course = COURSES.find(c => c.id === courseVal);
    const courseTitle = pkg ? pkg.title : (course ? course.title : courseVal);
    const courseFee = pkg ? pkg.feeFormatted : (course ? `Rs. ${course.discountPrice.toLocaleString()}` : 'N/A');
    const courseDuration = pkg ? pkg.duration : (course ? course.duration : 'Standard');

    const whatsappMessage = 
`🎓 *iSOFT IT TRAINING & SOFTWARE SOLUTIONS*
📋 *QUICK ADMISSION APPLICATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${fullName}
👨‍👦 *Father's Name:* ${fatherName}
📱 *WhatsApp Number:* ${phone}
📍 *City / Location:* ${city}

📚 *Selected Course:* ${courseTitle}
💰 *Course Fee:* ${courseFee}
⏱️ *Duration:* ${courseDuration}
🏫 *Learning Method:* ${mode}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *Campus:* Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar
📞 *Helpline:* 0333 6606262 | 0313 9999749

_Assalam-o-Alaikum Sir! I have submitted my admission application through the iSOFT official website. Please confirm my seat and send batch details._`;

    const encodedMsg = encodeURIComponent(whatsappMessage);
    const waUrl = `https://wa.me/923336606262?text=${encodedMsg}`;

    this.showToast('Opening WhatsApp with your application details...', 'success');
    window.open(waUrl, '_blank');
  }

  populateCourseSelectOptions(select) {
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>-- Select a Course or Special Package --</option>';

    // Group 1: Special Packages from posters
    const optGroupPackages = document.createElement('optgroup');
    optGroupPackages.label = "🔥 SPECIAL PROMOTION PACKAGES & POSTERS";

    COURSE_PACKAGES.forEach(pkg => {
      const opt = document.createElement('option');
      opt.value = pkg.courseId || pkg.id;
      opt.dataset.type = 'package';
      opt.dataset.pkgId = pkg.id;
      opt.innerText = `${pkg.shortTitle || pkg.title} (${pkg.feeFormatted} • ${pkg.durationShort || pkg.duration})`;
      optGroupPackages.appendChild(opt);
    });
    select.appendChild(optGroupPackages);

    // Group 2: All Other Academy Programs
    const optGroupCourses = document.createElement('optgroup');
    optGroupCourses.label = "🎓 ALL CERTIFIED PROGRAMS & DIPLOMAS";

    COURSES.forEach(c => {
      // Avoid duplicate display if already in packages group
      const alreadyInPackages = COURSE_PACKAGES.some(p => p.courseId === c.id);
      if (!alreadyInPackages) {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.dataset.type = 'course';
        opt.innerText = `${c.title} (Rs. ${c.discountPrice.toLocaleString()} • ${c.duration})`;
        optGroupCourses.appendChild(opt);
      }
    });
    select.appendChild(optGroupCourses);
  }

  openRegistrationModal(preSelectedCourseId = null) {
    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    if (navLinks) navLinks.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    const modal = document.getElementById('courseRegistrationModal');
    if (!modal) return;

    // Reset views inside modal
    const formBox = document.getElementById('regFormContainer');
    const successBox = document.getElementById('regSuccessContainer');
    if (formBox) formBox.style.display = 'block';
    if (successBox) successBox.style.display = 'none';

    // Populate select if empty
    const select = document.getElementById('regCourseSelect');
    if (select && select.children.length <= 1) {
      this.populateCourseSelectOptions(select);
    }

    // Pre-select course if requested
    if (select && preSelectedCourseId) {
      const matchingOpt = Array.from(select.options).find(opt => 
        opt.value === preSelectedCourseId || 
        opt.dataset.pkgId === preSelectedCourseId
      );
      if (matchingOpt) {
        select.value = matchingOpt.value;
      }
    }

    this.updateCoursePreviewCard();
    modal.classList.add('active');
  }

  closeRegistrationModal() {
    const modal = document.getElementById('courseRegistrationModal');
    if (modal) modal.classList.remove('active');
  }

  updateCoursePreviewCard() {
    const select = document.getElementById('regCourseSelect');
    const previewBox = document.getElementById('regCoursePreviewBox');
    if (!select || !previewBox) return;

    const val = select.value;
    if (!val) {
      previewBox.style.display = 'none';
      return;
    }

    // Find course or package
    const pkg = COURSE_PACKAGES.find(p => p.courseId === val || p.id === val);
    const course = COURSES.find(c => c.id === val);

    const title = pkg ? pkg.title : (course ? course.title : val);
    const fee = pkg ? pkg.feeFormatted : (course ? `Rs. ${course.discountPrice.toLocaleString()}` : '');
    const duration = pkg ? pkg.duration : (course ? course.duration : '');
    const timing = pkg ? pkg.timing : (course ? (course.classTiming || 'Evening Batch') : 'Flexible');
    const mode = pkg ? pkg.mode : (course ? (course.learningMode || 'Online & On-Site') : 'Online / On-Site');
    const badge = pkg ? pkg.discountBadge : (course ? course.badge : 'Admissions Open');

    previewBox.style.display = 'flex';
    previewBox.innerHTML = `
      <div>
        <div style="font-size:0.75rem; font-weight:700; color:var(--primary-red); text-transform:uppercase;">
          <i class="fa-solid fa-graduation-cap"></i> Selected Track: ${badge}
        </div>
        <div class="reg-preview-title">${title}</div>
        <div class="reg-preview-meta">
          <span><i class="fa-solid fa-calendar-days" style="color:var(--success);"></i> ${duration}</span>
          <span><i class="fa-solid fa-clock" style="color:var(--warning);"></i> ${timing}</span>
          <span><i class="fa-solid fa-location-dot" style="color:var(--info);"></i> ${mode}</span>
        </div>
      </div>
      <div>
        <div class="reg-preview-price">${fee}</div>
        <div style="font-size:0.75rem; color:var(--gray-500); text-align:right;">Official Academy Fee</div>
      </div>
    `;

    // Also auto-select mode radio if course is physical only or online only
    const modeRadioOnline = document.querySelector('input[name="regMode"][value="Online"]');
    const modeRadioPhysical = document.querySelector('input[name="regMode"][value^="Physical"]') || document.querySelector('input[name="regMode"][value="On-Site"]');
    if ((mode.toLowerCase().includes('on-site') || mode.toLowerCase().includes('physical')) && !mode.toLowerCase().includes('online')) {
      if (modeRadioPhysical) modeRadioPhysical.checked = true;
    } else if (mode.toLowerCase().includes('online') && !(mode.toLowerCase().includes('on-site') || mode.toLowerCase().includes('physical'))) {
      if (modeRadioOnline) modeRadioOnline.checked = true;
    }
  }

  submitRegistrationToWhatsApp(event) {
    event.preventDefault();

    const fullName = document.getElementById('regStudentName')?.value.trim();
    const fatherName = document.getElementById('regFatherName')?.value.trim();
    const phone = document.getElementById('regStudentPhone')?.value.trim();
    const email = document.getElementById('regStudentEmail')?.value.trim();
    const city = document.getElementById('regStudentCity')?.value.trim();
    const courseVal = document.getElementById('regCourseSelect')?.value;
    const education = document.getElementById('regEducation')?.value;
    const mode = document.querySelector('input[name="regMode"]:checked')?.value || 'Online';
    const notes = document.getElementById('regNotes')?.value.trim() || 'None';

    // 1. Comprehensive Field Validation
    if (!fullName || fullName.length < 2) {
      this.showToast('Please enter your full name.', 'danger');
      document.getElementById('regStudentName')?.focus();
      return;
    }

    if (!fatherName || fatherName.length < 2) {
      this.showToast("Please enter father's name.", 'danger');
      document.getElementById('regFatherName')?.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      this.showToast('Please enter a valid WhatsApp number (e.g. 0333 1234567).', 'danger');
      document.getElementById('regStudentPhone')?.focus();
      return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      this.showToast('Please enter a valid email address.', 'danger');
      document.getElementById('regStudentEmail')?.focus();
      return;
    }

    if (!courseVal) {
      this.showToast('Please select a course or program from the dropdown.', 'danger');
      document.getElementById('regCourseSelect')?.focus();
      return;
    }

    if (!city || city.length < 2) {
      this.showToast('Please enter your city.', 'danger');
      document.getElementById('regStudentCity')?.focus();
      return;
    }

    if (!education) {
      this.showToast('Please select your educational qualification.', 'danger');
      document.getElementById('regEducation')?.focus();
      return;
    }

    // 2. Resolve Course Details
    const pkg = COURSE_PACKAGES.find(p => p.courseId === courseVal || p.id === courseVal);
    const course = COURSES.find(c => c.id === courseVal);
    const courseTitle = pkg ? pkg.title : (course ? course.title : courseVal);
    const courseFee = pkg ? pkg.feeFormatted : (course ? `Rs. ${course.discountPrice.toLocaleString()}` : 'N/A');
    const courseDuration = pkg ? pkg.duration : (course ? course.duration : 'Standard');

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 3. Format the Complete WhatsApp Application Message
    const whatsappMessage = 
`🎓 *iSOFT IT TRAINING & SOFTWARE SOLUTIONS*
📋 *STUDENT REGISTRATION APPLICATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${fullName}
👨‍👦 *Father's Name:* ${fatherName}
📱 *WhatsApp Number:* ${phone}
📧 *Email Address:* ${email}
📍 *City:* ${city}
🎓 *Educational Qualification:* ${education}

📚 *Selected Course:* ${courseTitle}
💰 *Course Fee:* ${courseFee}
⏱️ *Duration:* ${courseDuration}
🏫 *Preferred Learning Method:* ${mode}

💬 *Additional Message:*
${notes}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 *Date:* ${formattedDate}
🏢 *Campus:* Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar
🌐 *Official Website:* https://isoft.edu.pk`;

    const cleanNumber = (typeof ACADEMY_INFO !== 'undefined' && ACADEMY_INFO.whatsappClean) ? ACADEMY_INFO.whatsappClean : "923336606262";
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 4. Record Application Locally
    try {
      if (typeof store !== 'undefined' && store.createApplication) {
        store.createApplication({
          courseId: courseVal,
          courseTitle: courseTitle,
          courseFee: (pkg && pkg.fee) || (course && course.discountPrice) || 0,
          studentName: fullName,
          fatherName: fatherName,
          studentEmail: email,
          studentPhone: phone,
          country: "Pakistan",
          city: city,
          skillLevel: education,
          reason: "Career Training",
          preferredMethod: mode,
          paymentMethod: "whatsapp_direct",
          transactionId: "WA-" + Date.now().toString().slice(-6),
          receiptUrl: "",
          driveFolderId: (course && course.driveFolderId) || ""
        });
      }
    } catch (err) {
      console.warn("Application storage note:", err);
    }

    // 5. Open WhatsApp via click-to-chat
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      console.log('Direct open blocked, user can click the launch button');
    }

    // 6. Switch Modal View to Active Redirection Step
    const formBox = document.getElementById('regFormContainer');
    const successBox = document.getElementById('regSuccessContainer');
    if (formBox) formBox.style.display = 'none';

    if (successBox) {
      successBox.style.display = 'block';
      successBox.innerHTML = `
        <div class="reg-redirect-card">
          <div class="reg-redirect-icon-wrap">
            <i class="fa-brands fa-whatsapp"></i>
          </div>
          <h3 class="reg-redirect-title">Ready to Send via WhatsApp</h3>
          <p class="reg-redirect-desc">
            Your application for <strong>${this.escapeHtml(courseTitle)}</strong> is prepared. Please deliver the pre-filled message on WhatsApp to complete your admission.
          </p>

          <div class="reg-redirect-summary">
            <div class="summary-row"><span>Student Name:</span> <strong>${this.escapeHtml(fullName)}</strong></div>
            <div class="summary-row"><span>Father's Name:</span> <strong>${this.escapeHtml(fatherName)}</strong></div>
            <div class="summary-row"><span>Course:</span> <strong>${this.escapeHtml(courseTitle)}</strong></div>
            <div class="summary-row"><span>Learning Method:</span> <strong>${this.escapeHtml(mode)}</strong></div>
            <div class="summary-row"><span>City:</span> <strong>${this.escapeHtml(city)}</strong></div>
            <div class="summary-row"><span>Admissions Helpline:</span> <strong>0333 6606262</strong></div>
          </div>

          <div class="reg-redirect-actions">
            <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-lg reg-wa-launch-btn">
              <i class="fa-brands fa-whatsapp"></i> Open WhatsApp & Send Application
            </a>
            <button type="button" class="btn btn-outline" onclick="app.showRegFormAgain()">
              <i class="fa-solid fa-arrow-left"></i> Edit Registration Details
            </button>
            <button type="button" class="btn btn-link" onclick="app.closeRegistrationModal()" style="font-size:0.9rem; color:var(--gray-600); margin-top:0.25rem;">
              Done & Return to Website
            </button>
          </div>

          <div class="reg-redirect-note">
            <i class="fa-solid fa-circle-info" style="color:var(--primary-red);"></i>
            <span><strong>Important:</strong> Please ensure you press <strong>Send</strong> in WhatsApp so our admissions coordinator receives your details immediately.</span>
          </div>
        </div>
      `;
    }
  }

  showRegFormAgain() {
    const formBox = document.getElementById('regFormContainer');
    const successBox = document.getElementById('regSuccessContainer');
    if (formBox) formBox.style.display = 'block';
    if (successBox) successBox.style.display = 'none';
  }

  // --- CATALOG VIEW & FILTERING ---
  renderCatalog(catFilter = 'all', searchQuery = '') {
    const container = document.getElementById('catalogCoursesGrid');
    if (!container) return;

    let list = COURSES;
    if (catFilter !== 'all') {
      if (catFilter === 'packages') {
        // Return courses that have poster packages
        list = COURSES.filter(c => COURSE_PACKAGES.some(p => p.courseId === c.id));
      } else {
        list = list.filter(c => c.category === catFilter);
      }
    }

    if (searchQuery) {
      list = list.filter(c => 
        c.title.toLowerCase().includes(searchQuery) ||
        (c.shortDesc && c.shortDesc.toLowerCase().includes(searchQuery)) ||
        (c.categoryLabel && c.categoryLabel.toLowerCase().includes(searchQuery))
      );
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--gray-500);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
          <h3>No courses found</h3>
          <p>Try searching with another keyword or select All Programs.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(c => this.createCourseCardHTML(c)).join('');
  }

  createCourseCardHTML(course) {
    const isFree = course.isFree;
    const badgeText = isFree ? "100% Free" : (course.badge || "Featured");
    const priceDisplay = isFree 
      ? `<span class="course-final-price" style="color:var(--success);">FREE</span>`
      : `<span class="course-final-price">Rs. ${course.discountPrice.toLocaleString()}</span>
         ${course.price ? `<span class="course-original-price">Rs. ${course.price.toLocaleString()}</span>` : ''}`;

    const thumbHtml = course.posterImage 
      ? `<img src="${course.posterImage}" alt="${this.escapeHtml(course.title)}" style="width:100%; height:100%; object-fit:cover;">`
      : this.getCourseGraphicSVG(course.category);

    return `
      <div class="course-card" data-course-id="${course.id}">
        <div class="course-card-thumb-wrapper" onclick="app.openCourseDetail('${course.id}')" style="cursor: pointer;">
          ${thumbHtml}
          <div class="course-badge-top">${badgeText}</div>
          <div class="course-drive-notice">
            <i class="fa-brands fa-google-drive" style="color: #4285F4;"></i>
            <span>Google Drive Verified Access</span>
          </div>
        </div>

        <div class="course-card-body">
          <div class="course-meta-top">
            <span style="font-weight: 700; color: var(--primary-red);"><i class="fa-solid fa-tag"></i> ${course.categoryLabel}</span>
            <span><i class="fa-solid fa-star" style="color: #F59E0B;"></i> ${course.rating || '4.9'} (${course.reviewsCount || 100})</span>
          </div>

          <h3 class="course-card-title" onclick="app.openCourseDetail('${course.id}')">${course.title}</h3>
          <p class="course-card-desc">${course.shortDesc}</p>

          <div class="course-details-pills">
            <span><i class="fa-solid fa-clock"></i> ${course.duration}</span>
            <span><i class="fa-solid fa-video"></i> ${course.lecturesCount || 30} Lectures</span>
            <span><i class="fa-solid fa-chart-simple"></i> ${course.level || 'All Levels'}</span>
          </div>

          <div class="course-card-footer" style="margin-top:auto; padding-top:1rem; display:flex; justify-content:space-between; align-items:center;">
            <div class="course-price-box">
              ${priceDisplay}
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-outline btn-sm" onclick="app.openCourseDetail('${course.id}')" title="Course details">
                Details
              </button>
              <button class="btn btn-primary btn-sm" onclick="app.openRegistrationModal('${course.id}')" title="Register for this course">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getCourseGraphicSVG(category) {
    const gradients = {
      python: ['#1E252B', '#0D1117', '#306998', 'fa-brands fa-python', '#FFD43B'],
      programming: ['#181B1F', '#2A1012', '#DC2626', 'fa-solid fa-code', '#F87171'],
      networking: ['#0B192C', '#1E3E62', '#0284C7', 'fa-solid fa-network-wired', '#38BDF8'],
      datascience: ['#0F172A', '#1E293B', '#10B981', 'fa-solid fa-chart-line', '#34D399'],
      cybersecurity: ['#111827', '#1F2937', '#DC2626', 'fa-solid fa-shield-halved', '#FCA5A5'],
      database: ['#1A1A24', '#2C1820', '#E11D48', 'fa-solid fa-database', '#FB7185'],
      webdev: ['#181B1F', '#20262E', '#D32027', 'fa-brands fa-react', '#61DAFB'],
      ai: ['#111827', '#1F2937', '#8B5CF6', 'fa-solid fa-brain', '#C084FC']
    };
    const [c1, c2, c3, icon, iconColor] = gradients[category] || gradients['programming'];

    return `
      <div style="width:100%; height:100%; background: linear-gradient(135deg, ${c1} 0%, ${c2} 100%); display:flex; align-items:center; justify-content:center; position:relative;">
        <i class="${icon}" style="font-size: 4.5rem; color: ${iconColor}; opacity: 0.85; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));"></i>
        <div style="position:absolute; bottom: 35px; right: 15px; font-size: 0.75rem; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:1px;">
          iSOFT ACADEMY
        </div>
      </div>
    `;
  }

  setupSearch() {
    // Catalog categories click
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.dataset.category;
        const query = document.getElementById('catalogSearchInput')?.value.toLowerCase().trim() || '';
        this.renderCatalog(cat, query);
      });
    });

    // Catalog search input
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const activeCat = document.querySelector('.cat-btn.active')?.dataset.category || 'all';
        this.renderCatalog(activeCat, query);
      });
    }

    // Top navbar global search
    const globalSearch = document.getElementById('globalNavbarSearch');
    if (globalSearch) {
      globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const val = e.target.value.trim();
          window.location.hash = 'courses';
          setTimeout(() => {
            const catSearch = document.getElementById('catalogSearchInput');
            if (catSearch) {
              catSearch.value = val;
              this.renderCatalog('all', val.toLowerCase());
            }
          }, 100);
        }
      });
    }
  }

  // --- COURSE DETAIL VIEW ---
  openCourseDetail(courseId) {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    this.activeCourse = course;
    this.showView('course-detail');
    if (window.location.hash !== `#course/${course.id}`) {
      window.location.hash = `course/${course.id}`;
    }

    // Fill Breadcrumbs & Hero
    document.getElementById('courseDetailBreadcrumb').innerText = course.title;
    document.getElementById('courseDetailTitle').innerText = course.title;
    document.getElementById('courseDetailCategory').innerText = course.categoryLabel;
    document.getElementById('courseDetailRating').innerText = `${course.rating || '4.9'} (${course.reviewsCount || 100} verified reviews)`;
    document.getElementById('courseDetailDesc').innerText = course.longDesc || course.shortDesc;

    // Fill Price Card
    const priceBox = document.getElementById('courseDetailPriceBox');
    if (priceBox) {
      if (course.isFree) {
        priceBox.innerHTML = `<span style="font-size:2rem; font-weight:800; color:var(--success);">FREE</span>`;
      } else {
        priceBox.innerHTML = `
          <div style="font-size:2rem; font-weight:800; color:var(--brand-dark);">Rs. ${course.discountPrice.toLocaleString()}</div>
          ${course.price ? `<div style="font-size:1rem; color:var(--gray-400); text-decoration:line-through;">Rs. ${course.price.toLocaleString()}</div>` : ''}
        `;
      }
    }

    // Check if user already enrolled & approved
    const currentUser = store.getCurrentUser();
    const hasApproved = store.hasApprovedAccess(currentUser.email, course.id);
    const enrollCtaBtn = document.getElementById('courseDetailEnrollBtn');
    if (enrollCtaBtn) {
      if (hasApproved) {
        enrollCtaBtn.innerHTML = `<i class="fa-brands fa-google-drive"></i> Open Google Drive Lectures`;
        enrollCtaBtn.className = "btn btn-drive btn-lg";
        enrollCtaBtn.onclick = () => this.launchDriveViewer(course.id);
      } else {
        enrollCtaBtn.innerHTML = `<i class="fa-solid fa-file-pen"></i> Register for Course Online`;
        enrollCtaBtn.className = "btn btn-primary btn-lg";
        enrollCtaBtn.onclick = () => this.openRegistrationModal(course.id);
      }
    }

    // Render Learning Objectives
    const objContainer = document.getElementById('courseLearningObjectives');
    if (objContainer && course.learningObjectives) {
      objContainer.innerHTML = course.learningObjectives.map(obj => `
        <li style="display:flex; align-items:flex-start; gap:0.75rem; margin-bottom:0.75rem; font-size:0.95rem; color:var(--gray-700);">
          <i class="fa-solid fa-check-circle" style="color:var(--success); margin-top:3px; flex-shrink:0;"></i>
          <span>${obj}</span>
        </li>
      `).join('');
    }

    // Render Curriculum & Lectures
    this.renderCurriculum(course);

    // Instructor info
    if (course.instructor) {
      document.getElementById('courseInstructorName').innerText = course.instructor.name;
      document.getElementById('courseInstructorTitle').innerText = course.instructor.title;
      document.getElementById('courseInstructorBio').innerText = course.instructor.bio;
      document.getElementById('courseInstructorStudents').innerText = `${course.instructor.studentsCount}+`;
      document.getElementById('courseInstructorRating').innerText = `${course.instructor.rating} ★`;
    }
  }

  renderCurriculum(course) {
    const list = document.getElementById('curriculumAccordion');
    if (!list) return;

    if (!course.modules || course.modules.length === 0) {
      list.innerHTML = `<p style="color:var(--gray-500); padding:1rem;">Complete syllabus and project guide will be unlocked inside Google Drive.</p>`;
      return;
    }

    const currentUser = store.getCurrentUser();
    const hasAccess = store.hasApprovedAccess(currentUser.email, course.id);

    list.innerHTML = course.modules.map((mod, modIdx) => `
      <div class="curriculum-mod-item" style="border:1px solid var(--gray-200); border-radius:var(--radius-md); margin-bottom:0.75rem; overflow:hidden;">
        <div style="background:var(--gray-50); padding:1rem 1.25rem; font-weight:700; color:var(--brand-dark); display:flex; justify-content:space-between; align-items:center;">
          <span>${mod.title}</span>
          <span style="font-size:0.8rem; color:var(--gray-500); font-weight:500;">${mod.lessons.length} Lectures</span>
        </div>
        <div style="background:#FFFFFF;">
          ${mod.lessons.map(les => {
            const isUnlocked = hasAccess || les.isPreview;
            return `
              <div class="curriculum-lesson-row" style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 1.25rem; border-top:1px solid var(--gray-100); font-size:0.9rem;">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <i class="fa-solid ${isUnlocked ? 'fa-play-circle text-red' : 'fa-lock'}" style="color:${isUnlocked ? 'var(--primary-red)' : 'var(--gray-400)'};"></i>
                  <span style="color:${isUnlocked ? 'var(--brand-dark)' : 'var(--gray-600)'};">${les.title}</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span style="font-size:0.8rem; color:var(--gray-400);">${les.duration}</span>
                  ${les.isPreview ? `
                    <button class="btn btn-outline btn-sm" onclick="app.playVideoPreview('${les.previewVideoUrl}', '${this.escapeHtml(les.title)}')">
                      <i class="fa-solid fa-play"></i> Watch Sample
                    </button>
                  ` : isUnlocked ? `
                    <button class="btn btn-drive btn-sm" onclick="app.launchDriveViewer('${course.id}')">
                      <i class="fa-brands fa-google-drive"></i> Open in Drive
                    </button>
                  ` : `
                    <button class="btn btn-sm" style="background:var(--gray-100); color:var(--gray-600);" onclick="app.openRegistrationModal('${course.id}')">
                      <i class="fa-solid fa-lock"></i> Register to Unlock
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  playVideoPreview(url, title) {
    const player = document.getElementById('previewVideoPlayer');
    const titleEl = document.getElementById('currentPlayingLessonTitle');
    if (player) {
      player.src = url;
    }
    if (titleEl) {
      titleEl.innerText = `Now Playing (Authorized Preview): ${title}`;
    }
  }

  // --- STEP 4 & CHECKOUT COMPATIBILITY ---
  setupCourseForm() {
    const form = document.getElementById('courseAccessForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const courseId = document.getElementById('formCourseId').value;
      const course = COURSES.find(c => c.id === courseId);

      const appData = {
        courseId: courseId,
        courseTitle: document.getElementById('formCourseTitle').value,
        courseFee: course ? course.discountPrice : 0,
        studentName: document.getElementById('formStudentName').value,
        studentEmail: document.getElementById('formStudentEmail').value,
        studentPhone: document.getElementById('formStudentPhone').value,
        country: document.getElementById('formCountry').value,
        city: document.getElementById('formCity').value,
        skillLevel: document.getElementById('formSkillLevel').value,
        reason: document.getElementById('formReason').value,
        preferredMethod: document.getElementById('formPreferredMethod').value,
        paymentMethod: document.getElementById('formPaymentMethod').value,
        transactionId: document.getElementById('formTransactionId').value,
        receiptUrl: this.currentReceiptDataUrl,
        driveFolderId: document.getElementById('formDriveFolderId').value
      };

      const newApp = store.createApplication(appData);
      this.closeModal('enrollmentFormModal');
      this.showToast('Application successfully recorded!', 'success');
      window.location.hash = `checkout/${newApp.id}`;
    });
  }

  setupReceiptUpload() {
    const input = document.getElementById('formReceiptInput');
    const preview = document.getElementById('formReceiptPreview');
    if (!input) return;

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File size exceeds 5MB limit.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (re) => {
          this.currentReceiptDataUrl = re.target.result;
          if (preview) {
            preview.src = re.target.result;
            preview.style.display = 'block';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // --- CHECKOUT VIEW ---
  openCheckoutView(appId) {
    const application = store.getApplicationById(appId);
    if (!application) {
      this.showToast('Application not found', 'danger');
      window.location.hash = 'courses';
      return;
    }

    this.showView('checkout');
    document.getElementById('checkoutAppId').innerText = application.id;
    document.getElementById('checkoutCourseTitle').innerText = application.courseTitle;
    document.getElementById('checkoutTotalFee').innerText = `Rs. ${Number(application.courseFee).toLocaleString()} PKR`;
    document.getElementById('checkoutStudentEmail').innerText = application.studentEmail;

    // Render payment method tabs
    this.renderPaymentMethodTabs();
  }

  renderPaymentMethodTabs() {
    const container = document.getElementById('paymentTabsContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-lg); padding:1.5rem; margin-top:1rem;">
        <h4 style="font-weight:700; color:var(--brand-dark); margin-bottom:0.75rem;"><i class="fa-solid fa-money-bill-transfer" style="color:var(--primary-red);"></i> Easy Payment Transfer</h4>
        <p style="font-size:0.9rem; color:var(--gray-600); margin-bottom:1rem;">
          Transfer your fee via JazzCash / EasyPaisa / 1Link Bank Transfer to our official admissions account:
        </p>
        <div style="background:var(--gray-50); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--gray-200); margin-bottom:1rem;">
          <div style="font-size:0.85rem; color:var(--gray-600);">Account Title:</div>
          <div style="font-size:1.1rem; font-weight:800; color:var(--brand-dark);">iSOFT IT Training & Software Solutions</div>
          <div style="font-size:0.85rem; color:var(--gray-600); margin-top:0.5rem;">JazzCash / WhatsApp Helpline:</div>
          <div style="font-size:1.35rem; font-weight:800; color:var(--primary-red);">0333 6606262</div>
          <div style="font-size:0.85rem; color:var(--gray-600); margin-top:0.5rem;">Campus Address:</div>
          <div style="font-size:0.9rem; font-weight:600; color:var(--brand-dark);">Office 17, Jabir Flat, Abdra BRT Station, University Road, Peshawar</div>
        </div>
        <a href="https://wa.me/923336606262?text=${encodeURIComponent('Hello iSOFT Admissions Desk! I have submitted my payment. Here is the receipt.')}" target="_blank" class="btn btn-whatsapp" style="width:100%;">
          <i class="fa-brands fa-whatsapp"></i> Send Payment Screenshot on WhatsApp
        </a>
      </div>
    `;
  }

  // --- STUDENT DASHBOARD VIEW ---
  renderStudentDashboard() {
    const user = store.getCurrentUser();
    const nameEl = document.getElementById('dashStudentName');
    const emailEl = document.getElementById('dashStudentEmail');
    if (nameEl) nameEl.innerText = user.name || "Student";
    if (emailEl) emailEl.innerHTML = `<i class="fa-solid fa-envelope"></i> ${user.email}`;

    const container = document.getElementById('myCoursesListContainer');
    if (!container) return;

    const apps = store.getStudentApplications(user.email);
    if (apps.length === 0) {
      container.innerHTML = `
        <div style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-xl); padding:3rem; text-align:center;">
          <i class="fa-solid fa-book-open" style="font-size:3rem; color:var(--gray-300); margin-bottom:1rem;"></i>
          <h4 style="font-size:1.25rem; font-weight:800; color:var(--brand-dark);">No Course Enrollments Found</h4>
          <p style="color:var(--gray-600); font-size:0.9rem; margin-bottom:1.5rem;">Explore our courses and special packages to enroll with verified Google Drive access.</p>
          <a href="#courses" class="btn btn-primary" data-view-target="courses"><i class="fa-solid fa-compass"></i> Explore Courses</a>
        </div>
      `;
      return;
    }

    container.innerHTML = apps.map(appItem => {
      const isApproved = appItem.driveAccessStatus === 'Granted';
      return `
        <div style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-xl); padding:1.5rem; margin-bottom:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <span class="status-badge ${isApproved ? 'approved' : 'pending'}" style="margin-bottom:0.5rem; display:inline-block;">
              ${isApproved ? 'DRIVE ACCESS UNLOCKED' : 'VERIFICATION IN PROGRESS'}
            </span>
            <h4 style="font-size:1.2rem; font-weight:800; color:var(--brand-dark);">${appItem.courseTitle}</h4>
            <div style="font-size:0.85rem; color:var(--gray-600); margin-top:0.25rem;">
              Application ID: <code>${appItem.id}</code> • Registered via ${appItem.paymentMethod}
            </div>
          </div>
          <div>
            ${isApproved ? `
              <button class="btn btn-drive" onclick="app.launchDriveViewer('${appItem.courseId}')">
                <i class="fa-brands fa-google-drive"></i> Open Lectures on Drive
              </button>
            ` : `
              <a href="https://wa.me/923336606262?text=${encodeURIComponent(`Hello iSOFT! Checking status for my course registration ID: ${appItem.id}`)}" target="_blank" class="btn btn-whatsapp-outline">
                <i class="fa-brands fa-whatsapp"></i> Check Status on WhatsApp
              </a>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  // --- DRIVE VIEWER LAUNCHER ---
  launchDriveViewer(courseId) {
    const course = COURSES.find(c => c.id === courseId);
    const modal = document.getElementById('driveViewerModal');
    if (!modal) return;

    document.getElementById('driveModalCourseTitle').innerText = course ? course.title : "Google Drive Lecture Archive";
    document.getElementById('driveModalFolderId').innerText = course ? course.driveFolderId : "iSOFT_DRIVE_FOLDER";
    modal.classList.add('active');
  }

  // --- NOTIFICATIONS ---
  setupNotifications() {
    const btn = document.getElementById('notifDropdownBtn');
    const menu = document.getElementById('notifDropdownMenu');
    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) this.renderNotificationsList();
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== btn) {
          menu.style.display = 'none';
        }
      });
    }
    this.updateNotifBadge();
  }

  updateNotifBadge() {
    const user = store.getCurrentUser();
    const notifs = store.getNotifications(user.email);
    const unread = notifs.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadgeCounter');
    if (badge) {
      badge.innerText = unread;
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
  }

  renderNotificationsList() {
    const user = store.getCurrentUser();
    const notifs = store.getNotifications(user.email);
    const list = document.getElementById('notifDropdownList');
    if (!list) return;

    if (notifs.length === 0) {
      list.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--gray-500); font-size:0.85rem;">No notifications yet.</div>`;
      return;
    }

    list.innerHTML = notifs.slice(0, 6).map(n => `
      <div style="padding:0.85rem 1rem; border-bottom:1px solid var(--gray-100); background:${n.read ? '#FFFFFF' : '#FEF2F2'}; cursor:pointer;">
        <div style="font-weight:700; font-size:0.85rem; color:var(--brand-dark); margin-bottom:0.2rem;">
          ${n.title}
        </div>
        <div style="font-size:0.775rem; color:var(--gray-600); line-height:1.4;">${n.message}</div>
        <div style="font-size:0.7rem; color:var(--gray-400); margin-top:0.35rem;">
          ${new Date(n.createdAt).toLocaleTimeString()}
        </div>
      </div>
    `).join('');

    store.markAllNotificationsRead(user.email);
    this.updateNotifBadge();
  }

  // --- CERTIFICATE VERIFICATION TOOL ---
  verifyCertificate() {
    const input = document.getElementById('certInputId');
    const resultBox = document.getElementById('certVerificationResult');
    if (!input || !resultBox) return;

    const query = input.value.trim().toUpperCase();
    if (!query) {
      alert('Please enter a Certificate ID (e.g. ISOFT-CERT-2026-001).');
      return;
    }

    const cert = SAMPLE_CERTIFICATES.find(c => c.certId.toUpperCase() === query);

    if (cert) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background:#ECFDF5; border:2px solid #10B981; border-radius:var(--radius-lg); padding:2rem; text-align:center;">
          <div style="width:60px; height:60px; border-radius:var(--radius-full); background:#10B981; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:1.75rem; margin:0 auto 1rem;">
            <i class="fa-solid fa-certificate"></i>
          </div>
          <span class="status-badge approved" style="font-size:0.9rem; margin-bottom:0.75rem;">OFFICIALLY VERIFIED CREDENTIAL</span>
          <h3 style="font-size:1.5rem; font-weight:800; color:var(--brand-dark); margin-bottom:0.25rem;">${cert.studentName}</h3>
          <p style="font-size:1.1rem; color:var(--primary-red); font-weight:700; margin-bottom:1rem;">${cert.courseName}</p>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; max-width:600px; margin:0 auto; background:#FFFFFF; padding:1rem; border-radius:var(--radius-md); border:1px solid #A7F3D0; font-size:0.85rem;">
            <div><strong>Issue Date:</strong><br>${cert.issueDate}</div>
            <div><strong>Academic Grade:</strong><br>${cert.grade}</div>
            <div><strong>Lead Instructor:</strong><br>${cert.instructor}</div>
          </div>
          <div style="margin-top:1.25rem; font-size:0.75rem; color:var(--gray-500);">
            Authenticated by iSOFT IT Training & Software Solutions Academic Council
          </div>
        </div>
      `;
    } else {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background:#FEF2F2; border:1px solid var(--primary-red-border); border-radius:var(--radius-lg); padding:2rem; text-align:center;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size:2.5rem; color:var(--primary-red); margin-bottom:0.75rem;"></i>
          <h3 style="font-size:1.2rem; color:var(--brand-dark);">Certificate ID Not Found</h3>
          <p style="color:var(--gray-600); font-size:0.9rem;">No record found for "<strong>${query}</strong>". Please check the ID printed on the physical or PDF certificate and try again.</p>
        </div>
      `;
    }
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    let icon = 'fa-solid fa-circle-info';
    if (type === 'success') {
      icon = 'fa-solid fa-circle-check';
      toast.style.borderLeftColor = 'var(--success)';
    } else if (type === 'danger') {
      icon = 'fa-solid fa-circle-xmark';
      toast.style.borderLeftColor = 'var(--primary-red)';
    }

    toast.innerHTML = `<i class="${icon}" style="font-size:1.2rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global app singleton
const app = new Application();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
