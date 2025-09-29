# **App Name**: TriageNow Pro

## Core Features:

- Symptom Input with AI Assistance: Allow users to input their symptoms via a searchable dropdown. Use AI tool to help categorize the symptoms to aid the triage process and find best matching recommendations.
- Dynamic Questionnaires: Present users with a series of questions based on their initial symptoms, dynamically adapting the questionnaire flow. Questions displayed in interactive cards or buttons.
- Critical Condition Alerts: Implement real-time alerts (Red Critical Notifications) if a user indicates severe symptoms or conditions like shortness of breath.
- Severity Scoring System: Simulate a function to calculate a severity score based on the user's responses to the questionnaires, mapping this score to different care levels (Red, Yellow, Green).
- Triage Results Display: Display the triage results with a care level indicator (color-coded badge), and suggest next steps. Ensure results include a clear recommendation for action.
- Mobile Responsiveness: Ensure the application is fully responsive and functional on mobile devices, with a breakpoint at 400px width.
- Theming: Implement Dark Mode context for visual appeal and accessibility. Ensure the app renders seamlessly in both light and dark mode. Global transition class added to all elements for nice UI effect

## Style Guidelines:

- Primary color: Deep blue (#3B82F6) to convey trust and stability.
- Background color: Light gray (#F9FAFB) for a clean, professional look.
- Accent color: A vibrant purple (#A855F7) to highlight key actions and critical alerts, for higher information hierarchy.
- Body and headline font: 'Inter' (sans-serif) for a modern, neutral look, that scales well in headlines and body text.
- Use simple, clean icons from a set like Phosphor icons, in a filled style.
- Employ a card-based layout to clearly organize information. Cards should have rounded corners and subtle shadow.
- Incorporate subtle animations, especially for transitions between steps and when displaying results, using the global transition-all duration-300 ease-in-out class.