export interface IJob{
  jobKey: string;
  group: string;
  description: string;
  triggerKey: string;
  triggerGroup: string;
  nextFireTime: string;
  previousFireTime: string;
  TriggerState: string;
  repeatInterval: string;
  cronExpression: string;
  isPaused: boolean;
}

export interface IJobClass{
  Name: string;
  FullName: string;
}
