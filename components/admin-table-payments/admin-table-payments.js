(function () {
    'use strict';

    // Usage:
    // Di panggil oleh a-href Payment di side-nav admin.
    // Creates:
    // Menghasilkan tabel pembayaran.

    angular
        .module('smartdokter')
        .component('adminTablePayments', {
            template: require('./admin-table-payments.html'),
            controller: adminTablePaymentsController,
            controllerAs: '$ctrl',
        });

    adminTablePaymentsController.$inject = ['$scope', 'Riwayat', 'Pasien'];
    function adminTablePaymentsController($scope, Riwayat, Pasien) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.data = [];
            Riwayat.getRiwayatByIdDokter()
                .then((riwayats) => {
                    riwayats.forEach((riwayat) => {
                        Pasien.getDataPasienById(riwayat.idPasien)
                            .then((dataPasien) => {
                                $scope.data.push(Object.assign(riwayat, { dataPasien }));
                            });
                    });
                });
        };
    }
})();