"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollVideo() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [frameCbId, setFrameCbId] = useState<number>();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useLayoutEffect(() => {
    const vid = video.current!;
    const cn = canvas.current!;
    const ctx = cn.getContext("2d", { alpha: true })!;
    if (!vid || !cn) return;

    // Resize canvas to match video aspect ratio
    const resizeCanvas = () => {
      const ar = vid.videoWidth / vid.videoHeight;
      cn.width = window.innerWidth;
      cn.height = window.innerWidth / ar;
      // Set background color based on theme
      ctx.fillStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--background");
      ctx.fillRect(0, 0, cn.width, cn.height);
    };
    window.addEventListener("resize", resizeCanvas);

    // Paint loop using requestVideoFrameCallback
    function paint() {
      ctx.clearRect(0, 0, cn.width, cn.height);
      ctx.drawImage(vid, 0, 0, cn.width, cn.height);
      setFrameCbId(vid.requestVideoFrameCallback(paint));
    }

    // Once metadata is ready, start painting and create ScrollTrigger
    const onMeta = () => {
      resizeCanvas();
      setFrameCbId(vid.requestVideoFrameCallback(paint));

      ScrollTrigger.create({
        trigger: container.current!,
        start: "top top",
        end: `+=${vid.duration * window.innerHeight}`,
        scrub: 0.1, // Much faster scrub for more responsive feel
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Use a more aggressive easing for faster response
          const progress = gsap.utils.clamp(0, 1, self.progress);
          // Add a small threshold to prevent frame drops at the end
          if (progress > 0.99) {
            vid.currentTime = vid.duration;
          } else if (progress < 0.01) {
            vid.currentTime = 0;
          } else {
            vid.currentTime = progress * vid.duration;
          }
        },
      });
    };

    vid.addEventListener("loadedmetadata", onMeta);
    if (vid.readyState >= 2) onMeta();

    return () => {
      vid.cancelVideoFrameCallback(frameCbId!);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={container}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ willChange: "transform" }}
      data-scroll-video
    >
      <canvas ref={canvas} className="w-full h-full object-cover" />
      <video
        ref={video}
        src="/video/videoNew.webm"
        muted
        playsInline
        preload="auto"
        className="hidden"
      />
    </div>
  );
}
