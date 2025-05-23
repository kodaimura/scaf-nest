
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION || '30d',
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule { }
