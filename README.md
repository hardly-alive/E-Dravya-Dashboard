Dravyasense - AI-Powered Herbal Purity Analysis
A modern, real-time dashboard for analyzing the purity of herbal samples using IoT sensor data and AI.

Dravyasense is a full-stack solution developed for the Smart India Hackathon (SIH) to combat the widespread issue of adulteration in herbal and medicinal products. By creating a unique "digital fingerprint" for authentic herbs, our system can instantly detect deviations and alert for potential contamination.

📋 Table of Contents
The Problem

Our Solution

✨ Key Features

🛠️ Tech Stack

🚀 Getting Started

部署

Our Team

📍 The Problem
The global market for herbal products is booming, but it faces a critical challenge: a lack of quality control. Adulteration—mixing authentic herbs with cheaper substitutes, fillers, or even harmful substances—is rampant. This not only cheats consumers but also poses significant health risks. Traditional lab testing is slow, expensive, and not accessible at the point of collection.

💡 Our Solution
Dravyasense provides an instant, low-cost, and data-driven solution. An IoT device equipped with multiple sensors (pH, TDS, ORP, Temperature, RGB) collects data from an herbal sample. This data is sent to an AI model in the cloud, which compares it against the digital fingerprint of pure herbs stored in our database.

The results are instantly visualized on a comprehensive web dashboard, providing clear insights into the purity, adulteration risk, and chemical profile of the sample.

✨ Key Features
Real-Time Analytics Dashboard: A central hub showing key stats like total tests, recent activity, and overall adulteration rates.

Latest Scan Spotlight: A dynamically updated "hero" component that showcases the most recent test result with a detailed sensor data breakdown.

Comprehensive Scan History: A searchable and filterable history page with interactive, expandable rows to view detailed data for any past scan.

Data Visualization: An analytics page with interactive charts showing trends, adulteration rates by herb, and scan volume over time.

Scalable Cloud Architecture: Built on a serverless AWS backend to handle any number of IoT devices and scans.

🛠️ Tech Stack
Frontend
Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn/UI

Charting: Recharts

Animation: Framer Motion

Backend
Platform: AWS Lambda (Serverless)

API: AWS API Gateway

Language: Node.js

Database
Type: NoSQL

Service: AWS DynamoDB

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm or yarn

Installation
Clone the repo:

git clone [https://github.com/your-username/dravyasense-dashboard.git](https://github.com/your-username/dravyasense-dashboard.git)

Install NPM packages:

npm install

Set up Environment Variables:
Create a file named .env.local in the root of the project and add your API Gateway URL:

API_BASE_URL=[https://your-api-gateway-url.amazonaws.com](https://your-api-gateway-url.amazonaws.com)

Run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.

🌐 Deployment
This application is automatically deployed on Vercel. Every push to the main branch triggers a new deployment, ensuring the live version is always up-to-date with the latest changes.

🧑‍💻 Our Team
Jehkaran Singh - Team Lead / IoT

Devansh Sharma - Full Stack / Cloud

Indrajith Gopinathan - AI / ML

Tejas Sharma - Research / IoT

Sambridhi Sinha - Presentation / Docs

Aditya Bisht - Research / Docs