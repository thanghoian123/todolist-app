// MyCronJob.ts
import { createBindingFromClass } from "@loopback/core";
import { CronJob, cronJob } from "@loopback/cron";
import { repository } from "@loopback/repository";
import { TaskRepository } from "../repositories";
import { ETaskStatusType } from "../types";

@cronJob()
export class MyCronJob extends CronJob {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository
  ) {
    super({
      name: "my-job",
      onTick: async () => {
        // do the work
        await this.performMyJob();
      },
      // cronTime: "*/1 * * * * *", // Every ten second
      cronTime: "0 0 * * * ", // Every 24h
      start: true,
    } as any);
  }

  async performMyJob() {
    const findTask = await this.taskRepository.find({
      where: {
        status: ETaskStatusType.DONE,
        updatedAt: { lt: new Date().toDateString() },
      },
    });
    if (findTask.length) {
      const resultDelete = await this.taskRepository.deleteAll({
        status: ETaskStatusType.DONE,
        updatedAt: { lt: new Date("2014-04-01T18:30:00.000Z").toDateString() },
      });
      if(resultDelete){
        console.log("---- clean task success")
      }
    }
    console.log("Job is running 🥳.");
  }
}

export const jobBinding = createBindingFromClass(MyCronJob);

// app.add(jobBinding);
