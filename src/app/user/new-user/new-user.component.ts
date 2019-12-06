import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  form: FormGroup;


    constructor(public dialogRef: MatDialogRef<NewUserComponent>,
        private userService: UserService,
        private fb: FormBuilder,
        @Inject( MAT_DIALOG_DATA ) public data: any) {

        this.form = this.createForm();
        this.editing(this.data.id);
    }

    ngOnInit() {
    }

    onUpdate(): void {
        this.dialogRef.close( this.form.value );
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    private createForm() {
        return this.fb.group( {
            name: ['', Validators.required],
            telephoneNumbers:  ['', Validators.required],
            emailAddresses:  ['', Validators.required],
            id:[],
            uuid:[]
        } );
    }

    private editing(id: number) {
        if (id) {
          this.userService.getbyId(id).subscribe(value => {
            this.form.patchValue(value);
          });
        }
      }

}
