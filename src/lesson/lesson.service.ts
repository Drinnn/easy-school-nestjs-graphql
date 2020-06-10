import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsInput } from './assign-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  public async create(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.lessonRepository.save(lesson);
  }

  public async get(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({ id });
  }

  public async getAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  public async assignStudentsToLesson(
    assignStudentsInput: AssignStudentsInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsInput;

    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    if (lesson.students) lesson.students = [...lesson.students, ...studentIds];
    else {
      lesson.students = [];
      lesson.students = [...lesson.students, ...studentIds];
    }

    return this.lessonRepository.save(lesson);
  }
}
