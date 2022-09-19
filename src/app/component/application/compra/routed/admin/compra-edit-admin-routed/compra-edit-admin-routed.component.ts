import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { MetadataService } from 'src/app/service/metadata.service';

@Component({
  selector: 'app-compra-edit-admin-routed',
  templateUrl: './compra-edit-admin-routed.component.html',
  styleUrls: ['./compra-edit-admin-routed.component.css'],
})

export class CompraEditAdminRoutedComponent implements OnInit {

  strEntity: string = 'compra';
  strOperation: string = 'edit';
  strTitleSingular: string = 'Compra';
  strTitlePlural: string = 'Compras';
  strATitleSingular: string = 'La compra';
  strATitlePlural: string = 'Las compras';
  //
  id: number = null;
  strResult: string = null;
  strUsuarioSession: string;


  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    public oMetadataService: MetadataService,
    private oLocation: Location
  ) {
    if (this.oActivatedRoute.snapshot.data && this.oActivatedRoute.snapshot.data.message) {
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
    this.strResult = oResult.strMsg;
    this.id = oResult.id;
    this.openPopup();
  };

  goBack(): void {
    this.oLocation.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
}
