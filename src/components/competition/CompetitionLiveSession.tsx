import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Pause,
  Play,
  SkipForward,
  PlusCircle,
  Trophy,
  Users,
  Flame,
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  BarChart2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { CompetitionQuestionVisual } from './CompetitionQuestionVisual';

// Interactive Educational Game Formats
import { WordSearchGame } from './games/WordSearchGame';
import { CrosswordGame } from './games/CrosswordGame';
import { MatchingPairsGame } from './games/MatchingPairsGame';
import { FillInBlanksGame } from './games/FillInBlanksGame';
import { AlphabetChallengeGame } from './games/AlphabetChallengeGame';
import { TrueFalseGame } from './games/TrueFalseGame';
import { RapidFireGame } from './games/RapidFireGame';

// Kahoot geometric shape badges and vibrant 4-color palette
const KAHOOT_SHAPES = [
  { shape: '▲', name: 'Triangle', bg: '#E11D48', border: '#F43F5E', text: '#FFFFFF', lightBg: '#FFF1F2' }, // Crimson Red
  { shape: '◆', name: 'Diamond', bg: '#2563EB', border: '#3B82F6', text: '#FFFFFF', lightBg: '#EFF6FF' }, // Royal Blue
  { shape: '●', name: 'Circle', bg: '#D97706', border: '#F59E0B', text: '#FFFFFF', lightBg: '#FFFBEB' }, // Amber Gold
  { shape: '■', name: 'Square', bg: '#059669', border: '#10B981', text: '#FFFFFF', lightBg: '#ECFDF5' }  // Emerald Green
];

export const CompetitionLiveSession: React.FC = () => {
  const {
    competitions,
    activeCompetitionId,
    setCompetitionView,
    updateCompetition,
    showToast
  } = useApp();

  const currentComp = competitions.find(c => c.id === activeCompetitionId) || competitions[0];

  // Kahoot round phases: 'question' -> 'reveal' -> 'leaderboard'
  const [roundPhase, setRoundPhase] = useState<'question' | 'reveal' | 'leaderboard'>('question');

  const [questionIdx, setQuestionIdx] = useState(currentComp.currentQuestionIndex || 0);
  const [timer, setTimer] = useState(18);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answersReceivedCount, setAnswersReceivedCount] = useState(94);

  // Leaderboard ranking with animated scores and streaks
  const [leaderboard, setLeaderboard] = useState(currentComp.participants || [
    { id: 'p-1', name: 'Sarah Jenkins', avatar: 'SJ', score: 980, streak: 4 },
    { id: 'p-2', name: 'Ahmed Tariq', avatar: 'AT', score: 920, streak: 3 },
    { id: 'p-3', name: 'Ali Raza', avatar: 'AR', score: 870, streak: 2 },
    { id: 'p-4', name: 'Hamza Malik', avatar: 'HM', score: 840, streak: 2 },
    { id: 'p-5', name: 'Zainab Fatima', avatar: 'ZF', score: 810, streak: 1 }
  ]);

  const questions = currentComp.questions || [];
  const currentQ = questions[questionIdx] || {
    id: 'cq-5',
    type: 'mcq',
    question: 'Which language is primarily used for the core TensorFlow and PyTorch tensor runtime engine?',
    options: ['Python', 'Java', 'C++', 'Ruby'],
    correctAnswer: 'C++',
    explanation: 'High performance CUDA and memory execution is written in C++.'
  };

  // Mock answer vote distribution (Kahoot answer histogram)
  const voteDistribution: Record<string, number> = {
    [currentQ.options?.[0] || 'A']: 14,
    [currentQ.options?.[1] || 'B']: 18,
    [currentQ.options?.[2] || 'C']: 86,
    [currentQ.options?.[3] || 'D']: 10
  };

  // Web Audio synthesizer for Kahoot sound effects (100% in-browser, no audio files)
  const playTone = (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or muted
    }
  };

  // Timer countdown during Question phase
  useEffect(() => {
    if (roundPhase !== 'question' || isPaused) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          playTone(330, 'square', 0.3);
          handleRevealAnswer();
          return 0;
        }
        // Increment answer count randomly like Kahoot
        if (prev % 2 === 0) {
          setAnswersReceivedCount(c => Math.min(c + 2, currentComp.participantsCount || 128));
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [roundPhase, isPaused, questionIdx]);

  const handleRevealAnswer = () => {
    setRoundPhase('reveal');
    playTone(587.33, 'triangle', 0.25);
  };

  const handleGoToLeaderboard = () => {
    setRoundPhase('leaderboard');
    playTone(880, 'sine', 0.3);
  };

  const handleNextQuestion = () => {
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(prev => prev + 1);
      setTimer(25);
      setSelectedAnswer(null);
      setAnswersReceivedCount(85);
      setRoundPhase('question');
    } else {
      // Completed tournament -> Navigate to final results
      setCompetitionView('results');
    }
  };

  // Host Controls
  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    showToast(!isPaused ? 'Host paused the live session.' : 'Session resumed.');
  };

  const handleSkipQuestion = () => {
    showToast('Host skipped to the next question.');
    handleNextQuestion();
  };

  const handleExtendTime = () => {
    setTimer(prev => prev + 30);
    showToast('Host added +30 seconds to the timer!');
  };

  const handleSelectOption = (opt: string) => {
    if (roundPhase !== 'question' || selectedAnswer) return;
    setSelectedAnswer(opt);
    playTone(523.25, 'sine', 0.1);

    if (opt === currentQ.correctAnswer) {
      const addedPoints = 600 + timer * 20;
      setLeaderboard(prev =>
        prev.map(p => (p.name.includes('Sarah') ? { ...p, score: p.score + addedPoints, streak: p.streak + 1 } : p))
          .sort((a, b) => b.score - a.score)
      );
    }
  };

  const handleGameComplete = (earnedScore: number, accuracy: number) => {
    const updatedParticipants = (currentComp.participants || []).map(p =>
      p.name.includes('(You)') || p.name.includes('Sarah') ? { ...p, score: p.score + earnedScore } : p
    ).sort((a, b) => b.score - a.score);

    updateCompetition({
      ...currentComp,
      status: 'completed',
      participants: updatedParticipants
    });

    setCompetitionView('results');
    showToast(`Round Completed! Earned ${earnedScore} pts (${accuracy}% accuracy)`);
  };

  // If this competition is one of the 9 educational game types (non-standard Kahoot MCQ)
  if (currentComp.gameType && currentComp.gameType !== 'quiz') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top Session Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setCompetitionView('dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={15} /> Exit to Arena Dashboard
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="competition-badge">LIVE MULTIPLAYER TOURNAMENT</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-lime-accent)' }}>
              PIN: {currentComp.code}
            </span>
          </div>
        </div>

        {/* Selected Interactive Game Component */}
        {currentComp.gameType === 'word_search' && (
          <WordSearchGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
        {currentComp.gameType === 'crossword' && (
          <CrosswordGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
        {currentComp.gameType === 'matching_pairs' && (
          <MatchingPairsGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
        {currentComp.gameType === 'fill_in_blanks' && (
          <FillInBlanksGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
        {currentComp.gameType === 'alphabet' && (
          <AlphabetChallengeGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
        {currentComp.gameType === 'true_false' && (
          <TrueFalseGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
        {currentComp.gameType === 'rapid_fire' && (
          <RapidFireGame
            data={currentComp.gameData}
            onComplete={handleGameComplete}
            onExit={() => setCompetitionView('dashboard')}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1240px', margin: '0 auto' }}>
      {/* 1. TOP SESSION BAR & HOST CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="competition-badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
            ⚡ KAHOOT LIVE SHOWDOWN
          </span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
            {currentComp.title}
          </span>
          <span style={{ fontSize: '13px', color: '#99F6E4', fontWeight: 600 }}>
            PIN: {currentComp.code}
          </span>
        </div>

        {/* Live Host Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(0,0,0,0.35)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#99F6E4', letterSpacing: '0.06em', marginRight: '4px' }}>
            HOST CONTROLS:
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleTogglePause}
            icon={isPaused ? <Play size={13} /> : <Pause size={13} />}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleSkipQuestion}
            icon={<SkipForward size={13} />}
          >
            Skip
          </Button>

          <Button
            size="sm"
            variant="lime"
            onClick={handleExtendTime}
            icon={<PlusCircle size={13} />}
          >
            +30s
          </Button>

          {roundPhase === 'question' && (
            <Button
              size="sm"
              variant="teal"
              icon={<Eye size={13} />}
              onClick={handleRevealAnswer}
              style={{ backgroundColor: '#0F766E', borderColor: '#2DD4BF' }}
            >
              Reveal Now
            </Button>
          )}

          {roundPhase === 'reveal' && (
            <Button
              size="sm"
              variant="lime"
              icon={<ArrowRight size={13} />}
              onClick={handleGoToLeaderboard}
            >
              Leaderboard →
            </Button>
          )}

          {roundPhase === 'leaderboard' && (
            <Button
              size="sm"
              variant="lime"
              icon={<ArrowRight size={13} />}
              onClick={handleNextQuestion}
            >
              {questionIdx < questions.length - 1 ? 'Next Question →' : 'Final Results →'}
            </Button>
          )}
        </div>
      </div>

      {/* 2. KAHOOT ACTIVE STAGE (QUESTION / REVEAL PHASES) */}
      {(roundPhase === 'question' || roundPhase === 'reveal') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Banner: Big Question Header */}
          <div
            className="competition-card"
            style={{
              padding: '24px 32px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary-emerald)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                QUESTION {questionIdx + 1} OF {questions.length}
              </span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1.35 }}>
              {currentQ.question}
            </h1>
          </div>

          {/* Central Stage: Only show visual card if question has a diagram/graph; otherwise omit completely! */}
          {Boolean(currentQ.hasVisual) ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 120px',
                alignItems: 'center',
                gap: '20px',
                minHeight: '220px'
              }}
            >
              {/* Left: Kahoot Circular / Pill Timer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: timer <= 5 ? '#DC2626' : '#0A2E2B',
                    border: `4px solid ${timer <= 5 ? '#F87171' : 'var(--color-lime-accent)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: timer <= 5 ? '#FFFFFF' : 'var(--color-lime-accent)',
                    fontSize: '32px',
                    fontWeight: 900,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                    animation: timer <= 5 ? 'pulse 0.6s infinite' : 'none'
                  }}
                >
                  {timer}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#99F6E4', marginTop: '8px', letterSpacing: '0.05em' }}>
                  SECONDS
                </span>
              </div>

              {/* Center: Authentic Scientific Diagram Canvas */}
              <div
                style={{
                  backgroundColor: '#0A2E2B',
                  borderRadius: '16px',
                  border: '1px solid rgba(153, 246, 228, 0.22)',
                  padding: '6px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <CompetitionQuestionVisual questionId={currentQ.id} topic={currentComp.subject} question={currentQ} />
              </div>

              {/* Right: Kahoot Live Answers Counter */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: '#0A2E2B',
                    border: '4px solid var(--color-primary-emerald)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <span style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF' }}>
                    {answersReceivedCount}
                  </span>
                  <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#2DD4BF', textTransform: 'uppercase' }}>
                    Answers
                  </span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#99F6E4', marginTop: '8px', letterSpacing: '0.05em' }}>
                  OF {currentComp.participantsCount || 128}
                </span>
              </div>
            </div>
          ) : (
            /* Streamlined Compact Timer & Answers Bar when question has NO diagram/graph */
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
                padding: '6px 0',
                margin: '0 auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: timer <= 5 ? '#DC2626' : '#0A2E2B',
                    border: `3px solid ${timer <= 5 ? '#F87171' : 'var(--color-lime-accent)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: timer <= 5 ? '#FFFFFF' : 'var(--color-lime-accent)',
                    fontSize: '22px',
                    fontWeight: 900,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    animation: timer <= 5 ? 'pulse 0.6s infinite' : 'none'
                  }}
                >
                  {timer}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>SECONDS</div>
                  <div style={{ fontSize: '10px', color: '#99F6E4' }}>Time Left</div>
                </div>
              </div>

              <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(153, 246, 228, 0.2)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#0A2E2B',
                    border: '3px solid var(--color-primary-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 900,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                  }}
                >
                  {answersReceivedCount}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>ANSWERS IN</div>
                  <div style={{ fontSize: '10px', color: '#99F6E4' }}>of {currentComp.participantsCount || 128} Players</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. KAHOOT 4 COLORFUL TACTILE ANSWER CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {(currentQ.options || ['Option A', 'Option B', 'Option C', 'Option D']).map((opt, oIdx) => {
              const shapeInfo = KAHOOT_SHAPES[oIdx % 4];
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentQ.correctAnswer;
              const votes = voteDistribution[opt] || 15;

              let cardBg = '#FFFFFF';
              let cardBorder = `2px solid ${shapeInfo.bg}33`;
              let cardBorderLeft = `6px solid ${shapeInfo.bg}`;
              let cardOpacity = 1;

              if (roundPhase === 'reveal') {
                if (isCorrect) {
                  cardBg = '#F0FDF4';
                  cardBorder = '3px solid #16A34A';
                  cardBorderLeft = '8px solid #16A34A';
                } else {
                  cardOpacity = 0.5;
                  cardBorder = '1px solid #E2E8F0';
                  cardBorderLeft = '4px solid #CBD5E1';
                }
              } else if (isSelected) {
                cardBg = shapeInfo.lightBg;
                cardBorder = `3px solid ${shapeInfo.bg}`;
                cardBorderLeft = `8px solid ${shapeInfo.bg}`;
              }

              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(opt)}
                  style={{
                    backgroundColor: cardBg,
                    border: cardBorder,
                    borderLeft: cardBorderLeft,
                    opacity: cardOpacity,
                    borderRadius: '14px',
                    padding: '18px 22px',
                    cursor: roundPhase === 'question' ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.15)' : '0 4px 14px rgba(0,0,0,0.06)',
                    transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isSelected && roundPhase === 'question' ? 'scale(1.02)' : 'scale(1)',
                    position: 'relative'
                  }}
                  className="kahoot-answer-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Geometric Shape Badge (Kahoot Signature Icon: Triangle, Diamond, Circle, Square) */}
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: shapeInfo.bg,
                        color: shapeInfo.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 900,
                        flexShrink: 0,
                        boxShadow: `0 4px 10px ${shapeInfo.bg}55`
                      }}
                    >
                      {shapeInfo.shape}
                    </div>

                    <span style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {opt}
                    </span>
                  </div>

                  {/* Reveal State: Status Icon & Vote Counts (Kahoot Histogram) */}
                  {roundPhase === 'reveal' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: isCorrect ? '#16A34A' : '#64748B' }}>
                        {votes} votes
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 size={26} color="#16A34A" />
                      ) : (
                        <XCircle size={26} color="#DC2626" />
                      )}
                    </div>
                  )}

                  {roundPhase === 'question' && isSelected && (
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        backgroundColor: shapeInfo.bg,
                        color: '#FFFFFF',
                        padding: '3px 8px',
                        borderRadius: '9999px'
                      }}
                    >
                      Selected
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reveal Phase: Conceptual AI Explanation Banner */}
          {roundPhase === 'reveal' && (
            <div
              style={{
                backgroundColor: '#1E293B',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                animation: 'slideIn 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-lime-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Correct Answer & Concept: {currentQ.correctAnswer}
                </span>
                <p style={{ fontSize: '13.5px', color: '#F1F5F9', fontWeight: 500, marginTop: '4px', lineHeight: 1.45, margin: 0 }}>
                  {currentQ.explanation}
                </p>
              </div>

              <Button variant="lime" size="sm" icon={<ArrowRight size={14} />} onClick={handleGoToLeaderboard}>
                Show Leaderboard →
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 4. KAHOOT LEADERBOARD PHASE (ANIMATED RANK SCOREBOARD) */}
      {roundPhase === 'leaderboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '860px', margin: '0 auto', width: '100%' }}>
          <div className="competition-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trophy size={28} color="var(--color-primary-emerald)" />
                <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--color-text-main)' }}>
                  LIVE LEADERBOARD
                </h2>
              </div>

              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={16} />}
                onClick={handleNextQuestion}
              >
                {questionIdx < questions.length - 1 ? 'Next Question →' : 'Final Tournament Results →'}
              </Button>
            </div>

            {/* Top 5 Leaderboard Standings with Kahoot Score Pop */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {leaderboard.map((p, idx) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: idx === 0 ? 'var(--color-mint-bg)' : '#FAFAF9',
                    border: idx === 0 ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                    boxShadow: idx === 0 ? '0 4px 14px rgba(15, 118, 110, 0.15)' : 'none',
                    transition: 'transform 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, width: '32px', color: idx === 0 ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)' }}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                    </span>

                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: idx === 0 ? 'var(--color-primary-emerald)' : '#E7E5E4', color: idx === 0 ? '#FFFFFF' : '#1C1917', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                      {p.avatar}
                    </div>

                    <div>
                      <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block' }}>
                        {p.name}
                      </span>
                      {p.streak > 1 && (
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Flame size={13} /> {p.streak} Answer Streak! (+{p.streak * 50} streak bonus)
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--color-primary-emerald)' }}>
                      {p.score} pts
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700, display: 'block' }}>
                      +350 pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
