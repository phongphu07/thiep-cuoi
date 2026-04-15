"use client";

import React from 'react';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import Gallery from '@/components/Gallery';
import FallingPetals from '@/components/FallingPetals';
import Fireworks from '@/components/Fireworks';
import RSVPForm from '@/components/RSVPForm';
import BankDetails from '@/components/BankDetails';
import Greeting from '@/components/Greeting';
import Footer from '@/components/Footer';

export default function LuxuryTemplate({ cardData, slug }: { cardData: any, slug: string }) {
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
                    groom={cardData.groom}
                    bride={cardData.bride}
                    date={cardData.date}
                />
            </div>

            {/* 2. Lời ngỏ */}
            <Greeting greeting={cardData.greeting} />

            {/* 3. Đồng hồ đếm ngược */}
            <div className="relative z-10">
                <Countdown targetDate={cardData.fullDate} />
            </div>

            {/* 4. Album ảnh */}
            <div className="relative z-10">
                <Gallery images={cardData.images} />
            </div>

            {/* 5. Gửi lời xác nhận tham dự */}
            <RSVPForm />

            {/* 6. Hộp quà / Mừng cưới */}
            <BankDetails banks={cardData.banks} />

            {/* 7. Footer */}
            <Footer groom={cardData.groom} bride={cardData.bride} slug={slug} />
        </main>
    );
}
