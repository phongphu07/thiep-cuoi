"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Greeting({ greeting }: { greeting: string }) {
    return (
        <section className="py-24 text-center px-4 bg-white relative z-10 shadow-sm">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-6 text-pink-600">Lời Ngỏ</h2>
                <div className="w-16 h-0.5 bg-pink-300 mx-auto mb-8"></div>
                <p className="max-w-2xl mx-auto text-gray-600 leading-loose text-lg md:text-xl italic whitespace-pre-wrap">
                    {greeting}
                </p>
            </motion.div>
        </section>
    );
}
