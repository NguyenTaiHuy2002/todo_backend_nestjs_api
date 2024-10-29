import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./auth.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'scret-todo',
            signOptions: {expiresIn: '60s'},
        })
    ],
    controllers: [authController],
    providers: [authService]
})

export class authModule{

}