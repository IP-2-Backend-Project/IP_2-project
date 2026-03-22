# Company Application Accepter - Phase 1 (Backend)

### 👥 Team Members
| Name | ID | GitHub Username |
| :--- | :--- | :--- |
| Sosina Girmay | ETS1311/16 | [@Sosina47](https://github.com/Sosina47) |
| Soliyana Wasyihun | ETS1304/16 | [@19souly97](https://github.com/19souly97) |
| Shegitu Shukeri | ETS1277/16 | [@Shegitu](https://github.com/Shegitu) |
| Sifen Tesfaye | ETS1282/16 | [@Sifen-tesfaye](https://github.com/Sifen-tesfaye) |
| Semehal Hailu | ETS1266/16 | [@semehal62](https://github.com/semehal62) |

***

## 📌 Project Overview
The **Company Application Accepter** is a system designed for recruiters to review and accept job applications. **Phase 1** establishes the secure authentication system and the database structure required to track application statuses.

## 🛠 Phase 1: Technical Implementation
This project is built using **PHP 8.x** and follows the security standards from **Chapters 2 & 3** of our curriculum.

### 1. Database & Application Tracking
- **PDO Connection:** Secure MySQL connection using `try-catch` blocks for error handling.
- **Enhanced Schema:** The database now tracks which user is accepted for a specific position.
- **Status Posting:** Logic to "post back" the result to the user's dashboard.

### 2. User Authentication System
- **Registration:** Uses `$_POST` and `password_hash()` for secure account creation.
- **Login:** Uses `password_verify()` and `$_SESSION` to maintain user state.
- **Roles:** Support for different roles (e.g., 'Admin/Recruiter' to accept and 'Applicant' to view status).

### 3. Security Measures (Chapter 3)
- **CSRF Protection:** Hidden tokens and `session_set_cookie_params(['samesite' => 'Strict'])` to prevent cross-site attacks.
- **SQLi Prevention:** Mandatory use of **Prepared Statements** for all database queries.

## 📂 Project Structure
- `db.php` – Database connection.
- `register.php` – User signup.
- `login.php` – User authentication.
- `dashboard.php` – Displays application status (Accepted/Pending).
- `update_status.php` – (Recruiter only) Logic to accept an applicant for a position.
- `logout.php` – Securely ends the session.

## 🚀 Database Setup (SQL)
To support the "Acceptance" feature, use the following schema:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'applicant') DEFAULT 'applicant'
);

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    position_name VARCHAR(100),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);