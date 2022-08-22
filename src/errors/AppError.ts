export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(msg: string, sCode = 400) {
    this.message = msg;
    this.statusCode = sCode;
  }
}