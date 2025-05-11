"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

export default function ScrollVideo() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [frameCbId, setFrameCbId] = useState<number>();
  const lenis = useLenis();

  // Register GSAP plugins
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Disable GSAP ticker lag smoothing for better performance with Lenis
    gsap.ticker.lagSmoothing(0);
  }, []);

  // Apply custom scrolling behavior specifically for this component
  useEffect(() => {
    if (!lenis || !container.current) return;

    // Modify Lenis behavior when this component is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When ScrollVideo is in view, adjust Lenis behavior
            lenis.options.duration = 2;
            lenis.options.wheelMultiplier = 1;
          } else {
            // Reset to default when ScrollVideo is not in view
            lenis.options.duration = 1.2;
            lenis.options.wheelMultiplier = 1;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container.current);

    // Connect Lenis scroll events to ScrollTrigger
    const scrollHandler = () => ScrollTrigger.update();
    lenis.on("scroll", scrollHandler);

    return () => {
      if (container.current) observer.unobserve(container.current);
      observer.disconnect();
      lenis.off("scroll", scrollHandler);

      // Reset Lenis options when component unmounts
      lenis.options.duration = 1.2;
      lenis.options.wheelMultiplier = 1;
    };
  }, [lenis]);

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
        scrub: 0.1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = gsap.utils.clamp(0, 1, self.progress);
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
