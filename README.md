# Event Management System

A React-based Event Management System that allows users to explore events, view event details, register for events, and manage their registered events.

## Features
- User Authentication (Login/Register) with Local Storage persistence
- Event Exploration and Search using Ticketmaster Discovery API
- Event Details view
- Event Registration with duplicate prevention
- My Events dashboard separating upcoming and past events
- State management using Redux Toolkit
- Routing using React Router

## Tech Stack
- React.js (Vite)
- Redux Toolkit
- React Router
- Axios
- Ticketmaster Discovery API

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/SyedHasanNawaz/event-management.git
   cd event-management

2. Install dependencies:
   npm install --legacy-peer-deps

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Ticketmaster API key:
   VITE_TM_API_KEY=your_api_key_here

4. Run the development server:
   npm run dev

5. Open http://localhost:5173 in your browser.