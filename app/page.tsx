import CallToAction from "@/components/sections/call-to-action";
import Features from "@/components/sections/features";
import FooterSection from "@/components/sections/footer";
import { HeroHeader } from "@/components/sections/header";
import HeroSection from "@/components/sections/hero-section";
import LogoCloud from "@/components/sections/logo-cloud";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection />
      <LogoCloud />
      <Features />
      <CallToAction />
      <FooterSection />
    </main>
  );
}
