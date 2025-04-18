import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
    {/* submit lost irems button */}
    <div className='flex justify-center items-center mt-10 h-[80vh]'>
      <div className='flex flex-col justify-center items-center gap-2 w-[12vw]'>
        <Link href="/report-lost-items" className='w-full'>
          <button className='bg-red-600 w-full py-1 rounded-sm font-semibold cursor-pointer'>
            Report Lost Items
          </button>
        </Link>

        <Link href="/report-found-items" className='w-full'>
          <button className='bg-red-600 px-4 py-1 rounded-sm font-semibold cursor-pointer w-full'>
            Report Found Items
          </button>
        </Link>

        <Link href="/lost-found-items" className='w-full'>
          <button className='bg-red-600 px-4 py-1 rounded-sm font-semibold cursor-pointer w-full'>
            Lost & Found Items
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
}