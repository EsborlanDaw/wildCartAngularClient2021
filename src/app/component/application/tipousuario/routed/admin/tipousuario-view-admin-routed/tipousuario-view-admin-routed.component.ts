import { MetadataService } from 'src/app/service/metadata.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipousuario-view-admin-routed',
  templateUrl: './tipousuario-view-admin-routed.component.html',
  styleUrls: ['./tipousuario-view-admin-routed.component.css'],
})

export class TipousuarioViewAdminRoutedComponent implements OnInit {

  strEntity: string = 'tipousuario';  
  strOperation: string = 'view';
  strTitleSingular: string = 'Tipo de Usuario';
  strTitlePlural: string = 'Tipos de Usuario';
  //
  id: number;
  strUsuarioSession: string;

  constructor(    
    private oActivatedRoute: ActivatedRoute,
    oRouter: Router,
    public oMetadataService: MetadataService
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oActivatedRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;    
  }

  ngOnInit(): void {}

}
