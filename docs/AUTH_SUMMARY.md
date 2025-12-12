# TaskFlow Pro Backend – Auth & Database Setup Summary

## Overview
This document summarizes the authentication features and database configuration implemented in the NestJS + Prisma backend.

## Database Configuration
- Environment file: `.env`
  - **DATABASE_URL**: Supabase pooler (port 6543) with `pgbouncer=true&sslmode=require`
  - **DIRECT_URL**: Supabase direct host (port 5432) with `sslmode=require`
- Prisma 7 configuration: `prisma.config.ts`
  - `schema`: `prisma/schema.prisma`
  - `migrations.path`: `prisma/migrations`
  - `migrations.seed`: `ts-node prisma/seed.ts`
- Seeding: `prisma/seed.ts` inserts Admin/Member users, projects, labels, tasks, subtasks, comments, attachments, notifications.

## Prisma Service
- File: `src/prisma/prisma.service.ts`
- Uses `@prisma/adapter-pg` for PostgreSQL driver.
- Loads `.env` via `main.ts` (`dotenv/config`), and sets `NODE_TLS_REJECT_UNAUTHORIZED='0'` to bypass self-signed cert issues when connecting to the Supabase pooler on Windows.

## Auth Module
- Files:
  - Module: `src/auth/auth.module.ts`
  - Controller: `src/auth/auth.controller.ts`
  - Service: `src/auth/auth.service.ts`
  - Strategy: `src/auth/strategies/jwt.strategy.ts`
  - Guards: `src/auth/guards/jwt-auth.guard.ts`, `src/auth/guards/role.guard.ts`
  - Decorator: `src/auth/decorators/roles.decorator.ts`
  - DTOs: `src/auth/dto/login.dto.ts`, `src/auth/dto/register.dto.ts`, `src/auth/dto/auth-response.dto.ts`
- Features:
  - Register: Creates `USER` with hashed password (bcrypt) and validation via `class-validator`.
  - Login: Validates credentials; returns JWT with `sub`, `email`, `role`.
  - JWT Strategy: Validates token; loads user and ensures `isActive`.
  - Guards: `JwtAuthGuard` for authentication; `RoleGuard` for role-based access using `@Roles(UserRole.ADMIN)`.
  - Endpoints:
    - `POST /auth/register`
    - `POST /auth/login`
    - `GET /auth/me` (JWT required)
    - `GET /auth/admin-only` (JWT + ADMIN role required)

## Server Setup
- File: `src/main.ts`
- Loads `.env` with `dotenv/config`.
- Adds global `ValidationPipe` (whitelist + forbidNonWhitelisted).
- Starts on `PORT` (default 3000), logs server URL.

## Testing
### Start server
```bash
npm run start:dev
```

### Seed database (already done)
```bash
# If needed
set NODE_TLS_REJECT_UNAUTHORIZED=0
npx ts-node --skip-project prisma/seed.ts
```

### Postman payloads
- Register:
```
POST http://localhost:3000/auth/register
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```
- Login (seeded admin):
```
POST http://localhost:3000/auth/login
Content-Type: application/json
{
  "email": "admin@taskflow.dev",
  "password": "Password123!"
}
```
- Me:
```
GET http://localhost:3000/auth/me
Authorization: Bearer <accessToken>
```
- Admin-only:
```
GET http://localhost:3000/auth/admin-only
Authorization: Bearer <accessToken>
```

## Next Steps (Optional Enhancements)
- Refresh token flow + logout
- Password reset + email verification
- Rate limiting for `/auth/login`
- CORS + helmet hardening
- ConfigModule for validated env management
- Consistent error response interceptor

## Seed Accounts
- Admin: `admin@taskflow.dev` / `Password123!`
- Member: `member@taskflow.dev` / `Password123!`
