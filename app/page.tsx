import HeroSection from "@/components/HeroSection";
import CountdownSectionImproved from "@/components/CountdownSectionImproved";
import ReceptionSection from "@/components/ReceptionSection";
import ItinerarySection from "@/components/ItinerarySection";
import DressCodeSection from "@/components/DressCodeSection";
import RegistrySection from "@/components/RegistrySection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";
import FloatingRSVP from "@/components/FloatingRSVP";
// import ParentsSection from "@/components/ParentsSection";
// import GallerySection from "@/components/GallerySection";

export default function Home() {
    return (
        <main className="min-h-screen">
            <LanguageSelector />
            <HeroSection />
            <CountdownSectionImproved />
            {/* <ParentsSection /> */}
            <ReceptionSection />
            <ItinerarySection />
            <DressCodeSection />
            {/* <GallerySection /> */}
            <RegistrySection />
            <RSVPSection />
            <Footer />
            <FloatingRSVP />
        </main>
    );
}
