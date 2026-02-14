### 1️⃣ User Action (Frontend)

- User adds a Route
- User selects two routes to compare
- User performs Banking or Pooling operation
- User views Compliance Balance (CB)

Frontend sends API requests to backend using REST APIs.

---

### 2️⃣ Backend Processing

Backend receives request through Express routes.

Processing includes:

- Compliance Balance (CB) calculation
- Validation rules
- Banking logic implementation
- Pooling logic implementation
- Edge case handling (e.g., negative CB)

All calculations follow Fuel EU Maritime Regulation (EU 2023/1805).

---

### 3️⃣ Compliance Balance (CB) Logic

CB is calculated based on:
- Fuel consumption
- Emission factors
- Regulatory constants

If CB > 0 → Surplus
If CB < 0 → Deficit
If CB = 0 → Balanced

---

### 4️⃣ Banking Logic

If a route has positive CB:
- Surplus can be banked for future use
- Stored in system for later compliance adjustment

If CB is negative:
- Banking is not allowed

---

### 5️⃣ Pooling Logic

Pooling allows:
- Combining CB from multiple routes
- Surplus from one route can offset deficit of another
- System recalculates final compliance status

Validation ensures:
- No invalid pooling
- No incorrect surplus usage

---

### 6️⃣ Database Layer

Prisma ORM is used.

Data stored:
- Routes
- Fuel details
- Emission values
- Compliance Balance
- Banking status
- Pooling status

---

### 7️⃣ Architecture Structure

Frontend (React)
        ↓
REST API Calls
        ↓
Backend (Node.js + Express)
        ↓
Business Logic Layer
        ↓
Prisma ORM
        ↓
Database

---

## Technologies Used

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM

### Database
- SQL Database (via Prisma)

---

## Testing Scenarios Covered

✔ Add Route  
✔ Compare Routes  
✔ Banking Logic  
✔ Pooling Logic  
✔ Negative CB Edge Case
