import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/constants/media";

type LogoProps = {
  showText?: boolean;
  variant?: "nav" | "footer" | "auth";
  className?: string;
  linked?: boolean;
};

const markClass = {
  nav: "w-9 h-9 rounded-xl",
  footer: "w-9 h-9 rounded-lg",
  auth: "w-9 h-9 rounded-lg",
} as const;

const imageClass = {
  nav: "h-[18px] w-auto max-w-[1.65rem] object-contain",
  footer: "h-[18px] w-auto max-w-[1.65rem] object-contain",
  auth: "h-[18px] w-auto max-w-[1.65rem] object-contain",
} as const;

export function Logo({
  showText = true,
  variant = "nav",
  className = "",
  linked = true,
}: LogoProps) {
  const onDark = variant === "footer";

  const content = (
    <>
      <span
        className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${markClass[variant]} ${
          onDark || variant === "auth"
            ? "bg-white shadow-sm"
            : "bg-white border border-kz-blue/10 shadow-sm shadow-kz-blue/10"
        }`}
      >
        <Image
          src={LOGO_SRC}
          alt="MedTour Kazakhstan"
          width={1024}
          height={525}
          className={imageClass[variant]}
          priority={variant === "nav"}
        />
      </span>
      {showText && (
        <span
          className={`font-semibold tracking-tight whitespace-nowrap truncate ${
            variant === "nav"
              ? "hidden md:inline text-[15px] xl:text-[16px] text-navy-900"
              : variant === "footer"
                ? "text-[15px] text-white"
                : "text-sm text-white"
          }`}
        >
          MedTour Kazakhstan
        </span>
      )}
    </>
  );

  const wrapperClass = `flex items-center gap-2 group shrink-0 min-w-0 ${className}`;

  if (!linked) {
    return <div className={wrapperClass}>{content}</div>;
  }

  return (
    <Link href="/" className={wrapperClass} aria-label="MedTour Kazakhstan — Home">
      {content}
    </Link>
  );
}
