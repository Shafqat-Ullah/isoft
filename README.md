# iSOFT IT Training & Consultancy — Official Online Academy & LMS

A modern, responsive, and full-featured Online Education Platform built with **HTML5, Vanilla CSS3, and JavaScript**, tailored specifically to the official **iSOFT IT Training & Consultancy** brand identity and logo.

---

## 🌟 Brand & Theme Integration

The website's visual design system is directly derived from the official **iSOFT** logo:
- **Primary Brand Red**: `#D32027` / `#DC2626` (Crimson / Scarlet Red with hover states `#B91C1C`)
- **Brand Charcoal**: `#1E252B` / `#111827` (Deep Charcoal Black matching the logo's typography)
- **Accent Silver & Slate**: `#64748B` / `#E2E8F0` / `#F8FAFC`
- **High-Resolution Logo**: Rendered crisply at the top left of the header, in the footer, and within system notifications.

---

## 🚀 Key Functional Modules & User Journey

### 1. Course Catalog & Filter System
- Courses in **Python Programming, Applied Data Science & ML, Full Stack Web Development (MERN + Next.js), Generative AI & Prompt Engineering, and Graphic Design**.
- Filters by category, search by keywords, pricing badges, lecture counts, duration, and level.

### 2. Course Detail & Lecture Previews (Step 2)
- Video player embedded with authorized sample lectures.
- Curriculum accordion with module breakdowns and duration tags.
- **Protected Paid Lectures**: Display a lock icon (`🔒 Drive Locked`).

### 3. Step 3: Locked Lecture Click Modal
Clicking any locked paid lecture triggers the exact required modal dialog:
> **"Get Access to This Course"**  
> *"To access the complete video lectures on Google Drive, please complete the enrollment form and payment process. Once your payment has been verified and your enrollment is approved, you will receive access to the course materials."*
- Action buttons: **Apply for Course Access**, **View Course Details**, **Back to Course**.
- Prevents re-charging students who already have an approved enrollment.

### 4. Step 4: 14-Field Course Access Application Form
Contains all 14 required fields:
1. **Full Name**
2. **Gmail Address** (used for verified Google Drive sharing)
3. **WhatsApp / Contact Number**
4. **Country & City**
5. **Selected Course** *(Read-Only)*
6. **Course Fee** *(Read-Only)*
7. **Current Skill Level** (Beginner, Intermediate, Advanced)
8. **Reason for Joining** (Career Switch, Skill Enhancement, Academic, Freelancing)
9. **Preferred Learning Method** (Drive Video Lectures, Live Mentorship)
10. **Payment Method** (JazzCash, Easypaisa, Meezan Bank, Online Card)
11. **Transaction Reference / TID**
12. **Payment Receipt Upload** (with live image preview)
13. **Consent to Terms & Refund Policy**
14. **Consent to Course Updates**

### 5. Step 5: Payment Instructions & Checkout
- Unique Application / Order ID generation (e.g. `ISOFT-APP-2026-2660`).
- 4-Stage visual status tracker:
  1. Application Submitted
  2. Payment Instructions
  3. Admin Verification
  4. Google Drive Access Granted
- Interactive payment guides with **1-click Copy** for:
  - **JazzCash**: Account `0300 1234567`, Till ID `0098412`, USSD `*786#`
  - **Easypaisa**: Account `0345 9876543`
  - **Meezan Bank Corporate**: IBAN `PK36MEZN0001020104567891`
  - **Online Card Payment Gateway**

### 6. Step 6: Admin Management Console
Authorized administrators can:
- View all student applications with filters: *All, Needs Verification, Approved & Paid, Rejected*.
- Search by student name, email, application ID, or transaction reference.
- Inspect payment receipt screenshots with zoom modal.
- Click **"Confirm Payment & Grant Drive Access"** or **"Reject Submission"** with a custom reason.
- Record internal administrative audit notes.

### 7. Step 7: Google Drive Course Access Engine
Supports two delivery modes:
- **Option A (Preferred - Individual Student Access)**: Automatic viewer permissions granted to the student's verified Gmail address for the specific course folder ID.
- **Option B (Protected Drive Link)**: Secure Drive folder URL accessible only via the student dashboard.
- Admin Drive sharing management:
  - Connected Google Account (`drive-admin@isoft.edu.pk`)
  - Course-to-Folder ID mapping table
  - Drive access revoke and retry capabilities
  - Fallback manual sharing instructions generator

### 8. Step 8: Student Dashboard ("My Learning")
- Displays student profile and all enrolled courses.
- Real-time status indicators: *Awaiting Verification, Payment Rejected, Access Active*.
- When approved, displays the prominent glowing button:  
  **"Open Course Lectures on Google Drive"**  
  Clicking launches the interactive Google Drive viewer modal with lecture streaming links and source code downloads.

### 9. Step 9: Real-time Notifications Center
- Dropdown counter badge in the navbar.
- Dispatches in-app and simulated email notifications at each milestone:
  - Application received
  - Payment proof submitted
  - Enrollment approved & Drive access granted
  - Rejection notice with reason

### 10. Additional Academy Pages
- **About Academy**: History, mission, and learning facilities.
- **Drive Access Guide**: Comprehensive tutorial on Gmail authorization and troubleshooting "Access Denied" errors.
- **Certificate Verification**: Interactive tool where anyone can verify certificate IDs (e.g. `ISOFT-CERT-2026-001`, `ISOFT-CERT-2026-002`).
- **Contact & Support**: Head office address (DHA Phase 5, Lahore), phone, direct WhatsApp link, and inquiry form.
- **FAQs**: Accordion answering payment, Drive sharing, and refund queries.

---

## 📂 Project Directory Structure

```text
Sir Shafiq/
├── index.html                   # Main single-page application entry point
├── server.js                    # Zero-dependency local static server
├── README.md                    # Documentation & setup guide
└── assets/
    ├── css/
    │   └── style.css            # Complete design system with iSOFT theme
    ├── js/
    │   ├── data.js              # Seed data: courses, curriculum, payment accounts, FAQs
    │   ├── store.js             # LocalStorage reactive store (applications, shares, logs)
    │   ├── admin.js             # Administrator verification & Drive management
    │   └── app.js               # Client controller, routing, modals, and event handlers
    └── images/
        ├── isoft-logo.png       # Official academy logo
        ├── isoft-logo.jpg       # High-resolution logo asset
        └── sample-receipt.svg   # Sample payment receipt graphic
```

---

## 💻 How to Run Locally

### Option 1: Using the Node.js Server
Open PowerShell in the project directory and run:
```powershell
node server.js
```
Open your browser at:
`http://localhost:3000`

### Option 2: Direct File Opening
Double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari). All features, local storage persistence, and routing work out of the box!

---

## 🔄 Quick Demo Testing Shortcut
A **Role Switcher** button is built right into the top navbar:
- Click **"Student Mode"** to experience the visitor and student workflow (apply for a course, submit payment, view "My Learning").
- Click **"Admin Mode"** to switch directly to the **Admin Management Console** (verify payments, approve applications, inspect receipts, and manage Google Drive folders).
