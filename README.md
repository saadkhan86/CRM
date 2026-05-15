# CRM Backend System

A robust, enterprise-grade Customer Relationship Management (CRM) backend system built with Node.js, Express, and TypeScript. This system provides a comprehensive API for managing sales pipelines, organizations, people, deals, and activities.

## Overview

This project serves as the core engine for a CRM application, featuring a layered architecture (Controller-Service-Repository) to ensure scalability, maintainability, and clear separation of concerns.

## Core Features

- User Authentication and Authorization: Secure login and registration using JWT and Bcrypt.
- Organization Management: Track and manage corporate entities.
- People/Contact Management: Maintain detailed records of individual contacts.
- Deal Pipeline: Manage sales stages and track deal progress through custom pipelines.
- Activity Tracking: Schedule and log meetings, calls, and tasks.
- Notes System: Attach detailed notes to any entity for better record keeping.
- Robust Error Handling: Centralized error handling middleware for consistent API responses.
- Database Integration: Scalable data storage using MongoDB and Mongoose.

## Technology Stack

- Language: TypeScript
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- ODM: Mongoose
- Security: JSON Web Tokens (JWT), Bcrypt
- Development Tools: Nodemon, ts-node

## Project Structure

The project follows a modular structure to keep the codebase organized:

- Src/Connections: Database connection configurations.
- Src/Controller: Request handling and response management.
- Src/ErrorHandler: Global error handling logic.
- Src/Interfaces: TypeScript interfaces for type safety.
- Src/Middlewares: Authentication and request validation.
- Src/Models: Mongoose schemas and data models.
- Src/Repositories: Direct database interaction layer.
- Src/Routes: API endpoint definitions.
- Src/Services: Business logic implementation.
- Src/Utils: Helper functions and shared utilities.

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- MongoDB (Running instance or Atlas URI)
- npm or yarn

### Installation

1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
   cd CRM

3. Install dependencies:
   npm install

### Configuration

Create a .env file in the root directory and configure the following variables:

PORT=8080
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string

### Running the Application

Development mode (with auto-reload):
npm run dev

Production build:
1. Compile TypeScript:
   npx tsc
2. Start the server:
   node dist/index.js

The server will start on the port defined in .env (defaults to 3000 if not specified).

## API Documentation

All API endpoints are prefixed with /api/v1. The endpoints are organized by entity:

- /api/v1/user: Authentication and user profile management.
- /api/v1/organization: CRUD operations for companies.
- /api/v1/people: Contact management.
- /api/v1/deals: Sales pipeline and deal tracking.
- /api/v1/activity: Task and schedule management.
- /api/v1/notes: Attachment of records to entities.

## Development Standards

- All code is written in TypeScript for enhanced type safety.
- Prettier and ESLint (if configured) ensure consistent code formatting.
- Follows RESTful API design principles.

## License

This project is licensed under the ISC License.

## Author

Saad Muhammad Bin Ramzan
