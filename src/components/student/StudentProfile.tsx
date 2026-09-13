import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  CreditCard,
  Bell,
  Check,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { Progress } from '../common/Progress';

export const StudentProfile: React.FC = () => {
  const { studentQuota, setStudentView, showToast } = useApp();

  const [name, setName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.j@univ.edu.pk');
  const [degree, setDegree] = useState('BS Computer Science (Senior)');

  const studentPlans = [
    {
      id: 'free',
      name: 'Free Student',
      price: '$0',
      features: ['Join Unlimited Classes', 'Basic Practice Quizzes', 'Standard AI Learning Plans (5/mo)'],
      current: false
    },
    {
      id: 'scholar',
      name: 'Scholar Plus',
      price: '$9',
      features: ['Unlimited AI Learning Plans', 'Detailed AI Wrong-Answer Explanations', 'Peer Room Multiplayer Host', 'Exportable Study Guides'],
      current: true
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Student settings saved.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div>
        <h1 className="text-h1">Student Profile & Settings</h1>
        <p className="text-body" style={{ marginTop: '4px' }}>
          Manage your student account, AI usage credits, subscription plan, and study reminders.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Account Info */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px' }}>
              SJ
            </div>
            <div>
              <h3 className="text-h3">{name}</h3>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{degree}</span>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input label="Student Name" value={name} onChange={e => setName(e.target.value)} />
            <Input label="University Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Degree & Semester" value={degree} onChange={e => setDegree(e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <Button variant="primary" type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>

        {/* Quota & Notifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                AI Learning Quota
              </span>
              <Badge variant="emerald">{studentQuota.percentage}%</Badge>
            </div>
            <Progress value={studentQuota.percentage} showPercentage={false} />
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', display: 'block', marginTop: '8px' }}>
              {studentQuota.used} of {studentQuota.total} AI explanations & plans used this month.
            </span>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Bell size={18} color="var(--color-primary-emerald)" />
              <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Active Reminders</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ padding: '10px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} color="var(--color-primary-emerald)" /> Transport Layer Quiz due tomorrow at 23:59
              </div>
              <div style={{ padding: '10px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={14} color="var(--color-primary-emerald)" /> Complete Module 04 on Backpropagation
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <h3 className="text-h3" style={{ marginBottom: '14px' }}>Scholar Membership Tiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {studentPlans.map(p => (
            <Card
              key={p.id}
              style={{
                border: p.current ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                backgroundColor: p.current ? '#FFFFFF' : '#FAFAF9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{p.name}</h4>
                  {p.current && <Badge variant="emerald">Active</Badge>}
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary-emerald)', marginBottom: '14px' }}>
                  {p.price} <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 500 }}>/month</span>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0', listStyle: 'none' }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <Check size={14} color="var(--color-primary-emerald)" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button
                  variant={p.current ? 'secondary' : 'primary'}
                  style={{ width: '100%' }}
                  disabled={p.current}
                  onClick={() => showToast(`Selected ${p.name}`)}
                >
                  {p.current ? 'Current Subscription' : 'Upgrade Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
