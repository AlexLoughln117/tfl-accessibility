declare namespace NodeJS {
  interface Timeout {}
  interface Process {
    env: {
      [key: string]: string | undefined;
      NODE_ENV: 'development' | 'production' | 'test';
    };
  }
} 