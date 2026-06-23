const fs = require('fs');

let content = fs.readFileSync('templates/NavyTemplate.tsx', 'utf8');

// 1. Replace the Red Envelope
const envStartStr = '{/* Red Envelope */}';
const envEndStr = '</div>\n                    </div>\n\n                    <div className="py-16 text-center mt-10 relative overflow-hidden bg-[#001f3f] text-[#ffeed2]">';
const envStartIndex = content.indexOf(envStartStr);
const envEndIndex = content.indexOf(envEndStr);

if (envStartIndex !== -1 && envEndIndex !== -1) {
    const newEnvelope = `{/* Navy Envelope */}
                    <div className="py-16 text-center relative overflow-hidden">
                        <h3 className="text-[#d4af37] font-bold tracking-[0.2em] uppercase text-sm font-sans mb-12">PHONG BAO MỪNG CƯỚI</h3>

                        <div
                            className="relative inline-block cursor-pointer group mt-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                                stopAutoScroll();
                                setShowBankDetails(true);
                            }}
                        >
                            <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>

                            <motion.div
                                whileHover={{ y: -10 }}
                                className="relative z-10 w-64 h-40 bg-[#00152b] rounded-sm shadow-2xl flex items-center justify-center border border-[#d4af37]/30 cursor-pointer overflow-hidden"
                            >
                                {/* Envelope Flaps */}
                                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-[#d4af37]/20"></div>
                                <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(135deg, transparent 49%, rgba(212, 175, 55, 0.2) 50%, transparent 51%)' }}></div>
                                <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(-135deg, transparent 49%, rgba(212, 175, 55, 0.2) 50%, transparent 51%)' }}></div>

                                {/* Wax Seal */}
                                <div className="absolute w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                                     style={{ background: 'radial-gradient(circle at 30% 30%, #ffd700, #b8860b, #8b6508)' }}>
                                    <span className="text-[#fff8e7] font-serif font-bold text-xl drop-shadow-md opacity-90">{"&"}</span>
                                    {/* inner circle */}
                                    <div className="absolute inset-1 border border-[#fff8e7]/30 rounded-full"></div>
                                </div>
                            </motion.div>

                            <p className="mt-8 text-xs text-[#d4af37]/60 font-sans tracking-widest uppercase transition-opacity">Nhấn để mở</p>
                        </div>
                    </div>

                    <div className="py-16 text-center mt-10 relative overflow-hidden bg-[#001f3f] text-[#ffeed2]">`;
    content = content.substring(0, envStartIndex) + newEnvelope + content.substring(envEndIndex + envEndStr.length);
}

// 2. Replace Timeline Section
const timelineStartStr = '{/* Timeline Section */}';
const timelineEndStr = '</div>\n                    </div>\n\n                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">';
const timelineStartIndex = content.indexOf(timelineStartStr);
const timelineEndIndex = content.indexOf(timelineEndStr);

if (timelineStartIndex !== -1 && timelineEndIndex !== -1) {
    const newTimeline = `{/* Timeline Section */}
                    <div className="py-20 text-center bg-[#fdfaf6]">
                        <h3 className="text-[#001f3f] font-bold tracking-[0.2em] uppercase text-sm font-sans mb-16">Lịch trình ngày cưới</h3>

                        <div className="max-w-2xl mx-auto px-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[28px] sm:left-1/2 top-4 bottom-4 w-[1px] bg-[#d4af37]/40 sm:-translate-x-1/2 z-0"></div>

                            {[
                                { time: "17:30", text: "Đón khách", desc: "Chụp ảnh lưu niệm cùng Cô Dâu Chú Rể" },
                                { time: "18:30", text: "Khai tiệc", desc: "Mời quý khách ổn định chỗ ngồi" },
                                { time: "18:45", text: "Nghi thức", desc: "Cắt bánh, rót rượu mừng" },
                                { time: "19:00", text: "Dùng tiệc", desc: "Thưởng thức ẩm thực và âm nhạc" },
                                { time: "21:00", text: "Kết thúc", desc: "Cảm ơn và tiễn khách" }
                            ].map((item, idx) => (
                                <div key={idx} className={\`flex flex-col sm:flex-row items-start sm:items-center w-full mb-10 relative z-10 \${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}\`}>
                                    
                                    {/* Timeline Node */}
                                    <div className="absolute left-[20px] sm:left-1/2 w-4 h-4 rounded-full bg-[#fdfaf6] border-2 border-[#d4af37] sm:-translate-x-1/2 flex items-center justify-center mt-1 sm:mt-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#001f3f]"></div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={\`w-full sm:w-[calc(50%-40px)] pl-14 sm:pl-0 \${idx % 2 === 0 ? 'sm:pl-10 text-left' : 'sm:pr-10 sm:text-right'}\`}>
                                        <div className="bg-white p-5 rounded-lg shadow-sm border border-[#d4af37]/20 hover:shadow-md transition-shadow">
                                            <span className="text-[#d4af37] font-bold text-xl font-serif block mb-1">{item.time}</span>
                                            <h4 className="text-[#001f3f] font-bold text-sm font-sans uppercase tracking-widest mb-2">{item.text}</h4>
                                            <p className="text-[#001f3f]/60 text-xs font-serif italic">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">`;
    content = content.substring(0, timelineStartIndex) + newTimeline + content.substring(timelineEndIndex + timelineEndStr.length);
}

// 3. Replace Album Section
const albumStartStr = '{/* Section: Album ảnh cưới */}';
const albumEndStr = '</div>\n                    </div>\n\n                    {/* Lightbox Gallery Render */}';
const albumStartIndex = content.indexOf(albumStartStr);
const albumEndIndex = content.indexOf(albumEndStr);

if (albumStartIndex !== -1 && albumEndIndex !== -1) {
    const newAlbum = `{/* Section: Album ảnh cưới */}
                    <div className="w-full bg-[#001f3f] py-3 text-center shadow-md">
                        <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm font-sans">Album ảnh cưới</h3>
                    </div>

                    {/* Editorial Grid Gallery Area */}
                    <div className="w-full max-w-4xl mx-auto py-16 px-4 cursor-pointer" onClick={() => { setIsLightboxOpen(true); stopAutoScroll(); }}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                            {/* Large Image */}
                            <div className="col-span-2 row-span-2 overflow-hidden rounded-sm group relative">
                                <img src={cardData?.images?.[0]?.src || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"} className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                                <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/20 transition-colors duration-300"></div>
                            </div>
                            
                            {/* Small Image 1 */}
                            <div className="overflow-hidden rounded-sm group relative">
                                <img src={cardData?.images?.[1]?.src || "https://images.unsplash.com/photo-1544078755-9a8449c2eb06?auto=format&fit=crop&q=80"} className="w-full h-full object-cover aspect-[4/5] md:aspect-square group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                                <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/20 transition-colors duration-300"></div>
                            </div>
                            
                            {/* Small Image 2 */}
                            <div className="overflow-hidden rounded-sm group relative">
                                <img src={cardData?.images?.[2]?.src || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80"} className="w-full h-full object-cover aspect-[4/5] md:aspect-square group-hover:scale-105 transition-transform duration-700" alt="Gallery" />
                                <div className="absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/20 transition-colors duration-300 flex items-center justify-center">
                                    <span className="text-white font-serif italic text-sm opacity-0 group-hover:opacity-100 transition-opacity">Xem thêm +</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lightbox Gallery Render */}`;
    content = content.substring(0, albumStartIndex) + newAlbum + content.substring(albumEndIndex + albumEndStr.length);
}

fs.writeFileSync('templates/NavyTemplate.tsx', content);
console.log('Successfully redesigned NavyTemplate');
