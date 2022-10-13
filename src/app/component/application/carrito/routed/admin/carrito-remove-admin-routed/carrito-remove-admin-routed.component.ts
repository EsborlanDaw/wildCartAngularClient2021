import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/service/carrito.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { MetadataService } from 'src/app/service/metadata.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-carrito-remove-admin-routed',
  templateUrl: './carrito-remove-admin-routed.component.html',
  styleUrls: ['./carrito-remove-admin-routed.component.css']
})
export class CarritoRemoveAdminRoutedComponent implements OnInit {

  strEntity: string = 'carrito';
  strOperation: string = 'remove';
  strTitleSingular: string = 'Carrito';
  strTitlePlural: string = 'Carritos';
  strATitleSingular: string = 'El carrito';
  strATitlePlural: string = 'Los carritos';

  id: number = 0;  
  oUserSession: IUsuario;


  constructor(
    private oCarritoService: CarritoService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    public oMetadataService: MetadataService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    this.id = this.oActivatedRoute.snapshot.params.id

  }

  ngOnInit(): void {
  }

  removeOne() {
    let strResult: string = '';
    this.oCarritoService.removeOne(this.id).subscribe((id: number) => {    
      if (id) {                
        strResult = this.strATitleSingular + " con id = " + this.id + " se ha eliminado.";
      } else {
        strResult = 'Error en el borrado de ' + this.strTitleSingular;
      }
      this.openPopup(strResult);
    })
  }

  goBack() {
    this.oLocation.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<string> = new Subject<string>();

  openPopup(str:string): void {
    this.eventsSubjectShowPopup.next(str);
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/plist']);
  }

}
