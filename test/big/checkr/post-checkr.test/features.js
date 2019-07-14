const EventEmitter = require('events');

const nock = require('nock');

const emitter = new EventEmitter();

module.exports = (email) => {
    nock('https://api.checkr.com:443', {encodedQueryParams:true})
    .post('/v1/candidates', {
        first_name:'firstName',
        middle_name:'middleName',
        last_name:'lastName',
        email:email,
        phone:'23432432432',
        zipcode:'90401',
        dob:'Wed Jan 21 1970 18:00:00 GMT-0600 (CST)',
        ssn:'111-11-2001',
        driver_license_number:'F1112001',
        driver_license_state:'CA'
    })
    .reply(201, {id:'e449545d9007db19fd437324', object:'test_candidate', uri:'/v1/candidates/e449545d9007db19fd437324', created_at:'2017-09-03T01:40:10Z', first_name:'Firstname', last_name:'Lastname', middle_name:'Middlename', mother_maiden_name:null, dob:'1970-01-21', ssn:'XXX-XX-2001', email:'email@test.com', zipcode:'90401', phone:'23432432432', driver_license_state:'CA', driver_license_number:'F1112001', copy_requested:false, previous_driver_license_state:null, previous_driver_license_number:null, adjudication:null, custom_id:null, no_middle_name:false, report_ids:[], geo_ids:[]}, [ 'Date',
        'Sun, 03 Sep 2017 01:40:10 GMT',
        'Content-Type',
        'application/json',
        'Content-Length',
        '598',
        'Connection',
        'close',
        'Set-Cookie',
        '__cfduid=d4c88881e3f2e1dc1a531bf921381b4ea1504402810; expires=Mon, 03-Sep-18 01:40:10 GMT; path=/; domain=.checkr.com; HttpOnly',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Vary',
        'Origin',
        'X-Request-Id',
        '88a69d8b02ad80cd9f9d0ca5177d7302',
        'Server',
        'cloudflare-nginx',
        'CF-RAY',
        '3984ffdd4afe20ea-LAX' ]);

    nock('https://api.checkr.com:443', {encodedQueryParams:true})
    .post('/v1/reports', {package:'driver_pro', candidate_id:'e449545d9007db19fd437324'})
    .reply(201, {id:'57968c1e7fa87e328602ea7d', object:'test_report', uri:'/v1/reports/57968c1e7fa87e328602ea7d', status:'pending', created_at:'2017-09-03T01:40:11Z', completed_at:null, revised_at:null, upgraded_at:null, turnaround_time:null, due_time:'2017-09-11T01:40:11Z', package:'driver_pro', tags:[], adjudication:null, candidate_id:'e449545d9007db19fd437324', county_criminal_search_ids:[], document_ids:[], federal_criminal_search_id:null, global_watchlist_search_id:'59ab5d7b318dc404aff1d8b4', motor_vehicle_report_id:'59ab5d7b318dc404aff1d8b2', national_criminal_search_id:'59ab5d7b318dc404aff1d8b1', personal_reference_verification_ids:[], professional_reference_verification_ids:[], sex_offender_search_id:'59ab5d7b318dc404aff1d8b3', ssn_trace_id:'59ab5d7b318dc404aff1d8ac', state_criminal_search_ids:[], terrorist_watchlist_search_id:'59ab5d7b318dc404aff1d8b4', facis_search_id:null}, [ 'Date',
        'Sun, 03 Sep 2017 01:40:11 GMT',
        'Content-Type',
        'application/json',
        'Content-Length',
        '908',
        'Connection',
        'close',
        'Set-Cookie',
        '__cfduid=d09cbcc6973e7795f493db9b7e84705221504402811; expires=Mon, 03-Sep-18 01:40:11 GMT; path=/; domain=.checkr.com; HttpOnly',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Vary',
        'Origin',
        'X-Request-Id',
        '0c54409928011e9fc7c8d3bcda2e6950',
        'Server',
        'cloudflare-nginx',
        'CF-RAY',
        '3984ffe17f0a5384-LAX' ]);

    nock('https://api.checkr.com:443', {encodedQueryParams:true})
    .get(/reports.*/, {
        package:'driver_pro',
        candidate_id:'e449545d9007db19fd437324'
    })
    .reply(401, () => {
        emitter.emit('done');
        return {
            id: 'REPORT_ID',
            object: 'test_report',
            uri: '/v1/reports/REPORT_ID',
            status: 'clear',
            created_at: '2015-05-14T17:45:34Z',
            completed_at: '2015-05-14T17:45:39Z',
            upgraded_at: null,
            turnaround_time: 5,
            package: 'driver_pro',
            tags: null,
            candidate_id: 'CANDIDATE_ID',
            ssn_trace_id: 'SSN_TRACE_ID',
            sex_offender_search_id: 'SEX_OFFENDER_SEARCH_ID',
            national_criminal_search_id: 'NATIONAL_CRIMINAL_SEARCH_ID',
            federal_criminal_search_id: null,
            county_criminal_search_ids: [
                'COUNTY_CRIMINAL_SEARCH_ID_1',
                'COUNTY_CRIMINAL_SEARCH_ID_2',
                'COUNTY_CRIMINAL_SEARCH_ID_3'
            ],
            motor_vehicle_report_id: 'MOTOR_VEHICLE_REPORT_ID',
            state_criminal_search_ids: [],
            document_ids: []
        };
    }

        , [ 'Date',
            'Sun, 03 Sep 2017 01:40:12 GMT',
            'Content-Type',
            'application/json',
            'Content-Length',
            '36',
            'Connection',
            'close',
            'Set-Cookie',
            '__cfduid=d9739f9f743c2115e54afc5618c4bc34a1504402812; expires=Mon, 03-Sep-18 01:40:12 GMT; path=/; domain=.checkr.com; HttpOnly',
            'Strict-Transport-Security',
            'max-age=31536000',
            'Vary',
            'Origin',
            'X-Content-Type-Options',
            'nosniff',
            'X-Request-Id',
            '382bea7b9d8e24b751ff50502c13ee82',
            'Server',
            'cloudflare-nginx',
            'CF-RAY',
            '3984ffe71b8978b0-LAX' ]);

    return emitter;
};
