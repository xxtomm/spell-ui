"use client";

import { useState } from "react";
import {
  enrichTweet,
  useTweet,
  type EnrichedTweet,
} from "react-tweet";
import { cn } from "@/lib/utils";
import { Check, Link2 } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";

const VerifiedBadge = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 22 22"
    className={className}
    fill="currentColor"
    aria-label="Verified account"
    role="img"
  >
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm} · ${month} ${day}, ${year}`;
};

const TweetSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "block w-full max-w-[590px] rounded-xl p-4 dark:border dark:border-muted not-dark:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]",
      className
    )}
  >
    <div className="flex items-center gap-2">
      <div className="size-[38px] shrink-0 animate-pulse rounded-full bg-muted" />
      <div className="flex flex-col gap-1">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
    </div>
  </div>
);

const TweetNotFound = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex w-full max-w-[590px] flex-col items-center justify-center gap-2 rounded-xl p-6 text-muted-foreground dark:border dark:border-muted not-dark:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]",
      className
    )}
  >
    <p className="text-sm">Tweet not found</p>
  </div>
);

const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-2">
      <img
        src={tweet.user.profile_image_url_https}
        alt={tweet.user.name}
        loading="lazy"
        width={38}
        height={38}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="flex items-center gap-1 text-[15px] font-semibold text-primary">
          {tweet.user.name}
          {(tweet.user.verified || tweet.user.is_blue_verified) && (
            <VerifiedBadge className="size-4 text-[#1C9BF1]" />
          )}
        </span>
        <span className="-mt-0.5 text-[13px] text-muted-foreground">
          @{tweet.user.screen_name}
        </span>
      </div>
    </div>
    <a href={tweet.url} target="_blank" rel="noopener noreferrer">
      <SiX className="size-5" />
    </a>
  </div>
);

const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <p className="mt-3 leading-6 text-primary">
    {tweet.entities.map((entity, idx) => {
      switch (entity.type) {
        case "url":
        case "symbol":
        case "hashtag":
        case "mention":
          return (
            <a
              key={idx}
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1C9BF1] hover:underline"
            >
              {entity.text}
            </a>
          );
        case "text":
          return (
            <span
              key={idx}
              dangerouslySetInnerHTML={{ __html: entity.text }}
            />
          );
        default:
          return null;
      }
    })}
  </p>
);

const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
  if (!tweet.video && !tweet.photos) return null;

  const getVideoSource = () => {
    if (!tweet.video?.variants) return null;

    const getResolution = (url: string): number => {
      const match = url.match(/\/(\d+)x(\d+)\//);
      if (match) {
        return parseInt(match[1]) * parseInt(match[2]);
      }
      return 0;
    };

    const mp4Variants = tweet.video.variants
      .filter((v) => v.type === "video/mp4")
      .sort((a, b) => getResolution(b.src) - getResolution(a.src));

    if (mp4Variants.length > 0) {
      return { src: mp4Variants[0].src, type: "video/mp4" };
    }

    const firstVariant = tweet.video.variants[0];
    return { src: firstVariant.src, type: firstVariant.type };
  };

  const videoSource = getVideoSource();

  return (
    <div className="mt-4">
      {tweet.video && videoSource && (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-lg"
        >
          <source src={videoSource.src} type={videoSource.type} />
        </video>
      )}
      {tweet.photos && (
        <div
          className={cn(
            "grid gap-1",
            tweet.photos.length === 1 && "grid-cols-1",
            tweet.photos.length === 2 && "grid-cols-2",
            tweet.photos.length >= 3 && "grid-cols-2"
          )}
        >
          {tweet.photos.map((photo, idx) => (
            <img
              key={photo.url}
              src={photo.url}
              alt={`Photo ${idx + 1}`}
              loading="lazy"
              className={cn(
                "w-full rounded-lg object-cover",
                tweet.photos &&
                  tweet.photos.length === 3 &&
                  idx === 0 &&
                  "row-span-2"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TweetFooterProps {
  tweet: EnrichedTweet;
  showDate?: boolean;
  showLikeButton?: boolean;
  showCopyLink?: boolean;
}

const TweetFooter = ({
  tweet,
  showDate = true,
  showLikeButton = true,
  showCopyLink = true,
}: TweetFooterProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tweet.url).catch(() => {});
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const showActions = showLikeButton || showCopyLink;

  if (!showDate && !showActions) return null;

  return (
    <>
      {showDate && (
        <div className="mt-4">
          <time
            className="text-sm text-muted-foreground"
            dateTime={tweet.created_at}
          >
            {formatDate(tweet.created_at)}
          </time>
        </div>
      )}
      {showActions && (
        <div className="mt-2.5 flex gap-4 border-t border-muted pt-3.5">
          {showLikeButton && (
            <a
              href={`https://x.com/intent/like?tweet_id=${tweet.id_str}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground"
            >
              <svg
                className="text-pink-600"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <g fill="currentColor">
                  <path
                    d="M12.164,2c-1.195,.015-2.324,.49-3.164,1.306-.84-.815-1.972-1.291-3.178-1.306-2.53,.015-4.582,2.084-4.572,4.609,0,5.253,5.306,8.429,6.932,9.278,.256,.133,.537,.2,.818,.2s.562-.067,.817-.2c1.626-.848,6.933-4.024,6.933-9.275,.009-2.528-2.042-4.597-4.586-4.612Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
              <span className="text-sm text-medium transition-colors hover:text-pink-600">
                {formatNumber(tweet.favorite_count)}
              </span>
            </a>
          )}
          {showCopyLink && (
            <button
              onClick={handleCopyLink}
              className="flex cursor-pointer items-center gap-1.5 text-muted-foreground"
            >
              {isCopied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Link2 className="size-4" />
              )}
              <span className="text-sm text-medium">Copy link</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

interface TweetContentProps {
  tweet: EnrichedTweet;
  className?: string;
  showDate?: boolean;
  showLikeButton?: boolean;
  showCopyLink?: boolean;
}

const TweetContent = ({
  tweet,
  className,
  showDate,
  showLikeButton,
  showCopyLink,
}: TweetContentProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[590px] rounded-xl p-4 dark:border dark:border-muted not-dark:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]",
        className
      )}
    >
      <TweetHeader tweet={tweet} />
      <TweetBody tweet={tweet} />
      <TweetMedia tweet={tweet} />
      <TweetFooter
        tweet={tweet}
        showDate={showDate}
        showLikeButton={showLikeButton}
        showCopyLink={showCopyLink}
      />
    </div>
  );
};

interface TweetProps {
  id: string;
  className?: string;
  showDate?: boolean;
  showLikeButton?: boolean;
  showCopyLink?: boolean;
}

export function Tweet({
  id,
  className,
  showDate = true,
  showLikeButton = true,
  showCopyLink = true,
}: TweetProps) {
  const { data: tweet, isLoading, error } = useTweet(id);

  if (isLoading) {
    return <TweetSkeleton className={className} />;
  }

  if (error || !tweet) {
    return <TweetNotFound className={className} />;
  }

  // X's syndication API omits empty entity arrays, but react-tweet's
  // enrichTweet assumes they exist and throws "n is not iterable" otherwise.
  let enrichedTweet: EnrichedTweet;
  try {
    const entities = tweet.entities ?? {};
    enrichedTweet = enrichTweet({
      ...tweet,
      entities: {
        ...entities,
        hashtags: entities.hashtags ?? [],
        urls: entities.urls ?? [],
        user_mentions: entities.user_mentions ?? [],
        symbols: entities.symbols ?? [],
      },
    });
  } catch {
    return <TweetNotFound className={className} />;
  }

  return (
    <TweetContent
      tweet={enrichedTweet}
      className={className}
      showDate={showDate}
      showLikeButton={showLikeButton}
      showCopyLink={showCopyLink}
    />
  );
}
