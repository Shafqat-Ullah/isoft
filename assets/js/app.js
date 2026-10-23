/**
 * iSOFT IT Training & Consultancy
 * Main Application Controller, Routing, UI Interactions & Event Handlers
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
    this.setupRoleSwitcher();
    this.renderHome();
    this.renderCatalog();
    this.renderStudentDashboard();
    admin.init();

    // Check URL hash for routing (e.g. #courses, #dashboard, #admin)
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();

    // Re-render when data updates
    window.addEventListener('isoft:data-updated', () => {
      this.renderStudentDashboard();
      this.updateNotifBadge();
    });
  }

  // --- ROUTING & VIEW SWITCHING ---
  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const [viewName, param] = hash.split('/');

    if (viewName === 'course' && param) {
      const course = COURSES.find(c => c.id === param || c.slug === param);
      if (course) {
        this.openCourseDetail(course.id);
        return;
      }
    } else if (viewName === 'checkout' && param) {
      this.openCheckoutView(param);
      return;
    }

    this.showView(viewName || 'home');
  }

  showView(viewName) {
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
    } else if (viewName === 'dashboard') {
      this.renderStudentDashboard();
    } else if (viewName === 'admin') {
      admin.renderKPIs();
      admin.renderApplicationsTable();
    }

    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('show');
  }

  setupNavigation() {
    // Nav links click
    document.querySelectorAll('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = e.currentTarget.dataset.viewTarget;
        window.location.hash = targetView;
      });
    });

    // Mobile nav toggle
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
      });
    }
  }

  // --- ROLE SWITCHER (Student <-> Admin) ---
  setupRoleSwitcher() {
    const roleBtn = document.getElementById('roleSwitcherBtn');
    if (!roleBtn) return;

    this.updateRoleButtonUI();

    roleBtn.addEventListener('click', () => {
      const newUser = store.toggleUserRole();
      this.updateRoleButtonUI();
      this.showToast(`Switched view to ${newUser.role.toUpperCase()}: ${newUser.name}`, 'info');

      if (newUser.role === 'admin') {
        window.location.hash = 'admin';
      } else {
        window.location.hash = 'dashboard';
      }
    });
  }

  updateRoleButtonUI() {
    const roleBtn = document.getElementById('roleSwitcherBtn');
    if (!roleBtn) return;
    const user = store.getCurrentUser();

    if (user.role === 'admin') {
      roleBtn.className = 'role-pill admin-active';
      roleBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> <span>Admin Mode (${user.name.split(' ')[0]})</span>`;
    } else {
      roleBtn.className = 'role-pill';
      roleBtn.innerHTML = `<i class="fa-solid fa-user-graduate"></i> <span>Student Mode (${user.name.split(' ')[0]})</span>`;
    }
  }

  // --- HOME VIEW RENDERING ---
  renderHome() {
    // Render featured courses on homepage
    const container = document.getElementById('homeFeaturedCourses');
    if (!container) return;

    const featured = COURSES.slice(0, 3);
    container.innerHTML = featured.map(c => this.createCourseCardHTML(c)).join('');

    // Render FAQs
    const faqContainer = document.getElementById('faqAccordion');
    if (faqContainer) {
      faqContainer.innerHTML = FAQS.map((faq, idx) => `
        <div class="faq-item" style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-md); margin-bottom:1rem; overflow:hidden;">
          <button class="faq-question-btn" onclick="app.toggleFaq(${idx})" style="width:100%; text-align:left; padding:1.25rem 1.5rem; display:flex; justify-content:space-between; align-items:center; font-weight:700; color:var(--brand-dark); font-size:1.05rem;">
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

  // --- CATALOG VIEW & FILTERING ---
  renderCatalog(catFilter = 'all', searchQuery = '') {
    const container = document.getElementById('catalogCoursesGrid');
    if (!container) return;

    let list = COURSES;
    if (catFilter !== 'all') {
      list = list.filter(c => c.category === catFilter);
    }

    if (searchQuery) {
      list = list.filter(c => 
        c.title.toLowerCase().includes(searchQuery) ||
        c.shortDesc.toLowerCase().includes(searchQuery) ||
        c.categoryLabel.toLowerCase().includes(searchQuery)
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
         <span class="course-original-price">Rs. ${course.price.toLocaleString()}</span>`;

    // Visual placeholder gradient if image fails or before loading
    const cardSvgThumb = this.getCourseGraphicSVG(course.category);

    return `
      <div class="course-card" data-course-id="${course.id}">
        <div class="course-card-thumb-wrapper" onclick="app.openCourseDetail('${course.id}')" style="cursor: pointer;">
          ${cardSvgThumb}
          <div class="course-badge-top">${badgeText}</div>
          <div class="course-drive-notice">
            <i class="fa-brands fa-google-drive" style="color: #4285F4;"></i>
            <span>Google Drive Verified Access</span>
          </div>
        </div>

        <div class="course-card-body">
          <div class="course-meta-top">
            <span style="font-weight: 700; color: var(--primary-red);"><i class="fa-solid fa-tag"></i> ${course.categoryLabel}</span>
            <span><i class="fa-solid fa-star" style="color: #F59E0B;"></i> ${course.rating} (${course.reviewsCount})</span>
          </div>

          <h3 class="course-card-title" onclick="app.openCourseDetail('${course.id}')">${course.title}</h3>
          <p class="course-card-desc">${course.shortDesc}</p>

          <div class="course-details-pills">
            <span><i class="fa-solid fa-clock"></i> ${course.duration}</span>
            <span><i class="fa-solid fa-video"></i> ${course.lecturesCount} Lectures</span>
            <span><i class="fa-solid fa-chart-simple"></i> ${course.level}</span>
          </div>

          <div class="course-instructor-info">
            <div class="instructor-avatar-sm">${course.instructor.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div>
              <div class="instructor-name-sm">${course.instructor.name}</div>
              <div style="font-size: 0.75rem; color: var(--gray-500);">${course.instructor.title.split('&')[0]}</div>
            </div>
          </div>

          <div class="course-card-footer">
            <div class="course-price-box">
              ${priceDisplay}
            </div>
            <button class="btn btn-primary btn-sm" onclick="app.openCourseDetail('${course.id}')">
              <i class="fa-solid fa-arrow-right"></i> View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getCourseGraphicSVG(category) {
    const gradients = {
      python: ['#1E252B', '#0D1117', '#306998', 'fa-brands fa-python', '#FFD43B'],
      datascience: ['#0F172A', '#1E293B', '#10B981', 'fa-solid fa-chart-line', '#34D399'],
      webdev: ['#181B1F', '#20262E', '#D32027', 'fa-brands fa-react', '#61DAFB'],
      ai: ['#111827', '#1F2937', '#8B5CF6', 'fa-solid fa-brain', '#C084FC'],
      graphic: ['#1E1E24', '#2A2035', '#EC4899', 'fa-solid fa-palette', '#F472B6']
    };
    const [c1, c2, c3, icon, iconColor] = gradients[category] || gradients['python'];

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
    // Catalog category pills
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

  // --- STEP 2: COURSE DETAIL & LECTURE PREVIEW PAGE ---
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
    document.getElementById('courseDetailRating').innerText = `${course.rating} (${course.reviewsCount} verified reviews)`;
    document.getElementById('courseDetailDesc').innerText = course.longDesc || course.shortDesc;

    // Fill Price Card
    const priceBox = document.getElementById('courseDetailPriceBox');
    if (priceBox) {
      if (course.isFree) {
        priceBox.innerHTML = `<span style="font-size:2rem; font-weight:800; color:var(--success);">FREE</span>`;
      } else {
        priceBox.innerHTML = `
          <div style="font-size:2rem; font-weight:800; color:var(--brand-dark);">Rs. ${course.discountPrice.toLocaleString()}</div>
          <div style="font-size:1rem; color:var(--gray-400); text-decoration:line-through;">Rs. ${course.price.toLocaleString()} (30% OFF)</div>
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
        enrollCtaBtn.innerHTML = `<i class="fa-solid fa-shield-check"></i> Enroll Now & Get Drive Access`;
        enrollCtaBtn.className = "btn btn-primary btn-lg";
        enrollCtaBtn.onclick = () => this.handleLockedLectureClick(course.id, null);
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
    document.getElementById('courseInstructorName').innerText = course.instructor.name;
    document.getElementById('courseInstructorTitle').innerText = course.instructor.title;
    document.getElementById('courseInstructorBio').innerText = course.instructor.bio;

    // Reset preview player to first available preview lesson
    const firstPreview = course.modules[0]?.lessons.find(l => l.isPreview);
    if (firstPreview && firstPreview.previewVideoUrl) {
      this.playVideoPreview(firstPreview.title, firstPreview.previewVideoUrl);
    }
  }

  renderCurriculum(course) {
    const container = document.getElementById('curriculumAccordion');
    if (!container) return;

    container.innerHTML = course.modules.map((mod, modIdx) => `
      <div class="curriculum-module" style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-md); margin-bottom:1rem; overflow:hidden;">
        <div style="background:var(--gray-50); padding:1rem 1.25rem; font-weight:700; color:var(--brand-dark); display:flex; justify-content:space-between; align-items:center;">
          <span>${mod.title}</span>
          <span style="font-size:0.8rem; color:var(--gray-500); font-weight:600;">${mod.lessons.length} Lectures</span>
        </div>
        <div class="module-lessons-list">
          ${mod.lessons.map(les => {
            if (les.isPreview) {
              return `
                <div class="lesson-item preview-available" onclick="app.playVideoPreview('${les.title}', '${les.previewVideoUrl}')" style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.25rem; border-top:1px solid var(--gray-100); cursor:pointer; background:#FFFFFF; transition:background 0.15s;">
                  <div style="display:flex; align-items:center; gap:0.75rem;">
                    <i class="fa-solid fa-play-circle" style="color:var(--primary-red); font-size:1.15rem;"></i>
                    <span style="font-weight:600; font-size:0.9rem; color:var(--brand-dark);">${les.title}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span class="status-badge" style="background:var(--primary-red-light); color:var(--primary-red); border:1px solid var(--primary-red-border); font-size:0.7rem;">Free Preview</span>
                    <span style="font-size:0.8rem; color:var(--gray-500);"><i class="fa-solid fa-clock"></i> ${les.duration}</span>
                  </div>
                </div>
              `;
            } else {
              // Locked Paid Lecture - STEP 2 & STEP 3 Trigger
              return `
                <div class="lesson-item locked-item" onclick="app.handleLockedLectureClick('${course.id}', '${les.id}')" style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.25rem; border-top:1px solid var(--gray-100); cursor:pointer; background:var(--gray-50); transition:background 0.15s;">
                  <div style="display:flex; align-items:center; gap:0.75rem;">
                    <i class="fa-solid fa-lock" style="color:var(--primary-red); font-size:1rem;"></i>
                    <span style="font-weight:600; font-size:0.9rem; color:var(--gray-700);">${les.title}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span style="font-size:0.75rem; color:var(--gray-500);"><i class="fa-brands fa-google-drive"></i> Drive Locked</span>
                    <span style="font-size:0.8rem; color:var(--gray-500);"><i class="fa-solid fa-clock"></i> ${les.duration}</span>
                  </div>
                </div>
              `;
            }
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  playVideoPreview(title, url) {
    const player = document.getElementById('previewVideoPlayer');
    const titleEl = document.getElementById('previewVideoTitle');
    if (player && url) {
      player.src = url;
    }
    if (titleEl) {
      titleEl.innerText = `Now Playing (Authorized Preview): ${title}`;
    }
  }

  // --- STEP 3: WHEN A STUDENT CLICKS A LOCKED VIDEO ---
  handleLockedLectureClick(courseId, lessonId) {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    this.selectedLockedCourse = course;
    const currentUser = store.getCurrentUser();

    // Check if student already has verified access (Requirement: Do not charge again)
    const hasAccess = store.hasApprovedAccess(currentUser.email, course.id);
    if (hasAccess) {
      this.launchDriveViewer(course.id);
      return;
    }

    // Check if application is pending verification
    const pendingApp = store.getPendingApplication(currentUser.email, course.id);
    if (pendingApp && pendingApp.paymentStatus === 'Under Verification') {
      this.showToast(`Your payment verification for ${course.title} is currently under review by admin.`, 'info');
      window.location.hash = `checkout/${pendingApp.id}`;
      return;
    }

    // Open Step 3 Dedicated Modal with Exact Master Prompt Text
    const modal = document.getElementById('lockedVideoModal');
    document.getElementById('lockedCourseNameSummary').innerText = course.title;
    document.getElementById('lockedCourseFeeSummary').innerText = `Rs. ${course.discountPrice.toLocaleString()} (PKR)`;
    
    if (modal) modal.classList.add('active');
  }

  // --- STEP 4: COURSE ACCESS APPLICATION FORM (14 Fields) ---
  openEnrollmentForm(courseId = null) {
    const c = courseId ? COURSES.find(crs => crs.id === courseId) : this.selectedLockedCourse || this.activeCourse || COURSES[0];
    if (!c) return;

    this.selectedLockedCourse = c;
    this.closeModal('lockedVideoModal');

    // Auto-populate read-only fields
    document.getElementById('formCourseId').value = c.id;
    document.getElementById('formCourseTitle').value = c.title;
    document.getElementById('formCourseFee').value = `Rs. ${c.discountPrice.toLocaleString()} PKR`;
    document.getElementById('formDriveFolderId').value = c.driveFolderId;

    // Prefill student details if logged in
    const user = store.getCurrentUser();
    if (user.email && user.name) {
      const nameInput = document.getElementById('formStudentName');
      const emailInput = document.getElementById('formStudentEmail');
      const phoneInput = document.getElementById('formStudentPhone');
      if (nameInput && !nameInput.value) nameInput.value = user.name;
      if (emailInput && !emailInput.value) emailInput.value = user.email;
      if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
    }

    const modal = document.getElementById('enrollmentFormModal');
    if (modal) modal.classList.add('active');
  }

  setupCourseForm() {
    const form = document.getElementById('courseAccessForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve all 14 form fields
      const courseId = document.getElementById('formCourseId').value;
      const courseTitle = document.getElementById('formCourseTitle').value;
      const rawFee = document.getElementById('formCourseFee').value.replace(/[^0-9]/g, '');
      const courseFee = Number(rawFee);
      const driveFolderId = document.getElementById('formDriveFolderId').value;

      const studentName = document.getElementById('formStudentName').value.trim();
      const studentEmail = document.getElementById('formStudentEmail').value.trim();
      const studentPhone = document.getElementById('formStudentPhone').value.trim();
      const country = document.getElementById('formCountry').value.trim();
      const city = document.getElementById('formCity').value.trim();
      const skillLevel = document.getElementById('formSkillLevel').value;
      const reason = document.getElementById('formReason').value.trim();
      const preferredMethod = document.getElementById('formPreferredMethod').value;
      const paymentMethod = document.getElementById('formPaymentMethod').value;
      const transactionId = document.getElementById('formTransactionId').value.trim();
      const termsAccepted = document.getElementById('formTermsConsent').checked;
      const updatesConsent = document.getElementById('formUpdatesConsent').checked;

      // Validation
      if (!studentName || !studentEmail || !studentPhone || !country) {
        alert("Please complete all required fields (Name, Email, WhatsApp, Country).");
        return;
      }

      if (!termsAccepted) {
        alert("Please accept the academy's terms and refund policy to proceed.");
        return;
      }

      try {
        const newApp = store.createApplication({
          courseId,
          courseTitle,
          courseFee,
          driveFolderId,
          studentName,
          studentEmail,
          studentPhone,
          country,
          city,
          skillLevel,
          reason,
          preferredMethod,
          paymentMethod,
          transactionId,
          receiptUrl: this.currentReceiptDataUrl
        });

        this.closeModal('enrollmentFormModal');
        this.currentReceiptDataUrl = '';
        form.reset();

        this.showToast(`Application ${newApp.id} created successfully!`, 'success');

        // Redirect to Step 5: Payment Instructions and Checkout
        window.location.hash = `checkout/${newApp.id}`;
      } catch (err) {
        alert(err.message);
      }
    });
  }

  setupReceiptUpload() {
    const input = document.getElementById('formReceiptInput');
    const preview = document.getElementById('formReceiptPreview');
    if (!input) return;

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, WebP).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        this.currentReceiptDataUrl = event.target.result;
        if (preview) {
          preview.src = event.target.result;
          preview.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // --- STEP 5: PAYMENT INSTRUCTIONS & CHECKOUT ---
  openCheckoutView(appId) {
    const application = store.getApplicationById(appId);
    if (!application) {
      this.showToast('Application not found', 'danger');
      this.showView('courses');
      return;
    }

    this.showView('checkout');
    if (window.location.hash !== `#checkout/${appId}`) {
      window.location.hash = `checkout/${appId}`;
    }

    // Populate checkout fields
    document.getElementById('checkoutAppId').innerText = application.id;
    document.getElementById('checkoutCourseTitle').innerText = application.courseTitle;
    document.getElementById('checkoutFee').innerText = `Rs. ${application.courseFee.toLocaleString()} PKR`;
    document.getElementById('checkoutStudentEmail').innerText = application.studentEmail;
    document.getElementById('checkoutStudentName').innerText = application.studentName;

    // Render Status Stepper based on paymentStatus
    const statusText = document.getElementById('checkoutCurrentStatusText');
    const stepperNodes = document.querySelectorAll('.checkout-step-node');

    stepperNodes.forEach(n => {
      n.classList.remove('completed', 'active');
    });

    if (application.paymentStatus === 'Awaiting Payment') {
      stepperNodes[0].classList.add('completed');
      stepperNodes[1].classList.add('active');
      statusText.innerHTML = `<span class="status-badge pending">Awaiting Payment</span>`;
    } else if (application.paymentStatus === 'Under Verification') {
      stepperNodes[0].classList.add('completed');
      stepperNodes[1].classList.add('completed');
      stepperNodes[2].classList.add('active');
      statusText.innerHTML = `<span class="status-badge pending">Payment Under Verification</span>`;
    } else if (application.paymentStatus === 'Payment Confirmed' && application.driveAccessStatus === 'Granted') {
      stepperNodes[0].classList.add('completed');
      stepperNodes[1].classList.add('completed');
      stepperNodes[2].classList.add('completed');
      stepperNodes[3].classList.add('completed', 'active');
      statusText.innerHTML = `<span class="status-badge approved">Google Drive Access Granted!</span>`;
    } else if (application.paymentStatus === 'Payment Rejected') {
      statusText.innerHTML = `<span class="status-badge rejected">Payment Rejected</span>`;
    }

    // Set active payment tab matching application choice
    this.switchPaymentTab(application.paymentMethod || 'jazzcash');

    // Setup transaction update form inside checkout
    const txForm = document.getElementById('checkoutSubmitTxForm');
    if (txForm) {
      document.getElementById('checkoutInputTrxId').value = application.transactionId || '';
      txForm.onsubmit = (e) => {
        e.preventDefault();
        const tid = document.getElementById('checkoutInputTrxId').value.trim();
        if (!tid) {
          alert('Please enter your Transaction Reference ID.');
          return;
        }
        store.updatePaymentSubmission(application.id, {
          transactionId: tid,
          receiptUrl: this.currentReceiptDataUrl || application.receiptUrl
        });
        this.showToast('Payment details updated and sent for Admin verification!', 'success');
        this.openCheckoutView(application.id);
      };
    }
  }

  switchPaymentTab(tabKey) {
    document.querySelectorAll('.pay-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === tabKey);
    });

    document.querySelectorAll('.payment-tab-content').forEach(pane => {
      pane.style.display = pane.id === `payTab_${tabKey}` ? 'block' : 'none';
    });
  }

  copyToClipboard(text, message = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(message, 'info');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast(message, 'info');
    });
  }

  // --- STEP 8: STUDENT DASHBOARD ("MY LEARNING") ---
  renderStudentDashboard() {
    const user = store.getCurrentUser();
    const studentApps = store.getStudentApplications(user.email);
    const container = document.getElementById('myCoursesListContainer');
    if (!container) return;

    document.getElementById('dashStudentName').innerText = user.name;
    document.getElementById('dashStudentEmail').innerText = user.email;

    if (studentApps.length === 0) {
      container.innerHTML = `
        <div style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:var(--radius-xl); padding:3.5rem; text-align:center;">
          <i class="fa-solid fa-graduation-cap" style="font-size:3rem; color:var(--gray-300); margin-bottom:1rem;"></i>
          <h3 style="font-size:1.35rem; color:var(--brand-dark); margin-bottom:0.5rem;">You haven't enrolled in any courses yet</h3>
          <p style="color:var(--gray-500); max-width:450px; margin:0 auto 1.5rem;">Explore our industry-driven courses in Python, Data Science, Web Development, and AI with verified Google Drive lecture access.</p>
          <a href="#courses" class="btn btn-primary" onclick="app.showView('courses')">Browse Course Catalog</a>
        </div>
      `;
      return;
    }

    container.innerHTML = studentApps.map(appItem => {
      const isApproved = appItem.enrollmentStatus === 'Enrollment Approved' && appItem.driveAccessStatus === 'Granted';
      const isPending = appItem.paymentStatus === 'Under Verification' || appItem.paymentStatus === 'Awaiting Payment';

      let statusBadge = `<span class="status-badge pending"><i class="fa-solid fa-hourglass-half"></i> Under Verification</span>`;
      let actionArea = `
        <div class="drive-access-cta-box">
          <span style="font-size:0.8rem; color:var(--gray-500);">Awaiting Admin Payment Verification</span>
          <button class="btn btn-outline btn-sm" onclick="app.openCheckoutView('${appItem.id}')">
            <i class="fa-solid fa-receipt"></i> View Order / Submit Proof
          </button>
        </div>
      `;

      if (isApproved) {
        statusBadge = `<span class="status-badge granted"><i class="fa-solid fa-check-circle"></i> Access Active</span>`;
        actionArea = `
          <div class="drive-access-cta-box">
            <button class="btn btn-open-drive" onclick="app.launchDriveViewer('${appItem.courseId}')">
              <i class="fa-brands fa-google-drive"></i> Open Course Lectures on Google Drive
            </button>
            <div style="font-size:0.75rem; color:var(--gray-500);">
              <i class="fa-solid fa-shield-check" style="color:var(--success);"></i> Shared with ${appItem.studentEmail}
            </div>
          </div>
        `;
      } else if (appItem.paymentStatus === 'Payment Rejected') {
        statusBadge = `<span class="status-badge rejected"><i class="fa-solid fa-triangle-exclamation"></i> Verification Rejected</span>`;
        actionArea = `
          <div class="drive-access-cta-box">
            <button class="btn btn-outline btn-sm" onclick="app.openCheckoutView('${appItem.id}')">
              <i class="fa-solid fa-rotate-right"></i> Update Payment Details
            </button>
          </div>
        `;
      }

      return `
        <div class="my-course-card">
          <div class="my-course-info">
            <div class="my-course-icon">
              <i class="fa-solid fa-code"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.35rem;">
                <h4 style="font-size:1.2rem; font-weight:700; color:var(--brand-dark); margin:0;">${appItem.courseTitle}</h4>
                ${statusBadge}
              </div>
              <div style="font-size:0.85rem; color:var(--gray-500); display:flex; gap:1.25rem; flex-wrap:wrap;">
                <span><strong>Application:</strong> ${appItem.id}</span>
                <span><strong>Enrolled on:</strong> ${new Date(appItem.createdAt).toLocaleDateString()}</span>
                <span><strong>Google Drive ID:</strong> <code style="font-size:0.75rem; background:var(--gray-100); padding:2px 4px; border-radius:3px;">${appItem.driveFolderId || 'Default'}</code></span>
              </div>
            </div>
          </div>
          ${actionArea}
        </div>
      `;
    }).join('');
  }

  // --- GOOGLE DRIVE VIEWER SIMULATOR MODAL ---
  launchDriveViewer(courseId) {
    const course = COURSES.find(c => c.id === courseId) || this.activeCourse;
    if (!course) return;

    const modal = document.getElementById('driveViewerModal');
    document.getElementById('driveModalCourseTitle').innerText = course.title;
    document.getElementById('driveModalFolderId').innerText = course.driveFolderId;

    // Render list of drive files & lectures inside modal
    const filesContainer = document.getElementById('driveModalFilesList');
    if (filesContainer) {
      let fileItems = [];
      course.modules.forEach(m => {
        m.lessons.forEach((les, idx) => {
          fileItems.push(`
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-bottom:1px solid var(--gray-200); background:#FFFFFF; transition:background 0.15s;">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <i class="fa-solid fa-file-video" style="color:#EA4335; font-size:1.2rem;"></i>
                <div>
                  <div style="font-weight:600; font-size:0.9rem; color:var(--brand-dark);">${m.title.split(':')[0]} - ${les.title} [1080p HD].mp4</div>
                  <div style="font-size:0.75rem; color:var(--gray-400);">${les.duration} | 350 MB | Google Drive Video Stream</div>
                </div>
              </div>
              <button class="btn btn-outline btn-sm" onclick="alert('Streaming authenticated lecture: ${les.title}\\nGoogle Drive Viewer Permission Verified.')">
                <i class="fa-solid fa-play"></i> Watch Stream
              </button>
            </div>
          `);
        });
      });

      // Add source code and notes zip
      fileItems.push(`
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; background:#F8FAFC;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <i class="fa-solid fa-file-zipper" style="color:#FBBC05; font-size:1.2rem;"></i>
            <div>
              <div style="font-weight:700; font-size:0.9rem; color:var(--brand-dark);">Course_Complete_Source_Code_&_Jupyter_Notebooks.zip</div>
              <div style="font-size:0.75rem; color:var(--gray-400);">Official GitHub Repository Mirror | 45 MB</div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="alert('Downloading verified course resources archive...')">
            <i class="fa-solid fa-download"></i> Download Zip
          </button>
        </div>
      `);

      filesContainer.innerHTML = fileItems.join('');
    }

    if (modal) modal.classList.add('active');
  }

  // --- NOTIFICATIONS SYSTEM (Step 9) ---
  setupNotifications() {
    this.updateNotifBadge();

    const notifBtn = document.getElementById('notifDropdownBtn');
    const notifDropdown = document.getElementById('notifDropdownMenu');

    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifDropdown.style.display === 'block';
        notifDropdown.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) this.renderNotificationsList();
      });

      document.addEventListener('click', () => {
        if (notifDropdown) notifDropdown.style.display = 'none';
      });
    }
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
      <div style="padding:0.85rem 1rem; border-bottom:1px solid var(--gray-100); background:${n.read ? '#FFFFFF' : '#FEF2F2'}; cursor:pointer;" onclick="app.viewEmailSimulation('${n.id}')">
        <div style="font-weight:700; font-size:0.85rem; color:var(--brand-dark); margin-bottom:0.2rem;">
          ${n.title}
        </div>
        <div style="font-size:0.775rem; color:var(--gray-600); line-height:1.4;">${n.message}</div>
        <div style="font-size:0.7rem; color:var(--gray-400); margin-top:0.35rem; display:flex; justify-content:space-between;">
          <span>${new Date(n.createdAt).toLocaleTimeString()}</span>
          <span style="color:var(--primary-red); font-weight:600;"><i class="fa-solid fa-envelope-open"></i> View Simulated Email</span>
        </div>
      </div>
    `).join('');

    store.markAllNotificationsRead(user.email);
    this.updateNotifBadge();
  }

  viewEmailSimulation(notifId) {
    const all = store.getNotifications();
    const notif = all.find(n => n.id === notifId);
    if (!notif) return;

    const modal = document.getElementById('emailPreviewModal');
    document.getElementById('simEmailSubject').innerText = notif.title;
    document.getElementById('simEmailTo').innerText = notif.recipientEmail === 'all' ? 'All Enrolled Students' : notif.recipientEmail;
    document.getElementById('simEmailBody').innerHTML = `
      <p style="font-size:1rem; color:var(--gray-800); margin-bottom:1rem;">Dear Student,</p>
      <div style="background:#F8FAFC; border-left:4px solid var(--primary-red); padding:1rem 1.25rem; margin-bottom:1.5rem; font-size:0.95rem; line-height:1.7; color:var(--gray-800);">
        ${notif.message}
      </div>
      <p style="font-size:0.875rem; color:var(--gray-600); margin-bottom:0.5rem;">For assistance or lecture link queries, please contact:</p>
      <p style="font-size:0.85rem; color:var(--gray-700);"><strong>iSOFT Admissions & Google Drive Delivery Team</strong><br>Email: admissions@isoft.edu.pk | WhatsApp: +92 300 1234567</p>
    `;

    if (modal) modal.classList.add('active');
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
            Authenticated by iSOFT IT Training & Consultancy Academic Council
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
}

// Global app singleton
const app = new Application();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
