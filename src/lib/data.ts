export type Symptom = {
  id: string;
  name: string;
};

export const symptoms: Symptom[] = [
  { id: '1', name: 'Headache' },
  { id: '2', name: 'Fever' },
  { id: '3', name: 'Cough' },
  { id: '4', name: 'Sore throat' },
  { id: '5', name: 'Shortness of breath' },
  { id: '6', name: 'Chest pain' },
  { id: '7', name: 'Nausea' },
  { id: '8', name: 'Vomiting' },
  { id: '9', name: 'Diarrhea' },
  { id: '10', name: 'Fatigue' },
];

export type TriageQuestion = {
  id: string;
  text: string;
  type: 'severity' | 'yes_no';
  options: {
    text: string;
    value: number;
    isCritical?: boolean;
  }[];
};

export const triageQuestions: TriageQuestion[] = [
  {
    id: 'q2',
    text: 'How would you rate the severity of your symptom?',
    type: 'severity',
    options: [
      { text: 'Mild', value: 1 },
      { text: 'Moderate', value: 3 },
      { text: 'Severe', value: 5, isCritical: true },
    ],
  },
  {
    id: 'q3',
    text: 'Have you experienced this symptom before?',
    type: 'yes_no',
    options: [
      { text: 'Yes', value: 1 },
      { text: 'No', value: 0 },
    ],
  },
];


export type Recommendation = {
  careLevel: 'Green' | 'Yellow' | 'Red';
  title: string;
  description: string;
  nextSteps: string[];
};

export const recommendations: { [key: string]: Recommendation } = {
  Green: {
    careLevel: 'Green',
    title: 'Low Severity',
    description: 'Your symptoms appear to be mild. Home care is likely sufficient.',
    nextSteps: [
      'Rest and drink plenty of fluids.',
      'Monitor your symptoms.',
      'Use over-the-counter medication if necessary.',
      'Consult a doctor if symptoms worsen.',
    ],
  },
  Yellow: {
    careLevel: 'Yellow',
    title: 'Moderate Severity',
    description: 'Your symptoms suggest you should consult a healthcare professional.',
    nextSteps: [
      'Schedule a televist with a doctor soon.',
      'Avoid strenuous activities.',
      'Continue monitoring your symptoms closely.',
      'Follow medical advice provided.',
    ],
  },
  Red: {
    careLevel: 'Red',
    title: 'High Severity',
    description: 'Your symptoms are severe. Seek immediate medical attention.',
    nextSteps: [
      'Go to the nearest emergency room or call 911.',
      'Do not attempt to drive yourself.',
      'Describe your symptoms clearly to the medical staff.',
      'Follow all instructions from emergency personnel.',
    ],
  },
};
