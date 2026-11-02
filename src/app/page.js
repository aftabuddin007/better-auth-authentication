import Image from "next/image";
import HeroBanner from "./components/Home/HeroBanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="">
        
        <HeroBanner></HeroBanner>
      </main>
    </div>
  );
}
