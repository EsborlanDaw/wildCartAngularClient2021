import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/model/constants';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { MetadataService } from 'src/app/service/metadata.service';

@Component({
  selector: 'app-tipousuario-plist-admin-routed',
  templateUrl: './tipousuario-plist-admin-routed.component.html',
  styleUrls: ['./tipousuario-plist-admin-routed.component.css'],
})

export class TipousuarioPlistAdminRoutedComponent implements OnInit {
  strEntity: string = Constants.ENTITIES.usertype;
  strOperation: string = Constants.OPERATIONS.plist;

  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();

  constructor(
    private oActivatedRoute: ActivatedRoute,
    oRouter: Router,
    public oMetadataService: MetadataService
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      this.oUserSession = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oActivatedRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    
  }

  ngOnInit(): void { }


}
