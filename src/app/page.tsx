import { CinematicNavbar } from "@/components/site/cinematic-navbar";
import { CinematicHero } from "@/components/site/cinematic-hero";
import { CinematicFeatures } from "@/components/site/cinematic-features";
import { CinematicServicesSlides } from "@/components/site/cinematic-services-slides";
import { CinematicTagline } from "@/components/site/cinematic-tagline";
import { CinematicCareers } from "@/components/site/cinematic-careers";
import { CinematicContact } from "@/components/site/cinematic-contact";
import { CinematicFooter } from "@/components/site/cinematic-footer";
import { CustomCursor } from "@/components/site/custom-cursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <CinematicNavbar />
      <main id="main" className="flex flex-1 flex-col">
        <CinematicHero />
        <CinematicFeatures />
        <CinematicServicesSlides />
        <CinematicTagline />
        <CinematicCareers />
        <CinematicContact />
      </main>
      <CinematicFooter />
    </>
  );
}
