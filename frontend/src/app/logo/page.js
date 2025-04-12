import Image from "next/image";

function LogoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-[800px] h-[800px] rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
        <Image 
          src="/Head.png" 
          alt="DinoLearn logo" 
          width={700} 
          height={700}
          className="absolute  -translate-x-1/2 -translate-y-1/2"
          priority
        />
      </div>
    </div>
  );
}

export default LogoPage;

