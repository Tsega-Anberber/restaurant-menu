
export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F6F1]">
      <div className="flex flex-col items-center">

        {/* Restaurant name */}
        <h1 className="text-3xl font-bold tracking-tight text-[#24221F]">
          Etalem Kitfo
        </h1>

        {/* Loading animation */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#A66A3F]" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#A66A3F]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#A66A3F]"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        <p className="mt-5 text-sm text-[#716D67]">
          Preparing your table...
        </p>

      </div>
    </main>
  );
}
