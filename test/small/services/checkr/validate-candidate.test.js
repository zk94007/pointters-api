const assert = require('assert');

const proxyquire = require('proxyquire');

const schema = {};
const data = {};
const validated = {};
const stub = {
    './schema-candidate': schema,
    'joi':{
        validate:(dataGiven, schemaGiven) => {
            assert.deepStrictEqual(schema, schemaGiven);
            assert.deepStrictEqual(data, dataGiven);
            return validated;
        }
    },
};
const validate = proxyquire('../../../../services/checkr/validate-candidate.js', stub);


describe('checkr object', () => {
    it('should return getReport', () => {
        const res = validate(data, schema);
        assert.deepStrictEqual(res, validated);
    });
});
