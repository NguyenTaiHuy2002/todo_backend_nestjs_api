import { Body, Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { userDto } from "src/DTO/user.dto";
import { User } from "./auth.entity";

@Controller('auth')

export class authController{
    constructor(private readonly authService: authService){};

    @Post('/register')

    async createUser(@Body() userDto: userDto): Promise<User> {
        return this.authService.createUser(userDto);
    }

    @Post('/login')

    async loginUser(@Body() userDto: userDto): Promise<any> {
        return this.authService.loginUser(userDto);
    }

    
}