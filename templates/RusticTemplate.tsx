"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Component tạo các hạt "囍" bay lơ lửng
const FloatingParticles = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        setParticles(Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 15,
            scale: 0.5 + Math.random() * 1,
            opacity: 0.03 + Math.random() * 0.05
        })));
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: "100vh", x: 0, opacity: p.opacity, scale: p.scale }}
                    animate={{ 
                        y: "-20vh", 
                        x: [0, Math.random() * 50 - 25, 0], // Lắc nhẹ sang 2 bên
                        opacity: [p.opacity, p.opacity * 2, p.opacity]
                    }}
                    transition={{
                        y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
                        x: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut", delay: p.delay },
                        opacity: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut", delay: p.delay }
                    }}
                    className="absolute font-serif text-[#e8dac1] text-4xl"
                    style={{ left: p.left }}
                >
                    囍
                </motion.div>
            ))}
        </div>
    );
};

export default function RusticTemplate({ cardData, slug, isPreview = false }: { cardData: any, slug: string, isPreview?: boolean }) {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [copied, setCopied] = useState<number | null>(null);
    const [rsvp, setRsvp] = useState<"attending" | "not_attending" | null>(null);

    // Bỏ qua chế độ bìa thư nếu đang ở dạng xem trước (preview)
    const [isOpened, setIsOpened] = useState(isPreview);

    const audioRef = useRef<HTMLAudioElement>(null);
    const mainContentRef = useRef<HTMLElement>(null);
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    const startAutoScroll = () => {
        if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = setInterval(() => {
            window.scrollBy({ top: 1, left: 0 });
            // Dừng hoặc lặp lại nếu đã cuộn tới cuối trang
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                if (isPreview) {
                    window.scrollTo({ top: 0, left: 0 }); // Lặp lại từ đầu cho màn hình preview
                } else {
                    stopAutoScroll();
                }
            }
        }, 30); // Tốc độ cuộn: 30ms cho mỗi pixel
    };

    const stopAutoScroll = () => {
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
            autoScrollTimer.current = null;
        }
    };

    // Hàm xử lý khi người dùng tương tác
    const handleUserInteraction = () => {
        if (!isOpened) return;
        
        // Ngay lập tức dừng cuộn tự động
        stopAutoScroll();

        // Xóa bộ đếm giờ cũ nếu có
        if (idleTimer.current) clearTimeout(idleTimer.current);
        
        // Hẹn giờ 10 giây sau không có tương tác sẽ tiếp tục cuộn
        idleTimer.current = setTimeout(() => {
            // Chỉ cuộn tiếp nếu chưa đến cuối trang
            if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 10) {
                startAutoScroll();
            }
        }, 10000);
    };

    const handleOpen = () => {
        setIsOpened(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
        
        // Tự động cuộn chầm chậm sau khi mở thiệp 1.5s
        setTimeout(() => {
            startAutoScroll();
        }, 1500);
    };

    // Tự động cuộn nếu đang ở chế độ preview (bên trong iframe)
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.search.includes('preview=true')) {
            setTimeout(() => {
                startAutoScroll();
            }, 1000);
        }
    }, []);

    // Lắng nghe tương tác người dùng và dọn dẹp
    useEffect(() => {
        if (isOpened) {
            window.addEventListener('wheel', handleUserInteraction, { passive: true });
            window.addEventListener('touchstart', handleUserInteraction, { passive: true });
            window.addEventListener('touchmove', handleUserInteraction, { passive: true });
            window.addEventListener('mousedown', handleUserInteraction, { passive: true });
            window.addEventListener('keydown', handleUserInteraction, { passive: true });
        }
        
        return () => {
            stopAutoScroll();
            if (idleTimer.current) clearTimeout(idleTimer.current);
            window.removeEventListener('wheel', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('touchmove', handleUserInteraction);
            window.removeEventListener('mousedown', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
        };
    }, [isOpened]);

    const handleCopy = (number: string, idx: number) => {
        navigator.clipboard.writeText(number);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className={`relative min-h-screen bg-[#faf9f6] ${!isOpened ? 'h-screen overflow-hidden' : ''}`}>
            {/* Audio Element */}
            <audio ref={audioRef} loop>
                <source src={cardData?.music || "/music/audio1.mp3"} type="audio/mpeg" />
            </audio>

            {/* Envelope Cover Screen - CINEMATIC SPLIT */}
            {!isPreview && (
                <AnimatePresence>
                    {!isOpened && (
                        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center pointer-events-none">
                        {/* Background Door LEFT */}
                        <motion.div 
                            initial={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                            className="absolute inset-y-0 left-0 w-1/2 bg-[#1a2f23] pointer-events-auto"
                        >
                            <FloatingParticles />
                        </motion.div>

                        {/* Background Door RIGHT */}
                        <motion.div 
                            initial={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                            className="absolute inset-y-0 right-0 w-1/2 bg-[#1a2f23] pointer-events-auto"
                        >
                            <FloatingParticles />
                        </motion.div>
                        
                        {/* Central Card */}
                        <motion.div 
                            initial={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 3, opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="relative z-10 w-[90%] max-w-lg min-h-[400px] sm:h-[600px] bg-[#2c4c3b] rounded-2xl sm:rounded-[2rem] p-6 sm:p-12 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#d4af37]/30 pointer-events-auto overflow-hidden py-10"
                        >
                            {/* Inner decorative border */}
                            <div className="absolute inset-3 sm:inset-4 border border-[#d4af37]/20 rounded-xl sm:rounded-[1.5rem] pointer-events-none"></div>
                            {/* Subtle corner decorations */}
                            <svg className="absolute top-5 left-5 w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 4h4v4H4zM4 16h4v4H4zM16 4h4v4h-4zM16 16h4v4h-4z"></path></svg>
                            
                            <div className="relative z-10 flex flex-col items-center w-full">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f3e5ab] flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_20px_rgba(243,229,171,0.4)]">
                                    <span className="font-serif text-lg sm:text-xl text-[#2c4c3b]">囍</span>
                                </div>
                                
                                <h1 className="text-3xl sm:text-5xl font-serif mb-1 sm:mb-2 text-[#e8dac1] drop-shadow-md tracking-wide">
                                    {cardData.groom}
                                </h1>
                                <span className="text-xl sm:text-3xl font-script text-[#d4af37] my-1">&</span>
                                <h1 className="text-3xl sm:text-5xl font-serif mt-1 sm:mt-2 text-[#e8dac1] drop-shadow-md tracking-wide">
                                    {cardData.bride}
                                </h1>
                                
                                <div className="mt-6 mb-8 w-full flex flex-col items-center">
                                    <div className="w-16 sm:w-24 h-[1px] bg-[#d4af37]/50 mb-4 sm:mb-6 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2c4c3b] px-2">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                        </div>
                                    </div>
                                    <span className="text-sm sm:text-lg font-sans tracking-widest text-[#e8dac1]">{cardData.date}</span>
                                    <span className="mt-2 text-[10px] sm:text-sm font-sans tracking-widest text-[#e8dac1]/60">Thân Mời / 초대합니다</span>
                                </div>

                                <button 
                                    onClick={handleOpen}
                                    className="relative overflow-hidden group bg-[#e8dac1] hover:bg-white text-[#2c4c3b] px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-sans font-medium text-xs sm:text-base tracking-widest transition-all duration-500 shadow-[0_0_15px_rgba(232,218,193,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                                >
                                    <span className="relative z-10 uppercase">Mở thiệp</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            )}

            <main ref={mainContentRef} className="bg-[#faf9f6] min-h-screen text-[#1a1a1a] font-sans selection:bg-[#2c4c3b] selection:text-white overflow-hidden">
                
                {/* 1. HERO SECTION - Breathtaking Fullscreen with Parallax */}
            <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
                <motion.div 
                    style={{ y: yHero }}
                    className="absolute inset-0 z-0"
                >
                    {cardData.images && cardData.images[0] && (
                        <img 
                            src={cardData.images[0].src} 
                            alt="Hero" 
                            className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-125"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#faf9f6]"></div>
                </motion.div>

                <motion.div 
                    style={{ opacity: opacityHero }}
                    className="relative z-10 text-center px-6 mt-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-7xl md:text-9xl font-script text-[#faf9f6] drop-shadow-lg leading-tight">
                            {cardData.groom}
                        </h1>
                        <span className="text-3xl md:text-5xl text-[#d4af37] font-serif italic my-2">&</span>
                        <h1 className="text-7xl md:text-9xl font-script text-[#faf9f6] drop-shadow-lg leading-tight">
                            {cardData.bride}
                        </h1>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        className="mt-8 flex flex-col items-center gap-4"
                    >
                        <span className="block w-24 h-[1px] bg-[#d4af37]"></span>
                        <span className="font-sans font-light tracking-[0.4em] uppercase text-sm md:text-base text-[#faf9f6] drop-shadow-md">
                            {cardData.date}
                        </span>
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. THE STORY / GREETING */}
            <section className="py-32 px-6 max-w-4xl mx-auto text-center relative z-10 bg-[#faf9f6]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-5xl font-script text-[#2c4c3b] mb-8">Lời Mời</h2>
                    <p className="text-xl md:text-2xl font-serif text-[#1a1a1a] leading-loose px-4">
                        {cardData.greeting}
                    </p>
                    <div className="mt-12 flex justify-center">
                        <svg className="w-10 h-10 text-[#d4af37] opacity-60" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                </motion.div>
            </section>

            {/* 3. PREMIUM GALLERY - Staggered Layout */}
            <section className="py-20 bg-[#faf9f6] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif italic text-center text-[#2c4c3b] mb-16"
                    >
                        Khoảnh Khắc
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        {/* Cột trái (1 ảnh dọc lớn) */}
                        <div className="md:col-span-5 h-[70vh] md:h-[90vh]">
                            {cardData.images && cardData.images[1] && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    className="w-full h-full rounded-2xl overflow-hidden shadow-2xl group"
                                >
                                    <img src={cardData.images[1].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </motion.div>
                            )}
                        </div>
                        
                        {/* Cột phải (2 ảnh nhỏ) */}
                        <div className="md:col-span-7 flex flex-col gap-8 md:px-12">
                            {cardData.images && cardData.images[2] && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-xl group ml-auto w-[90%]"
                                >
                                    <img src={cardData.images[2].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </motion.div>
                            )}
                            {cardData.images && cardData.images[3] && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="h-[40vh] rounded-2xl overflow-hidden shadow-xl group w-[80%]"
                                >
                                    <img src={cardData.images[3].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. DETAILS - GLASSMORPHISM OVER NATURAL BACKGROUND */}
            <section className="relative py-32 rounded-t-[4rem] overflow-hidden mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                {/* Background for glassmorphism */}
                <div className="absolute inset-0 z-0">
                    <img src={cardData.images[1]?.src || cardData.images[0]?.src} className="w-full h-full object-cover filter blur-md brightness-[0.3]" alt="Background" />
                </div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* RSVP Form - Glass Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-14 rounded-3xl shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Hồi Âm</h2>
                        <div className="w-16 h-[1px] bg-[#d4af37] mb-8"></div>
                        <p className="text-white/80 mb-10 font-light text-lg">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.</p>
                        
                        <form className="space-y-8">
                            <div className="relative">
                                <input type="text" id="name" placeholder=" " className="peer w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#d4af37] transition-colors" />
                                <label htmlFor="name" className="absolute left-0 -top-3.5 text-white/60 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#d4af37]">Tên của bạn</label>
                            </div>
                            
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setRsvp('attending')} className={`flex-1 py-4 border rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${rsvp === 'attending' ? 'bg-[#d4af37] text-white border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'border-white/30 text-white hover:border-white'}`}>Tham Dự</button>
                                <button type="button" onClick={() => setRsvp('not_attending')} className={`flex-1 py-4 border rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${rsvp === 'not_attending' ? 'bg-white/20 text-white border-white' : 'border-white/30 text-white hover:border-white'}`}>Xin Lỗi Mình Bận</button>
                            </div>
                            
                            <div className="relative">
                                <textarea id="message" placeholder=" " className="peer w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#d4af37] transition-colors h-24 resize-none"></textarea>
                                <label htmlFor="message" className="absolute left-0 -top-3.5 text-white/60 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#d4af37]">Gửi gắm lời chúc...</label>
                            </div>
                            
                            <button type="submit" className="w-full bg-[#2c4c3b] hover:bg-[#1e3629] text-white py-4 rounded-xl font-serif italic text-xl transition-all duration-300 shadow-lg mt-4">
                                Gửi Phản Hồi
                            </button>
                        </form>
                    </motion.div>

                    {/* Bank / Vault - Glass Card */}
                    {cardData.banks && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-14 rounded-3xl shadow-2xl">
                                <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Hộp Mừng Cưới</h2>
                                <div className="w-16 h-[1px] bg-[#d4af37] mb-8"></div>
                                
                                <div className="space-y-8">
                                    {cardData.banks.map((b: any, idx: number) => (
                                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-8 hover:bg-white/10 transition-colors">
                                            <div className="w-36 h-36 bg-white p-3 rounded-xl shrink-0 shadow-lg">
                                                <img src={b.qr} alt="QR Code" className="w-full h-full object-cover rounded" />
                                            </div>
                                            <div className="text-left w-full text-white">
                                                <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-1">{b.bank}</p>
                                                <p className="text-2xl md:text-3xl font-serif mb-1 text-[#d4af37]">{b.number}</p>
                                                <p className="text-sm font-light mb-6 uppercase tracking-wider">{b.owner}</p>
                                                
                                                <button 
                                                    onClick={() => handleCopy(b.number, idx)}
                                                    className="w-full sm:w-auto uppercase tracking-widest text-xs border border-[#d4af37] px-6 py-3 rounded-lg text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all duration-300"
                                                >
                                                    {copied === idx ? 'Đã Chép Số' : 'Sao Chép'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="relative z-10 mt-20 pt-16 pb-8 text-center border-t border-white/10">
                    <p className="text-6xl md:text-8xl font-script text-[#d4af37] mb-6 drop-shadow-md">Amore</p>
                    <p className="text-xs tracking-[0.4em] uppercase text-white/50">Wedding Collection by {slug}</p>
                </div>
            </section>
            
        </main>
        </div>
    );
}
