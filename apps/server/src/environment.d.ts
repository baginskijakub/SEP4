declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    WEB_TOKEN_SECRET: string
    LORAWAN_SOCKET_URL: string
    PORT: string
  }
}
