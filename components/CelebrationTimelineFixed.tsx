"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Heart, 
  Flower2, 
  Bus, 
  User, 
  UtensilsCrossed, 
  Music, 
  PartyPopper, 
  Soup,
  Leaf
} from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function CelebrationTimelineFixed() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const events: TimelineEvent[] = [
    {
      time: "3:00 PM",
      title: "Ceremonia Religiosa",
      description: "Templo de Santo Domingo\nde Guzmán, Oaxaca",
      icon: <Heart className="text-wedding-sage" size={60} strokeWidth={1.2} />,
    },
    {
      time: "4:00 PM",
      title: "Calenda",
      description: "En la explanada del Templo Santo\nDomingo de Guzmán.",
      icon: <Flower2 className="text-wedding-sage" size={60} strokeWidth={1.2} />,
    },
    {
      time: "4:30 PM",
      title: "Salida en vans al evento en",
      description: "Calle Reforma, esquina con\ncalle Constitución.",
      icon: <Bus className="text-wedding-sage" size={54} strokeWidth={1.2} />,
    },
    {
      time: "5:00 PM",
      title: "Recepción",
      description: "Paraje Ojo de Agua,\ncarretera al Tule km 13.",
      icon: <User className="text-wedding-sage" size={60} strokeWidth={1.2} />,
    },
    {
      time: "5:30 PM",
      title: "Comida",
      description: "Paraje Ojo de Agua,\ncarretera al Tule km 13.",
      icon: <UtensilsCrossed className="text-wedding-sage" size={56} strokeWidth={1.2} />,
    },
    {
      time: "7:00 PM",
      title: "Baile de los novios",
      description: "y con los papás.",
      icon: <Music className="text-wedding-sage" size={60} strokeWidth={1.2} />,
    },
    {
      time: "7:30 PM",
      title: "Fiesta",
      description: "",
      icon: <PartyPopper className="text-wedding-sage" size={60} strokeWidth={1.2} />,
    },
    {
      time: "11:00 PM",
      title: "Cena",
      description: "",
      icon: <Soup className="text-wedding-sage" size={58} strokeWidth={1.2} />,
    },
    {
      time: "12:00 AM",
      title: "Regreso en vans al",
      description: "centro de la ciudad\nRegreso cada hora a partir de\nlas 12:00 a.m. hasta las 4:00 a.m.",
      icon: <Bus className="text-wedding-sage" size={54} strokeWidth={1.2} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-white to-gray-100 py-16 sm:py-20 md:py-24 px-4"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 sm:mb-20 flex items-center justify-center gap-4">
          {/* Hojas decorativas */}
          <Leaf className="text-[#8B9D83] flex-shrink-0" size={50} strokeWidth={1.2} />
          
          <div className="text-center">
            <h2 className="font-elegant text-gray-500 text-lg sm:text-xl tracking-wide">
              Nuestra
            </h2>
            <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-gray-800 -mt-2">
              celebración
            </h2>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Línea Vertical Central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative grid grid-cols-2 gap-8 items-start"
              >
                {/* Left Side: Icon + Time */}
                <div className="flex flex-col items-end pr-8">
                  <div className="mb-3">
                    {event.icon}
                  </div>
                  <p className="font-elegant text-gray-500 text-sm sm:text-base tracking-wide">
                    {event.time}
                  </p>
                </div>

                {/* Center Cross Line */}
                <div className="absolute left-1/2 top-6 h-px w-16 sm:w-20 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2" />

                {/* Right Side: Title + Description */}
                <div className="pl-8">
                  <h3 className="font-serif text-gray-800 text-xl sm:text-2xl md:text-3xl mb-2">
                    {event.title}
                  </h3>
                  <p className="font-elegant text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
