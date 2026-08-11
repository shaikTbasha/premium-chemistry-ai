import Image from "next/image";

interface LogoProps {
  size?: "large" | "small";
}

export default function ChemAILogo({ size = "small" }: LogoProps) {
  const dimensions = size === "large" 
    ? "h-28 w-36 sm:h-32 sm:w-44" 
    : "h-10 w-32";

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={`relative flex items-center ${dimensions}`}>
        <Image
          src="/logo.png"
          alt="Amma AI Academy Logo"
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}