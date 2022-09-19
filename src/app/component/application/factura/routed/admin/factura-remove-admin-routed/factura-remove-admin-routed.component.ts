import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFactura } from 'src/app/model/factura-interfaces';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { FacturaService } from 'src/app/service/factura.service';
import { MetadataService } from 'src/app/service/metadata.service';

@Component({
  selector: 'app-factura-remove-admin-routed',
  templateUrl: './factura-remove-admin-routed.component.html',
  styleUrls: ['./factura-remove-admin-routed.component.css']
})
export class FacturaRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oFactura: IFactura;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "factura"
  strOperation: string = "remove"
  strTitleSingular: string = "Factura";
  strTitlePlural: string = "Facturas";
  strTitleArtSingular: string = "La factura";

  constructor(
    private oFacturaService: FacturaService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
    public oMetadataService: MetadataService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    this.id = this.oActivatedRoute.snapshot.params.id
    // llamada al servidor
    this.getOne();
  }

  ngOnInit() {
  }

  getOne = () => {
    this.oFacturaService.getOne(this.id).subscribe((oData: IFactura) => {
      this.oFactura = oData;
    })
  }

  removeOne() {
    this.oFacturaService.removeOne(this.id).subscribe((id: number) => {
      if (id) {
        this.strResult = this.strTitleArtSingular + " con id = " + this.id + " se ha eliminado.";
      } else {
        this.strResult = 'Error en el borrado de ' + this.strTitleSingular;
      }
      this.openPopup();
    })
  }

  goBack() {
    this._location.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/plist']);
  }

}
