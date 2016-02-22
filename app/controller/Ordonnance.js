/**
 * @class backapp.controller.Ordonnance
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('backapp.controller.Ordonnance', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            ordonnanceImage: '[action=ordonnancePhoto]',
            ordonnanceCommentaire: '[action=ordonnanceCommentaire]',
            ordonnanceSubmit: '[action=ordonnanceSubmit]',
            ordonnanceListe: '[action=listeordonnance]',
            ordonnancePrepare: '[action=ordonnancePrepare]',
            ordonnanceRetire: '[action=ordonnanceRetire]',
            ordonnanceCloture: '[action=ordonnanceCloture]'
        },

        control: {
            ordonnanceSubmit: {
                tap: 'onSubmitTap'
            },
            ordonnanceListe: {
                itemtap: 'onListeOrdonnanceTap'
            },
            ordonnancePrepare: {
                tap: function () {
                    this.onOrdonnanceManage('Prepare');
                }
            },
            ordonnanceRetire: {
                tap: function () {
                    this.onOrdonnanceManage('Expedie');
                }
            },
            ordonnanceCloture: {
                tap: function () {
                    this.onOrdonnanceManage('Cloture');
                }
            }
        }
    },
    onListeOrdonnanceTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste ordonnance tap '+record.get('id'));
        this.redirectTo('ordonnance/'+record.get('id'));
    },
    onSubmitTap: function (button, e, eOpts) {
        var me = this;
        var curview = Ext.Viewport.getActiveItem();
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false,
            message: 'Enregistrement en cours ...'
        });

        var data = {
            logkey: backapp.utils.Config.getCurrentKey(),
            user_id: backapp.utils.Config.getCurrentUser().user_id,
            Image: this.getOrdonnanceImage().getValue(),
            Commentaire: this.getOrdonnanceCommentaire().getValue(),
            id: (button.getRecord())?button.getRecord().get('id'):''
        };
        console.log('new ordonnance sending ',data);
        if (data.id>0)
            var url = backapp.utils.Config.getOrdonnanceSaveUrl()+data.id+'/send.json';
        else var url = backapp.utils.Config.getOrdonnanceSaveUrl()+'send.json';
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                //suppression du masque
                curview.setMasked(false);

                //enregistrement du commentaire en local
                console.log('véhicule envoyé avec succés');
                var produitStore = Ext.getStore('Produits');
                produitStore.load();

                if (!data.id) me.redirectTo('main');
            },
            failure: function(response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Enregistrement du produit échoué ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    },
    onOrdonnanceManage: function (etat) {
        console.log('on commande '+etat);
        var me = this;
        var curview = Ext.Viewport.getActiveItem();
        var id = curview.down('[action=ordonnanceId]').getValue();
        if (!id) {
            Ext.Msg.alert('Id ordonnance introuvable');
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
        var url = backapp.utils.Config.getOrdonnanceManageUrl() + id + '/manage.json';
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
                var ordonnancesStore = Ext.getStore('Ordonnances');
                ordonnancesStore.load();

                Ext.toast(obj.msg,2000);

                me.redirectTo('ordonnance');
            },
            failure: function (response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Enregistrement de l\'ordonnance échoué ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    }
});
