/**
 * @class Activabackapp.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('backapp.controller.Vente', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            enregistrervente: '[action=enregistrervente]'

        },

        control: {
            enregistrervente: {
                tap: 'onEnregistrerVenteTap'
            }
        }
    },
    onEnregistrerVenteTap: function (button, e, eOpts) {
        var me = this;
        var curview = Ext.Viewport.getActiveItem();

        //test de l'intégrité
        if (!Ext.Viewport.getActiveItem().down('textfield[name=email]').getValue()){
            Ext.Msg.alert('Formulaire incorrect', 'Veuillez compléter votre saisie.');
            return;
        }

        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false,
            message: 'Enregistrement en cours ...'
        });

        Ext.Ajax.request({
            url: backapp.utils.Config.getVenteSaveUrl(),
            useDefaultXhrHeader: false,
            params: {
                logkey: backapp.utils.Config.getCurrentKey(),
                user_id: backapp.utils.Config.getCurrentUser().user_id,
                Commentaire: Ext.Viewport.getActiveItem().down('textareafield[name=commentaire]').getValue(),
                CodeBarre: Ext.Viewport.getActiveItem().down('textfield[name=EAN]').getValue(),
                Email: Ext.Viewport.getActiveItem().down('textfield[name=email]').getValue()
            },
            method: 'POST',
            success: function(response, opts) {
                //reset
                Ext.Viewport.getActiveItem().down('textareafield[name=commentaire]').setValue('');
                Ext.Viewport.getActiveItem().down('textfield[name=EAN]').setValue('');
                Ext.Viewport.getActiveItem().down('textfield[name=email]').setValue('');

                //suppression du masque
                curview.setMasked(false);

                //enregistrement du commentaire en local
                console.log('vente enregistrée avec succés');

                //redirection
                me.redirectTo('main');
            },
            failure: function(response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Vente non enregistrée. Veuillez réeesayer' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    }
});
