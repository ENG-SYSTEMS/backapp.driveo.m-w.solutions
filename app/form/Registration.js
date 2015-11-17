




Ext.define('backapp.form.Registration', {
    xtype: 'registration',
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio'
    ],
    config: {
        cls: 'client-registration',
        action: 'forminscription',
        scrollable: false,
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Inscrivez-vous',
               cls: 'header',
               items: []
            },
            {
                xtype: 'container',
                cls: 'login-wrapper',
                scrollable: true,
                items:[
                    {
                        xtype: 'container',
                        cls: 'registration-box',
                        width: 280,
                        items:[
                            {
                                xtype: 'fieldset',
                                instructions: '',
                                defaults: {
                                    labelWidth: '0%'
                                },
                                items: [
                                    {
                                        xtype         : 'textfield',
                                        name : 'lastname',
                                        label: 'Nom',
                                        cls: 'ypm-input',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Nom',
                                        autoCapitalize: false,
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'firsname',
                                        label: 'Prénom',
                                        cls: 'ypm-input',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Prénom',
                                        autoCapitalize: false,
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'passwordfield',
                                        name : 'password',
                                        label: 'Mot de passe',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Mot de passe',
                                        cls: 'ypm-input',
                                        autoCapitalize: false,
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'emailfield',
                                        name : 'email',
                                        label: 'Email',
                                        cls: 'ypm-input',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Email',
                                        autoCapitalize: false,
                                        required      : 0
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'annulerinscription',
                                        text: 'Annuler',
                                        cls: 'ypm-button annulation'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'validerinscription',
                                        text: 'Enregistrer',
                                        cls: 'ypm-button valider-inscription'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
