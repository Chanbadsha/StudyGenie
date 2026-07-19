import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Material } from './models/material.model';
import { BlogPost } from './models/blog.model';
import { User } from './models/user.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

if (!MONGODB_URI || !DATABASE_NAME) {
  console.error('Missing MONGODB_URI or DATABASE_NAME in environment.');
  process.exit(1);
}

const materials = [
  {
    title: 'বাংলা ব্যাকরণের মূলনীতি',
    subject: 'Bangla',
    difficulty: 'Beginner' as const,
    shortDescription: 'বাংলা ব্যাকরণের মৌলিক নিয়ম ও ব্যাকরণিক শব্দের পরিচিতি। উপযোগী ষষ্ঠ থেকে অষ্টম শ্রেণির শিক্ষার্থীদের জন্য।',
    content: 'বাংলা ব্যাকরণ হচ্ছে বাংলা ভাষার সর্বাঙ্গীন পরিচয় ও বিশ্লেষণ। এই অধ্যায়ে আমরা বাংলা ব্যাকরণের মূল উপাদানসমূহ যেমন ধ্বনি, বর্ণ, শব্দ, পদ, বাক্য ইত্যাদি নিয়ে আলোচনা করব। ধ্বনি বাংলা ভাষার ক্ষুদ্রতম একক। বাংলা বর্ণমালায় মোট ৫০টি বর্ণ রয়েছে - ১১টি স্বরবর্ণ ও ৩৯টি ব্যঞ্জনবর্ণ। শব্দের বিভিন্ন প্রকার যেমন নাম-শব্দ (বিশেষ্য), কাজ-শব্দ (ক্রিয়া), গুণ-শব্দ (বিশেষণ) ইত্যাদি সম্পর্কে জানব। বাক্যের প্রধান অংশগুলি হলো কর্তা, ক্রিয়া ও কর্ম। বাংলা বাক্যের গঠন সাধারণত কর্তা-কর্ম-ক্রিয়া অনুসারে হয়।',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop',
  },
  {
    title: 'English Grammar Essentials for BD Students',
    subject: 'English',
    difficulty: 'Beginner' as const,
    shortDescription: 'Master the basics of English grammar with Bengali explanations. Perfect for SSC and HSC students.',
    content: 'English grammar is the foundation of effective communication. This guide covers the eight parts of speech: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, and Interjection. Each part is explained with Bengali translations and examples relevant to Bangladeshi students. Special attention is given to common mistakes made by Bengali speakers, including subject-verb agreement, tense usage, and article application. Practice exercises are included at the end of each section.',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop',
  },
  {
    title: 'SSC Mathematics: Algebra & Geometry',
    subject: 'Mathematics',
    difficulty: 'Intermediate' as const,
    shortDescription: 'Complete guide to SSC Mathematics syllabus covering algebra, geometry, and trigonometry with step-by-step solutions.',
    content: 'This comprehensive guide covers the SSC Mathematics syllabus as per the Bangladesh National Curriculum. Topics include: Algebraic expressions and formulas, Factorization techniques, Linear and quadratic equations, Geometry theorems and proofs, Circle geometry, Trigonometry ratios and identities. Each topic includes solved examples from previous SSC board exams and practice problems with answers. Special focus is given to common problem areas like geometric proofs and algebraic manipulation.',
    coverImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&h=400&fit=crop',
  },
  {
    title: 'পদার্থবিজ্ঞান: আলো ও প্রতিফলন',
    subject: 'Physics',
    difficulty: 'Intermediate' as const,
    shortDescription: 'আলোর প্রতিফলন, প্রতিসরণ ও গোলীয় দর্পণ সম্পর্কিত ধারণা। SSC ও HSC শিক্ষার্থীদের জন্য উপযোগী।',
    content: 'আলো পদার্থবিজ্ঞানের একটি মৌলিক বিষয়। এই অধ্যায়ে আমরা আলোর প্রতিফলন, প্রতিসরণ, গোলীয় দর্পণ ও লেন্স নিয়ে বিস্তারিত আলোচনা করব। প্রতিফলনের সূত্রদ্বয়: (১) আপতিত রশ্মি, প্রতিফলিত রশ্মি ও আপতন বিন্দুতে দর্পণের অভিলম্ব একই সমতলে থাকে। (২) আপতন কোণ সর্বদা প্রতিফলন কোণের সমান। গোলীয় দর্পণের ফোকাস দূরত্ব ও বক্রতা ব্যাসার্ধের সম্পর্ক: f = R/2। আলোর প্রতিসরণের স্নেলের সূত্র ও পূর্ণ অভ্যন্তরীণ প্রতিফলন সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।',
    coverImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=400&fit=crop',
  },
  {
    title: 'রসায়ন: মৌল ও যৌগিক পদার্থ',
    subject: 'Chemistry',
    difficulty: 'Intermediate' as const,
    shortDescription: 'পর্যায় সারণী, মৌলের শ্রেণীবিভাগ ও রাসায়নিক বন্ধন নিয়ে বিস্তারিত আলোচনা।',
    content: 'রসায়ন বিজ্ঞানের একটি গুরুত্বপূর্ণ শাখা যা পদার্থের গঠন, ধর্ম ও পরিবর্তন নিয়ে আলোচনা করে। এই অধ্যায়ে আমরা পর্যায় সারণী, মৌলের শ্রেণীবিভাগ (ধাতু, অধাতু, উপধাতু), রাসায়নিক বন্ধন (আয়নিক, সমযোজী ও ধাতব বন্ধন), এবং যৌগিক পদার্থের নামকরণ পদ্ধতি সম্পর্কে জানব। পর্যায় সারণীর গ্রুপ ও পর্যায় অনুসারে মৌলের ধর্মের পর্যায়ক্রমিকতা বিস্তারিতভাবে আলোচনা করা হয়েছে। রাসায়নিক বিক্রিয়ার বিভিন্ন প্রকার যেমন সংযোগ, বিশ্লেষণ, প্রতিস্থাপন ও দ্বি-প্রতিস্থাপন বিক্রিয়া সম্পর্কে ধারণা দেওয়া হয়েছে।',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=400&fit=crop',
  },
  {
    title: 'জীববিজ্ঞান: কোষ ও টিস্যু',
    subject: 'Biology',
    difficulty: 'Intermediate' as const,
    shortDescription: 'কোষের গঠন, প্রকারভেদ ও টিস্যু সম্পর্কিত বিস্তারিত জ্ঞান। HSC জীববিজ্ঞান সিলেবাস অনুযায়ী।',
    content: 'কোষ জীবনের মৌলিক একক। এই অধ্যায়ে আমরা উদ্ভিদ ও প্রাণী কোষের গঠন, কোষীয় অঙ্গাণুসমূহ (নিউক্লিয়াস, মাইটোকন্ড্রিয়া, রাইবোজোম, এন্ডোপ্লাজমিক রেটিকুলাম, গলগি বডি, লাইসোজোম), এবং বিভিন্ন প্রকার টিস্যু (এপিথেলিয়াল, পেশি, স্নায়ু ও সংযোজক টিস্যু) সম্পর্কে বিস্তারিত জানব। কোষ বিভাজন (মাইটোসিস ও মিয়োসিস) প্রক্রিয়া ও এর গুরুত্বও আলোচনা করা হয়েছে। বাংলাদেশের প্রেক্ষাপটে বিভিন্ন উদ্ভিদ ও প্রাণীর কোষীয় গঠনের তুলনামূলক বিশ্লেষণ দেওয়া হয়েছে।',
    coverImage: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&h=400&fit=crop',
  },
  {
    title: 'Bangladesh Studies: History & Liberation War',
    subject: 'Bangladesh Studies',
    difficulty: 'Beginner' as const,
    shortDescription: 'Learn about the history of Bangladesh, the Language Movement of 1952, and the Liberation War of 1971.',
    content: 'Bangladesh has a rich history spanning thousands of years. This material covers the key historical periods: ancient Bengal under the Pala and Sena dynasties, the Mughal period, British colonial rule, the partition of 1947, the Language Movement of 1952, the Six Point Movement of 1966, the Mass Uprising of 1969, the General Elections of 1970, and finally the Liberation War of 1971. Special emphasis is placed on the role of Sheikh Mujibur Rahman, the declaration of independence on March 26, 1971, the formation of the Mujibnagar Government, the contributions of different sectors during the war, and the surrender of Pakistani forces on December 16, 1971.',
    coverImage: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=800&h=400&fit=crop',
  },
  {
    title: 'তথ্য ও যোগাযোগ প্রযুক্তি: নেটওয়ার্কিং',
    subject: 'ICT',
    difficulty: 'Intermediate' as const,
    shortDescription: 'কম্পিউটার নেটওয়ার্কের মৌলিক ধারণা, ইন্টারনেট ও ওয়েব প্রযুক্তি সম্পর্কিত জ্ঞান।',
    content: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT) আধুনিক শিক্ষার একটি অপরিহার্য অংশ। এই অধ্যায়ে কম্পিউটার নেটওয়ার্কের প্রকারভেদ (LAN, MAN, WAN), নেটওয়ার্ক টপোলজি (স্টার, বাস, রিং, মেশ), TCP/IP মডেল, IP এড্রেসিং, ডোমেইন নেম সিস্টেম (DNS), এবং ওয়েব প্রযুক্তি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে। বাংলাদেশে ICT শিক্ষার গুরুত্ব, ডিজিটাল বাংলাদেশ গঠনে ICT-এর ভূমিকা এবং বিভিন্ন সরকারি ICT উদ্যোগ যেমন e-Governance, a2i প্রোগ্রাম সম্পর্কেও সংক্ষেপে আলোচনা করা হয়েছে।',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  },
  {
    title: 'ইসলাম শিক্ষা: আকীদা ও ইবাদত',
    subject: 'Islamic Studies',
    difficulty: 'Beginner' as const,
    shortDescription: 'ইসলামের মৌলিক আকীদা, পাঁচ স্তম্ভ ও ইবাদত সম্পর্কে প্রাথমিক ধারণা।',
    content: 'ইসলাম শিক্ষা বাংলাদেশের শিক্ষাব্যবস্থার একটি গুরুত্বপূর্ণ অংশ। এই উপাদানে আমরা ইসলামের মৌলিক আকীদা (ঈমান), ইসলামের পাঁচ স্তম্ভ (কালিমা, সালাত, সাওম, যাকাত, হজ্জ), এবং বিভিন্ন প্রকার ইবাদত সম্পর্কে জানব। তাওহীদ (একত্ববাদ), রিসালাত (নবুওয়াত), আখিরাত (পরকাল) - এই মৌলিক বিষয়গুলোর সহজ ব্যাখ্যা দেওয়া হয়েছে। নামাজের নিয়ম-কানুন, রোজার ফজিলত, যাকাতের হিসাব পদ্ধতি এবং হজ্জের ধাপসমূহ বাংলায় সহজ ভাষায় বর্ণনা করা হয়েছে।',
    coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&h=400&fit=crop',
  },
  {
    title: 'Higher Math: Calculus Basics',
    subject: 'Mathematics',
    difficulty: 'Advanced' as const,
    shortDescription: 'Introduction to differential and integral calculus for HSC and admission test preparation.',
    content: 'Calculus is the mathematical study of continuous change. This advanced material covers limits and continuity, differentiation rules, derivatives of algebraic and trigonometric functions, applications of derivatives (rate of change, increasing/decreasing functions, maxima and minima), integration techniques, definite and indefinite integrals, and applications of integration (area under curves, volume of solids). All concepts are explained with examples relevant to the HSC and university admission tests in Bangladesh, including BUET, DU, and RUET preparation.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
  },
  {
    title: 'English Literature: Tagore & Nazrul',
    subject: 'English',
    difficulty: 'Advanced' as const,
    shortDescription: 'Analysis of selected works by Rabindranath Tagore and Kazi Nazrul Islam in English translation.',
    content: 'This study material explores the English translations of works by two literary giants of Bengal: Rabindranath Tagore (Nobel laureate, 1913) and Kazi Nazrul Islam (the Rebel Poet of Bangladesh). Selected poems include Tagore\'s "Gitanjali" excerpts, "Where the Mind is Without Fear," and Nazrul\'s "Bidrohi" (The Rebel), "Manus" (Humanity). The material provides literary analysis, historical context, thematic exploration, and critical appreciation of these works. Students will also find comparative analysis between Tagore and Nazrul\'s poetic styles, philosophies, and contributions to Bengali renaissance and Bangladeshi cultural identity.',
    coverImage: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca0?w=800&h=400&fit=crop',
  },
  {
    title: 'হিসাববিজ্ঞান: জাবেদা ও খতিয়ান',
    subject: 'Accounting',
    difficulty: 'Intermediate' as const,
    shortDescription: 'হিসাববিজ্ঞানের মৌলিক নীতি, জাবেদা ও খতিয়ান প্রস্তুত করার নিয়ম। ব্যবসায় শিক্ষা বিভাগের শিক্ষার্থীদের জন্য।',
    content: 'হিসাববিজ্ঞান ব্যবসায়িক লেনদেনের প্রক্রিয়াকরণ ও বিশ্লেষণের একটি পদ্ধতিগত ব্যবস্থা। এই অধ্যায়ে আমরা হিসাববিজ্ঞানের মৌলিক নীতি, দ্বৈত-স্বরূপ পদ্ধতি, জাবেদা ও খতিয়ান প্রস্তুত করার নিয়ম, রেওয়ামিল তৈরি, এবং আর্থিক বিবরণী (উদ্বৃত্তপত্র, মুনাফা-ক্ষতি হিসাব) সম্পর্কে বিস্তারিত জানব। প্রতিটি বিষয় বাংলায় সহজ ভাষায় উদাহরণসহ ব্যাখ্যা করা হয়েছে যা ব্যবসায় শিক্ষা বিভাগের SSC ও HSC শিক্ষার্থীদের জন্য উপযোগী। বাংলাদেশের প্রেক্ষাপটে বিভিন্ন ব্যবসায়িক লেনদেনের উদাহরণ দেওয়া হয়েছে।',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
  },
];

const blogPosts = [
  {
    slug: 'how-ai-transforms-studying',
    title: 'How AI is Transforming the Way Students Study',
    excerpt: 'Discover how artificial intelligence is revolutionizing education and helping students learn more effectively than ever before.',
    content: `Artificial intelligence is reshaping nearly every industry, and education is no exception. From personalized tutoring systems to intelligent content generation, AI is making learning more accessible, efficient, and tailored to individual needs.

## Personalized Learning Paths

One of the most significant advantages AI brings to education is the ability to create personalized learning experiences. Traditional classrooms follow a one-size-fits-all approach, but AI-powered platforms can adapt to each student's pace, learning style, and knowledge gaps.

## AI-Powered Study Tools

StudyGenie leverages cutting-edge AI to help students generate comprehensive study notes, create custom quizzes, and receive instant explanations on complex topics. Instead of spending hours manually summarizing textbooks, students can focus on understanding and retention.

## The Future of AI in Education

As AI continues to evolve, we can expect even more sophisticated tools that will further democratize education and make high-quality learning resources available to students worldwide, regardless of their geographical location or economic background.`,
    author: 'Alex Devlin',
    category: 'AI & Education',
    published: true,
  },
  {
    slug: 'effective-study-techniques',
    title: '10 Effective Study Techniques Backed by Science',
    excerpt: 'Learn about the most effective study methods recommended by cognitive science research and how to apply them.',
    content: `Studying smarter, not harder, is the key to academic success. Here are ten evidence-based study techniques that can dramatically improve your learning outcomes.

## 1. Active Recall
Test yourself regularly instead of passively re-reading your notes. This strengthens neural pathways and improves long-term retention.

## 2. Spaced Repetition
Review material at increasing intervals over time. Apps like Anki use this principle to optimize memory retention.

## 3. Pomodoro Technique
Work in focused 25-minute intervals followed by 5-minute breaks. This maintains high concentration levels and prevents burnout.

## 4. Interleaving
Mix different topics or subjects during study sessions. This helps your brain make connections and improves problem-solving skills.

## 5. Elaboration
Explain concepts in your own words and connect new information to things you already know.

## 6. Dual Coding
Combine verbal and visual information (diagrams, mind maps, charts) to create multiple memory pathways.

## 7. Concrete Examples
Relate abstract concepts to real-world examples to make them more memorable and understandable.

## 8. Feynman Technique
Teach a concept to someone else (or pretend to) in simple language. If you can't explain it simply, you don't understand it well enough.

## 9. Retrieval Practice
Take practice tests or write down everything you remember about a topic without looking at your notes.

## 10. Environment Variation
Study in different locations to make your brain associate the material with multiple contexts, strengthening recall.

Combine these techniques with StudyGenie's AI-powered tools to maximize your study efficiency and academic performance.`,
    author: 'Sarah Kim',
    category: 'Study Tips',
    published: true,
  },
  {
    slug: 'getting-started-ai-notes',
    title: 'Getting Started with AI-Powered Note Generation',
    excerpt: 'A step-by-step guide to using StudyGenie AI Notes Generator to create comprehensive study materials.',
    content: `StudyGenie's AI Notes Generator is designed to help you create high-quality, structured study notes in seconds. Here's how to get started.

## Step 1: Choose Your Topic
Enter the topic you want to study. Be as specific as possible for the best results. For example, instead of "Biology," try "Photosynthesis in plants."

## Step 2: Select Subject and Difficulty
Pick the subject category and difficulty level (Beginner, Intermediate, or Advanced) that matches your current knowledge level.

## Step 3: Set Your Learning Goal
Tell the AI what you want to achieve. Whether it's "Prepare for exam" or "Get a general overview," this helps tailor the content.

## Step 4: Choose Output Length
Select Short, Medium, or Long based on how detailed you want your notes to be.

## Step 5: Generate and Review
Click Generate and within seconds you'll have well-organized study notes complete with key concepts, explanations, and examples.

## Tips for Best Results
- Use specific topic names rather than broad subjects
- Start with Beginner difficulty and work your way up
- Review and edit generated notes to reinforce your learning
- Save your notes to access them anytime from your dashboard

Start generating your first set of AI-powered notes today and experience a smarter way to study!`,
    author: 'Marcus Johnson',
    category: 'Tutorials',
    published: true,
  },
  {
    slug: 'future-of-personalized-learning',
    title: 'The Future of Personalized Learning with AI Tutors',
    excerpt: 'Explore how AI tutors are creating personalized learning experiences and what this means for the future of education.',
    content: `The concept of personalized learning—tailoring education to each student's unique needs, abilities, and interests—has been a goal of educators for decades. AI is finally making this vision a reality.

## What is an AI Tutor?

An AI tutor is a software system that uses artificial intelligence to provide personalized instruction, feedback, and guidance to learners. Unlike traditional tutoring, AI tutors are available 24/7 and can scale to serve millions of students simultaneously.

## Key Benefits

### Adaptive Learning Paths
AI tutors analyze student performance in real-time and adjust the difficulty and content accordingly. If a student struggles with a concept, the AI provides additional explanations and practice.

### Instant Feedback
Students no longer have to wait for a teacher to grade their work. AI tutors provide immediate feedback, allowing for rapid learning cycles.

### Scalable Access
AI tutoring makes quality education accessible to students in remote areas or those who cannot afford private tutoring.

## The StudyGenie Approach

StudyGenie's AI Chat feature serves as your personal study assistant. Ask questions, request explanations, or get help with homework problems anytime. The AI understands context and provides relevant, accurate responses.

## Looking Ahead

As natural language processing and machine learning continue to advance, AI tutors will become even more sophisticated, capable of understanding not just what a student knows, but also their emotional state and motivation levels.

The future of education is personalized, accessible, and AI-powered—and it's already here.`,
    author: 'Emily Chen',
    category: 'AI & Education',
    published: true,
  },
  {
    slug: 'study-group-best-practices',
    title: 'Best Practices for Online Study Groups',
    excerpt: 'Tips and strategies for making the most of collaborative learning in the digital age.',
    content: `Online study groups combine the benefits of collaborative learning with the flexibility of digital tools. Here are best practices to make your virtual study sessions effective and productive.

## Setting Up Your Group

### Choose the Right Platform
Select a video conferencing tool that allows screen sharing, breakout rooms, and chat. Discord, Zoom, and Google Meet are popular choices.

### Keep Groups Small
3-5 members is ideal. Larger groups can become unwieldy and less productive.

### Set Clear Goals
Establish what each session aims to accomplish. Whether it's reviewing a specific chapter or practicing exam questions, having clear objectives keeps everyone focused.

## During the Session

### Use the Pomodoro Technique
Study in focused intervals with breaks. For example, 25 minutes of silent study followed by 10 minutes of discussion.

### Assign Roles
Rotate roles like facilitator, note-taker, and timekeeper to keep everyone engaged and accountable.

### Leverage Shared Documents
Use collaborative tools like Google Docs or Notion to take group notes that everyone can access later.

## After the Session

Share summaries and action items. Use StudyGenie to consolidate group discussions into organized study notes for future reference.

Online study groups, when run well, can significantly enhance understanding and retention while making learning more enjoyable.`,
    author: 'Alex Devlin',
    category: 'Study Tips',
    published: true,
  },
  {
    slug: 'managing-exam-stress',
    title: 'Managing Exam Stress: A Student Guide',
    excerpt: 'Practical advice for staying calm and focused during exam season while maintaining a healthy study-life balance.',
    content: `Exam season can be one of the most stressful times for students. Here's a comprehensive guide to managing that stress and performing your best.

## Understand Your Stress

Stress is your body's natural response to perceived threats. A moderate amount can actually improve performance, but too much can be debilitating. Recognizing the difference is the first step.

## Preparation Strategies

### Create a Study Schedule
Break your syllabus into manageable chunks and allocate specific time blocks. Include buffer time for unexpected delays.

### Practice Under Exam Conditions
Take timed practice tests in a quiet environment. This reduces anxiety on the actual exam day.

### Use Active Study Methods
Passive reading is less effective. Use StudyGenie to generate notes, create flashcards, and take practice quizzes.

## During Exam Week

### Sleep is Non-Negotiable
Aim for 7-9 hours of sleep. Sleep is when your brain consolidates memories and processes information.

### Nutrition Matters
Eat balanced meals with protein, complex carbohydrates, and healthy fats. Avoid excessive caffeine and sugar.

### Stay Hydrated
Even mild dehydration can impair cognitive function. Keep a water bottle nearby.

## Mindset Techniques

- **Deep Breathing**: Inhale for 4 counts, hold for 4, exhale for 4. This activates your parasympathetic nervous system.
- **Positive Visualization**: Picture yourself calmly answering questions and completing the exam.
- **Progress, Not Perfection**: Focus on doing your best rather than being perfect.

Remember, exams measure your performance on a given day, not your worth as a person. Take care of your mental health, use the right study tools, and trust in your preparation.`,
    author: 'Sarah Kim',
    category: 'Student Life',
    published: true,
  },
];

async function seed(): Promise<void> {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!, { dbName: DATABASE_NAME });
    console.log('Connected to MongoDB.');

    let seedUser = await User.findOne({ email: 'seed@studygenie.com' });
    if (!seedUser) {
      seedUser = await User.create({
        name: 'StudyGenie Admin',
        email: 'seed@studygenie.com',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
      });
      console.log('Created seed user:', seedUser._id);
    } else {
      console.log('Using existing seed user:', seedUser._id);
    }

    const existingCount = await Material.countDocuments({ createdBy: seedUser._id });
    console.log(`Existing materials by seed user: ${existingCount}`);

    if (existingCount > 0) {
      console.log('Deleting existing materials by seed user to re-seed...');
      await Material.deleteMany({ createdBy: seedUser._id });
    }

    const materialDocs = materials.map((m) => ({
      ...m,
      createdBy: seedUser!._id,
    }));

    const inserted = await Material.insertMany(materialDocs);
    console.log(`\n✅ Successfully inserted ${inserted.length} study materials!\n`);

    for (const mat of inserted) {
      console.log(`  - [${mat.difficulty}] ${mat.title} (${mat.subject})`);
    }

    const existingBlogCount = await BlogPost.countDocuments({});
    console.log(`Existing blog posts: ${existingBlogCount}`);

    if (existingBlogCount > 0) {
      console.log('Deleting existing blog posts to re-seed...');
      await BlogPost.deleteMany({});
    }

    const insertedBlogs = await BlogPost.insertMany(blogPosts);
    console.log(`\n✅ Successfully inserted ${insertedBlogs.length} blog posts!\n`);

    for (const blog of insertedBlogs) {
      console.log(`  - ${blog.title} (${blog.category})`);
    }

    console.log('\nSeed complete. You can now view these materials in the app.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
