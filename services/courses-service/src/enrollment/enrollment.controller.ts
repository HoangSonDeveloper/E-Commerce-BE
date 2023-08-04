import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty } from 'lodash';
import { ICount, IQuery } from '../common/common.interface';
import { Enrollment } from './models/enrollment.model';
import { EnrollmentInputDto } from './enrollment.dto';
import { IEnerollmentService } from './enrollment.interface';

@Controller()
export class EnrollmentController {
  constructor(
    @Inject('EnrollmentService') private readonly service: IEnerollmentService,
  ) {}

  @GrpcMethod('CoursesService', 'enroll')
  async enroll(enrollment: EnrollmentInputDto): Promise<Enrollment> {
    const result: Enrollment = await this.service.enroll(enrollment);

    return result;
  }
}
