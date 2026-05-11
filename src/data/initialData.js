export const INITIAL_PHASES = [
  {
    id: 'phase1',
    title: 'Now → May 2026',
    subtitle: 'Foundation Building',
    color: 'blue',
    tasks: [
      {
        id: 'p1t1',
        text: 'Update resume with TPM framing — lead with cross-functional impact and metrics',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r1', label: 'UT Austin Career Center', url: 'https://career.utexas.edu' },
          { id: 'r2', label: 'Google Careers', url: 'https://careers.google.com' },
        ],
      },
      {
        id: 'p1t2',
        text: 'Start LeetCode — target 2-3 easy/medium problems per week',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r3', label: 'LeetCode', url: 'https://leetcode.com' },
          { id: 'r4', label: 'NeetCode 150', url: 'https://neetcode.io' },
          { id: 'r5', label: 'Blind 75', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions' },
        ],
      },
      {
        id: 'p1t3',
        text: 'Draft "Why TPM, Why Google" personal narrative (500 words)',
        completed: false,
        reminder: null,
        resources: [],
      },
      {
        id: 'p1t4',
        text: 'Research Google STEP / APM / TPM intern program deadlines and requirements',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r6', label: 'Google STEP Intern', url: 'https://careers.google.com/jobs/results/?category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&company=Google&employment_type=INTERN' },
          { id: 'r7', label: 'r/csMajors TPM guide', url: 'https://www.reddit.com/r/csMajors' },
        ],
      },
      {
        id: 'p1t5',
        text: 'Connect with 3+ UT Austin alumni in PM / TPM roles on LinkedIn',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r8', label: 'LinkedIn Alumni Tool', url: 'https://www.linkedin.com/school/the-university-of-texas-at-austin/people/' },
        ],
      },
    ],
  },
  {
    id: 'phase2',
    title: 'June – August 2026',
    subtitle: 'Citi Internship — Build Your Story',
    color: 'emerald',
    tasks: [
      {
        id: 'p2t1',
        text: 'Own one end-to-end deliverable you can speak to in interviews (define success metrics)',
        completed: false,
        reminder: '2026-06-15',
        resources: [],
      },
      {
        id: 'p2t2',
        text: 'Get scrum team exposure — attend standups, retrospectives, and sprint planning',
        completed: false,
        reminder: '2026-06-08',
        resources: [],
      },
      {
        id: 'p2t3',
        text: 'Document wins weekly in the Weekly Wins log (at least one entry/week)',
        completed: false,
        reminder: null,
        resources: [],
      },
      {
        id: 'p2t4',
        text: 'Network with 3+ internal TPMs/PMs — coffee chats, ask about referral process',
        completed: false,
        reminder: '2026-07-01',
        resources: [],
      },
      {
        id: 'p2t5',
        text: 'Keep LeetCode momentum — 3-4 problems/week (use commute or lunch breaks)',
        completed: false,
        reminder: null,
        resources: [],
      },
      {
        id: 'p2t6',
        text: 'Request a strong letter of recommendation / LinkedIn endorsement from Citi manager',
        completed: false,
        reminder: '2026-08-01',
        resources: [],
      },
    ],
  },
  {
    id: 'phase3',
    title: 'August – September 2026',
    subtitle: 'Application Blitz — Critical Window',
    color: 'orange',
    tasks: [
      {
        id: 'p3t1',
        text: 'Refresh resume after Citi — quantify every bullet ($ saved, % improvement, # stakeholders)',
        completed: false,
        reminder: '2026-08-01',
        resources: [],
      },
      {
        id: 'p3t2',
        text: 'Apply Day 1 to Google APM Intern (opens ~Aug 15)',
        completed: false,
        reminder: '2026-08-15',
        resources: [
          { id: 'r9', label: 'Google APM Program', url: 'https://careers.google.com/programs/apm/' },
        ],
      },
      {
        id: 'p3t3',
        text: 'Apply Day 1 to Meta RPM Intern (opens ~Aug 1)',
        completed: false,
        reminder: '2026-08-01',
        resources: [
          { id: 'r10', label: 'Meta RPM Program', url: 'https://www.metacareers.com/careerprograms/rotational-product-manager' },
        ],
      },
      {
        id: 'p3t4',
        text: 'Apply Day 1 to Microsoft PM Intern / Explore Program (opens ~Aug 1)',
        completed: false,
        reminder: '2026-08-01',
        resources: [
          { id: 'r11', label: 'Microsoft Careers', url: 'https://careers.microsoft.com' },
        ],
      },
      {
        id: 'p3t5',
        text: 'Apply Day 1 to Amazon TPM Intern (opens ~Aug 1)',
        completed: false,
        reminder: '2026-08-01',
        resources: [
          { id: 'r12', label: 'Amazon Jobs', url: 'https://www.amazon.jobs/en/teams/technical-product-management' },
        ],
      },
      {
        id: 'p3t6',
        text: 'LinkedIn outreach to 10+ UT Austin alumni at target companies (personalized notes)',
        completed: false,
        reminder: '2026-08-15',
        resources: [],
      },
      {
        id: 'p3t7',
        text: 'Write 6-8 STAR behavioral stories covering all key competency tags',
        completed: false,
        reminder: '2026-09-01',
        resources: [],
      },
    ],
  },
  {
    id: 'phase4',
    title: 'September – November 2026',
    subtitle: 'Interview Season — Execute',
    color: 'purple',
    tasks: [
      {
        id: 'p4t1',
        text: 'Google virtual onsite prep — DSA (medium/hard) + TPM scenario walkthroughs',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r13', label: 'Pramp', url: 'https://www.pramp.com' },
          { id: 'r14', label: 'interviewing.io', url: 'https://interviewing.io' },
        ],
      },
      {
        id: 'p4t2',
        text: 'Meta RPM — case study framework + product sense (feature design, success metrics)',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r15', label: 'Decode & Conquer', url: 'https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417' },
        ],
      },
      {
        id: 'p4t3',
        text: 'Microsoft Explore — technical coding interview + behavioral prep',
        completed: false,
        reminder: null,
        resources: [],
      },
      {
        id: 'p4t4',
        text: 'Amazon — internalize all 16 Leadership Principles with personal examples',
        completed: false,
        reminder: null,
        resources: [
          { id: 'r16', label: 'Amazon Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
        ],
      },
      {
        id: 'p4t5',
        text: 'Submit rolling applications to LinkedIn PM Intern and Salesforce PM Intern',
        completed: false,
        reminder: '2026-10-01',
        resources: [],
      },
      {
        id: 'p4t6',
        text: 'Complete 2+ mock interviews (Pramp, interviewing.io, or with peers)',
        completed: false,
        reminder: null,
        resources: [],
      },
    ],
  },
  {
    id: 'phase5',
    title: 'November 2026 – January 2027',
    subtitle: 'Offers & Decisions',
    color: 'rose',
    tasks: [
      {
        id: 'p5t1',
        text: 'Evaluate all offers across comp, team quality, learning opportunity, and brand',
        completed: false,
        reminder: null,
        resources: [],
      },
      {
        id: 'p5t2',
        text: 'Negotiate — use competing offers as leverage, ask about stipend and project scope',
        completed: false,
        reminder: null,
        resources: [],
      },
      {
        id: 'p5t3',
        text: 'Watch for Google second-wave of APM/TPM offers in January 2027',
        completed: false,
        reminder: '2027-01-05',
        resources: [],
      },
      {
        id: 'p5t4',
        text: 'Accept summer 2027 role and notify other companies promptly (burn no bridges)',
        completed: false,
        reminder: null,
        resources: [],
      },
    ],
  },
]

export const INITIAL_COMPANIES = [
  {
    id: 'c1',
    company: 'Google',
    role: 'APM Intern',
    deadline: '2026-09-30',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Opens ~Aug 15. Product sense + technical depth. Very competitive.',
    jobLink: 'https://careers.google.com/programs/apm/',
  },
  {
    id: 'c2',
    company: 'Google',
    role: 'TPM Intern',
    deadline: '2026-09-30',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Strong fit with Citi TA experience. DSA required.',
    jobLink: 'https://careers.google.com',
  },
  {
    id: 'c3',
    company: 'Meta',
    role: 'RPM Intern',
    deadline: '2026-10-15',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Opens ~Aug 1. Case study + product sense heavy interview.',
    jobLink: 'https://www.metacareers.com/careerprograms/rotational-product-manager',
  },
  {
    id: 'c4',
    company: 'Microsoft',
    role: 'PM Intern',
    deadline: '2026-10-01',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Also consider Explore Program (SWE + PM hybrid for earlier-stage students).',
    jobLink: 'https://careers.microsoft.com',
  },
  {
    id: 'c5',
    company: 'Amazon',
    role: 'TPM Intern',
    deadline: '2026-10-01',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Opens ~Aug 1. 16 LPs are non-negotiable — need 2 stories per LP.',
    jobLink: 'https://www.amazon.jobs/en/teams/technical-product-management',
  },
  {
    id: 'c6',
    company: 'LinkedIn',
    role: 'PM Intern',
    deadline: '2026-11-01',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Rolling applications. Great backup option with strong brand.',
    jobLink: 'https://careers.linkedin.com',
  },
  {
    id: 'c7',
    company: 'Salesforce',
    role: 'PM Intern',
    deadline: '2026-11-01',
    status: 'Not Applied',
    recruiter: '',
    recruiterContact: '',
    notes: 'Rolling applications. Trailhead certification is a plus.',
    jobLink: 'https://careers.salesforce.com',
  },
]

export const INITIAL_LEETCODE = {
  easy: 0,
  medium: 0,
  hard: 0,
  weeklyGoal: 4,
  streak: 0,
  lastSolvedDate: null,
  weekStart: null,
  solvedThisWeek: 0,
}

export const INITIAL_STORIES = []

export const INITIAL_WINS = []

export const KEY_DATES = [
  { id: 'kd1', label: 'Citi Internship Starts', date: '2026-06-01', company: 'Citi', color: 'emerald' },
  { id: 'kd2', label: 'Meta RPM Opens', date: '2026-08-01', company: 'Meta', color: 'blue' },
  { id: 'kd3', label: 'Amazon TPM Opens', date: '2026-08-01', company: 'Amazon', color: 'orange' },
  { id: 'kd4', label: 'Microsoft Explore Opens', date: '2026-08-01', company: 'Microsoft', color: 'purple' },
  { id: 'kd5', label: 'Google APM Opens', date: '2026-08-15', company: 'Google', color: 'rose' },
]

export const STATUS_OPTIONS = ['Not Applied', 'Applied', 'Phone Screen', 'Onsite', 'Offer', 'Rejected']

export const COMPETENCY_TAGS = ['Leadership', 'Delivery', 'Conflict', 'Technical', 'Collaboration', 'Ambiguity']

export const WIN_TAGS = ['Technical', 'Leadership', 'Collaboration', 'Delivery']

export const PHASE_COLOR_MAP = {
  blue: {
    dot: 'bg-blue-500',
    bar: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    header: 'from-blue-500 to-blue-600',
    light: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-300',
  },
  emerald: {
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    header: 'from-emerald-500 to-emerald-600',
    light: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  orange: {
    dot: 'bg-orange-500',
    bar: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    header: 'from-orange-500 to-orange-600',
    light: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
  },
  purple: {
    dot: 'bg-purple-500',
    bar: 'bg-purple-500',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    header: 'from-purple-500 to-purple-600',
    light: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-300',
  },
  rose: {
    dot: 'bg-rose-500',
    bar: 'bg-rose-500',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    header: 'from-rose-500 to-rose-600',
    light: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-700 dark:text-rose-300',
  },
}

export const STATUS_COLOR_MAP = {
  'Not Applied': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  'Applied': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Phone Screen': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Onsite': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'Offer': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Rejected': 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
}
