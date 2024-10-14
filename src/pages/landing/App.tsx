import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import Pricing from "./Pricing";

export function App() {
  return (
    <div className="flex pt-20 flex-col size-full justify-center">
      <div className="h-screen w-screen z-10 pt-20 justify-center flex-col bg-transparent">
        <Header />
        <Hero />
        <Pricing />
        <Footer border />
      </div>
      <DotPattern
        width={15}
        height={15}
        cx={1}
        cy={1}
        cr={1}
        className={cn("[mask-image:radial-gradient(black,transparent)]")}
      />
    </div>
  );
}
