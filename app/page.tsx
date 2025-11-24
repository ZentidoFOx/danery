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
import DynamicMetadata from "@/components/DynamicMetadata";
// import ParentsSection from "@/components/ParentsSection";
// import GallerySection from "@/components/GallerySection";

export default function Home() {
    return (
        <main className="min-h-screen">
            <DynamicMetadata />
            <LanguageSelector />
            <HeroSection />
            <CountdownSectionImproved />
            {/* <ParentsSection /> */}
            <ReceptionSection />
            <ItinerarySection />
            <DressCodeSection />
            {/* <GallerySection /> */}
            <RSVPSection />
            <RegistrySection />
            <Footer />
            <FloatingRSVP />
        </main>
    );
}
