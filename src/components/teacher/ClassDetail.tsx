import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentDrilldown } from '../../types';
import {
  ArrowLeft,
  Users,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  QrCode,
  Megaphone,
  ChevronRight,
  TrendingUp,
  FileQuestion,
  Search,
  ExternalLink
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Tabs } from '../common/Tabs';
import { Progress } from '../common/Progress';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/Input';
import { QRCodeDisplay } from '../common/QRCodeDisplay';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const ClassDetail: React.FC = () => {
  const {
    classes,
    selectedClassId,
    setTeacherView,
    addAnnouncement,
    assignQuizToClass,
    quizzes
  } = useApp();

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'quizzes' | 'reports'>('overview');

  // Modals
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');

  const [showAssignQuizModal, setShowAssignQuizModal] = useState(false);
  const [selectedAssignQuizId, setSelectedAssignQuizId] = useState(quizzes[0]?.id || '');
  const [assignDeadline, setAssignDeadline] = useState('2026-09-20 23:59');
  const [maxAttempts, setMaxAttempts] = useState(1);

  // Student Drilldown Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentDrilldown | null>(null);

  // Class Quiz Projection QR Modal
  const [selectedQuizForQR, setSelectedQuizForQR] = useState<{ title: string; joinCode: string; deadline: string } | null>(null);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) return;
    addAnnouncement(currentClass.id, announcementTitle, announcementContent);
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setShowAnnouncementModal(false);
  };

  const handleAssignQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const quiz = quizzes.find(q => q.id === selectedAssignQuizId);
    if (!quiz) return;
    assignQuizToClass(currentClass.id, quiz.id, quiz.title, assignDeadline, maxAttempts);
    setShowAssignQuizModal(false);
  };

  const studentsList: StudentDrilldown[] = currentClass.students && currentClass.students.length > 0 ? currentClass.students : [
    {
      id: 'stu-sample-1',
      name: 'Sarah Jenkins',
      avatar: 'SJ',
      email: 'sarah.j@univ.edu',
      quizzesCompleted: 5,
      totalQuizzes: 6,
      averageScore: 94,
      lastActive: '2 hours ago',
      attendanceRate: 96,
      status: 'top_performer',
      recentScores: [
        { quizTitle: 'Transport Layer', score: 95, date: 'Sep 11' },
        { quizTitle: 'Subnetting Mechanics', score: 98, date: 'Sep 01' }
      ]
    },
    {
      id: 'stu-sample-2',
      name: 'Ahmed Tariq',
      avatar: 'AT',
      email: 'ahmed.t@univ.edu',
      quizzesCompleted: 5,
      totalQuizzes: 6,
      averageScore: 88,
      lastActive: 'Yesterday',
      attendanceRate: 92,
      status: 'active',
      recentScores: [
        { quizTitle: 'Transport Layer', score: 86, date: 'Sep 11' }
      ]
    },
    {
      id: 'stu-sample-3',
      name: 'Ali Raza',
      avatar: 'AR',
      email: 'ali.raza@univ.edu',
      quizzesCompleted: 3,
      totalQuizzes: 6,
      averageScore: 68,
      lastActive: '3 days ago',
      attendanceRate: 75,
      status: 'needs_attention',
      recentScores: [
        { quizTitle: 'Transport Layer', score: 62, date: 'Sep 10' }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Breadcrumb / Back */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => setTeacherView('classes')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary-emerald)',
            fontSize: '13.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ArrowLeft size={16} /> Back to Classes
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="secondary"
            size="sm"
            icon={<Megaphone size={14} />}
            onClick={() => setShowAnnouncementModal(true)}
          >
            Post Announcement
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={14} />}
            onClick={() => setShowAssignQuizModal(true)}
          >
            Assign Quiz with Deadline
          </Button>
        </div>
      </div>

      {/* Class Banner Card */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 className="text-h1" style={{ fontSize: '24px' }}>{currentClass.name}</h1>
              <Badge variant="emerald">{currentClass.section}</Badge>
            </div>
            <p className="text-body">
              {currentClass.department} • Subject: {currentClass.subject} • Term: {currentClass.academicYear}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#FAFAF9', padding: '10px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>Class Join Code:</span>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--color-primary-emerald)' }}>
              {currentClass.joinCode}
            </span>
          </div>
        </div>

        {/* 3 Metric Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--color-border-light)' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Student Count
            </span>
            <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
              {currentClass.studentsCount || 42}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Average Class Score
            </span>
            <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-primary-emerald)', marginTop: '2px' }}>
              {currentClass.averageScore || 84}%
            </div>
          </div>

          <div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Completion Rate
            </span>
            <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
              {currentClass.progress || 78}%
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <Tabs
        activeTab={activeTab}
        onChange={id => setActiveTab(id as any)}
        tabs={[
          { id: 'overview', label: 'Overview & Sections' },
          { id: 'students', label: 'Students & Drill-Down', count: studentsList.length },
          { id: 'quizzes', label: 'Assigned Quizzes', count: currentClass.assignedQuizzes?.length || 2 },
          { id: 'reports', label: 'Class Reports & Progress' }
        ]}
      />

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Sections */}
            <Card>
              <h3 className="text-h3" style={{ marginBottom: '14px' }}>Class Sections</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentClass.sections.map(sec => (
                  <div key={sec.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FAFAF9' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-main)' }}>{sec.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>{sec.studentCount} enrolled students</span>
                    </div>
                    <Badge variant="emerald">{sec.averageScore}% Avg</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Announcements */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 className="text-h3">Class Announcements</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAnnouncementModal(true)}>
                  + New
                </Button>
              </div>

              {currentClass.announcements.length === 0 ? (
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No announcements posted yet.</span>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentClass.announcements.map(ann => (
                    <div key={ann.id} style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{ann.title}</span>
                        {ann.pinned && <Badge variant="lime">Pinned</Badge>}
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                        {ann.content}
                      </p>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-light)' }}>
                        Posted by {ann.author} • {ann.createdAt}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: QR Code Join Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card style={{ textAlign: 'center' }}>
              <h3 className="text-h3" style={{ marginBottom: '6px' }}>Class Join Code & QR</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Display on projector or share code with students to join without prior manual enrollment.
              </p>

              <QRCodeDisplay
                value={currentClass.joinCode}
                label="CLASS PIN"
                size={160}
                allowEnlarge
                showCopy
              />
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENTS & DRILLDOWN */}
      {activeTab === 'students' && (
        <Card padding="none">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="text-h3">Student Roster & Performance Drill-Down</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Click on any student for comprehensive attempt drill-down.
              </p>
            </div>
            <Badge variant="neutral">{studentsList.length} Students</Badge>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Attendance</th>
                  <th>Quizzes Done</th>
                  <th>Average Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.map(stu => (
                  <tr key={stu.id} onClick={() => setSelectedStudent(stu)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
                          {stu.avatar}
                        </div>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-main)', display: 'block' }}>{stu.name}</span>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{stu.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{stu.attendanceRate}%</td>
                    <td>{stu.quizzesCompleted} / {stu.totalQuizzes}</td>
                    <td>
                      <strong style={{ color: stu.averageScore >= 80 ? 'var(--color-primary-emerald)' : 'var(--color-warning)' }}>
                        {stu.averageScore}%
                      </strong>
                    </td>
                    <td>
                      <Badge variant={stu.status === 'top_performer' ? 'emerald' : stu.status === 'needs_attention' ? 'warning' : 'neutral'}>
                        {stu.status === 'top_performer' ? 'Top Performer' : stu.status === 'needs_attention' ? 'Needs Attention' : 'Active'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>
                        Drill Down
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: ASSIGNED QUIZZES */}
      {activeTab === 'quizzes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="text-h3">Class-Assigned Quizzes</h3>
            <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => setShowAssignQuizModal(true)}>
              Assign New Quiz
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(currentClass.assignedQuizzes || []).map(asg => (
              <Card key={asg.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)' }}>{asg.title}</h4>
                      <Badge variant={asg.status === 'active' ? 'emerald' : 'neutral'}>
                        {asg.status.toUpperCase()}
                      </Badge>
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                      Deadline: <strong style={{ color: 'var(--color-text-main)' }}>{asg.deadline}</strong> • Max Attempts: {asg.maxAttempts}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>
                        {asg.totalSubmissions} / {asg.totalStudents} Submissions
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>
                        Avg Score: {asg.averageScore}%
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<QrCode size={13} />}
                      onClick={() => {
                        const q = quizzes.find(item => item.id === asg.quizId);
                        setSelectedQuizForQR({
                          title: asg.title,
                          joinCode: q?.joinCode || `QZ-${asg.id.substring(0, 4)}`,
                          deadline: asg.deadline
                        });
                      }}
                    >
                      Project QR & PIN
                    </Button>
                  </div>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <Progress value={(asg.totalSubmissions / (asg.totalStudents || 1)) * 100} label="Submission Rate" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REPORTS & PROGRESS */}
      {activeTab === 'reports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card>
            <h3 className="text-h3" style={{ marginBottom: '6px' }}>Grade Distribution Breakdown</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Student score distribution across active semester assignments.
            </p>
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { grade: 'A (90-100%)', count: 18 },
                  { grade: 'B (80-89%)', count: 14 },
                  { grade: 'C (70-79%)', count: 7 },
                  { grade: 'D (60-69%)', count: 2 },
                  { grade: 'F (<60%)', count: 1 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                  <XAxis dataKey="grade" tick={{ fill: '#78716C', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#78716C', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0F766E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Drill-down Modal for Individual Student */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Drill-down — ${selectedStudent.name}`}
          maxWidth="560px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#FAFAF9', borderRadius: 'var(--radius-md)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-mint-bg)', color: 'var(--color-primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px' }}>
                {selectedStudent.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{selectedStudent.name}</h4>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{selectedStudent.email}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>Average Score</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-emerald)' }}>{selectedStudent.averageScore}%</span>
              </div>
              <div style={{ padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block' }}>Attendance Rate</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedStudent.attendanceRate}%</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', marginBottom: '8px' }}>
                Recent Quiz Attempts
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedStudent.recentScores.map((sc, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: '#FAFAF9', border: '1px solid var(--color-border-light)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{sc.quizTitle}</span>
                    <Badge variant={sc.score >= 80 ? 'emerald' : 'warning'}>{sc.score}% ({sc.date})</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Post Announcement Modal */}
      <Modal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        title="Post Announcement to Class"
        maxWidth="500px"
      >
        <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input
            label="Announcement Title *"
            placeholder="e.g. Midterm Quiz Scope & Reading List"
            value={announcementTitle}
            onChange={e => setAnnouncementTitle(e.target.value)}
            required
          />
          <div className="input-group">
            <label className="input-label">Announcement Content *</label>
            <textarea
              className="textarea-field"
              placeholder="Write announcement details..."
              value={announcementContent}
              onChange={e => setAnnouncementContent(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="secondary" type="button" onClick={() => setShowAnnouncementModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Broadcast Announcement</Button>
          </div>
        </form>
      </Modal>

      {/* Assign Quiz with Deadline Modal */}
      <Modal
        isOpen={showAssignQuizModal}
        onClose={() => setShowAssignQuizModal(false)}
        title="Assign Quiz with Deadline"
        maxWidth="500px"
      >
        <form onSubmit={handleAssignQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Select
            label="Select Quiz to Assign *"
            value={selectedAssignQuizId}
            onChange={e => setSelectedAssignQuizId(e.target.value)}
            options={quizzes.map(q => ({ value: q.id, label: `${q.title} (${q.type})` }))}
          />
          <Input
            label="Submission Deadline (Date & Time) *"
            type="text"
            value={assignDeadline}
            onChange={e => setAssignDeadline(e.target.value)}
            placeholder="YYYY-MM-DD HH:MM"
            required
          />
          <Select
            label="Max Allowed Attempts"
            value={String(maxAttempts)}
            onChange={e => setMaxAttempts(Number(e.target.value))}
            options={[
              { value: '1', label: '1 Attempt (Strict Examination)' },
              { value: '2', label: '2 Attempts (Best Score Counted)' },
              { value: '3', label: '3 Attempts' }
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="secondary" type="button" onClick={() => setShowAssignQuizModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Assign to Class</Button>
          </div>
        </form>
      </Modal>

      {/* Class Quiz Projection QR Modal */}
      {selectedQuizForQR && (
        <Modal
          isOpen={!!selectedQuizForQR}
          onClose={() => setSelectedQuizForQR(null)}
          title="Class Quiz QR Code & PIN"
          maxWidth="450px"
        >
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{selectedQuizForQR.title}</h4>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '16px' }}>
              Enrolled Class: <strong>{currentClass.name}</strong> • Deadline: {selectedQuizForQR.deadline}
            </span>
            <QRCodeDisplay
              value={selectedQuizForQR.joinCode}
              label="CLASS QUIZ PIN"
              size={160}
              showCopy
            />
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginTop: '14px' }}>
              Students can scan this QR code with their mobile phone or enter the PIN on their student portal to begin. Scores will automatically sync to this class roster.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
