import React, { useState } from 'react';
import { ChurchTheme } from '../types';
import { Menu, X, Sliders, Share2, PenLine, Sparkles, Save, Globe } from 'lucide-react';
import { MissionUrgentBanner } from './MissionUrgentBanner';

interface NavbarProps {
  theme: ChurchTheme;
  onOpenCustomizer: () => void;
  onOpenSEO: () => void;
  onOpenNewPost: () => void;
  onOpenNewFamilyModal: () => void;
  onSaveWebsite?: () => void;
  onOpenMissionModal: (fieldId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onOpenCustomizer,
  onOpenSEO,
  onOpenNewPost,
  onOpenNewFamilyModal,
  onSaveWebsite,
  onOpenMissionModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '교회소개', href: '#about' },
    { label: '예배안내', href: '#worship' },
    { label: '교회일정', href: '#calendar' },
    { label: '설교말씀', href: '#sermon' },
    { label: '소식·주보', href: '#board' },
    { label: '교제·갤러리', href: '#gallery' },
    { label: '오시는 길', href: '#directions' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      {/* Top Utility Bar with Urgent Mission Prayer Sliding Banner at Top-Right */}
      <div className="bg-slate-950 text-white text-xs border-b border-slate-800/90 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-3 text-slate-300 text-xs">
            <span className="font-semibold text-sky-400">{theme.churchName}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">{theme.address} {theme.addressDetail}</span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-300">{theme.phone}</span>
          </div>

          {/* 우측 상단 '선교지 긴급기도' 슬라이딩 배너 */}
          <div className="w-full md:w-auto flex justify-end ml-auto">
            <MissionUrgentBanner
              theme={theme}
              onOpenModal={onOpenMissionModal}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap hover:opacity-85 transition-opacity flex items-center gap-2.5"
            >
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
                aria-hidden="true"
              />
              <span>{theme.churchName}</span>
              <span className="text-xs font-medium tracking-widest text-slate-600 hidden sm:inline">
                {theme.churchEngName}
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-slate-950 transition-colors py-1 relative group"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
                  style={{ backgroundColor: theme.primaryColor }}
                />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + administrative / sharing tool buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Management Buttons with clear tooltips */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-100/90 rounded-lg border border-slate-200/80">
              <button
                onClick={onSaveWebsite}
                type="button"
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
                title="이음교회 홈페이지 현재 상태 저장하기"
              >
                <Save className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">저장</span>
              </button>

              <button
                onClick={onOpenCustomizer}
                type="button"
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-white rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
                title="디자인, 색상, 폰트 및 문구 커스터마이징"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">디자인 설정</span>
              </button>

              <button
                onClick={onOpenNewPost}
                type="button"
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-white rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
                title="새로운 소식, 주보, 설교글 작성하기"
              >
                <PenLine className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">글쓰기</span>
              </button>

              <button
                onClick={onOpenSEO}
                type="button"
                className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-white rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
                title="SEO 검색 엔진 및 SNS 공유 카드 미리보기"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">SEO·공유</span>
              </button>
            </div>

            {/* Quick Mission Urgent Prayer Button */}
            <button
              onClick={() => onOpenMissionModal()}
              type="button"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/90 rounded-lg border border-rose-200 transition-colors shadow-2xs"
              title="선교지 긴급기도 및 사역지 소식 팝업 열기"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span>선교지 소식</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenNewFamilyModal}
              type="button"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 hover:opacity-95 active:scale-98"
              style={{ backgroundColor: theme.primaryColor }}
            >
              새가족 등록
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col gap-1 pb-3 mb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex flex-col gap-2 pt-1">
            {/* Mobile Urgent Mission Notice */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMissionModal();
              }}
              className="w-full py-2.5 px-3 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>선교지 긴급기도 & 사역소식 팝업</span>
              </div>
              <span className="text-[11px] font-semibold text-rose-600">소식보기 →</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewFamilyModal();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white rounded-lg shadow-sm"
              style={{ backgroundColor: theme.primaryColor }}
            >
              새가족 온라인 등록 신청
            </button>

            <div className="grid grid-cols-4 gap-1.5 mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSaveWebsite?.();
                }}
                className="py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md flex items-center justify-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                저장
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center justify-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                디자인
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNewPost();
                }}
                className="py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center justify-center gap-1"
              >
                <PenLine className="w-3.5 h-3.5" />
                글쓰기
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSEO();
                }}
                className="py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center justify-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                SEO·공유
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
