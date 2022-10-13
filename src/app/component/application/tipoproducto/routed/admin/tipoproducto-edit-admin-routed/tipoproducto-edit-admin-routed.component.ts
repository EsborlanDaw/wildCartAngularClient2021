import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { MetadataService } from 'src/app/service/metadata.service';

@Component({
  selector: 'app-tipoproducto-edit-admin-routed',
  templateUrl: './tipoproducto-edit-admin-routed.component.html',
  styleUrls: ['./tipoproducto-edit-admin-routed.component.css'],
})

export class TipoproductoEditAdminRoutedComponent implements OnInit {

  strEntity: string = 'tipoproducto';
  strOperation: string = 'edit';
  strTitleSingular: string = 'Tipo de producto';
  strTitlePlural: string = 'Tipos de producto';
  strATitleSingular: string = 'El tipo de producto';
  strATitlePlural: string = 'Los tipos de producto';
  //
  id: number = null;
  
  strUsuarioSession: string;

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    public oMetadataService: MetadataService,
    private oLocation: Location
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oActivatedRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.strOperation = this.oActivatedRoute.snapshot.url[1].path;
  }

  ngOnInit(): void {
  }

  reportResult = (oResult: any): void => {
    this.id = oResult.id;
    this.openPopup(oResult.strMsg);
  };

  goBack(): void {
    this.oLocation.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<string> = new Subject<string>();

  openPopup(str:string): void {
    this.eventsSubjectShowPopup.next(str);
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
}
