export interface Todo {
    id: number;
    title: string;
    description: string | null;
    time: string | null;
    date: string | null;
    completed: boolean;
}
