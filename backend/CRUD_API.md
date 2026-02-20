# CRUD API Endpoints

Base URL: `http://localhost:3000/api/crud`

## Authentication
All endpoints require authentication. Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Sales Data

### Create Sales Data
- **POST** `/sales`
- **Auth**: Admin, Analyst
- **Body**:
```json
{
  "date": "2024-01-15",
  "region": "North America",
  "category": "Electronics",
  "revenue": 15000,
  "units": 50,
  "target": 20000
}
```

### Get All Sales Data
- **GET** `/sales?page=1&limit=10&sort=-createdAt`
- **Auth**: All roles

### Get Sales Data by ID
- **GET** `/sales/:id`
- **Auth**: All roles

### Update Sales Data
- **PUT** `/sales/:id`
- **Auth**: Admin, Analyst

### Delete Sales Data
- **DELETE** `/sales/:id`
- **Auth**: Admin only

## Performance Metrics

### Create Performance Metric
- **POST** `/performance`
- **Auth**: Admin, Analyst
- **Body**:
```json
{
  "kpiName": "Conversion Rate",
  "value": 3.5,
  "unit": "%",
  "trend": "up",
  "change": 0.5
}
```

### Get All Performance Metrics
- **GET** `/performance?page=1&limit=10&sort=-timestamp`
- **Auth**: All roles

### Get Performance Metric by ID
- **GET** `/performance/:id`
- **Auth**: All roles

### Update Performance Metric
- **PUT** `/performance/:id`
- **Auth**: Admin, Analyst

### Delete Performance Metric
- **DELETE** `/performance/:id`
- **Auth**: Admin only

## User Metrics

### Create User Metric
- **POST** `/user-metrics`
- **Auth**: Admin, Analyst
- **Body**:
```json
{
  "date": "2024-01-15",
  "activeUsers": 1250,
  "newUsers": 85,
  "returningUsers": 1165,
  "churnRate": 2.3,
  "sessionDuration": 420
}
```

### Get All User Metrics
- **GET** `/user-metrics?page=1&limit=10&sort=-date`
- **Auth**: All roles

### Get User Metric by ID
- **GET** `/user-metrics/:id`
- **Auth**: All roles

### Update User Metric
- **PUT** `/user-metrics/:id`
- **Auth**: Admin, Analyst

### Delete User Metric
- **DELETE** `/user-metrics/:id`
- **Auth**: Admin only

## Users Management

### Create User
- **POST** `/users`
- **Auth**: Admin only
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Analyst"
}
```

### Get All Users
- **GET** `/users?page=1&limit=10&sort=-createdAt`
- **Auth**: Admin only

### Get User by ID
- **GET** `/users/:id`
- **Auth**: Admin only

### Update User
- **PUT** `/users/:id`
- **Auth**: Admin only

### Delete User
- **DELETE** `/users/:id`
- **Auth**: Admin only

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Query Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (default: -createdAt)
  - Use `-` prefix for descending order
  - Examples: `-createdAt`, `name`, `-revenue`