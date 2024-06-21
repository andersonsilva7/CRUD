import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(student => student.id !== id);
    });
  }
}
