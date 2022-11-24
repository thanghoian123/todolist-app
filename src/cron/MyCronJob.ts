// MyCronJob.ts
import { createBindingFromClass } from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import { repository } from '@loopback/repository';
import { TaskRepository } from '../repositories';
import { ETaskStatusType } from '../types';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) {
    super({
      name: 'my-job',
      onTick: async () => {
        // do the work
        await this.performMyJob();
      },
      cronTime: '*/1 * * * * *', // Every ten second
      start: true,
    });
  }

  async performMyJob() {
    const findTask = await this.taskRepository.find({where:{status: ETaskStatusType.DONE}})
    console.log("🚀 ~ file: MyCronJob.ts ~ line 26 ~ MyCronJob ~ performMyJob ~ findTask", findTask)
    console.log('Job is running 🥳.');
  }
}

export const jobBinding = createBindingFromClass(MyCronJob);

// app.add(jobBinding);