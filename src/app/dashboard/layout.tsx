"use client";
import React, { Suspense, useEffect, useState } from "react";
import type { Metadata } from "next";
import { useSession } from "next-auth/react";
import "@styles/scss/main.scss";
import TopBar from "@widgets/Dashboard/components/TopBar";
import SideBar from "@widgets/Dashboard/components/SideBar";
import { useRouter } from "next/navigation";

export default function DashboardLyout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } else {
      console.log(session);
    }
  }, [status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoaded && session?.user!._id && (
        <div className="flex flex-row">
          <SideBar />
          <div className="flex flex-col">
            <TopBar />
            <main className="min-h-[110vh] h-auto rounded-[5px] pt-[17vh] pl-[17vw] pr-[2vw] pb-[1vw] w-[99.5vw] flex items-center justify-center bg-azure-50 ">
              <Suspense
                fallback={<div className="w-full h-full">loading...</div>}
              >
                <div className="w-full h-full">{children}</div>
              </Suspense>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
