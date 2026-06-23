"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CardModal from '@/components/CardModal';

import portfolioData from '@/data/portfolio.json';
import { THEME_CONFIGS } from '@/templates/TraditionalTemplate';

const showcaseCards = portfolioData;

const MiniCard = ({ theme, image }: { theme: string, image: string }) => {
  if (theme === 'traditional-navy') {
      return (
          <div className="w-full h-full bg-[#001f3f] flex flex-col items-center justify-center p-3 border-x-4 border-[#d4af37] relative">
              <div className="absolute inset-1 border border-[#d4af37]"></div>
              <div className="absolute inset-2 border border-[#d4af37]/40"></div>
              
              <div className="relative z-10 w-[70%] aspect-square rotate-45 overflow-hidden border border-[#d4af37] mb-6">
                  <img src={image} className="w-[150%] h-[150%] max-w-none object-cover -rotate-45 -translate-x-[15%] -translate-y-[15%]" />
              </div>
              
              <div className="relative z-10 text-center text-[#d4af37] flex flex-col items-center mt-2">
                  <p className="text-[12px] font-script">Khánh</p>
                  <span className="text-[8px] my-1">{"&"}</span>
                  <p className="text-[12px] font-script">Anh</p>
              </div>
          </div>
      )
  }

  if (theme.startsWith('traditional')) {
      const config = THEME_CONFIGS[theme] || THEME_CONFIGS['traditional-red'];
      // Extract hex color from 'bg-[#800000]' -> '#800000'
      const bgColorMatch = config.bgMain.match(/bg-\[([^\]]+)\]/);
      const bgColor = bgColorMatch ? bgColorMatch[1] : '#800000';
      const accentColorMatch = config.textAccent.match(/text-\[([^\]]+)\]/);
      const accentColor = accentColorMatch ? accentColorMatch[1] : '#d4af37';
      const isMinimal = theme === 'traditional-minimal';

      return (
          <div className="w-full h-full flex flex-col items-center pt-6 px-3" style={{ backgroundColor: bgColor }}>
              <p className="text-[7px] tracking-[0.2em] mb-4 text-center uppercase font-sans" style={{ color: accentColor }}>Welcome to our wedding</p>
              <div className="flex justify-between items-center w-full px-2 mb-4">
                  <div className="text-center" style={{ color: accentColor }}>
                      <p className="text-[6px] mb-1">ÚT NAM</p>
                      <p className="text-[10px] font-serif uppercase" style={{ color: isMinimal ? '#111111' : '#ffffff' }}>KHÁNH</p>
                  </div>
                  <div className="text-3xl font-serif leading-none" style={{ color: isMinimal ? '#111111' : '#ffffff' }}>{config.icon}</div>
                  <div className="text-center" style={{ color: accentColor }}>
                      <p className="text-[6px] mb-1">ÚT NỮ</p>
                      <p className="text-[10px] font-serif uppercase" style={{ color: isMinimal ? '#111111' : '#ffffff' }}>ANH</p>
                  </div>
              </div>
              <div className="w-[85%] flex-1 bg-white rounded-t-full mt-auto relative overflow-hidden border-[3px]" style={{ borderColor: isMinimal ? '#111111' : '#ffffff' }}>
                  <img src={image} className="w-full h-full object-cover" />
              </div>
          </div>
      )
  }
  if (theme === 'rustic') {
      return (
          <div className="w-full h-full bg-[#2c4c3b] flex flex-col items-center justify-center p-4 border-8 border-[#1a2f23]">
              <div className="absolute inset-3 border border-[#d4af37]/30 rounded-xl pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-[#f3e5ab] flex items-center justify-center mb-4">
                  <span className="font-serif text-lg text-[#2c4c3b]">囍</span>
              </div>
              <p className="text-xl font-serif text-[#e8dac1] tracking-wide mb-1">KHÁNH</p>
              <span className="text-sm font-script text-[#d4af37] my-1">&</span>
              <p className="text-xl font-serif text-[#e8dac1] tracking-wide mt-1 mb-4">ANH</p>
              <div className="w-12 h-[1px] bg-[#d4af37]/50 mb-3"></div>
              <p className="text-[8px] font-sans tracking-widest text-[#e8dac1]">01 . 06 . 2026</p>
          </div>
      )
  }
  if (theme === 'luxury') {
      return (
          <div className="w-full h-full relative flex flex-col items-center justify-end pb-10">
              <img src={image} className="absolute inset-0 w-full h-full object-cover brightness-[0.7]" />
              <div className="relative z-10 text-center text-white">
                  <p className="text-[8px] font-sans tracking-widest mb-3 uppercase opacity-80">Save the date</p>
                  <p className="text-2xl font-serif mb-2 drop-shadow-md">Khánh & Anh</p>
                  <div className="w-8 h-[1px] bg-white/50 mx-auto mb-2"></div>
                  <p className="text-[8px] font-sans tracking-[0.2em] opacity-90">01 . 06 . 2026</p>
              </div>
          </div>
      )
  }
  // Fallback
  return <img src={image} className="w-full h-full object-cover" />;
}

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<{ id: string, name: string, image: string } | null>(null);

  const handleContact = () => {
    // Thay đổi số Zalo hoặc link Facebook của bạn ở đây
    window.open('https://zalo.me/0123456789', '_blank');
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="font-script text-2xl sm:text-3xl tracking-wider text-white mt-1">L&P Studio</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={handleContact}
              className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold transition-all text-xs sm:text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span className="hidden sm:inline">Liên Hệ Đặt Thiệp</span>
              <span className="sm:hidden">Liên Hệ</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-[#d4af37]/15 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold tracking-widest uppercase"
        >
          Dịch vụ thiết kế chuyên nghiệp
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-white mb-6 tracking-tight leading-tight z-10 max-w-4xl"
        >
          Thiệp Cưới Mang Dấu Ấn <br className="hidden md:block" /> Của Riêng Bạn
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-400 text-base md:text-xl font-light mb-12 max-w-2xl z-10 leading-relaxed"
        >
          Khám phá bộ sưu tập 30+ mẫu thiệp cưới độc quyền. Trải nghiệm tương tác thực tế, chọn mẫu ưng ý và liên hệ ngay để chúng tôi hiện thực hóa ý tưởng của bạn.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 z-10"
        >
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Xem Mẫu Thiệp
          </button>
          <button 
            onClick={handleContact}
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
          >
            Nhận Báo Giá
          </button>
        </motion.div>
      </section>

      {/* SHOWCASE GRID */}
      <section id="portfolio" className="px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto pb-32 pt-10">
        <div className="flex justify-between items-end mb-8 md:mb-12 px-1 md:px-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">Bộ Sưu Tập Mới Nhất</h2>
            <p className="text-gray-500 text-xs sm:text-base">Bấm vào từng mẫu để trải nghiệm giao diện tương tác thực tế.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">Tất cả (30)</span>
            <span className="px-4 py-2 hover:bg-white/5 rounded-full text-sm text-gray-400 cursor-pointer transition-colors">Sang trọng</span>
            <span className="px-4 py-2 hover:bg-white/5 rounded-full text-sm text-gray-400 cursor-pointer transition-colors">Truyền thống</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {showcaseCards.map((card, idx) => (
            <motion.div
              key={`${card.id}-${idx}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-xl sm:shadow-2xl mb-3 sm:mb-4">
                <MiniCard theme={card.theme} image={card.image} />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-[#d4af37] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-[10px] sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Xem demo
                  </span>
                </div>

                {/* Tags floating on image (Hidden on very small mobile) */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 hidden xs:flex flex-wrap gap-1 sm:gap-2">
                  {card.tags.slice(0, 1).map(tag => (
                    <span key={tag} className="bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-1">
                <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1 group-hover:text-[#d4af37] transition-colors line-clamp-1">{card.name}</h3>
                <p className="text-gray-500 text-[10px] sm:text-sm">Giao diện tương tác</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Đã hiển thị tất cả 30 mẫu. Bạn chưa tìm được mẫu ưng ý?</p>
          <button 
            onClick={handleContact}
            className="px-8 py-3 bg-[#111] border border-white/10 hover:border-[#d4af37]/50 text-white font-medium rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            Liên hệ thiết kế theo yêu cầu
          </button>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#111] to-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center bg-no-repeat bg-fixed"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <svg className="w-12 h-12 text-[#d4af37] mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sẵn sàng để bắt đầu?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Hãy gửi cho chúng tôi mẫu thiệp bạn thích nhất. Đội ngũ thiết kế sẽ liên hệ lại ngay để tư vấn và tùy chỉnh theo câu chuyện tình yêu của riêng bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleContact}
              className="px-8 py-4 bg-[#d4af37] text-white font-bold rounded-full hover:bg-[#b5952f] transition-colors shadow-[0_0_20px_rgba(255,0,127,0.3)] text-lg flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              Chat qua Zalo ngay
            </button>
            <button 
              onClick={() => window.open('tel:0123456789')}
              className="px-8 py-4 bg-[#222] border border-white/10 text-white font-bold rounded-full hover:bg-[#333] transition-colors text-lg flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Gọi Hotline: 0123 456 789
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-0">
            <div className="flex items-center gap-2 opacity-50">
              <svg className="w-6 h-6 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span className="font-script text-2xl tracking-wider text-white mt-1">L&P Studio</span>
            </div>
            <span className="hidden md:block text-gray-700">|</span>
            <span className="text-sm text-gray-500">© 2026 L&P Studio. Thiết kế thiệp cưới chuyên nghiệp.</span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Zalo</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* Card Modal */}
      <CardModal 
        isOpen={selectedCard !== null} 
        onClose={() => setSelectedCard(null)} 
        slug={selectedCard?.id || ''}
        cardName={selectedCard?.name || ''}
        cardImage={selectedCard?.image || ''}
      />
    </main>
  );
}