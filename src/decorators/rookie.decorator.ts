import { PrismaClient } from '.prisma/client';
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const RookieToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.headers['boboc-token'];
    },
);
