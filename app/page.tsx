/* Font setup */
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

/* Components */
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("components/slider"), { ssr: false });

export default function Home() {
  return (
    <main className={inter.className}>
      <Slider />
    </main>
  );
}
