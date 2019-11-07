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

            //cargando especialidades -> json
            $.each(data.especialidad, function(i, spec) {
                $('#selectSpec').append('<option value=' + i + ' data-id="' + spec.id + '">' + spec.name + '</option>');
            });
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

            //Salir - generar cita
            $('#selectSpec').empty();
            $('#selectSpec').append('<option selected>Seleccionar especialidad...</option>');
        });

        /*----------------------------------GENERAR CITA--------------------------------------*/
        //buscar paciente
        $containerMedicalAppointments.on( 'click', '.btn-patient', function() {
            var value = $containerMedicalAppointments.find( '#inputDni' ).val();
            if ( value.length === 8 ) {
                $.each( data.pacientes, function(i) {
                    patient = data.pacientes[i];
                    if(value===patient.doc) {
                        $containerMedicalAppointments.find('#inputName').val(patient.name);
                        $containerMedicalAppointments.find('#inputLastName').val(patient.lastname);
                        $containerMedicalAppointments.find('#inputHC').val(patient.nhc);
                        $containerMedicalAppointments.find('#inputGender').val(patient.gender);
                        $containerMedicalAppointments.find('#inputSis').val('');
                    }         
                });
            }
            if (value.length === 0 || value.length < 8) {
                alert('Ingrese documento de identidad válido.');
            }
            
        });

        //buscar sis
        $containerMedicalAppointments.on( 'click', '.btn-sis', function() {
            var value = $containerMedicalAppointments.find( '#inputDni' ).val();
            if ( value.length <= 8 ) {
                $.each( data.pacientes, function(i) {
                    patient = data.pacientes[i];
                    if(value===patient.doc) {
                        if(patient.sis !== "") {
                            $containerMedicalAppointments.find('#inputSis').val(patient.sis);
                        } else {
                            $containerMedicalAppointments.find('#inputSis').val("######");                            
                        }
                    }                
                });
            }
            if (value.length === 0 || value.length < 8) {
                alert('Ingrese documento de identidad válido.');
            }
        });

        //combobox especialidad
        $containerMedicalAppointments.on( 'change', '#selectSpec', function() {
            var specSelected = $("#selectSpec option:selected").attr('data-id');
            $containerMedicalAppointments.find('tbody .timetable-row').remove();
            $('#inputDate, #inputHour, #inputAppoint').val('');
            if ( typeof(specSelected) !== typeof undefined) {
                $('#selectDoc').removeAttr('disabled');
                $('#selectDoc').empty();
                $('#selectDoc').append('<option selected>Seleccionar médico...</option>');
                $.each(data.medicos, function(i, med) {
                    if ( med.spec_id === specSelected ) {
                        $('#selectDoc').append('<option value=' + i + ' data-cmp="' + med.cmp + '">' + med.firstname + ' ' + med.lastname + '</option>');
                    }
                });

                //cargando horarios de especialidad
                $.each(data.horario, function(i, row) {
                    if ( row.spec_id === specSelected ) {
                        $containerMedicalAppointments.find('tbody').append('<tr class="timetable-row"><td class="order">'+row.order+'</td><td class="doctor" data-cmp="'+row.cmp+'">'+row.namedoc+'</td><td class="date">'+row.date+'</td><td class="hour">'+row.hour+'</td><td>'+row.cons+'</td></tr>')
                    }
                });

            } else {
                $('#selectDoc').attr('disabled', true);
                $('#selectDoc').empty();
                $('#selectDoc').append('<option selected>Seleccionar médico...</option>');
            }
        });

        //grilla
        function aleatorio(minimo,maximo){
            return Math.round(Math.random() * (maximo - minimo) + minimo);
        }

        $containerMedicalAppointments.on( 'click', '.timetable-row', function() {
            var cmpDoctor = $(this).find('.doctor').data('cmp'),
                valDate = $(this).find('.date').text(),
                valHour = $(this).find('.hour').text();
            $.each( $('#selectDoc option'), function(i) {
                var cmpSelect = $(this).data('cmp');
                $(this).removeAttr('selected');
                if (cmpSelect === cmpDoctor) {
                    $(this).attr('selected', 'selected');
                }
            });
            $('#inputDate').val(valDate);
            $('#inputHour').val(valHour);
            $('#inputAppoint').val(aleatorio(100000, 999999));
        });

        //Registrar cita
        $containerMedicalAppointments.on( 'click', '#cma-register', function() {
            var valAppoint = $('#inputAppoint').val();
            if ($('#inputAppoint').val() !== '' && $('#inputDni').val() !== '') {
                alert( 'Cita generada con el Nro. ' + valAppoint );
            }
        });

        // Comprobante de Pago
        $( '.d-date' ).text( date );
        $( '.d-hour' ).text( time );
    });
}( jQuery ) );