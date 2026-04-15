"use client";

import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function FallingPetals() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Particles
                id="tsparticles-petals"
                options={{
                    particles: {
                        number: {
                            value: 60,
                            density: { enable: true, width: 1920, height: 1080 },
                        },
                        // Màu của hoa / cánh hoa (đỏ hồng, hồng nhạt, hồng phấn)
                        color: { value: ["#ff4d6d", "#ff758f", "#ff8fa3", "#c9184a", "#ffb3c1"] },
                        shape: {
                            type: ["circle", "polygon"], // Kết hợp nhiều hình để giống cánh hoa
                            options: {
                                polygon: {
                                    sides: 5, // Cánh hoa 5 cánh or something close
                                }
                            }
                        },
                        opacity: {
                            value: { min: 0.4, max: 0.8 },
                        },
                        size: {
                            value: { min: 4, max: 10 }, 
                        },
                        move: {
                            enable: true,
                            speed: { min: 1, max: 3 }, // Rơi chậm lãng mạn
                            direction: "bottom",
                            random: true,
                            straight: false,
                            outModes: "out", 
                        },
                        wobble: {
                            enable: true,
                            distance: 10,
                            speed: 10,
                        },
                        rotate: {
                            value: { min: 0, max: 360 },
                            animation: { enable: true, speed: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
}