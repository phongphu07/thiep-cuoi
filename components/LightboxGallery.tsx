"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxGalleryProps {
    images: { src: string }[];
    initialIndex?: number;
    onClose: () => void;
}

export default function LightboxGallery({ images, initialIndex = 0, onClose }: LightboxGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    const getIndex = (offset: number) => {
        return (currentIndex + offset + images.length) % images.length;
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#151515] flex flex-col items-center justify-center select-none"
        >
            {/* Top Bar */}
            <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex justify-between items-center z-50">
                <div className="bg-black/40 text-white/80 px-4 py-2 rounded-full text-sm font-sans tracking-widest backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>
                <button 
                    onClick={onClose}
                    className="w-10 h-10 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            {/* Main Carousel Area */}
            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden perspective-[1000px]">
                {/* Previous Image Hint */}
                <div 
                    className="absolute left-0 sm:left-10 md:left-20 h-[50vh] sm:h-[60vh] aspect-[3/4] opacity-30 blur-[2px] scale-90 cursor-pointer hover:opacity-50 transition-opacity z-10 hidden sm:block"
                    onClick={handlePrev}
                >
                    <img src={images[getIndex(-1)].src} className="w-full h-full object-cover rounded-xl" alt="Prev" />
                </div>

                {/* Current Image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-20 w-[85vw] max-w-[400px] sm:max-w-[450px] max-h-[70vh] aspect-[3/4] sm:aspect-auto shadow-2xl"
                    >
                        <img 
                            src={images[currentIndex].src} 
                            className="w-full h-full object-contain rounded-2xl bg-black/20" 
                            alt={`Gallery ${currentIndex}`} 
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Next Image Hint */}
                <div 
                    className="absolute right-0 sm:right-10 md:right-20 h-[50vh] sm:h-[60vh] aspect-[3/4] opacity-30 blur-[2px] scale-90 cursor-pointer hover:opacity-50 transition-opacity z-10 hidden sm:block"
                    onClick={handleNext}
                >
                    <img src={images[getIndex(1)].src} className="w-full h-full object-cover rounded-xl" alt="Next" />
                </div>

                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrev}
                    className="absolute left-4 sm:left-[20%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 text-white/60 hover:text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <svg className="w-8 h-8 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button 
                    onClick={handleNext}
                    className="absolute right-4 sm:right-[20%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 text-white/60 hover:text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <svg className="w-8 h-8 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            {/* Bottom Thumbnails */}
            <div className="w-full h-24 sm:h-32 bg-black/20 backdrop-blur-md flex items-center justify-center gap-2 sm:gap-3 px-4 overflow-x-auto overflow-y-hidden custom-scrollbar pb-2">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative shrink-0 transition-all duration-300 rounded-lg overflow-hidden ${
                            currentIndex === idx 
                            ? 'w-16 h-16 sm:w-20 sm:h-20 border-2 border-red-800 scale-110 z-10 shadow-[0_0_15px_rgba(128,0,0,0.8)]' 
                            : 'w-14 h-14 sm:w-16 sm:h-16 border-2 border-transparent opacity-50 hover:opacity-100'
                        }`}
                    >
                        <img src={img.src} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
