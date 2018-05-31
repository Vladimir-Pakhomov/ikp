import { Exersize, Block, Program, Result } from "../services/models/main.model";
import { StudentsStub } from "./students.stub.spec";

/**
 * Exresizes
 */

let ExersizeStub1: Exersize = {
    Name: 'Lorem ipsum',
    Blocks: [],
    GeneralQuestion: 'Dolor sit amet?',
    Questions: []
}

let ExersizeStub2: Exersize = {
    Name: 'Consectetur adipiscing',
    Blocks: [],
    GeneralQuestion: 'Elit, sed do?',
    Questions: []
}

let ExersizeStub3: Exersize = {
    Name: 'Euismod tempor',
    Blocks: [],
    GeneralQuestion: 'Incididunt ut labore?',
    Questions: []
}

let ExersizeStub4: Exersize = {
    Name: 'Et dolore',
    Blocks: [],
    GeneralQuestion: 'Magna aliqua. Ut?',
    Questions: []
}

let ExersizeStub5: Exersize = {
    Name: 'Enim ad',
    Blocks: [],
    GeneralQuestion: 'Minim veniam, quis?',
    Questions: []
}

let ExersizeStub6: Exersize = {
    Name: 'Nostrud exercitation',
    Blocks: [],
    GeneralQuestion: 'Ullamco laboris nisi?',
    Questions: []
}

let ExersizeStub7: Exersize = {
    Name: 'Ut aliquip',
    Blocks: [],
    GeneralQuestion: 'Ex ea commodo?',
    Questions: []
}

let ExersizeStub8: Exersize = {
    Name: 'Consequat. Duis',
    Blocks: [],
    GeneralQuestion: 'Aute irure dolor?',
    Questions: []
}

let ExersizeStub9: Exersize = {
    Name: 'In reprehenderit',
    Blocks: [],
    GeneralQuestion: 'In voluptate verit?',
    Questions: []
}

let ExersizeStub10: Exersize = {
    Name: 'Esse cillum',
    Blocks: [],
    GeneralQuestion: 'Dolore eu fugiat?',
    Questions: []
}

let ExersizeStub11: Exersize = {
    Name: 'Nulla pariatur',
    Blocks: [],
    GeneralQuestion: 'Excepteur sint occaecat?',
    Questions: []
}

let ExersizeStub12: Exersize = {
    Name: 'Mollit anim',
    Blocks: [],
    GeneralQuestion: 'Anim id est laborum?',
    Questions: []
}


/**
 * Blocks
 */

let BlockStub1: Block = {
    Name: 'Cupidatat',
    Blocks: [
        ExersizeStub1,
        ExersizeStub2,
        ExersizeStub3
    ]
}

let BlockStub2: Block = {
    Name: 'Non proident',
    Blocks: [
        ExersizeStub4,
        ExersizeStub5,
        ExersizeStub6
    ]
}

let BlockStub3: Block = {
    Name: 'Sunt',
    Blocks: [
        ExersizeStub7,
        ExersizeStub8,
        ExersizeStub9
    ]
}

let BlockStub4: Block = {
    Name: 'Culpa',
    Blocks: [
        ExersizeStub10,
        ExersizeStub11,
        ExersizeStub12
    ]
}

/**
 * Programs
 */

let ProgramStub1: Program = {
    Name: 'Officia',
    Blocks: [
        BlockStub1,
        BlockStub2
    ]
}

let ProgramStub2: Program = {
    Name: 'Deserunt',
    Blocks: [
        BlockStub3,
        BlockStub4
    ]
}

export const ProgramsStub: Program[] = [ ProgramStub1, ProgramStub2 ];

let ResultStub1: Result = {
    Start: '12.05.2018 20:38',
    End: '12.05.2018 21:05',
    Elapsed: 27,
    User: StudentsStub[3],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub12,
    Correntness: 33,
    Rationality: 77
}

let ResultStub2: Result = {
    Start: '11.05.2018 21:05',
    End: '11.05.2018 21:50',
    Elapsed: 45,
    User: StudentsStub[0],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub10,
    Correntness: 47,
    Rationality: 84
}

let ResultStub3: Result = {
    Start: '29.05.2018 21:50',
    End: '29.05.2018 22:18',
    Elapsed: 28,
    User: StudentsStub[7],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub9,
    Correntness: 46,
    Rationality: 85
}

let ResultStub4: Result = {
    Start: '28.05.2018 22:18',
    End: '28.05.2018 22:31',
    Elapsed: 13,
    User: StudentsStub[3],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub11,
    Correntness: 22,
    Rationality: 80
}

let ResultStub5: Result = {
    Start: '09.05.2018 22:31',
    End: '09.05.2018 22:33',
    Elapsed: 2,
    User: StudentsStub[2],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub10,
    Correntness: 96,
    Rationality: 22
}

let ResultStub6: Result = {
    Start: '14.05.2018 22:33',
    End: '14.05.2018 23:10',
    Elapsed: 37,
    User: StudentsStub[5],
    Program: ProgramsStub[0],
    Blocks: ['Block 2'],
    Exersize: ExersizeStub4,
    Correntness: 21,
    Rationality: 48
}

let ResultStub7: Result = {
    Start: '01.05.2018 23:10',
    End: '02.05.2018 00:07',
    Elapsed: 57,
    User: StudentsStub[2],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub9,
    Correntness: 41,
    Rationality: 18
}


let ResultStub8: Result = {
    Start: '16.05.2018 00:07',
    End: '16.05.2018 00:22',
    Elapsed: 15,
    User: StudentsStub[4],
    Program: ProgramsStub[0],
    Blocks: ['Block 1'],
    Exersize: ExersizeStub1,
    Correntness: 87,
    Rationality: 42
}

let ResultStub9: Result = {
    Start: '18.05.2018 00:22',
    End: '18.05.2018 00:55',
    Elapsed: 33,
    User: StudentsStub[0],
    Program: ProgramsStub[0],
    Blocks: ['Block 2'],
    Exersize: ExersizeStub4,
    Correntness: 58,
    Rationality: 60
}

let ResultStub10: Result = {
    Start: '22.05.2018 00:55',
    End: '22.05.2018 01:27',
    Elapsed: 32,
    User: StudentsStub[8],
    Program: ProgramsStub[0],
    Blocks: ['Block 1'],
    Exersize: ExersizeStub2,
    Correntness: 67,
    Rationality: 20
}

let ResultStub11: Result = {
    Start: '29.05.2018 01:27',
    End: '29.05.2018 02:20',
    Elapsed: 53,
    User: StudentsStub[3],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub9,
    Correntness: 78,
    Rationality: 80
}

let ResultStub12: Result = {
    Start: '08.05.2018 02:20',
    End: '08.05.2018 02:37',
    Elapsed: 17,
    User: StudentsStub[8],
    Program: ProgramsStub[0],
    Blocks: ['Block 1'],
    Exersize: ExersizeStub2,
    Correntness: 75,
    Rationality: 65
}

let ResultStub13: Result = {
    Start: '07.05.2018 02:37',
    End: '07.05.2018 03:13',
    Elapsed: 36,
    User: StudentsStub[7],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub11,
    Correntness: 25,
    Rationality: 33
}

let ResultStub14: Result = {
    Start: '09.05.2018 03:13',
    End: '09.05.2018 03:58',
    Elapsed: 45,
    User: StudentsStub[2],
    Program: ProgramsStub[0],
    Blocks: ['Block 1'],
    Exersize: ExersizeStub3,
    Correntness: 59,
    Rationality: 6
}

let ResultStub15: Result = {
    Start: '14.05.2018 03:58',
    End: '14.05.2018 04:42',
    Elapsed: 44,
    User: StudentsStub[9],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub8,
    Correntness: 30,
    Rationality: 66
}

let ResultStub16: Result = {
    Start: '23.05.2018 04:42',
    End: '23.05.2018 05:30',
    Elapsed: 48,
    User: StudentsStub[7],
    Program: ProgramsStub[0],
    Blocks: ['Block 2'],
    Exersize: ExersizeStub5,
    Correntness: 71,
    Rationality: 1
}

let ResultStub17: Result = {
    Start: '25.05.2018 05:30',
    End: '25.05.2018 05:56',
    Elapsed: 26,
    User: StudentsStub[8],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub8,
    Correntness: 8,
    Rationality: 86
}

let ResultStub18: Result = {
    Start: '22.05.2018 05:56',
    End: '22.05.2018 06:01',
    Elapsed: 5,
    User: StudentsStub[0],
    Program: ProgramsStub[2],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub11,
    Correntness: 90,
    Rationality: 75
}

let ResultStub19: Result = {
    Start: '17.05.2018 06:01',
    End: '17.05.2018 06:11',
    Elapsed: 10,
    User: StudentsStub[3],
    Program: ProgramsStub[0],
    Blocks: ['Block 1'],
    Exersize: ExersizeStub3,
    Correntness: 83,
    Rationality: 97
}

let ResultStub20: Result = {
    Start: '31.05.2018 06:11',
    End: '31.05.2018 07:04',
    Elapsed: 53,
    User: StudentsStub[6],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub10,
    Correntness: 28,
    Rationality: 23
}

let ResultStub21: Result = {
    Start: '30.05.2018 07:04',
    End: '30.05.2018 07:27',
    Elapsed: 23,
    User: StudentsStub[4],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub12,
    Correntness: 28,
    Rationality: 46
}

let ResultStub22: Result = {
    Start: '30.05.2018 07:27',
    End: '30.05.2018 08:16',
    Elapsed: 49,
    User: StudentsStub[0],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub7,
    Correntness: 42,
    Rationality: 35
}

let ResultStub23: Result = {
    Start: '19.05.2018 08:16',
    End: '19.05.2018 08:34',
    Elapsed: 18,
    User: StudentsStub[6],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub8,
    Correntness: 23,
    Rationality: 60
}

let ResultStub24: Result = {
    Start: '14.05.2018 08:34',
    End: '14.05.2018 08:51',
    Elapsed: 17,
    User: StudentsStub[5],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub8,
    Correntness: 1,
    Rationality: 7
}

let ResultStub25: Result = {
    Start: '15.05.2018 08:51',
    End: '15.05.2018 09:17',
    Elapsed: 26,
    User: StudentsStub[2],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub10,
    Correntness: 74,
    Rationality: 92
}

let ResultStub26: Result = {
    Start: '22.05.2018 09:17',
    End: '22.05.2018 10:13',
    Elapsed: 56,
    User: StudentsStub[9],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub11,
    Correntness: 45,
    Rationality: 9
}

let ResultStub27: Result = {
    Start: '11.05.2018 10:13',
    End: '11.05.2018 10:46',
    Elapsed: 33,
    User: StudentsStub[1],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub9,
    Correntness: 55,
    Rationality: 59
}

let ResultStub28: Result = {
    Start: '06.05.2018 10:46',
    End: '06.05.2018 11:23',
    Elapsed: 37,
    User: StudentsStub[7],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub11,
    Correntness: 73,
    Rationality: 61
}

let ResultStub29: Result = {
    Start: '11.05.2018 11:23',
    End: '11.05.2018 12:11',
    Elapsed: 48,
    User: StudentsStub[6],
    Program: ProgramsStub[1],
    Blocks: ['Block 3'],
    Exersize: ExersizeStub7,
    Correntness: 71,
    Rationality: 99
}

let ResultStub30: Result = {
    Start: '26.05.2018 12:11',
    End: '26.05.2018 12:28',
    Elapsed: 17,
    User: StudentsStub[5],
    Program: ProgramsStub[0],
    Blocks: ['Block 1'],
    Exersize: ExersizeStub1,
    Correntness: 20,
    Rationality: 19
}


let ResultStub31: Result = {
    Start: '23.05.2018 12:28',
    End: '23.05.2018 13:26',
    Elapsed: 58,
    User: StudentsStub[7],
    Program: ProgramsStub[1],
    Blocks: ['Block 4'],
    Exersize: ExersizeStub12,
    Correntness: 75,
    Rationality: 92
}

export const ResultsStub: Result[] = [
    ResultStub1,
    ResultStub2,
    ResultStub3,
    ResultStub4,
    ResultStub5,
    ResultStub6,
    ResultStub7,
    ResultStub8,
    ResultStub9,
    ResultStub10,
    
    ResultStub11,
    ResultStub12,
    ResultStub13,
    ResultStub14,
    ResultStub15,
    ResultStub16,
    ResultStub17,
    ResultStub18,
    ResultStub19,
    ResultStub20,

    ResultStub21,
    ResultStub22,
    ResultStub23,
    ResultStub24,
    ResultStub25,
    ResultStub26,
    ResultStub27,
    ResultStub28,
    ResultStub29,
    ResultStub30,
    ResultStub31
];