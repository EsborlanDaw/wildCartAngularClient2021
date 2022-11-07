import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITipoproducto } from 'src/app/model/tipoproducto-interfaces';
import { TipoproductoService } from 'src/app/service/tipoproducto.service';
import { MetadataService } from 'src/app/service/metadata.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { Constants } from 'src/app/model/constants';
import { CheckSession } from 'src/app/class/check.session.class';

@Component({
  selector: 'app-tipoproducto-view-admin-routed',
  templateUrl: './tipoproducto-view-admin-routed.component.html',
  styleUrls: ['./tipoproducto-view-admin-routed.component.css'],
})

export class TipoproductoViewAdminRoutedComponent extends CheckSession implements OnInit {

  strEntity: string = Constants.ENTITIES.producttype
  strOperation: string = Constants.OPERATIONS.view

  id: number = 0;
  oTipoProducto: ITipoproducto;
  oUserSession: IUsuario;

  constructor(
    private oTipoproductoService: TipoproductoService,    
    private oActivatedRoute: ActivatedRoute,
    protected oRouter: Router,
    public oMetadataService: MetadataService
  ) {
    super(oRouter, oActivatedRoute);   
    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getOne();
  }

  ngOnInit(): void { }

  getOne = () => {
    this.oTipoproductoService
      .getOne(this.id)
      .subscribe((oData: ITipoproducto) => {
        this.oTipoProducto = oData;
      });
  };

}
