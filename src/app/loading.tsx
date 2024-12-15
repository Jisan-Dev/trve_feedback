export default function Loading() {
  return (
    <div className="min-h-screen space-x-2 flex items-center justify-center">
      {/* <LoaderPinwheel className="h-16 w-16 animate-spin -mt-16" /> */}
      <span className="sr-only -mt-16">Loading...</span>
      <div className="h-8 w-8 -mt-16 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 -mt-16 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 -mt-16 bg-foreground rounded-full animate-bounce"></div>
    </div>
  );
}
