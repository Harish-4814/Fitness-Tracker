# Fitness Tracker Web Application

## Project Overview

Fitness Tracker is a full-stack web application developed to help users monitor their fitness journey by tracking personal health information, nutrition intake, and weight progress. The system provides personalized fitness metrics such as BMI, calorie requirements, and macronutrient recommendations.

The application uses MongoDB for data storage, Node.js and Express.js for backend development, and HTML, CSS, and JavaScript for the frontend.

---

## Features

### User Authentication

* User Registration
* User Login
* Secure account management

### Profile Management

* Age, Gender, Height, Weight
* Goal Weight
* Activity Level
* Diet Type (Vegetarian / Non-Vegetarian)
* Fitness Goal (Fat Loss / Muscle Gain / Maintain Weight)

### Dashboard

* BMI Calculation
* BMI Status (Underweight, Healthy, Overweight, Obese)
* Daily Calorie Requirement
* Protein Requirement
* Carbohydrate Requirement
* Fat Requirement

### Nutrition Tracking

* Food Database
* Food Logging
* Calorie Tracking
* Protein Tracking
* Carbohydrate Tracking
* Fat Tracking

### Progress Tracking

* Weight History Recording
* Weight Progress Visualization
* Interactive Progress Graph
* Goal Progress Monitoring

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Libraries

* Chart.js

---

## Project Structure

fitness_tracker/

├── models/

│   ├── User.js

│   ├── Profile.js

│   ├── Food.js

│   ├── FoodLog.js

│   ├── Progress.js

│   └── WeightLog.js

│

├── routes/

│   ├── authRoutes.js

│   ├── profileRoutes.js

│   ├── foodRoutes.js

│   └── progressRoutes.js

│

├── public/

│   ├── index.html

│   ├── dashboard.html

│   ├── nutrition.html

│   ├── progress.html

│   ├── profile.html

│   ├── style.css

│   └── script.js

│

├── seedFoods.js

├── server.js

├── package.json

└── package-lock.json

---

## Installation Steps

### Clone Repository

git clone https://github.com/Harish-4814/Fitness-Tracker.git

### Open Project Folder

cd Fitness-Tracker

### Install Dependencies

npm install

### Start MongoDB

Make sure MongoDB is running locally on:

mongodb://127.0.0.1:27017/fitnessTrackerDB

### Seed Food Database

node seedFoods.js

### Run Application

node server.js

### Open Browser

http://localhost:5000/index.html

---

## Future Enhancements

* Daily Nutrition Reports
* Exercise Tracking
* Water Intake Monitoring
* Food Recommendations
* Mobile Responsive Design
* AI-Based Diet Suggestions

---

## Team Members

1. Jatin 
2. Harish Singh Mahara
3. Ayush Pathak
4. Krrish Addhikari

---

## Conclusion

The Fitness Tracker application provides an effective platform for monitoring fitness goals, nutrition intake, and weight progress. The project demonstrates the practical implementation of full-stack web development using Node.js, Express.js, and MongoDB while helping users maintain a healthy lifestyle.

---

## GitHub Repository

https://github.com/Harish-4814/Fitness-Tracker
