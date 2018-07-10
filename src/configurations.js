// a little bit of webpack magic to ensure that prod builds are always pointing to correct main server
export const DEFAULT_API_URL = process.env.BASE_URL || "http://localhost:8080";

console.log(DEFAULT_API_URL);