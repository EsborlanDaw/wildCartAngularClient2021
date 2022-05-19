import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProducto } from 'src/app/model/producto-interfaces';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: '[app-producto-plistrow-unrouted]',
  templateUrl: './producto-plistrow-unrouted.component.html',
  styleUrls: ['./producto-plistrow-unrouted.component.css']
})
export class ProductoPlistRowUnroutedComponent implements OnInit {
  @Input() oProducto: IProducto = null;  
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  
  strEntity: string = "producto";
  strOperation: string = "plist";
  constructor(
    public oIconService: IconService
  ) { }

  ngOnInit() {
  }
  onSelection(id: number) {
    //console.log("selection plist emite " + id);
    this.selection.emit(id);
  }
}
