import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LicenseKey, LicenseKeyStatus, Db, User, UserRole, Admin, Stuff, Student, HistoryItem, Group, Program, Exersize, Result } from '../services/models/main.model';
import { ProgramsStub, ResultsStub } from './programs.stub.spec';
import { StuffStub, GroupsStub, StudentsStub } from './students.stub.spec';

export const LicenseKeysStub: LicenseKey[] = [
    { Status: LicenseKeyStatus.NotActivated, Guid: '00000000-0000-0000-0000000A', Admins: 3, Stuff: 2, Students: 10, GivenDate: new Date(2018, 1, 1), Duration: 30 },
    { Status: LicenseKeyStatus.NotActivated, Guid: '00000000-0000-0000-0000000A', Admins: 3, Stuff: 2, Students: 10, GivenDate: new Date(2018, 1, 1), Duration: 30 },
    { Status: LicenseKeyStatus.NotActivated, Guid: '00000000-0000-0000-0000000A', Admins: 3, Stuff: 2, Students: 10, GivenDate: new Date(2018, 1, 1), Duration: 30 },
    { Status: LicenseKeyStatus.NotActivated, Guid: '00000000-0000-0000-0000000A', Admins: 3, Stuff: 2, Students: 10, GivenDate: new Date(2018, 1, 1), Duration: 30 },
];
export const DatabasesStub: Db[] = [
    { Name: 'IKP-Test', ConnectionString: 'SomeConnectionString'}
];
export const AdminsStub: Admin[] = [
    { FIO: 'Darnela Osmun', Login: 'darnela.osmun', Password: 'tw6WjT', Role: UserRole.Admin, Remarks: '', IsSA: true },
    { FIO: 'Shad Carolina', Login: 'shad.carolina', Password: 'rePXCm', Role: UserRole.Admin, Remarks: '', IsSA: false },
    { FIO: 'Ian Boyer', Login: 'ian.boyer', Password: 'C2MCYy', Role: UserRole.Admin, Remarks: '', IsSA: false }
];

export const HistoryItemsStub: HistoryItem[] = [];

@Injectable()
export class AdminServiceStub {
    getLicenseKeys(): Observable<LicenseKey[]> {
        return Observable.of(LicenseKeysStub);
    }

    getDatabases(): Observable<Db[]> {
        return Observable.of(DatabasesStub);
    }

    getAdmins(): Observable<Admin[]> {
        return Observable.of(AdminsStub);
    }

    getStuff(): Observable<Stuff[]> {
        return Observable.of(StuffStub);
    }

    getGroups(): Observable<Group[]> {
        return Observable.of(GroupsStub);
    }

    getStudents(): Observable<Student[]> {
        return Observable.of(StudentsStub);
    }

    getHistory(from: Date, to: Date): Observable<HistoryItem[]> {
        return Observable.of(HistoryItemsStub.filter(h => h.Date >= from && h.Date <= to));
    }

    getMyGroups(user: User): Observable<Group[]> {
        return Observable.of(GroupsStub.filter(g => g.Lead.Login == user.Login));
    }

    getAllResults(): Observable<Result[]> {
        return Observable.of(ResultsStub);
    }

    getPrograms(): Observable<Program[]> {
        return Observable.of(ProgramsStub);
    }

    getMyResults(user: User): Observable<Result[]> {
        return Observable.of(ResultsStub.filter(r => r.User.Login == user.Login));
    }
}