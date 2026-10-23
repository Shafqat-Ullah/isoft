/**
 * iSOFT IT Training & Consultancy
 * Administrator Management Panel Controller
 * Handles Section 3, Section 6, and Section 7 specifications
 */

class AdminController {
  constructor() {
    this.currentTab = 'applications';
    this.statusFilter = 'all';
    this.searchQuery = '';
    this.selectedAppId = null;
  }

  init() {
    this.renderKPIs();
    this.renderApplicationsTable();
    this.renderDriveManagement();
    this.renderCourseManagement();
    this.renderAuditLogs();
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Admin tab switching
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Application filter buttons
    document.querySelectorAll('.app-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.app-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.statusFilter = e.currentTarget.dataset.status;
        this.renderApplicationsTable();
      });
    });

    // Application search
    const searchInput = document.getElementById('adminAppSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderApplicationsTable();
      });
    }

    // React to store updates
    window.addEventListener('isoft:data-updated', () => {
      this.renderKPIs();
      this.renderApplicationsTable();
      this.renderDriveManagement();
      this.renderAuditLogs();
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.admin-tab-pane').forEach(pane => {
      pane.style.display = pane.id === `adminPane_${tabName}` ? 'block' : 'none';
    });

    if (tabName === 'drive') this.renderDriveManagement();
    if (tabName === 'courses') this.renderCourseManagement();
    if (tabName === 'reports') this.renderReports();
    if (tabName === 'audit') this.renderAuditLogs();
  }

  renderKPIs() {
    const apps = store.getApplications();
    const driveShares = store.getDriveShares();

    const totalRevenue = apps
      .filter(a => a.paymentStatus === 'Payment Confirmed')
      .reduce((acc, curr) => acc + (curr.courseFee || 0), 0);

    const pendingCount = apps.filter(a => a.paymentStatus === 'Under Verification' || a.paymentStatus === 'Awaiting Payment').length;
    const confirmedCount = apps.filter(a => a.paymentStatus === 'Payment Confirmed').length;
    const driveAccessCount = driveShares.filter(s => s.status === 'SUCCESS').length;

    const revEl = document.getElementById('kpiRevenue');
    const pendEl = document.getElementById('kpiPending');
    const confEl = document.getElementById('kpiConfirmed');
    const driveEl = document.getElementById('kpiDriveAccess');

    if (revEl) revEl.innerText = `Rs. ${totalRevenue.toLocaleString()}`;
    if (pendEl) pendEl.innerText = pendingCount;
    if (confEl) confEl.innerText = confirmedCount;
    if (driveEl) driveEl.innerText = driveAccessCount;
  }

  renderApplicationsTable() {
    const tbody = document.getElementById('adminAppsTableBody');
    if (!tbody) return;

    let apps = store.getApplications();

    // Filter by status
    if (this.statusFilter !== 'all') {
      if (this.statusFilter === 'pending') {
        apps = apps.filter(a => a.paymentStatus === 'Under Verification' || a.paymentStatus === 'Awaiting Payment');
      } else if (this.statusFilter === 'confirmed') {
        apps = apps.filter(a => a.paymentStatus === 'Payment Confirmed');
      } else if (this.statusFilter === 'rejected') {
        apps = apps.filter(a => a.paymentStatus === 'Payment Rejected');
      }
    }

    // Search query
    if (this.searchQuery) {
      apps = apps.filter(a => 
        a.id.toLowerCase().includes(this.searchQuery) ||
        a.studentName.toLowerCase().includes(this.searchQuery) ||
        a.studentEmail.toLowerCase().includes(this.searchQuery) ||
        a.courseTitle.toLowerCase().includes(this.searchQuery) ||
        (a.transactionId && a.transactionId.toLowerCase().includes(this.searchQuery))
      );
    }

    if (apps.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--gray-500);">
            <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; opacity: 0.4;"></i>
            No applications match your search or filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = apps.map(app => {
      let statusBadgeClass = 'pending';
      if (app.paymentStatus === 'Payment Confirmed') statusBadgeClass = 'confirmed';
      if (app.paymentStatus === 'Payment Rejected') statusBadgeClass = 'rejected';

      const driveBadge = app.driveAccessStatus === 'Granted'
        ? `<span class="status-badge granted"><i class="fa-brands fa-google-drive"></i> Access Active</span>`
        : app.driveAccessStatus === 'Revoked'
        ? `<span class="status-badge rejected"><i class="fa-solid fa-ban"></i> Revoked</span>`
        : `<span class="status-badge pending"><i class="fa-solid fa-hourglass-half"></i> Pending</span>`;

      return `
        <tr>
          <td>
            <strong>${app.id}</strong>
            <div style="font-size: 0.75rem; color: var(--gray-500);">${new Date(app.createdAt).toLocaleDateString()}</div>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--brand-dark);">${app.studentName}</div>
            <div style="font-size: 0.8rem; color: var(--gray-500);">${app.studentEmail}</div>
            <div style="font-size: 0.75rem; color: var(--gray-400);">${app.studentPhone}</div>
          </td>
          <td>
            <div style="font-weight: 600; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${app.courseTitle}</div>
            <span style="font-weight: 700; color: var(--primary-red); font-size: 0.85rem;">Rs. ${Number(app.courseFee).toLocaleString()}</span>
          </td>
          <td>
            <div style="font-weight: 700; text-transform: uppercase; font-size: 0.8rem;">${app.paymentMethod}</div>
            <div style="font-family: monospace; font-size: 0.75rem; color: var(--gray-600);">${app.transactionId || '<span style="color:var(--gray-400)">None</span>'}</div>
            <span class="status-badge ${statusBadgeClass}">${app.paymentStatus}</span>
          </td>
          <td>
            ${driveBadge}
          </td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="admin.openReviewModal('${app.id}')">
              <i class="fa-solid fa-eye"></i> Review
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  openReviewModal(appId) {
    const app = store.getApplicationById(appId);
    if (!app) return;

    this.selectedAppId = appId;
    const modal = document.getElementById('adminReviewModal');
    const content = document.getElementById('adminReviewModalContent');
    if (!modal || !content) return;

    const receiptMarkup = app.receiptUrl ? `
      <div style="margin-top: 1rem;">
        <label class="form-label">Payment Receipt Uploaded:</label>
        <div style="border: 1px solid var(--gray-300); border-radius: var(--radius-md); padding: 0.5rem; text-align: center; background: var(--gray-50);">
          <img src="${app.receiptUrl}" alt="Payment Receipt" style="max-height: 220px; margin: 0 auto; border-radius: var(--radius-sm);" />
          <div style="margin-top: 0.5rem;">
            <a href="${app.receiptUrl}" target="_blank" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-up-right-from-square"></i> Open Full Image
            </a>
          </div>
        </div>
      </div>
    ` : `
      <div style="background: var(--gray-100); padding: 1rem; border-radius: var(--radius-md); color: var(--gray-600); font-size: 0.85rem; margin-top: 1rem;">
        <i class="fa-solid fa-circle-info"></i> No screenshot uploaded yet. Student provided transaction reference ID: <strong>${app.transactionId || 'Not provided'}</strong>
      </div>
    `;

    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        <div>
          <h4 style="font-size: 1rem; color: var(--brand-dark); margin-bottom: 0.75rem; border-bottom: 2px solid var(--primary-red); padding-bottom: 0.35rem;">Student Details</h4>
          <p><strong>Name:</strong> ${app.studentName}</p>
          <p><strong>Email (Google Drive target):</strong> <span style="color: #1A73E8; font-weight: 700;">${app.studentEmail}</span></p>
          <p><strong>WhatsApp:</strong> ${app.studentPhone}</p>
          <p><strong>Location:</strong> ${app.city}, ${app.country}</p>
          <p><strong>Skill Level:</strong> ${app.skillLevel}</p>
          <p><strong>Reason:</strong> ${app.reason}</p>
        </div>
        <div>
          <h4 style="font-size: 1rem; color: var(--brand-dark); margin-bottom: 0.75rem; border-bottom: 2px solid var(--primary-red); padding-bottom: 0.35rem;">Order & Payment Details</h4>
          <p><strong>Application ID:</strong> ${app.id}</p>
          <p><strong>Course:</strong> ${app.courseTitle}</p>
          <p><strong>Payable Fee:</strong> <span style="font-weight: 800; color: var(--primary-red);">Rs. ${Number(app.courseFee).toLocaleString()}</span></p>
          <p><strong>Payment Method:</strong> ${app.paymentMethod.toUpperCase()}</p>
          <p><strong>Transaction Ref / TID:</strong> <span style="font-family: monospace; background: var(--gray-100); padding: 2px 6px; border-radius: 4px;">${app.transactionId || 'N/A'}</span></p>
          <p><strong>Current Status:</strong> <span class="status-badge ${app.paymentStatus === 'Payment Confirmed' ? 'approved' : 'pending'}">${app.paymentStatus}</span></p>
        </div>
      </div>

      ${receiptMarkup}

      <div style="margin-top: 1.5rem;">
        <label class="form-label" for="adminInternalNotes">Internal Admin Notes:</label>
        <textarea id="adminInternalNotes" class="form-control" rows="2" placeholder="Record verification details, bank statement confirmation, or reason for action...">${app.adminNotes || ''}</textarea>
      </div>

      <div style="margin-top: 1.5rem; padding: 1rem; background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: var(--radius-md);">
        <h5 style="color: #0369A1; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">
          <i class="fa-brands fa-google-drive"></i> Automated Google Drive Delivery (Option A)
        </h5>
        <p style="font-size: 0.8rem; color: #0284C7; margin: 0;">
          Upon clicking <strong>"Confirm & Grant Google Drive Access"</strong>, the official course folder (<code>${app.driveFolderId || 'Default Course Repo'}</code>) will be shared directly with <strong>${app.studentEmail}</strong> as Viewer, and the student's dashboard button will immediately become active.
        </p>
      </div>
    `;

    modal.classList.add('active');
  }

  confirmAndGrantAccess() {
    if (!this.selectedAppId) return;
    const notesInput = document.getElementById('adminInternalNotes');
    const notes = notesInput ? notesInput.value.trim() : "Approved by Administrator";

    try {
      const result = store.approveApplication(this.selectedAppId, notes);
      this.closeModal('adminReviewModal');
      this.renderApplicationsTable();
      this.renderKPIs();
      app.showToast(`✅ Payment Verified & Google Drive Access Granted to ${result.app.studentEmail}!`, 'success');
    } catch (err) {
      alert("Error approving application: " + err.message);
    }
  }

  rejectApplicationPrompt() {
    if (!this.selectedAppId) return;
    const reason = prompt("Enter specific reason for rejecting this payment submission (e.g. Invalid Transaction ID, Unreadable screenshot, Amount mismatch):", "Invalid Transaction ID or unverified receipt");
    if (reason === null) return;

    try {
      const appRecord = store.rejectApplication(this.selectedAppId, reason);
      this.closeModal('adminReviewModal');
      this.renderApplicationsTable();
      this.renderKPIs();
      app.showToast(`Application ${appRecord.id} marked as Rejected. Student notified.`, 'danger');
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  // --- Google Drive Management Tab (Step 7) ---
  renderDriveManagement() {
    const sharesBody = document.getElementById('adminDriveSharesBody');
    if (!sharesBody) return;

    const shares = store.getDriveShares();

    if (shares.length === 0) {
      sharesBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: var(--gray-500);">No active Google Drive shares recorded yet.</td></tr>`;
      return;
    }

    sharesBody.innerHTML = shares.map(s => `
      <tr>
        <td><strong>${s.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #1A73E8;"><i class="fa-solid fa-envelope"></i> ${s.studentEmail}</div>
          <div style="font-size: 0.75rem; color: var(--gray-500);">Ref: ${s.applicationId}</div>
        </td>
        <td>
          <div style="font-weight: 600;">${s.courseTitle}</div>
          <code style="font-size: 0.75rem; background: var(--gray-100); padding: 2px 6px; border-radius: 4px;">${s.folderId}</code>
        </td>
        <td><span class="status-badge ${s.status === 'SUCCESS' ? 'granted' : 'rejected'}">${s.status}</span></td>
        <td><span style="font-size: 0.8rem; color: var(--gray-600);">${new Date(s.grantedAt).toLocaleString()}</span></td>
        <td>
          ${s.status === 'SUCCESS' ? `
            <button class="btn btn-outline btn-sm" style="color: var(--primary-red); border-color: var(--primary-red-border);" onclick="admin.revokeDriveAccess('${s.id}')">
              <i class="fa-solid fa-ban"></i> Revoke Access
            </button>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="admin.retryDriveShare('${s.id}')">
              <i class="fa-solid fa-rotate-right"></i> Retry Share
            </button>
          `}
        </td>
      </tr>
    `).join('');
  }

  revokeDriveAccess(shareId) {
    if (!confirm("Are you sure you want to revoke Google Drive lecture access for this student?")) return;
    store.revokeDriveAccess(shareId);
    this.renderDriveManagement();
    this.renderApplicationsTable();
    app.showToast("Google Drive permissions revoked successfully.", "info");
  }

  retryDriveShare(shareId) {
    store.retryDriveShare(shareId);
    this.renderDriveManagement();
    this.renderApplicationsTable();
    app.showToast("Google Drive access retried and restored.", "success");
  }

  // --- Course Management Tab ---
  renderCourseManagement() {
    const tbody = document.getElementById('adminCoursesTableBody');
    if (!tbody) return;

    tbody.innerHTML = COURSES.map(c => `
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--brand-dark);">${c.title}</div>
          <span style="font-size: 0.75rem; color: var(--gray-500);">${c.categoryLabel} | ${c.lecturesCount} Lectures</span>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--primary-red);">Rs. ${c.discountPrice.toLocaleString()}</div>
          <div style="font-size: 0.75rem; text-decoration: line-through; color: var(--gray-400);">Rs. ${c.price.toLocaleString()}</div>
        </td>
        <td>
          <code style="font-size: 0.8rem; color: #1A73E8; background: #F0F9FF; padding: 3px 8px; border-radius: 4px;">
            <i class="fa-brands fa-google-drive"></i> ${c.driveFolderId}
          </code>
        </td>
        <td>
          <span class="status-badge ${c.isFree ? 'pending' : 'approved'}">${c.isFree ? 'Free' : 'Paid Course'}</span>
        </td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="alert('Course editor is active. Google Drive Folder: ${c.driveFolderId}')">
            <i class="fa-solid fa-pen-to-square"></i> Configure
          </button>
        </td>
      </tr>
    `).join('');
  }

  // --- Audit Logs ---
  renderAuditLogs() {
    const tbody = document.getElementById('adminAuditLogsBody');
    if (!tbody) return;

    const logs = store.getAuditLogs();
    tbody.innerHTML = logs.map(l => `
      <tr>
        <td style="font-size: 0.75rem; color: var(--gray-500); white-space: nowrap;">${new Date(l.timestamp).toLocaleString()}</td>
        <td style="font-size: 0.8rem; font-weight: 700; color: var(--brand-dark);">${l.actor}</td>
        <td><code style="font-size: 0.75rem; color: var(--primary-red); font-weight: 700;">${l.action}</code></td>
        <td style="font-size: 0.85rem; color: var(--gray-700);">${l.details}</td>
      </tr>
    `).join('');
  }
}

// Global admin singleton
const admin = new AdminController();
