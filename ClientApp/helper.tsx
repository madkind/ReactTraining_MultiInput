export const language = "en" //valid values: "hu", "en"

export function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}