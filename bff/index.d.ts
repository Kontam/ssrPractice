export type test = string;

export type FetchrRequestBody<T> = {
  requests: {
    g0: {
      resource: string
      body: T
    }
  }
}

export type SMCCookies = {
  token?: string
}
