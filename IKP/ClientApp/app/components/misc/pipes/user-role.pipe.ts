import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../../../services/models/main.model';

@Pipe({
    name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
    transform(value: number){
        switch(value) {
            case UserRole.Admin:
                return 'Администратор';
            case UserRole.Stuff:
                return 'Сотрудник';
            case UserRole.Student:
                return 'Учащийся';
            default:
                return '';
        }
    }
}