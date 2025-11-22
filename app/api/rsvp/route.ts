import { NextResponse } from 'next/server';
import Redis from 'ioredis';

export interface Attendee {
    firstName: string;
    lastName: string;
    attending: string;
    timestamp: string;
}

// Crear cliente Redis
const redis = new Redis(process.env.REDIS_URL || '');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, attending } = body;

        // Validación
        if (!firstName || !lastName || !attending) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        // Crear nuevo registro
        const newAttendee: Attendee = {
            firstName,
            lastName,
            attending,
            timestamp: new Date().toISOString(),
        };

        // Obtener lista actual o crear nueva
        const attendeesStr = await redis.get('attendees');
        const attendees: Attendee[] = attendeesStr ? JSON.parse(attendeesStr) : [];

        // Agregar nuevo asistente
        attendees.push(newAttendee);

        // Guardar en Redis
        await redis.set('attendees', JSON.stringify(attendees));

        return NextResponse.json(
            { success: true, message: 'Confirmación guardada exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error al guardar confirmación:', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const attendeesStr = await redis.get('attendees');
        const attendees: Attendee[] = attendeesStr ? JSON.parse(attendeesStr) : [];

        return NextResponse.json(
            { attendees, total: attendees.length },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error al obtener asistentes:', error);
        return NextResponse.json(
            { error: 'Error al obtener datos' },
            { status: 500 }
        );
    }
}

// DELETE: Eliminar todos los asistentes
export async function DELETE() {
    try {
        await redis.del('attendees');
        return NextResponse.json(
            { message: 'Todos los datos han sido eliminados' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error al eliminar asistentes:', error);
        return NextResponse.json(
            { error: 'Error al eliminar datos' },
            { status: 500 }
        );
    }
}
