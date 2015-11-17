/**
 * Handles Facebook interactions, specifically Login and Logout.
 *
 * When a user logs in, we display their profile picture and a list of Runs.
 */
Ext.define('backapp.controller.Google', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],

    config: {
        control: {
            '#signout': {
                tap: 'onUserTap'
            },
            '[action=logout]': {
                tap: 'logout'
            }
        }
    },
    /** connection flag **/
    connected: false,

    /**
     * Load the Google plus Javascript SDK asynchronously
     */
    init: function() {

        window.gpAsyncInit = Ext.bind(this.onGoogleInit, this);

        (function(d){
            var js, id = 'googleplus-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//apis.google.com/js/client:plusone.js?onload=gpAsyncInit";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
    },

    onGoogleInit: function() {
        console.log('on google init');
        if (backapp.utils.Config.getGoogleAppId() === '') return;

        var me = this;

        //traitement du résultat
        me.handleAuthResult = function (authResult) {
            console.log('google connected ',authResult.status.signed_in);
            clearTimeout(me.gpLoginTimeout);
            me.hasCheckedStatus = true;
            Ext.Viewport.setMasked(false);
            if (authResult.status.signed_in) {
                me.connected=true;
                me.onLogin();
            } else {
                me.login();
            }
        }
        
        gapi.auth.authorize({client_id: backapp.utils.Config.getGoogleAppId(), scope: 'https://www.googleapis.com/auth/plus.login', immediate: true, response_type: 'token id_token',cookie_policy: 'single_host_origin'}, me.handleAuthResult);
        me.gpLoginTimeout = setTimeout(function() {

            Ext.Viewport.setMasked(false);

            Ext.create('Ext.MessageBox', {
                title: 'Google plus Error',
                message: [
                    'Google plus Authentication is not responding. ',
                    'Please check your Google plus app is correctly configured, ',
                    'then check the network log for calls to Google plus for more information.',
                    'Restart the app to try again.'
                ].join('')
            }).show();

        }, 10000);
    },

    login: function() {
        Ext.Viewport.setMasked(false);
        var splash = Ext.getCmp('login');
        if (!splash) {
            Ext.Viewport.add({ xclass: 'backapp.view.Login', id: 'login' });
        }
    },

    onLogin: function() {

        var me = this,
            errTitle;

        gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.execute(function(resp) {
                if (resp.error) {
                    gapi.auth.signOut();
                    errTitle = "Google plus " + response.error.type + " error";
                    Ext.Msg.alert(errTitle, response.error.message, function() {
                        me.login();
                    });
                }else{
                    backapp.userData = resp;
                    if (!me.main) {
                        me.main = Ext.create('backapp.view.Main', {
                            id: 'main'
                        });
                    }
                    Ext.Viewport.setActiveItem(me.main);
                }
            });
        });
    },

    logout: function() {
        //Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Logging out...'});
        if (this.connected) {
            var me = this;
            console.log('google signout');
            gapi.auth.signOut();
            me.handleAuthResult = function (authResult) {
                console.log('google logout ',authResult);
                clearTimeout(me.gpLoginTimeout);
                Ext.Viewport.setMasked(false);
                Ext.Viewport.setActiveItem(Ext.getCmp('login'));
            }
            gapi.auth.authorize({client_id: backapp.utils.Config.getGoogleAppId(), scope: 'https://www.googleapis.com/auth/plus.login', immediate: true}, me.handleAuthResult);
            me.gpLoginTimeout = setTimeout(function() {
    
                Ext.Viewport.setMasked(false);
    
                Ext.create('Ext.MessageBox', {
                    title: 'Google plus Error',
                    message: [
                        'Google plus Authentication is not responding. ',
                        'Please check your Google plus app is correctly configured, ',
                        'then check the network log for calls to Google plus for more information.',
                        'Restart the app to try again.'
                    ].join('')
                }).show();
    
            }, 10000);
        }
    },

    /**
     * Called when the Logout button is tapped
     */
    onLogout: function() {

        if (!this.hasCheckedStatus) return;

        this.login();

        Ext.Viewport.setMasked(false);
        Ext.Viewport.setActiveItem(Ext.getCmp('login'));
    },

    /**
     * When the user profile picture is tapped, create a Logout button and pop it up next to the
     * avatar.
     */
    onUserTap: function(cmp) {

        if (!this.logoutCmp) {
            this.logoutCmp = Ext.create('Ext.Panel', {
                width: 120,
                top: 0,
                left: 0,
                padding: 5,
                modal: true,
                hideOnMaskTap: true,
                items: [
                    {
                        xtype: 'button',
                        id: 'logoutButton',
                        text: 'Logout',
                        ui: 'decline'
                    }
                ]
            });
        }

        this.logoutCmp.showBy(cmp);
    }
});
