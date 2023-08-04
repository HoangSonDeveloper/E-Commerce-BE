import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseClass } from 'src/course-classes/models/course-classes.model';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './models/enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment])],
  controllers: [EnrollmentController],
  providers: [{ provide: 'EnrollmentService', useClass: EnrollmentService }],
})
export class EnrollmentModule {}
