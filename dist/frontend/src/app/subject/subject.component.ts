
import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { CourseService } from '../services/course.service';
import { Subject } from "../model/subject"
import { Course } from '../model/course';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = []
  courses: Course[] = []
  courseId: number;
  form: FormGroup;


  constructor(private subjectService: SubjectService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getCourses();
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      courseId: new FormControl(""),
    });
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    })
  }

  addSubject(form) {
    this.subjectService.addSubject(form, this.courseId).subscribe(data => {
      this.getSubjects();
    })

  }

  selectCourse(event) {
    this.courseId = event.target.value;
  }

  getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    })
  }
}
