"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BankDetails() {
    // Mock user banks
    const banks = [
        { owner: "Nguyễn Thanh Tùng", number: "123456789", bank: "Vietcombank", qr: "https://api.vietqr.io/image/970436-123456789-j41Z0PZ.jpg?accountName=NGUYEN%20THANH%20TUNG&amount=500000" },
        { owner: "Trần Hồng Lan", number: "987654321", bank: "MB Bank", qr: "https://api.vietqr.io/image/970422-987654321-c4n3B8G.jpg?accountName=TRAN%20HONG%20LAN&amount=500000" }
    ];

    const [copied, setCopied] = useState<number | null>(null);

    const handleCopy = (number: string, idx: number) => {
        navigator.clipboard.writeText(number);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section className="py-24 px-4 bg-white relative z-10 w-full border-t border-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 tracking-wide mb-4">Hộp Mừng Cưới</h2>
                <div className="w-16 h-0.5 bg-pink-300 mx-auto mb-8"></div>
                <p className="text-gray-500 mb-12 leading-relaxed font-light italic max-w-xl mx-auto px-4">
                    Tình cảm và sự yêu thương của bạn chính là món quà quý giá nhất dành cho chúng mình. Xin chân thành cảm ơn!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 px-2">
                    {banks.map((b, idx) => (
                        <div key={idx} className="bg-white p-8 py-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-pink-50 flex flex-col items-center">
                            <p className="font-serif text-xl tracking-wide text-gray-800 mb-2">Đến {idx === 0 ? "Chú Rể" : "Cô Dâu"}</p>
                            <p className="text-xs text-pink-500 mb-8 uppercase tracking-[0.2em]">{b.owner}</p>
                            
                            <div className="w-48 h-48 bg-white p-2 rounded-2xl mb-8 border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-500 cursor-pointer">
                                <img src={b.qr} alt="Mã QR" className="w-full h-full object-cover rounded-xl" />
                            </div>

                            <div className="w-full flex justify-between items-center bg-[#fcfbf9] px-4 py-3 rounded-xl border border-gray-100">
                                <div className="text-left">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{b.bank}</p>
                                    <p className="text-lg font-medium text-gray-700 tracking-wider mt-1">{b.number}</p>
                                </div>
                                <button 
                                    onClick={() => handleCopy(b.number, idx)}
                                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${copied === idx ? 'bg-pink-100 text-pink-600' : 'bg-white border border-gray-200 text-gray-500 hover:border-pink-200 hover:text-pink-500 shadow-sm'}`}
                                >
                                    {copied === idx ? 'Đã Chép' : 'Sao chép'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
