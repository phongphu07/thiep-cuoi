"use client";

import { use } from 'react';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import Gallery from '@/components/Gallery';
import FallingPetals from '@/components/FallingPetals';
import Fireworks from '@/components/Fireworks';
import RSVPForm from '@/components/RSVPForm';
import BankDetails from '@/components/BankDetails';
import { motion } from 'framer-motion';

export default function WeddingCard({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    // Mock data
    const mockData = {
        groom: "Thanh Tùng",
        bride: "Hồng Lan",
        date: "20.10.2026",
        fullDate: "2026-10-20T09:00:00",
    };

    return (
        <main className="bg-[#f9f4f0] min-h-screen font-sans relative overflow-hidden">
            {/* Hiệu ứng cánh hoa rơi */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <FallingPetals />
            </div>
            
            {/* Pháo hoa */}
            <div className="fixed inset-0 z-30 pointer-events-none">
                <Fireworks />
            </div>

            {/* 1. Phần ảnh bìa lớn */}
            <div className="relative z-10">
                <Hero
                    groom={mockData.groom}
                    bride={mockData.bride}
                    date={mockData.date}
                />
            </div>

            {/* 2. Lời ngỏ */}
            <section className="py-24 text-center px-4 bg-white relative z-10 shadow-sm">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-6 text-pink-600">Lời Ngỏ</h2>
                    <div className="w-16 h-0.5 bg-pink-300 mx-auto mb-8"></div>
                    <p className="max-w-2xl mx-auto text-gray-600 leading-loose text-lg md:text-xl italic">
                        "Tình yêu không làm cho thế giới quay vòng. Tình yêu là những gì làm cho chuyến đi đáng giá."
                    </p>
                    <p className="max-w-xl mx-auto mt-6 text-gray-500 leading-relaxed font-light">
                        Sự hiện diện của bạn là món quà tuyệt vời nhất dành cho chúng mình trong ngày trọng đại này. Xin chân thành cảm ơn vì đã là một phần trong câu chuyện của chúng mình!
                    </p>
                </motion.div>
            </section>

            {/* 3. Đồng hồ đếm ngược */}
            <div className="relative z-10">
                <Countdown targetDate={mockData.fullDate} />
            </div>

            {/* 4. Album ảnh */}
            <div className="relative z-10">
                <Gallery />
            </div>

            {/* 5. Gửi lời xác nhận tham dự */}
            <RSVPForm />

            {/* 6. Hộp quà / Mừng cưới */}
            <BankDetails />

            {/* 7. Footer */}
            <footer className="py-16 bg-white text-center relative z-10 border-t border-gray-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="font-serif text-4xl md:text-5xl text-gray-800 mb-6 italic tracking-wide">
                        {mockData.groom} <span className="text-pink-300 mx-2">&</span> {mockData.bride}
                    </p>
                    <div className="w-16 h-[1px] bg-pink-200 mx-auto mb-6"></div>
                    <p className="text-sm font-light tracking-[0.2em] text-gray-400 uppercase mb-2">Thank You</p>
                    <p className="text-xs text-gray-300">Wedding ID: {slug}</p>
                </motion.div>
            </footer>
        </main>
    );
}