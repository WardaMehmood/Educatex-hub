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
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { TrueFalseGame } from './games/TrueFalseGame';
import { MapQuizGame } from './games/MapQuizGame';
import { RapidFireGame } from './games/RapidFireGame';

export const CompetitionCreate: React.FC = () => {
  const { role, addCompetition, setCompetitionView, setTeacherView, showToast } = useApp();

  const [selectedGameType, setSelectedGameType] = useState<CompetitionGameType>('quiz');
  const [title, setTitle] = useState('National Academic Arena Showdown');
  const [format, setFormat] = useState<'simple' | 'game_style'>('game_style');
  const [teamFormation, setTeamFormation] = useState<'auto' | 'self_select' | 'host_assigned'>('auto');
  const [questionSource, setQuestionSource] = useState<'ai' | 'manual'>('ai');
  const [timePerQuestion, setTimePerQuestion] = useState(25);

  // Auto Generator State
  const [autoSubject, setAutoSubject] = useState('Computer Science');
  const [autoTopic, setAutoTopic] = useState('TCP Congestion Control & Network Protocols');
  const [autoQuestionCount, setAutoQuestionCount] = useState<number>(4);
  const [autoDifficulty, setAutoDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [gameData, setGameData] = useState<any>(() => generateGameContent('quiz', 'TCP Congestion Control', 'Computer Science'));

  // Dedicated state for each of the 10 game styles
  const [wordSearchWords, setWordSearchWords] = useState<string[]>(['PYTHON', 'BINARY', 'ROUTER', 'PACKET', 'SOCKET', 'THREAD']);
  const [newWordInput, setNewWordInput] = useState('');

  const [matchingPairsList, setMatchingPairsList] = useState<{ id: string; left: string; right: string }[]>([
    { id: 'p-1', left: 'HTTP', right: 'Port 80 • Cleartext Web Protocol' },
    { id: 'p-2', left: 'HTTPS', right: 'Port 443 • TLS Encrypted Web' },
    { id: 'p-3', left: 'DNS', right: 'Port 53 • Domain Name Resolution' },
    { id: 'p-4', left: 'SSH', right: 'Port 22 • Secure Remote Terminal' }
  ]);
  const [newPairLeft, setNewPairLeft] = useState('');
  const [newPairRight, setNewPairRight] = useState('');

  const [crosswordItems, setCrosswordItems] = useState<{ id: string; type: 'across' | 'down'; num: number; word: string; clue: string }[]>([
    { id: 'cw-1', type: 'across', num: 1, word: 'TCP', clue: 'Reliable connection-oriented transport protocol' },
    { id: 'cw-2', type: 'across', num: 3, word: 'DNS', clue: 'Translates domain names to IP addresses' },
    { id: 'cw-3', type: 'down', num: 1, word: 'TLS', clue: 'Cryptographic protocol securing internet transport' },
    { id: 'cw-4', type: 'down', num: 2, word: 'PORT', clue: '16-bit number identifying host network application' }
  ]);
  const [newCwType, setNewCwType] = useState<'across' | 'down'>('across');
  const [newCwNum, setNewCwNum] = useState(5);
  const [newCwWord, setNewCwWord] = useState('');
  const [newCwClue, setNewCwClue] = useState('');

  const [fillInBlanksList, setFillInBlanksList] = useState<{ id: string; textBefore: string; textAfter: string; correctWord: string; options: string }[]>([
    { id: 'fib-1', textBefore: 'In computer networking, the', textAfter: 'layer guarantees end-to-end delivery of message streams.', correctWord: 'Transport', options: 'Transport, Physical, Application, Session' },
    { id: 'fib-2', textBefore: 'Google BBR congestion control measures bottleneck bandwidth and minimum', textAfter: 'to cap in-flight data.', correctWord: 'RTT', options: 'RTT, Loss Rate, Window Size, Jitter' }
  ]);
  const [newFibBefore, setNewFibBefore] = useState('');
  const [newFibWord, setNewFibWord] = useState('');
  const [newFibAfter, setNewFibAfter] = useState('');
  const [newFibOpts, setNewFibOpts] = useState('');

  const [alphabetList, setAlphabetList] = useState<{ letter: string; question: string; answer: string; hint: string }[]>([
    { letter: 'A', question: 'Symmetric encryption standard approved by NIST in 2001 to replace DES.', answer: 'AES', hint: 'Advanced Encryption Standard' },
    { letter: 'B', question: 'Congestion control protocol developed by Google measuring bottleneck bandwidth.', answer: 'BBR', hint: 'Bottleneck Bandwidth and RTT' },
    { letter: 'C', question: 'Default Linux congestion control algorithm utilizing cubic window growth.', answer: 'CUBIC', hint: 'Uses wall-clock time t' },
    { letter: 'D', question: 'Protocol translating domain names to IP addresses.', answer: 'DNS', hint: 'Port 53 service' }
  ]);
  const [newAlphaLetter, setNewAlphaLetter] = useState('E');
  const [newAlphaQuestion, setNewAlphaQuestion] = useState('');
  const [newAlphaAnswer, setNewAlphaAnswer] = useState('');
  const [newAlphaHint, setNewAlphaHint] = useState('');

  const [memoryPairsList, setMemoryPairsList] = useState<{ id: string; term: string; definition: string }[]>([
    { id: 'm-1', term: 'O(1)', definition: 'Hash Table Lookup' },
    { id: 'm-2', term: 'O(log N)', definition: 'Binary Search' },
    { id: 'm-3', term: 'FIFO', definition: 'Queue Structure' },
    { id: 'm-4', term: 'LIFO', definition: 'Call Stack Frame' }
  ]);
  const [newMemTerm, setNewMemTerm] = useState('');
  const [newMemDef, setNewMemDef] = useState('');

  const [trueFalseList, setTrueFalseList] = useState<{ id: string; statement: string; isTrue: boolean; explanation: string }[]>([
    { id: 'tf-1', statement: 'HTTP/3 operates over UDP using QUIC protocol instead of TCP.', isTrue: true, explanation: 'HTTP/3 uses QUIC (UDP) to eliminate head-of-line blocking.' },
    { id: 'tf-2', statement: 'In Python, inserting at index 0 takes O(1) constant time.', isTrue: false, explanation: 'Inserting at index 0 shifts all elements, taking O(N) linear time.' },
    { id: 'tf-3', statement: 'Hash collisions can be resolved using open addressing or separate chaining.', isTrue: true, explanation: 'Both techniques are standard collision resolution methods.' }
  ]);
  const [newTfStatement, setNewTfStatement] = useState('');
  const [newTfVal, setNewTfVal] = useState(true);
  const [newTfExp, setNewTfExp] = useState('');

  const [mapLocationsList, setMapLocationsList] = useState<{ id: string; name: string; region: string; hint: string; x: number; y: number }[]>([
    { id: 'loc-1', name: 'Silicon Valley Hub', region: 'North America', hint: 'Palo Alto & SF Bay Area', x: 22, y: 38 },
    { id: 'loc-2', name: 'CERN Collider', region: 'Europe', hint: 'Geneva Franco-Swiss border', x: 50, y: 32 },
    { id: 'loc-3', name: 'Bengaluru Corridor', region: 'Asia', hint: 'Silicon Valley of India', x: 72, y: 55 }
  ]);
  const [newMapName, setNewMapName] = useState('');
  const [newMapRegion, setNewMapRegion] = useState('Global');
  const [newMapHint, setNewMapHint] = useState('');

  const [questions, setQuestions] = useState<ObjectiveQuestion[]>([
    {
      id: 'cq-1',
      type: 'mcq',
      question: 'Which symmetric cipher algorithm was standardized by NIST to replace DES in 2001?',
      options: ['Blowfish', 'Rijndael (AES)', 'ChaCha20', 'RC4'],
      correctAnswer: 'Rijndael (AES)',
      explanation: 'The Belgian design Rijndael was selected as AES.'
    },
    {
      id: 'cq-2',
      type: 'mcq',
      question: 'In TCP congestion control, which state corresponds to probe transmission at 1.25x / 0.75x pacing?',
      options: ['Slow Start', 'ProbeBW', 'Fast Recovery', 'ProbeRTT'],
      correctAnswer: 'ProbeBW',
      explanation: 'Google BBR uses ProbeBW to test bottleneck capacity.'
    }
  ]);

  const handleAutoGenerateQuestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (selectedGameType === 'word_search') {
        const content = generateGameContent('word_search', autoTopic, autoSubject);
        if (content?.words) {
          setWordSearchWords(content.words);
        }
        showToast(`AI generated ${content?.words?.length || 6} keywords for "${autoTopic}"!`);
      } else if (selectedGameType === 'crossword') {
        const content = generateGameContent('crossword', autoTopic, autoSubject);
        if (content?.across && content?.down) {
          const items: any[] = [
            ...content.across.map((a: any) => ({ id: `cw-a-${a.num}`, type: 'across' as const, num: a.num, word: a.word, clue: a.clue })),
            ...content.down.map((d: any) => ({ id: `cw-d-${d.num}`, type: 'down' as const, num: d.num, word: d.word, clue: d.clue }))
          ];
          setCrosswordItems(items);
        }
        showToast(`AI generated crossword clues for "${autoTopic}"!`);
      } else if (selectedGameType === 'matching_pairs') {
        const content = generateGameContent('matching_pairs', autoTopic, autoSubject);
        if (content?.pairs) {
          setMatchingPairsList(content.pairs);
        }
        showToast(`AI generated concept pairs for "${autoTopic}"!`);
      } else if (selectedGameType === 'fill_in_blanks') {
        const content = generateGameContent('fill_in_blanks', autoTopic, autoSubject);
        if (content?.questions) {
          setFillInBlanksList(content.questions.map((q: any) => ({
            id: q.id,
            textBefore: q.textBefore,
            textAfter: q.textAfter,
            correctWord: q.correctWord,
            options: q.options.join(', ')
          })));
        }
        showToast(`AI generated fill-in-the-blank sentences for "${autoTopic}"!`);
      } else if (selectedGameType === 'alphabet') {
        const content = generateGameContent('alphabet', autoTopic, autoSubject);
        if (content?.letters) {
          setAlphabetList(content.letters);
        }
        showToast(`AI generated Alphabet Challenge prompts for "${autoTopic}"!`);
      } else if (selectedGameType === 'memory') {
        const content = generateGameContent('memory', autoTopic, autoSubject);
        if (content?.cards) {
          const pairs: any[] = [];
          for (let i = 0; i < content.cards.length; i += 2) {
            pairs.push({
              id: `m-${i}`,
              term: content.cards[i]?.text || '',
              definition: content.cards[i+1]?.text || ''
            });
          }
          setMemoryPairsList(pairs);
        }
        showToast(`AI generated Memory card pairs for "${autoTopic}"!`);
      } else if (selectedGameType === 'true_false') {
        const content = generateGameContent('true_false', autoTopic, autoSubject);
        if (content?.statements) {
          setTrueFalseList(content.statements);
        }
        showToast(`AI generated True/False statements for "${autoTopic}"!`);
      } else if (selectedGameType === 'map_quiz') {
        const content = generateGameContent('map_quiz', autoTopic, autoSubject);
        if (content?.locations) {
          setMapLocationsList(content.locations);
        }
        showToast(`AI generated Map targets for "${autoTopic}"!`);
      } else {
        // Quiz & Rapid Fire MCQs
        let generated: ObjectiveQuestion[] = [];
        const topicLower = (autoTopic + ' ' + autoSubject).toLowerCase();
        if (topicLower.includes('tcp') || topicLower.includes('net') || topicLower.includes('cs') || topicLower.includes('computer')) {
          generated = [
            {
              id: `aq-${Date.now()}-1`,
              type: 'mcq',
              question: 'Which TCP algorithm operates independently of RTT by using wall-clock time in its cubic growth function?',
              options: ['TCP Reno', 'CUBIC', 'TCP Tahoe', 'TCP Vegas'],
              correctAnswer: 'CUBIC',
              explanation: 'CUBIC uses a cubic window function driven by real elapsed time t, preventing unfair RTT bias.'
            },
            {
              id: `aq-${Date.now()}-2`,
              type: 'mcq',
              question: 'What physical quantities does Google BBR independently estimate to cap in-flight data at 1x BDP?',
              options: ['Bottleneck Bandwidth & Minimum RTT', 'Packet Loss Rate & Queue Size', 'Window Size & Congestion Threshold', 'ACK Arrival Jitter & Hop Count'],
              correctAnswer: 'Bottleneck Bandwidth & Minimum RTT',
              explanation: 'BBR measures BtlBw (bottleneck bandwidth) and RTprop (minimum wire delay) to drain queues to zero.'
            },
            {
              id: `aq-${Date.now()}-3`,
              type: 'mcq',
              question: 'What network crisis occurs when oversized router FIFO buffers create catastrophic latency without increasing throughput?',
              options: ['Bufferbloat', 'TCP Silly Window Syndrome', 'SYN Flood Attack', 'Jitter Accumulation'],
              correctAnswer: 'Bufferbloat',
              explanation: 'Bufferbloat happens when excessive buffering holds packets for hundreds of milliseconds at bottleneck links.'
            },
            {
              id: `aq-${Date.now()}-4`,
              type: 'mcq',
              question: 'In standard drop-tail queuing, what phenomenon causes concurrent TCP flows to simultaneously halve their windows?',
              options: ['TCP Global Synchronization', 'Fast Retransmit Collapse', 'Exponential Backoff Desync', 'SACK Deadlock'],
              correctAnswer: 'TCP Global Synchronization',
              explanation: 'Tail-drop buffers drop incoming packets across all flows at once, triggering synchronous backoff.'
            }
          ];
        } else if (topicLower.includes('bio') || topicLower.includes('cell')) {
          generated = [
            {
              id: `aq-${Date.now()}-1`,
              type: 'mcq',
              question: 'Which organelle serves as the primary site of cellular ATP synthesis via oxidative phosphorylation?',
              options: ['Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosome'],
              correctAnswer: 'Mitochondria',
              explanation: 'Mitochondria generate the vast majority of cellular ATP via the electron transport chain.'
            },
            {
              id: `aq-${Date.now()}-2`,
              type: 'mcq',
              question: 'In molecular genetics, which enzyme unwinds the double helix DNA during replication?',
              options: ['DNA Helicase', 'DNA Ligase', 'RNA Polymerase', 'Topoisomerase'],
              correctAnswer: 'DNA Helicase',
              explanation: 'DNA Helicase breaks hydrogen bonds between nitrogenous base pairs to separate the two strands.'
            }
          ];
        } else {
          generated = [
            {
              id: `aq-${Date.now()}-1`,
              type: 'mcq',
              question: `What is the core fundamental principle governing ${autoTopic || 'this academic subject'}?`,
              options: ['Axiomatic Foundation & Evidence-based Analysis', 'Random Empirical Observation', 'Rote Memorization of Historic Anecdotes', 'Unregulated Variable Induction'],
              correctAnswer: 'Axiomatic Foundation & Evidence-based Analysis',
              explanation: 'Rigorous analysis relies on first principles and verifiable experimental observations.'
            },
            {
              id: `aq-${Date.now()}-2`,
              type: 'mcq',
              question: `Which methodology is standard when evaluating practical applications of ${autoTopic || 'this discipline'}?`,
              options: ['Quantitative modeling and controlled testing', 'Arbitrary trial without metric baselines', 'Subjective preference without review', 'Ignoring boundary conditions'],
              correctAnswer: 'Quantitative modeling and controlled testing',
              explanation: 'Standard scientific and academic methodologies require controlled evaluation and repeatable testing.'
            }
          ];
        }
        setQuestions(generated);
        showToast(`${generated.length} questions generated for "${autoTopic}"!`);
      }

      setIsGenerating(false);
    }, 500);
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
        const across = crosswordItems.filter(c => c.type === 'across').map(c => ({
          num: c.num,
          word: c.word.toUpperCase(),
          clue: c.clue,
          row: (c.num - 1) % 5,
          col: 0
        }));
        const down = crosswordItems.filter(c => c.type === 'down').map(c => ({
          num: c.num,
          word: c.word.toUpperCase(),
          clue: c.clue,
          row: 0,
          col: (c.num - 1) % 5
        }));
        return { rows: 6, cols: 6, across, down };
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
      case 'memory': {
        const cards: any[] = [];
        memoryPairsList.forEach((p, idx) => {
          cards.push({ id: `c-${idx}-a`, pairId: `pair-${idx}`, text: p.term, isTerm: true });
          cards.push({ id: `c-${idx}-b`, pairId: `pair-${idx}`, text: p.definition, isTerm: false });
        });
        return { cards };
      }
      case 'true_false':
        return { statements: trueFalseList };
      case 'map_quiz':
        return { title, locations: mapLocationsList };
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
        clue: newCwClue.trim()
      }
    ]);
    setNewCwWord('');
    setNewCwClue('');
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
      case 'memory': return memoryPairsList.length;
      case 'true_false': return trueFalseList.length;
      case 'map_quiz': return mapLocationsList.length;
      default: return questions.length;
    }
  };

  const handleSelectGame = (game: CompetitionGameMeta) => {
    setSelectedGameType(game.id);
    const content = generateGameContent(game.id, autoTopic, autoSubject);
    setGameData(content);
    if (content?.words) setWordSearchWords(content.words);
    if (content?.pairs) setMatchingPairsList(content.pairs);
    if (content?.statements) setTrueFalseList(content.statements);
    if (content?.letters) setAlphabetList(content.letters);
    if (content?.locations) setMapLocationsList(content.locations);
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
    if (content?.across && content?.down) {
      const items: any[] = [
        ...content.across.map((a: any) => ({ id: `cw-a-${a.num}`, type: 'across' as const, num: a.num, word: a.word, clue: a.clue })),
        ...content.down.map((d: any) => ({ id: `cw-d-${d.num}`, type: 'down' as const, num: d.num, word: d.word, clue: d.clue }))
      ];
      setCrosswordItems(items);
    }
    if (content?.cards) {
      const pairs: any[] = [];
      for (let i = 0; i < content.cards.length; i += 2) {
        pairs.push({
          id: `m-${i}`,
          term: content.cards[i]?.text || '',
          definition: content.cards[i+1]?.text || ''
        });
      }
      setMemoryPairsList(pairs);
    }

    setTitle(`${autoSubject}: ${game.name} Showdown`);
    showToast(`Active Style: ${game.name}`);
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

      case 'memory':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            {memoryPairsList.map(pair => (
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
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F766E', textTransform: 'uppercase' }}>
                    Memory Pair
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMemoryPair(pair.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  Card A: {pair.term}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                  Card B: {pair.definition}
                </div>
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

      case 'map_quiz':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mapLocationsList.map(loc => (
              <div
                key={loc.id}
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
                  <Badge variant="emerald">{loc.region}</Badge>
                  <span style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--color-text-main)' }}>
                    {loc.name}
                  </span>
                  {loc.hint && (
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      ({loc.hint})
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMapLocation(loc.id)}
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
                  placeholder="Type word (e.g. PACKET, PROTOCOL, PYTHON)..."
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
              Add Crossword Clue:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 80px 1fr 2fr auto', gap: '10px', alignItems: 'flex-end' }}>
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
                placeholder="e.g. TCP"
                value={newCwWord}
                onChange={e => setNewCwWord(e.target.value)}
              />
              <Input
                label="Clue Sentence"
                placeholder="e.g. Transport layer protocol with 3-way handshake"
                value={newCwClue}
                onChange={e => setNewCwClue(e.target.value)}
              />
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
              Add Concept Match Pair:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <Input
                label="Left Item / Term"
                placeholder="e.g. HTTPS"
                value={newPairLeft}
                onChange={e => setNewPairLeft(e.target.value)}
              />
              <Input
                label="Matching Definition / Clue"
                placeholder="e.g. Port 443 • TLS Encrypted Web"
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
              Add Fill-in-the-Blank Challenge:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '10px' }}>
              <Input
                label="Text Before Blank"
                placeholder="e.g. In computer networking, the"
                value={newFibBefore}
                onChange={e => setNewFibBefore(e.target.value)}
              />
              <Input
                label="Missing Word (Correct)"
                placeholder="e.g. Transport"
                value={newFibWord}
                onChange={e => setNewFibWord(e.target.value)}
              />
              <Input
                label="Text After Blank"
                placeholder="e.g. layer guarantees end-to-end delivery."
                value={newFibAfter}
                onChange={e => setNewFibAfter(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginTop: '4px' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Options (comma separated)"
                  placeholder="e.g. Transport, Physical, Application, Session"
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

      case 'memory':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Memory Match Card Pair:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <Input
                label="Card A (Term / Symbol)"
                placeholder="e.g. O(1)"
                value={newMemTerm}
                onChange={e => setNewMemTerm(e.target.value)}
              />
              <Input
                label="Card B (Matching Concept)"
                placeholder="e.g. Hash Table Lookup"
                value={newMemDef}
                onChange={e => setNewMemDef(e.target.value)}
              />
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddMemoryPair}>
                Add Pair
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
              placeholder="e.g. HTTP/3 operates over UDP using the QUIC protocol."
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
                placeholder="e.g. QUIC solves head-of-line blocking."
                value={newTfExp}
                onChange={e => setNewTfExp(e.target.value)}
              />
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddTrueFalse}>
                Add Statement
              </Button>
            </div>
          </div>
        );

      case 'map_quiz':
        return (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Add Map Target Location:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <Input
                label="Location / Region Name"
                placeholder="e.g. Silicon Valley Hub"
                value={newMapName}
                onChange={e => setNewMapName(e.target.value)}
              />
              <Input
                label="Category / Continent"
                placeholder="e.g. North America"
                value={newMapRegion}
                onChange={e => setNewMapRegion(e.target.value)}
              />
              <Input
                label="Hint / Clue"
                placeholder="e.g. SF Bay Area innovation center"
                value={newMapHint}
                onChange={e => setNewMapHint(e.target.value)}
              />
              <Button type="button" variant="primary" size="md" icon={<Plus size={15} />} onClick={handleAddMapLocation}>
                Add Location
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
                    placeholder="e.g. Which algorithm prevents bufferbloat by maintaining 1x BDP in-flight?"
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
            Choose from 10 interactive competition game types for your tournament arena.
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <Select
                    label="Academic Discipline"
                    value={autoSubject}
                    onChange={e => setAutoSubject(e.target.value)}
                    options={[
                      { value: 'Computer Science', label: 'Computer Science' },
                      { value: 'Biology', label: 'Biology' },
                      { value: 'Chemistry', label: 'Chemistry' },
                      { value: 'Physics', label: 'Physics' },
                      { value: 'General Knowledge', label: 'General Knowledge & Logic' }
                    ]}
                  />

                  <Input
                    label="Target Topic or Concept"
                    value={autoTopic}
                    onChange={e => setAutoTopic(e.target.value)}
                    placeholder="e.g. TCP Congestion Control, Photosynthesis, Thermodynamics..."
                  />

                  <Select
                    label="Difficulty"
                    value={autoDifficulty}
                    onChange={e => setAutoDifficulty(e.target.value)}
                    options={[
                      { value: 'Standard', label: 'Standard' },
                      { value: 'Advanced', label: 'Advanced' },
                      { value: 'Championship', label: 'Championship' }
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
              {/* Topic and Subject Header for Manual Mode */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    ✍️ Manual Builder: {activeGame.name}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'} Configured
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  <Select
                    label="Academic Discipline"
                    value={autoSubject}
                    onChange={e => setAutoSubject(e.target.value)}
                    options={[
                      { value: 'Computer Science', label: 'Computer Science' },
                      { value: 'Biology', label: 'Biology' },
                      { value: 'Chemistry', label: 'Chemistry' },
                      { value: 'Physics', label: 'Physics' },
                      { value: 'General Knowledge', label: 'General Knowledge & Logic' }
                    ]}
                  />
                  <Input
                    label="Tournament Topic / Concept"
                    value={autoTopic}
                    onChange={e => setAutoTopic(e.target.value)}
                    placeholder="e.g. Molecular Biology, Operating Systems..."
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
            {selectedGameType === 'memory' && (
              <MemoryMatchGame
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
            {selectedGameType === 'map_quiz' && (
              <MapQuizGame
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
