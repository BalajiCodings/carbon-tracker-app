# Carbon Tracker Backend API

## Setup Instructions

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env` file with the following variables:
\`\`\`
PORT=5000
MONGO_URI=mongodb://localhost:27017/carbon_tracker
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
NODE_ENV=development
\`\`\`

3. Make sure MongoDB is running on your system

4. Start the server:
\`\`\`bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Devices
- `POST /api/devices/add` - Add new device (protected)
- `GET /api/devices` - Get all user devices (protected)
- `GET /api/devices/total-emissions` - Get total emissions (protected)
- `DELETE /api/devices/:id` - Delete device (protected)

### Awareness Resources
- `GET /api/awareness/resources` - Get all resources (public)
- `POST /api/awareness/add` - Add new resource (protected)
- `DELETE /api/awareness/:id` - Delete resource (protected)

### Health Check
- `GET /api/health` - Server health check

## Features

- JWT Authentication
- Password hashing with bcrypt
- Input validation
- Error handling
- CORS enabled
- MongoDB integration with Mongoose
- Automatic emission calculations
- Seed data for awareness resources
