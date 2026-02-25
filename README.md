# MamaSafe AI

MamaSafe AI is a comprehensive operating system designed for modern clinics and pharmacies, particularly in low-resource settings across Africa. It unifies triage, clinical workflows, pharmacy dispensing, and patient follow-ups into a single, intelligent workspace.

## Prerequisites

Node.js (v18 or higher recommended)

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   Copy `.env.example` to `.env.local` and set your configuration variables (such as `GEMINI_API_KEY`).
3. Run the development server:
   ```bash
   npm run dev
   ```

## Workflow Features

* **AI Triage:** Powered symptom analysis for quick risk assessment.
* **Structured Clinical Flow:** Complete patient journey from registration to pharmacy dispensing.
* **Automated Reminders:** SMS and WhatsApp integrations to improve medication adherence.
* **Analytics Dashboard:** Real-time visibility into clinic footfall and testing metrics.

## Security and Privacy

Strict facility-level data isolation ensures that patient information remains secure and compliant with regional standards.

## Deployment

To create a production build:
```bash
npm run build
```
You can preview the built application locally using:
```bash
npm run preview
```

## Contributing

Please refer to the internal guidelines for submitting pull requests and reporting issues.
