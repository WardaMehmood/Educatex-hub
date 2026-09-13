import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Quiz, ObjectiveQuestion, SubjectiveQuestion } from '../../types';
import {
  FileQuestion,
  Plus,
  Trash2,
  CheckCircle2,
  QrCode,
  GraduationCap,
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input, Select } from '../common/Input';
import { Modal } from '../common/Modal';
import { QRCodeDisplay } from '../common/QRCodeDisplay';

export const TeacherCreateQuiz: React.FC = () => {
  const { classes, addQuiz, setTeacherView, showToast } = useApp();

  const [quizType, setQuizType] = useState<'objective' | 'subjective'>('objective');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [publishTarget, setPublishTarget] = useState<'class' | 'standalone'>('standalone');
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [deadline, setDeadline] = useState('2026-09-25 23:59');

  // Objective Questions state (supports MCQ, True/False, Fill in blanks, Matching)
  const [objectiveQuestions, setObjectiveQuestions] = useState<ObjectiveQuestion[]>([
    {
      id: 'oq-1',
      type: 'mcq',
      question: 'Which TCP flag is used during the three-way handshake to establish a connection?',
      options: ['SYN', 'ACK', 'FIN', 'RST'],
      correctAnswer: 'SYN',
      explanation: 'The client sends an initial SYN packet to synchronize sequence numbers with the server.'
    },
    {
      id: 'oq-2',
      type: 'true_false',
      question: 'UDP guarantees in-order arrival and congestion window scaling.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'UDP is connectionless and does not provide reliability, ordering, or congestion control.'
    }
  ]);

  // Subjective Questions state
  const [subjectiveQuestions, setSubjectiveQuestions] = useState<SubjectiveQuestion[]>([
    {
      id: 'sq-1',
      question: 'Explain the difference between persistent and non-persistent HTTP connections. Detail the RTT impact on loading an HTML page with 10 images.',
      rubric: 'Must explain 3-way handshake overhead per object in non-persistent vs single handshake in persistent HTTP/1.1.',
      sampleAnswer: 'Non-persistent HTTP opens a separate TCP connection for every referenced object, incurring 2 RTTs (handshake + request) per object (20 RTTs for 10 images). Persistent HTTP reuses a single TCP connection, drastically minimizing connection teardown and slow-start latency.',
      maxMarks: 15
    }
  ]);

  // Published Quiz Success Modal
  const [publishedQuiz, setPublishedQuiz] = useState<Quiz | null>(null);

  const handleAddObjectiveQuestion = (type: 'mcq' | 'true_false' | 'fill_in_blanks' | 'matching') => {
    const id = `oq-${Date.now()}`;
    if (type === 'mcq') {
      setObjectiveQuestions(prev => [
        ...prev,
        {
          id,
          type: 'mcq',
          question: 'New Multiple Choice Question',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
          explanation: 'Provide explanation here.'
        }
      ]);
    } else if (type === 'true_false') {
      setObjectiveQuestions(prev => [
        ...prev,
        {
          id,
          type: 'true_false',
          question: 'New True or False Statement',
          options: ['True', 'False'],
          correctAnswer: 'True',
          explanation: 'Explain why it is true or false.'
        }
      ]);
    } else if (type === 'fill_in_blanks') {
      setObjectiveQuestions(prev => [
        ...prev,
        {
          id,
          type: 'fill_in_blanks',
          question: 'In TCP congestion control, the threshold where Slow Start transitions to Congestion Avoidance is called ___',
          correctAnswer: 'ssthresh',
          explanation: 'Slow Start Threshold (ssthresh) marks the phase boundary.'
        }
      ]);
    } else if (type === 'matching') {
      setObjectiveQuestions(prev => [
        ...prev,
        {
          id,
          type: 'matching',
          question: 'Match each protocol with its default port:',
          correctAnswer: [],
          matchingPairs: [
            { left: 'HTTP', right: 'Port 80' },
            { left: 'HTTPS', right: 'Port 443' },
            { left: 'DNS', right: 'Port 53' }
          ],
          explanation: 'Standard IANA well-known ports.'
        }
      ]);
    }
  };

  const handleAddSubjectiveQuestion = () => {
    setSubjectiveQuestions(prev => [
      ...prev,
      {
        id: `sq-${Date.now()}`,
        question: 'Enter subjective conceptual question here...',
        rubric: 'Outline key grading criteria for AI auto-evaluation.',
        sampleAnswer: 'Model answer for AI semantic comparison.',
        maxMarks: 10
      }
    ]);
  };

  const handlePublishQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a quiz title.', 'error');
      return;
    }

    const codeRandom = Math.floor(1000 + Math.random() * 9000);
    const joinCode = `QZ-${codeRandom}`;

    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title,
      subject,
      type: quizType,
      durationMinutes,
      totalMarks: quizType === 'objective' ? objectiveQuestions.length * 5 : subjectiveQuestions.reduce((a, c) => a + c.maxMarks, 0),
      joinCode,
      isStandalone: publishTarget === 'standalone',
      assignedClassId: publishTarget === 'class' ? selectedClassId : undefined,
      deadline: publishTarget === 'class' ? deadline : undefined,
      createdAt: new Date().toISOString().split('T')[0],
      objectiveQuestions: quizType === 'objective' ? objectiveQuestions : undefined,
      subjectiveQuestions: quizType === 'subjective' ? subjectiveQuestions : undefined
    };

    addQuiz(newQuiz);
    setPublishedQuiz(newQuiz);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Badge variant="emerald">STEP 1 TO 3</Badge>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>
            Assessment Setup
          </span>
        </div>
        <h1 className="text-h1">Create a Quiz</h1>
        <p className="text-body" style={{ marginTop: '4px' }}>
          Build objective assessments with multi-format questions or subjective exams with AI rubric grading.
        </p>
      </div>

      <form onSubmit={handlePublishQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Step 1: Basic Configuration */}
        <Card>
          <h3 className="text-h3" style={{ marginBottom: '16px' }}>1. General Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Quiz Title *"
              placeholder="e.g. Transport Layer & TCP Congestion Mechanics"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Select
                label="Academic Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                options={[
                  { value: 'Computer Science', label: 'Computer Science' },
                  { value: 'Software Engineering', label: 'Software Engineering' },
                  { value: 'Data Science', label: 'Data Science' },
                  { value: 'Cybersecurity', label: 'Cybersecurity' }
                ]}
              />

              <Input
                label="Time Limit (Minutes)"
                type="number"
                min={5}
                max={180}
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                required
              />
            </div>
          </div>
        </Card>

        {/* Step 2: Objective vs Subjective Toggle */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="text-h3">2. Evaluation Format</h3>
            <div style={{ display: 'flex', background: '#F5F5F4', borderRadius: 'var(--radius-md)', padding: '3px' }}>
              <button
                type="button"
                onClick={() => setQuizType('objective')}
                style={{
                  padding: '6px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: quizType === 'objective' ? 'var(--color-primary-emerald)' : 'transparent',
                  color: quizType === 'objective' ? '#FFFFFF' : 'var(--color-text-muted)',
                  transition: 'all 0.15s ease'
                }}
              >
                Objective (Auto-graded)
              </button>
              <button
                type="button"
                onClick={() => setQuizType('subjective')}
                style={{
                  padding: '6px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: quizType === 'subjective' ? 'var(--color-primary-emerald)' : 'transparent',
                  color: quizType === 'subjective' ? '#FFFFFF' : 'var(--color-text-muted)',
                  transition: 'all 0.15s ease'
                }}
              >
                Subjective (AI Rubric)
              </button>
            </div>
          </div>

          {/* OBJECTIVE QUESTION BUILDER */}
          {quizType === 'objective' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Question Formats Supported: Multiple Choice, True/False, Fill in the Blanks, Matching Pairs.
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button type="button" size="sm" variant="secondary" onClick={() => handleAddObjectiveQuestion('mcq')}>
                    + MCQ
                  </Button>
                  <Button type="button" size="sm" variant="secondary" onClick={() => handleAddObjectiveQuestion('true_false')}>
                    + True/False
                  </Button>
                  <Button type="button" size="sm" variant="secondary" onClick={() => handleAddObjectiveQuestion('fill_in_blanks')}>
                    + Blanks
                  </Button>
                  <Button type="button" size="sm" variant="secondary" onClick={() => handleAddObjectiveQuestion('matching')}>
                    + Matching
                  </Button>
                </div>
              </div>

              {objectiveQuestions.map((q, idx) => (
                <div key={q.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FAFAF9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <Badge variant="emerald">{q.type.toUpperCase()}</Badge>
                    <button
                      type="button"
                      onClick={() => setObjectiveQuestions(prev => prev.filter(item => item.id !== q.id))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <Input
                    label={`Question ${idx + 1}`}
                    value={q.question}
                    onChange={e => {
                      const val = e.target.value;
                      setObjectiveQuestions(prev => prev.map(item => item.id === q.id ? { ...item, question: val } : item));
                    }}
                  />

                  {q.type === 'mcq' && q.options && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                      {q.options.map((opt, optIdx) => (
                        <input
                          key={optIdx}
                          className="input-field"
                          value={opt}
                          onChange={e => {
                            const newOptions = [...q.options!];
                            newOptions[optIdx] = e.target.value;
                            setObjectiveQuestions(prev => prev.map(item => item.id === q.id ? { ...item, options: newOptions } : item));
                          }}
                          placeholder={`Option ${optIdx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {q.type === 'matching' && q.matchingPairs && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Matching Pairs:</span>
                      {q.matchingPairs.map((pair, pIdx) => (
                        <div key={pIdx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <input className="input-field" value={pair.left} readOnly style={{ backgroundColor: '#FFFFFF' }} />
                          <ArrowRight size={14} color="var(--color-text-muted)" />
                          <input className="input-field" value={pair.right} readOnly style={{ backgroundColor: '#FFFFFF' }} />
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: '12px' }}>
                    <Input
                      label="Detailed Explanation for Wrong-Answer Review"
                      value={q.explanation}
                      onChange={e => {
                        const val = e.target.value;
                        setObjectiveQuestions(prev => prev.map(item => item.id === q.id ? { ...item, explanation: val } : item));
                      }}
                      placeholder="Why is this the correct answer?"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUBJECTIVE QUESTION BUILDER */}
          {quizType === 'subjective' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Questions evaluated via AI semantic grading with full teacher override.
                </span>
                <Button type="button" size="sm" variant="secondary" onClick={handleAddSubjectiveQuestion}>
                  + Add Subjective Prompt
                </Button>
              </div>

              {subjectiveQuestions.map((q, idx) => (
                <div key={q.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FAFAF9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <Badge variant="lime">Subjective Prompt {idx + 1}</Badge>
                    <button
                      type="button"
                      onClick={() => setSubjectiveQuestions(prev => prev.filter(item => item.id !== q.id))}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-error)', cursor: 'pointer' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="input-group" style={{ marginBottom: '12px' }}>
                    <label className="input-label">Question Prompt</label>
                    <textarea
                      className="textarea-field"
                      value={q.question}
                      onChange={e => {
                        const val = e.target.value;
                        setSubjectiveQuestions(prev => prev.map(item => item.id === q.id ? { ...item, question: val } : item));
                      }}
                    />
                  </div>

                  <div className="input-group" style={{ marginBottom: '12px' }}>
                    <label className="input-label">AI Grading Rubric & Criteria</label>
                    <textarea
                      className="textarea-field"
                      value={q.rubric}
                      onChange={e => {
                        const val = e.target.value;
                        setSubjectiveQuestions(prev => prev.map(item => item.id === q.id ? { ...item, rubric: val } : item));
                      }}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Sample Ground Truth / Model Answer</label>
                    <textarea
                      className="textarea-field"
                      value={q.sampleAnswer}
                      onChange={e => {
                        const val = e.target.value;
                        setSubjectiveQuestions(prev => prev.map(item => item.id === q.id ? { ...item, sampleAnswer: val } : item));
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Step 3: Publishing Options */}
        <Card>
          <h3 className="text-h3" style={{ marginBottom: '14px' }}>3. Publishing Target</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div
              onClick={() => setPublishTarget('standalone')}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: publishTarget === 'standalone' ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                backgroundColor: publishTarget === 'standalone' ? 'var(--color-mint-bg)' : '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <QrCode size={18} color="var(--color-primary-emerald)" />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Standalone QR / PIN</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                Generates a public code. Any student or guest can attempt it with no account required.
              </p>
            </div>

            <div
              onClick={() => setPublishTarget('class')}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: publishTarget === 'class' ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                backgroundColor: publishTarget === 'class' ? 'var(--color-mint-bg)' : '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <GraduationCap size={18} color="var(--color-primary-emerald)" />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Assign to Class (+ Live QR / PIN)</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                Links to existing class roster with submission deadline, plus auto-generates a Live QR & PIN for instant classroom scanning.
              </p>
            </div>
          </div>

          {publishTarget === 'class' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Select
                  label="Assign to Course Class"
                  value={selectedClassId}
                  onChange={e => setSelectedClassId(e.target.value)}
                  options={classes.map(c => ({ value: c.id, label: `${c.name} (${c.section})` }))}
                />
                <Input
                  label="Submission Deadline"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder="YYYY-MM-DD HH:MM"
                />
              </div>

              {/* QR Code & In-Class Scan Reassurance Banner */}
              <div style={{
                backgroundColor: '#F0FDFA',
                border: '1px solid #CCFBF1',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F766E' }}>
                    <QrCode size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F766E', display: 'block' }}>
                      Classroom QR Code & Direct Join PIN Included
                    </span>
                    <span style={{ fontSize: '12px', color: '#115E59' }}>
                      Publish hone par is class ke liye Live QR Code & PIN generate hoga jise students projector se scan kar ke direct attempt kar sakty hain.
                    </span>
                  </div>
                </div>
                <Badge variant="emerald">Live In-Class Scan</Badge>
              </div>
            </div>
          )}
        </Card>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="secondary" type="button" onClick={() => setTeacherView('dashboard')}>
            Cancel
          </Button>
          <Button variant="primary" size="lg" type="submit" icon={<CheckCircle2 size={16} />}>
            Publish Quiz Now
          </Button>
        </div>
      </form>

      {/* Success Published Modal with QR & PIN */}
      {publishedQuiz && (
        <Modal
          isOpen={!!publishedQuiz}
          onClose={() => {
            setPublishedQuiz(null);
            setTeacherView(publishedQuiz.isStandalone ? 'reports' : 'classes');
          }}
          title="Quiz Successfully Published!"
          maxWidth="500px"
          footer={
            <Button
              variant="primary"
              onClick={() => {
                const targetView = publishedQuiz.isStandalone ? 'reports' : 'classes';
                setPublishedQuiz(null);
                setTeacherView(targetView);
              }}
            >
              Done & View
            </Button>
          }
        >
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{publishedQuiz.title}</h4>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '16px' }}>
              {publishedQuiz.isStandalone
                ? 'Open Standalone Quiz (Guest & Public Access)'
                : `Assigned to Class: ${classes.find(c => c.id === publishedQuiz.assignedClassId)?.name || 'Course Class'}`}
            </span>

            <QRCodeDisplay
              value={publishedQuiz.joinCode}
              label={publishedQuiz.isStandalone ? "STANDALONE QUIZ PIN" : "CLASS QUIZ QR & PIN"}
              size={150}
              showCopy
            />

            {!publishedQuiz.isStandalone && (
              <div style={{ marginTop: '16px', backgroundColor: '#F0FDFA', border: '1px solid #CCFBF1', borderRadius: '8px', padding: '12px', fontSize: '12.5px', color: '#0F766E', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <QrCode size={22} color="#0F766E" />
                <div>
                  <strong>Classroom Projector Ready:</strong> Display this QR on the classroom screen or share PIN <strong>{publishedQuiz.joinCode}</strong>. Enrolled students who scan or enter the PIN will have their scores automatically synced to this class roster.
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
