// FlamLogo: SVG logo for Flamapp.ai, using the static SVG from public
// Accepts className and style props for styling, and spreads other valid next/image props
import Image, { ImageProps } from "next/image";
import type { CSSProperties } from "react";

// FlamLogoProps omits 'src' and makes 'alt' required (as in next/image)
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
