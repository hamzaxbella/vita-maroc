# 🔥 Public Pages (Before Login)

## 🌐 Landing Page
- **Hero Section**: Catchy headline, CTA to login/sign up
- **About Us**: Short explanation of how the platform works
- **How It Works**: Step-by-step for patients & doctors
- **Testimonials / Trust Badges** (optional)
- **Footer**: Links to Terms, Privacy, Contact

## 🔐 Login / Signup Page
- **Tabs / Toggles to Choose Role**: Patient / Doctor / Admin
- **Login Form**: Email/password fields
- **Sign-Up Forms** (Role-specific):
  - **Patient**: Name, phone, address, emergency contact
  - **Doctor**: Name, specialty, license verification, location, availability
  - **Admin**: Invite-only, hidden or protected route

## 🚨 Emergency Call Quick Access
- Button on homepage (optional)
- Either:
  - Redirects to login
  - Initiates emergency call directly

---

# 🧑‍⚕️ Patient Dashboard (After Login)

## 📚 Sidebar Navigation
- Home
- Book Appointment
- Home Visit
- My Appointments
- Emergency
- Profile Settings

## 🧭 Pages

### 🏠 Dashboard (Home)
- Quick actions: Book Now, Request Visit, Emergency
- Upcoming appointments
- Recently contacted doctors

### 📅 Book Appointment
- Search/filter doctors by specialty, location, availability
- View doctor profile
- Choose time slot
- Confirm booking

### 🏠 Request Home Visit
- Enter address
- Choose time (ASAP or scheduled)
- Add optional notes for the doctor

### 📋 My Appointments
- List of upcoming/past bookings
- Cancel/reschedule options
- Booking status (pending, confirmed, completed)

### 🚨 Emergency Contact Page
- Emergency call button
- Info on what happens next
- Auto location detection (if enabled)

### ⚙️ Profile Settings
- Edit personal information
- Add health records (optional)
- Change password

---

# 🩺 Doctor Dashboard (After Login)

## 📚 Sidebar Navigation
- Home
- My Patients
- Appointments
- Home Visits
- Availability Settings
- Profile Settings

## 🧭 Pages

### 🏠 Dashboard (Home)
- Today’s schedule
- Emergency requests
- Toggle “Available / Unavailable”

### 📅 Appointments
- List of appointments
- Accept / Reject options
- View patient details

### 🏠 Home Visit Requests
- List of visit requests
- Accept / Decline options
- Navigation support (e.g., Google Maps)

### 👨‍👩‍👧 My Patients
- List of consulted patients
- Basic interaction history
- Notes or file uploads

### 📆 Availability Settings
- Set availability calendar
- Manage working hours, time off, breaks

### ⚙️ Profile Settings
- Edit profile
- Upload license/documents
- Define specialties and services offered

---

# 🧑‍💻 Admin Dashboard

_Admins manage everything. God mode unlocked._

## 📚 Sidebar Navigation
- Dashboard
- Manage Patients
- Manage Doctors
- Appointments Overview
- Emergency Calls Log
- Reports & Analytics
- Settings

## 🧭 Pages

### 🏠 Dashboard (Home)
- Platform stats (active doctors, bookings today, emergencies)
- Pending doctor verifications

### 👤 Manage Patients
- List, search, filter
- View/edit profiles
- Deactivate if needed

### 🩺 Manage Doctors
- Approve/reject doctors
- Verify licenses
- Suspend accounts

### 📅 Appointments Overview
- View all appointments
- Use filters
- Manual overrides

### 🚨 Emergency Calls Log
- List of emergency calls
- Track response time
- Follow-up features

### 📊 Reports & Analytics
- Usage stats, doctor/patient ratios
- Popular times, top specialties
- Heatmaps (if location data is enabled)

### ⚙️ Platform Settings
- Roles & permissions
- Notification settings
- General configuration

---

# ⚙️ Global Components (Available Everywhere)

- Top navigation bar or sidebar
- Notification system (toasts / bell icon)
- Chat with support (optional)
- Real-time alerts (emergencies, new bookings)

---

## 💡 Optional Power Features

- ✅ Role-based redirects and authentication
- 📱 Mobile-first responsive design
- ✉️ SMS/Email reminders for appointments
- 💳 Stripe or local payment integration
- ⭐ Rating & feedback system after sessions
