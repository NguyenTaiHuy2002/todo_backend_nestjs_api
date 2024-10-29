import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";
import { Between, Like, Repository } from "typeorm";
import { TodoDto } from "src/DTO/todo.dto";
import { userDto } from "src/DTO/user.dto";

@Injectable({})

export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todosRespository: Repository<Todo>,
    ) { }

    async findAll(userId: number): Promise<Todo[]> {
        return this.todosRespository.find({ where: { user_id: userId } }); // Thay đổi tùy thuộc vào cấu trúc entity của bạn
    }
    

    //tạo mới
    async create(todoDto: TodoDto): Promise<Todo> {
        const todo = this.todosRespository.create(todoDto);
        return this.todosRespository.save(todo);
    }

    
    async deleteCompletedTasks(userId: number): Promise<void> {
        await this.todosRespository.delete( {user_id: userId, completed: true });
    }
    
    //xóa task
    async deleteTask(id: number): Promise<void> {
        await this.todosRespository.delete(id);
    }
    

    async updateTodo(id: number, updateDto: TodoDto): Promise<void> {
        // Lọc các thuộc tính có giá trị không phải là undefined
        const updateData: Partial<TodoDto> = {
            ...updateDto,
        };
    
        // Xóa các thuộc tính có giá trị undefined
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });
    
        // Cập nhật chỉ khi có dữ liệu
        if (Object.keys(updateData).length > 0) {
            updateData.updatedAt = new Date();
            await this.todosRespository.update(id, updateData);
        }
    }

    //filter by date
    async filterTaskByDate(userId: number, startDate: Date, endDate: Date): Promise<Todo[]>{
        
        return this.todosRespository.find({
            where: {
                user_id: userId,
                createdAt: Between(startDate, endDate)
            }
        })
    }

    //search
    async searchTask(userId: number, keyword: string): Promise<Todo[]> {
        return this.todosRespository.find({
            where: {
                user_id: userId,
                tittle: Like(`%${keyword}%`)
            }
        })
    }
    

}