import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Trans } from "@lingui/macro";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import Pricing from "./Pricing";

export function App() {
  const navigate = useNavigate();

  const goToSignUpPage = () => navigate("/signup");

  return (
    <div className="flex pt-20 flex-col size-full justify-center">
      <div className="h-screen w-screen z-10 pt-10 justify-center flex-col bg-transparent">
        <section className="flex flex-col gap-2 text-center">
          <BlurFade delay={0.3} inView>
            <span className="text-black bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:text-white py-2">
              <span className="relative inline-block text-white">
                <span className="absolute -inset-2 bg-blue-400 transform -skew-y-2 -translate-y-2"></span>
                <span className="relative z-10">Blue OS</span>
              </span>
            </span>
          </BlurFade>
          <BlurFade delay={0.3 * 2} inView>
            <span className="text-black text-6xl">
              <Trans>
                Effortless time management for <strong>SMEs</strong>
              </Trans>
            </span>
          </BlurFade>

          <BlurFade delay={0.3 * 3} inView>
            <p className="text-xl">
              <Trans>
                A simple and guided solution designed to help SMEs streamline
                time and processes.
              </Trans>
            </p>
            <section className="flex flex-col items-center pt-12">
              <Button
                onClick={goToSignUpPage}
                className="bg-blue-400 hover:bg-blue-500"
              >
                <Trans>Get started now</Trans>
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Demo />
            </section>
          </BlurFade>
        </section>
        <Pricing />
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

function Demo() {
  return (
    <div className="relative mt-10 flex w-[800px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <img src="/homepage.png" className="h-full w-full object-contain" />
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
