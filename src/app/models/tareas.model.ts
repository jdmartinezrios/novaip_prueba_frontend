export class Tareas {
    public tareaId: number;
    public descripcion: string;
    public fechaEjecucion: Date;
    public estado: string;
    public usuarioId: Object = {
        usuarioId: undefined
    }; 
    public email: string;
}
