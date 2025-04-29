"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Register GSAP plugins only on client side
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const onLoaded = () => {
      const dur = video.duration;
      setDuration(dur);

      // Calculate viewport height
      const vh = window.innerHeight;
      const totalHeight = 14 * vh; // 1400vh in pixels

      // Set container height explicitly in pixels to ensure accuracy
      container.style.height = `${totalHeight}px`;

      // Create the scroll trigger animation
      gsap.to(video, {
        currentTime: dur,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          endTrigger: container,
          end: "bottom bottom",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: true,
          onUpdate: (self) => {
            // Ensure we're using the full scroll range
            const progress = Math.min(self.progress, 1);
            const targetTime = dur * progress;
            if (Math.abs(video.currentTime - targetTime) > 0.01) {
              video.currentTime = targetTime;
            }
          },
        },
      });
    };

    if (video.readyState >= 2) {
      onLoaded();
    } else {
      video.addEventListener("loadedmetadata", onLoaded);
    }

    const handleResize = () => {
      if (video.duration) {
        // Recalculate height on resize
        const vh = window.innerHeight;
        const totalHeight = 14 * vh; // 1400vh
        container.style.height = `${totalHeight}px`;
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isClient]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{
        height: "1400vh",
        minHeight: "1400vh",
      }}
    >
      <div className="sticky top-0 w-full h-screen">
        {isClient && (
          <video
            ref={videoRef}
            src="/video/videoNew.webm"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        )}
      </div>
    </div>
  );
}
