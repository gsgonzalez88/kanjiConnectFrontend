import { Component, OnInit } from '@angular/core';
import { FormExpressionDto } from 'src/app/models/expression.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getFormData(event: FormExpressionDto) {
    console.log(event)
  }
}
