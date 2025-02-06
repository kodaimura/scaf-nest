
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
