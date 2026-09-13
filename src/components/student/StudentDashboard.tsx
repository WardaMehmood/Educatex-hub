import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  GraduationCap,
  FileQuestion,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Trophy,
  Compass
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Progress } from '../common/Progress';

export const StudentDashboard: React.FC = () => {
  const {
    setStudentView,
    learningPlans,
    classes,
    setSelectedClassId,
    studentQuota
  } = useApp();

  const currentLearningPlan = learningPlans[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header */}
      <div>
        <h1 className="text-h1">Good morning, Student</h1>
        <p className="text-body" style={{ marginTop: '2px', fontSize: '12px' }}>
          Ready to continue learning?
        </p>
      </div>

      {/* Hero Card: Continue Learning (Prompt Requirement) */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDFA 100%)',
          border: '1px solid var(--color-mint-border)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="badge badge-emerald">
                <BookOpen size={11} /> Active Learning Plan
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Topic 4 of 6
              </span>
            </div>
            <h2 className="text-h2" style={{ color: 'var(--color-text-main)', marginBottom: '4px' }}>
              {currentLearningPlan?.topic || 'Machine Learning'}
            </h2>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: '8px', fontSize: '12px' }}>
              {currentLearningPlan?.goal || 'Master neural networks, backpropagation algorithms, and loss functions.'}
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            onClick={() => setStudentView('learn_topic')}
          >
            Continue Learning →
          </Button>
        </div>

        <div style={{ marginTop: '6px' }}>
          <Progress value={currentLearningPlan?.progress || 72} label="Plan Progress" />
        </div>
      </Card>

      {/* Statistics Cards */}
      <div
        className="stat-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px'
        }}
      >
        <Card hover onClick={() => setStudentView('my_classes')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Joined Classes
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--color-mint-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-emerald)' }}>
              <GraduationCap size={15} />
            </div>
          </div>
          <div className="stat-number">04</div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            All semester courses active
          </span>
        </Card>

        <Card hover onClick={() => setStudentView('take_quiz')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quizzes
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-deep-teal)' }}>
              <FileQuestion size={15} />
            </div>
          </div>
          <div className="stat-number">12</div>
          <span style={{ fontSize: '11px', color: 'var(--color-success)', marginTop: '4px', display: 'block' }}>
            10 completed, 2 upcoming
          </span>
        </Card>

        <Card hover>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Learning Progress
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--color-lime-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6212' }}>
              <TrendingUp size={15} />
            </div>
          </div>
          <div className="stat-number" style={{ color: 'var(--color-primary-emerald)' }}>
            78%
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            Cumulative comprehension score
          </span>
        </Card>
      </div>

      {/* Grid: Pending Class Assignments & Recent Learning Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
        {/* Pending Deadlines in Joined Classes */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <h3 className="text-h3">Pending Class Quizzes</h3>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                Assigned by your teachers with upcoming deadlines
              </p>
            </div>
            <button
              onClick={() => setStudentView('my_classes')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary-emerald)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              View Classes →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Transport Layer & TCP Congestion Control
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Advanced Computer Networks • Prof. Warda Mehmood
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge variant="warning">Due Tomorrow 23:59</Badge>
                <button
                  onClick={() => {
                    setSelectedClassId('cls-1');
                    setStudentView('student_class_detail');
                  }}
                  style={{
                    display: 'block',
                    marginTop: '2px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-primary-emerald)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Start Quiz →
                </button>
              </div>
            </div>

            <div style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Process Scheduling & Deadlocks
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Operating Systems & Concurrency • Prof. Warda Mehmood
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge variant="neutral">Due Sep 18</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div style={{ marginBottom: '10px' }}>
            <h3 className="text-h3">Recent Learning Activity</h3>
            <p style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
              Your latest quiz attempts and self-paced sessions
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '6px', borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Completed Practice Quiz: Module 03
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Perceptrons to Multi-Layer Networks • Score 85%
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '6px', borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-lime-soft)', color: '#3F6212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Joined Room Competition
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Python Rapid Fire • Ranked #1
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#F0FDFA', color: 'var(--color-deep-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  New AI Plan Saved to Library
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Distributed Consensus Algorithms (Raft)
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
