import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Registrotareorefri {
idrefri:number;
idasistencia:number ;
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
dianterior:string;
  diadespues:string;
static asFormGroup(registro: Registrotareorefri): FormGroup {
  const fg = new FormGroup({
    idrefri:new FormControl(registro.idrefri, Validators.required),
    idasistencia:new FormControl(registro.idasistencia, Validators.required),
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
    isAddDaysEnabled:new FormControl(true),
    dianterior:new FormControl(registro.dianterior),
 diadespues:new FormControl(registro.diadespues)
  });
  return fg;
}
}
