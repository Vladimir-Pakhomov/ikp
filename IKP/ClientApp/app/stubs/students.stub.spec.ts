import { Student, UserRole, Stuff, Group } from "../services/models/main.model";

export const StubLead: Stuff = { ID: 4, Company: 'ikp', FIO: 'Ahmed Carbin', Login: 'ahmed.carbin', Password: 'HZXZtX', Role: UserRole.Stuff, Remarks: '', Position: 'Senior teacher' };
export const StuffStub: Stuff[] = [
     StubLead,
     { ID: 5, Company: 'ikp', FIO: 'Gertha Sirmans', Login: 'gertha.sirmans', Password: '2D8B85', Role: UserRole.Stuff, Remarks: '', Position: 'Assistant' }
];

export const GroupStub = { Name: '101', Lead: StubLead };
export const GroupsStub: Group[] = [
    GroupStub
];

export const StudentsStub: Student[] = [
    { ID: 6, Company: 'ikp', FIO: 'Colby Armes', Login: 'colby.armes', Password: 'PsJnU4', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 7, Company: 'ikp', FIO: 'August Iddings', Login: 'august.iddings', Password: 'tZ6MXP', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 8, Company: 'ikp', FIO: 'Sanjuanita Sjoberg', Login: 'sanjuanita.sjolberg', Password: 'J6rC6g', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 9, Company: 'ikp', FIO: 'Karlene Walburn', Login: 'karlene.walburn', Password: '2jyTNf', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 10, Company: 'ikp', FIO: 'Alene Crochet', Login: 'alene.crochet', Password: 'wkGUFS', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 11, Company: 'ikp', FIO: 'Tobie Faries', Login: 'tobie.faries', Password: 'RFpZ66', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 12, Company: 'ikp', FIO: 'Lakeshia Condello', Login: 'lakeshia.condello', Password: 'nHBVgZ', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 13, Company: 'ikp', FIO: 'Justin Bombardier', Login: 'justin.bombardier', Password: 'GCHp7N', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 14, Company: 'ikp', FIO: 'Veta Moses', Login: 'veta.moses', Password: 'MRwpWS', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { ID: 15, Company: 'ikp', FIO: 'September Johnson', Login: 'september.johnson', Password: 'b5NjUM', Role: UserRole.Student, Remarks: '', Group: GroupStub }
];