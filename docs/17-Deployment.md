# 17 - Deployment

# StudyGenie Deployment Guide

> This document defines the deployment process for the StudyGenie application, including the frontend, backend, database, AI configuration, and production readiness checklist.

---

# 1. Deployment Architecture

```text
                Users
                   │
                   ▼
        Vercel (Next.js Frontend)
                   │
                   ▼
      Render / Railway (Express API)
                   │
          ┌────────┴────────┐
          ▼                 ▼
   MongoDB Atlas      Google Gemini API
```

The frontend communicates only with the backend API.

The backend communicates with MongoDB and the AI provider.

---

# 2. Production Stack

## Frontend

- Next.js
- Vercel

---

## Backend

- Node.js
- Express.js
- Render (Recommended)
- Railway (Alternative)

---

## Database

- MongoDB Atlas

---

## AI

- Google Gemini API

---

# 3. Deployment Order

Deploy in the following order:

```text
MongoDB Atlas

↓

Backend

↓

Frontend

↓

Production Testing
```

---

# 4. MongoDB Deployment

Steps:

1. Create a MongoDB Atlas cluster.
2. Create the `studygenie` database.
3. Configure a database user.
4. Whitelist the required IP addresses (or use secure network access rules).
5. Copy the MongoDB connection string.
6. Store it as `MONGODB_URI` in the backend environment variables.

---

# 5. Backend Deployment

Recommended platform:

- Render

Deployment steps:

1. Connect the GitHub repository.
2. Select the backend directory.
3. Install dependencies.
4. Build the TypeScript project.
5. Start the production server.
6. Configure all required environment variables.
7. Verify database connectivity.
8. Verify AI connectivity.

---

## Required Backend Environment Variables

```env
NODE_ENV=production

PORT=5000

CLIENT_URL=https://your-frontend-domain

MONGODB_URI=your_mongodb_connection_string

DATABASE_NAME=studygenie

BETTER_AUTH_SECRET=your_secure_secret

BETTER_AUTH_URL=https://your-backend-domain

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key

GEMINI_MODEL=gemini-2.5-flash
```

---

# 6. Frontend Deployment

Recommended platform:

- Vercel

Deployment steps:

1. Connect the GitHub repository.
2. Select the frontend directory.
3. Configure environment variables.
4. Deploy the project.
5. Verify API communication.

---

## Required Frontend Environment Variables

```env
NEXT_PUBLIC_APP_NAME=StudyGenie

NEXT_PUBLIC_APP_URL=https://your-frontend-domain

NEXT_PUBLIC_API_URL=https://your-backend-domain/api/v1

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Only public values should use the `NEXT_PUBLIC_` prefix.

---

# 7. CORS Configuration

Allow requests only from trusted frontend domains.

Development:

```text
http://localhost:3000
```

Production:

```text
https://your-frontend-domain
```

Do not allow unrestricted origins in production.

---

# 8. Build Commands

## Frontend

```bash
npm install
npm run build
npm start
```

---

## Backend

```bash
npm install
npm run build
npm run start
```

Ensure TypeScript compilation succeeds before deployment.

---

# 9. Health Check

Expose a simple endpoint to verify backend availability.

Example:

```text
GET /api/v1/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running."
}
```

This endpoint should not require authentication.

---

# 10. Production Checklist

Before going live, verify:

- Frontend loads correctly.
- Backend starts successfully.
- MongoDB connection is established.
- AI requests succeed.
- Authentication works.
- Google login works.
- Protected routes are secured.
- CRUD operations function correctly.
- Environment variables are configured.
- HTTPS is enabled.
- CORS is configured properly.

---

# 11. Post-Deployment Testing

Verify:

- User registration
- User login
- Google authentication
- Create study material
- View study material
- Delete study material
- AI Notes generation
- AI Tutor chat
- Dashboard statistics
- Analytics charts
- Search, filtering, and pagination

---

# 12. Logging & Monitoring

Monitor:

- Server startup
- API errors
- Authentication failures
- AI request failures
- Database connectivity
- Response times

Avoid logging:

- Passwords
- Session tokens
- API keys
- Sensitive user information

---

# 13. Backup Strategy

Database:

- Enable automated MongoDB Atlas backups.

Application:

- Keep the Git repository up to date.
- Tag production releases.
- Store environment variables securely.

---

# 14. Rollback Plan

If a deployment fails:

1. Revert to the previous stable Git commit.
2. Redeploy the last known working version.
3. Restore database backups only if data integrity is affected.
4. Verify application health before reopening access.

---

# 15. Performance Optimization

Production recommendations:

- Enable compression.
- Optimize images.
- Minify JavaScript and CSS.
- Use HTTP caching where appropriate.
- Implement pagination for large datasets.
- Optimize MongoDB indexes.

---

# 16. Security Checklist

Verify:

- HTTPS enabled.
- Strong Better Auth secret.
- Secrets stored securely.
- Input validation enabled.
- Rate limiting enabled.
- Secure HTTP headers configured.
- CORS restricted.
- Authorization checks enforced.
- No sensitive data exposed in logs or responses.

---

# 17. Future Deployment Enhancements

The deployment architecture supports future additions, including:

- Docker containers
- CI/CD pipelines (GitHub Actions)
- Redis caching
- Background job processing
- CDN integration
- Multiple deployment environments (development, staging, production)
- Monitoring and alerting tools

These enhancements can be added without major architectural changes.

---

# 18. Definition of Successful Deployment

StudyGenie is successfully deployed when:

- The frontend is publicly accessible.
- The backend API is reachable and healthy.
- MongoDB is connected.
- AI features work correctly.
- Authentication and authorization function properly.
- All production environment variables are configured.
- The application passes the production testing checklist.
- Users can use the platform securely and reliably from end to end.
