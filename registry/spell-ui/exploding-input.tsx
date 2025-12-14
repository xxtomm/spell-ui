"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";

type HorizontalDirection = "left" | "center" | "right";
type VerticalDirection = "top" | "center" | "bottom";

interface ExplodingInputProps {
  /** Content to render as particles (React nodes) */
  content?: ReactNode[];
  /** Number of particles to spawn per input event */
  count?: number;
  /** Direction of particle movement */
  direction?: {
    horizontal?: HorizontalDirection;
    vertical?: VerticalDirection;
  };
  /** Gravity value from -1 to 1 (negative = upward, positive = downward) */
  gravity?: number;
  /** Duration of particle animation in seconds */
  duration?: number;
  /** Scale configuration for particles */
  scale?: {
    value?: number;
    randomize?: boolean;
    randomVariation?: number;
  };
  /** Rotation configuration for particles */
  rotation?: {
    value?: number;
    animate?: boolean;
  };
  /** Custom styles for the container */
  style?: CSSProperties;
  /** Class name for the container */
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  vx: number;
  vy: number;
  gravity: number;
  birthTime: number;
  lifeMs: number;
  contentIdx: number;
  scaleStart: number;
  scaleEnd: number;
  rotateStart: number;
  rotateEnd: number;
  element: HTMLDivElement;
  isDead: boolean;
}

function mapLinear(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

function createPRNG(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 1831565813) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ExplodingInput({
  content = [],
  count = 1,
  direction = { horizontal: "center", vertical: "top" },
  gravity = 0.7,
  duration = 3,
  scale = { value: 1, randomize: false, randomVariation: 0 },
  rotation = { value: 0, animate: false },
  style,
  className,
}: ExplodingInputProps) {
  const particleIdCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const randRef = useRef<() => number>(() => Math.random());
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Initialize PRNG and cleanup on unmount
  useEffect(() => {
    const timeBits = (Date.now() & 4294967295) >>> 0;
    const extra = Math.floor(Math.random() * 4294967295) >>> 0;
    const seed = (timeBits ^ extra) >>> 0;
    randRef.current = createPRNG(seed);

    return () => {
      particlesRef.current.forEach((p) => {
        if (p.element && p.element.parentNode) {
          p.element.parentNode.removeChild(p.element);
        }
      });
      particlesRef.current = [];
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const getInputSpawnPosition = useCallback(
    (input: HTMLInputElement): { x: number; y: number } | null => {
      const container = containerRef.current;
      if (!container || !input) return null;

      const inputRect = input.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const inputValue = input.value;

      const getTextWidth = (text: string, inp: HTMLInputElement): number => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return 0;
        const computedStyle = window.getComputedStyle(inp);
        context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
        return context.measureText(text).width;
      };

      const computedStyle = window.getComputedStyle(input);
      const paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
      const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;

      let x = 0;
      let y = 0;

      if (inputValue.length > 0) {
        const textWidth = getTextWidth(inputValue, input);
        const inputStartX = inputRect.left - containerRect.left;
        const maxX = inputStartX + inputRect.width - paddingRight;
        x = Math.min(textWidth + inputStartX + paddingLeft, maxX);
      } else {
        x = inputRect.left - containerRect.left;
      }
      y = inputRect.top - containerRect.top + inputRect.height / 2;

      return { x, y };
    },
    []
  );

  const createParticlesAtPosition = useCallback(
    (x: number, y: number) => {
      const spawnOne = () => {
        const horizontalValue =
          direction.horizontal === "left"
            ? -0.4
            : direction.horizontal === "right"
              ? 0.4
              : 0;
        const baseVx = mapLinear(horizontalValue, -1, 1, -800, 800);
        const spreadVx = 300;
        const vx = baseVx + (randRef.current() * 2 - 1) * spreadVx;

        const verticalValue =
          direction.vertical === "top"
            ? -0.7
            : direction.vertical === "bottom"
              ? 0.7
              : 0;
        const baseVy = mapLinear(verticalValue, -1, 1, -800, 800);
        const spreadVy = 300;
        const vy = baseVy + (randRef.current() * 2 - 1) * spreadVy;

        particleIdCounter.current += 1;

        const randBetween = (min: number, max: number) =>
          min + randRef.current() * (max - min);

        const baseScale = scale.value ?? 1;
        let particleScale = baseScale;
        if (
          scale.randomize &&
          scale.randomVariation !== undefined &&
          scale.randomVariation > 0
        ) {
          const variation = (scale.randomVariation / 100) * baseScale;
          const minScale = baseScale - variation;
          const maxScale = baseScale + variation;
          particleScale = randBetween(minScale, maxScale);
        }
        const safeScale = Math.max(0.1, Math.min(4, particleScale));

        const baseRotation = rotation.value ?? 0;
        let initRot = baseRotation;
        let endRot = baseRotation;
        if (rotation.animate) {
          initRot = randBetween(-180, 180);
          const rotationDelta = randBetween(-360, 360);
          endRot = initRot + rotationDelta;
        }

        const el = document.createElement("div");
        el.style.position = "absolute";
        el.style.left = "0";
        el.style.top = "0";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.pointerEvents = "none";
        el.style.willChange = "transform, opacity";
        el.style.transformOrigin = "50% 50%";
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${safeScale}) rotate(${initRot}deg)`;
        el.style.opacity = "1";

        if (particleContainerRef.current) {
          particleContainerRef.current.appendChild(el);
        }

        const newParticle: Particle = {
          id: particleIdCounter.current,
          x,
          y,
          scale: safeScale,
          rotate: initRot,
          opacity: 1,
          vx,
          vy,
          gravity: mapLinear(
            Math.max(-1, Math.min(1, gravity ?? 0.45)),
            -1,
            1,
            -2000,
            2000
          ),
          birthTime: performance.now(),
          lifeMs: duration * 1000,
          contentIdx:
            content.length > 0
              ? (particleIdCounter.current - 1) % content.length
              : -1,
          scaleStart: safeScale,
          scaleEnd: safeScale,
          rotateStart: initRot,
          rotateEnd: endRot,
          element: el,
          isDead: false,
        };

        // Render content
        if (content.length > 0 && newParticle.contentIdx >= 0) {
          const contentElement = content[newParticle.contentIdx];
          if (contentElement) {
            import("react-dom/client").then(({ createRoot }) => {
              const root = createRoot(el);
              root.render(<>{contentElement}</>);
            });
          }
        } else {
          const fallback = document.createElement("div");
          fallback.style.width = "16px";
          fallback.style.height = "16px";
          fallback.style.borderRadius = "6px";
          fallback.style.backgroundColor = "#6366f1";
          el.appendChild(fallback);
        }

        particlesRef.current.push(newParticle);

        setTimeout(() => {
          newParticle.isDead = true;
          if (newParticle.element && newParticle.element.parentNode) {
            newParticle.element.parentNode.removeChild(newParticle.element);
          }
          particlesRef.current = particlesRef.current.filter(
            (p) => p.id !== newParticle.id
          );
        }, duration * 1000);
      };

      const particlesToSpawn = Math.max(1, Math.min(5, Math.round(count)));
      for (let i = 0; i < particlesToSpawn; i++) spawnOne();
    },
    [content, count, direction, duration, gravity, rotation, scale]
  );

  // Find input element and listen to changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const label = container.closest("label");
    const input = label?.querySelector("input") ?? null;
    if (!input) return;

    inputRef.current = input;

    const handleInput = () => {
      const pos = getInputSpawnPosition(input);
      if (pos) {
        createParticlesAtPosition(pos.x, pos.y);
      }
    };

    input.addEventListener("input", handleInput);
    return () => {
      input.removeEventListener("input", handleInput);
      inputRef.current = null;
    };
  }, [createParticlesAtPosition, getInputSpawnPosition]);

  // Physics animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateParticles = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      const dtMs = Math.min(32, delta);
      const dt = dtMs / 1000;
      const now = performance.now();

      particlesRef.current.forEach((p) => {
        if (p.isDead) return;
        const age = now - p.birthTime;
        if (!p.element || age >= p.lifeMs) return;

        const progress = age / p.lifeMs;

        p.vy = p.vy + p.gravity * dt;
        p.x = p.x + p.vx * dt;
        p.y = p.y + p.vy * dt;

        p.scale = mapLinear(progress, 0, 1, p.scaleStart, p.scaleEnd);
        p.rotate = mapLinear(progress, 0, 1, p.rotateStart, p.rotateEnd);

        const fadeStart = 0.7;
        p.opacity = progress > fadeStart ? mapLinear(progress, fadeStart, 1, 1, 0) : 1;

        if (isNaN(p.x) || isNaN(p.y) || isNaN(p.scale)) return;

        const clampedScale = Math.max(0.1, Math.min(3, p.scale));
        p.element.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${clampedScale}) rotate(${p.rotate}deg)`;
        p.element.style.opacity = String(p.opacity);
      });

      rafIdRef.current = requestAnimationFrame(updateParticles);
    };

    rafIdRef.current = requestAnimationFrame(updateParticles);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        width: "0px",
        height: "0px",
        overflow: "visible",
        backgroundColor: "transparent",
        transform: "translateZ(0)",
      }}
    >
      <div
        ref={particleContainerRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default ExplodingInput;