import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './student.input';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(returns => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.get(id);
  }

  @Query(returns => [StudentType])
  students() {
    return this.studentService.getAll();
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }
}
