
export interface Resultado {
    victorianos: number;
    rival: number;
}

export interface SubEvento {
    hora: string;
    actividad: string;
}


export interface MatchData {
    id: number;
    equipo: string;
    fecha: string;
    hora: string;
    tipo: 'Partido' | 'Concentración' | 'Evento' ;
    titulo: string;
    ubicacion: string;
    rival: string;
    esLocal: boolean;
    logo_victorianos: string;
    logo_rival: string;
    
    // Propiedades opcionales o que dependen del 'tipo'
    resultado: Resultado | null;
    link_youtube: string | null;
    sub_eventos?: SubEvento[];
    detalles?: string;
}