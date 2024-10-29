import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuartzService {
  // private baseUrl = 'http://localhost:5067/api/Schedules';https://localhost:44302/
  private baseUrl = 'https://localhost:44302/api/schedules';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any>{
    return this.http.get(`${this.baseUrl}/jobs-trigger-info`);
  }

  getJobById(jobName: string, group: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/job-trigger-info/${jobName}/${group}`);
  }

  createJob(jobName: string, jobClass: string, intervalInSeconds: number): Observable<any>{
    const params = {jobName, jobClass, intervalInSeconds};
    // return this.http.post(
    //   `${this.baseUrl}/create?jobName=${jobName}&intervalInSeconds=${intervalInSeconds}`,
    //   {}
    // );
    return this.http.post(
      `${this.baseUrl}/create`, null, {params}
    );
  }

  deleteJob(jobName: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${jobName}`);
  }

  pauseJob(jobName: string): Observable<any>{
    return this.http.put(`${this.baseUrl}/pause/${jobName}`, {});
  }

  resumeJob(jobName: string): Observable<any>{
    return this.http.put(`${this.baseUrl}/resume/${jobName}`, {});
  }

  availableJobClasses(){
    return this.http.get(`${this.baseUrl}/available-job-classes`);
  }

}
