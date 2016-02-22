Ext.define('backapp.view.Login', {
    extend: 'Ext.Container',
    requires: [
        'Ext.form.FieldSet'
    ],
    xtype: 'login',
    config: {
        cls: 'login-page',
        items: [
            /*{
                docked: 'top',
                xtype: 'titlebar',
                title: 'Youpark.me',
                cls: 'header'
            },*/
            {
                xtype: 'container',
                cls: 'login-wrapper',
                scrollable: true,
                items:[
                    {
                        xtype: 'container',
                        cls: 'loginbox',
                        width: 280,
                        style: 'margin-bottom:80px;',
                        items:[
                            {
                                width: '100%',
                                height: 236,
                                cls: 'titre_logo',
                                html: '<h1>Back Office</h1>'
                            },
                            {
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        action: 'logintext',
                                        name : 'login',
                                        cls: 'ypm-input',
                                        value: '',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Identifiant',
                                        listeners: {
                                            focus: function () {
                                                Ext.Viewport.setHeight('100.1%');
                                                //Ext.Viewport.setHeight('100%');
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        labelWidth: '0%',
                                        action: 'passtext',
                                        cls: 'ypm-input',
                                        name : 'password',
                                        clearIcon: false,
                                        value: '',
                                        placeHolder: 'Mot de passe'
                                    },
                                    {
                                        xtype: 'textfield',
                                        labelWidth: '0%',
                                        action: 'domaintext',
                                        cls: 'ypm-input',
                                        name : 'domain',
                                        clearIcon: false,
                                        value: '',
                                        placeHolder: 'Domaine'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'loginbutton',
                                        text: 'Connexion',
                                        cls: 'ypm-button block',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        listeners: {
            resize: function () {
                console.log('RESIZE !!!!!!!');
            },
            hide: function () {
                Ext.Viewport.setHeight('100%');
            }
        }
    }
});
