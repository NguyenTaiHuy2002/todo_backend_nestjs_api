import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.entity";
import { TodoDto } from "src/DTO/todo.dto";

@Controller('todo-list')

export class TodoController {
    constructor(private readonly todoService: TodoService) { };

    @Get('search') 
    async searchTask(@Query('userId') userId: number, @Query('keyword') keyword: string): Promise<Todo[]>{
        return this.todoService.searchTask(userId, keyword);
    }

    @Get('filter-by-date')
    async filterByDate(
        @Query('userId') userId: number,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<Todo[]> {
        console.log('FilterByDate Called', { userId, startDate, endDate });


        const userIdNumber = Number(userId);
        const start = new Date(startDate);
        const end = new Date(endDate);

        return this.todoService.filterTaskByDate(userIdNumber, start, end);
    }


    @Get(':userId')

    async getAllData(@Param('userId') userId: number): Promise<Todo[]> {
        return this.todoService.findAll(userId);
    }


    @Post()
    async createData(@Body() todoDto: TodoDto): Promise<Todo> {
        return this.todoService.create(todoDto);
    }

    @Delete('completed')
    async deleteCompletedTasks(@Query('userId') userId: number): Promise<void> {
        return this.todoService.deleteCompletedTasks(userId);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void> {
        return this.todoService.deleteTask(id);
    }


    @Put(':id')
    async updateStatus(@Param('id') id: number, @Body() updateDto: TodoDto): Promise<void> {
        return this.todoService.updateTodo(id, updateDto);
    }

}