"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RusticTemplate({ cardData, slug }: { cardData: any, slug: string }) {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    const [copied, setCopied] = useState<number | null>(null);
    const [rsvp, setRsvp] = useState<"attending" | "not_attending" | null>(null);

    const handleCopy = (number: string, idx: number) => {
        navigator.clipboard.writeText(number);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <main className="bg-[#f0ece1] min-h-screen text-[#3e3b32] font-sans selection:bg-[#5e6b52] selection:text-white overflow-hidden">
            
            {/* 1. HERO SECTION - Asymmetrical Editorial */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="z-10 mt-10 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-[8rem] font-serif italic tracking-tighter leading-[0.8] text-[#2c2a25]">
                            {cardData.groom}
                        </h1>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="my-4 md:my-8 ml-12 md:ml-32 flex items-center gap-4"
                    >
                        <span className="block w-16 md:w-32 h-[1px] bg-[#8c8273]"></span>
                        <span className="font-light tracking-[0.3em] uppercase text-xs md:text-sm text-[#8c8273]">{cardData.date}</span>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        className="ml-8 md:ml-48"
                    >
                        <h1 className="text-6xl md:text-[8rem] font-serif italic tracking-tighter leading-[0.8] text-[#2c2a25]">
                            {cardData.bride}
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Hero Image overlapping */}
                {cardData.images && cardData.images[0] && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                        className="absolute right-0 bottom-0 w-3/4 md:w-1/2 h-[60vh] md:h-[80vh] rounded-tl-full overflow-hidden shadow-2xl z-0"
                    >
                        <img 
                            src={cardData.images[0].src} 
                            alt="Hero" 
                            className="w-full h-full object-cover object-center grayscale-[20%] sepia-[10%]"
                        />
                        <div className="absolute inset-0 bg-[#5e6b52]/10 mix-blend-overlay"></div>
                    </motion.div>
                )}
            </section>

            {/* 2. THE STORY / GREETING */}
            <section className="py-32 px-6 max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                >
                    <svg className="w-8 h-8 md:w-12 md:h-12 mx-auto text-[#8c8273] mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xl md:text-3xl font-serif text-[#4a473f] leading-relaxed italic px-4">
                        {cardData.greeting}
                    </p>
                </motion.div>
            </section>

            {/* 3. EDITORIAL GALLERY */}
            <section className="py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                    {/* Ảnh 2: Thon dài */}
                    {cardData.images && cardData.images[1] && (
                        <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="md:col-span-5 h-[80vh] rounded-xl overflow-hidden shadow-xl"
                        >
                            <img src={cardData.images[1].src} className="w-full h-full object-cover grayscale-[10%]" />
                        </motion.div>
                    )}
                    
                    <div className="md:col-span-7 space-y-8 md:space-y-16">
                        {/* Ảnh 3 */}
                        {cardData.images && cardData.images[2] && (
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-[40vh] md:h-[50vh] rounded-xl overflow-hidden shadow-md ml-12 md:ml-24"
                            >
                                <img src={cardData.images[2].src} className="w-full h-full object-cover" />
                            </motion.div>
                        )}
                        {/* Ảnh 4 */}
                        {cardData.images && cardData.images[3] && (
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="h-[40vh] rounded-xl overflow-hidden shadow-md mr-12 md:mr-24"
                            >
                                <img src={cardData.images[3].src} className="w-full h-full object-cover" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. DETAILS - DEEP GREEN BLOCK FOR CONTRAST */}
            <section className="mt-20 py-32 bg-[#424d38] text-[#f0ece1] rounded-t-[3rem] shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)] relative z-20">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
                    
                    {/* RSVP Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-serif italic mb-2">Hồi Âm</h2>
                        <div className="w-12 h-[1px] bg-[#9ca98a] mb-8"></div>
                        <p className="text-[#c1cbb1] mb-8 font-light italic">Mong bạn bớt chút thời gian báo lại để chúng mình chuẩn bị được tốt nhất.</p>
                        
                        <form className="space-y-6">
                            <input type="text" placeholder="Tên của bạn..." className="w-full bg-transparent border-b border-[#738260] py-3 text-[#f0ece1] placeholder-[#9ca98a] focus:outline-none focus:border-[#c1cbb1] transition-colors" />
                            
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setRsvp('attending')} className={`flex-1 py-3 border rounded text-sm transition-colors ${rsvp === 'attending' ? 'bg-[#f0ece1] text-[#424d38] border-[#f0ece1]' : 'border-[#738260] text-[#c1cbb1] hover:border-[#9ca98a]'}`}>Chắc chắn đến</button>
                                <button type="button" onClick={() => setRsvp('not_attending')} className={`flex-1 py-3 border rounded text-sm transition-colors ${rsvp === 'not_attending' ? 'bg-[#f0ece1]/10 text-white border-[#f0ece1]' : 'border-[#738260] text-[#c1cbb1] hover:border-[#9ca98a]'}`}>Xin lỗi mình bận</button>
                            </div>
                            
                            <textarea placeholder="Gửi gắm lời chúc..." className="w-full bg-transparent border-b border-[#738260] py-3 text-[#f0ece1] placeholder-[#9ca98a] focus:outline-none focus:border-[#c1cbb1] transition-colors h-24 resize-none"></textarea>
                            
                            <button type="submit" className="w-full bg-[#8c9c76] hover:bg-[#a6b68f] text-[#3e3b32] py-4 rounded font-serif italic text-lg transition-colors">
                                Gửi Lời Chúc
                            </button>
                        </form>
                    </motion.div>

                    {/* Bank / Vault */}
                    {cardData.banks && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-serif italic mb-2">Lời Bờ Vai</h2>
                            <div className="w-12 h-[1px] bg-[#9ca98a] mb-8"></div>
                            
                            <div className="space-y-8">
                                {cardData.banks.map((b: any, idx: number) => (
                                    <div key={idx} className="bg-[#4d5942] p-8 rounded-xl border border-[#647155] shadow-inner flex flex-col xl:flex-row items-center gap-8">
                                        <div className="w-32 h-32 bg-white p-2 rounded-lg shrink-0">
                                            <img src={b.qr} alt="QR Code" className="w-full h-full object-cover rounded" />
                                        </div>
                                        <div className="text-left w-full">
                                            <p className="text-[#c1cbb1] text-xs uppercase tracking-widest mb-1">{b.bank}</p>
                                            <p className="text-2xl font-serif text-[#f0ece1] mb-2">{b.number}</p>
                                            <p className="text-sm italic text-[#9ca98a] mb-4">{b.owner}</p>
                                            
                                            <button 
                                                onClick={() => handleCopy(b.number, idx)}
                                                className="uppercase tracking-widest text-xs border border-[#8c9c76] px-4 py-2 rounded text-[#c1cbb1] hover:bg-[#8c9c76] hover:text-[#3e3b32] transition-colors"
                                            >
                                                {copied === idx ? 'Đã Chép Xong' : 'Chép Số'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>
                
                {/* Footer */}
                <div className="mt-32 border-t border-[#647155] pt-12 pb-8 text-center text-[#9ca98a]">
                    <p className="text-6xl font-serif italic text-[#647155] mb-4">Amore</p>
                    <p className="text-xs tracking-[0.3em] uppercase">Wedding Collection by {slug}</p>
                </div>
            </section>
            
        </main>
    );
}
