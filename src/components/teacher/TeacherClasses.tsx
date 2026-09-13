import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Plus,
  Users,
  FileQuestion,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Layers
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input, Select } from '../common/Input';
import { Progress } from '../common/Progress';

export const TeacherClasses: React.FC = () => {
  const {
    classes,
    addClass,
    setSelectedClassId,
    setTeacherView
  } = useApp();

  // Mode: 'list' (Created Classes) vs 'create' (Create New Class)
  const [activeSubTab, setActiveSubTab] = useState<'created_classes' | 'create_new_class'>('created_classes');

  // Form State for new class
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [academicYear, setAcademicYear] = useState('2026-Fall');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim() || !section.trim() || !subject.trim()) return;

    addClass({
      name: className,
      department,
      section,
      subject,
      academicYear
    });

    // Reset and return to list
    setClassName('');
    setSection('');
    setSubject('');
    setActiveSubTab('created_classes');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="text-h1">Classes</h1>
          <p className="text-body" style={{ marginTop: '4px' }}>
            Manage your classes and student progress.
          </p>
        </div>

        {/* Top-Right Primary Action */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant={activeSubTab === 'create_new_class' ? 'secondary' : 'primary'}
            icon={activeSubTab === 'create_new_class' ? <ArrowLeft size={16} /> : <Plus size={16} />}
            onClick={() => setActiveSubTab(activeSubTab === 'create_new_class' ? 'created_classes' : 'create_new_class')}
          >
            {activeSubTab === 'create_new_class' ? 'Back to Classes' : '+ Create New Class'}
          </Button>
        </div>
      </div>

      {/* VIEW 1: CREATED CLASSES */}
      {activeSubTab === 'created_classes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
            {classes.map(cls => (
              <Card
                key={cls.id}
                hover
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setTeacherView('class_detail');
                }}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <Badge variant="emerald">{cls.department}</Badge>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      Section: <strong style={{ color: 'var(--color-text-main)' }}>{cls.section}</strong>
                    </span>
                  </div>

                  <h3 className="text-h3" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    {cls.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '16px' }}>
                    Subject: {cls.subject} • {cls.academicYear}
                  </span>

                  {/* Class Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={16} color="var(--color-primary-emerald)" />
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Students</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{cls.studentsCount}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileQuestion size={16} color="var(--color-deep-teal)" />
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Quizzes</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{cls.quizzesCount}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <Progress value={cls.progress} label="Syllabus Progress" />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                    Code: <strong style={{ letterSpacing: '0.05em', color: 'var(--color-primary-emerald)' }}>{cls.joinCode}</strong>
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Manage Class <ChevronRight size={14} />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: CREATE NEW CLASS */}
      {activeSubTab === 'create_new_class' && (
        <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
          <Card>
            <div style={{ marginBottom: '20px' }}>
              <h2 className="text-h2">Create a New Class</h2>
              <p className="text-body" style={{ marginTop: '4px' }}>
                Set up an academic classroom. A unique join PIN and QR code will be generated immediately.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Class / Course Title *"
                placeholder="e.g. Distributed Cloud Systems & Microservices"
                value={className}
                onChange={e => setClassName(e.target.value)}
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Select
                  label="Department *"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  options={[
                    { value: 'Computer Science', label: 'Computer Science' },
                    { value: 'Software Engineering', label: 'Software Engineering' },
                    { value: 'Data Science & AI', label: 'Data Science & AI' },
                    { value: 'Cybersecurity', label: 'Cybersecurity' },
                    { value: 'Electrical Engineering', label: 'Electrical Engineering' }
                  ]}
                />

                <Input
                  label="Section Name / Identifier *"
                  placeholder="e.g. CS-4A or Evening-B"
                  value={section}
                  onChange={e => setSection(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input
                  label="Subject Name *"
                  placeholder="e.g. Distributed Computing"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                />

                <Select
                  label="Academic Term *"
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value)}
                  options={[
                    { value: '2026-Fall', label: '2026 - Fall Semester' },
                    { value: '2026-Spring', label: '2026 - Spring Semester' },
                    { value: '2026-Summer', label: '2026 - Summer Term' }
                  ]}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <Button variant="secondary" type="button" onClick={() => setActiveSubTab('created_classes')}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" icon={<Plus size={16} />}>
                  Create Class
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
