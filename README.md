
# Express.js Player Management System

A simple Player Management System developed using Express.js, Node.js, and SQLite as part of an individual in-depth study.

## Features

- Add new players
- View all players
- Edit player names and scores
- Delete players
- Store player information persistently using SQLite

## Technologies

- Node.js
- Express.js
- SQLite (better-sqlite3)
- JavaScript
- HTML and CSS

## How to Run

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in a terminal.
4. Install dependencies:

   npm install

5. Start the server:

   npm start

6. Open http://localhost:3000 in your browser.

The SQLite database (`players.db`) is created automatically when the application starts.

## Project Structure

- `app.js` – Express.js server and CRUD routes
- `database.js` – SQLite database connection and table creation
- `public/index.html` – User interface
- `public/script.js` – Frontend JavaScript and Fetch API
- `public/style.css` – Application styling

## About

This project was developed for Track B of the Individual In-Depth Study in Web Frameworks. It uses the player management domain from Laboratory Assignment 2, which was developed using ASP.NET Core MVC.
