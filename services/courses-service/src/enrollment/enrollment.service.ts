import { isEmpty } from 'lodash';
import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { InjectModel } from '@nestjs/sequelize';
import { CourseClass } from 'src/course-classes/models/course-classes.model';
import { Enrollment } from './models/enrollment.model';
import { IEnerollmentService } from './enrollment.interface';
import { EnrollmentInputDto } from './enrollment.dto';

@Injectable()
export class EnrollmentService implements IEnerollmentService {
  constructor(
    @InjectModel(Enrollment) private readonly enrollmentRepo: typeof Enrollment,
  ) {}

  async enroll(enrollment: EnrollmentInputDto): Promise<Enrollment> {
    const result: Enrollment = await this.enrollmentRepo.create(
      enrollment as any,
    );

    return result;
  }
}
