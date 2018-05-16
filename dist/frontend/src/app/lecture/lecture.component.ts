import { Component, OnInit } from '@angular/core';
import { Lecture } from "../model/lecture";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { LectureService } from '../services/lecture.service';
import { Teacher } from '../model/teacher';
import { Subject } from  '../model/subject';
import { TeacherService } from '../services/teacher.service';
import { SubjectService } from '../services/subject.service';


@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
teacherId;
subjectId;
  lectures: Lecture[] =[];
  teachers: Teacher[]=[];
  subjects: Subject[]=[];
  errorMessage: string;
  form: FormGroup;
   courseId= +this.route.snapshot.paramMap.get('courseId')
   batchId= +this.route.snapshot.paramMap.get('batchId')

  constructor(private lectureService: LectureService,private teacherService: TeacherService,private subjectService: SubjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      teacherId: new FormControl(""),
     subjectId:new FormControl(""),

    });
   
    this.getLectures();
    this.getTeachers();
    this.getSubjects();
  }

  getTeachers(){
    this.teacherService.getTeachers().subscribe(data=>{
      this.teachers=data;
    })
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(data=>{
      this.subjects=data;
    })
  }
  
  addLecture(form){
   this.lectureService.addLecture(form.value.name,this.teacherId,this.subjectId,this.courseId,this.batchId).subscribe(data=>{
   this.getLectures();
   });
  }

  getLectures(){
    this.lectureService.getLectures(this.courseId,this.batchId).subscribe(data=>{
      console.log(data);
      this.lectures=data;
    })
  }


  selectTeacher(event){
  
    this.teacherId=event.target.value; 
  }

  selectSubject(event){
  
    this.subjectId=event.target.value;
  }
}
