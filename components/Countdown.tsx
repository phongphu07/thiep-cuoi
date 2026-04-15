"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const timeBlocks = [
        { label: "Ngày", value: timeLeft.days },
        { label: "Giờ", value: timeLeft.hours },
        { label: "Phút", value: timeLeft.minutes },
        { label: "Giây", value: timeLeft.seconds },
    ];

    return (
        <section className="py-24 bg-white text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-14"
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 tracking-wider">Cùng Đếm Ngược</h2>
                <div className="w-12 h-[1px] bg-gray-400 mx-auto mt-6"></div>
            </motion.div>

            <div className="flex justify-center gap-6 md:gap-12 px-4 flex-wrap">
                {timeBlocks.map((block, index) => (
                    <motion.div
                        key={block.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center justify-center w-20 h-20 md:w-32 md:h-32 border-[1px] border-gray-300 rounded-full bg-white shadow-sm"
                    >
                        <span className="text-3xl md:text-4xl font-light text-gray-800 tracking-widest">{String(block.value).padStart(2, '0')}</span>
                        <span className="text-[10px] md:text-xs text-gray-500 uppercase mt-2 tracking-[0.2em]">{block.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}