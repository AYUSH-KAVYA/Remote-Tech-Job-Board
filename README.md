# Remote Tech Job Board

## Project Description
The Remote Tech Job Board is a dynamic web application designed to help developers find remote job opportunities seamlessly. By integrating a live public API, the application fetches real-time job postings and displays them in a clean, user-friendly interface. Users can actively search for specific roles, filter jobs by category or required skills, and sort the listings to find the most recent opportunities.

## API Integration
This project uses the [Remotive API](https://remotive.com/api/remote-jobs) to fetch live remote job listings. It returns a comprehensive JSON array of job objects containing titles, company names, categories, and publication dates.

## Planned Features & JavaScript Logic
To meet the core project requirements, the following features will be implemented using Vanilla JavaScript and Higher-Order Functions (HOFs):
* **Live Search:** Users can search for specific job titles or companies utilizing `.filter()` and `.includes()` on the fetched data array.
* **Category Filtering:** An interface to filter jobs by specific categories, such as "Software Development" or "Data", using `.filter()`.
* **Date Sorting:** A toggle feature allowing users to sort the job feed by publication date, viewing either the newest or oldest postings first using `.sort()`.
* **Responsive UI:** A well-designed, responsive CSS, mobile-friendly interface.

## Technologies Used
* **HTML5:** Semantic structure of the application.
* **CSS3:** Custom styling utilizing CSS Flexbox and Grid to ensure a fully responsive, mobile-first design across all device sizes.
* **JavaScript:** Fetching API data, DOM manipulation, and handling application logic (HOFs), the core logic engine driving the application without relying on heavy frontend frameworks like React.

**Key JavaScript Concepts Implemented:**
* **Fetch API & Asynchronous JS:** Utilizing `async/await` and Promises to securely handle asynchronous network requests to the Remotive API.
* **Higher-Order Functions (HOFs):** Extensive use of array methods like `.map()` to render job cards, `.filter()` for search and category selection, and `.sort()` for ordering by date.
* **Dynamic DOM Manipulation:** Generating and updating HTML elements on the fly based on API responses and real-time user input.

## Setup and Installation
To run this project locally, simply follow these steps:
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/AYUSH-KAVYA/Remote-Tech-Job-Board.git
