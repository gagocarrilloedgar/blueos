import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import Safari from "@/components/ui/safari";
import WordRotate from "@/components/ui/word-rotate";
import { Trans } from "@lingui/macro";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export function Hero() {
  return (
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
          <Trans>Effortless </Trans>
          <strong>
            <WordRotate
              duration={2000}
              words={["client", "project", "file", "request"]}
            />
          </strong>
          <Trans>management for freelancers</Trans>
        </span>
      </BlurFade>

      <BlurFade delay={0.3 * 3} inView>
        <p className="text-xl">
          <Trans>
            A delightfully simple solution to streamline
            project and client management.
          </Trans>
          <br />
          <Trans>Built for small agencies and freelancers.</Trans>
        </p>
        <section className="flex flex-col items-center pt-12">
          <Button className="bg-blue-400 hover:bg-blue-500" asChild>
            <a href="/signup">
              <Trans>Join the beta</Trans>
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Demo />
        </section>
      </BlurFade>
    </section>
  );
}

export function Demo() {
  return (
    <div className="hidden lg:flex relative mt-10  w-[800px] flex-col items-center justify-center overflow-hidden bg-transparent rounded-[9px] md:shadow-xl">
      <Safari
        url="https://blueos.xyz/app"
        className="h-full w-full object-contain"
        src="/homepage.png"
      />
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
