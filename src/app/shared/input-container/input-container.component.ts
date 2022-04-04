import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input-container.component.html'
})
export class InputContainerComponent implements OnInit, AfterContentInit {

  input: any

  @Input() label: string

  @Input() errorMessage: string

  @Input() showTip: boolean = true

  @ContentChild(NgModel) model: NgModel

  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
      this.input = this.model || this.control
      if(this.input === undefined){ throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName') }
  }

  hasSuccess(): boolean{ return this.input.valid && (this.input.dirty || this.input.touched) }

  hasError(): boolean{ return this.input.invalid && (this.input.dirty || this.input.touched) }
}