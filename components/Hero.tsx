"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
    groom: string;
    bride: string;
    date: string;
}

export default function Hero({ groom, bride, date }: HeroProps) {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Background Image */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')" }}
            >
                {/* Một lớp phủ ấm áp và sang trọng hơn */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
            </motion.div>

            {/* Nội dung chữ */}
            <div className="relative z-10 text-center space-y-8 px-4">
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="uppercase tracking-[0.4em] text-sm md:text-md text-pink-200"
                >
                    Sự kiện trọng đại
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-white drop-shadow-2xl"
                    style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.5)" }}
                >
                    {groom} <span className="text-4xl md:text-6xl text-pink-300 mx-2">&</span> {bride}
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80px" }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="h-[2px] bg-pink-300 mx-auto my-6"
                ></motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="text-2xl md:text-3xl font-light italic tracking-widest text-[#f9f4f0]"
                >
                    {date}
                </motion.p>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ opacity: { delay: 2, duration: 1 }, y: { repeat: Infinity, duration: 1.5 } }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <div className="w-[1px] h-12 bg-white/50 mb-2"></div>
                <p className="text-white/70 text-xs tracking-[0.3em] uppercase">Kéo xuống</p>
            </motion.div>
        </section>
    );
}