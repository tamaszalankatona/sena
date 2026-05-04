export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex justify-start sm:justify-center items-start">
      <div className="max-h-fit max-w-4xl w-full md:grid md:grid-cols-10 gap-4 md:px-2">
        {children}
      </div>
    </div>
  );
}
