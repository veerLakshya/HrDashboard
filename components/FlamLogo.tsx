import Image, { ImageProps } from "next/image";
import type { CSSProperties } from "react";

interface FlamLogoProps extends Omit<ImageProps, "src"> {
  className?: string;
  style?: CSSProperties;
  alt: string;
}

export default function FlamLogo({
  className = "",
  style = {},
  alt = "Flamapp Logo",
  width = 64,
  height = 64,
  priority = true,
  ...props
}: FlamLogoProps) {
  return (
    <Image
      src="/flam-logo.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        width: width ? width : undefined,
        height: height ? height : undefined,
        ...style,
        ...(width && !height ? { height: "auto" } : {}),
        ...(height && !width ? { width: "auto" } : {}),
      }}
      priority={priority}
      {...props}
    />
  );
}
