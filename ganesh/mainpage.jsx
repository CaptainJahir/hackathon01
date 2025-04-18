import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#0d0d0d] h-screen Container relative">
    <div className="absolute w-full h-full">
      <img 
        src="/assets/img2.jpg" 
        alt="My Image" 
        className="w-full h-full object-cover object-center mt-30"
      />
    </div>
  </div>
  );
}