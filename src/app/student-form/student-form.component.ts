import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importar FormBuilder e Validators
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  editing = false;

  constructor(
    private fb: FormBuilder,  // Adicionar FormBuilder ao construtor
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializar o FormGroup
    this.studentForm = this.fb.group({
      id: [0],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      idade: [0, [Validators.required, Validators.min(1)]],
      curso: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null && !isNaN(id)) {
      this.editing = true;
      this.studentService.getStudent(id).subscribe((student) => {
        this.studentForm.patchValue(student);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      return;
    }

    if (this.editing) {
      this.studentService.updateStudent(this.studentForm.value.id, this.studentForm.value)
        .subscribe(() => this.router.navigate(['/students']));
    } else {
      this.studentService.createStudent(this.studentForm.value)
        .subscribe(() => this.router.navigate(['/students']));
    }
  }
}
