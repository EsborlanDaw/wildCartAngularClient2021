import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: 'app-factura-plist-routed.',
  templateUrl: './factura-plist-routed.component.html',
  styleUrls: ['./factura-plist-routed.component.css'],
})
export class FacturaPlistRoutedComponent implements OnInit {
  strEntity: string = 'factura';
  strOperation: string = 'plist';
  strTitleSingular: string = 'Factura';
  strTitlePlural: string = 'Facturas';

  strUsuarioSession: string;

  id_usuario: number = null;

  fila: IUsuario;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem(
        'user',
        JSON.stringify(this.oRoute.snapshot.data.message)
      );
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.id_usuario = this.oActivatedRoute.snapshot.params.id_usuario;
  }

  ngOnInit(): void {}
}
