import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Plus,
  QrCode,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Users,
  ChevronRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Progress } from '../common/Progress';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';

export const StudentMyClasses: React.FC = () => {
  const {
    classes,
    setSelectedClassId,
    setStudentView,
    joinViaCode,
    showToast
  } = useApp();

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');

  const handleJoinClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    const res = joinViaCode(joinCodeInput);
    if (res.success) {
      setShowJoinModal(false);
      setJoinCodeInput('');
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="text-h1">My Classes</h1>
          <p className="text-body" style={{ marginTop: '4px' }}>
            Classes you are currently enrolled in. View course materials and attempt teacher-assigned quizzes.
          </p>
        </div>

        {/* Top Action */}
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setShowJoinModal(true)}
        >
          + Join a Class
        </Button>
      </div>

      {/* Joined Classes Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
        {classes.slice(0, 3).map(cls => (
          <Card
            key={cls.id}
            hover
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <Badge variant="emerald">{cls.section}</Badge>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Code: <strong style={{ color: 'var(--color-text-main)' }}>{cls.joinCode}</strong>
                </span>
              </div>

              <h3 className="text-h3" style={{ fontSize: '17px', marginBottom: '4px' }}>
                {cls.name}
              </h3>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '14px' }}>
                Instructor: Prof. Warda Mehmood • Subject: {cls.subject}
              </span>

              {/* Pending Quiz / Deadline Callout */}
              <div style={{ padding: '12px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)' }}>
                    Pending Quiz
                  </span>
                  <Badge variant="warning">Due Tomorrow</Badge>
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                  Transport Layer & TCP Congestion Control
                </span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <Progress value={cls.progress} label="Course Progress" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
              <Button
                variant="secondary"
                size="sm"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setStudentView('student_class_detail');
                }}
              >
                View Class →
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Join a Class Modal (Enter PIN or Scan QR) */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join a Class"
        maxWidth="460px"
      >
        <form onSubmit={handleJoinClass} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
            Enter the 8-character Class Join Code or PIN provided by your teacher (e.g. <code>NET-4091</code>, <code>OPS-8821</code>, or <code>DBS-3190</code>).
          </p>

          <Input
            label="Class Join Code / PIN *"
            placeholder="e.g. NET-4091"
            value={joinCodeInput}
            onChange={e => setJoinCodeInput(e.target.value)}
            required
            autoFocus
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <QrCode size={20} color="var(--color-primary-emerald)" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block' }}>
                Camera QR Scanner
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                You can also point your camera directly at the classroom projector screen.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="secondary" type="button" onClick={() => setShowJoinModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Enroll in Class
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
