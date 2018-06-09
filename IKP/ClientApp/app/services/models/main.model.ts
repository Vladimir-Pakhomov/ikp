export enum LicenseKeyStatus { NotActivated, Active, Expired }

export enum UserRole { Admin, Stuff, Student }

export class LicenseKey {
    Status: LicenseKeyStatus;
    Guid: string;
    Admins: number;
    Stuff: number;
    Students: number;
    GivenDate: Date;
    Duration: number;
    StartDate?: Date;
    ExpiryDate?: Date;
}

export const LicenseKeyKeyMap = {
    Status: 'Статус',
    Guid: 'Идентификатор',
    Admins: 'Администраторы',
    Stuff: 'Сотрудники',
    Students: 'Учащиеся',
    GivenDate: 'Дата выдачи',
    Duration: 'Срок действия',
    StartDate: 'Дата запуска',
    ExpiryDate: 'Дата окончания',
}

export class User {
    ID: number;
    Company: string;
    FIO: string;
    Login: string;
    Password: string;
    Role: UserRole;
    Remarks: string;
    IsDeleted: boolean;
} 

export class Admin extends User {
    IsSA: boolean;
}

export const AdminKeyMap = {
    FIO: 'ФИО',
    Login: 'Логин',
    Password: 'Пароль',
    Remarks: 'Примечание',
    IsSA: 'СА'
}

export class Stuff extends User {
    Position: string;
}

export const StuffKeyMap = {
    FIO: 'ФИО',
    Login: 'Логин',
    Password: 'Пароль',
    Remarks: 'Примечание',
    Position: 'Должность'
}

export class Group {
    ID: number;
    Name: string;
    Lead: Stuff;
    IsDeleted: boolean;
}

export const GroupKeyMap = {
    Name: 'Наименование',
    Lead: 'Руководитель'
}

export class Student extends User {
    Group: Group;
}

export const StudentKeyMap = {
    FIO: 'ФИО',
    Login: 'Логин',
    Password: 'Пароль',
    Remarks: 'Примечание',
    Group: 'Группа'
}

export class HistoryItem {
    Date: Date;
    User: User;
    Description: string;
}

export const HistoryItemKeyMap = {
    Date: 'Дата и время',
    User: 'Пользователь',
    Description: 'Описание'
}

export class Program {
    Name: string;
    Blocks: Block[];
}

export const ProgramKeyMap = {
    Name: 'Наименование',
    Blocks: 'Блоки'
}

export class Block extends Program {
}

export class Exersize extends Block {
    GeneralQuestion: string;
    Questions: any[]; //later
}

export class Result {
    Start: string;
    End: string;
    Elapsed: number;
    User: User;
    Program: Program;
    Blocks: string[];
    Exersize: Exersize;
    Correntness: number;
    Rationality: number;
}

export const ResultKeyMap = {
    Start: 'Время начала',
    End: 'Время окончания',
    Elapsed: 'Затрачено',
    User: 'Учащийся',
    Program: 'Программа',
    Blocks: 'Блоки',
    Exersize: 'Упражнение',
    Correntness: 'Правильность',
    Rationality: 'Рациональность'
}