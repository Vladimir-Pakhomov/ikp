import { Student, UserRole, Stuff, Group } from "../services/models/main.model";

export const StubLead: Stuff = { FIO: 'Ahmed Carbin', Login: 'ahmed.carbin', Password: 'HZXZtX', Role: UserRole.Stuff, Remarks: '', Position: 'Senior teacher' };
export const StuffStub: Stuff[] = [
     StubLead,
     { FIO: 'Gertha Sirmans', Login: 'gertha.sirmans', Password: '2D8B85', Role: UserRole.Stuff, Remarks: '', Position: 'Assistant' }
];

export const GroupStub = { Name: '101', Lead: StubLead };
export const GroupsStub: Group[] = [
    GroupStub
];

export const StudentsStub: Student[] = [
    { FIO: 'Colby Armes', Login: 'colby.armes', Password: 'PsJnU4', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'August Iddings', Login: 'august.iddings', Password: 'tZ6MXP', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Sanjuanita Sjoberg', Login: 'sanjuanita.sjolberg', Password: 'J6rC6g', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Karlene Walburn', Login: 'karlene.walburn', Password: '2jyTNf', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Alene Crochet', Login: 'alene.crochet', Password: 'wkGUFS', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Tobie Faries', Login: 'tobie.faries', Password: 'RFpZ66', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Lakeshia Condello', Login: 'lakeshia.condello', Password: 'nHBVgZ', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Justin Bombardier', Login: 'justin.bombardier', Password: 'GCHp7N', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'Veta Moses', Login: 'veta.moses', Password: 'MRwpWS', Role: UserRole.Student, Remarks: '', Group: GroupStub },
    { FIO: 'September Johnson', Login: 'september.johnson', Password: 'b5NjUM', Role: UserRole.Student, Remarks: '', Group: GroupStub }
];