# 🚜 LC79 Tactical VMS
### World-Class Vehicle Management for Toyota Land Cruiser 7series

A rugged, high-fidelity platform designed for the LC79, localized for Sri Lanka and ready for global deployment.

## 🛡 Platform Architecture
- **Backend:** NestJS Microservices (Telemetry, OCR, Service Horizon).
- **Database:** PostgreSQL + TimescaleDB via Supabase.
- **Frontend:** Next.js 14 "Tactical Industrial" Dashboard.
- **Local-First:** Ready for offline use in remote Sri Lankan terrains.

## 🚀 Key Modules
1. **V-EYE OCR Scanner:** Digitize fuel receipts and circular Sri Lankan revenue licenses.
2. **Payload Scientist:** Interactive GVM calculator for LC79 curb weights and payload limits.
3. **Service Horizon AI:** Predictive maintenance algorithm that tracks corrugation/stress instead of just KM.
4. **Monsoon Mode:** Context-aware maintenance alerts for heavy rainfall seasons.
5. **Commander Overwatch:** Financial TCO tracking, cash burn, and fleet health score (RBAC restricted).

## 🛠 Setup & Launch

### 1. Database (Supabase)
Execute the migration script at `docs/migration.sql` in your Supabase SQL Editor.

### 2. Implementation
```bash
# Clone the repository
git clone https://github.com/GuraXLX/LC79.git

# Install Backend
cd backend
npm install
npm run start:dev

# Install Frontend
cd ../frontend
npm install
npm run dev
```

### 3. Localization Config
Update `.env` in both `/backend` and `/frontend` with your Supabase credentials provided in the configuration.

## 🎨 UI Aesthetics
- **Carbon Black (#121212):** Reducing glare for night-time navigation.
- **Heritage Red (#E11C21):** Immediate actionable feedback based on Toyota's heritage.
- **Glove Mode:** Touch target expansion for industrial use.

---
*Built for the legends who drive the 79.*
