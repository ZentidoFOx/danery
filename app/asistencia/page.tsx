"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { CheckCircle, XCircle, RefreshCw, Trash2 } from "lucide-react";

interface Attendee {
    firstName: string;
    lastName: string;
    attending: string;
    timestamp: string;
}

export default function AsistenciaPage() {
    const { t } = useLanguage();
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/rsvp');
            const data = await response.json();

            if (response.ok) {
                setAttendees(data.attendees);
            } else {
                setError(data.error || t.attendance.error_loading);
            }
        } catch (err) {
            setError(t.attendance.error_server);
        } finally {
            setLoading(false);
        }
    };

    const clearAllData = async () => {
        if (!confirm(t.attendance.confirm_delete)) {
            return;
        }

        try {
            const response = await fetch('/api/rsvp', {
                method: 'DELETE',
            });

            if (response.ok) {
                alert(t.attendance.delete_success);
                fetchAttendees();
            } else {
                alert(t.attendance.delete_error);
            }
        } catch (err) {
            alert(t.attendance.error_server);
        }
    };

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const yesCount = attendees.filter(a => a.attending === 'si').length;
    const noCount = attendees.filter(a => a.attending === 'no').length;

    const filteredAttendees = attendees.filter(attendee => {
        if (filter === 'all') return true;
        if (filter === 'yes') return attendee.attending === 'si';
        if (filter === 'no') return attendee.attending === 'no';
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-wedding-navy-dark to-wedding-navy-medium flex items-center justify-center">
                <div className="text-white text-2xl font-poppins">{t.attendance.loading}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-wedding-navy-dark to-wedding-navy-medium flex items-center justify-center p-4">
                <div className="text-white text-xl font-poppins text-center">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-wedding-navy-dark via-wedding-navy-medium to-wedding-beige-light py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-script text-white mb-4">
                        {t.attendance.page_title}
                    </h1>
                    <p className="text-wedding-beige-light text-lg font-poppins tracking-wider">
                        {t.attendance.subtitle}
                    </p>
                </motion.div>

                {/* Estadísticas - 3 columnas en una fila horizontal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-3 gap-3 md:gap-6 mb-8"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                        <p className="text-wedding-beige-light text-xs md:text-sm font-poppins uppercase tracking-wider mb-2">
                            {t.attendance.total_confirmed}
                        </p>
                        <p className="text-white text-2xl md:text-4xl font-script">{attendees.length}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                        <p className="text-wedding-beige-light text-xs md:text-sm font-poppins uppercase tracking-wider mb-2">
                            {t.attendance.will_attend}
                        </p>
                        <p className="text-green-400 text-2xl md:text-4xl font-script">{yesCount}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                        <p className="text-wedding-beige-light text-xs md:text-sm font-poppins uppercase tracking-wider mb-2">
                            {t.attendance.wont_attend}
                        </p>
                        <p className="text-red-400 text-2xl md:text-4xl font-script">{noCount}</p>
                    </div>
                </motion.div>

                {/* Filtros */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 flex flex-wrap gap-3 justify-center"
                >
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2.5 rounded-xl font-poppins text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'all'
                                ? 'bg-white text-wedding-navy-dark shadow-lg'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        {t.attendance.filter_all} ({attendees.length})
                    </button>
                    <button
                        onClick={() => setFilter('yes')}
                        className={`px-6 py-2.5 rounded-xl font-poppins text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'yes'
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        {t.attendance.filter_yes} ({yesCount})
                    </button>
                    <button
                        onClick={() => setFilter('no')}
                        className={`px-6 py-2.5 rounded-xl font-poppins text-sm uppercase tracking-wider transition-all duration-300 ${filter === 'no'
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        {t.attendance.filter_no} ({noCount})
                    </button>
                </motion.div>

                {/* Tabla */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-wedding-navy-medium text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-poppins uppercase tracking-wider">
                                        {t.attendance.table_number}
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-poppins uppercase tracking-wider">
                                        {t.attendance.table_name}
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-poppins uppercase tracking-wider">
                                        {t.attendance.table_lastname}
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-poppins uppercase tracking-wider">
                                        {t.attendance.table_attendance}
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-poppins uppercase tracking-wider">
                                        {t.attendance.table_date}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-wedding-beige-light/30">
                                {filteredAttendees.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-wedding-navy-dark/60 font-poppins">
                                            {t.attendance.no_results}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAttendees.map((attendee, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-wedding-beige-light/10 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-wedding-navy-dark font-poppins">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-wedding-navy-dark font-poppins font-medium">
                                                {attendee.firstName}
                                            </td>
                                            <td className="px-6 py-4 text-wedding-navy-dark font-poppins font-medium">
                                                {attendee.lastName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {attendee.attending === 'si' ? (
                                                    <span className="inline-flex items-center gap-1.5 text-green-700 font-poppins text-sm">
                                                        <CheckCircle size={16} />
                                                        {t.attendance.yes_attending}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-red-700 font-poppins text-sm">
                                                        <XCircle size={16} />
                                                        {t.attendance.no_attending}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-wedding-navy-dark/70 font-poppins text-sm">
                                                {formatDate(attendee.timestamp)}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-wedding-beige-light/30">
                        {filteredAttendees.length === 0 ? (
                            <div className="px-6 py-12 text-center text-wedding-navy-dark/60 font-poppins">
                                {t.attendance.no_results}
                            </div>
                        ) : (
                            filteredAttendees.map((attendee, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-4 hover:bg-wedding-beige-light/10 transition-colors"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-wedding-navy-medium rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-poppins font-semibold">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-wedding-navy-dark font-poppins font-semibold text-lg">
                                                {attendee.firstName} {attendee.lastName}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="ml-11 space-y-2">
                                        <div>
                                            {attendee.attending === 'si' ? (
                                                <span className="inline-flex items-center gap-1.5 text-green-700 font-poppins text-sm">
                                                    <CheckCircle size={16} />
                                                    {t.attendance.yes_attending}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-red-700 font-poppins text-sm">
                                                    <XCircle size={16} />
                                                    {t.attendance.no_attending}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-wedding-navy-dark/60 font-poppins text-xs">
                                            {formatDate(attendee.timestamp)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Botones de acción */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={fetchAttendees}
                        className="bg-wedding-navy-medium hover:bg-wedding-navy-dark text-white px-8 py-3 rounded-xl font-poppins uppercase tracking-wider transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        {t.attendance.refresh_button}
                    </button>
                    <button
                        onClick={clearAllData}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-poppins uppercase tracking-wider transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                    >
                        <Trash2 size={18} />
                        {t.attendance.clear_all_button}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
