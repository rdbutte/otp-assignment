# OTP Verification API (Angular Compatible)

## Features
- Send OTP
- Verify OTP
- JWT Authentication
- Angular Frontend Compatible (CORS enabled)
- Node.js Backend

## Run Backend
```
npm install
npm run dev
```

## API
POST /api/auth/send-otp
POST /api/auth/verify-otp

## Notes
- Angular runs on http://localhost:4200
- Backend runs on http://localhost:5000
- CORS configured accordingly
- OTP expires in 2 minutes
- Token returned on success
