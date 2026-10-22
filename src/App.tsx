/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  initialTheme, 
  initialSchedules, 
  initialPosts, 
  initialSEOSettings, 
  initialCalendarEvents,
  initialCommunityStories,
  pastorStudyImg 
} from './data/initialData';
import { ChurchTheme, PostItem, WorshipSchedule, SEOSettings, CalendarEvent, EventCategory, CommunityStory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorshipScheduleSection } from './components/WorshipScheduleSection';
import { CalendarSection } from './components/CalendarSection';
import { SermonSection } from './components/SermonSection';
import { BoardSection } from './components/BoardSection';
import { GallerySection } from './components/GallerySection';
import { NewFamilySection } from './components/NewFamilySection';
import { DirectionsSection } from './components/DirectionsSection';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';
import { SEOAndSocialModal } from './components/SEOAndSocialModal';
import { PostEditorModal } from './components/PostEditorModal';
import { PostDetailModal } from './components/PostDetailModal';
import { MissionPrayerModal } from './components/MissionPrayerModal';

export default function App() {
  // Theme state with LocalStorage persistence
  const [theme, setTheme] = useState<ChurchTheme>(() => {
    try {
      const saved = localStorage.getItem('ieum_church_theme');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialTheme,
          ...parsed,
          slogan: '하나님 나라와 열방을 이어가는 이음교회',
          subSlogan: '',
          scriptureVerse: '누구든지 자기 십자가를 지고 나를 따르지 않는 자도 능히 내 제자가 되지 못하리라 (누가복음 14:27)',
          seniorPastor: '정영훈 목사',
          pastorImage: pastorStudyImg,
          address: '대전광역시 유성구 지족로 148번길 5-10',
          addressDetail: '미르빌딩 4층',
          phone: '042-822-2026'
        };
      }
      return initialTheme;
    } catch {
      return initialTheme;
    }
  });

  // Worship schedules
  const [schedules, setSchedules] = useState<WorshipSchedule[]>(() => {
    try {
      const saved = localStorage.getItem('ieum_church_schedules_v3');
      if (saved) return JSON.parse(saved);
      return initialSchedules;
    } catch {
      return initialSchedules;
    }
  });

  // Posts & Bulletins & Sermons list
  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem('ieum_church_posts_v3');
      if (saved) {
        const parsed: PostItem[] = JSON.parse(saved);
        // Ensure mission post uses the newly uploaded mission photo
        const updatedParsed = parsed.map((p) => {
          if (p.id === 'p-mission-1' || p.category === 'mission') {
            return {
              ...p,
              imageUrl: '/assets/aistudio/KakaoTalk_20260525_183850966_03_18abfd03.jpg'
            };
          }
          return p;
        });
        if (!updatedParsed.some((p) => p.category === 'mission')) {
          const missionPost = initialPosts.find((p) => p.category === 'mission');
          return missionPost ? [missionPost, ...updatedParsed] : updatedParsed;
        }
        return updatedParsed;
      }
      return initialPosts;
    } catch {
      return initialPosts;
    }
  });

  // Community Stories state (이음공동체 이야기 - 언제든 실시간 수정 가능)
  const [stories, setStories] = useState<CommunityStory[]>(() => {
    try {
      const saved = localStorage.getItem('ieum_church_community_stories');
      if (saved) return JSON.parse(saved);
      return initialCommunityStories;
    } catch {
      return initialCommunityStories;
    }
  });

  // SEO settings
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(() => {
    try {
      const saved = localStorage.getItem('ieum_church_seo');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          socialLinks: {
            ...parsed.socialLinks,
            youtube: 'https://www.youtube.com/channel/UCQNgJ4A8zgLqHRNYLIkGRqg'
          }
        };
      }
      return initialSEOSettings;
    } catch {
      return initialSEOSettings;
    }
  });

  // Calendar Events state
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem('ieum_church_events');
      return saved ? JSON.parse(saved) : initialCalendarEvents;
    } catch {
      return initialCalendarEvents;
    }
  });

  // Modals state
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isSEOOpen, setIsSEOOpen] = useState(false);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isNewFamilyModalOpen, setIsNewFamilyModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [selectedMissionFieldId, setSelectedMissionFieldId] = useState<string>('cambodia');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ieum_church_theme', JSON.stringify(theme));
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('ieum_church_schedules_v3', JSON.stringify(schedules));
    } catch (e) {
      console.error(e);
    }
  }, [schedules]);

  useEffect(() => {
    try {
      localStorage.setItem('ieum_church_posts_v3', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('ieum_church_seo', JSON.stringify(seoSettings));
    } catch (e) {
      console.error(e);
    }
  }, [seoSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('ieum_church_events', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('ieum_church_community_stories', JSON.stringify(stories));
    } catch (e) {
      console.error(e);
    }
  }, [stories]);

  const handleOpenMissionModal = (fieldId?: string) => {
    if (fieldId) setSelectedMissionFieldId(fieldId);
    setIsMissionModalOpen(true);
  };

  const handleSaveWebsite = () => {
    try {
      localStorage.setItem('ieum_church_theme', JSON.stringify(theme));
      localStorage.setItem('ieum_church_schedules_v3', JSON.stringify(schedules));
      localStorage.setItem('ieum_church_posts_v3', JSON.stringify(posts));
      localStorage.setItem('ieum_church_seo', JSON.stringify(seoSettings));
      localStorage.setItem('ieum_church_events', JSON.stringify(events));
      localStorage.setItem('ieum_church_community_stories', JSON.stringify(stories));
      setSaveToast('이음교회 홈페이지 모든 내용(선교지소식, 지도, 이음공동체 이야기 포함)이 안전하게 저장되었습니다!');
      setTimeout(() => setSaveToast(null), 4000);
    } catch {
      setSaveToast('저장 중 문제가 발생했습니다.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Handle saving (creating or updating) a post + Calendar auto-sync
  const handleSavePost = (
    postData: Omit<PostItem, 'id' | 'views' | 'likes' | 'comments'>,
    editingId?: string,
    syncToCalendar?: boolean,
    calendarData?: {
      date: string;
      time: string;
      place: string;
      category: EventCategory;
      target: string;
    }
  ) => {
    const postId = editingId || 'post_' + Date.now();

    if (editingId) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...postData
              }
            : p
        )
      );
      if (selectedPost && selectedPost.id === editingId) {
        setSelectedPost((prev) => (prev ? { ...prev, ...postData } : null));
      }
    } else {
      const newPost: PostItem = {
        id: postId,
        ...postData,
        views: 1,
        likes: 0,
        comments: []
      };
      setPosts((prev) => [newPost, ...prev]);
    }

    // Auto sync to Calendar if requested
    if (syncToCalendar && calendarData) {
      const linkedEventId = 'evt-post-' + postId;
      const newEvent: CalendarEvent = {
        id: linkedEventId,
        title: postData.title,
        description: postData.content,
        date: calendarData.date,
        time: calendarData.time,
        place: calendarData.place,
        category: calendarData.category,
        target: calendarData.target,
        postId: postId,
        isHighlight: true
      };

      setEvents((prev) => {
        const filtered = prev.filter((e) => e.id !== linkedEventId && e.postId !== postId);
        return [newEvent, ...filtered];
      });
    }

    setEditingPost(null);
  };

  const handleUpdateSermon = (updatedSermon: PostItem) => {
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === updatedSermon.id);
      if (exists) {
        return prev.map((p) => (p.id === updatedSermon.id ? updatedSermon : p));
      } else {
        return [updatedSermon, ...prev];
      }
    });
    if (selectedPost && selectedPost.id === updatedSermon.id) {
      setSelectedPost(updatedSermon);
    }
  };

  const handleAddCalendarEvent = (newEventData: Omit<CalendarEvent, 'id' | 'rsvps'>) => {
    const newEvent: CalendarEvent = {
      id: 'evt_' + Date.now(),
      ...newEventData,
      rsvps: []
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleRSVP = (eventId: string, name: string, phone?: string) => {
    const newRsvp = {
      id: 'rsvp_' + Date.now(),
      name,
      phone,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              rsvps: [...(ev.rsvps || []), newRsvp]
            }
          : ev
      )
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    // Also remove any calendar event linked to this post
    setEvents((prev) => prev.filter((ev) => ev.postId !== postId));
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    if (selectedPost?.id === postId) {
      setSelectedPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleAddComment = (postId: string, author: string, content: string) => {
    const newComment = {
      id: 'cmt_' + Date.now(),
      author,
      content,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.')
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p
      )
    );

    if (selectedPost?.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [...(prev.comments || []), newComment]
            }
          : null
      );
    }
  };

  const handleOpenEdit = (post: PostItem) => {
    setEditingPost(post);
    setIsPostEditorOpen(true);
  };

  const handleResetTheme = () => {
    setTheme(initialTheme);
    setSchedules(initialSchedules);
    setPosts(initialPosts);
    setSEOSettings(initialSEOSettings);
    setEvents(initialCalendarEvents);
    localStorage.removeItem('ieum_church_theme');
    localStorage.removeItem('ieum_church_schedules');
    localStorage.removeItem('ieum_church_posts');
    localStorage.removeItem('ieum_church_seo');
    localStorage.removeItem('ieum_church_events');
  };

  // Determine background tone color code
  const getBgColor = () => {
    switch (theme.bgTone) {
      case 'pure': return '#FFFFFF';
      case 'cool': return '#F8FAFC';
      case 'cream': return '#FDFCF7';
      case 'warm':
      default:
        return '#FAFBFD';
    }
  };

  // Determine font family utility class
  const getFontClass = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif-kr';
      default: return 'font-sans-kr';
    }
  };

  // Extract sermons for SermonSection
  const sermons = posts.filter((p) => p.category === 'sermon');
  const displaySermons = sermons.length > 0 ? sermons : posts.slice(0, 3);

  return (
    <div
      className={`min-h-screen text-slate-800 transition-colors ${getFontClass()}`}
      style={{
        backgroundColor: getBgColor(),
        // Pass primary color as CSS variable
        ['--primary' as any]: theme.primaryColor
      }}
    >
      {/* 3-Zone Top Bar */}
      <Navbar
        theme={theme}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenSEO={() => setIsSEOOpen(true)}
        onOpenNewPost={() => {
          setEditingPost(null);
          setIsPostEditorOpen(true);
        }}
        onOpenNewFamilyModal={() => setIsNewFamilyModalOpen(true)}
        onSaveWebsite={handleSaveWebsite}
        onOpenMissionModal={handleOpenMissionModal}
      />

      {/* Floating Save Toast Banner */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-white">이음교회 홈페이지 저장 완료</p>
            <p className="text-xs text-slate-300 mt-0.5 leading-snug">{saveToast}</p>
          </div>
        </div>
      )}

      {/* Main Content Sections according to visibleSections toggle */}
      <main>
        {theme.visibleSections.hero && (
          <HeroSection
            theme={theme}
            onOpenNewFamily={() => setIsNewFamilyModalOpen(true)}
            onWorshipClick={() => {
              const el = document.getElementById('worship');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onCalendarClick={() => {
              const el = document.getElementById('calendar');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onSermonClick={() => {
              const el = document.getElementById('sermon');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {theme.visibleSections.about && (
          <AboutSection theme={theme} />
        )}

        {theme.visibleSections.worship && (
          <WorshipScheduleSection
            theme={theme}
            schedules={schedules}
            onOpenSEO={() => setIsSEOOpen(true)}
            youtubeUrl={seoSettings.socialLinks.youtube || 'https://www.youtube.com/channel/UCQNgJ4A8zgLqHRNYLIkGRqg'}
          />
        )}

        {theme.visibleSections.calendar && (
          <CalendarSection
            theme={theme}
            events={events}
            onAddEvent={handleAddCalendarEvent}
            onRSVP={handleRSVP}
            onNavigateToPost={(postId) => {
              const found = posts.find((p) => p.id === postId);
              if (found) {
                setSelectedPost(found);
              }
              const boardEl = document.getElementById('board');
              if (boardEl) boardEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {theme.visibleSections.sermon && (
          <SermonSection
            theme={theme}
            sermons={displaySermons}
            onOpenSermonPost={(post) => setSelectedPost(post)}
            onOpenSEO={() => setIsSEOOpen(true)}
            onUpdateSermon={handleUpdateSermon}
            youtubeUrl={seoSettings.socialLinks.youtube}
          />
        )}

        {theme.visibleSections.posts && (
          <BoardSection
            theme={theme}
            posts={posts}
            onOpenNewPost={() => {
              setEditingPost(null);
              setIsPostEditorOpen(true);
            }}
            onSelectPost={(post) => setSelectedPost(post)}
            onEditPost={handleOpenEdit}
            onDeletePost={handleDeletePost}
            onOpenMissionModal={handleOpenMissionModal}
          />
        )}

        {theme.visibleSections.gallery && (
          <GallerySection 
            theme={theme} 
            stories={stories} 
            onUpdateStories={setStories} 
          />
        )}

        {theme.visibleSections.newFamily && (
          <NewFamilySection
            theme={theme}
            isModalOpen={isNewFamilyModalOpen}
            onCloseModal={() => setIsNewFamilyModalOpen(false)}
            onOpenModal={() => setIsNewFamilyModalOpen(true)}
          />
        )}

        {theme.visibleSections.directions && (
          <DirectionsSection theme={theme} />
        )}
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        seoSettings={seoSettings}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenSEO={() => setIsSEOOpen(true)}
        onOpenNewPost={() => {
          setEditingPost(null);
          setIsPostEditorOpen(true);
        }}
      />

      {/* Modals */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        theme={theme}
        onUpdateTheme={setTheme}
        onResetTheme={handleResetTheme}
        schedules={schedules}
        onUpdateSchedules={setSchedules}
      />

      <SEOAndSocialModal
        isOpen={isSEOOpen}
        onClose={() => setIsSEOOpen(false)}
        seoSettings={seoSettings}
        onUpdateSEO={setSEOSettings}
        theme={theme}
      />

      <PostEditorModal
        isOpen={isPostEditorOpen}
        onClose={() => {
          setIsPostEditorOpen(false);
          setEditingPost(null);
        }}
        onSavePost={handleSavePost}
        editingPost={editingPost}
        theme={theme}
      />

      <PostDetailModal
        isOpen={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onLike={handleLikePost}
        onAddComment={handleAddComment}
        onEdit={(post) => {
          setSelectedPost(null);
          handleOpenEdit(post);
        }}
        onDelete={handleDeletePost}
        theme={theme}
        onOpenMissionModal={handleOpenMissionModal}
      />

      <MissionPrayerModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        theme={theme}
        initialFieldId={selectedMissionFieldId}
      />
    </div>
  );
}
