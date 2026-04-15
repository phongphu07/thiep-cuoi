"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RSVPForm() {
    const [status, setStatus] = useState<"attending" | "not_attending" | null>(null);

    return (
        <section className="py-24 px-4 bg-[#fcfbf9] relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-2xl mx-auto text-center"
            >
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 tracking-wide mb-4">Gửi Lời Chúc</h2>
                <div className="w-16 h-0.5 bg-pink-300 mx-auto mb-8"></div>
                <p className="text-gray-500 mb-12 leading-relaxed font-light italic px-4">
                    Sự xác nhận của bạn giúp chúng mình có thêm thời gian chuẩn bị chu đáo nhất!
                </p>

                <form className="bg-white p-8 md:p-14 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-pink-50 text-left space-y-8 mx-2">
                    <div>
                        <label className="block text-gray-700 font-serif text-lg mb-2">Tên của bạn</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-300 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-sm font-light" placeholder="Nguyễn Văn A" required />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-serif text-lg mb-4">Bạn sẽ tới dự chứ?</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setStatus('attending')}
                                className={`flex-1 py-4 rounded-xl border transition-all text-sm font-medium ${status === 'attending' ? 'bg-pink-50 text-pink-600 border-pink-200 shadow-inner' : 'bg-white text-gray-500 border-gray-200 hover:border-pink-100 hover:bg-gray-50'}`}
                            >
                                Mình sẽ tham dự
                            </button>
                            <button
                                type="button"
                                onClick={() => setStatus('not_attending')}
                                className={`flex-1 py-4 rounded-xl border transition-all text-sm font-medium ${status === 'not_attending' ? 'bg-gray-100 text-gray-600 border-gray-300 shadow-inner' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                            >
                                Gửi lời cáo lỗi
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-serif text-lg mb-2">Lời chúc ngọt ngào</label>
                        <textarea className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-pink-300 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-sm font-light h-32 resize-none" placeholder="Chúc hai bạn trăm năm hạnh phúc..."></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 mt-4 bg-pink-600 text-white rounded-xl font-medium tracking-widest shadow-lg hover:bg-pink-700 hover:shadow-xl transition-all duration-300 uppercase text-xs">
                        Gửi Phản Hồi
                    </button>
                </form>
            </motion.div>
        </section>
    );
}
