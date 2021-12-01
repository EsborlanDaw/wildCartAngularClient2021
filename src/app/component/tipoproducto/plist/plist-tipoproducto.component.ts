import { IUsuario } from './../../../model/usuario-interfaces';
import { ITipoProducto, IPageTP } from './../../../model/tipoproducto-interfaces';
import { TipoproductoService } from './../../../service/tipoproducto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination.service';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-plist-tipoproducto',
  templateUrl: './plist-tipoproducto.component.html',
  styleUrls: ['./plist-tipoproducto.component.css']
})
export class PlistTipoproductoComponent implements OnInit {
  strEntity: string = "tipoproducto"
  strOperation: string = "plist"
  strTitleSingular: string = "Tipo de producto";
  strTitlePlural: string = "Tipos de producto";
  strIconEntity: string = this.oIconService.getIcon(this.strEntity);
  strIconOperation: string = this.oIconService.getIcon(this.strOperation);
  aTipoProductos: ITipoProducto[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oTipoProductoService: TipoproductoService,
    public oIconService: IconService,
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());
  }

  getPage = () => {
    console.log("buscando...", this.strFilter);
    this.oTipoProductoService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IPageTP) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado";
      } else {
        this.strFilteredMessage = "";
      }
      this.aTipoProductos = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }

  doFilter() {
    this.getPage();
  }





  
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }





  doResetFilter() {
    this.strFilter = "";
    this.getPage();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }



}
