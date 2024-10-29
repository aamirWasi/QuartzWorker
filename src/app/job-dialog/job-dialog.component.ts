import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuartzService } from '../quartz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJobClass } from '../quartz-dashboard/models/job';
@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {

  jobName = '';
  intervalInSeconds = 5;
  jobClasses:IJobClass[] = [];
  selectedJobClass = '';

  constructor(private quartz: QuartzService, private dialogRef: MatDialogRef<JobDialogComponent>, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.availableJobClasses()
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  onSave(): void{
    this.dialogRef.close({jobName: this.jobName, jobClass: this.selectedJobClass, intervalInSeconds: this.intervalInSeconds});
  }

  availableJobClasses(){
    this.quartz.availableJobClasses().subscribe(
      (data: any) =>{
        this.jobClasses = data;
      },
      (error) =>{
        this.snackBar.open('Error fetching job classes', 'Close', {duration: 3000});
      }
    );
  }

}
