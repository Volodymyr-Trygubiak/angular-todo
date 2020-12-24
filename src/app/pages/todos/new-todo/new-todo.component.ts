import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  newTodoForm: FormGroup;
  isSubmit = false;


  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.createNewTodoForm();
  }

  get titleControl(): any {
    return this.newTodoForm.get('title') as FormControl;
  }

  onSubmit(): void {
    this.isSubmit = true;

    if (this.newTodoForm.invalid) {
      return;
    }

    this.isSubmit = false;
    this.setDefaultValues();
    this.todoService.addTodo(this.newTodoForm.value);
    this.newTodoForm.reset();
    this.setDefaultValues();
  }

  private createNewTodoForm() {
    this.newTodoForm = this.fb.group({
      title: ['',
        [
          Validators.required,
          Validators.minLength
        ]
      ],
      description: [],
      isDone: [false],
      priority: ['low']
    });
  }
  private setDefaultValues(): void {
    this.newTodoForm.value.isDone = false;
    this.newTodoForm.controls['priority'].setValue('low');
  }
}
