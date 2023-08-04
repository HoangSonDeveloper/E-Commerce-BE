import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  name: string;
}
