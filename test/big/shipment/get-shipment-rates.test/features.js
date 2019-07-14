const nock = require('nock');

module.exports = () => {
    nock('https://api.easypost.com:443', {encodedQueryParams:true})
    .get('/v2/shipments/shp_189dfd11110f491f89a69fd72431557b')
    .reply(200, [ '1f8b0800000000000003ec5a5b6fdb3a12fe2b829e7601c721a9bbdfb26e7a9a8326eec62eb63d8b42a048ca662b4b5a4a4a1b1ff4bfef5077274eebeda6379c3ec51a5ee79b6f86c361fe349912b4143ca4a5393309c2de090a4e085a113c738219b2fe3027a62c4225ca4aa5e62ca6492126e65614055d8bc29cfdfb0d7c655cc0e8521425f4cef252662934fd69b24a2991b25b687cb97c026d098d44127258d19ca555924c4cfd3ba4fc86a60c64e8e3c45422167a54dfa5286959c17c261789bc81360e33958ab277325d87ac593cb091e358ae1f78beed628c7d3bb01c021dab9c1f5690cc6c3c238e5630a225db8492772b36dfddba6359ab782764555166db2294699c6985f514262b4afd1d0601f56246b1c5b16d0b3b8ea22046b04d42634760c23456d15bc1f4c6e6cd44177a9ec951467950af511f96a5a548cb22141ff284a6541ba6df7ad756dee61ac0ad506c43532e0b610e8a31a14a1983014b5589415cc8752a543795009be6318349ae16e7e7178685a696f737fa779827cdd2b035db6dd83003bab56cd2b62e4a2599168321b75bbda16ed6715bbb47984d6f6e9f6f5cb084aa7ddd3ab39462ab393a320c48421639165823b691b06c87fa340e029f3b5e64fbc4610c1f320c8c7b44c3705130253b385627c5462aadcb06cc41958ce330adb69146d8c404f6e8ea2d29b9961aa62a2d55e35220fd4f4553d00abef1c4bca149a591c1688aa0edbd90eb0decc299226d6fded3761fc02d4dab983230c960d2c173f5f7c737e097b1cab6e0a91cec52f45ca75c8551607bb16b0511765c1b712bb0b0e50b64738eb8ef107b0ce7593bfeb3509223a0acfba4743bb863b6cd69aab139a7c5ed8bac560f58244489416863cfb85c5cad7e5b5c9e5fbf3696abbe9540ebd3e78bc5b5e1e8add5789acbb32be3e9f5d9d5fc62395f984d1cd2b0cdcfe06327f33aea6064d78eb667947ca389aa17741af37920145b2a93c316605429295408569049bd78ef0292834f48da0f8c05178a2640930fa380556fed8e0c5c4ec692d12e1a7f041bcab4a8141dc5d64cc174a34139554c24bd7973c592108269ec45168fa91bd9048b08f934b27c8f0476843d8f8eedfba219ff78e64d44ba2e37e68ca02901464bae3f80df0138cb98de391c0b2296294c97c3c9308ad19d17b88e1e34061e00c98123d037ac0f26adf6a049d3f2bc6e98b4702421721121ae1573df0a6c422980818513b936b31c44eba0fea0ea646679a0c82755b740ef99e3d74162ff68d4d6', '2bc55ad5e3e24c6d8780383e561f5ab1e9038cca92aa893b16429db890bb9aaf1fdcbe671b7201545a25652f8e6522ba36b905804ef374ddb7560a403437659917b3d353014ea8013ed1838a69619d54c5c97b40fe844ce996eeb294be2fa6e0b4a77587d33d639c6a3d5040d029151e704fc76cdfb7bd200e280102626131cb2776e04cc73bc879dceca2317e23dce55f696bd8174e1c70e6e3c80367f0232bb22d8e50242c3f881c770a2bf75b137942eeef4dcfdf4659707830e1e8c0d29fa1071ca31eb3ad4880b6aee763e2ba949318fb8e47d19efb5d6b0a3cde31b51fa50aa16ea4a6a279fe21efa27813b9eac0f742873ed592904c711d18ef668070f443180cbb6ef6347006e9fd7c5116657867ca5a76af679f64707adba71023e128e31c0bc37505b903f81524955d720bda8607a783533ad7294a1d2fe12b0fb11ff09843ba89516c0738f603ea0631f7886d6107128a516ca7ac3e249ab18c8611f5285008014d62db15aeef2187f2d8227124b86b73884e6316b8c4113c22c267c2b6215d8930f4459845403f0722f47760c10b25212781d3ea611ab8d3c0fd3c0b82a97f2c09bc29f68ee5007e4402e0ef6b7d48af5c827c180159ab4f78e4521b799cd9cc73e3c0b6be87f5eb937e2912bdeac30c680df61906b4bd1e9b01e4111940be3903ded477e12ae5776ea205a3699b00b482da0860c706a25f61e3af1c369aca8806b5e541a9de85d8f108c1916db380db2e8e02e6206251ec5ad4f7a2602f7eacdaf1772d7874c5e560bda611023e657d0b32b58237358340a60b26cd05feb3d933fe24fdc8cc466d9fba44c1c348dbf9f76c931a2b58a656abbb10b4c58b7dab1d48a18729ff0f530e1cef716cb068d2bd7df4a1f54903545f6aab1d479c2cdb2d18ba52642cf5af3233da997be0213b0b6199b490e501e8dbef06c4f69e51caeda0b87f4ff1ac52b5efb60b75f41cd7147ab5928cb5c598036a3def1abb5bf6e8fe3adce2dbcb74f359dfb4ebfc589f89c700a541caa1c9a82f6fc6bc61d4e302845718cfb0f7f501329f2d5e2e578bab510162f5ca3c8c92e979c8b5cca3813a6b9cd0a0654d21635197988ca75d196284984c3f01d8c899e361ec61d8e088006a7d7dd8ae16d7ab67c6ff061e38ed9783f7155123da1b1dff1ba0365f3c7f79f98f8bb31160cbf9438011388af01701a68b2bc6228e7546f0f870592b846776f02de07a7676fdfcfc0ec33e051864edc703b6cc54a9c3d83cdbe689288f87ea9800062041f4faf9415a54a501c9b0f1a43dc3c7206555a913e5fe7c3f00d5812e0fa265fdfc683db997927d699e7618250c591afe71517a33eca2d370b4dcbc69ea611bee2c4fa52aca9379428bc278d1949721f96a5a9ba7342a5398b4298c3e9058d63a26079b3590fbcded6bcf004b970718ab571303ce79543f5335bdbef91959bf607564186f72b08bb19c4f0c8d3b36f77b7f5b934fcce1a67637cf6fbad304ae05a9b64ff3d612cbe1194ca6523fbe0c0369598a6d5e3e447afd4c067a2672a7ef85cd9be9fdd7f3bc8a12c9ee54a46b58a65d5dba2e3df3b7e72e7ff6bb7ab53bc757bb8bdbcb7f5da0abdf2e9d3f9efc93c06fe7f5eee5fbcbb7579bcbd5ebddebd5da7afdf6ddced44f44cdc3bcbe0b66075fec1076e20861df13b665c325327089ed20cb710317b92c72cdc77fb1ab6f6f38f8315eec4ee0be86c6c4f9819fedf4be6dfdb7a818ab0dd9d04a2895a9f61f30fa9b64734d02c357455e84bb5a1d3c69dfdb7f3dde1ea0c24fc2026dd3a8bad525a15ffefc17f4675dee6d1bdbf03e3a339f0a9d85b48fb275cda391d0adc60364688a2cd420b4a16a3d9c4d4d7db9af61ee65917bb3b6afe177e6d575daa3e67dd33ea01f5933ebf7d095bbcc8fff050000ffff', '03009714c4bdaa260000' ], [ 'X-Frame-Options',
        'SAMEORIGIN',
        'X-XSS-Protection',
        '1; mode=block',
        'X-Content-Type-Options',
        'nosniff',
        'X-EP-Request-UUID',
        'f6283103-275b-4281-9dfd-2469031e6d94',
        'Cache-Control',
        'no-cache, no-store, must-revalidate, private',
        'Pragma',
        'no-cache',
        'Expires',
        '0',
        'Content-Type',
        'application/json; charset=utf-8',
        'X-Runtime',
        '0.246798',
        'Content-Encoding',
        'gzip',
        'Transfer-Encoding',
        'chunked',
        'X-Node',
        'web6sj',
        'X-Node',
        'd3aa35cd8b',
        'X-Node',
        'easypost',
        'X-Backend',
        'easypost',
        'X-Proxied',
        'intlb2sj 44721f5b1e',
        'Connection',
        'close',
        'X-Proxied',
        'lb4sj, 934cd196c5',
        'Strict-Transport-Security',
        'max-age=15768000; includeSubDomains; preload' ]);


    nock('https://api.easypost.com:443', {encodedQueryParams:true})
    .get('/v2/shipments/shp_189dfd11110f491f89a69fd72431557b/rates')
    .reply(200, [ '1f8b0800000000000003c4924d6fdb300c86ff8bcfa9a1ef8f9cb77bb16c970d834089d4aac14d02d92e1614fdef938316ddd66ee921587c325fbea424f2b9ef2a4c3476eb2ff75dc16e7d0c831416b4f212c071a565744e45a1d1c7989c8bc8ba55b78bdf294dade0432b6871aad47e30c0a209c6ed15f357827d14722dc55a98cfcd33eff1a4e77687d4b2ed4e538b46aa77252dc2fb1ffb4ae3b89c04b516aa4dfbb4b9de3461b9f2d250f45c2df9b956daa6c3d1f06ec9d30465084f36d57bfdacbe700f659cc21f2d8fda0b27d250eea81e02c2a14d703b0fc36fe2d2e215317c9ba1c276226af3ce308cb4eada6bc3abedc69bb2bfa5ed148ecb196ff6813b8f1979fb58569e67e7c1f88c5628c9b5b6f179420152dacd4fb50942040b5e30e6a3ceca90719669c02c458e844661f7b0fa9582ec391a14ccc8044ae4142d292b984206d15b76090aae6bd9d5321dfe8181e9bd394d81efdd5b21b03db76f65809f11007ee1ed93cc14b34c1a93520623373a13e72e2a9dd0fa4b6c1f6aa26143c372eadf09785cd809021e5de726409c9100f1df09f8faf0130000ffff', '03006c5052bd11060000' ], [ 'X-Frame-Options',
        'SAMEORIGIN',
        'X-XSS-Protection',
        '1; mode=block',
        'X-Content-Type-Options',
        'nosniff',
        'X-EP-Request-UUID',
        'e748ed51-1d17-4cc3-adfc-572060aa7c08',
        'Cache-Control',
        'no-cache, no-store, must-revalidate, private',
        'Pragma',
        'no-cache',
        'Expires',
        '0',
        'Content-Type',
        'application/json; charset=utf-8',
        'X-Runtime',
        '0.125165',
        'Content-Encoding',
        'gzip',
        'Transfer-Encoding',
        'chunked',
        'X-Node',
        'web11sj',
        'X-Node',
        'd3aa35cd8b',
        'X-Node',
        'easypost',
        'X-Backend',
        'easypost',
        'X-Proxied',
        'intlb2sj 44721f5b1e',
        'Connection',
        'close',
        'X-Proxied',
        'lb4sj, 934cd196c5',
        'Strict-Transport-Security',
        'max-age=15768000; includeSubDomains; preload' ]);
};