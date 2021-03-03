export class SuebotAPIExeption extends Error {
  reason: string;
  constructor(message: string) {
    super(message);
    this.reason = message;
  }
  
  response() {
    return {
      error: true,
      reason: this.reason
    }
  }
}