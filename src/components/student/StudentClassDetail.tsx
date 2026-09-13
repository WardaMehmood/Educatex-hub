import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  CheckCircle2,
  FileQuestion,
  Megaphone,
  AlertCircle
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const StudentClassDetail: React.FC = () => {
  const {
    classes,
    quizzes,
    selectedClassId,
    setStudentView,
    setSelectedQuizId
  } = useApp();

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setStudentView('quiz_attempt');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <button
        onClick={() => setStudentView('my_classes')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--color-primary-emerald)',
          fontSize: '13.5px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          alignSelf: 'flex-start'
        }}
      >
        <ArrowLeft size={16} /> Back to My Classes
      </button>

      {/* Class Banner */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 className="text-h1" style={{ fontSize: '24px' }}>{currentClass.name}</h1>
              <Badge variant="emerald">{currentClass.section}</Badge>
            </div>
            <p className="text-body">
              Instructor: Prof. Warda Mehmood • {currentClass.department} • Term: {currentClass.academicYear}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Class Join Code</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary-emerald)' }}>
              {currentClass.joinCode}
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Assigned Quizzes & Tasks vs Announcements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        {/* Assigned Quizzes & Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="text-h3">Assigned Quizzes & Tasks</h3>

          {(currentClass.assignedQuizzes || []).length === 0 ? (
            <Card>
              <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
                No active tasks assigned at this moment.
              </span>
            </Card>
          ) : (
            currentClass.assignedQuizzes.map(asg => {
              const linkedQuiz = quizzes.find(q => q.id === asg.quizId);
              const quizType = linkedQuiz?.type || 'objective';
              const questionCount = quizType === 'subjective'
                ? (linkedQuiz?.subjectiveQuestions?.length || 2)
                : (linkedQuiz?.objectiveQuestions?.length || 4);

              return (
                <Card key={asg.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                          {asg.title}
                        </h4>
                        <Badge variant="emerald">{quizType.toUpperCase()}</Badge>
                      </div>
                      <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <Clock size={13} /> Deadline: <strong style={{ color: 'var(--color-text-main)' }}>{asg.deadline}</strong>
                      </span>
                    </div>
                    <Badge variant={asg.status === 'active' ? 'warning' : 'neutral'}>
                      {asg.status === 'active' ? 'Pending' : 'Completed'}
                    </Badge>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
                    <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                      Format: <strong>{quizType === 'subjective' ? 'Subjective (Essay/AI Rubric)' : 'Objective (MCQs)'}</strong> • {questionCount} Questions
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartQuiz(asg.quizId)}
                    >
                      Attempt Quiz Now →
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Class Announcements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="text-h3">Teacher Announcements</h3>
          {currentClass.announcements.map(ann => (
            <Card key={ann.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{ann.title}</span>
                {ann.pinned && <Badge variant="lime">Pinned</Badge>}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                {ann.content}
              </p>
              <span style={{ fontSize: '11px', color: 'var(--color-text-light)' }}>
                {ann.author} • {ann.createdAt}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
