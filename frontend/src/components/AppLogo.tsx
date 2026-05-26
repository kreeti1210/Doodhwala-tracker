type AppLogoProps = {
  theme: "light" | "dark";
  className?: string;
  imageClassName?: string;
  alt?: string;
};

export default function AppLogo({
  theme,
  className = "",
  imageClassName = "",
  alt = "MilkOMeter logo",
}: AppLogoProps) {
  const src = theme === "dark" ? "/logo_dark.png" : "/logo_light.png";

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 block h-full w-full object-contain ${imageClassName}`}
      />
    </div>
  );
}
