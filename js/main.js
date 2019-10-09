( function( $ ) {
    $ ( function() {
        var $containerMedicalAppointments = $( '#container-medical-appointments' ),
            $containerClinicHistory = $( '#container-clinic-history' ),
            $containerProofPayment = $( '#container-proof-payment' ),
            $containerMainMenu = $( '#container-main-menu' ),
            full = moment().format(),
            date = moment(full).format('DD/MM/YYYY'),
            time = moment().format('LT');

        // menu options 
        $( 'body' ).on( 'click', '#btnMedicalAppointments', function(e) {
            $containerMainMenu.addClass( 'd-none' );
            $containerClinicHistory.addClass( 'd-none' );
            $containerProofPayment.addClass( 'd-none' );
            $containerMedicalAppointments.removeClass( 'd-none' );
        });

        $( 'body' ).on( 'click', '#btnClinicHistory', function(e) {
            $containerMainMenu.addClass( 'd-none' );
            $containerMedicalAppointments.addClass( 'd-none' );
            $containerProofPayment.addClass( 'd-none' );
            $containerClinicHistory.removeClass( 'd-none' );
        });

        $( 'body' ).on( 'click', '#btnProofPayment', function(e) {
            $containerMainMenu.addClass( 'd-none' );
            $containerMedicalAppointments.addClass( 'd-none' );
            $containerClinicHistory.addClass( 'd-none' );
            $containerProofPayment.removeClass( 'd-none' );
        });

        $( 'body' ).on( 'click', '.btn-exit', function(e) {
            $containerMedicalAppointments.addClass( 'd-none' );
            $containerClinicHistory.addClass( 'd-none' );
            $containerProofPayment.addClass( 'd-none' );
            $containerMainMenu.removeClass( 'd-none' );
        });

        // Comprobante de Pago
        $( '.d-date' ).text( date );
        $( '.d-hour' ).text( time );
    });
}( jQuery ) );