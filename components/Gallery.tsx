"use client";

import React from "react";
import { motion } from "framer-motion";

const images = [
    // Thay đổi xen kẽ aspect ratio để tạo Masonry đẹp
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80", aspect: "aspect-[3/4]", delay: 0 },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80", aspect: "aspect-square", delay: 0.1 },
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80", aspect: "aspect-[4/5]", delay: 0.2 },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80", aspect: "aspect-video", delay: 0.3 },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80", aspect: "aspect-square", delay: 0.4 },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80", aspect: "aspect-[3/4]", delay: 0.5 },
];

export default function Gallery() {
    return (
        <section className="py-24 bg-[#f9f4f0] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4 tracking-wide">Khoảnh Khắc</h2>
                <div className="w-16 h-0.5 bg-pink-300 mx-auto"></div>
                <p className="mt-4 text-gray-500 font-light italic max-w-lg mx-auto">Lưu giữ lại những kỉ niệm đẹp nhất trong ngày trọng đại của chúng mình.</p>
            </motion.div>

            {/* Masonry Layout sử dụng CSS Columns */}
            <div className="max-w-6xl mx-auto columns-2 md:columns-3 gap-6 space-y-6">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.6, delay: img.delay, ease: "easeOut" }}
                        className="break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative group"
                    >
                        <img
                            src={img.src}
                            alt={`Wedding moment ${index}`}
                            className={`w-full ${img.aspect} object-cover transform transition-transform duration-700 group-hover:scale-105`}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}