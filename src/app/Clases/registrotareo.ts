import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Registrotareo {
  idasistencia:number;
fechamar:string;
 codempresa:string;
codpersonal:string;
diaproceso:string;
 horcla:string;
 lote:string;
conperid:string;
entrada:string;
fechaentrada:string;
 horaentrada:string;
 salida:string;
 fechasalida:string;
 horasalida:string;
 codusuariocrea:string;
 fechacrea:string;
 codusuariomodif:string;
 fechamodif:string;
 hefe:string;
 he25:string;
 he35:string;
 hen25:string;
 hen35:string;
 h100:string;
 hn100:string;
 conperdes:string;
 bnoc:string;
 isAddDaysEnabled:boolean;
 dianterior:string;
  diadespues:string;
  diaNombre:string;
  cerrado:boolean;
  tiemref:string;
  codsede:string
  falt:string;
  vaca:string;
  desm:string;
subm:string;
lics:string;
susp:string;
licf:string;
licp:string;
pgoc:string;
psgo:string;
 static asFormGroup(registro: Registrotareo): FormGroup {
  const fg = new FormGroup({
    idasistencia:new FormControl(registro.idasistencia, Validators.required),
    fechamar: new FormControl(registro.fechamar, Validators.required),
    codempresa: new FormControl(registro.codempresa, Validators.required),
    codpersonal: new FormControl(registro.codpersonal, Validators.required),
    diaproceso:new FormControl(registro.diaproceso, Validators.required),
 horcla:new FormControl(registro.horcla),
 lote:new FormControl(registro.lote),
conperid:new FormControl(registro.conperid),
entrada:new FormControl(registro.entrada),
fechaentrada:new FormControl(registro.fechaentrada),
 horaentrada:new FormControl(registro.horaentrada),
 salida:new FormControl(registro.salida),
 fechasalida:new FormControl(registro.fechasalida),
 horasalida:new FormControl(registro.horasalida),
 codusuariocrea:new FormControl(registro.codusuariocrea),
 fechacrea:new FormControl(registro.fechacrea),
 codusuariomodif:new FormControl(registro.codusuariomodif),
 fechamodif:new FormControl(registro.fechamodif),
 hefe:new FormControl(registro.hefe),
 he25:new FormControl(registro.he25),
 he35:new FormControl(registro.he35),
 hen25:new FormControl(registro.hen25),
 hen35:new FormControl(registro.hen35),
 h100:new FormControl(registro.h100),
 hn100:new FormControl(registro.hn100),
 conperdes:new FormControl(registro.conperdes),
 bnoc:new FormControl(registro.bnoc),
 diaNombre:new FormControl(registro.diaNombre),
 isAddDaysEnabled:new FormControl(registro.isAddDaysEnabled),
 dianterior:new FormControl(registro.dianterior),
 diadespues:new FormControl(registro.diadespues),
 cerrado:new FormControl(registro.cerrado),
 tiemref:new FormControl(registro.tiemref),
 codsede:new FormControl(registro.codsede),
 falt:new FormControl(registro.falt),
  vaca:new FormControl(registro.vaca),
  desm:new FormControl(registro.desm),
subm:new FormControl(registro.subm),
lics:new FormControl(registro.lics),
susp:new FormControl(registro.susp),
licf:new FormControl(registro.licf),
licp:new FormControl(registro.licp),
pgoc:new FormControl(registro.pgoc),
psgo:new FormControl(registro.psgo)
  });
  return fg;
}
}
