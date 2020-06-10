import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsInput } from './assign-students.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.get(id);
  }

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getAll();
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.create(createLessonInput);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsInput') assignStudentsInput: AssignStudentsInput,
  ) {
    return this.lessonService.assignStudentsToLesson(assignStudentsInput);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
