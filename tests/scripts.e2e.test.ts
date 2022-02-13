import { pgConnection } from "../src/db/PgConnection";
import { DropDbScript } from "../src/scripts/dropDb";
import { CheckDbExistanceScript } from "../src/scripts/dbExistanceChecker";
import { CreateDbScript } from "../src/scripts/generateDb";



beforeAll(async () => {
    await pgConnection.connect();
})



it('should get boolean for database existance', (done) => {
    CheckDbExistanceScript().then((exist) => {
        const expectedValues = [0, 1];
        expect(expectedValues.includes(exist)).toBeTruthy()
        done()
    }).catch(done)
})


it('should drop database if it exist', (done) => {
    DropDbScript().then(() => {
        CheckDbExistanceScript().then((exist) => {
            expect(exist).toBeFalsy();
            done()
        }).catch(done)
    }).catch(done)
});

it('should create database', (done) => {
    CreateDbScript().then(() => {
        CheckDbExistanceScript().then((exist) => {
            expect(exist).toBeTruthy()
            done()
        }).catch(done)
    }).catch(done)
});



afterAll(async () => {
    await pgConnection.end()
})