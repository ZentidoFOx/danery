import HeroSection from "@/components/HeroSection";
import CountdownSectionImproved from "@/components/CountdownSectionImproved";
import ParentsSection from "@/components/ParentsSection";
import ReceptionSection from "@/components/ReceptionSection";
import ItinerarySection from "@/components/ItinerarySection";
import DressCodeSection from "@/components/DressCodeSection";
import RSVPSection from "@/components/RSVPSection";
import GallerySection from "@/components/GallerySection";
import RegistrySection from "@/components/RegistrySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CountdownSectionImproved />
      <ParentsSection />
      <ReceptionSection />
      <ItinerarySection />
      <DressCodeSection />
      <RSVPSection />
      <GallerySection />
      <RegistrySection />
      <Footer />
    </main>
  );
}
