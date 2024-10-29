import { Component, OnInit } from '@angular/core';
import { QuartzService } from '../quartz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJob } from './models/job';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../job-dialog/job-dialog.component';

@Component({
  selector: 'app-quartz-dashboard',
  templateUrl: './quartz-dashboard.component.html',
  styleUrls: ['./quartz-dashboard.component.css']
})
export class QuartzDashboardComponent implements OnInit {
  jobs: IJob[] = [];
  newJobName = '';
  selectedJobClass = '';
  newJobInterval = 5;
  displayedColumns: string[] = ['jobName', 'groupName', 'triggerName', 'triggerState', 'nextFireTime', 'previousFireTime', 'repeatInterval', 'actions'];

  constructor(private quartz: QuartzService, private snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs(){
    this.quartz.getAllJobs().subscribe(
      (data: IJob[]) =>{
        this.jobs = data.map(job => ({
          ...job,
          isPaused: this.isPaused(job.TriggerState)
        }));
      },
      (error) =>{
        this.snackBar.open('Failed to load jobs', 'Close', {duration: 3000});
      }
    );
  }

  isPaused(triggerState: string): any {
    return triggerState === 'Paused';
  }

  createJob(){
    if(this.newJobName && this.newJobInterval > 0){
      this.quartz.createJob(this.newJobName, this.selectedJobClass, this.newJobInterval).subscribe(
        () =>{
          this.snackBar.open('Job created successfully', 'Close', { duration: 3000 });
          this.getJobs();
        },
        (error) =>{
          this.snackBar.open('Failed to create job', 'Close', { duration: 3000 });
        }
      )
    }
  }

  deleteJob(jobName: string){
    this.quartz.deleteJob(jobName).subscribe(
      (response) =>{
        console.log('delete the job:', response);
        this.snackBar.open('Job deleted successfully', 'Close', { duration: 3000});
        this.getJobs();
      },
      (error) =>{
        this.snackBar.open('Failed to delete job', 'Close', { duration: 3000 });
      }
    )
  }

  pauseJob(jobName: string){
    this.quartz.pauseJob(jobName).subscribe(
      (response) =>{
        console.log('pause the job:', response);
        this.snackBar.open('Job paused successfully', 'Close', { duration: 3000});
        this.getJobs();
      },
      (error) =>{
        this.snackBar.open('Failed to pause job', 'Close', { duration: 3000 });
      }
    )
  }

  resumeJob(jobName: string){
    this.quartz.resumeJob(jobName).subscribe(
      (response) =>{
        console.log('resume the job:', response);
        this.snackBar.open('Job resumed successfully', 'Close', { duration: 3000});
        this.getJobs();
      },
      (error) =>{
        this.snackBar.open('Failed to resumed job', 'Close', { duration: 3000 });
      }
    )
  }

   getFormattedInterval(intervalString: string): string {
    const intervalParts = intervalString.split(':').map(Number);

    if (intervalParts.length !== 3 || intervalParts.some(isNaN)) {
      return 'Invalid interval';
    }

    const [hours, minutes, seconds] = intervalParts;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds < 60) {
      return `repeat every ${totalSeconds} second${totalSeconds > 1 ? 's' : ''}`;
    } else if (totalSeconds < 3600) {
      const mins = Math.floor(totalSeconds / 60);
      return `repeat every ${mins} minute${mins > 1 ? 's' : ''}`;
    } else {
      const hrs = Math.floor(totalSeconds / 3600);
      return `repeat every ${hrs} hour${hrs > 1 ? 's' : ''}`;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.createNewJob(result.jobName, result.jobClass, result.intervalInSeconds);
      }
    })
  }

  createNewJob(jobName: string, jobClass: string, intervalInSeconds: number) {
    this.quartz.createJob(jobName, jobClass, intervalInSeconds).subscribe(
      ()=>{
        this.snackBar.open('Job Created Successfully', 'Close', { duration: 3000 });
        this.getJobs();
      },
      (error) =>{
        this.snackBar.open('Failed to create job', 'Close', { duration: 3000 });
      }
    )
  }

}
