import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MetadataService } from 'src/app/service/metadata.service';
import { ITipousuario, ITipousuario2Send } from 'src/app/model/tipousuario-interfaces';
import { TipousuarioService } from 'src/app/service/tipousuario.service';
import { Constants } from 'src/app/model/constants';

@Component({
  selector: 'app-tipousuario-form-admin-unrouted',
  templateUrl: './tipousuario-form-admin-unrouted.component.html',
  styleUrls: ['./tipousuario-form-admin-unrouted.component.css']
})

export class TipousuarioFormAdminUnroutedComponent implements OnInit {

  @Input() strOperation: string = null;
  @Input() id: number = null;
  @Output() msg = new EventEmitter<any>();

  oData2Show: ITipousuario = null;
  oData2Send: ITipousuario2Send = null;

  strEntity: string = Constants.ENTITIES.usertype;

  oForm: UntypedFormGroup = null;


  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: UntypedFormBuilder,
    private oTipousuarioService: TipousuarioService,
    public oMetadataService: MetadataService
  ) {
  }

  ngOnInit(): void {
    if (this.strOperation == "edit") {
      this.get();
    }
  }

  get = (): void => {
    this.oTipousuarioService
      .getOne(this.id)
      .subscribe((oData: ITipousuario) => {
        this.oData2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.id],
          nombre: [this.oData2Show.nombre, [Validators.required, Validators.minLength(4)]]
        });
      });
  };

  onSubmit(): void {
    if (this.oForm) {
      if (this.oForm.valid) {
        this.oData2Send = {
          id: this.oForm.value.id,
          nombre: this.oForm.value.nombre,
        };
        this.save();
      }
    }
  }

  save(): void {
    let strResult: string = '';
    this.oTipousuarioService
      .updateOne(this.oData2Send)
      .subscribe((id: number) => {
        if (id) {
          this.id = id;
          strResult = this.oMetadataService.getName('the' + this.strEntity).toLowerCase() + ' con id=' + id + ' se ha modificado correctamente';
        } else {
          strResult = 'Error en la modificación de ' + this.oMetadataService.getName('the' + this.strEntity).toLowerCase();
        }
        this.msg.emit({ strMsg: strResult, id: this.id });
      });

  };


}
