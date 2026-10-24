MyPatientHUB – Healthcare Website
Team Members:
•	Bahara Mohammadi
•	Sediqa Nazari
Repository Link: Bahara-mohammadi12/my-patient-hub: A simple website created by HTML, CSS, JavaScript, and react.
Website Link: https://stately-biscotti-cb5bc0.netlify.app
_____________________________________________________________________________
1.	Project Overview
MyPatientHUB is a healthcare website project designed to provide users with a simple and user-friendly interface for accessing different healthcare-related services.
The project includes a login page, a responsive healthcare dashboard, and healthcare service pages such as Find Clinic, Find Doctor, and MarketPlace.
The dashboard provides access to different sections such as appointments, doctors, clinics, pharmacies, chat, marketplace services, my account, and user account settings. 
As part of our recent project updates, we converted the Find Doctor and Find Clinic pages from HTML pages into React components. We also added a Market place page using React, including product cards, search and entry controls, service information, and a footer.
The project now uses a more organized React structure with reusable components such as the Sidebar and Header. React Router is also used to navigate between different pages.
The project uses HTML, CSS, JavaScript, and React to create a clean, organized, and responsive healthcare interface.
_________________________________________________________________________________
2.	Technologies Used
•	HTML5
•	CSS3
•	JavaScript
•	React
•	React Router
•	Vite
•	Font Awesome
•	ChatGPT 






_________________________________________________________________________________
3.	Main Features
Login Page
The Login Page includes:
•	Wellcome message
•	Email and password input fields
•	Facebook and Google login buttons 
•	Remember me option
•	Forgot password option
•	Sign Up button
•	JavaScript login validation
_________________________________________________________________________________
Dashboard
The healthcare dashboard includes:
•	MyPatientHUB logo
•	Navigation sidebar
•	Dashboard section
•	Dashboard cards
•	Appointments
•	Find Doctor
•	Find Clinic
•	Chat 
•	Marketplace
•	Pharmacy
•	My dependents
•	My Account
•	Setting
•	Search bar
•	Logout option
•	Notification icon
•	Setting icon
_________________________________________________________________________________
Dashboard Cards
The dashboard contains cards for:
•	Clinic Promotions
•	Pharmacy Promotions
•	Smart Market Usage by App
•	Health Index
•	Upcoming Appointments
_________________________________________________________________________________
4.	Find Clinic Page
The find clinic page was originally created as a separate HTML page.
As part of the project update, it was converted into a React component and integrated into the React project structure.
It includes:
•	Healthcare-focused clinic search interface
•	React-based page structure
•	CSS styling adapted for React
•	Layout consistent with the MyPatientHUB design
•	Responsive design for different screen sizes
•	Navigation through the React application
_________________________________________________________________________________
5.	Find Doctor Page
The Find Doctor page was also originally created as a separate HTML page.
It was converted into a React component and integrated into the React project.
It includes:
•	Healthcare-focused doctor search interface
•	React-based page structure
•	CSS styling adapted for React
•	Consistent MyPatientHUB layout
•	Responsive design
•	Navigation through the React application
_________________________________________________________________________________
6.	Marketplace Page
A new Marketplace page was added to the React application.
The Marketplace page allows users to view healthcare-related marketplace products and search results.
The page includes:
•	Marketplace heading 
•	Four product cards 
•	Product images 
•	Product names 
•	Product prices
•	Service/company information
•	Product description
•	BUY NOW button
_________________________________________________________________________________
7.	React Components and Layout
The project was organized into reusable React components.
The main application structure includes:
•	App.jsx 
•	Main.jsx 
•	Sidebar.jsx
•	clinic.jsx 
•	doctor.jsx
•	market.jsx
•	dependent.jsx
•	setting.jsx
the sidebar is used for the main navigation of the healthcare website.
The Header displays:
•	Current page name
•	Breadcrumb
•	Search field
•	Logout option
•	Setting icon
•	Notification icon
The sidebar and header are replaced in the main application layout so that can be used consistently across the React pages.
_________________________________________________________________________________
8.	React Routing
React Router was added to manage navigation between pages.
The application includes routes for:
•	Dashboard
•	Find Doctor
•	Find Clinic 
•	Marketplace 
•	Appointments
•	Chat
•	Find Pharmacy
•	My Dependents
•	My account 
•	Settings
The Marketplace page can be accessed through the Find Marketplace option in the sidebar.
_________________________________________________________________________________
9.	JavaScript Functionality
JavaScript is used in the project for basic interaction and validation.
The functionality includes:
•	Sidebar hide/show functionality
•	Login form validation
•	Email validation
•	Password validation 
•	Login success message
•	React-based page interaction
•	React Router navigation
The login validation checks whether the email and password fields are filled correctly. It also checks that the email contains an @ symbol and that the password meets the required length.
React is now also used to manage the structure and display of the Find Clinic, Find Doctor, and Marketplace pages.
_________________________________________________________________________________
10.	Marketplace React Functionality
The Marketplace page uses React data and .map() to display multiple Products result.
Instead of writing every product card separately, product information is stored in JavaScript objects and displayed using React.
The Marketplace includes:
•	Product data 
•	Product prices
•	Company names
•	Product description
•	Product image
•	Marketplace result data
•	React.map() for displaying products
This makes the Marketplace page more organized and easier to update.
_________________________________________________________________________________


11.	Images and Assets
The Marketplace page uses image assets stored inside the React application’s public folder.
The image were organized as:
Web2-app/
|____ public/
   |_____ food1.jpg
   |_____food2.jpg
   |_____food3.jpg
   |_____food4.jpg

The image are used for:
•	Marketplace product images
•	Service/company information
This structure allows the React application to access the images using paths such as:
    /food1.jpg
    /food2.jpg
    /food3.jpg
    /food4.jpg
_________________________________________________________________________________
12.	Responsive design
The website is designed to work on different screen sizes, including:
•	Laptops
•	Tablets
•	Mobiles
CSS media queries are used to adjust the layout according to the screen size.
The Marketplace page also includes responsive behavior. On smaller screens:
•	Product cards change from four columns to two columns
•	Product cards eventually change to one column on mobile screens
•	Search controls become easier to use on smaller screens
•	Footer content changes into a vertical layout
The Find Clinic and Find Doctor pages also maintain responsive layouts.
_________________________________________________________________________________
13.	Project Files
The main project files include:
web2-app/
|___public/
|     |____foode1.jpg
|     |____food2.jpg
|     |____food3.jpg
|     |____food4.jpg
|     |____doctor1.jpg
|     |____doctor2.jpg
|     |____ph1.jpg
|     |____ph2.jpg
|     |____ph3.jpg
|     |____ph4.jpg
|     |_____ clinic1.jpg
|     |_____clinic2.jpg
|_____src/
|       |_____app.jsx
|       |_____app.css
|       |_____components
|        |_____clinic.jsx
|        |_____clinic.css
|        |_____dependent.jsx
|        |_____dependent.css
|        |_____doctor.jsx
|        |_____home.jsx
|        |_____home.css
|        |_____login.jsx
|        |_____login.css
     |         |_____market.jsx
     |         |_____market.css
     |         |_____SharedHeader.jsx
     |         |_____SharedHeader.css
     |         |_____pharmacy.jsx
     |         |_____pharmacy.css
     |         |_____setting.jsx
     |         |_____setting.css
     |         |_____sidebar.jsx
     |         |_____sidebar.css
The React application uses main.jsx as the main entry point and App.jsx as the main application component.
_____________________________________________________________________________________
14.	GitHub and Project Management
The latest React changes were commited and pushed ti the project’s GitHub repository.
The changes were pushed to the ( main ) branch.
The project repository is: Bahara-mohammadi12/my-patient-hub: A simple website created by HTML, CSS, JavaScript, and react.

The  latest update included the Setting page, shared layout components React structure, and styling.
_________________________________________________________________________________
15.	Project Outcome 
The update MyPatientHUB project provides a healthcare website with:
•	Login functionality
•	Responsive healthcare dashboard
•	Reusable Navigation sidebar
•	Dashboard cards
•	JavaScript validation
•	Find Clinic page
•	Find Doctor page
•	Marketplace page
•	Marketplace product cards
•	Search and filtering controls
•	Responsive layout
•	Healthcare-related navigation and services
As part of the latest project development, the website was expanded from separate static HTML pages to a more organized React-based application.
The Find Clinic and Find Doctor pages were converted from HTML/CSS into React components, and a new Setting page was added using React. Reusable  Sidebar component was also introduced to provide a consistent layout across the application.
These updates demonstrate our understanding of:
•	HTML
•	CSS
•	JavaScript
•	React 
•	React Router
•	Component-based development
•	Responsive web design
•	Basic web application structure
•	Git and GitHub project management
The project continues to maintain the original MyPatientHUB healthcare design while gradually moving more of the website into a reusable and organized React structure.




        
