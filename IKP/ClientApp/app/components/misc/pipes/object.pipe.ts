import { Pipe, PipeTransform } from '@angular/core';
import { Group, User, Stuff, LicenseKey, Program } from '../../../services/models/main.model';

export const checkUser = (p: any): p is User => p && p.hasOwnProperty('FIO');
export const checkGroup = (p: any): p is Group => p && p.hasOwnProperty('IDLead');
export const checkKey = (p: any): p is LicenseKey => p && p.hasOwnProperty('Guid');
export const checkProgram = (p: any): p is Program => p && p.hasOwnProperty('IDLicenseKey');

@Pipe({
    name: 'object'
})
export class ObjectPipe implements PipeTransform {
    transform(value: any){
        if(checkUser(value)){
            return value.FIO;
        }
        else if(checkGroup(value)){
            return value.Name;
        }
        else if(checkKey(value)){
            return value.Guid;
        }
        else return value;
    }
}