/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_ENDPOINT: string;
    readonly NEXT_PUBLIC_ADMIN_SECRET: string;
  }
}

// declare module 'tailwind.macro';

declare module 'tailwind.macro' {
  export default function tw(string: TemplateStringsArray): string;
}
