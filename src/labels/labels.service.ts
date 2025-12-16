import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLabelDto) {
    return this.prisma.label.create({ data: dto });
  }

  async findAll() {
    return this.prisma.label.findMany({ orderBy: { name: 'asc' } });
  }

  async update(id: string, dto: UpdateLabelDto) {
    const label = await this.prisma.label.findUnique({ where: { id } });
    if (!label) throw new NotFoundException('Label not found');
    return this.prisma.label.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const label = await this.prisma.label.findUnique({ where: { id } });
    if (!label) throw new NotFoundException('Label not found');
    await this.prisma.label.delete({ where: { id } });
    return { deleted: true };
  }

  async attachToTask(userId: string, taskId: string, labelId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');
    await this.assertProjectMember(userId, task.projectId);

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        labels: {
          connect: { id: labelId },
        },
      },
      include: { labels: true },
    });
  }

  async detachFromTask(userId: string, taskId: string, labelId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');
    await this.assertProjectMember(userId, task.projectId);

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        labels: {
          disconnect: { id: labelId },
        },
      },
      include: { labels: true },
    });
  }

  private async assertProjectMember(userId: string, projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    const isMember =
      project.ownerId === userId ||
      project.members.some((m) => m.userId === userId);
    if (!isMember)
      throw new ForbiddenException('Not authorized for this project');
  }
}
