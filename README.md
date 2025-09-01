<img width="1880" height="908" alt="Screenshot 2025-08-28 191717" src="https://github.com/user-attachments/assets/03a91953-a032-4104-9b3d-074d049ebcfd" /># NoteTaker - Full-Stack Note-Taking Application

A modern, responsive note-taking application built with html,css and javascript featuring email/OTP authentication, Google OAuth, and real-time note management.

## 🚀 Features

- **User Authentication**
  - Email/Password registration with OTP verification
  - Google OAuth integration
  - JWT-based session management
  - Secure password hashing

- **Note Management**
  - Create, read, and delete notes
  - Real-time updates
  - User-specific note storage
  - Rich text support

- **Modern UI/UX**
  - Responsive design (mobile-first)
  - Clean, modern interface
  - Loading states and error handling
  - Toast notifications

## 🛠 Technology Stack

### Frontend
- **React 18+** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **CSS Modules** for styling
- **React Context** for state management

### Backend
- **Node.js** with TypeScript
- **NestJS** framework
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Class Validator** for input validation

### Database Options
- **PostgreSQL** with TypeORM
- **MongoDB** with Mongoose
- **MySQL** with TypeORM

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** for testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- **Database**: PostgreSQL, MongoDB, or MySQL

## 🏗 Project Structure

```
note-taking-app/
├── client/                 # React TypeScript Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Notes/
│   │   │   └── Common/
│   │   ├── pages/         # Page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useNotes.ts
│   │   │   └── useFormValidation.ts
│   │   ├── services/      # API service calls
│   │   │   ├── authService.ts
│   │   │   ├── notesService.ts
│   │   │   └── apiClient.ts
│   │   ├── types/         # TypeScript interfaces
│   │   │   ├── auth.types.ts
│   │   │   ├── notes.types.ts
│   │   │   └── api.types.ts
│   │   ├── utils/         # Utility functions
│   │   │   ├── validation.ts
│   │   │   ├── localStorage.ts
│   │   │   └── dateHelpers.ts
│   │   ├── contexts/      # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── NotesContext.tsx
│   │   ├── styles/        # CSS files
│   │   │   ├── globals.css
│   │   │   └── components/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── server/                # NestJS TypeScript Backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   └── dto/
│   │   ├── notes/         # Notes module
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── users/         # Users module
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── database/      # Database configuration
│   │   │   ├── migrations/
│   │   │   └── config/
│   │   ├── common/        # Shared utilities
│   │   │   ├── guards/
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   └── interceptors/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/              # Test files
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── docs/                  # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
├── .gitignore
├── README.md
└── docker-compose.yml     # Optional Docker setup
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Darshan-M-A/Notevault
cd note-taking-app
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Required Environment Variables (.env):**

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/notetaker"
# OR for MongoDB
MONGODB_URI="mongodb://localhost:27017/notetaker"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
JWT_EXPIRES_IN="7d"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration (Optional)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Server Configuration
PORT=3001
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```

### 3. Database Setup

**For PostgreSQL:**
```bash
# Install PostgreSQL and create database
createdb notetaker

# Run migrations
npm run migration:run
```

**For MongoDB:**
```bash
# Install MongoDB and start service
# Database and collections will be created automatically
```

**For MySQL:**
```bash
# Install MySQL and create database
mysql -u root -p
CREATE DATABASE notetaker;

# Run migrations
npm run migration:run
```

### 4. Start Backend Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend server will start on `http://localhost:3001`

### 5. Frontend Setup

```bash
# Navigate to client directory (new terminal)
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit environment file
nano .env.local
```

**Frontend Environment Variables (.env.local):**

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### 6. Start Frontend Application

```bash
# Development mode
npm start

# Build for production
npm run build
```

The frontend application will start on `http://localhost:3000`

## 🧪 Testing

### Backend Testing

```bash
cd server

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Frontend Testing

```bash
cd client

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🏗 Building for Production

### Backend Build

```bash
cd server

# Build the application
npm run build

# Start production server
npm run start:prod
```

### Frontend Build

```bash
cd client

# Build for production
npm run build

# The build files will be in the 'build' directory
# Serve with any static file server
```

## 🚀 Deployment

### Backend Deployment Options

#### 1. Railway (Recommended)

1. Create account on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

#### 2. Render

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build and start commands:
   ```
   Build: npm install && npm run build
   Start: npm run start:prod
   ```

#### 3. Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set DATABASE_URL=your-database-url

# Deploy
git push heroku main
```

### Frontend Deployment Options

#### 1. Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

#### 2. Netlify

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to [Netlify](https://netlify.com)
3. Set environment variables in Netlify dashboard

#### 3. AWS S3 + CloudFront

```bash
# Install AWS CLI
npm install -g @aws-amplify/cli

# Configure and deploy
amplify configure
amplify init
amplify add hosting
amplify publish
```

## 🔧 Configuration

### TypeScript Configuration

**Backend (server/tsconfig.json):**
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

**Frontend (client/tsconfig.json):**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 📝 Available Scripts

### Backend Scripts

```json
{
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "build": "nest build",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:e2e": "jest --config ./test/jest-e2e.json",
  "migration:generate": "npm run typeorm -- migration:generate",
  "migration:run": "npm run typeorm -- migration:run",
  "migration:revert": "npm run typeorm -- migration:revert",
  "typeorm": "typeorm-ts-node-commonjs"
}
```

### Frontend Scripts

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "test:coverage": "react-scripts test --coverage --watchAll=false",
  "eject": "react-scripts eject",
  "lint": "eslint src --ext .ts,.tsx",
  "lint:fix": "eslint src --ext .ts,.tsx --fix",
  "format": "prettier --write src/**/*.{ts,tsx,css,md}"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port 3001
   lsof -i :3001
   # Kill the process
   kill -9 <PID>
   ```

2. **Database connection failed**
   - Check database is running
   - Verify connection string in `.env`
   - Check firewall settings

3. **JWT token invalid**
   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify token format

4. **CORS errors**
   - Check CLIENT_URL in backend `.env`
   - Verify CORS configuration in main.ts

5. **Build fails**
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall: `npm install`
   - Check TypeScript errors

### Debug Mode

**Backend:**
```bash
npm run start:debug
```

**Frontend:**
```bash
# Add to package.json
"start:debug": "REACT_APP_DEBUG=true npm start"
```

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique JWT secrets
   - Rotate secrets regularly

2. **Authentication**
   - Implement rate limiting
   - Use HTTPS in production
   - Validate all inputs
   - Hash passwords with bcrypt

3. **Database Security**
   - Use connection pooling
   - Implement query parameterization
   - Regular security updates

## 📈 Performance Optimization

1. **Backend**
   - Use caching (Redis)
   - Optimize database queries
   - Implement compression
   - Use clustering

2. **Frontend**
   - Code splitting
   - Lazy loading
   - Optimize images
   - Use React.memo for components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow

1. **Setup development environment**
   ```bash
   npm run dev:setup
   ```

2. **Run tests before committing**
   ```bash
   npm run test:all
   ```

3. **Follow coding standards**
   - Use ESLint and Prettier
   - Write tests for new features
   - Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing backend framework
- [React](https://reactjs.org/) for the frontend library
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Material-UI](https://mui.com/) for UI components inspiration

## 📞 Support

If you have any questions or issues, please:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search [existing issues](https://github.com/your-username/note-taking-app/issues)
3. Create a [new issue](https://github.com/your-username/note-taking-app/issues/new)

## 🗺 Roadmap

- [ ] Real-time collaboration
- [ ] Rich text editor
- [ ] File attachments
- [ ] Tags and categories![Uploading Screenshot 2025-08-28 191827.png…]()

- [ ] Search functionality
- [ ] Export options (PDF, Markdown)
- [ ] Mobile app (React Native)
- [ ] Offline support
- [ ] Dark mode
- [ ] Multi-language support

---

**Happy Coding! 🎉**

<img width="1862" height="869" alt="Screenshot 2025-08-28 180151" src="https://github.com/user-attachments/assets/d60cf7b5-622f-4812-9df2-2cf0d00b3bb1" />
<img width="1<img width="1826" height="844" alt="Screenshot 2025-08-28 191838" src="https://github.com/user-attachments/assets/803075cb-6358-49bc-9d19-5b592d82b0d6" />
<img width="1883" height="891" alt="Screenshot 2025-08-28 191850" src="https://github.com/user-attachments/assets/ac2e90ec-95c2-45cf-b156-8f49720a577f" />
<img width="1655" height="824" alt="Screenshot 2025-08-28 180122" src="https://github.com/user-attachments/assets/34139946-100a-461f-8580-ede475054f72" />
<img width="1782" height="886" alt="Screenshot 2025-08-28 180138" src="https://github.com/user-attachments/assets/bd5df6e1-ef42-4929-981c-115e8d9861d8" />
<img width="908" height="912" alt="Screenshot 2025-08-28 191706" src="https://github.com/user-attachments/assets/d5d1e156-530a-4871-8859-e8974c1bbeb5" />


