import { PrismaService } from 'src/database/prisma/prisma.service';
export declare class TestResolver {
    private prismaService;
    constructor(prismaService: PrismaService);
    hello(): string;
}
