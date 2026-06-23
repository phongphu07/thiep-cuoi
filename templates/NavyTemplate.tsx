"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BankDetails from '@/components/BankDetails';
import LightboxGallery from '@/components/LightboxGallery';




const GoldDust = ({ isOpened }: { isOpened: boolean}) => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const newParticles = [...Array(20)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 30 + 20}px`,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * 10,
            xOffset: Math.random() * 100 - 50
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className={`absolute font-serif font-bold transition-colors duration-1000 ${isOpened ? 'text-[#d4af37] opacity-10' : 'text-[#d4af37] opacity-20'}`}
                    style={{ left: p.left, top: p.top, fontSize: p.size }}
                    animate={{
                        y: [0, -400],
                        x: [0, p.xOffset],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay
                    }}
                >
                    {"&"}
                </motion.div>
            ))}
        </div>
    );
};

const NavyBankPopup = ({ banks, onClose }: { banks: any[], onClose: () => void}) => {
    const [copied, setCopied] = useState<number | null>(null);

    if (!banks || banks.length === 0) return null;

    return (
        <div className="w-full max-w-3xl bg-[#001f3f] rounded-t-3xl sm:rounded-xl shadow-2xl overflow-hidden relative text-center mx-auto flex flex-col max-h-[85vh]">
            <div className="bg-[#001f3f] py-3 sm:py-5 relative flex items-center justify-center sticky top-0 z-20 shadow-sm">
                <h3 className="text-base sm:text-xl font-serif text-white font-bold tracking-widest uppercase">Phong Bao Mừng Cưới</h3>
                <button
                    onClick={onClose}
                    className="absolute right-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 bg-[#001f3f] overflow-y-auto">
                {banks.map((b, idx) => (
                    <div key={idx} className={`flex flex-row sm:flex-col items-center sm:items-center border-b border-[#d4af37]/20 sm:border-b-0 pb-4 sm:pb-0 last:border-0 last:pb-0 gap-4 sm:gap-5`}>
                        <div className="w-28 h-28 sm:w-48 sm:h-48 bg-[#001f3f] p-1.5 sm:p-3 rounded-xl shadow-sm shrink-0">
                            <img src={b.qr} alt={`QR Code ${b.owner}`} className="w-full h-full object-cover rounded-lg" />
                        </div>

                        <div className="flex flex-col items-start sm:items-center text-left sm:text-center w-full">
                            <p className="text-[#d4af37] font-sans font-bold mb-1 sm:mb-3 text-[12px] sm:text-base uppercase">
                                {idx === 0 ? "Chú Rể" : "Cô Dâu"} - {b.owner}
                            </p>

                            <div className="text-[#555] font-sans text-xs sm:text-sm mb-2 sm:mb-4">
                                <p className="uppercase tracking-widest mb-0.5 text-[10px] sm:text-xs opacity-70">{b.bank}</p>
                                <p className="font-bold tracking-widest text-[13px] sm:text-base text-gray-800 mb-0.5">{b.number}</p>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(b.number);
                                    setCopied(idx);
                                    setTimeout(() => setCopied(null), 2000);
                                }}
                                className="px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[9px] sm:text-xs font-bold transition-all bg-[#e0d0bd] text-[#d4af37] hover:bg-[#d0c0ad] border border-[#c0b09d] flex items-center justify-center gap-1 sm:gap-2 w-max cursor-pointer"
                            >
                                {copied === idx ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        ĐÃ LƯU
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        LƯU QR
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function NavyTemplate({ cardData, slug, isPreview = false }: { cardData: any, slug: string, isPreview?: boolean }) {
    
    const [isOpened, setIsOpened] = useState(isPreview);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showBankDetails, setShowBankDetails] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [showRSVP, setShowRSVP] = useState(false);
    const [rsvpName, setRsvpName] = useState("");
    const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | null>("yes");
    const [guestCount, setGuestCount] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
    const isAutoScrollingRef = useRef(false);

    const generateCalendarUrl = () => {
        let startDate = new Date();
        if (cardData?.fullDate) {
            startDate = new Date(cardData.fullDate);
        }
        const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
        const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
        const title = encodeURIComponent(`Đám cưới ${cardData?.groom || ''} & ${cardData?.bride || ''}`);
        const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;
        const details = encodeURIComponent(`Kính mời quý khách đến dự tiệc cưới của chúng tôi.`);
        const loc = encodeURIComponent(`${cardData?.location || ''}, ${cardData?.address || ''}`);
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${loc}`;
    };

    const startAutoScroll = () => {
        isAutoScrollingRef.current = true;
        if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = setInterval(() => {
            window.scrollBy({ top: 1, left: 0 });
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                if (isPreview) {
                    window.scrollTo({ top: 0, left: 0 }); // Loop back cho preview
                } else {
                    stopAutoScroll();
                }
            }
        }, 30);
    };

    const stopAutoScroll = () => {
        isAutoScrollingRef.current = false;
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
            autoScrollTimer.current = null;
        }
    };

    const handleManualScroll = () => {
        if (!isOpened) return;
        if (isAutoScrollingRef.current) {
            stopAutoScroll();
        }
    };

    const handleDocumentClick = (e: MouseEvent | TouchEvent) => {
        if (!isOpened) return;

        const target = e.target as HTMLElement;
        // Bỏ qua nếu bấm vào các thành phần tương tác
        if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) {
            return;
        }

        if (isAutoScrollingRef.current) {
            stopAutoScroll();
        } else {
            // Chỉ cuộn tiếp nếu chưa đến cuối trang
            if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 10) {
                startAutoScroll();
            }
        }
    };

    const toggleAudio = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            if (e.nativeEvent) {
                e.nativeEvent.stopImmediatePropagation();
            }
        }
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed", e));
            }
        }
    };

    const handleOpen = () => {
        // Phát tiếng "Phép màu / Chuông lấp lánh" (Magical Chime)
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();

            const playChime = (freq: number, delay: number) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

                gain.gain.setValueAtTime(0, ctx.currentTime + delay);
                gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + delay + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.5);

                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + 1.5);
            };

            // Hợp âm ma thuật bay bổng (C6 - E6 - G6 - C7)
            playChime(1046.50, 0);
            playChime(1318.51, 0.08);
            playChime(1567.98, 0.16);
            playChime(2093.00, 0.24);
        } catch (e) { console.log(e); }

        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed", e));
        }

        setIsOpened(true);
        setTimeout(() => {
            startAutoScroll();
        }, 2000);
    };

    useEffect(() => {
        if (isPreview) {
            setTimeout(() => {
                startAutoScroll();
            }, 500);
        }
    }, [isPreview]);

    useEffect(() => {
        if (isOpened) {
            window.addEventListener('wheel', handleManualScroll, { passive: true });
            window.addEventListener('touchmove', handleManualScroll, { passive: true });
            window.addEventListener('click', handleDocumentClick);
        }

        return () => {
            stopAutoScroll();
            window.removeEventListener('wheel', handleManualScroll);
            window.removeEventListener('touchmove', handleManualScroll);
            window.removeEventListener('click', handleDocumentClick);
        };
    }, [isOpened]);

    useEffect(() => {
        // Khóa cuộn trang khi chưa mở thiệp để tránh giật lag layout
        if (!isOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpened]);

    // Lấy tên rút gọn cho tiêu đề vòm cung
    const groomShort = cardData?.groom?.split(' ').pop() || 'NAM';
    const brideShort = cardData?.bride?.split(' ').pop() || 'NỮ';

    return (
        <div
            className="min-h-screen w-full flex justify-center overflow-x-hidden relative transition-all duration-1000"
            style={{ background: isOpened ? '#00152b' : 'linear-gradient(to bottom right, #001f3f, #00152b, #000a15)' }}
        >
            <GoldDust isOpened={isOpened}/>

            
            {/* COVER SCREEN OVERLAY - ROYAL ELEGANCE */}
            {!isPreview && (
                <AnimatePresence>
                    {!isOpened && (
                        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center pointer-events-none bg-[#001f3f]">
                            <motion.div
                                initial={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="relative z-10 w-full h-full max-w-[480px] pointer-events-auto bg-[#001f3f] border-x-4 border-[#d4af37]"
                            >
                                <div className="absolute inset-4 border-2 border-[#d4af37] pointer-events-none"></div>
                                <div className="absolute inset-5 border border-[#d4af37]/40 pointer-events-none"></div>
                                
                                <div className="relative z-10 text-center px-6 pt-20 pb-12 flex flex-col items-center h-full justify-center">
                                    <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-10 uppercase font-sans">Save the Date</p>
                                    
                                    <div className="w-48 h-48 md:w-56 md:h-56 rotate-45 overflow-hidden border-2 border-[#d4af37] mx-auto mb-16 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                        <img src={cardData?.images?.[0] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"} className="w-[150%] h-[150%] max-w-none object-cover -rotate-45 -translate-x-[15%] -translate-y-[15%]" alt="Couple" />
                                    </div>
                                    
                                    <h1 className="mb-2 flex flex-col items-center leading-tight text-4xl sm:text-5xl font-script text-[#d4af37] drop-shadow-md">
                                        <span>{cardData?.groom?.split(' ').slice(-2).join(' ') || 'Gia Khánh'}</span>
                                        <span className="text-2xl my-2">{"&"}</span>
                                        <span>{cardData?.bride?.split(' ').slice(-2).join(' ') || 'Quỳnh Anh'}</span>
                                    </h1>
                                    
                                    <p className="text-[#d4af37] text-sm font-sans tracking-[0.2em] mt-8 mb-12 opacity-90 uppercase">
                                        {cardData?.date || '01 . 06 . 2026'}
                                    </p>
                                    
                                    <motion.button
                                        onClick={handleOpen}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 uppercase tracking-widest text-xs font-bold transition-all duration-500 bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#001f3f]"
                                    >
                                        Mở thiệp
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            )}

                {/* ACTUAL PAGE CONTENT */}
                <div className={`relative min-h-screen w-full max-w-[480px] md:max-w-[900px] md:mx-auto isolate flex flex-col overflow-x-clip md:border md:border-[#d4af37]/30 font-serif bg-[#00152b] text-[#d4af37] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
                    
                    {/* Audio Element */}
                    <audio ref={audioRef} loop>
                        <source src={cardData?.music || "/music/audio1.mp3"} type="audio/mpeg" />
                    </audio>

                    {/* Royal Header */}
                    <div className="relative w-full bg-[#001f3f] flex flex-col items-center pt-20 pb-16 px-6 border-b border-[#d4af37]/30">
                        <div className="absolute inset-2 border border-[#d4af37]/40 pointer-events-none"></div>
                        
                        <p className="text-[#d4af37] text-[10px] tracking-[0.4em] uppercase mb-10 font-sans">Welcome to our wedding</p>
                        
                        <div className="relative w-64 h-72 mb-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                            <img src={cardData?.images?.[0] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"} className="w-full h-full object-cover" alt="Couple" />
                            <div className="absolute inset-0 border-4 border-[#d4af37]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                        </div>
                        
                        <div className="flex flex-col items-center w-full text-[#d4af37]">
                            <p className="text-4xl font-script mb-2">{groomShort}</p>
                            <span className="text-xl mb-2">{"&"}</span>
                            <p className="text-4xl font-script mb-8">{brideShort}</p>
                        </div>
                    </div>
{/* Section: Thông tin Lễ cưới */}
                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md relative z-20">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Thông tin lễ cưới</h3>
                    </div>

                    <div className="max-w-3xl mx-auto px-6 py-16 text-center relative">
                        {/* Parents Info */}
                        <div className={`flex justify-between items-center w-full border-b border-[#d4af37]/20 pb-8 mb-12`}>
                            <div className={`text-right flex-1 pr-6 border-r border-[#d4af37]/30`}>
                                <p className="text-[#d4af37]/70 text-xs mb-1 font-sans uppercase">Ông Bà</p>
                                <p className="font-bold text-[#d4af37] text-sm">Phan Văn Hoàng</p>
                                <p className="font-bold text-[#d4af37] text-sm mb-2">Lê Thị Mai</p>
                                <p className="text-[10px] text-[#d4af37]/60">TP. Hồ Chí Minh</p>
                            </div>
                            <div className="text-left flex-1 pl-6">
                                <p className="text-[#d4af37]/70 text-xs mb-1 font-sans uppercase">Ông Bà</p>
                                <p className="font-bold text-[#d4af37] text-sm">Phạm Văn Mạnh</p>
                                <p className="font-bold text-[#d4af37] text-sm mb-2">Huỳnh Thị Kim Oanh</p>
                                <p className="text-[10px] text-[#d4af37]/60">Hà Nội</p>
                            </div>
                        </div>

                        <p className="text-[#d4af37] text-xs sm:text-sm tracking-widest uppercase mb-8 font-sans leading-relaxed">
                            Trân trọng báo tin<br />Lễ thành hôn của con chúng tôi
                        </p>

                        <h2 className="text-4xl sm:text-5xl font-serif text-[#d4af37] my-4">{cardData?.groom || "Phan Gia Khánh"}</h2>
                        <p className={`text-[#f8e5a5] text-xs font-sans tracking-widest mb-6 uppercase`}>ÚT NAM</p>

                        <span className={`text-2xl text-[#f8e5a5] font-script my-2 block`}>{"&"}</span>

                        <h2 className="text-4xl sm:text-5xl font-serif text-[#d4af37] my-4">{cardData?.bride || "Phạm Quỳnh Anh"}</h2>
                        <p className={`text-[#f8e5a5] text-xs font-sans tracking-widest mb-10 uppercase`}>ÚT NỮ</p>

                        <p className="text-[#d4af37] text-sm tracking-widest uppercase mb-4 font-sans">
                            Lễ thành hôn được cử hành tại tư gia
                        </p>
                        <p className="text-[#d4af37] text-xs sm:text-sm tracking-widest uppercase mb-8 font-sans font-bold">
                            Vào lúc 09:00
                        </p>

                        <div className={`w-full max-w-[280px] mx-auto border-y border-[#d4af37]/20 py-6 flex justify-center items-center gap-6 text-[#d4af37]`}>
                            <span className="text-xs sm:text-sm tracking-widest font-sans uppercase">THỨ HAI</span>
                            <div className="w-[1px] h-10 bg-[#001f3f]/20"></div>
                            <span className={`text-4xl sm:text-5xl font-serif text-[#f8e5a5]`}>01</span>
                            <div className="w-[1px] h-10 bg-[#001f3f]/20"></div>
                            <span className="text-xs sm:text-sm tracking-widest font-sans uppercase">THÁNG 06</span>
                        </div>
                        <p className="text-sm sm:text-base tracking-widest text-[#d4af37] font-sans mt-6">2026</p>
                        <p className="text-xs tracking-widest text-[#d4af37]/70 font-sans mt-2 italic">(Tức ngày 16/04 Năm Bính Ngọ)</p>
                    </div>

                    {/* Section: Album ảnh cưới */}
                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Album ảnh cưới</h3>
                    </div>

                    {/* Editorial Grid Gallery Area */}
                    <div className="w-full max-w-4xl mx-auto py-16 px-4 cursor-pointer" onClick={() => { setIsLightboxOpen(true); stopAutoScroll(); }}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                            {/* Large Image */}
                            <div className="col-span-2 row-span-2 overflow-hidden rounded-sm group relative">
                                <img src={cardData?.images?.[0]?.src || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"} className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                                <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/20 transition-colors duration-300"></div>
                            </div>
                            
                            {/* Small Image 1 */}
                            <div className="overflow-hidden rounded-sm group relative">
                                <img src={cardData?.images?.[1]?.src || "https://images.unsplash.com/photo-1544078755-9a8449c2eb06?auto=format&fit=crop&q=80"} className="w-full h-full object-cover aspect-[4/5] md:aspect-square group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                                <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/20 transition-colors duration-300"></div>
                            </div>
                            
                            {/* Small Image 2 */}
                            <div className="overflow-hidden rounded-sm group relative">
                                <img src={cardData?.images?.[2]?.src || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80"} className="w-full h-full object-cover aspect-[4/5] md:aspect-square group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                                <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/20 transition-colors duration-300 flex items-center justify-center">
                                    <span className="text-white font-serif italic text-sm opacity-0 group-hover:opacity-100 transition-opacity">Xem thêm +</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lightbox Gallery Render */}
                    <AnimatePresence>
                        {isLightboxOpen && cardData?.images && (
                            <LightboxGallery
                                images={cardData.images}
                                onClose={() => {
                                    setIsLightboxOpen(false);
                                    // Optional: resume auto scroll
                                    if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 10) {
                                        startAutoScroll();
                                    }
                                }}
                            />
                        )}
                    </AnimatePresence>


                    {/* Section: Thông tin Tiệc cưới */}
                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Thông tin tiệc cưới</h3>
                    </div>

                    <div className="py-16 text-center px-6">
                        <p className="text-[#d4af37] text-sm font-sans tracking-widest uppercase mb-4">Tiệc cưới sẽ diễn ra vào lúc:</p>
                        <p className="text-[#d4af37] text-xl sm:text-2xl font-bold font-serif mb-6">10:30</p>

                        <div className={`w-full max-w-[280px] mx-auto border-y border-[#d4af37]/20 py-6 flex justify-center items-center gap-6 text-[#d4af37] mb-8`}>
                            <span className="text-xs sm:text-sm tracking-widest font-sans uppercase">CHỦ NHẬT</span>
                            <div className="w-[1px] h-10 bg-[#001f3f]/20"></div>
                            <span className={`text-4xl sm:text-5xl font-serif text-[#f8e5a5]`}>14</span>
                            <div className="w-[1px] h-10 bg-[#001f3f]/20"></div>
                            <span className="text-xs sm:text-sm tracking-widest font-sans uppercase">THÁNG 06</span>
                        </div>
                        <p className="text-sm sm:text-base tracking-widest text-[#d4af37] font-sans">2026</p>
                        <p className="text-xs tracking-widest text-[#d4af37]/70 font-sans mt-2 mb-10 italic">(Tức ngày 29/04 Năm Bính Ngọ)</p>

                        <p className="text-[#d4af37] text-xs sm:text-sm font-sans tracking-widest uppercase mb-2">KHAI TIỆC</p>
                        <p className="text-[#d4af37] text-xl font-bold font-serif mb-10">10:30</p>

                        {/* Calendar visual */}
                        <div className={`max-w-[280px] mx-auto border border-[#d4af37]/20 rounded-md p-4 bg-[#001f3f]/50 mb-8 shadow-sm`}>
                            <p className={`text-[#d4af37] font-bold font-sans text-sm mb-4 border-b border-[#d4af37]/20 pb-2`}>Tháng 6 / 2026</p>
                            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-sans text-[#d4af37]/70 mb-2">
                                <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span className="text-[#d4af37] font-bold">CN</span>
                            </div>
                            <div className="grid grid-cols-7 gap-y-3 text-center text-xs font-sans text-[#d4af37]">
                                <span className="opacity-40">25</span><span className="opacity-40">26</span><span className="opacity-40">27</span><span className="opacity-40">28</span><span className="opacity-40">29</span><span className="opacity-40">30</span><span className="opacity-40">31</span>
                                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span className="font-bold text-[#d4af37]">7</span>
                                <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
                                {/* Target date 14 */}
                                <span className="relative flex justify-center items-center font-bold text-white z-10">
                                    <svg className="absolute w-7 h-7 text-[#d4af37] -z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                    14
                                </span>
                                <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
                                <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
                                <span>29</span><span>30</span><span className="opacity-40">1</span><span className="opacity-40">2</span><span className="opacity-40">3</span><span className="opacity-40">4</span><span className="opacity-40">5</span>
                            </div>
                        </div>

                        <div className="flex justify-center mb-8">
                            <a
                                href={generateCalendarUrl()}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-block border-b border-[#d4af37] text-[#d4af37] text-xs font-sans tracking-widest pb-1 hover:text-white transition-colors cursor-pointer`}
                            >
                                Thêm vào lịch
                            </a>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowRSVP(true);
                                }}
                                className="px-10 py-3 bg-[#001f3f] text-[#d4af37] rounded-lg font-sans uppercase tracking-[0.15em] text-xs font-bold hover:bg-[#d4af37] hover:text-[#001f3f] transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#d4af37]/50 cursor-pointer"
                            >
                                XÁC NHẬN
                            </button>
                        </div>
                    </div>

                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Tiệc cưới sẽ tổ chức tại</h3>
                    </div>

                    <div className="pt-10 pb-16 text-center px-6 max-w-2xl mx-auto">
                        <p className="text-[#d4af37] text-sm sm:text-base mb-8 font-sans leading-loose tracking-wide">
                            <span className="font-bold">{cardData?.location || "Sun Palace"}</span><br />
                            {cardData?.address || "170 Kinh Dương Vương, Phường 13, Quận 6, Hồ Chí Minh"}
                        </p>
                        <div className="w-full aspect-[4/3] sm:aspect-video border-4 sm:border-8 border-white shadow-xl rounded-xl overflow-hidden bg-gray-200 relative z-10 transform transition-transform duration-500 hover:scale-[1.02]">
                            <iframe
                                src={`https://maps.google.com/maps?q=${encodeURIComponent((cardData?.location || 'Sun Palace') + ', ' + (cardData?.address || '170 Kinh Dương Vương, Phường 13, Quận 6, Hồ Chí Minh'))}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="mt-6">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((cardData?.location || 'Sun Palace') + ', ' + (cardData?.address || '170 Kinh Dương Vương, Phường 13, Quận 6, Hồ Chí Minh'))}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-block px-8 py-2.5 border border-[#d4af37] text-[#d4af37] rounded-full text-xs font-sans font-bold tracking-widest hover:bg-[#001f3f] hover:text-white transition-colors cursor-pointer`}
                            >
                                MỞ GOOGLE MAPS
                            </a>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Lịch trình ngày cưới</h3>
                    </div>

                    <div className="py-16 text-center">
                        <div className="max-w-2xl mx-auto px-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[28px] sm:left-1/2 top-4 bottom-4 w-[1px] bg-[#d4af37]/40 sm:-translate-x-1/2 z-0"></div>

                            {[
                                { time: "17:30", text: "Đón khách", desc: "Chụp ảnh lưu niệm cùng Cô Dâu Chú Rể" },
                                { time: "18:30", text: "Khai tiệc", desc: "Mời quý khách ổn định chỗ ngồi" },
                                { time: "18:45", text: "Nghi thức", desc: "Cắt bánh, rót rượu mừng" },
                                { time: "19:00", text: "Dùng tiệc", desc: "Thưởng thức ẩm thực và âm nhạc" },
                                { time: "21:00", text: "Kết thúc", desc: "Cảm ơn và tiễn khách" }
                            ].map((item, idx) => (
                                <div key={idx} className={`flex flex-col sm:flex-row items-start sm:items-center w-full mb-10 relative z-10 ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                                    
                                    {/* Timeline Node */}
                                    <div className="absolute left-[20px] sm:left-1/2 w-4 h-4 rounded-full bg-[#00152b] border-2 border-[#d4af37] sm:-translate-x-1/2 flex items-center justify-center mt-1 sm:mt-0 transition-transform duration-300 hover:scale-125">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f8e5a5]"></div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full sm:w-[calc(50%-40px)] pl-14 sm:pl-0 ${idx % 2 === 0 ? 'sm:pl-10 text-left' : 'sm:pr-10 sm:text-right'}`}>
                                        <div className="bg-[#001f3f] p-5 rounded-lg shadow-lg border border-[#d4af37]/30 hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 group cursor-default">
                                            <span className="text-[#f8e5a5] font-bold text-xl font-serif block mb-1 group-hover:-translate-y-1 transition-transform duration-300">{item.time}</span>
                                            <h4 className="text-[#d4af37] font-bold text-sm font-sans uppercase tracking-widest mb-2">{item.text}</h4>
                                            <p className="text-[#d4af37]/70 text-xs font-serif italic">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Sổ lưu bút</h3>
                    </div>

                    <div className="py-16 px-6 max-w-lg mx-auto text-center">
                        <div className={`bg-[#001f3f] border border-[#d4af37]/10 rounded-lg p-6 shadow-md mb-8 text-left`}>
                            <input type="text" placeholder="Nhập tên của bạn*" className={`w-full border border-gray-300 rounded p-3 mb-4 text-sm font-sans focus:outline-none focus:border-[#d4af37]`} />
                            <textarea placeholder="Nhập lời chúc của bạn*" rows={4} className={`w-full border border-gray-300 rounded p-3 mb-4 text-sm font-sans focus:outline-none focus:border-[#d4af37]`}></textarea>
                            <div className="flex justify-end">
                                <button className="px-6 py-2 bg-[#00152b] border border-[#d4af37]/50 text-[#d4af37] rounded-full font-sans text-xs font-bold hover:bg-[#d4af37] hover:text-[#00152b] transition-all">
                                    GỬI LỜI CHÚC
                                </button>
                            </div>
                        </div>

                        <p className="text-[#d4af37]/50 text-xs font-sans italic">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
                    </div>

                    {/* Navy Envelope */}
                    <div className="py-16 text-center relative overflow-hidden">
                        <h3 className="text-[#d4af37] font-bold tracking-[0.2em] uppercase text-sm font-sans mb-12">PHONG BAO MỪNG CƯỚI</h3>

                        <div
                            className="relative inline-block cursor-pointer group mt-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                                stopAutoScroll();
                                setShowBankDetails(true);
                            }}
                        >
                            <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>

                            <motion.div
                                whileHover={{ y: -10 }}
                                className="relative z-10 w-64 h-40 bg-[#00152b] rounded-sm shadow-2xl flex items-center justify-center border border-[#d4af37]/30 cursor-pointer overflow-hidden"
                            >
                                {/* Envelope Flaps */}
                                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-[#d4af37]/20"></div>
                                <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(135deg, transparent 49%, rgba(212, 175, 55, 0.2) 50%, transparent 51%)' }}></div>
                                <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(-135deg, transparent 49%, rgba(212, 175, 55, 0.2) 50%, transparent 51%)' }}></div>

                                {/* Wax Seal */}
                                <div className="absolute w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                                     style={{ background: 'radial-gradient(circle at 30% 30%, #ffd700, #b8860b, #8b6508)' }}>
                                    <span className="text-[#fff8e7] font-serif font-bold text-xl drop-shadow-md opacity-90">{"&"}</span>
                                    {/* inner circle */}
                                    <div className="absolute inset-1 border border-[#fff8e7]/30 rounded-full"></div>
                                </div>
                            </motion.div>

                            <p className="mt-8 text-xs text-[#d4af37]/60 font-sans tracking-widest uppercase transition-opacity">Nhấn để mở</p>
                        </div>
                    </div>

                    <div className="py-16 text-center mt-10 relative overflow-hidden bg-[#001f3f] text-[#ffeed2]">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                        <div className="relative z-10 px-6 max-w-lg mx-auto">
                            <div className="text-4xl font-serif mb-6 opacity-90 drop-shadow-md">{"&"}</div>
                            <h2 className="text-2xl sm:text-3xl font-serif mb-2 tracking-wide font-bold">THANK YOU</h2>
                            <p className="text-xs sm:text-sm font-sans tracking-widest opacity-80 uppercase mb-8">Trân trọng cảm ơn</p>

                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffeed2]/30 to-transparent my-6"></div>

                            <p className="text-sm font-sans leading-relaxed opacity-90 italic mb-8">
                                "Sự hiện diện của quý khách là niềm vinh hạnh lớn nhất cho gia đình chúng tôi. Xin chân thành cảm ơn những lời chúc phúc tốt đẹp nhất!"
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <span className={`font-script text-3xl sm:text-4xl text-[#f8e5a5]`}>{groomShort}</span>
                                <span className={`text-xl text-[#f8e5a5] opacity-60 font-serif`}>{"&"}</span>
                                <span className={`font-script text-3xl sm:text-4xl text-[#f8e5a5]`}>{brideShort}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showBankDetails && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                                setShowBankDetails(false);
                            }}
                        >
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "100%", opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="w-full max-w-3xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <NavyBankPopup banks={cardData?.banks || []} onClose={() => setShowBankDetails(false)}/>
                            </motion.div>
                        </motion.div>
                    )}

                    {showRSVP && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                                setShowRSVP(false);
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="w-full max-w-xl bg-[#001f3f] rounded-2xl shadow-2xl p-6 md:p-8 relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowRSVP(false)}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">Xác nhận tham dự</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed font-sans">
                                    Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất cho bạn.
                                </p>

                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-800 mb-2 font-sans cursor-default">Tên của bạn</label>
                                    <input
                                        type="text"
                                        value={rsvpName}
                                        onChange={(e) => setRsvpName(e.target.value)}
                                        placeholder="Nhập tên của bạn"
                                        className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all font-sans text-gray-700 cursor-text hover:border-gray-300`}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-semibold text-gray-800 mb-2 font-sans cursor-default">Bạn sẽ đến chứ?</label>

                                    <div
                                        onClick={() => setRsvpStatus("yes")}
                                        className={`flex items-center gap-3 p-3 rounded-lg border mb-3 cursor-pointer transition-all ${rsvpStatus === "yes" ? "border-[#00a86b] border-[1.5px] bg-[#001f3f] shadow-sm" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${rsvpStatus === "yes" ? "bg-[#00a86b] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className={`font-sans text-sm transition-colors ${rsvpStatus === "yes" ? "font-bold text-[#00a86b]" : "text-gray-600"}`}>Tôi sẽ đến</span>
                                    </div>

                                    <div
                                        onClick={() => setRsvpStatus("no")}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${rsvpStatus === "no" ? "border-gray-300 bg-gray-50 shadow-sm" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${rsvpStatus === "no" ? "bg-[#d4af37] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className={`font-sans text-sm transition-colors ${rsvpStatus === "no" ? "font-medium text-gray-900" : "text-gray-600"}`}>Rất tiếc, tôi không thể đến</span>
                                    </div>

                                    {/* Guest count selector - only shows when "yes" is selected */}
                                    <AnimatePresence>
                                        {rsvpStatus === "yes" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between mt-6 px-1">
                                                    <span className="text-sm font-semibold text-gray-800 font-sans">Số lượng khách <span className="font-normal text-gray-500">(bao gồm bạn)</span></span>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" /></svg>
                                                        </button>
                                                        <span className="font-bold text-gray-900 text-base w-4 text-center font-sans">{guestCount}</span>
                                                        <button
                                                            onClick={() => setGuestCount(guestCount + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    onClick={async (e) => {
                                        if (!rsvpName) {
                                            alert("Vui lòng nhập tên của bạn");
                                            return;
                                        }

                                        const btn = e.currentTarget as HTMLButtonElement;
                                        const originalText = btn.innerText;
                                        btn.innerText = "Đang gửi...";
                                        btn.disabled = true;
                                        btn.classList.add('opacity-70');

                                        try {
                                            const res = await fetch('/api/rsvp', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    name: rsvpName,
                                                    status: rsvpStatus,
                                                    guestCount: rsvpStatus === 'yes' ? guestCount : 0,
                                                    cardId: slug || 'traditional-template'
                                                })
                                            });

                                            if (res.ok) {
                                                alert("Cảm ơn bạn đã xác nhận!");
                                            } else {
                                                alert("Cảm ơn bạn đã xác nhận! (Thông báo có thể chưa được cấu hình)");
                                            }
                                            setShowRSVP(false);
                                        } catch (err) {
                                            alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                                        } finally {
                                            btn.innerText = originalText;
                                            btn.disabled = false;
                                            btn.classList.remove('opacity-70');
                                        }
                                    }}
                                    className="w-full mt-6 py-4 bg-[#001f3f] hover:bg-[#a00000] text-white rounded-xl font-sans font-bold text-base transition-all shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed"
                                >
                                    Gửi xác nhận
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Music Toggle Button */}
                {isOpened && !isPreview && (
                    <button
                        onClick={toggleAudio}
                        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-12 h-12 bg-[#001f3f] rounded-full shadow-lg flex items-center justify-center border-2 border-white/20 hover:scale-110 transition-transform"
                    >
                        {isPlaying ? (
                            <div className="flex items-end justify-center gap-[3px] h-4">
                                <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-[3px] bg-[#001f3f] rounded-full"></motion.div>
                                <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="w-[3px] bg-[#001f3f] rounded-full"></motion.div>
                                <motion.div animate={{ height: ["50%", "100%", "50%"] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} className="w-[3px] bg-[#001f3f] rounded-full"></motion.div>
                                <motion.div animate={{ height: ["100%", "40%", "100%"] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }} className="w-[3px] bg-[#001f3f] rounded-full"></motion.div>
                            </div>
                        ) : (
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        )}
                    </button>
                )}
        </div>
    );
}
