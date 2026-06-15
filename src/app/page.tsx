import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Services from "@/components/sections/Services";
import Steps from "@/components/sections/Steps";
import Pricing from "@/components/sections/Pricing";
import Guarantees from "@/components/sections/Guarantees";
import Faq from "@/components/sections/Faq";
import Contacts from "@/components/sections/Contacts";
import StickyCta from "@/components/sections/StickyCta";
import SectionDivider from "@/components/sections/SectionDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <SectionDivider />
        <Services />
        <Steps />
        <SectionDivider />
        <Pricing />
        <Guarantees />
        <SectionDivider />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
