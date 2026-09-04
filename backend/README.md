# NAVIX Campus Navigator - REST API Backend 🧭⚡

Node.js & Express REST API backend for the **NAVIX Campus Navigator** web application.

---

## 📋 API Endpoints

Base URL: `http://localhost:5001`

### 1. Health Check
- **`GET /api/health`**
- Returns service status, uptime, and metadata.
- **Example Response:**
  ```json
  {
    "status": "ok",
    "service": "snist-campus-navigator-api",
    "version": "1.0.0",
    "timestamp": "2026-09-04T18:15:00.000Z",
    "uptime": 12,
    "environment": "development"
  }
  ```

---

### 2. Campus Locations
- **`GET /api/locations`**
  - Query parameter: `?category=academic|labs|classrooms|library|canteens|hostels|sports|facilities` (optional)
  - Returns all campus locations and category lists.
- **`GET /api/locations/:id`**
  - Returns details for a single campus location by ID (e.g. `titanic-block`, `central-library`).
  - Returns `404 Not Found` if the building ID does not exist.
- **`GET /api/locations/search?q=library`**
  - Searches campus locations matching name, category, departments, and tags.

---

### 3. Route Calculation
- **`POST /api/routes`**
- **Request Body:**
  ```json
  {
    "startId": "main-gate",
    "destId": "titanic-block"
  }
  ```
- **Example Response:**
  ```json
  {
    "success": true,
    "data": {
      "sameLocation": false,
      "distanceMeters": 280,
      "walkTimeMinutes": 4,
      "direction": "North (towards upper academic quad)",
      "steps": [
        {
          "title": "Depart from Main Gate",
          "desc": "Exit the main doorway of Main Gate and take the paved pedestrian walkway.",
          "landmark": "Near Main Gate"
        },
        {
          "title": "Pass Central Entrance Fountain & Admin Quadrangle",
          "desc": "Walk straight past security along the palm-lined main avenue towards the central rotary.",
          "landmark": "Palm Avenue & Fountain"
        },
        {
          "title": "Approach Titanic Block plaza",
          "desc": "Head North. The distinctive ship-shaped bow of the Titanic Block is straight ahead.",
          "landmark": "Titanic Main Plaza"
        },
        {
          "title": "Enter Titanic Block Ground Floor",
          "desc": "Enter through the central glass entrance. Elevators and main stairs are located in the lobby atrium.",
          "landmark": "Titanic Atrium"
        }
      ],
      "fresherTip": "First-year programming labs are located on the 1st floor North wing...",
      "accessibility": "Paved wheelchair accessible ramps available at both buildings"
    }
  }
  ```

---

### 4. AI-Powered Personalized Directions
- **`POST /api/ai/directions`**
- **Request Body:**
  ```json
  {
    "startId": "first-year-block",
    "destId": "central-library",
    "preferences": {
      "avoidStairs": false,
      "needElevator": true,
      "isRaining": false
    }
  }
  ```
- **Response:** Returns tailored student guidance, shortcut recommendations, weather accommodations, and fresher survival tips.

---

## ⚙️ Environment Variables

Configuration is loaded from `.env`:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port for the Express REST API server |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`) |
| `CORS_ORIGIN` | `http://localhost:5173,...` | Allowed CORS origins for the frontend |
| `GEMINI_API_KEY` | *(empty)* | Optional Gemini API key for dynamic AI navigation reasoning |

---

## 🚀 How to Run the Backend

### Method 1: Using `start-backend.sh` (Recommended)

From the project root:
```bash
cd backend
./start-backend.sh
```

### Method 2: Using standard npm

```bash
cd backend
npm start
```

For live auto-reloading during development:
```bash
npm run dev
```

## Complete API

The backend uses MongoDB through Mongoose when `MONGODB_URI` is set. Without it, public location and route reads plus development auth/feedback use an in-memory fallback so the existing frontend remains runnable.

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/locations`, `/api/locations/:id` | Public |
| GET | `/api/search?q=library` or `/api/locations/search?q=library` | Public |
| POST | `/api/locations` | Admin JWT |
| PUT/DELETE | `/api/locations/:id` | Admin JWT |
| GET | `/api/routes?from=main-gate&to=titanic-block` | Public |
| POST | `/api/routes` with `{ "startId", "destId" }` | Public |
| POST | `/api/auth/register`, `/api/auth/login` | Public |
| GET | `/api/auth/me` | User JWT |
| POST | `/api/feedback` | User JWT |
| GET/PUT | `/api/feedback`, `/api/feedback/:id` | Admin JWT |
| GET/POST | `/api/map/nodes`, `/api/map/paths` | Admin JWT |
| GET | `/api/admin/users` | Admin JWT |

All responses use `{ "success": true, "data": ... }` or `{ "success": false, "message": "..." }`.

## MongoDB Setup

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL`.
2. Start MongoDB locally or use a MongoDB Atlas connection string.
3. Run `cd backend && npm run seed`. The seed creates the editable campus locations, map building nodes, and an admin account controlled by `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.
4. Start the API with `npm start` and the existing frontend with `./start.sh`.

The browser bundle now loads locations from `/api/locations` and route results from `/api/routes`; if the API is unavailable, it retains the existing local route calculation as a graceful offline fallback.
