import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompetitionSession, ObjectiveQuestion, CompetitionGameType } from '../../types';
import {
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  Plus,
  Trash2,
  QrCode,
  Check,
  BookOpen,
  RefreshCw,
  HelpCircle,
  FileQuestion,
  Eye,
  Save,
  Gamepad2,
  MapPin
} from 'lucide-react';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { COMPETITION_GAMES, CompetitionGameMeta, generateGameContent } from '../../data/competitionGamesData';
import { CompetitionGameCard } from './CompetitionGameCard';

// Preview Game Components
import { WordSearchGame } from './games/WordSearchGame';
import { CrosswordGame } from './games/CrosswordGame';
import { MatchingPairsGame } from './games/MatchingPairsGame';
import { FillInBlanksGame } from './games/FillInBlanksGame';
import { AlphabetChallengeGame } from './games/AlphabetChallengeGame';
import { TrueFalseGame } from './games/TrueFalseGame';
import { RapidFireGame } from './games/RapidFireGame';

export const CompetitionCreate: React.FC = () => {
  const { role, addCompetition, setCompetitionView, setTeacherView, showToast } = useApp();

  const [selectedGameType, setSelectedGameType] = useState<CompetitionGameType>('quiz');
  const [title, setTitle] = useState('Arena Showdown');
  const [format, setFormat] = useState<'simple' | 'game_style'>('game_style');
  const [teamFormation, setTeamFormation] = useState<'auto' | 'self_select' | 'host_assigned'>('auto');
  const [questionSource, setQuestionSource] = useState<'ai' | 'manual'>('ai');
  const [timePerQuestion, setTimePerQuestion] = useState(25);

  // Auto Generator State
  const [autoTopic, setAutoTopic] = useState('Animals & Fun Nature');
  const [autoQuestionCount, setAutoQuestionCount] = useState<number>(4);
  const [autoDifficulty, setAutoDifficulty] = useState('Easy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [gameData, setGameData] = useState<any>(() => generateGameContent('quiz', 'Animals & Fun Nature'));

  // Dedicated state for kids game styles
  const [wordSearchWords, setWordSearchWords] = useState<string[]>(['CAT', 'DOG', 'SUN', 'STAR', 'FISH', 'MOON']);
  const [newWordInput, setNewWordInput] = useState('');

  const [matchingPairsList, setMatchingPairsList] = useState<{ id: string; left: string; right: string }[]>([
    { id: 'p-1', left: '🐶 Dog', right: '🦴 Bone' },
    { id: 'p-2', left: '🐱 Cat', right: '🥛 Bowl of Milk' },
    { id: 'p-3', left: '🐝 Bee', right: '🍯 Sweet Honey' },
    { id: 'p-4', left: '☀️ Sun', right: '🌻 Sunflower' }
  ]);
  const [newPairLeft, setNewPairLeft] = useState('');
  const [newPairRight, setNewPairRight] = useState('');

  const [crosswordItems, setCrosswordItems] = useState<{ id: string; type: 'across' | 'down'; num: number; word: string; clue: string; hint?: string; row?: number; col?: number }[]>([
    { id: 'cw-1', type: 'across', num: 1, word: 'STAR', clue: 'Twinkles brightly high in the night sky ⭐', hint: 'Twinkle twinkle little... (4 letters: S T A R)', row: 0, col: 0 },
    { id: 'cw-2', type: 'across', num: 2, word: 'NEWS', clue: 'Daily stories and interesting world updates 📰', hint: 'What we read or watch for daily info (4 letters: N E W S)', row: 2, col: 0 },
    { id: 'cw-3', type: 'down', num: 1, word: 'SUN', clue: 'Bright warm star that gives us daylight ☀️', hint: 'Big yellow star in daytime sky (3 letters: S U N)', row: 0, col: 0 },
    { id: 'cw-4', type: 'down', num: 2, word: 'TREE', clue: 'Has green leaves and birds build nests here 🌳', hint: 'Grows tall in garden or forest (4 letters: T R E E)', row: 0, col: 1 },
    { id: 'cw-5', type: 'down', num: 3, word: 'ROSE', clue: 'A beautiful fragrant red garden flower 🌹', hint: 'Sweet smelling red flower (4 letters: R O S E)', row: 0, col: 3 }
  ]);
  const [newCwType, setNewCwType] = useState<'across' | 'down'>('across');
  const [newCwNum, setNewCwNum] = useState(5);
  const [newCwWord, setNewCwWord] = useState('');
  const [newCwClue, setNewCwClue] = useState('');
  const [newCwHint, setNewCwHint] = useState('');

  const [fillInBlanksList, setFillInBlanksList] = useState<{ id: string; textBefore: string; textAfter: string; correctWord: string; options: string }[]>([
    { id: 'fib-1', textBefore: 'The grass in the park is', textAfter: 'and fresh.', correctWord: 'Green', options: 'Green, Pink, Purple, Orange' },
    { id: 'fib-2', textBefore: 'Little birds have wings and can', textAfter: 'high in the sky.', correctWord: 'Fly', options: 'Fly, Drive, Swim, Write' }
  ]);
  const [newFibBefore, setNewFibBefore] = useState('');
  const [newFibWord, setNewFibWord] = useState('');
  const [newFibAfter, setNewFibAfter] = useState('');
  const [newFibOpts, setNewFibOpts] = useState('');

  const [alphabetList, setAlphabetList] = useState<{ letter: string; question: string; answer: string; hint: string }[]>([]);
  const [newAlphaLetter, setNewAlphaLetter] = useState('A');
  const [newAlphaQuestion, setNewAlphaQuestion] = useState('');
  const [newAlphaAnswer, setNewAlphaAnswer] = useState('');
  const [newAlphaHint, setNewAlphaHint] = useState('');

  const [memoryPairsList, setMemoryPairsList] = useState<{ id: string; term: string; definition: string }[]>([
    { id: 'm-1', term: '🦁 Lion', definition: 'King of Jungle' },
    { id: 'm-2', term: '🍎 Apple', definition: 'Sweet Red Fruit' },
    { id: 'm-3', term: '☀️ Sun', definition: 'Shines in Day' },
    { id: 'm-4', term: '🌙 Moon', definition: 'Glows at Night' }
  ]);
  const [newMemTerm, setNewMemTerm] = useState('');
  const [newMemDef, setNewMemDef] = useState('');

  const [trueFalseList, setTrueFalseList] = useState<{ id: string; statement: string; isTrue: boolean; explanation: string }[]>([
    { id: 'tf-1', statement: 'The Sun is super hot and gives us daylight. ☀️', isTrue: true, explanation: 'The sun provides warm light and energy.' },
    { id: 'tf-2', statement: 'Fish live in trees and can fly in the sky. 🐟', isTrue: false, explanation: 'Fish live and swim in water, not in trees!' },
    { id: 'tf-3', statement: 'An elephant is the largest living animal on land. 🐘', isTrue: true, explanation: 'Elephants are huge and gentle giants!' }
  ]);
  const [newTfStatement, setNewTfStatement] = useState('');
  const [newTfVal, setNewTfVal] = useState(true);
  const [newTfExp, setNewTfExp] = useState('');

  const [mapLocationsList, setMapLocationsList] = useState<{ id: string; name: string; region: string; hint: string; x: number; y: number }[]>([]);
  const [newMapName, setNewMapName] = useState('');
  const [newMapRegion, setNewMapRegion] = useState('Global');
  const [newMapHint, setNewMapHint] = useState('');

  const [questions, setQuestions] = useState<ObjectiveQuestion[]>([
    {
      id: 'cq-1',
      type: 'mcq',
      question: 'Which animal is known as the King of the Jungle? 🦁',
      options: ['Lion', 'Monkey', 'Elephant', 'Rabbit'],
      correctAnswer: 'Lion',
      explanation: 'The lion is called the king of the jungle because of its bravery and strength!'
    },
    {
      id: 'cq-2',
      type: 'mcq',
      question: 'How many days are there in a week? 📅',
      options: ['7 days', '5 days', '10 days', '12 days'],
      correctAnswer: '7 days',
      explanation: 'There are 7 days from Monday to Sunday!'
    }
  ]);

  const handleAutoGenerateQuestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (selectedGameType === 'word_search') {
        const content = generateGameContent('word_search', autoTopic);
        if (content?.words) {
          setWordSearchWords(content.words);
        }
        showToast(`Generated ${content?.words?.length || 6} words for "${autoTopic}"!`);
      } else if (selectedGameType === 'matching_pairs') {
        const content = generateGameContent('matching_pairs', autoTopic);
        if (content?.pairs) {
          setMatchingPairsList(content.pairs);
        }
        showToast(`Generated concept pairs for "${autoTopic}"!`);
      } else if (selectedGameType === 'fill_in_blanks') {
        const content = generateGameContent('fill_in_blanks', autoTopic);
        if (content?.questions) {
          setFillInBlanksList(content.questions.map((q: any) => ({
            id: q.id,
            textBefore: q.textBefore,
            textAfter: q.textAfter,
            correctWord: q.correctWord,
            options: Array.isArray(q.options) ? q.options.join(', ') : q.options
          })));
        }
        showToast(`Generated fill-in-the-blank sentences for "${autoTopic}"!`);
      } else if (selectedGameType === 'true_false') {
        const content = generateGameContent('true_false', autoTopic);
        if (content?.statements) {
          setTrueFalseList(content.statements);
        }
        showToast(`Generated True/False statements for "${autoTopic}"!`);
      } else if (selectedGameType === 'crossword') {
        const content = generateGameContent('crossword', autoTopic);
        if (content?.across && content?.down) {
          const items: any[] = [];
          content.across.forEach((a: any) => {
            items.push({
              id: `cw-a-${a.num}`,
              type: 'across',
              num: a.num,
              word: a.word,
              clue: a.clue,
              hint: a.hint,
              row: a.row,
              col: a.col
            });
          });
          content.down.forEach((d: any) => {
            items.push({
              id: `cw-d-${d.num}`,
              type: 'down',
              num: d.num,
              word: d.word,
              clue: d.clue,
              hint: d.hint,
              row: d.row,
              col: d.col
            });
          });
          setCrosswordItems(items);
        }
        showToast(`Generated Crossword clues with student hints for "${autoTopic}"!`);
      } else {
        // Kids Quiz & Rapid Fire MCQs
        const generated: ObjectiveQuestion[] = [
          {
            id: `aq-${Date.now()}-1`,
            type: 'mcq',
            question: 'What color do you get when you mix Red and Yellow? 🎨',
            options: ['Orange', 'Green', 'Purple', 'Blue'],
            correctAnswer: 'Orange',
            explanation: 'Mixing red and yellow creates vibrant orange!'
          },
          {
            id: `aq-${Date.now()}-2`,
            type: 'mcq',
            question: 'Which sweet golden treat do honeybees make? 🐝',
            options: ['Honey', 'Milk', 'Chocolate', 'Juice'],
            correctAnswer: 'Honey',
            explanation: 'Honeybees make honey from sweet flower nectar.'
          },
          {
            id: `aq-${Date.now()}-3`,
            type: 'mcq',
            question: 'Which planet is known as the Red Planet in our solar system? 🪐',
            options: ['Mars', 'Earth', 'Venus', 'Jupiter'],
            correctAnswer: 'Mars',
            explanation: 'Mars looks red because of rusty iron dust on its surface!'
          },
          {
            id: `aq-${Date.now()}-4`,
            type: 'mcq',
            question: 'How many legs does an octopus have? 🐙',
            options: ['8 legs', '6 legs', '4 legs', '10 legs'],
            correctAnswer: '8 legs',
            explanation: 'An octopus has 8 long arms called tentacles!'
          }
        ];
        setQuestions(generated);
        showToast(`${generated.length} questions generated for "${autoTopic}"!`);
      }

      setIsGenerating(false);
    }, 400);
  };

  const compileGameData = () => {
    switch (selectedGameType) {
      case 'word_search': {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const grid: string[][] = Array.from({ length: 10 }, () =>
          Array.from({ length: 10 }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
        );
        wordSearchWords.slice(0, 6).forEach((w, rowIdx) => {
          const cleanW = w.toUpperCase().trim();
          const startCol = Math.max(0, Math.floor((10 - cleanW.length) / 2));
          for (let i = 0; i < cleanW.length && (startCol + i) < 10; i++) {
            grid[rowIdx + 1][startCol + i] = cleanW[i];
          }
        });
        return { gridSize: 10, words: wordSearchWords, grid };
      }
      case 'crossword': {
        const across = crosswordItems.filter(c => c.type === 'across').map((c, idx) => ({
          num: c.num,
          word: c.word.toUpperCase(),
          clue: c.clue,
          hint: c.hint,
          row: typeof c.row === 'number' ? c.row : idx * 2,
          col: typeof c.col === 'number' ? c.col : 0
        }));
        const down = crosswordItems.filter(c => c.type === 'down').map((c, idx) => ({
          num: c.num,
          word: c.word.toUpperCase(),
          clue: c.clue,
          hint: c.hint,
          row: typeof c.row === 'number' ? c.row : 0,
          col: typeof c.col === 'number' ? c.col : idx * 2
        }));
        const maxR = Math.max(
          ...across.map(a => a.row),
          ...down.map(d => d.row + d.word.length - 1),
          3
        ) + 1;
        const maxC = Math.max(
          ...across.map(a => a.col + a.word.length - 1),
          ...down.map(d => d.col),
          3
        ) + 1;
        return { rows: maxR, cols: maxC, across, down };
      }
      case 'matching_pairs':
        return { pairs: matchingPairsList };
      case 'fill_in_blanks':
        return {
          questions: fillInBlanksList.map(item => ({
            id: item.id,
            textBefore: item.textBefore,
            textAfter: item.textAfter,
            correctWord: item.correctWord,
            options: item.options.split(',').map(s => s.trim())
          }))
        };
      case 'alphabet':
        return { letters: alphabetList };
      case 'true_false':
        return { statements: trueFalseList };
      case 'rapid_fire':
      case 'quiz':
      default:
        return { questions };
    }
  };

  const handleAddManualQuestion = (type: 'mcq' | 'true_false') => {
    const id = `mq-${Date.now()}`;
    if (type === 'mcq') {
      setQuestions(prev => [
        ...prev,
        {
          id,
          type: 'mcq',
          question: '',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
          explanation: ''
        }
      ]);
      showToast('New MCQ question added.');
    } else {
      setQuestions(prev => [
        ...prev,
        {
          id,
          type: 'true_false',
          question: '',
          options: ['True', 'False'],
          correctAnswer: 'True',
          explanation: ''
        }
      ]);
      showToast('New True/False question added.');
    }
  };

  const handleUpdateQuestion = (id: string, updates: Partial<ObjectiveQuestion>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleUpdateOption = (questionId: string, optionIndex: number, newValue: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== questionId || !q.options) return q;
      const newOptions = [...q.options];
      const oldVal = newOptions[optionIndex];
      newOptions[optionIndex] = newValue;
      const updatedCorrect = q.correctAnswer === oldVal ? newValue : q.correctAnswer;
      return { ...q, options: newOptions, correctAnswer: updatedCorrect };
    }));
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      showToast('A competition must have at least one question.', 'error');
      return;
    }
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast('Question removed.');
  };

  // Dedicated manual addition & removal handlers for each game style
  const handleAddWord = () => {
    if (!newWordInput.trim()) return;
    const clean = newWordInput.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (clean.length < 2) {
      showToast('Word must be at least 2 letters long.', 'error');
      return;
    }
    setWordSearchWords(prev => [...prev, clean]);
    setNewWordInput('');
    showToast(`Added word "${clean}" to word search.`);
  };

  const handleRemoveWord = (index: number) => {
    if (wordSearchWords.length <= 2) {
      showToast('Word search requires at least 2 words.', 'error');
      return;
    }
    setWordSearchWords(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddCrosswordItem = () => {
    if (!newCwWord.trim() || !newCwClue.trim()) {
      showToast('Please provide both the answer word and clue.', 'error');
      return;
    }
    const clean = newCwWord.trim().toUpperCase().replace(/[^A-Z]/g, '');
    setCrosswordItems(prev => [
      ...prev,
      {
        id: `cw-${Date.now()}`,
        type: newCwType,
        num: newCwNum,
        word: clean,
        clue: newCwClue.trim(),
        hint: newCwHint.trim() || `Starts with ${clean[0]} (${clean.length} letters)`
      }
    ]);
    setNewCwWord('');
    setNewCwClue('');
    setNewCwHint('');
    setNewCwNum(prev => prev + 1);
    showToast(`Added ${newCwType.toUpperCase()} clue for "${clean}".`);
  };

  const handleRemoveCrosswordItem = (id: string) => {
    if (crosswordItems.length <= 1) {
      showToast('At least one crossword clue is required.', 'error');
      return;
    }
    setCrosswordItems(prev => prev.filter(c => c.id !== id));
  };

  const handleAddMatchingPair = () => {
    if (!newPairLeft.trim() || !newPairRight.trim()) {
      showToast('Please provide both term and matching definition.', 'error');
      return;
    }
    setMatchingPairsList(prev => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        left: newPairLeft.trim(),
        right: newPairRight.trim()
      }
    ]);
    setNewPairLeft('');
    setNewPairRight('');
    showToast('Added matching pair.');
  };

  const handleRemoveMatchingPair = (id: string) => {
    if (matchingPairsList.length <= 2) {
      showToast('At least 2 matching pairs are required.', 'error');
      return;
    }
    setMatchingPairsList(prev => prev.filter(p => p.id !== id));
  };

  const handleAddFillInBlank = () => {
    if (!newFibWord.trim()) {
      showToast('Please enter the missing blank word.', 'error');
      return;
    }
    const opts = newFibOpts.trim() ? newFibOpts.trim() : `${newFibWord.trim()}, Option A, Option B, Option C`;
    setFillInBlanksList(prev => [
      ...prev,
      {
        id: `fib-${Date.now()}`,
        textBefore: newFibBefore.trim(),
        textAfter: newFibAfter.trim(),
        correctWord: newFibWord.trim(),
        options: opts
      }
    ]);
    setNewFibBefore('');
    setNewFibWord('');
    setNewFibAfter('');
    setNewFibOpts('');
    showToast('Added fill-in-the-blank item.');
  };

  const handleRemoveFillInBlank = (id: string) => {
    if (fillInBlanksList.length <= 1) {
      showToast('At least one sentence is required.', 'error');
      return;
    }
    setFillInBlanksList(prev => prev.filter(f => f.id !== id));
  };

  const handleAddAlphabetPrompt = () => {
    if (!newAlphaQuestion.trim() || !newAlphaAnswer.trim()) {
      showToast('Please enter both question prompt and answer.', 'error');
      return;
    }
    setAlphabetList(prev => [
      ...prev,
      {
        letter: newAlphaLetter.trim().toUpperCase().charAt(0) || 'A',
        question: newAlphaQuestion.trim(),
        answer: newAlphaAnswer.trim(),
        hint: newAlphaHint.trim()
      }
    ]);
    setNewAlphaQuestion('');
    setNewAlphaAnswer('');
    setNewAlphaHint('');
    const nextCode = newAlphaLetter.charCodeAt(0) + 1;
    if (nextCode <= 90) {
      setNewAlphaLetter(String.fromCharCode(nextCode));
    }
    showToast('Added alphabet prompt.');
  };

  const handleRemoveAlphabetPrompt = (idx: number) => {
    if (alphabetList.length <= 1) {
      showToast('At least one alphabet prompt is required.', 'error');
      return;
    }
    setAlphabetList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddMemoryPair = () => {
    if (!newMemTerm.trim() || !newMemDef.trim()) {
      showToast('Please enter both card term and match definition.', 'error');
      return;
    }
    setMemoryPairsList(prev => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        term: newMemTerm.trim(),
        definition: newMemDef.trim()
      }
    ]);
    setNewMemTerm('');
    setNewMemDef('');
    showToast('Added memory card pair.');
  };

  const handleRemoveMemoryPair = (id: string) => {
    if (memoryPairsList.length <= 2) {
      showToast('At least 2 pairs are required.', 'error');
      return;
    }
    setMemoryPairsList(prev => prev.filter(m => m.id !== id));
  };

  const handleAddTrueFalse = () => {
    if (!newTfStatement.trim()) {
      showToast('Please enter the statement text.', 'error');
      return;
    }
    setTrueFalseList(prev => [
      ...prev,
      {
        id: `tf-${Date.now()}`,
        statement: newTfStatement.trim(),
        isTrue: newTfVal,
        explanation: newTfExp.trim()
      }
    ]);
    setNewTfStatement('');
    setNewTfExp('');
    showToast('Added True/False statement.');
  };

  const handleRemoveTrueFalse = (id: string) => {
    if (trueFalseList.length <= 1) {
      showToast('At least one statement is required.', 'error');
      return;
    }
    setTrueFalseList(prev => prev.filter(t => t.id !== id));
  };

  const handleAddMapLocation = () => {
    if (!newMapName.trim()) {
      showToast('Please enter the location name.', 'error');
      return;
    }
    setMapLocationsList(prev => [
      ...prev,
      {
        id: `loc-${Date.now()}`,
        name: newMapName.trim(),
        region: newMapRegion.trim() || 'Global',
        hint: newMapHint.trim(),
        x: Math.floor(15 + Math.random() * 70),
        y: Math.floor(20 + Math.random() * 60)
      }
    ]);
    setNewMapName('');
    setNewMapHint('');
    showToast('Added map target location.');
  };

  const handleRemoveMapLocation = (id: string) => {
    if (mapLocationsList.length <= 1) {
      showToast('At least one map location is required.', 'error');
      return;
    }
    setMapLocationsList(prev => prev.filter(l => l.id !== id));
  };

  const getItemCount = () => {
    switch (selectedGameType) {
      case 'word_search': return wordSearchWords.length;
      case 'crossword': return crosswordItems.length;
      case 'matching_pairs': return matchingPairsList.length;
      case 'fill_in_blanks': return fillInBlanksList.length;
      case 'alphabet': return alphabetList.length;
      case 'true_false': return trueFalseList.length;
      default: return questions.length;
    }
  };

  const handleSelectGame = (game: CompetitionGameMeta) => {
    setSelectedGameType(game.id);
    const content = generateGameContent(game.id, autoTopic);
    setGameData(content);
    if (content?.words) setWordSearchWords(content.words);
    if (content?.pairs) setMatchingPairsList(content.pairs);
    if (content?.statements) setTrueFalseList(content.statements);
    if (content?.questions) {
      if (game.id === 'fill_in_blanks') {
        setFillInBlanksList(content.questions.map((q: any) => ({
          id: q.id,
          textBefore: q.textBefore,
          textAfter: q.textAfter,
          correctWord: q.correctWord,
          options: Array.isArray(q.options) ? q.options.join(', ') : (q.options || '')
        })));
      } else {
        setQuestions(content.questions);
      }
    }

    setTitle(`${game.name} Showdown`);
    showToast(`Active Game: ${game.name}`);
  };

  const handleSaveDraft = () => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const compiled = compileGameData();
    const newComp: CompetitionSession = {
      id: `comp-draft-${Date.now()}`,
      title,
      code: randomPin,
      status: 'lobby',
      format,
      gameType: selectedGameType,
      difficulty: autoDifficulty as any,
      topic: autoTopic,
      gameData: compiled,
      teamFormation,
      participantsCount: 1,
      currentQuestionIndex: 0,
      totalQuestions: getItemCount(),
      timePerQuestion,
      timeRemaining: timePerQuestion,
      isPaused: false,
      questions,
      participants: [
        { id: 'p-host', name: 'Organizer (Host)', avatar: 'ORG', score: 0, streak: 0 }
      ]
    };

    addCompetition(newComp);
    showToast(`Competition "${title}" saved as draft.`, 'info');
    if (role === 'teacher') {
      setTeacherView('dashboard');
    } else {
      setCompetitionView('dashboard');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const compiled = compileGameData();
    const newComp: CompetitionSession = {
      id: `comp-${Date.now()}`,
      title,
      code: randomPin,
      status: 'lobby',
      format,
      gameType: selectedGameType,
      difficulty: autoDifficulty as any,
      topic: autoTopic,
      gameData: compiled,
      teamFormation,
      participantsCount: 1,
      currentQuestionIndex: 0,
      totalQuestions: getItemCount(),
      timePerQuestion,
      timeRemaining: timePerQuestion,
      isPaused: false,
      questions,
      participants: [
        { id: 'p-host', name: 'Organizer (Host)', avatar: 'ORG', score: 0, streak: 0 }
      ]
    };

    addCompetition(newComp);
    if (role === 'teacher') {
      setTeacherView('dashboard');
      showToast(`Competition "${title}" published with PIN ${randomPin}`);
    } else {
      setCompetitionView('lobby');
      showToast(`Competition lobby created with PIN ${randomPin}`);
    }
  };

  const isDark = role === 'competition';
  const activeGame = COMPETITION_GAMES.find(g => g.id === selectedGameType) || COMPETITION_GAMES[0];

  const renderCurrentStyleItems = () => {
    switch (selectedGameType) {
      case 'word_search':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '14px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
              {wordSearchWords.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#CCFBF1',
                    color: '#0F766E',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.05em'
                  }}
                >
                  {word}
                  <button
                    type="button"
                    onClick={() => handleRemoveWord(idx)}
                    style={{ background: 'transparent', border: 'none', color: '#0F766E', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                    title="Remove word"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
              💡 Words will be placed dynamically in a 10×10 grid for students to find horizontally, vertically, or diagonally.
            </p>
          </div>
        );

      case 'crossword':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {crosswordItems.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No crossword clues added yet.</p>
            ) : (
              crosswordItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    backgroundColor: '#FAFAF9',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Badge variant={item.type === 'across' ? 'emerald' : 'lime'}>
                      {item.type.toUpperCase()} #{item.num}
                    </Badge>
                    <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#0F766E', letterSpacing: '0.05em' }}>
                      {item.word}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>
                      — {item.clue}
                    </span>
                    {item.hint && (
                      <span style={{ fontSize: '11px', color: '#0F766E', backgroundColor: '#CCFBF1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        💡 {item.hint}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCrosswordItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                    title="Delete clue"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        );

      case 'matching_pairs':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {matchingPairsList.map(pair => (
              <div
                key={pair.id}
                style={{
                  padding: '12px',
                  backgroundColor: '#FAFAF9',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase' }}>
                    Concept Pair
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMatchingPair(pair.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F766E' }}>
                  {pair.left}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--color-text-main)', borderTop: '1px dashed #E2E8F0', paddingTop: '4px' }}>
                  ↕ {pair.right}
                </div>
              </div>
            ))}
          </div>
        );

      case 'fill_in_blanks':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {fillInBlanksList.map(item => (
              <div
                key={item.id}
                style={{
                  padding: '14px',
                  backgroundColor: '#FAFAF9',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                    {item.textBefore}{' '}
                    <span style={{ backgroundColor: '#CCFBF1', color: '#0F766E', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', border: '1px dashed #0D9488' }}>
                      [{item.correctWord}]
                    </span>{' '}
                    {item.textAfter}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                    Options: {item.options}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFillInBlank(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        );

      case 'alphabet':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alphabetList.map((alpha, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#FAFAF9',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 900 }}>
                    {alpha.letter}
                  </span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {alpha.question}
                    </div>
                    <div style={{ fontSize: '12px', color: '#0F766E', marginTop: '2px' }}>
                      <strong>Answer:</strong> {alpha.answer} {alpha.hint && <span>• <em>Hint: {alpha.hint}</em></span>}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAlphabetPrompt(idx)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {trueFalseList.map(tf => (
              <div
                key={tf.id}
                style={{
                  padding: '14px',
                  backgroundColor: '#FAFAF9',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: tf.isTrue ? '#CCFBF1' : '#FEE2E2', color: tf.isTrue ? '#0F766E' : '#B91C1C' }}>
                      {tf.isTrue ? 'TRUE' : 'FALSE'}
                    </span>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {tf.statement}
                    </span>
                  </div>
                  {tf.explanation && (
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Explanation: {tf.explanation}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTrueFalse(tf.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        );

      case 'rapid_fire':
      case 'quiz':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, idx) => (
              <div
                key={q.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FAFAF9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                      {idx + 1}
                    </span>
                    <Badge variant="emerald">{q.type.toUpperCase()}</Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                    title="Delete this question"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {q.question}
                </div>

                {q.options && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = q.correctAnswer === opt;
                      return (
                        <div
                          key={oIdx}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: isCorrect ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border-light)',
                            backgroundColor: isCorrect ? '#F0FDFA' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '13px'
                          }}
                        >
                          <span style={{ fontWeight: isCorrect ? 700 : 500, color: isCorrect ? '#0F766E' : 'var(--color-text-main)' }}>
                            {opt}
                          </span>
                          {isCorrect && (
                            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Check size={11} /> Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.explanation && (
                  <div style={{ backgroundColor: '#F0FDFA', border: '1px solid #CCFBF1', borderLeft: '3px solid #0F766E', padding: '8px 12px', borderRadius: '4px', fontSize: '12.5px', color: '#134E4A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={13} color="#0F766E" />
                    <span><strong>Concept Note:</strong> {q.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
    }
  };

  const renderManualFormForStyle = () => {
    switch (selectedGameType) {
      case 'word_search':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Keyword to Word Search Grid:
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <Input
                  placeholder="Type simple word (e.g. CAT, DOG, STAR, SUN)..."
                  value={newWordInput}
                  onChange={e => setNewWordInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddWord(); } }}
                />
              </div>
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddWord}>
                Add Word
              </Button>
            </div>
          </div>
        );

      case 'crossword':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Crossword Clue (With Student Hint):
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 80px 1.2fr 2fr', gap: '10px', alignItems: 'flex-end' }}>
              <Select
                label="Direction"
                value={newCwType}
                onChange={e => setNewCwType(e.target.value as any)}
                options={[
                  { value: 'across', label: 'Across' },
                  { value: 'down', label: 'Down' }
                ]}
              />
              <Input
                label="Clue #"
                type="number"
                value={newCwNum.toString()}
                onChange={e => setNewCwNum(Number(e.target.value))}
              />
              <Input
                label="Answer Word"
                placeholder="e.g. CAT"
                value={newCwWord}
                onChange={e => setNewCwWord(e.target.value)}
              />
              <Input
                label="Clue Description"
                placeholder="e.g. Cute pet that purrs and says Meow 🐱"
                value={newCwClue}
                onChange={e => setNewCwClue(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Student Hint (Optional)"
                  placeholder="e.g. Starts with C, rhymes with HAT (3 letters)"
                  value={newCwHint}
                  onChange={e => setNewCwHint(e.target.value)}
                />
              </div>
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddCrosswordItem}>
                Add Clue
              </Button>
            </div>
          </div>
        );

      case 'matching_pairs':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Friendly Match Pair:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <Input
                label="Left Item"
                placeholder="e.g. 🐶 Dog"
                value={newPairLeft}
                onChange={e => setNewPairLeft(e.target.value)}
              />
              <Input
                label="Matching Friend / Pair"
                placeholder="e.g. 🦴 Bone"
                value={newPairRight}
                onChange={e => setNewPairRight(e.target.value)}
              />
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddMatchingPair}>
                Add Pair
              </Button>
            </div>
          </div>
        );

      case 'fill_in_blanks':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Fill-in-the-Blank Sentence:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '10px' }}>
              <Input
                label="Text Before Blank"
                placeholder="e.g. The grass in the park is"
                value={newFibBefore}
                onChange={e => setNewFibBefore(e.target.value)}
              />
              <Input
                label="Missing Word (Correct)"
                placeholder="e.g. Green"
                value={newFibWord}
                onChange={e => setNewFibWord(e.target.value)}
              />
              <Input
                label="Text After Blank"
                placeholder="e.g. and fresh."
                value={newFibAfter}
                onChange={e => setNewFibAfter(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginTop: '4px' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Options (comma separated)"
                  placeholder="e.g. Green, Pink, Purple, Orange"
                  value={newFibOpts}
                  onChange={e => setNewFibOpts(e.target.value)}
                />
              </div>
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddFillInBlank}>
                Add Sentence
              </Button>
            </div>
          </div>
        );

      case 'alphabet':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Alphabet Challenge Prompt:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1fr 1fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <Input
                label="Letter"
                value={newAlphaLetter}
                onChange={e => setNewAlphaLetter(e.target.value.toUpperCase().slice(0, 1))}
              />
              <Input
                label="Question Prompt"
                placeholder="e.g. Congestion control algorithm by Google"
                value={newAlphaQuestion}
                onChange={e => setNewAlphaQuestion(e.target.value)}
              />
              <Input
                label="Winning Word"
                placeholder="e.g. BBR"
                value={newAlphaAnswer}
                onChange={e => setNewAlphaAnswer(e.target.value)}
              />
              <Input
                label="Hint / Clue"
                placeholder="e.g. Bottleneck Bandwidth"
                value={newAlphaHint}
                onChange={e => setNewAlphaHint(e.target.value)}
              />
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddAlphabetPrompt}>
                Add Prompt
              </Button>
            </div>
          </div>
        );


      case 'true_false':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add True/False Statement:
            </span>
            <Input
              label="Statement Text *"
              placeholder="e.g. The Sun is super hot and gives us daylight. ☀️"
              value={newTfStatement}
              onChange={e => setNewTfStatement(e.target.value)}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', marginBottom: '6px' }}>
                  Correct Answer
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setNewTfVal(true)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '12px',
                      border: newTfVal ? '2px solid #0F766E' : '1px solid #CBD5E1',
                      backgroundColor: newTfVal ? '#CCFBF1' : '#FFFFFF',
                      color: newTfVal ? '#0F766E' : '#64748B',
                      cursor: 'pointer'
                    }}
                  >
                    True
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTfVal(false)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '12px',
                      border: !newTfVal ? '2px solid #B91C1C' : '1px solid #CBD5E1',
                      backgroundColor: !newTfVal ? '#FEE2E2' : '#FFFFFF',
                      color: !newTfVal ? '#B91C1C' : '#64748B',
                      cursor: 'pointer'
                    }}
                  >
                    False
                  </button>
                </div>
              </div>
              <Input
                label="Concept Explanation (Displayed post-round)"
                placeholder="e.g. The Sun is our bright star giving light and life!"
                value={newTfExp}
                onChange={e => setNewTfExp(e.target.value)}
              />
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddTrueFalse}>
                Add Statement
              </Button>
            </div>
          </div>
        );


      case 'rapid_fire':
      case 'quiz':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button type="button" variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => handleAddManualQuestion('mcq')}>
                + Add MCQ Question
              </Button>
              <Button type="button" variant="secondary" size="sm" icon={<Plus size={14} />} onClick={() => handleAddManualQuestion('true_false')}>
                + Add True/False
              </Button>
            </div>

            {/* Editable Question Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  style={{
                    padding: '18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                        Question #{idx + 1}
                      </span>
                      <Badge variant="emerald">{q.type.toUpperCase()}</Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                      title="Delete question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <Input
                    label="Question Text *"
                    placeholder="e.g. Which animal is known as the King of the Jungle? 🦁"
                    value={q.question}
                    onChange={e => handleUpdateQuestion(q.id, { question: e.target.value })}
                    required
                  />

                  {/* MCQ Options with Mark Correct Toggle */}
                  {q.type === 'mcq' && q.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                        Answer Options (Click "Mark Correct" to select the winning answer):
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctAnswer === opt;
                          return (
                            <div
                              key={optIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 10px',
                                borderRadius: '6px',
                                border: isCorrect ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                                backgroundColor: isCorrect ? '#F0FDFA' : '#FAFAF9'
                              }}
                            >
                              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', width: '20px' }}>
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <input
                                type="text"
                                className="input-field"
                                style={{ flex: 1, padding: '6px 10px', fontSize: '13px' }}
                                value={opt}
                                onChange={e => handleUpdateOption(q.id, optIdx, e.target.value)}
                                placeholder={`Option ${optIdx + 1}`}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateQuestion(q.id, { correctAnswer: opt })}
                                style={{
                                  padding: '5px 10px',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  borderRadius: '4px',
                                  border: 'none',
                                  cursor: 'pointer',
                                  backgroundColor: isCorrect ? '#0F766E' : '#E2E8F0',
                                  color: isCorrect ? '#FFFFFF' : '#475569',
                                  whiteSpace: 'nowrap',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '3px'
                                }}
                              >
                                {isCorrect ? <><Check size={11} /> Correct</> : 'Mark Correct'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* True / False Options */}
                  {q.type === 'true_false' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                        Select Correct Answer:
                      </span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {['True', 'False'].map(val => {
                          const isCorrect = q.correctAnswer === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => handleUpdateQuestion(q.id, { correctAnswer: val })}
                              style={{
                                padding: '8px 24px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 700,
                                border: isCorrect ? '2px solid #0F766E' : '1px solid var(--color-border)',
                                backgroundColor: isCorrect ? '#0F766E' : '#FFFFFF',
                                color: isCorrect ? '#FFFFFF' : 'var(--color-text-main)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              {isCorrect && <Check size={13} />}
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <Input
                    label="Concept Explanation (Displayed to students in post-question review)"
                    placeholder="e.g. BBR measures bottleneck bandwidth and propagation delay to eliminate bufferbloat."
                    value={q.explanation}
                    onChange={e => handleUpdateQuestion(q.id, { explanation: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '880px', margin: '0 auto' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="competition-badge">STEP 1 TO 4</span>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: isDark ? '#99F6E4' : 'var(--color-primary-emerald)' }}>
            Tournament Setup
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: isDark ? '#FFFFFF' : 'var(--color-text-main)', margin: 0 }}>
          Create Standalone Competition
        </h1>
        <p style={{ fontSize: '13.5px', color: isDark ? '#CCFBF1' : 'var(--color-text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
          Configure live session format, tournament rules, team assignment mode, and generate guest join credentials.
        </p>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Step 1: Select Competition / Game Format */}
        <div className="competition-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Gamepad2 size={18} color="#0F766E" />
              1. Select Competition Game Format
            </h3>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F766E' }}>
              Active: {COMPETITION_GAMES.find(g => g.id === selectedGameType)?.name}
            </span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
            Choose from fun, kid-friendly game types for your tournament arena.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '14px',
              maxHeight: '440px',
              overflowY: 'auto',
              padding: '4px'
            }}
          >
            {COMPETITION_GAMES.map(game => (
              <CompetitionGameCard
                key={game.id}
                game={game}
                mode="picker"
                isSelected={selectedGameType === game.id}
                onSelect={() => handleSelectGame(game)}
              />
            ))}
          </div>
        </div>

        {/* Step 2: Tournament Details */}
        <div className="competition-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px' }}>
            2. Tournament Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              label="Competition Title *"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. National Arena Showdown"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div
                onClick={() => setFormat('game_style')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: format === 'game_style' ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  backgroundColor: format === 'game_style' ? 'var(--color-mint-bg)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  Game-Style Showdown ⚡
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  High-speed countdown, dynamic streak bonuses, and live animated podium ceremonies.
                </span>
              </div>

              <div
                onClick={() => setFormat('simple')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: format === 'simple' ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  backgroundColor: format === 'simple' ? 'var(--color-mint-bg)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  Simple Tournament
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  Linear academic pacing with static point scores and post-event results.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Team Formation */}
        <div className="competition-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '14px' }}>
            3. Team Formation
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { id: 'auto', name: 'Auto-Balanced', desc: 'System automatically balances participants into color squads.' },
              { id: 'self_select', name: 'Self-Select', desc: 'Participants select their own team during lobby entry.' },
              { id: 'host_assigned', name: 'Host-Assigned', desc: 'Host drags & drops players into designated team brackets.' }
            ].map(tf => (
              <div
                key={tf.id}
                onClick={() => setTeamFormation(tf.id as any)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: teamFormation === tf.id ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  backgroundColor: teamFormation === tf.id ? 'var(--color-mint-bg)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--color-text-main)', display: 'block' }}>
                  {tf.name}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  {tf.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Game Content Configuration (${activeGame.name}) */}
        <div className="competition-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeGame.category}
                </span>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '2px 8px', borderRadius: '10px' }}>
                  {activeGame.name}
                </span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
                4. Content Configuration: {activeGame.name} ({getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'})
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', margin: '3px 0 0 0' }}>
                {questionSource === 'ai'
                  ? `Auto-generate ${activeGame.name} content with AI based on your chosen discipline and topic.`
                  : `Manually build and manage custom ${activeGame.name} data items.`}
              </p>
            </div>

            {/* Toggle Mode: Auto Generator (AI) vs Manual Entry */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', border: '1px solid var(--color-border-light)' }}>
              <button
                type="button"
                onClick={() => setQuestionSource('ai')}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: questionSource === 'ai' ? 'var(--color-primary-emerald)' : 'transparent',
                  color: questionSource === 'ai' ? '#FFFFFF' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: questionSource === 'ai' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <RefreshCw size={13} /> Auto Generator (AI)
              </button>
              <button
                type="button"
                onClick={() => setQuestionSource('manual')}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: questionSource === 'manual' ? 'var(--color-primary-emerald)' : 'transparent',
                  color: questionSource === 'manual' ? '#FFFFFF' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: questionSource === 'manual' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Plus size={13} /> Manual Entry
              </button>
            </div>
          </div>

          {/* 1. AUTO GENERATOR (AI) MODE */}
          {questionSource === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Configuration Box */}
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ⚡ AI Auto Generator Mode
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      — Enter discipline & topic to generate curated content for {activeGame.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F766E', backgroundColor: '#CCFBF1', padding: '3px 9px', borderRadius: '12px' }}>
                    Format: {activeGame.name} • {autoDifficulty}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <Input
                    label="Game Topic (e.g. Cute Animals, Solar System, Colors)"
                    value={autoTopic}
                    onChange={e => setAutoTopic(e.target.value)}
                    placeholder="e.g. Cute Animals, Solar System, Colors & Fruits..."
                  />

                  <Select
                    label="Difficulty"
                    value={autoDifficulty}
                    onChange={e => setAutoDifficulty(e.target.value)}
                    options={[
                      { value: 'Easy', label: 'Easy (Beginner Friendly)' },
                      { value: 'Medium', label: 'Medium' },
                      { value: 'Super Fun', label: 'Super Fun' }
                    ]}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    AI generates <strong>{activeGame.name}</strong> data specifically tailored to "{autoTopic}".
                  </span>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    icon={<RefreshCw size={15} />}
                    onClick={handleAutoGenerateQuestions}
                    disabled={isGenerating}
                  >
                    {isGenerating ? `Generating ${activeGame.name}...` : `⚡ Generate ${activeGame.name} with AI`}
                  </Button>
                </div>
              </div>

              {/* Display Generated Items for Active Game Style */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    Active {activeGame.name} Content ({getItemCount()} items):
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Review generated items below. Switch to <strong>Manual Entry</strong> if you wish to add custom items.
                  </span>
                </div>

                {renderCurrentStyleItems()}
              </div>
            </div>
          )}

          {/* 2. MANUAL ENTRY MODE */}
          {questionSource === 'manual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Topic Header for Manual Mode */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    ✍️ Manual Builder: {activeGame.name}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'} Configured
                  </span>
                </div>
                <div>
                  <Input
                    label="Game Topic / Theme"
                    value={autoTopic}
                    onChange={e => setAutoTopic(e.target.value)}
                    placeholder="e.g. Animals, Daily Life, Fun Shapes, Science..."
                  />
                </div>
              </div>

              {/* Dedicated Style Manual Entry Form */}
              {renderManualFormForStyle()}

              {/* Current Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Configured {activeGame.name} Items ({getItemCount()}):
                </span>
                {renderCurrentStyleItems()}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Button
            variant="secondary"
            type="button"
            onClick={() => role === 'teacher' ? setTeacherView('dashboard') : setCompetitionView('dashboard')}
          >
            Cancel
          </Button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="secondary"
              type="button"
              icon={<Eye size={15} />}
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview Game
            </Button>

            <Button
              variant="secondary"
              type="button"
              icon={<Save size={15} />}
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>

            <Button
              variant={isDark ? "lime" : "primary"}
              size="lg"
              type="submit"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Publish & Open Lobby (Get PIN/QR) →
            </Button>
          </div>
        </div>
      </form>

      {/* Interactive Game Preview Modal */}
      {isPreviewOpen && (
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={`Preview: ${title} (${COMPETITION_GAMES.find(g => g.id === selectedGameType)?.name})`}
          maxWidth="920px"
        >
          <div style={{ padding: '8px 0' }}>
            {selectedGameType === 'word_search' && (
              <WordSearchGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'crossword' && (
              <CrosswordGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'matching_pairs' && (
              <MatchingPairsGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'fill_in_blanks' && (
              <FillInBlanksGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'alphabet' && (
              <AlphabetChallengeGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'true_false' && (
              <TrueFalseGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'rapid_fire' && (
              <RapidFireGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
            {selectedGameType === 'quiz' && (
              <RapidFireGame
                data={compileGameData() as any}
                onComplete={(sc, acc) => {
                  showToast(`Preview Finished! Score: ${sc} pts (${acc}% accuracy)`);
                  setIsPreviewOpen(false);
                }}
                onExit={() => setIsPreviewOpen(false)}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
