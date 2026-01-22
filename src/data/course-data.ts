import { Course, SkillLevel } from '@/types/training';

/**
 * Comprehensive Course Library
 * Includes beginner, intermediate, and advanced courses across multiple categories
 */

export const courses: Course[] = [
    // ===== BEGINNER COURSES =====
    {
        id: 'web-dev-fundamentals',
        title: 'Web Development Fundamentals',
        shortDescription: 'Start your journey into web development with HTML, CSS, and JavaScript basics.',
        fullDescription: 'This comprehensive beginner course covers the essential building blocks of web development. Learn HTML structure, CSS styling, and JavaScript interactivity through hands-on projects and interactive exercises. Perfect for complete beginners with no prior coding experience.',
        skillLevel: 'beginner' as SkillLevel,
        category: 'web-development',
        thumbnail: '/courses/web-fundamentals.jpg',
        instructor: {
            name: 'Sarah Chen',
            title: 'Senior Frontend Developer',
        },
        modules: [
            {
                id: 'html-basics',
                title: 'HTML Essentials',
                description: 'Learn the structure of web pages with HTML',
                order: 1,
                estimatedDuration: 180,
                lessons: [
                    {
                        id: 'html-intro',
                        title: 'Introduction to HTML',
                        type: 'theory',
                        duration: 30,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'What is HTML?',
                                        content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.',
                                        codeExample: {
                                            language: 'html',
                                            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first web page.</p>
</body>
</html>`,
                                            explanation: 'A basic HTML document structure with DOCTYPE, html, head, and body elements.',
                                        },
                                    },
                                    {
                                        heading: 'HTML Elements and Tags',
                                        content: 'HTML uses tags to create elements. Tags are enclosed in angle brackets, and most elements have an opening and closing tag.',
                                        codeExample: {
                                            language: 'html',
                                            code: `<h1>This is a heading</h1>
<p>This is a paragraph</p>
<a href="https://example.com">This is a link</a>`,
                                            explanation: 'Common HTML elements: headings, paragraphs, and links.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'HTML is the backbone of every web page',
                                    'HTML uses tags to structure content',
                                    'Every HTML document has a standard structure',
                                    'Elements can be nested inside each other',
                                ],
                            },
                        },
                    },
                    {
                        id: 'html-elements',
                        title: 'Common HTML Elements',
                        type: 'interactive',
                        duration: 45,
                        order: 2,
                        content: {
                            interactive: {
                                instructions: 'Create a simple personal profile page using HTML elements you\'ve learned. Include headings, paragraphs, lists, and at least one image.',
                                starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Profile</title>
</head>
<body>
  <!-- Add your code here -->
  
</body>
</html>`,
                                expectedOutput: 'A complete HTML page with heading, paragraph, list, and image elements',
                                hints: [
                                    'Use <h1> for your name as the main heading',
                                    'Use <ul> or <ol> for listing your hobbies or skills',
                                    'Don\'t forget the alt attribute for images',
                                ],
                            },
                        },
                    },
                    {
                        id: 'html-challenge',
                        title: 'Build Your First Web Page',
                        type: 'challenge',
                        duration: 60,
                        order: 3,
                        content: {
                            challenge: {
                                title: 'Personal Portfolio Landing Page',
                                description: 'Create a complete landing page for a personal portfolio using semantic HTML.',
                                difficulty: 'easy',
                                requirements: [
                                    'Use semantic HTML5 elements (header, nav, main, section, footer)',
                                    'Include a navigation menu with at least 3 links',
                                    'Add an About section with your bio',
                                    'Include a Skills section with a list of skills',
                                    'Add a Contact section with mailto link',
                                ],
                                starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Portfolio</title>
</head>
<body>
  <!-- Build your portfolio here -->
</body>
</html>`,
                            },
                        },
                    },
                ],
            },
            {
                id: 'css-basics',
                title: 'CSS Fundamentals',
                description: 'Style your web pages with CSS',
                order: 2,
                estimatedDuration: 240,
                lessons: [
                    {
                        id: 'css-intro',
                        title: 'Introduction to CSS',
                        type: 'theory',
                        duration: 40,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'What is CSS?',
                                        content: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, positioning, and responsive design.',
                                        codeExample: {
                                            language: 'css',
                                            code: `h1 {
  color: #2563eb;
  font-size: 36px;
  font-weight: bold;
}

p {
  color: #64748b;
  line-height: 1.6;
}`,
                                            explanation: 'Basic CSS rules that style heading and paragraph elements.',
                                        },
                                    },
                                    {
                                        heading: 'CSS Selectors',
                                        content: 'Selectors are patterns used to select the elements you want to style. There are element selectors, class selectors, ID selectors, and more.',
                                        codeExample: {
                                            language: 'css',
                                            code: `/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { font-size: 24px; }`,
                                            explanation: 'Different types of CSS selectors for targeting elements.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'CSS separates content from presentation',
                                    'Selectors target HTML elements for styling',
                                    'CSS properties define visual appearance',
                                    'The cascade determines which styles apply',
                                ],
                            },
                        },
                    },
                    {
                        id: 'css-layout',
                        title: 'CSS Layout with Flexbox',
                        type: 'interactive',
                        duration: 60,
                        order: 2,
                        content: {
                            interactive: {
                                instructions: 'Create a responsive navigation bar using Flexbox. It should have a logo on the left and menu items on the right.',
                                starterCode: `<nav class="navbar">
  <div class="logo">MyBrand</div>
  <ul class="nav-menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<style>
  /* Add your CSS here */
  
</style>`,
                                expectedOutput: 'A horizontal navbar with logo left-aligned and menu items right-aligned',
                                hints: [
                                    'Use display: flex on the navbar',
                                    'Use justify-content: space-between for spacing',
                                    'Remove default list styling from ul',
                                    'Use display: flex on the nav-menu for horizontal items',
                                ],
                            },
                        },
                    },
                ],
            },
            {
                id: 'js-basics',
                title: 'JavaScript Fundamentals',
                description: 'Add interactivity to your web pages',
                order: 3,
                estimatedDuration: 300,
                lessons: [
                    {
                        id: 'js-intro',
                        title: 'JavaScript Basics',
                        type: 'theory',
                        duration: 45,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'What is JavaScript?',
                                        content: 'JavaScript is a programming language that enables interactive web pages. It can update and change both HTML and CSS, calculate, manipulate and validate data.',
                                        codeExample: {
                                            language: 'javascript',
                                            code: `// Variables
let name = "John";
const age = 25;

// Functions
function greet(person) {
  return "Hello, " + person + "!";
}

console.log(greet(name)); // "Hello, John!"`,
                                            explanation: 'Basic JavaScript variables and functions.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'JavaScript adds behavior to web pages',
                                    'Variables store data values',
                                    'Functions are reusable blocks of code',
                                    'JavaScript can respond to user events',
                                ],
                            },
                        },
                    },
                    {
                        id: 'js-quiz',
                        title: 'JavaScript Fundamentals Quiz',
                        type: 'quiz',
                        duration: 20,
                        order: 2,
                        content: {
                            quiz: {
                                passingScore: 70,
                                questions: [
                                    {
                                        id: 'q1',
                                        question: 'Which keyword is used to declare a constant in JavaScript?',
                                        type: 'multiple-choice',
                                        options: ['var', 'let', 'const', 'constant'],
                                        correctAnswer: 2,
                                        explanation: 'The "const" keyword is used to declare constants that cannot be reassigned.',
                                    },
                                    {
                                        id: 'q2',
                                        question: 'What will console.log(typeof 42) output?',
                                        type: 'multiple-choice',
                                        options: ['integer', 'number', 'float', 'digit'],
                                        correctAnswer: 1,
                                        explanation: 'JavaScript has a single number type for both integers and floating-point numbers.',
                                    },
                                    {
                                        id: 'q3',
                                        question: 'Which method is used to add an event listener to an element?',
                                        type: 'multiple-choice',
                                        options: ['onClick()', 'addEventListener()', 'attachEvent()', 'on()'],
                                        correctAnswer: 1,
                                        explanation: 'addEventListener() is the standard method for attaching event handlers to elements.',
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
        prerequisites: [],
        learningOutcomes: [
            'Build complete web pages from scratch with semantic HTML',
            'Style responsive layouts using CSS and Flexbox',
            'Add interactivity with JavaScript event handlers',
            'Understand the fundamentals of how websites work',
            'Create your own portfolio website',
        ],
        duration: 12,
        rating: 4.8,
        enrollmentCount: 15420,
        certificateOffered: true,
        tags: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Frontend'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-12-10'),
    },

    {
        id: 'python-basics',
        title: 'Python Programming for Beginners',
        shortDescription: 'Learn Python from scratch with practical examples and exercises.',
        fullDescription: 'Master Python programming fundamentals through interactive lessons, coding challenges, and real-world projects. This course is perfect for absolute beginners who want to learn programming.',
        skillLevel: 'beginner' as SkillLevel,
        category: 'data-science',
        thumbnail: '/courses/python-basics.jpg',
        instructor: {
            name: 'Michael Torres',
            title: 'Data Science Instructor',
        },
        modules: [
            {
                id: 'python-intro',
                title: 'Python Fundamentals',
                description: 'Learn Python syntax and basic concepts',
                order: 1,
                estimatedDuration: 240,
                lessons: [
                    {
                        id: 'python-variables',
                        title: 'Variables and Data Types',
                        type: 'theory',
                        duration: 35,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'Python Variables',
                                        content: 'Variables are containers for storing data values. Python has no command for declaring a variable; you create one the moment you first assign a value to it.',
                                        codeExample: {
                                            language: 'python',
                                            code: `# String
name = "Alice"

# Integer
age = 30

# Float
height = 5.6

# Boolean
is_student = True

print(f"{name} is {age} years old")`,
                                            explanation: 'Basic Python variable declaration and f-string formatting.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'Python is dynamically typed',
                                    'Variable names should be descriptive',
                                    'Python has several built-in data types',
                                    'F-strings make string formatting easy',
                                ],
                            },
                        },
                    },
                ],
            },
        ],
        prerequisites: [],
        learningOutcomes: [
            'Write Python programs using proper syntax',
            'Work with variables, data types, and operators',
            'Create functions and understand scope',
            'Use conditional statements and loops',
            'Handle errors with try-except blocks',
        ],
        duration: 10,
        rating: 4.7,
        enrollmentCount: 12890,
        certificateOffered: true,
        tags: ['Python', 'Programming', 'Beginner', 'Data Science'],
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-11-30'),
    },

    // ===== INTERMEDIATE COURSES =====
    {
        id: 'react-intermediate',
        title: 'React Development Mastery',
        shortDescription: 'Build modern web applications with React, hooks, and state management.',
        fullDescription: 'Take your React skills to the next level with advanced hooks, context API, custom hooks, performance optimization, and real-world project patterns. Requires basic JavaScript knowledge.',
        skillLevel: 'intermediate' as SkillLevel,
        category: 'web-development',
        thumbnail: '/courses/react-mastery.jpg',
        instructor: {
            name: 'Emily Rodriguez',
            title: 'React Specialist',
        },
        modules: [
            {
                id: 'react-hooks-advanced',
                title: 'Advanced React Hooks',
                description: 'Master useEffect, useCallback, useMemo, and custom hooks',
                order: 1,
                estimatedDuration: 180,
                lessons: [
                    {
                        id: 'useeffect-deep',
                        title: 'useEffect Deep Dive',
                        type: 'theory',
                        duration: 40,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'Understanding useEffect',
                                        content: 'useEffect is a Hook that lets you synchronize a component with an external system. It handles side effects in function components.',
                                        codeExample: {
                                            language: 'javascript',
                                            code: `import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}`,
                                            explanation: 'useEffect with async data fetching, cleanup, and dependencies.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'useEffect runs after render by default',
                                    'Dependencies control when effects re-run',
                                    'Cleanup functions prevent memory leaks',
                                    'Empty dependency array runs effect once',
                                ],
                            },
                        },
                    },
                    {
                        id: 'custom-hooks-project',
                        title: 'Build Custom Hooks',
                        type: 'project',
                        duration: 90,
                        order: 2,
                        content: {
                            project: {
                                brief: 'Create a set of reusable custom hooks for common React patterns: data fetching, form handling, and local storage.',
                                objectives: [
                                    'Build a useFetch hook for API calls',
                                    'Create a useForm hook for form state management',
                                    'Implement a useLocalStorage hook',
                                    'Write TypeScript types for all hooks',
                                    'Include error handling',
                                ],
                                specifications: [
                                    'useFetch should handle loading, error, and data states',
                                    'useForm should validate inputs and handle submission',
                                    'useLocalStorage should sync state with localStorage',
                                    'All hooks must be properly typed with TypeScript',
                                    'Include JSDoc comments for documentation',
                                ],
                                resources: [
                                    { type: 'link', title: 'React Hooks Documentation', url: 'https://react.dev/reference/react' },
                                    { type: 'link', title: 'TypeScript with React', url: 'https://react.dev/learn/typescript' },
                                ],
                                rubric: [
                                    { criterion: 'Hooks work correctly', points: 30, description: 'All three hooks function as specified' },
                                    { criterion: 'TypeScript types', points: 20, description: 'Proper type definitions with generics' },
                                    { criterion: 'Error handling', points: 20, description: 'Graceful error handling in all hooks' },
                                    { criterion: 'Code quality', points: 20, description: 'Clean, readable, well-documented code' },
                                    { criterion: 'Reusability', points: 10, description: 'Hooks are generic and reusable' },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
        prerequisites: ['web-dev-fundamentals'],
        learningOutcomes: [
            'Master advanced React hooks and patterns',
            'Build custom reusable hooks',
            'Optimize React application performance',
            'Implement complex state management solutions',
            'Structure large-scale React applications',
        ],
        duration: 16,
        rating: 4.9,
        enrollmentCount: 8340,
        certificateOffered: true,
        tags: ['React', 'Hooks', 'JavaScript', 'Frontend', 'Intermediate'],
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2025-01-05'),
    },

    {
        id: 'api-design',
        title: 'RESTful API Design & Development',
        shortDescription: 'Design and build scalable REST APIs with Node.js and Express.',
        fullDescription: 'Learn to design, build, and deploy production-ready RESTful APIs. Cover authentication, validation, error handling, database integration, and API best practices.',
        skillLevel: 'intermediate' as SkillLevel,
        category: 'web-development',
        thumbnail: '/courses/api-design.jpg',
        instructor: {
            name: 'David Kim',
            title: 'Backend Architect',
        },
        modules: [
            {
                id: 'api-fundamentals',
                title: 'API Design Principles',
                description: 'Learn REST principles and API design patterns',
                order: 1,
                estimatedDuration: 150,
                lessons: [
                    {
                        id: 'rest-principles',
                        title: 'REST Architecture',
                        type: 'theory',
                        duration: 30,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'REST Principles',
                                        content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on stateless, client-server communication.',
                                        codeExample: {
                                            language: 'javascript',
                                            code: `// RESTful route examples
GET    /api/users          // Get all users
GET    /api/users/:id      // Get specific user
POST   /api/users          // Create new user
PUT    /api/users/:id      // Update user
DELETE /api/users/:id      // Delete user

// Express implementation
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});`,
                                            explanation: 'Standard REST API routes and HTTP methods.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'REST uses standard HTTP methods',
                                    'URLs represent resources, not actions',
                                    'APIs should be stateless',
                                    'Use proper status codes',
                                ],
                            },
                        },
                    },
                ],
            },
        ],
        prerequisites: ['web-dev-fundamentals'],
        learningOutcomes: [
            'Design RESTful API architectures',
            'Implement authentication and authorization',
            'Handle validation and error responses',
            'Optimize API performance',
            'Deploy APIs to production',
        ],
        duration: 14,
        rating: 4.6,
        enrollmentCount: 6720,
        certificateOffered: true,
        tags: ['API', 'REST', 'Node.js', 'Express', 'Backend'],
        createdAt: new Date('2024-04-05'),
        updatedAt: new Date('2024-12-20'),
    },

    // ===== ADVANCED COURSES =====
    {
        id: 'system-design',
        title: 'System Design & Architecture',
        shortDescription: 'Master distributed systems, scalability, and enterprise architecture.',
        fullDescription: 'Deep dive into designing large-scale distributed systems. Learn about microservices, caching strategies, load balancing, database sharding, message queues, and more through real-world case studies.',
        skillLevel: 'advanced' as SkillLevel,
        category: 'devops',
        thumbnail: '/courses/system-design.jpg',
        instructor: {
            name: 'Dr. James Anderson',
            title: 'Principal Systems Architect',
        },
        modules: [
            {
                id: 'scalability-patterns',
                title: 'Scalability & Performance',
                description: 'Design systems that scale to millions of users',
                order: 1,
                estimatedDuration: 240,
                lessons: [
                    {
                        id: 'caching-strategies',
                        title: 'Caching Strategies',
                        type: 'theory',
                        duration: 50,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'Multi-Level Caching',
                                        content: 'Implement caching at different layers (browser, CDN, application, database) to dramatically improve performance and reduce costs.',
                                        codeExample: {
                                            language: 'javascript',
                                            code: `// Redis caching layer
const redis = require('redis');
const client = redis.createClient();

async function getCachedData(key) {
  // Try cache first
  const cached = await client.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const data = await database.query(key);
  
  // Store in cache with TTL
  await client.setex(key, 3600, JSON.stringify(data));
  
  return data;
}`,
                                            explanation: 'Cache-aside pattern with Redis and TTL.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'Caching reduces database load',
                                    'Use appropriate TTL for different data types',
                                    'Implement cache invalidation strategies',
                                    'Consider cache coherence in distributed systems',
                                ],
                            },
                        },
                    },
                    {
                        id: 'design-twitter',
                        title: 'Design a Social Media Platform',
                        type: 'project',
                        duration: 120,
                        order: 2,
                        content: {
                            project: {
                                brief: 'Design the architecture for a Twitter-like social media platform that can handle 100 million daily active users.',
                                objectives: [
                                    'Design the high-level system architecture',
                                    'Plan database schema and sharding strategy',
                                    'Implement feed generation algorithm',
                                    'Design caching and CDN strategy',
                                    'Plan for real-time notifications',
                                ],
                                specifications: [
                                    'Support 100M DAU with 500M total users',
                                    'Handle 10K tweets per second at peak',
                                    'Feed generation under 200ms latency',
                                    'Design for 99.99% uptime',
                                    'Include disaster recovery plan',
                                ],
                                resources: [
                                    { type: 'link', title: 'Designing Data-Intensive Applications', url: '#' },
                                    { type: 'link', title: 'System Design Primer', url: '#' },
                                ],
                                rubric: [
                                    { criterion: 'Architecture Design', points: 25, description: 'Comprehensive system architecture diagram' },
                                    { criterion: 'Scalability', points: 25, description: 'System scales to requirements' },
                                    { criterion: 'Database Design', points: 20, description: 'Efficient schema and sharding strategy' },
                                    { criterion: 'Performance', points: 15, description: 'Meets latency requirements' },
                                    { criterion: 'Reliability', points: 15, description: 'Fault tolerance and disaster recovery' },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
        prerequisites: ['react-intermediate', 'api-design'],
        learningOutcomes: [
            'Design highly scalable distributed systems',
            'Architect microservices architectures',
            'Implement caching and load balancing strategies',
            'Design for high availability and fault tolerance',
            'Conduct technical interviews for system design',
        ],
        duration: 20,
        rating: 4.9,
        enrollmentCount: 4580,
        certificateOffered: true,
        tags: ['System Design', 'Architecture', 'Scalability', 'Distributed Systems', 'Advanced'],
        createdAt: new Date('2024-05-15'),
        updatedAt: new Date('2025-01-10'),
    },

    {
        id: 'ml-production',
        title: 'Machine Learning in Production',
        shortDescription: 'Deploy and scale ML models in production environments.',
        fullDescription: 'Go beyond model training to learn how to deploy, monitor, and maintain machine learning systems in production. Cover MLOps, model serving, monitoring, A/B testing, and CI/CD for ML.',
        skillLevel: 'advanced' as SkillLevel,
        category: 'ai-ml',
        thumbnail: '/courses/ml-production.jpg',
        instructor: {
            name: 'Dr. Priya Sharma',
            title: 'ML Engineering Lead',
        },
        modules: [
            {
                id: 'mlops-fundamentals',
                title: 'MLOps Fundamentals',
                description: 'Build and deploy production ML pipelines',
                order: 1,
                estimatedDuration: 200,
                lessons: [
                    {
                        id: 'model-serving',
                        title: 'Model Serving Architectures',
                        type: 'theory',
                        duration: 45,
                        order: 1,
                        content: {
                            theory: {
                                sections: [
                                    {
                                        heading: 'Model Deployment Patterns',
                                        content: 'Learn different patterns for serving ML models: batch prediction, real-time API, edge deployment, and streaming inference.',
                                        codeExample: {
                                            language: 'python',
                                            code: `from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load model once at startup
model = joblib.load('model.pkl')

@app.post("/predict")
async def predict(features: list[float]):
    """Real-time prediction endpoint"""
    X = np.array([features])
    prediction = model.predict(X)
    confidence = model.predict_proba(X).max()
    
    return {
        "prediction": int(prediction[0]),
        "confidence": float(confidence)
    }`,
                                            explanation: 'FastAPI service for real-time model predictions.',
                                        },
                                    },
                                ],
                                keyTakeaways: [
                                    'Different serving patterns for different use cases',
                                    'Optimize for latency vs throughput trade-offs',
                                    'Implement proper error handling',
                                    'Monitor model performance in production',
                                ],
                            },
                        },
                    },
                    {
                        id: 'mlops-project',
                        title: 'End-to-End ML Pipeline',
                        type: 'project',
                        duration: 150,
                        order: 2,
                        content: {
                            project: {
                                brief: 'Build a complete MLOps pipeline for a recommendation system, from training to deployment with monitoring and retraining capabilities.',
                                objectives: [
                                    'Create automated training pipeline',
                                    'Build model serving infrastructure',
                                    'Implement monitoring and alerting',
                                    'Set up A/B testing framework',
                                    'Create CI/CD pipeline for models',
                                ],
                                specifications: [
                                    'Use Kubernetes for deployment',
                                    'Implement blue-green deployment strategy',
                                    'Track model metrics in Prometheus',
                                    'Set up automated retraining triggers',
                                    'P95 latency under 100ms',
                                ],
                                resources: [
                                    { type: 'link', title: 'MLOps Principles', url: '#' },
                                    { type: 'link', title: 'Kubernetes for ML', url: '#' },
                                ],
                                rubric: [
                                    { criterion: 'Pipeline Automation', points: 25, description: 'Fully automated training and deployment' },
                                    { criterion: 'Model Serving', points: 20, description: 'Scalable and performant serving' },
                                    { criterion: 'Monitoring', points: 20, description: 'Comprehensive metrics and alerting' },
                                    { criterion: 'Testing', points: 20, description: 'A/B testing implementation' },
                                    { criterion: 'Documentation', points: 15, description: 'Clear documentation and runbooks' },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
        prerequisites: ['python-basics'],
        learningOutcomes: [
            'Deploy ML models to production',
            'Implement MLOps best practices',
            'Monitor and maintain ML systems',
            'Build automated ML pipelines',
            'Conduct A/B tests for models',
        ],
        duration: 18,
        rating: 4.8,
        enrollmentCount: 3210,
        certificateOffered: true,
        tags: ['Machine Learning', 'MLOps', 'Production', 'Deployment', 'Advanced'],
        createdAt: new Date('2024-06-01'),
        updatedAt: new Date('2024-12-15'),
    },
];

/**
 * Get course by ID
 */
export function getCourseById(id: string): Course | undefined {
    return courses.find(course => course.id === id);
}

/**
 * Get courses by skill level
 */
export function getCoursesByLevel(level: SkillLevel): Course[] {
    return courses.filter(course => course.skillLevel === level);
}

/**
 * Get courses by category
 */
export function getCoursesByCategory(category: string): Course[] {
    return courses.filter(course => course.category === category);
}

/**
 * Get popular courses
 */
export function getPopularCourses(limit: number = 6): Course[] {
    return [...courses]
        .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
        .slice(0, limit);
}
