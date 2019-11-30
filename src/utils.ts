export const cookiesParse = (cookies: string[]): string[] => (
  cookies.map((e) => (e.split("; ")[0]))
);