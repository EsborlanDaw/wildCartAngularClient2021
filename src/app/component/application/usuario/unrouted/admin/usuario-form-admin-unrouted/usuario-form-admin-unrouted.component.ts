import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MetadataService } from 'src/app/service/metadata.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IUsuario, IUsuario2Send } from 'src/app/model/usuario-interfaces';
import { TipousuarioService } from 'src/app/service/tipousuario.service';
import { ITipousuario } from 'src/app/model/tipousuario-interfaces';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/service/errorHandler.service';

@Component({
  selector: 'app-usuario-form-admin-unrouted',
  templateUrl: './usuario-form-admin-unrouted.component.html',
  styleUrls: ['./usuario-form-admin-unrouted.component.css']
})

export class UsuarioFormAdminUnroutedComponent implements OnInit {

  @Input() strOperation: string = null;
  @Input() id: number = null;
  @Output() msg = new EventEmitter<any>();

  oData2Show: IUsuario = null;
  oData2Send: IUsuario2Send = null;

  strEntity: string = 'usuario';
  strTitleSingular: string = 'Usuario';
  strATitleSingular: string = 'El usuario';

  oForm: UntypedFormGroup = null;
  strStatus: string = null;


  get f() {
    return this.oForm;
  }

  constructor(
    private oFormBuilder: UntypedFormBuilder,
    private oUsuarioService: UsuarioService,
    private oTipousuarioService: TipousuarioService,
    public oMetadataService: MetadataService,
    private oRouter: Router,
    private oErrorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    if (this.strOperation == "edit") {
      this.get();
    } else {
      this.oForm = this.oFormBuilder.group({
        id: [''],
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        dni: ['', [Validators.required, Validators.minLength(5)]],
        apellido1: ['', [Validators.required, Validators.minLength(5)]],
        apellido2: ['', [Validators.required, Validators.minLength(5)]],
        login: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.minLength(5)]],
        id_tipousuario: ['', [Validators.required, Validators.maxLength(1)]],
      });
    }
  }

  get = (): void => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oData2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oData2Show.id],
          nombre: [
            this.oData2Show.nombre,
            [Validators.required, Validators.minLength(5)]
          ],
          login: [this.oData2Show.login, [Validators.required, Validators.minLength(5)]],
          apellido1: [this.oData2Show.apellido1, [Validators.required, Validators.minLength(5)]],
          apellido2: [this.oData2Show.apellido2, [Validators.required, Validators.minLength(5)]],
          email: [this.oData2Show.email, [Validators.required, Validators.minLength(5)]],
          dni: [this.oData2Show.dni, [Validators.required, Validators.minLength(5)]],
          id_tipousuario: [this.oData2Show.tipousuario.id, [Validators.required, Validators.minLength(1)]]
        });
      }, error => console.log('error', error.error));
  };

  onSubmit(): void {
    if (this.oForm) {
      if (this.oForm.valid) {
        this.oData2Send = {
          id: this.oForm.value.id,
          nombre: this.oForm.value.nombre,
          dni: this.oForm.value.dni,
          apellido1: this.oForm.value.apellido1,
          apellido2: this.oForm.value.apellido2,
          login: this.oForm.value.login,
          email: this.oForm.value.email,
          descuento: 0,
          validado: false,
          activo: false,
          tipousuario: {
            id: this.oForm.value.id_tipousuario
          }
        };
        this.save();
      }
    }
  }

  save(): void {
    let strResult: string = '';
    if (this.strOperation == "new") {
      this.oUsuarioService.newOne(this.oData2Send)
        .subscribe(
          (id: number) => {
            if (id > 0) {
              this.id = id;
              strResult = this.strATitleSingular + ' se ha creado correctamente con el id: ' + id;
            } else {
              strResult = 'Error en la creación de ' + this.strATitleSingular.toLowerCase();
            }
            this.msg.emit({ strMsg: strResult, id: this.id });
          },
          (error) => {
            strResult = "Error al guardar " +
              this.strATitleSingular.toLowerCase() + ': status: ' + error.status + " (" + error.error.status + ') ' + error.error.message;
            this.openPopup(strResult);
          });
    } else {
      let strResult: string = '';
      this.oUsuarioService
        .updateOne(this.oData2Send)
        .subscribe((id: number) => {
         
          if (id > 0) {
            this.id = id;
            strResult = this.strATitleSingular + ' con id=' + id + ' se ha modificado correctamente';
          } else {
            strResult = 'Error en la modificación de ' + this.strATitleSingular.toLowerCase();
          }
          this.msg.emit({ strMsg: strResult, id: this.id });
        },
          (error) => {
            this.strStatus = error.status;
            strResult = this.oErrorHandlerService.componentHandleError(error);
            this.openPopup(strResult);
          });
    }
  };

  //ajenas

  onFindSelection($event: any) {
    this.oForm.controls['id_tipousuario'].setValue($event);
    this.oForm.controls['id_tipousuario'].markAsDirty();
    this.oTipousuarioService
      .getOne(this.oForm.controls['id_tipousuario'].value)
      .subscribe((oData: ITipousuario) => {
        if (this.strOperation == "edit") {
          this.oData2Show.tipousuario = oData; //pte!!
        } else {
          this.oData2Show = {} as IUsuario;
          this.oData2Show.tipousuario = {} as ITipousuario;;
          this.oData2Show.tipousuario = oData;
        }
      }, err => {
        this.oData2Show.tipousuario.nombre = "ERROR";
        this.oForm.controls['id_tipousuario'].setErrors({ 'incorrect': true });
      });

    return false;
  }

  //popup

  eventsSubjectShowPopup: Subject<string> = new Subject<string>();

  openPopup(str: string): void {
    this.eventsSubjectShowPopup.next(str);
  }

  onClosePopup(): void {
    if (this.strStatus == "401") {
      this.oRouter.navigate(['/login']);
    }
  }



}
