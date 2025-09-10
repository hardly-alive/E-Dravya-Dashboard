# Dravyasense – AI-Powered Herbal Purity Analysis

*A real-time, AI-driven platform for detecting herbal adulteration using IoT sensor data.*

Dravyasense is a **full-stack solution** developed during the **Smart India Hackathon (SIH)** to tackle the rampant issue of adulteration in herbal and medicinal products. By generating a unique **digital fingerprint** for authentic herbs, the system can instantly detect deviations and flag potential contamination—providing rapid, accessible, and reliable quality assurance.

---

## 📋 Table of Contents

* [The Problem](#-the-problem)
* [Our Solution](#-our-solution)
* [Key Features](#-key-features)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)
* [Deployment](#-deployment)
* [Our Team](#-our-team)

---

## 📍 The Problem

The global herbal market is booming, but **quality control remains a critical challenge**. Adulteration—mixing genuine herbs with fillers, cheaper substitutes, or harmful chemicals—is widespread.

This causes two major issues:

1. **Consumer Trust**: People pay for authenticity but often receive compromised products.
2. **Health Risks**: Contaminated herbs can lead to serious health consequences.

Traditional lab testing is **slow, costly, and inaccessible at the point of collection**, leaving the supply chain vulnerable.

---

## 💡 Our Solution

Dravyasense introduces a **low-cost, real-time, and scalable approach** to purity testing:

* An **IoT device** equipped with multiple sensors (pH, TDS, ORP, Temperature, RGB) collects chemical and physical data from herbal samples.
* Data is transmitted to an **AI model hosted on the cloud**, which compares it against the **digital fingerprint of pure herbs** in our database.
* Results are instantly displayed on a **web dashboard** with insights into:

  * Purity assessment
  * Adulteration risk levels
  * Detailed chemical profiles

---

## ✨ Key Features

* **Real-Time Dashboard**: Live stats on total tests, adulteration rates, and recent activity.
* **Latest Scan Spotlight**: A dynamic hero component showcasing the most recent test with sensor breakdowns.
* **Scan History**: Searchable and filterable history with expandable rows for detailed past results.
* **Data Visualization**: Interactive charts tracking trends, adulteration patterns, and scan volumes.
* **Scalable Cloud Backend**: Serverless AWS architecture to handle unlimited devices and tests.

---

## 🛠️ Tech Stack

### **Frontend**

* Framework: Next.js (App Router)
* Language: TypeScript
* Styling: Tailwind CSS
* UI Library: Shadcn/UI
* Charts: Recharts
* Animations: Framer Motion

### **Backend**

* Platform: AWS Lambda (Serverless)
* API: AWS API Gateway
* Runtime: Node.js

### **Database**

* Type: NoSQL
* Service: AWS DynamoDB

---

## 🚀 Getting Started

### **Prerequisites**

* Node.js (v18 or later)
* npm or yarn

### **Installation**

Clone the repository:

```bash
git clone https://github.com/your-username/dravyasense-dashboard.git
cd dravyasense-dashboard
```

Install dependencies:

```bash
npm install
```

Set up environment variables in `.env.local`:

```bash
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
NEXT_PUBLIC_AWS_REGION=
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Deployment

* Hosted on **Vercel** for instant and continuous deployment.
* Every push to the `main` branch automatically triggers a live update.

---

## 🧑‍💻 Our Team

* **Jehkaran Singh** – Team Lead, IoT Hardware Integration
* **Devansh Sharma** – Cloud & Full-Stack Development
* **Indrajith Gopinathan** – AI/ML Engineer
* **Tejas Sharma** – Sensor Calibration & Testing
* **Sambridhi Sinha** – Documentation & Presentation
* **Aditya Bisht** – Research & Support

---
