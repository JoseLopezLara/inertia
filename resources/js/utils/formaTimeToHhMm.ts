export const formatTimeToHhMm = (time: string | null) => {
    const [hours, minutes, seconds] = time!.split(':');
    return `${hours}:${minutes}`;
}