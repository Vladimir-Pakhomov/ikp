import { Pipe, PipeTransform } from '@angular/core';
import { Group, User, Stuff } from '../../../services/models/main.model';

const checkUser = (p: any): p is User => p && p.hasOwnProperty('FIO');
const checkGroup = (p: any): p is Group => p && p.hasOwnProperty('IDLead');

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
        else return value;
    }
}