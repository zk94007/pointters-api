 const assert = require('assert');

 const proxyquire = require('proxyquire');

 const createCandidate = {};
 const createReport = {};
 const getReport = {};
 const stub = {
     './create-candidate': createCandidate,
     './create-report':createReport,
     './get-report':getReport
 };
 const checkr = proxyquire('../../../../services/checkr', stub);


 describe('checkr object', () => {
     it('should return getReport', () => {
         assert.deepStrictEqual(checkr.getReport, getReport);
     });

     it('should return createReport', () => {
         assert.deepStrictEqual(checkr.createReport, createReport);
     });

     it('should return createCandidate', () => {
         assert.deepStrictEqual(checkr.createCandidate, createCandidate);
     });
 });
