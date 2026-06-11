import type { Quiz } from '@/lib/types/quiz';

const now = new Date();
const daysFromNow = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const mockQuizzes: Quiz[] = [
  {
    id: 'q-js-fundamentals',
    title: 'JavaScript Fundamentals',
    description:
      'Test your knowledge of variables, types, control flow, functions, and basic asynchronous patterns.',
    durationMinutes: 30,
    questionCount: 5,
    windowStart: daysFromNow(-1),
    windowEnd: daysFromNow(7),
    status: 'open',
    questions: [
      {
        id: 'js-q1',
        prompt: 'Which keyword creates a constant binding in JavaScript?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'var' },
          { id: 'b', text: 'let' },
          { id: 'c', text: 'const' },
          { id: 'd', text: 'static' },
        ],
      },
      {
        id: 'js-q2',
        prompt: 'JavaScript is best described as a ___ typed language.',
        type: 'mcq',
        options: [
          { id: 'a', text: 'statically' },
          { id: 'b', text: 'dynamically' },
          { id: 'c', text: 'rigidly' },
          { id: 'd', text: 'manifestly' },
        ],
      },
      {
        id: 'js-q3',
        prompt: '`null === undefined` evaluates to true.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
      {
        id: 'js-q4',
        prompt: 'What does `Array.prototype.map` return?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'A new array of the same length' },
          { id: 'b', text: 'The original array, mutated' },
          { id: 'c', text: 'undefined' },
          { id: 'd', text: 'A single value' },
        ],
      },
      {
        id: 'js-q5',
        prompt: 'Which of these is NOT a primitive type in JavaScript?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'string' },
          { id: 'b', text: 'number' },
          { id: 'c', text: 'object' },
          { id: 'd', text: 'boolean' },
        ],
      },
    ],
  },
  {
    id: 'q-react-hooks',
    title: 'React Hooks Deep Dive',
    description:
      'A focused quiz on useState, useEffect, useMemo, useCallback, and writing custom hooks.',
    durationMinutes: 45,
    questionCount: 5,
    windowStart: daysFromNow(-2),
    windowEnd: daysFromNow(3),
    status: 'in_progress',
    questions: [
      {
        id: 'rh-q1',
        prompt: 'Which hook is used to manage local component state?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'useEffect' },
          { id: 'b', text: 'useState' },
          { id: 'c', text: 'useMemo' },
          { id: 'd', text: 'useRef' },
        ],
      },
      {
        id: 'rh-q2',
        prompt: 'useEffect runs only on the initial mount.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
      {
        id: 'rh-q3',
        prompt: 'What does useMemo return?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'A memoized value' },
          { id: 'b', text: 'A memoized function' },
          { id: 'c', text: 'A ref object' },
          { id: 'd', text: 'undefined' },
        ],
      },
      {
        id: 'rh-q4',
        prompt: 'Which hook should you reach for when running side effects?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'useState' },
          { id: 'b', text: 'useRef' },
          { id: 'c', text: 'useEffect' },
          { id: 'd', text: 'useMemo' },
        ],
      },
      {
        id: 'rh-q5',
        prompt: 'useCallback returns a memoized callback function.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
    ],
  },
  {
    id: 'q-css-grid',
    title: 'CSS Grid Workshop',
    description:
      'Hands-on questions about grid containers, items, template areas, and responsive layouts.',
    durationMinutes: 60,
    questionCount: 5,
    windowStart: daysFromNow(5),
    windowEnd: daysFromNow(12),
    status: 'upcoming',
    questions: [
      {
        id: 'cg-q1',
        prompt: 'Which property defines the columns of a grid container?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'grid-template-columns' },
          { id: 'b', text: 'grid-columns' },
          { id: 'c', text: 'display' },
          { id: 'd', text: 'flex-direction' },
        ],
      },
      {
        id: 'cg-q2',
        prompt: '`grid-template-areas` is a valid CSS property.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
      {
        id: 'cg-q3',
        prompt: 'What does the `1fr` unit represent?',
        type: 'mcq',
        options: [
          { id: 'a', text: '1 pixel' },
          { id: 'b', text: '1 rem' },
          { id: 'c', text: '1 fraction of the available space' },
          { id: 'd', text: '1 percent' },
        ],
      },
      {
        id: 'cg-q4',
        prompt: 'Which display value turns an element into a grid container?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'flex' },
          { id: 'b', text: 'block' },
          { id: 'c', text: 'grid' },
          { id: 'd', text: 'inline' },
        ],
      },
      {
        id: 'cg-q5',
        prompt: 'Grid items can be placed using line numbers.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
    ],
  },
  {
    id: 'q-html-basics',
    title: 'HTML Basics',
    description:
      'Elements, attributes, semantic markup, and accessible document structure.',
    durationMinutes: 20,
    questionCount: 5,
    windowStart: daysFromNow(-10),
    windowEnd: daysFromNow(-2),
    status: 'closed',
    questions: [
      {
        id: 'hb-q1',
        prompt: 'Which element is semantic for navigation links?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'div' },
          { id: 'b', text: 'nav' },
          { id: 'c', text: 'section' },
          { id: 'd', text: 'span' },
        ],
      },
      {
        id: 'hb-q2',
        prompt: '`<br>` is a self-closing void element.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
      {
        id: 'hb-q3',
        prompt: 'What does the `alt` attribute on `<img>` provide?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'Alternative text for accessibility' },
          { id: 'b', text: 'Image alignment' },
          { id: 'c', text: 'A loading animation' },
          { id: 'd', text: 'A fallback URL' },
        ],
      },
      {
        id: 'hb-q4',
        prompt: 'Which of these is a block-level element?',
        type: 'mcq',
        options: [
          { id: 'a', text: 'span' },
          { id: 'b', text: 'a' },
          { id: 'c', text: 'em' },
          { id: 'd', text: 'div' },
        ],
      },
      {
        id: 'hb-q5',
        prompt: 'HTML is case-sensitive.',
        type: 'true_false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
    ],
  },
];
