import { Meeting} from '../../shared/meeting';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})

export class MeetingsListComponent implements OnInit {
  MeetingData: any = [];
  dataSource: MatTableDataSource<Meeting>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'name', 'email', 'section', 'action'];

  constructor(private meetingApi: ApiService) {
    this.meetingApi.GetMeetings().subscribe(data => {
      this.MeetingData = data;
      this.dataSource = new MatTableDataSource<Meeting>(this.MeetingData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteMeeting(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.meetingApi.DeleteMeeting(e._id).subscribe()
    }
  }

}