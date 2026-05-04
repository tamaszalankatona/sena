import { RiLoaderLine } from "@remixicon/react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full bg-primary-foreground fixed top-0 left-0 flex items-center justify-center">
      <RiLoaderLine className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
