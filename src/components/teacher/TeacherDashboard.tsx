import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  FileQuestion,
  Users,
  BookOpen,
  Zap,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  BarChart2,
  ChevronRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const CHART_DATA = [
  { name: 'Quiz 1', avg: 82, passing: 94 },
  { name: 'Quiz 2', avg: 76, passing: 88 },
  { name: 'Quiz 3', avg: 89, passing: 96 },
  { name: 'Quiz 4', avg: 84, passing: 90 },
  { name: 'Quiz 5', avg: 91, passing: 98 }
];

export const TeacherDashboard: React.FC = () => {
  const {
    setTeacherView,
    classes,
    setSelectedClassId,
    teacherQuota
  } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 className="text-h1">Good morning, Teacher</h1>
          <p className="text-body" style={{ marginTop: '2px', fontSize: '12px' }}>
            Here's what's happening with your classes today.
          </p>
        </div>

        {/* Primary Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="secondary"
            size="sm"
            icon={<BookOpen size={14} />}
            onClick={() => setTeacherView('prepare_lecture')}
          >
            + Prepare Lecture
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={14} />}
            onClick={() => setTeacherView('create_quiz')}
          >
            + Create Quiz
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div
        className="stat-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px'
        }}
      >
        <Card hover>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Classes
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--color-mint-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-emerald)' }}>
              <GraduationCap size={15} />
            </div>
          </div>
          <div className="stat-number">08</div>
          <span style={{ fontSize: '11px', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
            ↑ 2 new this semester
          </span>
        </Card>

        <Card hover>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quizzes
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-deep-teal)' }}>
              <FileQuestion size={15} />
            </div>
          </div>
          <div className="stat-number">24</div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            18 objective, 6 subjective
          </span>
        </Card>

        <Card hover>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Students
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--color-mint-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-emerald)' }}>
              <Users size={15} />
            </div>
          </div>
          <div className="stat-number">186</div>
          <span style={{ fontSize: '11px', color: 'var(--color-success)', marginTop: '4px', display: 'block' }}>
            91% active completion
          </span>
        </Card>

        <Card hover>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Monthly Quota
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--color-lime-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6212' }}>
              <Zap size={15} />
            </div>
          </div>
          <div className="stat-number" style={{ color: 'var(--color-primary-emerald)' }}>
            {teacherQuota.percentage}%
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            18 of 25 credits consumed
          </span>
        </Card>
      </div>

      {/* Grid: Recent Classes & Quiz Performance Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '12px' }}>
        {/* Recent Classes */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <h3 className="text-h3">Recent Classes</h3>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                Active courses and student progress
              </p>
            </div>
            <button
              onClick={() => setTeacherView('classes')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary-emerald)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              View all <ChevronRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {classes.slice(0, 3).map(cls => (
              <div
                key={cls.id}
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setTeacherView('class_detail');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                className="card-hover"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--color-text-main)' }}>
                      {cls.name}
                    </span>
                    <Badge variant="emerald">{cls.section}</Badge>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px', display: 'block' }}>
                    {cls.department} • {cls.studentsCount} Students • {cls.quizzesCount} Quizzes
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary-emerald)' }}>
                      {cls.averageScore}% avg
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--color-text-muted)', display: 'block' }}>
                      Progress: {cls.progress}%
                    </span>
                  </div>
                  <ChevronRight size={14} color="var(--color-text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz Performance Chart */}
        <Card>
          <div style={{ marginBottom: '10px' }}>
            <h3 className="text-h3">Quiz Performance Trend</h3>
            <p style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
              Average student score across recent quizzes
            </p>
          </div>
          <div style={{ width: '100%', height: '140px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                <XAxis dataKey="name" tick={{ fill: '#78716C', fontSize: 11 }} axisLine={{ stroke: '#E7E5E4' }} />
                <YAxis domain={[50, 100]} tick={{ fill: '#78716C', fontSize: 11 }} axisLine={{ stroke: '#E7E5E4' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7E5E4',
                    borderRadius: '6px',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="avg" fill="#0F766E" radius={[3, 3, 0, 0]} name="Average Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Upcoming Deadlines & Recent Quiz Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Upcoming Deadlines */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Clock size={15} color="var(--color-primary-emerald)" />
            <h3 className="text-h3">Upcoming Deadlines</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', backgroundColor: '#FAFAF9', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Transport Layer & TCP Congestion Control
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Advanced Computer Networks • CS-4A
                </span>
              </div>
              <Badge variant="warning">Sep 15, 23:59</Badge>
            </div>

            <div style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', backgroundColor: '#FAFAF9', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Process Scheduling & Deadlocks
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Operating Systems & Concurrency • SE-3B
                </span>
              </div>
              <Badge variant="neutral">Sep 18, 23:59</Badge>
            </div>
          </div>
        </Card>

        {/* Recent Quiz Activity */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <CheckCircle2 size={15} color="var(--color-primary-emerald)" />
            <h3 className="text-h3">Recent Quiz Submissions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  Sarah Jenkins
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>
                  Submitted "Transport Layer & TCP Congestion"
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge variant="success">95% (19/20)</Badge>
                <span style={{ fontSize: '10px', color: 'var(--color-text-light)', display: 'block', marginTop: '1px' }}>
                  2h ago
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  Ahmed Tariq
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>
                  Submitted "Transport Layer & TCP Congestion"
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge variant="emerald">86% (17/20)</Badge>
                <span style={{ fontSize: '10px', color: 'var(--color-text-light)', display: 'block', marginTop: '1px' }}>
                  5h ago
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
