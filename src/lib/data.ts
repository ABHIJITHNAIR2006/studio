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
  { id: '11', name: 'Difficulty breathing' },
  { id: '12', name: 'Abdominal pain' },
  { id: '13', name: 'Nausea/Vomiting' },
  { id: '14', name: 'Dizziness' },
  { id: '15', name: 'Back pain' },
  { id: '16', name: 'Joint pain' },
  { id: '17', name: 'Rash' },
  { id: '18', name: 'Other' },
  { id: '19', name: 'Chills' },
  { id: '20', name: 'Body Aches' },
  { id: '21', name: 'Lost of Smell' },
  { id: '22', name: 'Loss of Taste' },
  { id: '23', name: 'Runny Nose' },
  { id: '24', name: 'Sneezing' },
  { id: '25', name: 'Watery Eyes' },
  { id: '26', name: 'Itchy Eyes' },
  { id: '27', name: 'Muscle Pain' },
  { id: '28', name: 'Pinkeye' },
  { id: '29', name: 'Earache' },
  { id: '30', name: 'Cold' },
  { id: '31', name: 'Stomachache' },
  { id: '32', name: 'Constipation' },
];

export type TriageQuestion = {
  id: string;
  text: string;
  type: 'severity' | 'yes_no' | 'checkbox' | 'duration' | 'radio';
  options: {
    text: string;
    value: number;
    description?: string;
    isCritical?: boolean;
  }[];
};

export const triageQuestions: TriageQuestion[] = [
  {
    id: 'q2',
    text: 'How would you rate the severity of your symptom?',
    type: 'severity',
    options: [
      {
        text: 'Mild',
        value: 1,
        description: 'Noticeable but not interfering with daily activities',
      },
      {
        text: 'Moderate',
        value: 3,
        description: 'Interfering with some daily activities',
      },
      {
        text: 'Severe',
        value: 5,
        description: 'Significantly impacting daily activities',
      },
    ],
  },
  {
    id: 'q3',
    text: 'Do you have any of these additional symptoms?',
    type: 'checkbox',
    options: [
      { text: 'Shortness of breath', value: 2, isCritical: true },
      { text: 'Rapid heartbeat', value: 2 },
      { text: 'High fever (>101°F)', value: 2 },
      { text: 'Severe headache', value: 2, isCritical: true },
      { text: 'Confusion', value: 2, isCritical: true },
      { text: 'Loss of consciousness', value: 2, isCritical: true },
      { text: 'Severe bleeding', value: 2, isCritical: true },
      { text: 'Difficulty swallowing', value: 2, isCritical: true },
      { text: 'Severe allergic reaction', value: 2, isCritical: true },
      { text: 'Chest tightness', value: 2, isCritical: true },
    ]
  },
  {
    id: 'q4',
    text: 'When did your symptoms start?',
    type: 'radio',
    options: [
      { text: 'Less than 1 hour ago', value: 1 },
      { text: 'A few hours ago', value: 2 },
      { text: 'Earlier today', value: 3 },
      { text: 'Yesterday', value: 4 },
      { text: 'A few days ago', value: 5 },
      { text: 'A week or more ago', value: 6 },
    ],
  },
];

export type Recommendation = {
  careLevel: 'Green' | 'Yellow' | 'Red';
  title: string;
  description: string;
  nextSteps: string[];
  homeCare?: { [symptom: string]: string[] };
};

export const recommendations: { [key: string]: Recommendation } = {
  Green: {
    careLevel: 'Green',
    title: 'Low Severity',
    description: 'Your symptoms appear to be mild. Home care is likely sufficient.',
    nextSteps: [
      'Monitor your symptoms and consult a doctor if they worsen or do not improve after a few days.',
      'Rest and drink plenty of fluids to stay hydrated.',
    ],
    homeCare: {
      default: [
        'Use over-the-counter medication like ibuprofen or acetaminophen if needed for pain or fever, following package instructions.',
      ],
      Headache: [
        'Rest in a quiet, dark room.',
        'Apply a cold compress to your forehead.',
        'Gently massage your neck and shoulders.',
        'Stay hydrated by drinking water.',
      ],
      Fever: [
        'Take a lukewarm bath.',
        'Dress in light clothing.',
        'Use a fan to circulate air.',
        'Drink plenty of fluids like water, broth, or electrolyte drinks.',
      ],
      Cough: [
        'Use a humidifier or take a steamy shower to ease your throat.',
        'Sip on warm tea with honey and lemon.',
        'Gargle with salt water.',
        'Avoid irritants like smoke and strong fumes.',
      ],
      'Sore throat': [
        'Gargle with warm salt water several times a day.',
        'Drink warm liquids like tea with honey.',
        'Use throat lozenges or sprays.',
        'Avoid acidic or spicy foods that can irritate your throat.',
      ],
      Diarrhea: [
        'Stick to a BRAT diet (bananas, rice, applesauce, toast).',
        'Drink clear fluids to prevent dehydration.',
        'Avoid dairy, fatty foods, and caffeine.',
      ],
    },
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
