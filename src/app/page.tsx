"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollVideoSmooth() {
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
    const ctx = cn.getContext("2d", { alpha: false })!;
    if (!vid || !cn) return;

    // Prepare canvas size
    const resizeCanvas = () => {
      const ar = vid.videoWidth / vid.videoHeight;
      cn.width = window.innerWidth;
      cn.height = window.innerWidth / ar;
    };
    window.addEventListener("resize", resizeCanvas);

    // Draw via requestVideoFrameCallback
    function paint() {
      ctx.clearRect(0, 0, cn.width, cn.height);
      ctx.drawImage(vid, 0, 0, cn.width, cn.height);
      setFrameCbId(vid.requestVideoFrameCallback(paint));
    }

    // On metadata: set height & start frame loop + ScrollTrigger
    const onMeta = () => {
      resizeCanvas();
      // Kick off frame paint
      setFrameCbId(vid.requestVideoFrameCallback(paint));
      // ScrollTrigger scrub
      gsap.to(
        { t: 0 },
        {
          t: vid.duration,
          ease: "none",
          onUpdate() {
            vid.currentTime = this.targets()[0].t;
          },
          scrollTrigger: {
            trigger: container.current!,
            start: "top top",
            end: `+=${vid.duration * window.innerHeight}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        }
      );
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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ willChange: "transform" }}
    >
      <canvas ref={canvas} className="w-full h-full object-contain" />
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
