"use client";

export default function Loader() {
  return (
    <>
      <div className="flex justify-center items-center p-7 mt-5 text-foreground bg-foreground/[0.02] h-[90vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    </>
  );
}
