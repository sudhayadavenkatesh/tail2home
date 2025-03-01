# Tail2Home: A Pet Adoption Website | MERN Stack Portfolio with JWT Auth, OTP Verification & Admin Panel
Tail2Home is a website where users can either give a pet up for adoption or adopt one. The admin decides if a pet can be put up for adoption and reviews adoption applications. This new version includes JWT authentication, OTP verification, user profiles, and an enhanced admin dashboard with data visualization.



## Introduction
Tail2Home connects pet lovers with pets in need of a home. This platform simplifies pet adoption with a user-friendly experience, now with enhanced security and functionality.

## New Features (V2.0)
 - JWT Authentication: Users are securely authenticated with JSON Web Tokens (JWT).
 - OTP Verification: Added extra security for users with one-time password (OTP) verification.
 - User Profiles: Each user now has a personalized profile where they can manage their information.
 - Admin Dashboard: A comprehensive dashboard with graphs showing the number of users registered and a pie chart displaying different types of pets available for adoption.

## General Features
- Users can submit a pet for adoption by filling out a form.
- Admin reviews adoption submissions and can approve or reject them.
- Approved pets are listed on PawFinds for potential adopters to view.
- Users interested in adopting a pet fill out an application form.
- Admin evaluates adoption applications to select the most suitable adopter.
- Admin maintains a history of adopted pets and their new owners.
- User can browse and search for available pets for adoption.
- They can filter pets based on pet type i.e. dog, cat.
- Tail2Home offer detailed pet profiles with photos and descriptions.

## Technology Stack
Tail2Home is built using the MERN stack (MongoDB, Express.js, React, Node.js) with added JWT authentication and OTP verification.

## **Please Note: This Project Is Designed for Laptop Screens**
Kindly be aware that this project is optimized for laptop screens and is not responsive for mobile or tablet devices.



## Guide for Setting Up an EMAIL_APP_PASS (for emails)
To enable your app to send emails through your Gmail account, you’ll need to generate an App Password. Follow the steps below:

1. Go to the Google Account Security Page:
   - Visit Google Account Security and make sure 2-Step Verification is enabled.
2. Generate an App Password:
    - Scroll down to the "Signing in to Google" section.
    - Click on App Passwords.
    - Select the app (e.g., "Mail") and the device (e.g., "Other") for which you are generating the password.
    - Google will provide a App Password.
4. Use the Generated App Password:
    - Copy the App Password and paste it into the .env file under the EMAIL_APP_PASS field:
    - EMAIL_APP_PASS=your_generated_app_password

### Additional Notes
- Ensure you have Node.js and npm installed on your machine.
