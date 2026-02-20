# Interactive Data Visualization Dashboard - Backend API

## 🚀 Features

- **JWT Authentication** with role-based access control
- **MongoDB** with Mongoose ODM
- **RESTful APIs** with filtering, pagination, and sorting
- **Real-time updates** with Socket.io
- **CSV export** functionality
- **Rate limiting** and security middleware
- **Input validation** with express-validator
- **Error handling** with custom middleware
- **Seed data** script for development

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── dashboardController.js # Dashboard data
│   └── analyticsController.js # Analytics endpoints
├── middleware/
│   ├── auth.js             # JWT authentication
│   ├── errorHandler.js     # Error handling
│   └── rateLimiter.js      # Rate limiting
├── models/
│   ├── User.js             # User model
│   ├── SalesData.js        # Sales data model
│   ├── UserMetrics.js      # User metrics model
│   └── PerformanceMetrics.js # Performance KPIs
├── routes/
│   ├── auth.js             # Auth routes
│   ├── dashboard.js        # Dashboard routes
│   └── analytics.js        # Analytics routes
├── scripts/
│   └── seedData.js         # Database seeding
└── server.js               # Main server file
```

## 🛠 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Create `.env` file with:
   ```
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Seed database:**
   ```bash
   npm run seed
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Dashboard
- `GET /api/dashboard/kpis` - Get KPI metrics
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/trends` - Get trend analysis

### Analytics
- `GET /api/analytics/sales` - Sales data with filters
- `GET /api/analytics/users` - User metrics
- `GET /api/analytics/performance` - Performance metrics
- `GET /api/analytics/export/sales` - Export sales data as CSV

## 🔐 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

### Roles
- **Admin**: Full access to all endpoints
- **Analyst**: Access to analytics and dashboard data
- **Viewer**: Read-only access to dashboard

## 📈 Query Parameters

### Filtering
- `startDate` & `endDate` - Date range filter
- `region` - Filter by region
- `category` - Filter by category
- `kpiName` - Filter performance metrics

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Sorting
- `sortBy` - Field to sort by
- `sortOrder` - 'asc' or 'desc'

## 🔄 Real-time Updates

Socket.io connection for real-time dashboard updates:
```javascript
const socket = io('http://localhost:3000');
socket.on('dataUpdate', (data) => {
  // Handle real-time updates
});
```

## 📝 Sample Requests

### Register User
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Analyst"
}
```

### Get Sales Analytics
```bash
GET /api/analytics/sales?region=North America&startDate=2024-01-01&endDate=2024-12-31&page=1&limit=10
```

### Export CSV
```bash
GET /api/analytics/export/sales
```

## 🛡 Security Features

- **Helmet.js** for security headers
- **Rate limiting** (5 auth attempts, 100 API requests per 15 min)
- **CORS** configuration
- **Input validation** with express-validator
- **Password hashing** with bcryptjs
- **JWT token** authentication

## 📊 Database Models

### User
- name, email, password, role, timestamps

### SalesData
- date, region, category, revenue, units, target, timestamps

### UserMetrics
- date, activeUsers, newUsers, returningUsers, churnRate, sessionDuration

### PerformanceMetrics
- kpiName, value, unit, trend, change, timestamp

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use process manager like PM2
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates
5. Configure MongoDB Atlas for production

## 📋 Default Admin User

After seeding:
- **Email**: admin@dashboard.com
- **Password**: admin123
- **Role**: Admin