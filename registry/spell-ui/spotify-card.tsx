"use client";

import { useState, useEffect, useRef } from "react";
import { SiSpotify } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

interface SpotifyData {
  title: string;
  artist: string;
  image: string;
  link: string;
  audio?: string;
}

interface SpotifyCardProps {
  url: string;
  className?: string;
}

const SpotifyCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative flex max-h-[100px] h-full w-full items-stretch justify-center overflow-hidden rounded-2xl border border-border bg-muted/50 p-3",
      className
    )}
  >
    <div className="aspect-square w-full max-w-[75px] animate-pulse self-center rounded-lg bg-muted" />
    <div className="z-10 flex w-full flex-col justify-end">
      <div className="flex flex-col items-end gap-1 pl-4">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
      </div>
    </div>
  </div>
);

const SpotifyCardError = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex h-[100px] w-full items-center justify-center rounded-2xl border border-border bg-muted/50 p-6 text-muted-foreground",
      className
    )}
  >
    <p className="text-sm">Failed to load Spotify data</p>
  </div>
);

export function SpotifyCard({ url, className }: SpotifyCardProps) {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const response = await fetch(
          `/api/spotify?url=${encodeURIComponent(url)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const spotifyData = await response.json();
        setData(spotifyData);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
  }, [url]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!data?.audio) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(data.audio);
      audioRef.current.volume = 0.3;
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (isLoading) {
    return <SpotifyCardSkeleton className={className} />;
  }

  if (error || !data) {
    return <SpotifyCardError className={className} />;
  }

  return (
    <div
      className={cn(
        "relative flex max-h-[100px] h-full w-full items-stretch justify-center overflow-hidden rounded-2xl border border-border p-3",
        className
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 block aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none flex h-full select-none opacity-100">
          <img
            src={data.image}
            alt=""
            className="absolute brightness-150 left-0 top-0 block h-full w-full blur-[50px]"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0,_rgba(0,_0,_0,_.8))]" />
        </div>
      </div>
      <button
        onClick={data.audio ? handlePlayPause : undefined}
        className={cn(
          "group relative z-[1] w-full max-w-[75px] self-center",
          data.audio && "cursor-pointer"
        )}
      >
        <img
          src={data.image}
          alt={data.title}
          className={cn(
            "pointer-events-none relative z-[1] min-h-[75px] min-w-[75px] w-full select-none rounded-lg object-cover shadow-md transition-transform duration-300 ease-out",
            data.audio && "group-hover:-translate-x-0.5",
            isPlaying && "-translate-x-0.5"
          )}
        />
        {data.audio && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -z-[1] size-[80%] -translate-y-1/2 transition-all duration-300",
              isPlaying ? "translate-x-[-10%]" : "translate-x-[-50%] group-hover:translate-x-[-10%]"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 110 110"
              className="size-full animate-spin"
              style={{
                animationDuration: "3s",
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            >
              <circle cx="55" cy="55" r="55" fill="#000" />
              <mask id="mask0_6138_16576" width="110" height="110" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
                <circle cx="55" cy="55" r="55" fill="#000" />
              </mask>
              <g mask="url(#mask0_6138_16576)">
                <g filter="url(#filter0_f_6138_16576)">
                  <circle cx="55" cy="55" r="51.5" stroke="#fff" strokeOpacity="0.21" />
                </g>
                <g filter="url(#filter1_f_6138_16576)">
                  <circle cx="55" cy="55" r="47.5" stroke="#fff" strokeOpacity="0.21" />
                </g>
                <g filter="url(#filter2_f_6138_16576)">
                  <circle cx="55" cy="55" r="45.5" stroke="#fff" strokeOpacity="0.21" />
                </g>
                <g filter="url(#filter3_f_6138_16576)">
                  <circle cx="55" cy="55" r="43.5" stroke="#fff" strokeOpacity="0.21" />
                </g>
                <g filter="url(#filter4_f_6138_16576)">
                  <circle cx="55" cy="55" r="37.5" stroke="#fff" strokeOpacity="0.21" />
                </g>
                <g filter="url(#filter5_f_6138_16576)">
                  <circle cx="55" cy="55" r="34.5" stroke="#fff" strokeOpacity="0.21" />
                </g>
                <g filter="url(#filter6_f_6138_16576)" opacity="0.4">
                  <path fill="#fff" d="M-14 38l68 19.579L-14 74V38z" />
                </g>
                <g filter="url(#filter7_f_6138_16576)" opacity="0.4">
                  <path fill="#fff" d="M123 38L55 57.579 123 74V38z" />
                </g>
                <g filter="url(#filter8_f_6138_16576)" opacity="0.4">
                  <path fill="#fff" d="M36.5 124.5l19.579-68 16.421 68h-36z" />
                </g>
                <g filter="url(#filter9_f_6138_16576)" opacity="0.4">
                  <path fill="#fff" d="M36.5-12.5l19.579 68 16.421-68h-36z" />
                </g>
              </g>
              <defs>
                <filter id="filter0_f_6138_16576" width="108" height="108" x="1" y="1" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" />
                </filter>
                <filter id="filter1_f_6138_16576" width="100" height="100" x="5" y="5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" />
                </filter>
                <filter id="filter2_f_6138_16576" width="96" height="96" x="7" y="7" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" />
                </filter>
                <filter id="filter3_f_6138_16576" width="92" height="92" x="9" y="9" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" />
                </filter>
                <filter id="filter4_f_6138_16576" width="80" height="80" x="15" y="15" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" />
                </filter>
                <filter id="filter5_f_6138_16576" width="74" height="74" x="18" y="18" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" />
                </filter>
                <filter id="filter6_f_6138_16576" width="100" height="68" x="-30" y="22" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" />
                </filter>
                <filter id="filter7_f_6138_16576" width="100" height="68" x="39" y="22" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" />
                </filter>
                <filter id="filter8_f_6138_16576" width="68" height="100" x="20.5" y="40.5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" />
                </filter>
                <filter id="filter9_f_6138_16576" width="68" height="100" x="20.5" y="-28.5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" />
                </filter>
              </defs>
            </svg>
          </div>
        )}
      </button>
      <div className="z-10 flex w-full flex-col justify-between">
        <div className="flex self-end">
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SiSpotify size={18} className="text-[#BAAEBA]" />
          </a>
        </div>
        <div className="pl-4 text-end">
          <h2 className="whitespace-nowrap text-sm font-semibold tracking-[-.006em] text-[#D6D1D4]">
            {data.title}
          </h2>
          <h2 className="whitespace-nowrap text-sm font-medium tracking-[-.006em] text-[#BAAEBA]">
            {data.artist}
          </h2>
        </div>
      </div>
    </div>
  );
}
