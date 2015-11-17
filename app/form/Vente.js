Ext.define('backapp.form.Vente', {
    xtype: 'formVente',
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
        items: [
            
            {
                xtype: 'fieldset',
                style: 'margin:0 10%',
                instructions: '',
                action: 'fieldsetVente',
                defaults: {
                    labelWidth: '0%'
                },
                layout: {
                    align: 'middle'
                },
                items: [
                    {
                        width: '100%',
                        action: 'codecontainer',
                        layout: {
                            type: 'hbox'

                        },
                        items: [
                            {
                                height: 70,
                                cls: 'input-code',
                                xtype: 'textfield',
                                style: 'width: calc( 100% - 50px );',
                                name: 'EAN',
                                label: 'Code barre EAN',
                                labelWidth: '0%',
                                clearIcon: false,
                                placeHolder: 'Code barre EAN',
                                autoCapitalize: false,
                                required      : 0,
                                action: 'ventebarcode'
                            },
                            {
                                xtype: 'button',
                                cls: 'button-address-refresh m-bluegrey-bg-100 m-bluegrey-borderb-400',
                                height: 60,
                                iconCls: 'fa fa-barcode',
                                listeners: {
                                    tap:function () {
                                        var me = this;
                                        Ext.device.Scanner.scan({
                                            success: function (result) {
                                                if (!result.cancelled) {
                                                    me.up('[action=codecontainer]').down('[action=ventebarcode]').setValue(result.text);
                                                } else Ext.toast('Vous avez annulé le scan.');
                                            },
                                            failure: function (error) {
                                                console.log('erreur de scan',error);
                                                me.up('[action=codecontainer]').down('[action=ventebarcode]').setValue('6848729287429747682');
                                                Ext.toast('Une erreur est survenue bizarrement...');
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        label: 'Email',
                        labelWidth: '0%',
                        clearIcon: false,
                        placeHolder: 'Email',
                        autoCapitalize: false,
                        required      : 1
                    },
                    {
                        xtype         : 'textareafield',
                        name : 'commentaire',
                        label: 'Commentaires',
                        placeHolder   : 'Saisissez un commentaire ...',
                        maxRows: 4,
                        autoCapitalize: false,
                        required      : 0,
                        clearIcon     : false
                    },
                    {
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'enregistrervente',
                        text: 'Enregistrer'
                    },
                    {
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'back',
                        text: 'Annuler'
                    }
                ]
            },
            
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

    }
});
