import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UserRole } from './models/user-roles.model';
import { QueryUtils } from '../utils/query.utils';
import { merge } from 'lodash';
import { HelperUtils } from '../utils/helper.utils';
import { ROLES } from '../common/common.interface';
import { Course } from '../courses/models/courses.model';
import { CourseInstructor } from '../courses/models/course-instructors.model';
import { Category } from '../courses/models/categories.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Role) private readonly roleRepo: typeof Role,
    @InjectModel(UserRole) private readonly userRoleRepo: typeof UserRole,
    @InjectModel(Course) private readonly courseRepo: typeof Course,
    private readonly queryUtils: QueryUtils,
    private readonly helperUtils: HelperUtils,
  ) {}

  async getUser(id: string): Promise<any> {
    const user: User = await this.userRepo.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async getInstructor(
    id: string,
    page: number,
    pageSize: number,
    filterBy: string,
    orderBy: string,
  ): Promise<any> {
    const query = {
      raw: true,
      attributes: {
        exclude: ['password'],
      },
      where: {},
    };

    merge(
      query,
      await this.queryUtils.buildQuery(page, pageSize, filterBy, orderBy),
    );

    const user: User = await this.userRepo.findByPk(id, query);

    const userRole = await this.getUserRole(id, ROLES.INSTRUCTOR);

    if (!userRole) {
      throw new BadRequestException('Lecturer does not exist');
    }

    const courses = await this.courseRepo.findAll({
      include: [
        {
          model: CourseInstructor,
          attributes: [],
          where: {
            instructor_id: id,
          },
        },
        {
          model: Category,
          through: {
            attributes: [],
          },
        },
      ],
    });

    const count = await this.userRoleRepo.count({
      where: {
        role_id: ROLES.INSTRUCTOR,
      },
    });

    const { next, prev } = await this.helperUtils.getPagination(
      '/users/instructors',
      count,
      page,
      pageSize,
      filterBy,
      orderBy,
    );

    return {
      count,
      next,
      prev,
      result: {
        ...user,
        courses,
      },
    };
  }

  async getUserRole(userId: string, roleId: number): Promise<any> {
    const role = await this.userRoleRepo.findOne({
      where: {
        user_id: userId,
        role_id: roleId,
      },
      raw: true,
    });

    if (!role) {
      return null;
    }

    const roleName = await this.roleRepo.findByPk(role.role_id, {
      raw: true,
    });

    return {
      roleId: role.role_id,
      roleName: roleName.name,
    };
  }

  async getInstructors(
    page: number,
    pageSize: number,
    filterBy: string,
    orderBy: string,
  ): Promise<any> {
    const query = {
      where: {},
    };

    merge(
      query,
      await this.queryUtils.buildQuery(page, pageSize, filterBy, orderBy),
    );

    let users = await this.userRepo.findAll({
      ...query,
      raw: true,
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Role,
          attributes: [],
          where: {
            id: ROLES.INSTRUCTOR,
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    const count = await this.userRoleRepo.count({
      where: {
        role_id: ROLES.INSTRUCTOR,
      },
    });

    const { next, prev } = await this.helperUtils.getPagination(
      '/users/instructors',
      count,
      page,
      pageSize,
      filterBy,
      orderBy,
    );

    return {
      count,
      next,
      prev,
      result: {
        users,
      },
    };
  }

  async editProfile(id: string, data: any): Promise<any> {
    const user = await this.userRepo.findByPk(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const count = await this.userRepo.count({
      where: {
        email: data.email,
      },
    });

    if (count > 0) {
      throw new BadRequestException('Email already exists');
    }

    await this.userRepo.update(data, {
      where: {
        id,
      },
    });

    return this.getUser(id);
  }
}
