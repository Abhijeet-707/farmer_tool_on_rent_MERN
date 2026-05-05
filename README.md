# 🚜 Farmer Tool on Rent - MERN Framework

A dynamic, localized, and full-stack agritech platform designed specifically to bridge the communication and transaction gap between farmers and agricultural equipment providers. The entire application is natively built and operated in **Gujarati**, optimizing accessibility for local farmers.

## 🌟 Key Features

### For Farmers (ખેડૂતો માટે)
*   **Localized Interface**: Entire platform messaging natively mapped in standard Gujarati.
*   **Dynamic Inventory**: Browse heavy agricultural machines like Tractors, Seed Sowers, Threshers, and Pruning tools updated live by active Admins.
*   **Real-time Bookings**: Book tools instantly by specifying desired dates, duration (in hours), and your delivery address/village.
*   **Booking Logic Grid**: Monitor all rental requests alongside auto-updating dynamic approval statuses (Pending, Accepted, Rejected).
*   **Algorithmic Popularity**: Discover the most heavily rented equipment—autonomously calculated and promoted by the backend routing database.

### For Administrators (એડમિન)
*   **Analytics Dashboard**: Visual charting and numerical data aggregation displaying real-time total bookings, tools, and farmer network volume.
*   **Tool Management Hub**: Full CRUD (Create, Read, Update, Delete) controls. Upload images safely, specify unique equipment categories, dictate precise geographic locations, and flexibly adjust per-hour rent.
*   **Workflow Engine**: Quickly process incoming farmer requests directly mapped with live delivery pin locations. Accept or Reject massive tool demands via a streamlined grid flow.

## 🛠️ Technology Stack

*   **Frontend Ecosystem**: React.js (Vite compiler), Tailwind CSS, React-Router-DOM, Lucide Icons.
*   **Backend Engineering**: Node.js runtime, Express.js API mapping layer.
*   **Database Management**: PostgreSQL.
*   **Network Protocol**: Native Axios implementation securely communicating localized endpoints.

## 📂 Project Structure

```text
📦 farmer_tool_on_rent_MERN
 ┣ 📂 backend
 ┃ ┣ 📂 db
 ┃ ┃ ┗ 📜 connectionobj.js      # PostgreSQL Global Pool Object
 ┃ ┣ 📂 queries
 ┃ ┃ ┗ 📜 dboperations.js       # Centralized REST Functions & SQL Aggregation
 ┃ ┣ 📜 index.js                # Core Express API Port Mapping
 ┃ ┗ 📜 initDb.js               # Autonomous Relational Table Creation Script
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components            # Modular JSX Blocks (Navbars, Heroes, Footers)
 ┃ ┃ ┣ 📂 pages                 # Full Core Interfaces (Admin/Farmer Role Gateways)
 ┃ ┃ ┣ 📜 App.jsx               # React Native Router DOM Engine Structure
 ┃ ┃ ┗ 📜 index.css             # Tailwind Root Injection
 ┃ ┣ 📜 tailwind.config.js      # Global Native Theming Properties
 ┃ ┗ 📜 vite.config.js          # Fast Build Logic Server
 ┗ 📜 README.md
```

## 🚀 Getting Started Locally

Follow these steps to deploy and test the entire ecosystem onto your own machine.

### 1. Prerequisites
*   [Node.js](https://nodejs.org/en) installed globally.
*   **PostgreSQL** active server installed on your system. 

### 2. Database Assembly
Ensure you have created an empty database labeled **`farmer_tool_rent`** dynamically mapping standard localhost settings (like `postgres` user at port `5432`). Ensure you adapt `./backend/db/connectionobj.js` with your distinct Postgres password.

Navigate into the backend and forcibly mount the tables:
```bash
cd backend
npm install
node initDb.js 
```
*(This will construct all internal keys, `users`, `tools`, and `bookings` schemas automatically into your pgAdmin).*

### 3. Mount Backend Server
While remaining in the `backend` folder:
```bash
npm start
```
*API processes background at `http://localhost:5000`*

### 4. Mount Frontend Interface
Open a completely new shell or terminal prompt:
```bash
cd frontend
npm install
npm run dev
```
*Vite compiles interface live at `http://localhost:5173`*

---
🔒 **Admin Navigation**: When verifying workflows, bypass standard farmer authentication by heading to `/admin-login` and using default creds: `admin` / `admin123`.