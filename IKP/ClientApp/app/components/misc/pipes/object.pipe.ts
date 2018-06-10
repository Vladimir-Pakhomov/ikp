import { Pipe, PipeTransform } from '@angular/core';
import { Group, User, Stuff, LicenseKey } from '../../../services/models/main.model';

const checkUser = (p: any): p is User => p && p.hasOwnProperty('FIO');
const checkGroup = (p: any): p is Group => p && p.hasOwnProperty('IDLead');
const checkKey = (p: any): p is LicenseKey => p && p.hasOwnProperty('Guid');

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