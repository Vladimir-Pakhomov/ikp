export enum LicenseKeyStatus { NotActivated, Active, Expired }

export enum UserRole { Admin, Stuff, Student }

export class LicenseKey {
    ID: number;
    Status: LicenseKeyStatus;
    Guid: string;
    Admins: number;
    Stuff: number;
    Students: number;
    GivenDate: Date;
    Duration: number;
    StartDate?: Date;
    ExpiryDate?: Date;
    Company: string;
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
    ExpiryDate: 'Дата окончания'
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

export const UserKeyMap = {
    FIO: 'ФИО',
    Login: 'Логин',
    Password: 'Пароль',
    Remarks: 'Примечание'
}

export class Admin extends User {
    IsSA: boolean;
}

export const AdminKeyMap = Object.assign({}, UserKeyMap, { IsSA: 'СА'});

export class Stuff extends User {
    Position: string;
}

export const StuffKeyMap =  Object.assign({}, UserKeyMap, { Position: 'Должность' });

export const NamedObjectKeyMap = {
    Name: 'Наименование'
}

export class Group {
    ID: number;
    Name: string;
    Lead: Stuff;
    IsDeleted: boolean;
}

export const GroupKeyMap = Object.assign({}, NamedObjectKeyMap, { Lead: 'Руководитель' });

export class Student extends User {
    Group: Group;
}

export const StudentKeyMap = Object.assign({}, UserKeyMap, { Group: 'Группа' });

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

export class Block {
    ID: number;
    Name: string;
}

export class Program extends Block {
    Name: string;
    LicenseKey: LicenseKey;
}

export const ProgramKeyMap = Object.assign({}, NamedObjectKeyMap, { LicenseKey: 'Ключ' });

export class Exersize extends Block {
    GeneralQuestion: string;
}

export const ExersizeKeyMap = Object.assign({}, NamedObjectKeyMap, { GeneralQuestion: 'Главный вопрос' });

export class Question {
    ID: number;
    Content: string;
}

export const ContentObjectKeyMap = {
    Content: "Содержимое"
}

export class Conclusion {
    ID: number;
    Name: string;
}

export class ConclusionItem {
    ID: number;
    Content: string;
    IsBranch: boolean;
    IsCorrect: boolean;
}

export const ConclusionItemKeyMap = Object.assign({}, ContentObjectKeyMap, 
    { "IsBranch": "Является структурой", "IsCorrect": "Правильно" });

export class Resolver {
    ID: number;
    Type: number;
    Content: string;
}

export class Video {
    ID: number;
    Content1: string;
    Content2: string;
    IsFirstCorrect: boolean;
    PlaybackType: number;
}

export const VideoKeyMap = {
    Content1: "Видео 1",
    Content2: "Видео 2",
    IsFirstCorrect: "Видео 1 верное?",
    PlaybackType: "Режим воспроизведения"
}

export class Result {
    Start: string;
    End: string;
    Elapsed: number;
    User: User;
    Program: Program;
    Block: Block;
    Correctness: string;
    Rationality: string;
    TotalPercentage: string;
}

export const ResultKeyMapLite = {
    Start: 'Время начала',
    End: 'Время окончания',
    Elapsed: 'Затрачено (мин.)',
    Program: 'Программа',
    Block: 'Раздел',
    Correctness: 'Правильность',
    Rationality: 'Рациональность',
    TotalPercentage: 'Общий процент выполнения'
}

export const ResultKeyMap = Object.assign({ User: 'Учащийся' }, ResultKeyMapLite);