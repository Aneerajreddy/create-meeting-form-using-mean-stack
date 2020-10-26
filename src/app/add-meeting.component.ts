import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})

export class AddMeetingComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetMeetingForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  meetingForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['0:00 AM' ,'0:30 AM' ,'1:00 AM' ,'1:30 AM' ,'2:00 AM','2:30 AM' ,'3:00 AM' 
  ,'3:30 AM' ,'4:00 AM' ,'4:30 AM ','5:00 AM ','5:30 AM ','6:00 AM ','6:30 AM ','7:00 AM',
  '7:30 AM' ,'8:00 AM','8:30 AM', '9:00 AM' ,'9:30 AM', '10:00 AM' ,
  '10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM' ,'1:00 PM','1:30 PM',
   '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM ','5:00 PM', 
   '5:30 PM' ,'6:00 PM' ,'6:30 PM', '7:00 PM','7:30 PM', '8:00 PM', '8:30 PM', 
   '9:00 PM',' 9:30 PM',' 10:00 PM',' 10:30 PM',' 11:00 PM',' 11:30 PM'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private meetingApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.meetingForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      date: ['', [Validators.required]],
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.meetingForm.get('date').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.meetingForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitMeetingForm() {
    if (this.meetingForm.valid) {
      this.meetingApi.AddMeeting(this.meetingForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/meetings-list'))
      });
    }
  }

}