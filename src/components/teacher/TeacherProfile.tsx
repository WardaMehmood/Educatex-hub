import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TEACHER_TIMETABLE } from '../../data/mockData';
import {
  User,
  Shield,
  CreditCard,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { Progress } from '../common/Progress';

export const TeacherProfile: React.FC = () => {
  const {
    teacherQuota,
    subjectiveGradingOverrideEnabled,
    setSubjectiveGradingOverrideEnabled,
    showToast
  } = useApp();

  const [fullName, setFullName] = useState('Prof. Warda Mehmood');
  const [email, setEmail] = useState('warda.mehmood@univ.edu.pk');
  const [department, setDepartment] = useState('Department of Computer Science & Engineering');
  const [activePlan, setActivePlan] = useState<'pro' | 'enterprise'>('pro');

  const plans = [
    {
      id: 'free',
      name: 'Starter Educator',
      price: '$0',
      period: 'forever',
      features: ['2 Active Classes', '10 AI Lecture Plans/mo', 'Basic Quiz Generation', 'Community Support'],
      current: false
    },
    {
      id: 'pro',
      name: 'Pro Faculty Tier',
      price: '$29',
      period: 'per month',
      features: [
        'Unlimited Active Classes',
        '100 AI Lecture Plans & Slides/mo',
        'Multi-format Quizzes & Rubrics',
        'Full AI Subjective Grading Override',
        'Classroom Live Competition Hosting'
      ],
      current: true
    },
    {
      id: 'enterprise',
      name: 'Institutional Campus',
      price: '$199',
      period: 'per department/mo',
      features: [
        'Dedicated LLM fine-tuned to university curriculum',
        'Automated SIS / Canvas / Blackboard Sync',
        'Custom Institutional Certificates',
        '24/7 Priority SLA & Dedicated Account Manager'
      ],
      current: false
    }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile settings saved successfully.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header */}
      <div>
        <h1 className="text-h1">Faculty Profile & Settings</h1>
        <p className="text-body" style={{ marginTop: '4px' }}>
          Manage your institutional credentials, AI quotas, weekly timetable, and grading preferences.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Account Settings */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px' }}>
              WM
            </div>
            <div>
              <h3 className="text-h3">{fullName}</h3>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{email}</span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <Input
              label="Institutional Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              label="Department / Faculty"
              value={department}
              onChange={e => setDepartment(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button variant="primary" type="submit">
                Save Account Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Quota & Grading Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AI Quota Widget */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-main)' }}>
                AI Generation Quota
              </span>
              <Badge variant="emerald">{teacherQuota.percentage}% Used</Badge>
            </div>

            <Progress value={teacherQuota.percentage} showPercentage={false} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              <span>Consumed: <strong>{teacherQuota.used} units</strong></span>
              <span>Total Cap: <strong>{teacherQuota.total} units</strong></span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '12px' }}>
              Quota resets on the 1st of every month. Lecture plans and slide generations consume 1 unit each.
            </p>
          </Card>

          {/* Subjective Grading Override Setting */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  Subjective Grading Override
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '4px', maxWidth: '320px' }}>
                  When enabled, all AI-evaluated subjective questions require teacher confirmation or manual score adjustment before releasing to students.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubjectiveGradingOverrideEnabled(!subjectiveGradingOverrideEnabled);
                  showToast(
                    !subjectiveGradingOverrideEnabled
                      ? 'Teacher grading override enabled.'
                      : 'Automatic AI grading direct release enabled.'
                  );
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: subjectiveGradingOverrideEnabled ? 'var(--color-primary-emerald)' : 'var(--color-text-light)'
                }}
              >
                {subjectiveGradingOverrideEnabled ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly Timetable / Calendar */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="text-h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--color-primary-emerald)" />
              Weekly Academic Timetable
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Scheduled lecture halls, laboratory sections, and office hours.
            </p>
          </div>
          <Badge variant="emerald">Fall 2026 Semester</Badge>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time Slot</th>
                <th>Course / Lecture</th>
                <th>Section</th>
                <th>Location / Lab</th>
              </tr>
            </thead>
            <tbody>
              {TEACHER_TIMETABLE.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{row.day}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                      <Clock size={13} /> {row.time}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{row.subject}</td>
                  <td><Badge variant="neutral">{row.section}</Badge></td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--color-primary-emerald)', fontWeight: 600 }}>
                      <MapPin size={13} /> {row.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Subscription / Upgrade Screen */}
      <div>
        <h3 className="text-h3" style={{ marginBottom: '14px' }}>Subscription & Institutional Plans</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {plans.map(p => (
            <Card
              key={p.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: p.current ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                backgroundColor: p.current ? '#FFFFFF' : '#FAFAF9'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{p.name}</h4>
                  {p.current && <Badge variant="emerald">Current Plan</Badge>}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-emerald)' }}>{p.price}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>/{p.period}</span>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0', listStyle: 'none' }}>
                  {p.features.map((feat, fidx) => (
                    <li key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--color-text-main)' }}>
                      <Check size={14} color="var(--color-primary-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button
                  variant={p.current ? 'secondary' : 'primary'}
                  style={{ width: '100%' }}
                  disabled={p.current}
                  onClick={() => showToast(`Requested upgrade to ${p.name}`)}
                >
                  {p.current ? 'Active Subscription' : 'Upgrade to Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
