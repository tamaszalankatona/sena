import Link from "next/link";

const Logo = ({ showFullLogo }: { showFullLogo: boolean }) => {
  return (
    <Link href="/" className="w-fit flex items-center gap-x-2">
      <div className="bg-primary h-10 w-10 md:h-10 md:w-10 rounded-xl flex justify-center items-center">
        <span className="text-primary-foreground font-bold text-lg">S</span>
      </div>
      {showFullLogo && (
        <span className="font-semibold text-xl text-foreground">Sena</span>
      )}
    </Link>
  );
};

export default Logo;
