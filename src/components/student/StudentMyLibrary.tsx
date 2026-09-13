import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LearningPlan } from '../../types';
import {
  Layers,
  BookOpen,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const StudentMyLibrary: React.FC = () => {
  const { learningPlans, setStudentView } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="text-h1">My Learning Library</h1>
          <p className="text-body" style={{ marginTop: '4px' }}>
            Permanent repository of your AI learning plans, modular lessons, and practice test logs. Revisit any concept without re-generating.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<BookOpen size={15} />}
          onClick={() => setStudentView('learn_topic')}
        >
          + Learn New Topic
        </Button>
      </div>

      {/* Plans Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {learningPlans.map(plan => (
          <Card
            key={plan.id}
            hover
            onClick={() => setSelectedPlan(plan)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Badge variant="emerald">{plan.level}</Badge>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {plan.createdAt}
                </span>
              </div>

              <h3 className="text-h3" style={{ fontSize: '17px', marginBottom: '6px' }}>
                {plan.topic}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                {plan.goal}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#FAFAF9', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Curriculum Modules:
                </span>
                {plan.modules.map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--color-text-main)' }}>
                    <CheckCircle2 size={13} color="var(--color-primary-emerald)" />
                    <span>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>
                {plan.progress}% Mastered
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Review Notes <ExternalLink size={13} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Plan Review Modal */}
      {selectedPlan && (
        <Modal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          title={`Library Plan: ${selectedPlan.topic}`}
          maxWidth="640px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
              Goal: <strong>{selectedPlan.goal}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedPlan.modules.map((m, i) => (
                <div key={m.id} style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FAFAF9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary-emerald)', fontSize: '14px' }}>
                      {m.number}.
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{m.title}</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-main)', marginBottom: '10px' }}>
                    {m.content}
                  </p>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Key Concepts:
                    </span>
                    <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                      {m.keyTakeaways.map((t, tidx) => (
                        <li key={tidx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
