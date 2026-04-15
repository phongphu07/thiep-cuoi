"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer({ groom, bride, slug }: { groom: string, bride: string, slug: string }) {
    return (
        <footer className="py-16 bg-white text-center relative z-10 border-t border-gray-100">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <p className="font-serif text-4xl md:text-5xl text-gray-800 mb-6 italic tracking-wide">
                    {groom} <span className="text-pink-300 mx-2">&</span> {bride}
                </p>
                <div className="w-16 h-[1px] bg-pink-200 mx-auto mb-6"></div>
                <p className="text-sm font-light tracking-[0.2em] text-gray-400 uppercase mb-2">Thank You</p>
                <p className="text-xs text-gray-300">Wedding ID: {slug}</p>
            </motion.div>
        </footer>
    );
}
