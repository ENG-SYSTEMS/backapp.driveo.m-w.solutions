Ext.define('backapp.form.Produit', {
    xtype: 'formProduit',
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
                style: 'margin:0 10% 10px 10%',
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
                        layout: {
                            type: 'hbox'

                        },
                        items: [
                            {
                                xtype: 'image',
                                width: '100px',
                                action: 'produitImage',
                                height: '100px',
                                src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'Image',
                                action: 'photo',
                                value: ''
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                text: 'Prendre une photo',
                                action: 'take-photo',
                                cls: 'ypm-button',
                                handler: function () {
                                    navigator.camera.getPicture(onSuccess, onFail, {
                                        quality : 90,
                                        destinationType : Camera.DestinationType.DATA_URL,
                                        sourceType : Camera.PictureSourceType.CAMERA,
                                        allowEdit : true,
                                        encodingType: Camera.EncodingType.JPEG,
                                        targetWidth: 800,
                                        targetHeight: 600,
                                        popoverOptions: CameraPopoverOptions,
                                        saveToPhotoAlbum: false
                                    });

                                    function onSuccess(imageData) {
                                        var image = Ext.Viewport.getActiveItem().down('[action=produitImage]');
                                        image.setSrc("data:image/jpeg;base64," + imageData);
                                        var hi = Ext.Viewport.getActiveItem().down('[action=photo]');
                                        hi.setValue(imageData);
                                    }

                                    function onFail(message) {
                                        alert('Failed because: ' + message);
                                    }
                                }
                            }                        ]
                    },
                    {
                        xtype: 'textfield',
                        style: 'margin:10px 0 0 0',
                        width: '100%',
                        name: 'Nom',
                        label: 'Nom',
                        labelWidth: '20%',
                        clearIcon: false,
                        placeHolder: 'Nom du produit',
                        autoCapitalize: false,
                        required      : 1
                    },
                    {
                        xtype: 'textfield',
                        width: '100%',
                        name: 'backappReference',
                        label: 'Elements en backapp',
                        labelWidth: '80%',
                        clearIcon: false,
                        defaultValue: '1',
                        placeHolder: '0',
                        autoCapitalize: false,
                        required      : 1
                    },
                    {
                        xtype: 'textfield',
                        width: '100%',
                        name: 'Tarif',
                        label: 'Tarif HT',
                        labelWidth: '60%',
                        clearIcon: false,
                        defaultValue: '',
                        placeHolder: 'Tarif HT',
                        autoCapitalize: false,
                        required      : 1
                    }/*,
                    {
                        xtype: 'togglefield',
                        name: 'pdaPrepare',
                        label: 'Saouhaitez-vous une préparation PDA ?',
                        labelWidth: '60%'
                    }*/,
                    {
                        xtype         : 'textareafield',
                        name : 'Commentaire',
                        label: 'Commentaire',
                        placeHolder   : 'Saisissez un commentaire privé. Non visible sur la boutique',
                        maxRows: 4,
                        autoCapitalize: false,
                        required      : 0,
                        clearIcon     : false
                    },
                    {
                        width: '100%',
                        style: 'margin:10px 0 0 0',
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
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'enregistrerproduit',
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
        if (this.down('[name=Image]')) {
            this.down('[name=Image]').setValue(record.get('Image'));
            this.down('[action=produitImage]').setSrc(backapp.utils.Config.getDomain()+'/'+record.get('Image')+'.mini.100x100.jpg');
        }
        if (this.down('[name=Nom]'))
            this.down('[name=Nom]').setValue(record.get('Nom'));
        if (this.down('[name=Tarif]')) {
            this.down('[name=Tarif]').setValue(record.get('Tarif'));
        }
        if (this.down('[name=backappReference]'))
            this.down('[name=backappReference]').setValue(record.get('backappReference'));
        if (this.down('[name=Commentaire]'))
            this.down('[name=Commentaire]').setValue(record.get('Commentaire'));
        if (this.down('[name=EAN]'))
            this.down('[name=EAN]').setValue(record.get('EAN'));

        this.down('[action=enregistrerproduit]').setRecord(record);
    }
});
