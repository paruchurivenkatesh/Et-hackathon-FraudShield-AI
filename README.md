# FraudShield AI - Digital Public Safety Intelligence Platform

## Overview

FraudShield AI is an enterprise-grade AI-powered web application developed for the ET AI Hackathon 2026. The main purpose of this project is to detect, prevent, analyze, and report digital scams, specifically focusing on the theme of "Digital Public Safety: Defeating Counterfeiting, Fraud & Digital Arrest Scams".

When the system processes digital interactions (like phone calls, websites, or currency notes), it utilizes advanced AI heuristics to immediately detect psychological coercion, government impersonation, and fraudulent anomalies to protect citizens in real-time.

This project serves as a comprehensive dashboard for Citizens, Police, Cyber Crime Departments, and Financial Institutions to monitor and thwart organized cybercrime rings.

---

## Features

* **Citizen Fraud Shield:** Upload suspected fake SMS, URLs, or documents for instant AI scanning.
* **Digital Arrest Detection:** Real-time audio/video transcript analysis detecting fear tactics and payment pressure.
* **Counterfeit Currency Analysis:** Simulated computer vision scanning of currency notes for security thread and microprint verification.
* **Fraud Network Intelligence:** Interactive 2D graph visualizing connections between mule accounts, IP addresses, and phone numbers.
* **Live Global Threat Feed:** Real-time monitoring of incoming threats across multiple sectors.
* **Cyberpunk Command Center UI:** A fully responsive, dark-mode glassmorphic dashboard.

---

## Technologies Used

* **Frontend:** Next.js 14, React, Tailwind CSS, ShadCN UI, Framer Motion
* **Mapping & Graphs:** React Leaflet, React Force Graph 2D, Recharts
* **Backend:** Python, FastAPI, Uvicorn
* **Icons:** Lucide React

---

## Project Structure

Et-hackathon-FraudShield-AI/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── citizen-shield/
│   │   │   │   └── page.tsx
│   │   │   ├── counterfeit/
│   │   │   │   └── page.tsx
│   │   │   ├── digital-arrest/
│   │   │   │   └── page.tsx
│   │   │   ├── heatmap/
│   │   │   │   └── page.tsx
│   │   │   ├── live/
│   │   │   │   └── page.tsx
│   │   │   ├── network/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Shell.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Topbar.tsx
│   │   │   ├── ui/
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── tabs.tsx
│   │   │   ├── MapComponent.tsx
│   │   │   └── NetworkGraph.tsx
│   │   └── lib/
│   │       └── utils.ts
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
---

## Installation

1. Clone the repository:
```bash
git clone <your-github-repository-link>
```

2. Move into the project folder:
```bash
cd Et-hackathon-FraudShield-AI
```

---

## Running the Project

Follow the steps below to run the FraudShield AI System on your computer. You will need to start both the Backend API and the Frontend Server in separate terminal windows.

### Step 1: Open the Project Folder

Open VS Code and navigate to the project folder:

```bash
cd Et-hackathon-FraudShield-AI
```

### Step 2: Install Required Dependencies

**For the Backend (Python/FastAPI):**
Open a terminal at the project root (`Et-hackathon-FraudShield-AI`) and run:
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
# OR: source venv/bin/activate  # On macOS/Linux

pip install fastapi uvicorn pydantic python-multipart
```

**For the Frontend (Next.js):**
Open a **new** terminal window at the project root (`Et-hackathon-FraudShield-AI`) and run:
```bash
cd frontend
npm install
```

### Step 3: Run the Application

Execute the following commands in their respective terminals:

**Start the Backend Server (Terminal 1):**
```bash
# Assuming you are still in the backend folder with the venv activated
uvicorn main:app --reload
```

**Start the Frontend Server (Terminal 2):**
```bash
# Assuming you are still in the frontend folder
npm run dev
```

### Step 4: Start Monitoring

After running the program:

* Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.
* The interactive Command Center dashboard will open automatically.
* You can navigate through the sidebar to use the Citizen Shield, view the Crime Heatmap, track Live Intelligence, and detect Digital Arrest scenarios.

### Using the Platform

* **Digital Arrest:** Navigate to `/digital-arrest` to simulate live audio/video tracking of a scam call.
* **Fraud Network:** Navigate to `/network` to interact with a visual graph of active cybercrime networks.
* **Settings:** Access `/settings` via the top-right profile avatar to configure mock AI sensitivity thresholds.

---

## How It Works

The system utilizes a modern frontend shell (Next.js) coupled with a scalable Python backend (FastAPI). 

When a user submits evidence (audio, image, text, or URL), the frontend relays the data to the backend. The backend simulates processing using Natural Language Processing (NLP) heuristics and Computer Vision (CV) guidelines based on RBI standards. 

Once the threat vectors are identified:
* A detailed risk report and probability score are calculated.
* Visual warnings (such as "DROWSINESS ALERT" in similar systems, or here, "CRITICAL RISK") appear on the screen.
* The system logs the incident into the live Global Threat feed.

---

## Challenges Faced

During development, integrating complex visual libraries like `react-force-graph-2d` and `react-leaflet` into a Server-Side Rendered (SSR) environment like Next.js required dynamic imports to prevent window hydration errors. Additionally, establishing a cohesive, futuristic cyberpunk design aesthetic required careful implementation of CSS variables and backdrop filters to ensure high performance without sacrificing visual quality.

---

## Future Improvements

* Real integration with LLMs (e.g., Llama 3) for live transcript analysis.
* Implementing YOLOv8 for actual counterfeit note computer vision detection.
* Connecting the Live Threat Feed to actual WebSocket streams.
* Integrating real police and banking APIs.
* Native mobile application development for citizen reporting.

---

## Conclusion

This project demonstrates the powerful intersection of modern web development and AI in solving critical public safety issues. It highlights how technology can be leveraged by law enforcement and financial institutions to dismantle digital arrest scams and counterfeit operations before victims lose their life savings.

---

## Author & Team

- Paruchuri Venkatesh
- Katta.S.V.S Kalyan
- Thota Shanmukh Vaghu Vamsi
