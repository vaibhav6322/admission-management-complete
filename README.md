# Admission Management System

A full-stack MERN application for managing university admissions - from application submission to seat allocation and fee collection.

**Live Demo:** https://admission-management-complete-frontend.onrender.com

## Features

- **Authentication** - JWT-based auth with role-based access control
- **Master Data** - Institution, campus, department, and program management
- **Applicant Management** - Online applications with document upload and verification
- **Seat Allocation** - Automated atomic seat allocation algorithm
- **Dashboard** - Real-time statistics and reporting

## Tech Stack

**Frontend:** React, Redux Toolkit, Vite, Axios  
**Backend:** Node.js, Express, MongoDB, JWT  
**DevOps:** Docker

## Prerequisites

- Node.js 14+
- MongoDB
- npm/yarn

## Quick Start

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd admission-management-complete
```

2. **Backend Setup**
```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/admission-db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

3. **Frontend Setup**
```bash
cd client
npm install
npm run dev
```

- Frontend runs on: `http://localhost:3000`  
- Backend runs on: `http://localhost:4000`

## Project Structure

```
admission-management-complete/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # State management
│   │   └── services/       # API services
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database schemas
│   │   └── middleware/     # Auth middleware
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Master Data
- `GET /api/master/institutions` - List institutions
- `GET /api/master/programs` - List programs
- `GET /api/master/departments` - List departments
- `GET /api/master/campuses` - List campuses

### Applicants
- `GET /api/applicant` - List all applicants
- `POST /api/applicant` - Create applicant
- `PUT /api/applicant/:id` - Update applicant

### Admissions
- `POST /api/admission/allocate-seats` - Allocate seats
- `POST /api/admission/confirm-admission` - Confirm admission
- `POST /api/admission/collect-fee` - Process fee payment

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics

*Import `postman_collection.json` for complete API testing*

##  Test Credentials

```
Email: vaibhav@gmail.com
Password: vaibhav
```

## Deployment (Render)

### Backend
1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=4000`
   - `NODE_ENV=production`
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend
1. Build command: `npm run build`
2. Publish directory: `dist`

## Troubleshooting

**CORS Errors**  
Ensure backend CORS configuration includes your frontend URL in `server.js`

**404 API Calls**  
Verify API baseURL in `client/src/services/api.js` includes `/api` path

**Database Connection Issues**  
Check `MONGODB_URI` in `.env` and ensure MongoDB server is running

**Frontend Not Updating**  
Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## User Roles

### Admin
- Full system access and configuration
- Master data management
- Reports and analytics

### Admission Officer
- Applicant management
- Seat allocation
- Fee collection
MIT License

## 🤝 Support

For issues or questions, refer to the troubleshooting section or check the API documentation in the Postman collection.
