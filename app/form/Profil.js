Ext.define('backapp.form.Profil', {
    xtype: 'formProfil',
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.Toggle',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio',
        'Ext.field.Hidden'
    ],
    config: {
        iconCls: 'comment',
        width: '100%',
        items: [

            {
                xtype: 'fieldset',
                instructions: '',
                action: 'fieldsetProfil',
                width: '80%',
                style: 'margin-left: 15%',
                defaults: {
                    labelWidth: '30%'
                },
                layout: {
                    align: 'middle'
                },
                items: [
                    /*{
                        xtype: 'timepickerfield',
                        name: 'workingHour',
                        label: 'Heure d\'ouverture',
                        cls: 'ypm-input-pink',
                        clearIcon: false,
                        action: 'workingStart',
                        required      : 0
                    },
                    {
                        xtype: 'timepickerfield',
                        name: 'workingHour',
                        label: 'Heure de fermeture',
                        cls: 'ypm-input-pink',
                        action: 'workingEnd',
                        clearIcon: false,
                        required      : 0
                    },*/
                    {
                        xtype: 'togglefield',
                        name: 'En ligne',
                        action: 'online',
                        label: 'En ligne'
                    }
                ]
            }

        ]
    },
    setRecord: function (record){
        /*if (this.down('[name=model]'))
            this.down('[name=model]').setValue(record.get('model'));
        if (this.down('[name=registration]'))
            this.down('[name=registration]').setValue(record.get('registration'));
        if (this.down('[name=name]'))
            this.down('[name=name]').setValue(record.get('name'));
        if (this.down('[name=description]'))
            this.down('[name=description]').setValue(record.get('description'));
        if (this.down('[name=brand]'))
            this.down('[name=brand]').setValue(record.get('brand'));
        if (this.down('[name=color]'))
            this.down('[name=color]').setValue(record.get('color'));
        if (this.down('[name=photo]'))
            this.down('[name=photo]').setValue(record.get('photo'));

        this.down('[action=enregistrercar]').setRecord(record);
        var image = this.down('[action=carImage]');
        image.setSrc(record.get('photo'));*/

    },

    initialize: function (obj) {
        var me = this;
        me.callParent(arguments);
        //met à jour les valeurs
        var online = backapp.utils.Config.getCurrentUser().online;
        /*var startWorking = backapp.utils.Config.getCurrentUser().workStartAt;
        var endWorking = backapp.utils.Config.getCurrentUser().workEndAt;*/

        //console.log('Profil initiliaze',online,startWorking,endWorking);

        var onlinetoggle = this.down('[action=online]');
        onlinetoggle.suspendEvents();
        onlinetoggle.setValue(online);
        onlinetoggle.resumeEvents(true);

        /*var startWorkingSelect = this.down('[action=workingStart]');
        startWorkingSelect.suspendEvents();
        var d = new Date();
        d.setHours(startWorking.split(':')[0]);
        d.setMinutes(startWorking.split(':')[1]);
        startWorkingSelect.setValue(d);
        startWorkingSelect.resumeEvents(true);

        var d2 = new Date();
        d2.setHours(endWorking.split(':')[0]);
        d2.setMinutes(endWorking.split(':')[1]);
        var endWorkingSelect = this.down('[action=workingEnd]');
        endWorkingSelect.suspendEvents();
        endWorkingSelect.setValue(d2);
        endWorkingSelect.resumeEvents(true);*/
    }
});
