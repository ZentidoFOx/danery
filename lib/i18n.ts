export type Language = 'es' | 'en' | 'pt';

export interface Translations {
    // Hero Section
    hero: {
        biblicalQuote: string;
        getting_married: string;
        and: string;
        date: string;
        location: string;
        time: string;
    };
    // Countdown Section
    countdown: {
        title_small: string;
        title_large: string;
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
        add_to_calendar: string;
        google_calendar: string;
        apple_calendar: string;
    };
    // Reception Section
    reception: {
        title_small: string;
        title_large: string;
        civil_ceremony: string;
        church_name: string;
        address: string;
        how_to_get: string;
        get_directions: string;
    };
    // Itinerary Section
    itinerary: {
        title_small: string;
        title_large: string;
        ceremony_time: string;
        ceremony_title: string;
        ceremony_desc: string;
        reception_time: string;
        reception_title: string;
        reception_desc: string;
        dinner_time: string;
        dinner_title: string;
        dinner_desc: string;
        dance_time: string;
        dance_title: string;
        dance_desc: string;
        farewell_time: string;
        farewell_title: string;
        farewell_desc: string;
    };
    // Dress Code Section
    dressCode: {
        title_small: string;
        title_large: string;
        attire: string;
        attire_name: string;
        palette: string;
        palette_name: string;
    };
    // Registry Section
    registry: {
        title_small: string;
        title_large: string;
        description_1: string;
        description_2: string;
        usa: string;
        peru: string;
        brazil: string;
        holder: string;
        number: string;
        open_app: string;
        transfer: string;
        thank_you: string;
        thanks_msg: string;
        copy: string;
        copied: string;
    };
    // RSVP Section
    rsvp: {
        title_small: string;
        title_large: string;
        name_label: string;
        name_placeholder: string;
        lastname_label: string;
        lastname_placeholder: string;
        attendance_label: string;
        select_option: string;
        yes_option: string;
        no_option: string;
        submit_btn: string;
        online_title: string;
        online_desc: string;
        online_btn: string;
        timezones_title: string;
        los_angeles: string;
        peru: string;
        brazil: string;
        bolivia: string;
        alert_msg: string;
    };
    // Footer
    footer: {
        thank_you: string;
        made_with_love: string;
    };
    // Floating RSVP
    floatingRSVP: {
        confirm: string;
    };
}

export const translations: Record<Language, Translations> = {
    es: {
        hero: {
            biblicalQuote: "Mi casa y yo serviremos a Dios. – Josué 24:15",
            getting_married: "¡NOS CASAMOS!",
            and: "&",
            date: "07 de Diciembre 2025",
            location: "Iglesia Tricities, 221 S Benton St, Kennewick",
            time: "4:00 p. m. – 9:00 p. m.",
        },
        countdown: {
            title_small: "CUENTA REGRESIVA",
            title_large: "Nuestro Gran Día",
            days: "Días",
            hours: "Horas",
            minutes: "Minutos",
            seconds: "Segundos",
            add_to_calendar: "Agregar al Calendario",
            google_calendar: "Google Calendar",
            apple_calendar: "Apple Calendar",
        },
        reception: {
            title_small: "DONDE & CUANDO",
            title_large: "Celebración",
            civil_ceremony: "Ceremonia Civil",
            church_name: "Iglesia Tricities",
            address: "221 S Benton St, Kennewick, WA",
            how_to_get: "Cómo Llegar",
            get_directions: "Ver Indicaciones",
        },
        itinerary: {
            title_small: "PROGRAMA",
            title_large: "Itinerario del Día",
            ceremony_time: "4:00 p. m.",
            ceremony_title: "Ceremonia",
            ceremony_desc: "Iglesia Tricities, 221 S Benton St, Kennewick",
            reception_time: "6:00 p. m.",
            reception_title: "Recepción",
            reception_desc: "Inicio de la celebración",
            dinner_time: "7:00 p. m.",
            dinner_title: "Cena y brindis",
            dinner_desc: "Disfrutemos juntos",
            dance_time: "8:00 p. m.",
            dance_title: "Primer baile",
            dance_desc: "Nuestro primer baile",
            farewell_time: "9:00 p. m.",
            farewell_title: "Despedida",
            farewell_desc: "Fin de la celebración",
        },
        dressCode: {
            title_small: "CÓDIGO DE VESTIMENTA",
            title_large: "Detalles de Estilo",
            attire: "Vestimenta",
            attire_name: "Sunday's Best.",
            palette: "Paleta de Colores",
            palette_name: "Soft Navy Palette.",
        },
        registry: {
            title_small: "MESA DE REGALOS",
            title_large: "Tu Presencia es Nuestro Regalo",
            description_1: "Nuestro mayor tesoro es celebrar este día junto a ustedes.",
            description_2: "Si deseas hacernos un regalo, les agradecemos de corazón una contribución a nuestra nueva vida juntos.",
            usa: "USA",
            peru: "Perú",
            brazil: "Brasil",
            holder: "Titular",
            number: "Número",
            open_app: "Abrir App",
            transfer: "Transferencia",
            thank_you: "¡Gracias por tu generosidad!",
            thanks_msg: "Gracias por tu generosidad y por ser parte de esta nueva etapa.",
            copy: "Copiar",
            copied: "¡Copiado!",
        },
        rsvp: {
            title_small: "R S V P",
            title_large: "Confirma tu Asistencia",
            name_label: "Nombre",
            name_placeholder: "Tu nombre",
            lastname_label: "Apellido",
            lastname_placeholder: "Tu apellido",
            attendance_label: "Confirmación",
            select_option: "Selecciona una opción",
            yes_option: "Sí, asistiré",
            no_option: "No podré asistir",
            submit_btn: "Confirmar Asistencia",
            online_title: "Invitados Online",
            online_desc: "Para quienes no puedan acompañarnos presencialmente, podrán unirse vía Google Meet ese día.",
            online_btn: "Unión a Google Meet",
            timezones_title: "Horarios de la Ceremonia",
            los_angeles: "Los Ángeles",
            peru: "Perú",
            brazil: "Brasil",
            bolivia: "Bolivia",
            alert_msg: "¡Gracias {name}! Tu respuesta ha sido registrada.",
        },
        footer: {
            thank_you: "¡Gracias por ser parte de nuestra historia!",
            made_with_love: "Hecho con",
        },
        floatingRSVP: {
            confirm: "Confirmar Asistencia",
        },
    },
    en: {
        hero: {
            biblicalQuote: "As for me and my house, we will serve the Lord. – Joshua 24:15",
            getting_married: "WE'RE GETTING MARRIED!",
            and: "&",
            date: "December 07, 2025",
            location: "Tricities Church, 221 S Benton St, Kennewick",
            time: "4:00 p.m. – 9:00 p.m.",
        },
        countdown: {
            title_small: "COUNTDOWN",
            title_large: "Our Big Day",
            days: "Days",
            hours: "Hours",
            minutes: "Minutes",
            seconds: "Seconds",
            add_to_calendar: "Add to Calendar",
            google_calendar: "Google Calendar",
            apple_calendar: "Apple Calendar",
        },
        reception: {
            title_small: "WHERE & WHEN",
            title_large: "Celebration",
            civil_ceremony: "Civil Ceremony",
            church_name: "Tricities Church",
            address: "221 S Benton St, Kennewick, WA",
            how_to_get: "How to Get There",
            get_directions: "Get Directions",
        },
        itinerary: {
            title_small: "SCHEDULE",
            title_large: "Day's Itinerary",
            ceremony_time: "4:00 p.m.",
            ceremony_title: "Ceremony",
            ceremony_desc: "Tricities Church, 221 S Benton St, Kennewick",
            reception_time: "6:00 p.m.",
            reception_title: "Reception",
            reception_desc: "Celebration begins",
            dinner_time: "7:00 p.m.",
            dinner_title: "Dinner & Toast",
            dinner_desc: "Let's enjoy together",
            dance_time: "8:00 p.m.",
            dance_title: "First Dance",
            dance_desc: "Our first dance",
            farewell_time: "9:00 p.m.",
            farewell_title: "Farewell",
            farewell_desc: "End of celebration",
        },
        dressCode: {
            title_small: "DRESS CODE",
            title_large: "Style Details",
            attire: "Attire",
            attire_name: "Sunday's Best.",
            palette: "Color Palette",
            palette_name: "Soft Navy Palette.",
        },
        registry: {
            title_small: "GIFT REGISTRY",
            title_large: "Your Presence is Our Present",
            description_1: "Our greatest treasure is celebrating this day with you.",
            description_2: "If you wish to give us a gift, we heartily appreciate a contribution to our new life together.",
            usa: "USA",
            peru: "Peru",
            brazil: "Brazil",
            holder: "Holder",
            number: "Number",
            open_app: "Open App",
            transfer: "Transfer",
            thank_you: "Thank you for your generosity!",
            thanks_msg: "Thank you for your generosity and for being part of this new chapter.",
            copy: "Copy",
            copied: "Copied!",
        },
        rsvp: {
            title_small: "R S V P",
            title_large: "Confirm Attendance",
            name_label: "First Name",
            name_placeholder: "Your first name",
            lastname_label: "Last Name",
            lastname_placeholder: "Your last name",
            attendance_label: "Confirmation",
            select_option: "Select an option",
            yes_option: "Yes, I will attend",
            no_option: "I cannot attend",
            submit_btn: "Confirm Attendance",
            online_title: "Online Guests",
            online_desc: "For those who cannot join us in person, you can join via Google Meet on that day.",
            online_btn: "Join Google Meet",
            timezones_title: "Ceremony Schedule",
            los_angeles: "Los Angeles",
            peru: "Peru",
            brazil: "Brazil",
            bolivia: "Bolivia",
            alert_msg: "Thank you {name}! Your response has been recorded.",
        },
        footer: {
            thank_you: "Thank you for being part of our story!",
            made_with_love: "Made with",
        },
        floatingRSVP: {
            confirm: "Confirm Attendance",
        },
    },
    pt: {
        hero: {
            biblicalQuote: "Eu e minha casa serviremos ao Senhor. – Josué 24:15",
            getting_married: "VAMOS NOS CASAR!",
            and: "&",
            date: "07 de Dezembro de 2025",
            location: "Igreja Tricities, 221 S Benton St, Kennewick",
            time: "16:00 – 21:00",
        },
        countdown: {
            title_small: "CONTAGEM REGRESSIVA",
            title_large: "Nosso Grande Dia",
            days: "Dias",
            hours: "Horas",
            minutes: "Minutos",
            seconds: "Segundos",
            add_to_calendar: "Adicionar ao Calendário",
            google_calendar: "Google Agenda",
            apple_calendar: "Apple Calendar",
        },
        reception: {
            title_small: "ONDE & QUANDO",
            title_large: "Celebração",
            civil_ceremony: "Cerimônia Civil",
            church_name: "Igreja Tricities",
            address: "221 S Benton St, Kennewick, WA",
            how_to_get: "Como Chegar",
            get_directions: "Ver Direções",
        },
        itinerary: {
            title_small: "PROGRAMA",
            title_large: "Itinerário do Dia",
            ceremony_time: "16:00",
            ceremony_title: "Cerimônia",
            ceremony_desc: "Igreja Tricities, 221 S Benton St, Kennewick",
            reception_time: "18:00",
            reception_title: "Recepção",
            reception_desc: "Início da celebração",
            dinner_time: "19:00",
            dinner_title: "Jantar e Brinde",
            dinner_desc: "Vamos aproveitar juntos",
            dance_time: "20:00",
            dance_title: "Primeira Dança",
            dance_desc: "Nossa primeira dança",
            farewell_time: "21:00",
            farewell_title: "Despedida",
            farewell_desc: "Fim da celebração",
        },
        dressCode: {
            title_small: "CÓDIGO DE VESTIMENTA",
            title_large: "Detalhes de Estilo",
            attire: "Traje",
            attire_name: "Sunday's Best.",
            palette: "Paleta de Cores",
            palette_name: "Soft Navy Palette.",
        },
        registry: {
            title_small: "LISTA DE PRESENTES",
            title_large: "Sua Presença é Nosso Presente",
            description_1: "Nosso maior tesouro é celebrar este dia com vocês.",
            description_2: "Se desejar nos dar um presente, agradecemos de coração uma contribuição para nossa nova vida juntos.",
            usa: "EUA",
            peru: "Peru",
            brazil: "Brasil",
            holder: "Titular",
            number: "Número",
            open_app: "Abrir App",
            transfer: "Transferência",
            thank_you: "Obrigado pela sua generosidade!",
            thanks_msg: "Obrigado pela sua generosidade e por fazer parte deste novo capítulo.",
            copy: "Copiar",
            copied: "Copiado!",
        },
        rsvp: {
            title_small: "R S V P",
            title_large: "Confirme sua Presença",
            name_label: "Nome",
            name_placeholder: "Seu nome",
            lastname_label: "Sobrenome",
            lastname_placeholder: "Seu sobrenome",
            attendance_label: "Confirmação",
            select_option: "Selecione uma opção",
            yes_option: "Sim, estarei lá",
            no_option: "Não poderei ir",
            submit_btn: "Confirmar Presença",
            online_title: "Convidados Online",
            online_desc: "Para quem não puder estar presente, junte-se a nós via Google Meet.",
            online_btn: "Entrar no Google Meet",
            timezones_title: "Horários da Cerimônia",
            los_angeles: "Los Angeles",
            peru: "Peru",
            brazil: "Brasil",
            bolivia: "Bolívia",
            alert_msg: "Obrigado {name}! Sua resposta foi registrada.",
        },
        footer: {
            thank_you: "Obrigado por fazer parte da nossa história!",
            made_with_love: "Feito com",
        },
        floatingRSVP: {
            confirm: "Confirmar Presença",
        },
    },
};
