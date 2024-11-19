"use client";
import React, { Suspense, useEffect, useState } from "react";
import type { Metadata } from "next";
import "@styles/scss/main.scss";
import TopBar from "@widgets/Dashboard/components/TopBar";
import SideBar from "@widgets/Dashboard/components/SideBar";
import { auth } from "../../config/firebaseConfig";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardLyout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoaded && auth.currentUser && (
        <div className="flex flex-row">
          <SideBar />
          <div className="flex flex-col">
            <TopBar />
            <main className="min-h-[110vh] h-auto rounded-[5px] pt-[17vh] pl-[17vw] pr-[2vw] pb-[1vw] w-[99.5vw] flex items-center justify-center bg-azure-50 ">
              <Suspense fallback={<div className="w-full h-full">loading...</div>}>
                <div className="w-full h-full">{children}</div>
              </Suspense>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
