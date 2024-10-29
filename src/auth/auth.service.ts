import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "./auth.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { userDto } from "src/DTO/user.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class authService {
    constructor(
        @InjectRepository(User)
        private authRespository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    private uses = [];
    async createUser(userDto: userDto): Promise<User> {

        const existUser = await this.authRespository.findOne({where: {username: userDto.username}});
        if(existUser){
            throw new ConflictException('Username is exists');
        }

        const hashPassword = await bcrypt.hash(userDto.password, 10);

        const newUser = this.authRespository.create({...userDto, password: hashPassword});
        return this.authRespository.save(newUser);
    }

    async findUserByUsername(username: string): Promise<User> {
        const user = await this.authRespository.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    //login
    async loginUser(userDto: userDto): Promise<any> {
        const user = await this.findUserByUsername(userDto.username);
        const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = {username: user.username};
        const accessToken = this.jwtService.sign(payload);
        return {
            access_token: accessToken,
            user: user
        };
    }




}