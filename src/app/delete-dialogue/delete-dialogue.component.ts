import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-delete-dialogue",
  templateUrl: "./delete-dialogue.component.html",
  styleUrls: ["./delete-dialogue.component.css"]
})
export class DeleteDialogueComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  title = "";
  text = "";

  ngOnInit(): void {}
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.text = data.text;
  }
  onSubmit() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
