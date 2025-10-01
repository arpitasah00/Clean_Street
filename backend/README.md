# Backend

API server for Clean Street, built with Express + MongoDB.

## Quick start

1. cd backend
2. npm install
3. Create a `.env` file (see below)
4. npm run dev

Server runs at http://localhost:4000 by default (see frontend/vite proxy).

## Environment variables (.env)

Required:

- PORT=4000
- MONGO_URI=mongodb://localhost:27017/clean_street
- JWT_SECRET=your-secret

ImageKit (for media uploads):

- IMAGEKIT_PUBLIC_KEY=pk_...
- IMAGEKIT_PRIVATE_KEY=sk_...
- IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your_id>

If ImageKit keys are missing, the photo upload endpoint will return 500 (not configured).

## Uploads

- Profile photos are uploaded directly to ImageKit using multer memory storage; no files are written to disk.
- The legacy `uploads/` folder has been removed. Frontend should use the URL returned by the API.

Endpoint: `POST /api/users/me/photo`

- Auth: Bearer token required
- Form field: `photo` (file)
- Response: `{ url, user }` where `url` is the public ImageKit URL and `user.profile_photo` is updated.
