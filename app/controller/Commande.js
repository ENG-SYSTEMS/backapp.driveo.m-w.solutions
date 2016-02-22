/**
 * @class backapp.controller.Commande
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('backapp.controller.Commande', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            commandeListe: '[action=listecommande]',
            commandePrepare: '[action=commandePrepare]',
            commandeRetire: '[action=commandeRetire]',
            commandeCloture: '[action=commandeCloture]'
        },

        control: {
            commandeListe: {
                itemtap: 'onListeCommandeTap'
            },
            commandePrepare: {
                tap: function () {
                    this.onCommandeManage('Prepare');
                }
            },
            commandeRetire: {
                tap: function () {
                    this.onCommandeManage('Expedie');
                }
            },
            commandeCloture: {
                tap: function () {
                    this.onCommandeManage('Cloture');
                }
            }
        }
    },
    onListeCommandeTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste commande tap '+record.get('id'));
        this.redirectTo('commande/'+record.get('id'));
    },
    onCommandeManage: function (etat) {
        console.log('on commande prepare');
        var me = this;
        var curview = Ext.Viewport.getActiveItem();
        var id = curview.down('[action=commandeId]').getValue();
        if (!id) {
            Ext.Msg.alert('Id commande introuvable');
            return;
        }
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false,
            message: 'Enregistrement en cours ...'
        });

        var data = {
            logkey: backapp.utils.Config.getCurrentKey(),
            user_id: backapp.utils.Config.getCurrentUser().user_id,
            Etat: etat
        };
        console.log('commande change etat', data);
        var url = backapp.utils.Config.getCommandeManageUrl() + id + '/manage.json';
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                //suppression du masque
                curview.setMasked(false);

                //enregistrement du commentaire en local
                console.log('véhicule envoyé avec succés');
                var commandesStore = Ext.getStore('Commandes');
                commandesStore.load();

                Ext.toast(obj.msg,2000);

                me.redirectTo('commande');
            },
            failure: function (response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Enregistrement de la commande échoué ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    }
});
