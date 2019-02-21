(function () {
    'use strict';

    // Usage:
    // Dipanggil oleh komponen dokter saat menekan a-href patient di side bar.
    // Creates:
    // Menghasilkan tabel pasien.

    angular
        .module('smartdokter')
        .component('dokterTablePatients', {
            template: require('./dokter-table-patients.html'),
            controller: dokterTablePatientsController,
            controllerAs: '$ctrl'
        });

    dokterTablePatientsController.$inject = ['$scope', '$state', '$q', 'Riwayat', 'Pasien', 'Pendaftaran'];
    function dokterTablePatientsController($scope, $state, $q, Riwayat, Pasien, Pendaftaran) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.data = [];
            Pendaftaran.getPendaftaranByIdDokter()
                .then((res) => {
                    res.forEach((pendaftaran) => {
                        $q.all([
                            Pasien.getDataPasienById(pendaftaran.idPasien),
                            Riwayat.getRiwayatByIdPendaftaran(pendaftaran.id)
                        ])
                            .then((_res) => {
                                let temp = Object.assign(pendaftaran, {
                                    namaPasien: _res[0].nama,
                                    alamatPasien: _res[0].alamat,
                                    genderPasien: _res[0].gender,
                                    telefonPasien: _res[0].telefon,
                                    status: _res[1].length === 0 ? 'Waiting' : 'Has Been Treatment'
                                });
                                $scope.data.push(temp);
                            });
                    });
                });

            $scope.addTreatment = (data) => {
                $state.go('dokter.addTreatment', { data });
            };
        };
    }
})();