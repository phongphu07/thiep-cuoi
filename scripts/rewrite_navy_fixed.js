const fs = require('fs');

let content = fs.readFileSync('templates/TraditionalTemplate.tsx', 'utf8');

// Do the initial renaming
content = content.replace(/TraditionalTemplate/g, 'NavyTemplate');
content = content.replace(/TraditionalBankPopup/g, 'NavyBankPopup');
content = content.replace(/FloatingHy/g, 'GoldDust');
content = content.replace(/export const THEME_CONFIGS.*?\n};\n/s, '');
content = content.replace(/const theme = THEME_CONFIGS\[cardData\?.theme\] \|\| THEME_CONFIGS\['traditional-red'\];/g, '');

content = content.replace(/\$\{theme\.bgMain\}/g, 'bg-[#001f3f]');
content = content.replace(/\$\{theme\.bgLight\}/g, 'bg-[#00152b]');
content = content.replace(/\$\{theme\.bgBank\}/g, 'bg-[#001f3f]');
content = content.replace(/\$\{theme\.textMain\}/g, 'text-[#d4af37]');
content = content.replace(/\$\{theme\.textAccent\}/g, 'text-[#f8e5a5]');
content = content.replace(/\$\{theme\.borderAccent\}/g, 'border-[#d4af37]');
content = content.replace(/\$\{theme\.textInverse\}/g, 'text-white');
content = content.replace(/\{theme\.icon\}/g, '{"&"}');

content = content.replace(/, theme: any /g, '');
content = content.replace(/ theme=\{theme\} /g, '');

const coverStart = content.indexOf('{/* COVER SCREEN OVERLAY - CINEMATIC SPLIT */}');
const pageStart1 = content.indexOf('{/* ACTUAL PAGE CONTENT */}');
const pageStart = content.indexOf('{/* ACTUAL PAGE CONTENT */}', pageStart1 + 1);

const newCover = `
            {/* COVER SCREEN OVERLAY - ROYAL ELEGANCE */}
            {!isPreview && (
                <AnimatePresence>
                    {!isOpened && (
                        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center pointer-events-none bg-[#001f3f]">
                            <motion.div
                                initial={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="relative z-10 w-full h-full max-w-[480px] pointer-events-auto bg-[#001f3f] border-x-4 border-[#d4af37]"
                            >
                                <div className="absolute inset-4 border-2 border-[#d4af37] pointer-events-none"></div>
                                <div className="absolute inset-5 border border-[#d4af37]/40 pointer-events-none"></div>
                                
                                <div className="relative z-10 text-center px-6 pt-20 pb-12 flex flex-col items-center h-full justify-center">
                                    <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-10 uppercase font-sans">Save the Date</p>
                                    
                                    <div className="w-48 h-48 md:w-56 md:h-56 rotate-45 overflow-hidden border-2 border-[#d4af37] mx-auto mb-16 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                        <img src={cardData?.images?.[0] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"} className="w-[150%] h-[150%] max-w-none object-cover -rotate-45 -translate-x-[15%] -translate-y-[15%]" alt="Couple" />
                                    </div>
                                    
                                    <h1 className="mb-2 flex flex-col items-center leading-tight text-4xl sm:text-5xl font-script text-[#d4af37] drop-shadow-md">
                                        <span>{cardData?.groom?.split(' ').slice(-2).join(' ') || 'Gia Khánh'}</span>
                                        <span className="text-2xl my-2">{"&"}</span>
                                        <span>{cardData?.bride?.split(' ').slice(-2).join(' ') || 'Quỳnh Anh'}</span>
                                    </h1>
                                    
                                    <p className="text-[#d4af37] text-sm font-sans tracking-[0.2em] mt-8 mb-12 opacity-90 uppercase">
                                        {cardData?.date || '01 . 06 . 2026'}
                                    </p>
                                    
                                    <motion.button
                                        onClick={handleOpen}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 uppercase tracking-widest text-xs font-bold transition-all duration-500 bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#001f3f]"
                                    >
                                        Mở thiệp
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            )}
`;

content = content.substring(0, coverStart) + newCover + content.substring(pageStart1);

// RECOMPUTE indices on the modified content
const infoSection = content.indexOf('{/* Section: Thông tin Lễ cưới */}');
const pageStart2 = content.indexOf('{/* ACTUAL PAGE CONTENT */}', content.indexOf(newCover) + newCover.length);

const newPageHeader = `
                {/* ACTUAL PAGE CONTENT */}
                <div className="relative w-full">
                    {/* Royal Header */}
                    <div className="relative w-full bg-[#001f3f] flex flex-col items-center pt-20 pb-16 px-6 border-b border-[#d4af37]/30">
                        <div className="absolute inset-2 border border-[#d4af37]/40 pointer-events-none"></div>
                        
                        <p className="text-[#d4af37] text-[10px] tracking-[0.4em] uppercase mb-10 font-sans">Welcome to our wedding</p>
                        
                        <div className="relative w-64 h-72 mb-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                            <img src={cardData?.images?.[0] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"} className="w-full h-full object-cover" alt="Couple" />
                            <div className="absolute inset-0 border-4 border-[#d4af37]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                        </div>
                        
                        <div className="flex flex-col items-center w-full text-[#d4af37]">
                            <p className="text-4xl font-script mb-2">{groomShort}</p>
                            <span className="text-xl mb-2">{"&"}</span>
                            <p className="text-4xl font-script mb-8">{brideShort}</p>
                        </div>
                    </div>
`;

content = content.substring(0, pageStart2) + newPageHeader + content.substring(infoSection);

content = content.replace(/bg-\[\#fdfaf6\]/g, 'bg-[#00152b]');
content = content.replace(/bg-white/g, 'bg-[#001f3f]');
content = content.replace(/border-\[\#800000\]/g, 'border-[#d4af37]');
content = content.replace(/bg-\[\#eaddce\]/g, 'bg-[#00152b]');

// fix unescaped ampersand
content = content.replace(/>&</g, '>{"&"}<');

fs.writeFileSync('templates/NavyTemplate.tsx', content);
console.log('Done rewriting');
