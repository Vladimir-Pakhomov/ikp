import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../../../services/models/main.model';

@Pipe({
    name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
    transform(value: number){
        return UserRole[value];
    }
}