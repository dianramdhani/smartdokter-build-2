angular.module('smartdokter')
    .config(['$stateProvider', function ($stateProvider) {
        let states = [
            { name: 'admin.patients', url: '/patient', component: 'adminTablePatients' },
            { name: 'admin.services', url: '/service', component: 'adminTableServices' },
            { name: 'admin.registrationPatient', url: '/', component: 'adminRegistrationPatient' },
            { name: 'admin.updatePatient', url: '/{data:json}', component: 'adminUpdatePatient' },
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }]);