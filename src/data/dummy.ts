import { User, Question, Answer, Notification } from '../types';

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'alexchen',
    email: 'alex@example.com',
    reputation: 1250,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '2',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    reputation: 890,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '3',
    username: 'mike_js',
    email: 'mike@example.com',
    reputation: 2100,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
];

export const dummyQuestions: Question[] = [
  {
    id: '1',
    title: 'How to implement proper error handling in React applications?',
    description: '<p>I\'m working on a React application and struggling with implementing comprehensive error handling. What are the best practices for handling errors in React components, async operations, and API calls?</p><p>I\'ve tried using error boundaries but I\'m not sure if I\'m using them correctly. Any examples would be greatly appreciated!</p>',
    tags: ['react', 'javascript', 'error-handling', 'best-practices'],
    author: dummyUsers[0],
    votes: 23,
    answerCount: 4,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'What\'s the difference between useEffect and useLayoutEffect?',
    description: '<p>I keep seeing both <code>useEffect</code> and <code>useLayoutEffect</code> in React codebases but I\'m not sure when to use which one.</p><p>Can someone explain the key differences and provide examples of when each hook should be used?</p>',
    tags: ['react', 'hooks', 'useeffect', 'performance'],
    author: dummyUsers[1],
    votes: 18,
    answerCount: 2,
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    title: 'How to optimize bundle size in a large React application?',
    description: '<p>Our React application has grown quite large and the bundle size is becoming a concern. We\'re seeing slower load times and it\'s affecting user experience.</p><p>What are the most effective strategies for reducing bundle size? I\'ve heard about code splitting, tree shaking, and lazy loading but I\'m not sure where to start.</p>',
    tags: ['react', 'performance', 'webpack', 'optimization', 'bundle-size'],
    author: dummyUsers[2],
    votes: 31,
    answerCount: 6,
    createdAt: '2024-01-13T09:20:00Z',
    updatedAt: '2024-01-13T09:20:00Z'
  },
  {
    id: '4',
    title: 'TypeScript with React: When to use interfaces vs types?',
    description: '<p>I\'m building a React application with TypeScript and I\'m confused about when to use <code>interface</code> vs <code>type</code> for defining component props and state.</p><p>Are there specific scenarios where one is preferred over the other? What are the performance implications?</p>',
    tags: ['typescript', 'react', 'interfaces', 'types'],
    author: dummyUsers[1],
    votes: 15,
    answerCount: 3,
    createdAt: '2024-01-12T14:10:00Z',
    updatedAt: '2024-01-12T14:10:00Z'
  }
];

export const dummyAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    content: '<p>Great question! Here\'s a comprehensive approach to error handling in React:</p><p><strong>1. Error Boundaries</strong></p><p>Use error boundaries to catch JavaScript errors in component trees:</p><pre><code>class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.log(error, errorInfo);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}</code></pre><p><strong>2. Async Error Handling</strong></p><p>For async operations, use try-catch with async/await or .catch() with promises.</p>',
    author: dummyUsers[2],
    votes: 12,
    isAccepted: true,
    createdAt: '2024-01-15T11:15:00Z',
    updatedAt: '2024-01-15T11:15:00Z'
  },
  {
    id: '2',
    questionId: '1',
    content: '<p>I\'d also recommend using a library like <strong>react-error-boundary</strong> which provides a more modern hook-based approach:</p><pre><code>import { ErrorBoundary } from \'react-error-boundary\';\n\nfunction ErrorFallback({error, resetErrorBoundary}) {\n  return (\n    <div role="alert">\n      <h2>Something went wrong:</h2>\n      <pre>{error.message}</pre>\n      <button onClick={resetErrorBoundary}>Try again</button>\n    </div>\n  );\n}</code></pre><p>This gives you more flexibility and better developer experience.</p>',
    author: dummyUsers[1],
    votes: 8,
    isAccepted: false,
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z'
  },
  {
    id: '3',
    questionId: '2',
    content: '<p>The main differences are:</p><p><strong>useEffect</strong>:</p><ul><li>Runs asynchronously after the render is committed to the screen</li><li>Non-blocking</li><li>Perfect for data fetching, subscriptions, manually changing DOM</li></ul><p><strong>useLayoutEffect</strong>:</p><ul><li>Runs synchronously after all DOM mutations</li><li>Blocking</li><li>Use when you need to read layout from the DOM and synchronously re-render</li></ul><p>Use <code>useLayoutEffect</code> when you need to measure DOM elements or prevent visual inconsistencies.</p>',
    author: dummyUsers[0],
    votes: 15,
    isAccepted: true,
    createdAt: '2024-01-14T16:20:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  }
];

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'answer',
    title: 'New answer on your question',
    message: 'mike_js answered "How to implement proper error handling in React applications?"',
    read: false,
    createdAt: '2024-01-15T11:15:00Z',
    link: '/question/1'
  },
  {
    id: '2',
    type: 'vote',
    title: 'Your answer was upvoted',
    message: 'Someone upvoted your answer about React error boundaries',
    read: false,
    createdAt: '2024-01-15T10:45:00Z',
    link: '/question/1'
  },
  {
    id: '3',
    type: 'mention',
    title: 'You were mentioned',
    message: 'sarah_dev mentioned you in a comment',
    read: true,
    createdAt: '2024-01-14T18:30:00Z',
    link: '/question/2'
  }
];

export const currentUser: User = dummyUsers[0];