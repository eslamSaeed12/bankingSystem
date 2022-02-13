import { generateFakeCustomers } from "../src/utils/fakeCustomers";

it('should generate 10 fake customers', (done) => {
    expect(Array.isArray(generateFakeCustomers(10))).toBeTruthy()
    done();
});


