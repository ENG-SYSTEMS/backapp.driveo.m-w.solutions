Ext.define('backapp.utils.Notification', {
    singleton : true,
    mixins: ['Ext.mixin.Observable'],
    id: 'notifications',
    config: {

    },
    register: function () {
        //initialisation du push
        var push = PushNotification.init({
            android: {
                senderID: frontapp.utils.Config.getSenderId()
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function(data) {
            console.log('registration id '+data.registrationId);
            //envoi du register id au server
            var url = frontapp.utils.Config.getDomain()+'/Systeme/Device/registerDevice.json';
            Ext.Ajax.request({
                url: url,
                useDefaultXhrHeader: false,
                params:{
                    KEY:  data.registrationId,
                    user_id: frontapp.utils.Config.getCurrentUser().user_id,
                    Type: device.platform,
                    Admin: 0
                },
                success: function (response, opts) {
                    console.log('Définition du register Id OK');
                },
                failure: function (response, opts) {
                    console.log('Petit problème ' + response.status);
                    // Basic alert:
                    var popup = Ext.Msg.alert('Erreur de connexion', 'Vous ne semblez pas connecté à internet. Si il s\'agit d\'un problème temporaire, pressez "OK" pour réessayer.', function () {
                    });
                }
            });
        });

        push.on('notification', function(data) {
            console.log('receive notification',data)

            //declenche une notification local
//            var sound = device.platform == 'Android' ? 'file://resources/sounds/sound.mp3' : 'file://resources/sounds/beep.caf';
            var sound = device.platform =='file://resources/sounds/sound.mp3';
            var date = new Date();

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: data.title,
                message: data.message,
                firstAt: date,
                sound: sound,
                icon: "icon.png"
            });

            //on rafraichit également le store correspondant
            switch (data.additionalData.store){
                case "Commandes":
                    var st = Ext.getStore('Commandes');
                    st.load();
                    me.redirectTo('commande')
                    break;
                case "Ordonnances":
                    var st = Ext.getStore('Ordonnances');
                    st.load();
                    me.redirectTo('ordonnance')
                    break;
            }
        });

        push.on('error', function(e) {
            console.log('receive notification error', e.message);
            // e.message
        });
    }
});
