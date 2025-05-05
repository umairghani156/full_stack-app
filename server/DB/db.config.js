import { PrismaClient } from "@prisma/client";
//import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient({
    log: ["query"]
});

export default prisma