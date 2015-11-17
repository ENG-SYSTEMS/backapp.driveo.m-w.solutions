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
                items:[
                    {
                        xtype: 'container',
                        cls: 'loginbox',
                        width: 280,
                        height: 450,
                        items:[
                            {
                                width: '100%',
                                height: 170,
                                cls: 'titre_logo',
                                html: '<h1>backapps / Ventes</h1>'
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
                                        placeHolder: 'Email',
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
                                        placeHolder: 'Mot de passe'/*,
                                        label: 'Mot de passe'*/
                                    },
                                    {
                                        style: 'visibility:hidden',
                                        xtype: 'button',
                                        text: 'Créer un compte',
                                        action: 'inscription',
                                        cls: 'inscription'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'loginbutton',
                                        text: 'Connexion',
                                        cls: 'ypm-button'
                                    }/*,
                                    {
                                        xtype: 'button',
                                        //text: 'Connexion avec Facebook',
                                        cls: 'ypm-button facebook',
                                        width: 117,
                                        height: 24,
                                        ui: 'action',
                                        handler: function() {
                                            var redirectUrl = Ext.Object.toQueryString({
                                                redirect_uri: window.location.protocol + "//" + window.location.host + window.location.pathname,
                                                client_id: backapp.utils.Config.getFacebookAppId(),
                                                response_type: 'token'
                                            });
                                            document.location.href=('https://m.facebook.com/dialog/oauth?'+redirectUrl);
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        //text: 'Connexion avec Google',
                                        cls: 'ypm-button google',
                                        width: 117,
                                        height: 24,
                                        ui: 'confirm',
                                        handler: function() {
                                            //https://accounts.google.com/o/oauth2/auth?client_id=841077041629.apps.googleusercontent.com&redirect_uri=postmessage&response_type=code%20token%20id_token%20gsession&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login&request_visible_actions=http%3A%2F%2Fschemas.google.com%2FAddActivity&cookie_policy=single_host_origin&hl=fr&include_granted_scopes=true&proxy=oauth2relay833559471&origin=https%3A%2F%2Fgoogle-developers.appspot.com&state=377422077%7C0.492081198&
                                            var redirectUrl = Ext.Object.toQueryString({
                                                redirect_uri: 'http://localhost:1841',
                                                origin: window.location.protocol + "//" + window.location.host + window.location.pathname,
                                                client_id: backapp.utils.Config.getGoogleAppId(),
                                                cookiepolicy: 'single_host_origin',
                                                requestvisibleactions: 'http://schemas.google.com/AddActivity',
                                                response_type: 'token',
                                                scope: 'https://www.googleapis.com/auth/plus.login'
                                            });
                                            document.location.href=('https://accounts.google.com/o/oauth2/auth?'+redirectUrl);
                                        }
                                    }*/
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
