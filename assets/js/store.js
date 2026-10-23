/**
 * iSOFT IT Training & Consultancy
 * LocalStorage State Management & Real-time Reactive Store
 */

const STORAGE_KEYS = {
  APPLICATIONS: 'isoft_applications_v1',
  DRIVE_SHARES: 'isoft_drive_shares_v1',
  NOTIFICATIONS: 'isoft_notifications_v1',
  CURRENT_USER: 'isoft_current_user_v1',
  AUDIT_LOGS: 'isoft_audit_logs_v1',
  TICKETS: 'isoft_support_tickets_v1',
  COURSES: 'isoft_courses_custom_v1'
};

class AcademyStore {
  constructor() {
    this.init();
  }

  init() {
    // Initialize default seed user (Student by default, easily switched to Admin)
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      const defaultUser = {
        name: "Ali Raza Khan",
        email: "student@example.com",
        phone: "+92 301 5556789",
        role: "student", // 'student' or 'admin'
        avatar: "assets/images/student-avatar.png"
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    }

    // Initialize applications with sample seeds
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      const sampleApplications = [
        {
          id: "ISOFT-APP-2026-101",
          courseId: "course-py-01",
          courseTitle: "Mastering Python: From Zero to Industry Pro",
          courseFee: 12500,
          studentName: "Ali Raza Khan",
          studentEmail: "student@example.com",
          studentPhone: "+92 301 5556789",
          country: "Pakistan",
          city: "Lahore",
          skillLevel: "Beginner",
          reason: "Career Switch to Software Engineering",
          preferredMethod: "Google Drive Video Lectures",
          paymentMethod: "jazzcash",
          transactionId: "TID-992384729102",
          receiptUrl: "assets/images/sample-receipt.svg",
          paymentStatus: "Under Verification",
          enrollmentStatus: "Application Submitted",
          driveAccessStatus: "Pending",
          driveFolderId: "1aBcDeFgHiJkLmNoPq_PYTHON_2026",
          adminNotes: "Received JazzCash confirmation SMS. Verification pending bank statement check.",
          createdAt: "2026-10-22T14:30:00.000Z",
          updatedAt: "2026-10-22T14:35:00.000Z"
        },
        {
          id: "ISOFT-APP-2026-094",
          courseId: "course-web-01",
          courseTitle: "Full Stack Web Development (MERN + Next.js)",
          courseFee: 17999,
          studentName: "Usman Ghani",
          studentEmail: "usman.dev@gmail.com",
          studentPhone: "+92 321 8847291",
          country: "Pakistan",
          city: "Islamabad",
          skillLevel: "Intermediate",
          reason: "Freelance Client Projects",
          preferredMethod: "Google Drive Video Lectures",
          paymentMethod: "bank",
          transactionId: "MEZ-FT-88491029",
          receiptUrl: "assets/images/sample-receipt.svg",
          paymentStatus: "Payment Confirmed",
          enrollmentStatus: "Enrollment Approved",
          driveAccessStatus: "Granted",
          driveFolderId: "3cDeFgHiJkLmNoPqRs_MERN_NEXT_2026",
          adminNotes: "Funds verified in Meezan Corporate Account. Drive viewer access granted.",
          createdAt: "2026-10-21T09:15:00.000Z",
          updatedAt: "2026-10-21T11:20:00.000Z"
        },
        {
          id: "ISOFT-APP-2026-088",
          courseId: "course-ds-01",
          courseTitle: "Applied Data Science & Machine Learning Bootcamp",
          courseFee: 16500,
          studentName: "Zainab Fatima",
          studentEmail: "zainab.f@gmail.com",
          studentPhone: "+92 333 4910293",
          country: "Pakistan",
          city: "Karachi",
          skillLevel: "Intermediate",
          reason: "Academic Master Thesis Preparation",
          preferredMethod: "Google Drive Video Lectures",
          paymentMethod: "easypaisa",
          transactionId: "EP-6639201948",
          receiptUrl: "assets/images/sample-receipt.svg",
          paymentStatus: "Payment Confirmed",
          enrollmentStatus: "Enrollment Approved",
          driveAccessStatus: "Granted",
          driveFolderId: "2bCdEfGhIjKlMnOpQr_DATASCI_2026",
          adminNotes: "Verified via Easypaisa merchant portal.",
          createdAt: "2026-10-20T16:00:00.000Z",
          updatedAt: "2026-10-20T17:30:00.000Z"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(sampleApplications));
    }

    // Initialize Drive shares
    if (!localStorage.getItem(STORAGE_KEYS.DRIVE_SHARES)) {
      const sampleShares = [
        {
          id: "DRIVE-SH-001",
          applicationId: "ISOFT-APP-2026-094",
          studentEmail: "usman.dev@gmail.com",
          courseId: "course-web-01",
          courseTitle: "Full Stack Web Development (MERN + Next.js)",
          folderId: "3cDeFgHiJkLmNoPqRs_MERN_NEXT_2026",
          role: "viewer",
          status: "SUCCESS",
          sharingMethod: "Option A (Individual Google Account Sharing)",
          grantedAt: "2026-10-21T11:20:00.000Z",
          googleAccount: "drive-admin@isoft.edu.pk"
        },
        {
          id: "DRIVE-SH-002",
          applicationId: "ISOFT-APP-2026-088",
          studentEmail: "zainab.f@gmail.com",
          courseId: "course-ds-01",
          courseTitle: "Applied Data Science & Machine Learning Bootcamp",
          folderId: "2bCdEfGhIjKlMnOpQr_DATASCI_2026",
          role: "viewer",
          status: "SUCCESS",
          sharingMethod: "Option A (Individual Google Account Sharing)",
          grantedAt: "2026-10-20T17:30:00.000Z",
          googleAccount: "drive-admin@isoft.edu.pk"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.DRIVE_SHARES, JSON.stringify(sampleShares));
    }

    // Initialize Notifications
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      const sampleNotifications = [
        {
          id: "notif-01",
          recipientEmail: "student@example.com",
          title: "Application Received: Mastering Python",
          message: "Your application ISOFT-APP-2026-101 has been registered. Please complete payment verification to receive Google Drive access.",
          type: "info",
          read: false,
          createdAt: "2026-10-22T14:30:00.000Z"
        },
        {
          id: "notif-02",
          recipientEmail: "all",
          title: "🚀 Admissions Open for 2026 Batch",
          message: "Explore our new Generative AI and Python for Pro bootcamps with verified Google Drive access.",
          type: "success",
          read: false,
          createdAt: "2026-10-20T08:00:00.000Z"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(sampleNotifications));
    }

    // Initialize Audit Logs
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      const sampleLogs = [
        {
          id: "LOG-1",
          actor: "drive-admin@isoft.edu.pk",
          action: "GOOGLE_DRIVE_SHARE_GRANTED",
          details: "Granted viewer permissions to usman.dev@gmail.com for folder 3cDeFgHiJkLmNoPqRs_MERN_NEXT_2026",
          timestamp: "2026-10-21T11:20:00.000Z"
        },
        {
          id: "LOG-2",
          actor: "admissions@isoft.edu.pk",
          action: "PAYMENT_CONFIRMED",
          details: "Verified Meezan Bank reference MEZ-FT-88491029 for Application ISOFT-APP-2026-094",
          timestamp: "2026-10-21T11:18:00.000Z"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(sampleLogs));
    }
  }

  // --- Current User & Role Management ---
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '{}');
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('isoft:user-changed', { detail: user }));
  }

  toggleUserRole() {
    const user = this.getCurrentUser();
    user.role = user.role === 'admin' ? 'student' : 'admin';
    if (user.role === 'admin') {
      user.name = "Engr. Shafiq (Admin)";
      user.email = "admin@isoft.edu.pk";
    } else {
      user.name = "Ali Raza Khan";
      user.email = "student@example.com";
    }
    this.setCurrentUser(user);
    return user;
  }

  // --- Applications & Orders ---
  getApplications() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  }

  getApplicationById(appId) {
    const apps = this.getApplications();
    return apps.find(a => a.id === appId) || null;
  }

  getStudentApplications(email) {
    const apps = this.getApplications();
    return apps.filter(a => a.studentEmail.toLowerCase() === email.toLowerCase());
  }

  createApplication(formData) {
    const apps = this.getApplications();
    
    // Check if duplicate approved enrollment exists
    const existing = apps.find(a => 
      a.studentEmail.toLowerCase() === formData.studentEmail.toLowerCase() &&
      a.courseId === formData.courseId &&
      a.enrollmentStatus === "Enrollment Approved"
    );
    if (existing) {
      throw new Error("You already have an approved enrollment and Google Drive access for this course!");
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `ISOFT-APP-2026-${randomNum}`;
    const timestamp = new Date().toISOString();

    const newApp = {
      id: newId,
      courseId: formData.courseId,
      courseTitle: formData.courseTitle,
      courseFee: Number(formData.courseFee),
      studentName: formData.studentName.trim(),
      studentEmail: formData.studentEmail.trim(),
      studentPhone: formData.studentPhone.trim(),
      country: formData.country || "Pakistan",
      city: formData.city || "N/A",
      skillLevel: formData.skillLevel || "Beginner",
      reason: formData.reason || "Skill Enhancement",
      preferredMethod: formData.preferredMethod || "Google Drive Video Lectures",
      paymentMethod: formData.paymentMethod || "jazzcash",
      transactionId: formData.transactionId ? formData.transactionId.trim() : "",
      receiptUrl: formData.receiptUrl || "",
      paymentStatus: formData.transactionId ? "Under Verification" : "Awaiting Payment",
      enrollmentStatus: "Application Submitted",
      driveAccessStatus: "Pending",
      driveFolderId: formData.driveFolderId || "",
      adminNotes: "New application submitted by student.",
      createdAt: timestamp,
      updatedAt: timestamp
    };

    apps.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    // Create In-App Notification
    this.addNotification({
      recipientEmail: newApp.studentEmail,
      title: `Enrollment Application Submitted: ${newApp.courseTitle}`,
      message: `Your application ${newApp.id} has been recorded. Complete payment verification to receive your Google Drive lectures.`,
      type: "info"
    });

    // Log Audit
    this.addAuditLog("STUDENT_SUBMISSION", `Application ${newId} created for ${newApp.courseTitle} by ${newApp.studentEmail}`);

    window.dispatchEvent(new CustomEvent('isoft:data-updated'));
    return newApp;
  }

  updatePaymentSubmission(appId, paymentData) {
    const apps = this.getApplications();
    const idx = apps.findIndex(a => a.id === appId);
    if (idx === -1) throw new Error("Application not found");

    apps[idx].paymentMethod = paymentData.paymentMethod || apps[idx].paymentMethod;
    apps[idx].transactionId = paymentData.transactionId || apps[idx].transactionId;
    if (paymentData.receiptUrl) {
      apps[idx].receiptUrl = paymentData.receiptUrl;
    }
    apps[idx].paymentStatus = "Under Verification";
    apps[idx].updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    this.addNotification({
      recipientEmail: apps[idx].studentEmail,
      title: "Payment Details Submitted",
      message: `Transaction reference for ${apps[idx].id} received. Our admin team will verify and grant Google Drive access.`,
      type: "info"
    });

    this.addAuditLog("PAYMENT_SUBMITTED", `Payment proof submitted for ${appId} (TRX: ${paymentData.transactionId})`);

    window.dispatchEvent(new CustomEvent('isoft:data-updated'));
    return apps[idx];
  }

  // --- Admin Verification & Access Granting (Step 6 & 7) ---
  approveApplication(appId, adminNotes = "") {
    const apps = this.getApplications();
    const idx = apps.findIndex(a => a.id === appId);
    if (idx === -1) throw new Error("Application not found");

    const app = apps[idx];
    const timestamp = new Date().toISOString();

    app.paymentStatus = "Payment Confirmed";
    app.enrollmentStatus = "Enrollment Approved";
    app.driveAccessStatus = "Granted";
    if (adminNotes) {
      app.adminNotes = adminNotes;
    }
    app.updatedAt = timestamp;

    // Grant Google Drive Access Record (Option A: Individual Email Sharing)
    const shareRecord = {
      id: `DRIVE-SH-${Math.floor(100 + Math.random() * 900)}`,
      applicationId: app.id,
      studentEmail: app.studentEmail,
      courseId: app.courseId,
      courseTitle: app.courseTitle,
      folderId: app.driveFolderId || "iSOFT_SECURE_DRIVE_2026",
      role: "viewer",
      status: "SUCCESS",
      sharingMethod: "Option A (Individual Google Account Sharing)",
      grantedAt: timestamp,
      googleAccount: ACADEMY_INFO.googleDriveAdminAccount
    };

    const shares = this.getDriveShares();
    shares.unshift(shareRecord);
    localStorage.setItem(STORAGE_KEYS.DRIVE_SHARES, JSON.stringify(shares));

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    // Mandatory Notification required by Master Prompt Step 9
    this.addNotification({
      recipientEmail: app.studentEmail,
      title: `🎉 Access Granted: ${app.courseTitle}`,
      message: `Congratulations! Your enrollment in ${app.courseTitle} has been approved. Your course materials are now available. Please log in to your student dashboard and click 'Open Course Lectures on Google Drive' to begin learning.`,
      type: "success"
    });

    this.addAuditLog("PAYMENT_APPROVED_DRIVE_GRANTED", `Approved ${app.id} for ${app.studentEmail}. Google Drive viewer access granted.`);

    window.dispatchEvent(new CustomEvent('isoft:data-updated'));
    return { app, shareRecord };
  }

  rejectApplication(appId, reason = "Payment reference could not be verified.") {
    const apps = this.getApplications();
    const idx = apps.findIndex(a => a.id === appId);
    if (idx === -1) throw new Error("Application not found");

    const app = apps[idx];
    const timestamp = new Date().toISOString();

    app.paymentStatus = "Payment Rejected";
    app.enrollmentStatus = "Application Rejected";
    app.driveAccessStatus = "Rejected";
    app.adminNotes = `Rejected: ${reason}`;
    app.updatedAt = timestamp;

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    this.addNotification({
      recipientEmail: app.studentEmail,
      title: `⚠️ Payment Verification Notice: ${app.courseTitle}`,
      message: `Your payment verification could not be approved. Reason: ${reason}. Please update your receipt or contact support.`,
      type: "danger"
    });

    this.addAuditLog("APPLICATION_REJECTED", `Rejected ${app.id} for ${app.studentEmail}. Reason: ${reason}`);

    window.dispatchEvent(new CustomEvent('isoft:data-updated'));
    return app;
  }

  revokeDriveAccess(shareId, reason = "Revocation per academy policy") {
    const shares = this.getDriveShares();
    const idx = shares.findIndex(s => s.id === shareId);
    if (idx === -1) throw new Error("Share record not found");

    shares[idx].status = "REVOKED";
    shares[idx].revokedAt = new Date().toISOString();
    shares[idx].revokeReason = reason;

    localStorage.setItem(STORAGE_KEYS.DRIVE_SHARES, JSON.stringify(shares));

    // Also update associated application
    const apps = this.getApplications();
    const appIdx = apps.findIndex(a => a.id === shares[idx].applicationId);
    if (appIdx !== -1) {
      apps[appIdx].driveAccessStatus = "Revoked";
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }

    this.addAuditLog("GOOGLE_DRIVE_ACCESS_REVOKED", `Revoked Google Drive access for share ${shareId} (${shares[idx].studentEmail})`);
    window.dispatchEvent(new CustomEvent('isoft:data-updated'));
    return shares[idx];
  }

  retryDriveShare(shareId) {
    const shares = this.getDriveShares();
    const idx = shares.findIndex(s => s.id === shareId);
    if (idx === -1) throw new Error("Share record not found");

    shares[idx].status = "SUCCESS";
    shares[idx].grantedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.DRIVE_SHARES, JSON.stringify(shares));

    const apps = this.getApplications();
    const appIdx = apps.findIndex(a => a.id === shares[idx].applicationId);
    if (appIdx !== -1) {
      apps[appIdx].driveAccessStatus = "Granted";
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }

    this.addAuditLog("GOOGLE_DRIVE_RETRY_SUCCESS", `Retried and successfully granted Google Drive access for ${shares[idx].studentEmail}`);
    window.dispatchEvent(new CustomEvent('isoft:data-updated'));
    return shares[idx];
  }

  // --- Drive Shares ---
  getDriveShares() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DRIVE_SHARES) || '[]');
  }

  // --- Notifications ---
  getNotifications(email = null) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    if (!email) return all;
    return all.filter(n => n.recipientEmail === 'all' || n.recipientEmail.toLowerCase() === email.toLowerCase());
  }

  addNotification(notif) {
    const all = this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientEmail: notif.recipientEmail || 'all',
      title: notif.title,
      message: notif.message,
      type: notif.type || 'info',
      read: false,
      createdAt: new Date().toISOString()
    };
    all.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('isoft:notification-added', { detail: newNotif }));
    return newNotif;
  }

  markAllNotificationsRead(email) {
    const all = this.getNotifications();
    all.forEach(n => {
      if (n.recipientEmail === 'all' || n.recipientEmail.toLowerCase() === email.toLowerCase()) {
        n.read = true;
      }
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
  }

  // --- Audit Logs ---
  getAuditLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
  }

  addAuditLog(action, details) {
    const logs = this.getAuditLogs();
    const user = this.getCurrentUser();
    logs.unshift({
      id: `LOG-${Date.now()}`,
      actor: user.email || "system@isoft.edu.pk",
      action,
      details,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  }

  // --- Support Tickets ---
  getTickets() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKETS) || '[]');
  }

  createTicket(ticketData) {
    const tickets = this.getTickets();
    const newTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      studentEmail: ticketData.email,
      studentName: ticketData.name,
      courseId: ticketData.courseId || "General",
      subject: ticketData.subject,
      message: ticketData.message,
      status: "Open",
      createdAt: new Date().toISOString()
    };
    tickets.unshift(newTicket);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    this.addAuditLog("TICKET_CREATED", `Support ticket ${newTicket.id} created by ${ticketData.email}`);
    return newTicket;
  }

  // Check if student has valid approved enrollment for course (Rule: don't charge again)
  hasApprovedAccess(studentEmail, courseId) {
    if (!studentEmail) return false;
    const apps = this.getApplications();
    return apps.some(a => 
      a.studentEmail.toLowerCase() === studentEmail.toLowerCase() &&
      a.courseId === courseId &&
      a.enrollmentStatus === "Enrollment Approved" &&
      a.driveAccessStatus === "Granted"
    );
  }

  // Check pending application for student
  getPendingApplication(studentEmail, courseId) {
    if (!studentEmail) return null;
    const apps = this.getApplications();
    return apps.find(a => 
      a.studentEmail.toLowerCase() === studentEmail.toLowerCase() &&
      a.courseId === courseId &&
      a.enrollmentStatus !== "Application Rejected"
    ) || null;
  }
}

// Global store singleton
const store = new AcademyStore();
