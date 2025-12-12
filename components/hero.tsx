import { BlurReveal } from "@/registry/spell-ui/blur-reveal";
import { PerspectiveBook } from "@/registry/spell-ui/perspective-book";
import { RichButton } from "@/registry/spell-ui/rich-button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { TextMarquee } from "@/registry/spell-ui/text-marquee";
import SpotifyCardCarouselDemo from "@/docs/spotify-card/demo-carousel";
import { Demo as ColorSelectorDemo } from "@/docs/color-selector/demo";
import { Demo as MarqueeDemo } from "@/docs/marquee/demo";
import { Demo as AnimatedCheckboxDemo } from "@/docs/animated-checkbox/demo";
import ShimmerText from "@/registry/spell-ui/shimmer-text";

export function Hero() {
  return (
    <div className="flex flex-col items-center w-full py-12 md:py-24 gap-8 md:gap-16 px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-[700px]">
        <BlurReveal letterSpacing="-0.020em" className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight">
          Refined UI components for Design Engineers
        </BlurReveal>
        <p className="text-base md:text-lg leading-6 text-muted-foreground">
            Meticulously crafted, free and open-source components with animations built-in.<br /> Copy, paste, perfect.
        </p>
        <div className="flex flex-row gap-4 mt-2 w-auto">
          <RichButton size="lg" className="rounded-full trakcing-tight active:scale-[0.97] will-change-transform ease-out duration-300" asChild>
            <Link href={"/docs/introduction"}>Get Started</Link>
          </RichButton>
          <RichButton size="lg" color="blue" className="shadow-sm shadow-zinc-950/20 group rounded-full [&_svg]:size-4.5 trakcing-tight pr-6 active:scale-[0.97] will-change-transform ease-out duration-300" asChild>
            <Link href={"/docs/blur-reveal"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="currentColor"><circle cx="14.5" cy="8.5" r="2.5" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><rect x="5" y="12" width="5" height="5" rx="1" ry="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="currentColor"></rect><path d="m5.1889,3.7146l-2.1169,3.5282c-.2.3333.0401.7572.4287.7572h4.2338c.3886,0,.6287-.424.4287-.7572l-2.1169-3.5282c-.1942-.3237-.6633-.3237-.8575,0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="currentColor"></path></g></svg>
              Components
            </Link>
          </RichButton>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 w-full max-w-[1400px]">
        <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-2xl border shadow-inner min-h-[300px] md:min-h-[400px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <TextMarquee
              height={250}
              speed={1}
              prefix={
                <span className="text-2xl md:text-3xl text-muted-foreground/75 font-medium">
                  yourwebsite.com/
                </span>
              }
            >
              <p className="text-2xl md:text-3xl font-medium">emily</p>
              <p className="text-2xl md:text-3xl font-medium">dennis</p>
              <p className="text-2xl md:text-3xl font-medium">max</p>
              <p className="text-2xl md:text-3xl font-medium">michele</p>
              <p className="text-2xl md:text-3xl font-medium">adgv</p>
              <p className="text-2xl md:text-3xl font-medium">tomm</p>
              <p className="text-2xl md:text-3xl font-medium">hugh</p>
              <p className="text-2xl md:text-3xl font-medium">alex</p>
            </TextMarquee>
          </div>
          <Link href="/docs/text-marquee" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Text Marquee</Link>
        </div>
        <div className="col-span-1 row-span-1 md:row-span-2 lg:col-start-4 lg:row-start-2 rounded-2xl border shadow-inner min-h-[300px] md:min-h-[400px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <PerspectiveBook>
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold leading-5">
                  Your complete platform for the Design.
                </h1>
                <BookOpen className="size-5" />
              </div>
            </PerspectiveBook>
          </div>
          <Link href="/docs/perspective-book" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Perspective Book</Link>
        </div>
        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <ShimmerText className="text-lg" duration={1}>
              Thinking longer...
            </ShimmerText>
          </div>
          <Link href="/docs/shimmer-text" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Shimmer Text</Link>
        </div>
        <div className="col-span-1 md:col-span-2 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <SpotifyCardCarouselDemo />
          </div>
          <Link href="/docs/spotify-card" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Spotify Card</Link>
        </div>
        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4 overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <MarqueeDemo />
          </div>
          <Link href="/docs/marquee" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Marquee</Link>
        </div>
        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <AnimatedCheckboxDemo />
          </div>
          <Link href="/docs/animated-checkbox" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Animated Checkbox</Link>
        </div>
        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <ColorSelectorDemo />
          </div>
          <Link href="/docs/color-selector" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Color Selector</Link>
        </div>
      </div>
    </div>
  );
}
