import { container } from "tsyringe";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";
import { PrismaRepository } from "../../repositories/prismaRepository";

container.registerSingleton<IAccountRepository>("PrismaRepository", PrismaRepository);
