import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SlideDeck, SlideItem } from '../../types';
import {
  Presentation,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  Maximize2,
  Edit2,
  Share2
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';

export const TeacherCreateSlides: React.FC = () => {
  const { slideDecks, saveSlideDeck, lecturePlans, showToast } = useApp();

  const currentDeck = slideDecks[0];

  const [selectedTemplate, setSelectedTemplate] = useState<'emerald_minimal' | 'deep_teal_pro' | 'warm_academic' | 'clean_white'>(
    currentDeck?.template || 'emerald_minimal'
  );

  const [slides, setSlides] = useState<SlideItem[]>(currentDeck?.slides || [
    {
      id: 'sl-1',
      title: 'TCP Congestion Control & Algorithms',
      layout: 'title',
      content: ['Advanced Computer Networks', 'Prof. Warda Mehmood', 'Department of CS'],
      notes: 'Introduce students to loss-based vs model-based congestion control.'
    },
    {
      id: 'sl-2',
      title: 'Bufferbloat in High-Speed Networks',
      layout: 'bullets',
      content: [
        'Oversized network router buffers create latency inflation.',
        'Loss is not an immediate signal of congestion in deep buffers.',
        'Queue delay climbs from 15ms to over 750ms.'
      ],
      notes: 'Ask the class why upgrading router memory does not fix packet drops.'
    },
    {
      id: 'sl-3',
      title: 'Kleinrock Optimal Operating Point',
      layout: 'split',
      content: [
        'Maximum Throughput (Bottleneck Bandwidth)',
        'Minimum Latency (RTprop)',
        'Zero queue accumulation in intermediate buffers'
      ],
      notes: 'Highlight how BBR targets this optimal inflection point.'
    }
  ]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [deckTitle, setDeckTitle] = useState(currentDeck?.title || 'TCP Congestion Control Lecture Deck');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const templates = [
    {
      id: 'emerald_minimal',
      name: 'Emerald Minimal',
      description: 'Clean white background with emerald accents and modern typography',
      bg: '#FFFFFF',
      accent: '#0F766E',
      textColor: '#1C1917'
    },
    {
      id: 'deep_teal_pro',
      name: 'Deep Teal Pro',
      description: 'Authoritative deep teal styling designed for technical lectures',
      bg: '#134E4A',
      accent: '#84CC16',
      textColor: '#FFFFFF'
    },
    {
      id: 'warm_academic',
      name: 'Warm Academic',
      description: 'Soft warm background with structured pedagogical layout',
      bg: '#FAFAF9',
      accent: '#0F766E',
      textColor: '#1C1917'
    },
    {
      id: 'clean_white',
      name: 'Clean White',
      description: 'High-contrast minimalist layout with sharp focus on content',
      bg: '#FFFFFF',
      accent: '#78716C',
      textColor: '#1C1917'
    }
  ];

  const activeTemplateObj = templates.find(t => t.id === selectedTemplate) || templates[0];
  const activeSlide = slides[activeSlideIndex] || slides[0];

  const handleUpdateSlideTitle = (newTitle: string) => {
    setSlides(prev => prev.map((s, idx) => idx === activeSlideIndex ? { ...s, title: newTitle } : s));
  };

  const handleUpdateSlideContent = (bulletIdx: number, newText: string) => {
    setSlides(prev => prev.map((s, idx) => {
      if (idx === activeSlideIndex) {
        const updated = [...s.content];
        updated[bulletIdx] = newText;
        return { ...s, content: updated };
      }
      return s;
    }));
  };

  const handleAddBullet = () => {
    setSlides(prev => prev.map((s, idx) => {
      if (idx === activeSlideIndex) {
        return { ...s, content: [...s.content, 'New bullet point item'] };
      }
      return s;
    }));
  };

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: `sl-${Date.now()}`,
      title: 'New Lecture Slide',
      layout: 'bullets',
      content: ['Key discussion concept 1', 'Key discussion concept 2'],
      notes: 'Presenter speaker notes here.'
    };
    setSlides(prev => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
    showToast('New slide added to deck.');
  };

  const handleSaveDeck = () => {
    const updated: SlideDeck = {
      id: currentDeck?.id || `deck-${Date.now()}`,
      title: deckTitle,
      template: selectedTemplate,
      slides,
      createdAt: 'Today'
    };
    saveSlideDeck(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="text-h1">Create Slides</h1>
          <p className="text-body" style={{ marginTop: '4px' }}>
            Auto-generate and customize professional academic slide decks with auto-filled lecture data.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" icon={<Maximize2 size={15} />} onClick={() => setIsFullscreen(true)}>
            Present Fullscreen
          </Button>
          <Button variant="primary" icon={<Download size={15} />} onClick={() => {
            handleSaveDeck();
            showToast('Slide deck exported to printable format!');
          }}>
            Export Slide Deck
          </Button>
        </div>
      </div>

      {/* 1. SELECT TEMPLATE (Premium Cards with Emerald Accent) */}
      <div>
        <h3 className="text-h3" style={{ marginBottom: '12px' }}>1. Select Template</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {templates.map(tmpl => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id as any)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                  padding: '16px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 0 3px rgba(15, 118, 110, 0.15)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Visual Slide Mockup */}
                <div
                  style={{
                    height: '80px',
                    borderRadius: '8px',
                    backgroundColor: tmpl.bg,
                    border: '1px solid var(--color-border)',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{ width: '40%', height: '6px', backgroundColor: tmpl.accent, borderRadius: '4px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ width: '80%', height: '4px', backgroundColor: tmpl.textColor, opacity: 0.5, borderRadius: '2px' }} />
                    <div style={{ width: '60%', height: '4px', backgroundColor: tmpl.textColor, opacity: 0.3, borderRadius: '2px' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-main)' }}>{tmpl.name}</span>
                  {isSelected && <Badge variant="emerald"><Check size={12} /></Badge>}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  {tmpl.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2 & 3. PREVIEW & EDIT (Interactive Slide Studio) */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
        {/* Slide Filmstrip / Navigation */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)' }}>
              Slides ({slides.length})
            </span>
            <Button size="sm" variant="ghost" icon={<Plus size={14} />} onClick={handleAddSlide}>
              Add
            </Button>
          </div>

          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setActiveSlideIndex(idx)}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: activeSlideIndex === idx ? '2px solid var(--color-primary-emerald)' : '1px solid var(--color-border)',
                backgroundColor: activeSlideIndex === idx ? 'var(--color-mint-bg)' : '#FAFAF9',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block' }}>
                Slide {idx + 1}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.title}
              </span>
            </div>
          ))}
        </Card>

        {/* Live Slide Canvas & Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main Slide Canvas */}
          <div
            style={{
              aspectRatio: '16/9',
              width: '100%',
              backgroundColor: activeTemplateObj.bg,
              color: activeTemplateObj.textColor,
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              padding: '40px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'inline-block', width: '32px', height: '4px', backgroundColor: activeTemplateObj.accent, borderRadius: '2px', marginBottom: '14px' }} />
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: activeTemplateObj.textColor, marginBottom: '24px' }}>
                {activeSlide.title}
              </h2>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '24px' }}>
                {activeSlide.content.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ fontSize: '17px', lineHeight: 1.4, opacity: 0.9 }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', opacity: 0.6, borderTop: `1px solid ${activeTemplateObj.textColor}22`, paddingTop: '12px' }}>
              <span>EducateX Hub • {deckTitle}</span>
              <span>Slide {activeSlideIndex + 1} of {slides.length}</span>
            </div>
          </div>

          {/* Quick Slide Editor Controls */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                Slide Content Editor
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
                  icon={<ChevronLeft size={14} />}
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={activeSlideIndex === slides.length - 1}
                  onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
                  icon={<ChevronRight size={14} />}
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input
                label="Slide Title"
                value={activeSlide.title}
                onChange={e => handleUpdateSlideTitle(e.target.value)}
              />

              <div>
                <label className="input-label" style={{ marginBottom: '6px', display: 'block' }}>Key Points / Content</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeSlide.content.map((c, i) => (
                    <input
                      key={i}
                      className="input-field"
                      value={c}
                      onChange={e => handleUpdateSlideContent(i, e.target.value)}
                    />
                  ))}
                  <Button size="sm" variant="ghost" onClick={handleAddBullet} style={{ alignSelf: 'flex-start' }}>
                    + Add bullet line
                  </Button>
                </div>
              </div>

              {activeSlide.notes && (
                <div style={{ backgroundColor: '#FAFAF9', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                    Speaker Notes
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{activeSlide.notes}</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Fullscreen Presentation Modal */}
      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: activeTemplateObj.bg,
            color: activeTemplateObj.textColor,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '5px', backgroundColor: activeTemplateObj.accent, borderRadius: '3px' }} />
            <button
              onClick={() => setIsFullscreen(false)}
              style={{
                background: 'rgba(0,0,0,0.1)',
                border: 'none',
                color: activeTemplateObj.textColor,
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Exit Presentation (ESC)
            </button>
          </div>

          <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <h1 style={{ fontSize: '46px', fontWeight: 800, lineHeight: 1.2, color: activeTemplateObj.textColor, marginBottom: '36px' }}>
              {activeSlide.title}
            </h1>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingLeft: '32px' }}>
              {activeSlide.content.map((b, i) => (
                <li key={i} style={{ fontSize: '26px', lineHeight: 1.4, opacity: 0.95 }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', opacity: 0.7 }}>
            <span>{deckTitle}</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
                style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px' }}
              >
                Previous
              </button>
              <span>{activeSlideIndex + 1} / {slides.length}</span>
              <button
                disabled={activeSlideIndex === slides.length - 1}
                onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
                style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
