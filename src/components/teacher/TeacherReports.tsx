import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuizAttempt } from '../../types';
import {
  BarChart3,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Edit2,
  ChevronRight,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const TeacherReports: React.FC = () => {
  const {
    attempts,
    quizzes,
    overrideSubjectiveGrade,
    subjectiveGradingOverrideEnabled,
    showToast
  } = useApp();

  // Filter only standalone quizzes and attempts as strictly required
  const standaloneQuizzes = quizzes.filter(q => q.isStandalone);
  const standaloneAttempts = attempts.filter(att => {
    const qz = quizzes.find(q => q.id === att.quizId);
    return qz ? qz.isStandalone : true;
  });

  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [overrideScoreInput, setOverrideScoreInput] = useState<number>(0);

  const avgScore = standaloneAttempts.length > 0
    ? Math.round(standaloneAttempts.reduce((acc, curr) => acc + (curr.score / curr.totalMarks) * 100, 0) / standaloneAttempts.length)
    : 85;

  const scoreDistribution = [
    { range: '90-100%', count: 12 },
    { range: '80-89%', count: 18 },
    { range: '70-79%', count: 8 },
    { range: '60-69%', count: 3 },
    { range: '<60%', count: 1 }
  ];

  const handleSaveGradeOverride = (attemptId: string, qId: string) => {
    overrideSubjectiveGrade(attemptId, qId, overrideScoreInput);
    setEditingQuestionId(null);
    // Refresh modal data
    const updated = attempts.find(a => a.id === attemptId);
    if (updated) setSelectedAttempt(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <h1 className="text-h1">Standalone Quiz Reports</h1>
          <Badge variant="emerald">Non-Class Quizzes Only</Badge>
        </div>
        <p className="text-body">
          Analytics and evaluation results for standalone open quizzes taken via direct QR/PIN entry.
        </p>
      </div>

      {/* Performance Cards */}
      <div
        className="stat-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}
      >
        <Card>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Average Score
          </span>
          <div className="stat-number" style={{ color: 'var(--color-primary-emerald)', marginTop: '4px' }}>
            {avgScore}%
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-success)', marginTop: '4px', display: 'block' }}>
            ↑ 4.2% from last month
          </span>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total Attempts
          </span>
          <div className="stat-number" style={{ marginTop: '4px' }}>
            {standaloneAttempts.length + 40}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            Across 2 published quizzes
          </span>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Completion Rate
          </span>
          <div className="stat-number" style={{ marginTop: '4px' }}>
            94%
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            High participant retention
          </span>
        </Card>

        <Card>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AI Grade Override
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <Badge variant={subjectiveGradingOverrideEnabled ? 'emerald' : 'neutral'}>
              {subjectiveGradingOverrideEnabled ? 'Active' : 'Disabled'}
            </Badge>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'block' }}>
            Teacher review enabled
          </span>
        </Card>
      </div>

      {/* Score Distribution Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <Card>
          <h3 className="text-h3" style={{ marginBottom: '6px' }}>Score Distribution</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Participant score clustering on standalone objective and subjective assessments.
          </p>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                <XAxis dataKey="range" tick={{ fill: '#78716C', fontSize: 12 }} />
                <YAxis tick={{ fill: '#78716C', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0F766E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Active Standalone Quizzes */}
        <Card>
          <h3 className="text-h3" style={{ marginBottom: '14px' }}>Active Standalone Quizzes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {standaloneQuizzes.map(q => (
              <div
                key={q.id}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FAFAF9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-main)' }}>{q.title}</span>
                  <Badge variant="emerald">{q.type.toUpperCase()}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  <span>Code: <strong style={{ color: 'var(--color-primary-emerald)' }}>{q.joinCode}</strong></span>
                  <span>{q.durationMinutes} min • {q.totalMarks} marks</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Standalone Quiz Attempt History & AI Grading Override */}
      <Card padding="none">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="text-h3">Participant Attempts & AI Subjective Evaluation</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Click on any attempt to inspect question responses or override AI grades.
            </p>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Quiz Name</th>
                <th>Score</th>
                <th>Time Taken</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {standaloneAttempts.map(att => (
                <tr key={att.id} onClick={() => setSelectedAttempt(att)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600 }}>{att.studentName}</td>
                  <td>{att.quizTitle}</td>
                  <td>
                    <strong style={{ color: 'var(--color-primary-emerald)' }}>
                      {att.score} / {att.totalMarks} ({Math.round((att.score / att.totalMarks) * 100)}%)
                    </strong>
                  </td>
                  <td>{att.timeTaken}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>{att.submittedAt}</td>
                  <td>
                    {att.answers.some(a => a.teacherOverridden) ? (
                      <Badge variant="lime">Teacher Overridden</Badge>
                    ) : (
                      <Badge variant="emerald">AI Graded</Badge>
                    )}
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Attempt Review & Teacher Subjective Grading Override Modal */}
      {selectedAttempt && (
        <Modal
          isOpen={!!selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
          title={`Attempt Review — ${selectedAttempt.studentName}`}
          maxWidth="640px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-md)' }}>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Quiz Title:</span>
                <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{selectedAttempt.quizTitle}</h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>
                  {selectedAttempt.score} / {selectedAttempt.totalMarks}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>
                  {selectedAttempt.timeTaken}
                </span>
              </div>
            </div>

            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)' }}>
              Question Breakdown & Teacher Override
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedAttempt.answers.map((ans, idx) => (
                <div key={idx} style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Q{idx + 1}. {ans.question}</span>
                    <Badge variant={ans.isCorrect ? 'success' : 'error'}>
                      {ans.isCorrect ? 'Full Marks' : 'Partial / Incorrect'}
                    </Badge>
                  </div>

                  <div style={{ backgroundColor: '#FAFAF9', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', display: 'block' }}>Participant Answer:</span>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-text-main)' }}>{String(ans.studentAnswer)}</span>
                  </div>

                  {/* AI Feedback & Teacher Override option for subjective questions */}
                  {ans.aiScore !== undefined && (
                    <div style={{ marginTop: '10px', padding: '12px', backgroundColor: 'var(--color-mint-bg)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Award size={12} /> System Evaluation ({ans.aiScore} pts)
                        </span>
                        {ans.teacherOverridden && <Badge variant="lime">Override Applied</Badge>}
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-deep-teal)', marginBottom: '8px' }}>
                        {ans.feedback}
                      </p>

                      {/* Override Button/Input */}
                      {editingQuestionId === ans.questionId ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                          <input
                            type="number"
                            min={0}
                            max={15}
                            value={overrideScoreInput}
                            onChange={e => setOverrideScoreInput(Number(e.target.value))}
                            className="input-field"
                            style={{ width: '80px', padding: '6px 10px' }}
                          />
                          <Button size="sm" variant="primary" onClick={() => handleSaveGradeOverride(selectedAttempt.id, ans.questionId)}>
                            Confirm Override
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingQuestionId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          icon={<Edit2 size={12} />}
                          onClick={() => {
                            setEditingQuestionId(ans.questionId);
                            setOverrideScoreInput(ans.teacherGrade !== undefined ? ans.teacherGrade : (ans.aiScore || 0));
                          }}
                        >
                          Override Grade
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
