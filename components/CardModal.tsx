import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
    cardName: string;
    cardImage: string;
    slug: string;
}

export default function CardModal({ isOpen, onClose, cardName, cardImage, slug }: CardModalProps) {
    const [showIframe, setShowIframe] = useState(false);

    // Ngăn chặn scroll body khi mở modal và tránh layout shift
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';
            
            // Chờ animation chạy xong mới render iframe nặng
            const timer = setTimeout(() => setShowIframe(true), 300);
            return () => clearTimeout(timer);
        } else {
            document.body.style.paddingRight = '0px';
            document.body.style.overflow = '';
            setShowIframe(false);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4"
                    onClick={onClose}
                >
                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-5xl bg-[#1e1e1e] md:bg-[#2b2b2b] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh] pb-6 md:pb-0"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white bg-black/30 md:bg-black/20 hover:bg-black/50 rounded-full p-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        {/* MOBILE TOP INFO */}
                        <div className="md:hidden p-6 pb-2 shrink-0">
                            <h2 className="text-2xl font-sans font-bold text-white mb-1">{cardName}</h2>
                            <p className="text-gray-400 text-sm mb-3 font-light">Thanh lịch với tông màu sang trọng tự nhiên</p>
                            <div className="flex gap-2">
                                <span className="border border-white/20 text-white/80 text-[10px] px-3 py-1 rounded-full">Truyền thống</span>
                                <span className="border border-white/20 text-white/80 text-[10px] px-3 py-1 rounded-full">Trang trọng</span>
                            </div>
                        </div>

                        {/* Left Side: Mobile Mockup Image */}
                        <div className="w-full md:w-5/12 bg-transparent md:bg-[#1a1a1a] p-4 md:p-10 flex items-center justify-center shrink-0 min-h-0 relative">
                            {/* Nền mờ các tính năng (chỉ hiện trên mobile) */}
                            <div className="absolute inset-0 md:hidden flex flex-col items-center justify-center opacity-10 pointer-events-none text-white text-sm gap-6 font-light">
                                <p>Tùy chỉnh nội dung</p>
                                <p>Google Maps</p>
                                <p>Ghi tên khách mời</p>
                                <p>Xác nhận tham dự</p>
                            </div>

                            <div className="w-auto h-full max-h-[45vh] md:max-h-none md:w-full md:max-w-[280px] aspect-[9/16] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] border-[4px] md:border-[6px] border-[#333] relative z-10 bg-white">
                                {showIframe ? (
                                    <iframe 
                                        src={`/card/${slug}?preview=true`}
                                        className="w-full h-full border-none pointer-events-none"
                                        title="Card Preview"
                                        scrolling="no" // Ẩn thanh cuộn, để template tự scroll
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                                        <div className="w-8 h-8 border-4 border-[#e0d0bd] border-t-[#d4af37] rounded-full animate-spin"></div>
                                        <p className="mt-4 text-xs text-gray-400 font-medium">Đang tải thiệp...</p>
                                    </div>
                                )}
                                {/* Fake mobile notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-5 bg-[#333] rounded-b-lg md:rounded-b-xl pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Right Side: Details & Actions */}
                        <div className="w-full md:w-7/12 px-6 md:p-12 flex flex-col overflow-y-auto">
                            {/* DESKTOP INFO */}
                            <div className="hidden md:block">
                                <h2 className="text-4xl font-sans font-bold text-white mb-2">{cardName}</h2>
                                <p className="text-gray-400 text-base mb-6 font-light">Thanh lịch với tông màu sang trọng tự nhiên</p>
                                
                                <div className="flex gap-3 mb-10">
                                    <span className="border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">Truyền thống</span>
                                    <span className="border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">Trang trọng</span>
                                </div>
                                
                                <div className="mb-10">
                                    <h3 className="text-white font-medium mb-4">Tính năng</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 text-gray-300 text-sm font-light">
                                            <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            Tùy chỉnh nội dung
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300 text-sm font-light">
                                            <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            Google Maps
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300 text-sm font-light">
                                            <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                            Ghi tên khách mời
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300 text-sm font-light">
                                            <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            Xác nhận tham dự
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-2 md:pt-0">
                                <p className="text-[#a0a0a0] text-[11px] md:text-xs text-center md:text-left mb-4 font-light leading-relaxed">
                                    Thích mẫu thiệp này? Hãy liên hệ ngay để chúng tôi tùy chỉnh theo ý bạn!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link 
                                        onClick={onClose}
                                        href={`/card/${slug}`}
                                        className="flex-1 bg-[#d4af37] hover:bg-[#b5952f] text-white py-3.5 md:py-4 rounded-xl md:rounded-full font-medium transition-colors flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(255,0,127,0.4)]"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        Xem Full Màn Hình
                                    </Link>
                                    <a 
                                        href="https://zalo.me/0123456789"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 border border-white/20 hover:border-white/50 text-white py-3.5 md:py-4 rounded-xl md:rounded-full font-medium transition-colors flex justify-center items-center gap-2"
                                    >
                                        <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                        Liên hệ thiết kế
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
