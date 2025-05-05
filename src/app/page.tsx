"use client";

import { MainLayout } from "./components/layout/MainLayout";
import ScrollVideo from "./components/ScrollVideo";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <MainLayout>
          <ScrollVideo />
        </MainLayout>
      </SmoothScroll>
    </>
  );
}
