"use client";

import Autoplay from "embla-carousel-autoplay";
import { SpotifyCard } from "@/registry/spell-ui/spotify-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const tracks = [
  "https://open.spotify.com/track/2OZVskV28xxJjjhQqKTLSg",
  "https://open.spotify.com/track/7tTRFVlFzk6yTnoMcParmi",
  "https://open.spotify.com/track/2EiGLWYEH6x79f9ir0VEah",
];

export default function SpotifyCardCarouselDemo() {
  return (
    <Carousel
      className="w-full max-w-[330px] max-h-[100px]"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {tracks.map((url) => (
          <CarouselItem key={url}>
            <SpotifyCard url={url} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
