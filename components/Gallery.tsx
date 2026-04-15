"use client";

import React from "react";
import { motion } from "framer-motion";

interface ImageItem {
    src: string;
    aspect: string;
    delay: number;
}

export default function Gallery({ images }: { images: ImageItem[] }) {
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