import { Component } from '@angular/core';
import { BatchService } from './services/batch.service';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BatchService, CourseService, ]
})
export class AppComponent {
  title = 'app';
}
