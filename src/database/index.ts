import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";


@singleton()
export class Prisma extends PrismaClient {

  constructor() {
    super();
  }
}
