"use client";

import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';

export default function AddToCalendarButton() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // Event details
    const eventDetails = {
        title: 'Boda Salvador y Danery / Salvador & Danery Wedding',
        location: 'Iglesia Tricities, 221 S Benton St, Kennewick, WA',
        description: 'Celebración de la boda de Salvador y Danery / Celebration of Salvador and Danery\'s wedding',
        startDate: '2025-12-07T16:00:00', // 4:00 PM
        endDate: '2025-12-07T21:00:00',   // 9:00 PM
    };

    // Generate Google Calendar URL
    const getGoogleCalendarUrl = () => {
        const startDate = eventDetails.startDate.replace(/[-:]/g, '').replace('.000', '');
        const endDate = eventDetails.endDate.replace(/[-:]/g, '').replace('.000', '');

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: eventDetails.title,
            dates: `${startDate}/${endDate}`,
            details: eventDetails.description,
            location: eventDetails.location,
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    // Generate iCal file content
    const generateICalFile = () => {
        const startDate = new Date(eventDetails.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(eventDetails.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Salvador y Danery Wedding//ES
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'boda-salvador-danery.ics';
        link.click();
    };

    return (
        <div className="relative inline-block">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-wedding-brown-warm hover:bg-wedding-brown-warm/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Calendar size={20} />
                <span className="font-medium text-sm tracking-wide">
                    {t.countdown.add_to_calendar}
                </span>
            </motion.button>

            {/* Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-wedding-beige-light/30 overflow-hidden min-w-[200px] z-10"
                >
                    <motion.a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-wedding-beige-light/20 transition-colors"
                        whileHover={{ x: 4 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <Calendar size={18} className="text-wedding-brown-warm" />
                        <span className="text-wedding-navy-dark font-medium text-sm">
                            {t.countdown.google_calendar}
                        </span>
                    </motion.a>

                    <motion.button
                        onClick={() => {
                            generateICalFile();
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-wedding-beige-light/20 transition-colors"
                        whileHover={{ x: 4 }}
                    >
                        <Download size={18} className="text-wedding-brown-warm" />
                        <span className="text-wedding-navy-dark font-medium text-sm">
                            {t.countdown.apple_calendar}
                        </span>
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
