export function logDetailedObject(label: string, obj: any) {
    console.log(`${label}:`, JSON.stringify(obj, null, 2));
}