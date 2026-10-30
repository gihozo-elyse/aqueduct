import Image from "next/image";

export default function OptimizedImage({ src, alt, sizes, className = "", priority = false }) {
  const localImage = src.startsWith("/") && !src.startsWith("//");
  if (!localImage) {
    return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={`h-full w-full ${className}`} />;
  }

  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
}
