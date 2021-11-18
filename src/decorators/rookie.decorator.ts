import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const RookieToken = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        let token = request.headers['boboc-token'];

        if (!token)
            throw new HttpException('Tokenul de boboc nu a fost gasit, asigura-te ca ai introdus tokenul in campul boboc-token din header', HttpStatus.I_AM_A_TEAPOT);

        return token;
    },
);
