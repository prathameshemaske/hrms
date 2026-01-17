
## Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd hrms-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in `hrms-backend/` with the following:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/hrms
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd hrms-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in `hrms-frontend/` with the following:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Login
- **Admin**: [EMAIL_ADDRESS] / admin123
- **Employee**: [EMAIL_ADDRESS] / employee123

### Key Features

#### Admin Dashboard
- Manage employees
- Run payroll
- View attendance reports
- Generate Form-16
- Manage leave applications

#### Employee Dashboard
- View personal information
- View payslips
- Apply for leave
- View attendance
- Download Form-16

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Payroll
- `POST /api/payroll/run` - Run payroll for a month
- `GET /api/payroll/payslips/:month/:year` - Get payslips
- `POST /api/payroll/lock/:month/:year` - Lock payroll

### Leave
- `GET /api/leave/applications` - Get leave applications
- `POST /api/leave/applications` - Apply for leave
- `PUT /api/leave/applications/:id/approve` - Approve leave
- `PUT /api/leave/applications/:id/reject` - Reject leave

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Documents
- `GET /api/documents/form16/:employeeId/:year` - Generate Form-16
- `GET /api/documents/payslip/:employeeId/:month/:year` - Get payslip

## Development

### Running Both Servers

1. Start backend:
   ```bash
   cd hrms-backend
   npm run dev
   ```

2. Start frontend:
   ```bash
   cd hrms-frontend
   npm run dev
   ```

### Database Migrations

To create or update database tables:
```bash
cd hrms-backend
npm run migrate
```

## Production

### Build
cd hrms-frontend
npm run build