import { Get, UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Resolver('test')
export class TestResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => String)
  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello worlds';
  }
}
