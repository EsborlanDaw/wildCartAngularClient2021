import { PaginationService } from '../../../../../service/pagination.service';
import { PostService } from '../../../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IPageUsuario, IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-plist-routed',
  templateUrl: './usuario-plist-routed.component.html',
  styleUrls: ['./usuario-plist-routed.component.css']
})

export class UsuarioPlistRoutedComponent implements OnInit {

  strEntity: string = "usuario"
  strOperation: string = "plist"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";

  strUsuarioSession: string;

  id_tipousuario: number = null;

  fila: IUsuario;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,    
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute,
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      this.oRouter.navigate(['/home']);
    }
    this.id_tipousuario = this.oActivatedRoute.snapshot.params.id_tipousuario;

  }

  ngOnInit(): void { }

}