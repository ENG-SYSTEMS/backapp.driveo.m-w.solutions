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
                senderID: backapp.utils.Config.getSenderId(),
                sound: "true",
                vibrate: "true"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function(data) {
            console.log('registration id BACK OFFICE '+data.registrationId);
            //envoi du register id au server
            var url = backapp.utils.Config.getDomain()+'/Systeme/Device/registerDevice.json';
            Ext.Ajax.request({
                url: url,
                useDefaultXhrHeader: false,
                params:{
                    KEY:  data.registrationId,
                    user_id: backapp.utils.Config.getCurrentUser().user_id,
                    Type: device.platform,
                    Admin: 1
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
            if (data.additionalData.foreground) {
                navigator.notification.beep(1);
            }

            var ctr = backapp.app.getController('backapp.controller.Main');
            console.log('receive notification',data);

            //declenche une notification local
//            var sound = device.platform == 'Android' ? 'file://android_asset/www/resources/sounds/sound.mp3' : 'file://resources/sounds/beep.caf';
            var path = window.location.pathname;
            path = 'file:/' +path.substr( path, path.length - 10 )+'resources/sounds/sound.mp3';
            var sound = (device.platform == "Android") ?  path: 'default';
            console.log('sound', sound, path, device.platform);
/*            var date = new Date();

            if (data.additionalData.notify) {
                cordova.plugins.notification.local.schedule({
                    id: 1231321,
                    title: data.title,
                    message: data.message,
                    firstAt: date,
                    sound: path,
                    icon: true
                });
            }*/

            var my_media = new Media(path,
                // success callback
                function () { console.log("playAudio():Audio Success"); },
                // error callback
                function (err) { console.log("playAudio():Audio Error: " + err); }
            );
            // Play audio
            my_media.play();

            //on rafraichit également le store correspondant
            switch (data.additionalData.store){
                case "Commandes":
                    var st = Ext.getStore('Commandes');
                    st.load();
                    ctr.redirectTo('commande')
                    break;
                case "Ordonnances":
                    var st = Ext.getStore('Ordonnances');
                    st.load();
                    ctr.redirectTo('ordonnance')
                    break;
            }

            //on affiche un message
            Ext.toast(data.message,5000);
        });

        push.on('error', function(e) {
            console.log('receive notification error', e.message);
            // e.message
        });
    }
});
