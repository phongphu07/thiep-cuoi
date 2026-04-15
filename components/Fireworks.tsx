"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Fireworks() {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // Kích hoạt pháo hoa từ 2 bên màn hình
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#ff0000', '#ffc0cb', '#ffd700', '#ff69b4']
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#ff0000', '#ffc0cb', '#ffd700', '#ff69b4']
                })
            );
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return null;
}
