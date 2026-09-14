import { CompetitionGameType } from '../types';

export interface CompetitionGameMeta {
  id: CompetitionGameType;
  name: string;
  tagline: string;
  shortDescription: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Dynamic';
  madeCount: string;
  category: 'quizzes' | 'words' | 'logic' | 'visual';
  badge: string;
  estimatedMinutes: number;
  sampleData: any;
}

export const COMPETITION_GAMES: CompetitionGameMeta[] = [
  {
    id: 'quiz',
    name: 'Quiz Challenge',
    tagline: 'Fun & Colorful Multiple Choice Showdown',
    shortDescription: 'Classic 4-color multiple choice game with big buttons, countdown timer, and fun celebrations!',
    difficulty: 'Easy',
    madeCount: '3,200,000+ played',
    category: 'quizzes',
    badge: 'POPULAR',
    estimatedMinutes: 2,
    sampleData: {
      questions: [
        {
          id: 'q-1',
          type: 'mcq',
          question: 'Which animal is known as the King of the Jungle? 🦁',
          options: ['Lion', 'Monkey', 'Elephant', 'Rabbit'],
          correctAnswer: 'Lion',
          explanation: 'The lion is called the king of the jungle because of its strength and bravery!'
        },
        {
          id: 'q-2',
          type: 'mcq',
          question: 'How many days are there in a week? 📅',
          options: ['7 days', '5 days', '10 days', '12 days'],
          correctAnswer: '7 days',
          explanation: 'There are 7 days: Monday to Sunday!'
        },
        {
          id: 'q-3',
          type: 'mcq',
          question: 'What color do you get when you mix Red and Yellow? 🎨',
          options: ['Orange', 'Green', 'Purple', 'Blue'],
          correctAnswer: 'Orange',
          explanation: 'Mixing red and yellow creates bright orange!'
        },
        {
          id: 'q-4',
          type: 'mcq',
          question: 'Which sweet treat do honeybees make? 🐝',
          options: ['Honey', 'Milk', 'Chocolate', 'Juice'],
          correctAnswer: 'Honey',
          explanation: 'Bees collect flower nectar to produce sweet golden honey.'
        }
      ]
    }
  },
  {
    id: 'crossword',
    name: 'Crossword Puzzle (With Hints)',
    tagline: 'Interactive Word Grid with Student Hints',
    shortDescription: 'Solve fun word clues across and down! Includes student hints (💡), letter reveals, and auto-focus typing so no one gets stuck!',
    difficulty: 'Easy',
    madeCount: '1,980,000+ played',
    category: 'words',
    badge: 'STUDENT HINTS 💡',
    estimatedMinutes: 2,
    sampleData: {
      rows: 4,
      cols: 4,
      across: [
        { num: 1, row: 0, col: 0, word: 'STAR', clue: 'Twinkles brightly high in the night sky ⭐', hint: 'Twinkle twinkle little... (4 letters: S T A R)' },
        { num: 2, row: 2, col: 0, word: 'NEWS', clue: 'Daily stories and interesting world updates 📰', hint: 'What we read or watch for daily info (4 letters: N E W S)' }
      ],
      down: [
        { num: 1, row: 0, col: 0, word: 'SUN', clue: 'Bright warm star giving us daylight ☀️', hint: 'Big yellow star in the sky (3 letters: S U N)' },
        { num: 2, row: 0, col: 1, word: 'TREE', clue: 'Has green leaves and birds build nests here 🌳', hint: 'Grows tall in garden or forest (4 letters: T R E E)' },
        { num: 3, row: 0, col: 3, word: 'ROSE', clue: 'A beautiful fragrant red garden flower 🌹', hint: 'Sweet smelling red flower (4 letters: R O S E)' }
      ]
    }
  },
  {
    id: 'true_false',
    name: 'True or False',
    tagline: 'Quick & Easy Yes or No Challenge',
    shortDescription: 'Tap Green for True or Red for False in a fast, fun round!',
    difficulty: 'Easy',
    madeCount: '1,850,000+ played',
    category: 'quizzes',
    badge: 'SUPER EASY',
    estimatedMinutes: 2,
    sampleData: {
      statements: [
        {
          id: 'tf-1',
          statement: 'The Sun is super hot and gives us daylight. ☀️',
          isTrue: true,
          explanation: 'The sun provides warm light and energy to our Earth.'
        },
        {
          id: 'tf-2',
          statement: 'Fish live in trees and can fly in the sky. 🐟',
          isTrue: false,
          explanation: 'Fish breathe with gills and swim in water, not in trees!'
        },
        {
          id: 'tf-3',
          statement: 'Elephants are the largest living land animals. 🐘',
          isTrue: true,
          explanation: 'Elephants are the biggest and heaviest land animals!'
        },
        {
          id: 'tf-4',
          statement: 'Ice cream melts when left in the hot sunshine. 🍦',
          isTrue: true,
          explanation: 'Heat warms up ice cream and turns it into liquid.'
        },
        {
          id: 'tf-5',
          statement: 'Cats can bark just like dogs. 🐱',
          isTrue: false,
          explanation: 'Cats say meow, only dogs bark!'
        }
      ]
    }
  },
  {
    id: 'word_search',
    name: 'Word Search',
    tagline: 'Spot & Circle Words',
    shortDescription: 'Find simple words like CAT, DOG, and SUN in a friendly letter grid!',
    difficulty: 'Easy',
    madeCount: '2,900,000+ played',
    category: 'words',
    badge: 'WORD FINDER',
    estimatedMinutes: 2,
    sampleData: {
      gridSize: 8,
      words: ['CAT', 'DOG', 'SUN', 'STAR', 'FISH', 'MOON'],
      grid: [
        ['C', 'A', 'T', 'X', 'B', 'M', 'N', 'P'],
        ['D', 'O', 'G', 'Y', 'S', 'U', 'N', 'Q'],
        ['S', 'T', 'A', 'R', 'K', 'L', 'F', 'W'],
        ['F', 'I', 'S', 'H', 'J', 'R', 'I', 'Z'],
        ['M', 'O', 'O', 'N', 'A', 'B', 'S', 'V'],
        ['A', 'P', 'P', 'L', 'E', 'C', 'H', 'T'],
        ['B', 'A', 'L', 'L', 'T', 'R', 'E', 'E'],
        ['B', 'I', 'R', 'D', 'L', 'I', 'O', 'N']
      ]
    }
  },
  {
    id: 'matching_pairs',
    name: 'Matching Pairs',
    tagline: 'Connect Related Pairs',
    shortDescription: 'Tap to connect matching pairs: Dog to Bone, Bee to Honey, and Sun to Sunflower!',
    difficulty: 'Easy',
    madeCount: '2,100,000+ played',
    category: 'logic',
    badge: 'MATCH PAIRS',
    estimatedMinutes: 2,
    sampleData: {
      pairs: [
        { id: 'p-1', left: '🐶 Dog', right: '🦴 Bone' },
        { id: 'p-2', left: '🐱 Cat', right: '🥛 Bowl of Milk' },
        { id: 'p-3', left: '🐝 Bee', right: '🍯 Sweet Honey' },
        { id: 'p-4', left: '☀️ Sun', right: '🌻 Sunflower' },
        { id: 'p-5', left: '🌧️ Cloud', right: '💧 Rain Drops' },
        { id: 'p-6', left: '🍎 Apple', right: '🌳 Apple Tree' }
      ]
    }
  },
  {
    id: 'fill_in_blanks',
    name: 'Fill in the Blanks',
    tagline: 'Pick the Missing Word',
    shortDescription: 'Tap the missing friendly word from the choices to complete the sentence!',
    difficulty: 'Easy',
    madeCount: '920,000+ played',
    category: 'words',
    badge: 'SENTENCE FUN',
    estimatedMinutes: 2,
    sampleData: {
      questions: [
        {
          id: 'fib-1',
          textBefore: 'The grass in the park is',
          textAfter: 'and fresh.',
          correctWord: 'Green',
          options: ['Green', 'Pink', 'Purple', 'Orange']
        },
        {
          id: 'fib-2',
          textBefore: 'Little birds have wings and can',
          textAfter: 'high in the sky.',
          correctWord: 'Fly',
          options: ['Fly', 'Drive', 'Swim', 'Write']
        },
        {
          id: 'fib-3',
          textBefore: 'Cows give us fresh and healthy',
          textAfter: 'to drink every morning.',
          correctWord: 'Milk',
          options: ['Milk', 'Soda', 'Paint', 'Soup']
        },
        {
          id: 'fib-4',
          textBefore: 'We open an umbrella when it starts to',
          textAfter: 'outside.',
          correctWord: 'Rain',
          options: ['Rain', 'Sleep', 'Dance', 'Shine']
        }
      ]
    }
  },
  {
    id: 'rapid_fire',
    name: 'Rapid Fire',
    tagline: '10-Second Quick Showdown',
    shortDescription: 'Quick, exciting questions to see how fast students can tap the right answer!',
    difficulty: 'Easy',
    madeCount: '2,200,000+ played',
    category: 'quizzes',
    badge: 'SPEED ROUND',
    estimatedMinutes: 2,
    sampleData: {
      timeLimit: 10,
      questions: [
        {
          id: 'rf-1',
          question: 'How many legs does a spider have? 🕷️',
          options: ['8 legs', '4 legs', '6 legs', '2 legs'],
          correctAnswer: '8 legs',
          explanation: 'All spiders have 8 legs!'
        },
        {
          id: 'rf-2',
          question: 'What color is a ripe sweet banana? 🍌',
          options: ['Yellow', 'Blue', 'Purple', 'Black'],
          correctAnswer: 'Yellow',
          explanation: 'Bananas turn bright yellow when they are ripe and delicious.'
        },
        {
          id: 'rf-3',
          question: 'Which animal says "Moo"? 🐮',
          options: ['Cow', 'Dog', 'Cat', 'Sheep'],
          correctAnswer: 'Cow',
          explanation: 'A cow says moo!'
        },
        {
          id: 'rf-4',
          question: 'What shape is a full moon in the sky? 🌕',
          options: ['Circle', 'Square', 'Triangle', 'Star'],
          correctAnswer: 'Circle',
          explanation: 'A full moon is round like a ball or circle!'
        }
      ]
    }
  },
  {
    id: 'alphabet',
    name: 'Alphabet Wheel Challenge',
    tagline: 'A-to-Z Letter Explorer',
    shortDescription: 'Answer with words starting with each letter of the alphabet, with student hints included!',
    difficulty: 'Easy',
    madeCount: '810,000+ played',
    category: 'quizzes',
    badge: 'A-Z WHEEL',
    estimatedMinutes: 2,
    sampleData: {
      letters: [
        { letter: 'A', question: 'A sweet red or green fruit that keeps the doctor away 🍎', answer: 'APPLE', hint: 'Starts with A, grows on trees' },
        { letter: 'B', question: 'A yellow curved fruit monkeys love to eat 🍌', answer: 'BANANA', hint: 'Sweet yellow fruit' },
        { letter: 'C', question: 'A furry pet animal that purrs and catches mice 🐱', answer: 'CAT', hint: 'Says Meow' },
        { letter: 'D', question: 'A loyal pet friend that barks and wags its tail 🐶', answer: 'DOG', hint: 'Man\'s best friend' }
      ]
    }
  }
];

// Helper to generate simple, delightful kids content
export const generateGameContent = (gameType: CompetitionGameType, topic?: string, _subject?: string) => {
  const meta = COMPETITION_GAMES.find(g => g.id === gameType) || COMPETITION_GAMES[0];
  const t = (topic || '').toLowerCase();

  if (gameType === 'word_search') {
    let words = ['CAT', 'DOG', 'SUN', 'STAR', 'FISH', 'MOON'];
    if (t.includes('fruit') || t.includes('food')) {
      words = ['APPLE', 'BANANA', 'MANGO', 'PEACH', 'BERRY', 'MELON'];
    } else if (t.includes('animal') || t.includes('zoo')) {
      words = ['LION', 'TIGER', 'ZEBRA', 'PANDA', 'BEAR', 'MONKEY'];
    } else if (t.includes('color')) {
      words = ['RED', 'BLUE', 'GREEN', 'PINK', 'YELLOW', 'ORANGE'];
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const grid: string[][] = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
    );

    words.slice(0, 6).forEach((w, rowIdx) => {
      const cleanW = w.toUpperCase().slice(0, 6);
      const startCol = Math.max(0, Math.floor((8 - cleanW.length) / 2));
      for (let i = 0; i < cleanW.length && (startCol + i) < 8; i++) {
        if (grid[rowIdx + 1]) {
          grid[rowIdx + 1][startCol + i] = cleanW[i];
        }
      }
    });

    return { gridSize: 8, words, grid };
  }

  if (gameType === 'crossword') {
    return meta.sampleData;
  }

  if (gameType === 'matching_pairs') {
    if (t.includes('fruit') || t.includes('color')) {
      return {
        pairs: [
          { id: 'p-1', left: '🍎 Apple', right: 'Red Fruit' },
          { id: 'p-2', left: '🍌 Banana', right: 'Yellow Fruit' },
          { id: 'p-3', left: '🍇 Grapes', right: 'Purple Bunch' },
          { id: 'p-4', left: '🍊 Orange', right: 'Juicy Orange' },
          { id: 'p-5', left: '🍓 Strawberry', right: 'Sweet Berry' },
          { id: 'p-6', left: '🍉 Watermelon', right: 'Green outside, Red inside' }
        ]
      };
    }
    return meta.sampleData;
  }

  if (gameType === 'fill_in_blanks') {
    if (t.includes('animal')) {
      return {
        questions: [
          {
            id: 'fib-1',
            textBefore: 'A baby dog is called a',
            textAfter: 'and loves to play.',
            correctWord: 'Puppy',
            options: ['Puppy', 'Kitten', 'Duckling', 'Cub']
          },
          {
            id: 'fib-2',
            textBefore: 'Lions live in the wild and have a loud',
            textAfter: 'sound.',
            correctWord: 'Roar',
            options: ['Roar', 'Meow', 'Chirp', 'Bark']
          },
          {
            id: 'fib-3',
            textBefore: 'Fish have fins to help them',
            textAfter: 'in the clean water.',
            correctWord: 'Swim',
            options: ['Swim', 'Fly', 'Climb', 'Run']
          }
        ]
      };
    }
    return meta.sampleData;
  }

  if (gameType === 'true_false') {
    if (t.includes('space') || t.includes('sky')) {
      return {
        statements: [
          {
            id: 'tf-1',
            statement: 'The Moon shines bright in the night sky. 🌙',
            isTrue: true,
            explanation: 'The moon reflects light from the sun and glows at night!'
          },
          {
            id: 'tf-2',
            statement: 'Stars disappear completely and turn off every morning. ⭐',
            isTrue: false,
            explanation: 'Stars are always in space; daylight from our sun just makes them hard to see!'
          },
          {
            id: 'tf-3',
            statement: 'We live on planet Earth. 🌍',
            isTrue: true,
            explanation: 'Earth is our home planet with oceans, trees, and air!'
          }
        ]
      };
    }
    return meta.sampleData;
  }

  // Default game data
  return meta.sampleData;
};
