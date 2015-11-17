/**
 * @class Activabackapp.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('backapp.controller.Produit', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            listeproduit: '[action=listeproduit]',
            enregistrerproduit: '[action=enregistrerproduit]'

        },

        control: {
            listeproduit: {
                itemtap: 'onListeProduitTap'
            },
            enregistrerproduit: {
                tap: 'onEnregistrerProduitTap'
            }
        }
    },
    onListeProduitTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste produit tap '+record.get('id'));
        this.redirectTo('product/'+record.get('id'));
    },
    onEnregistrerProduitTap: function (button, e, eOpts) {
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
            Nom: curview.down('[name=Nom]').getValue(),
            backappReference: curview.down('[name=backappReference]').getValue(),
            Commentaire: curview.down('[name=Commentaire]').getValue(),
            EAN: curview.down('[name=EAN]').getValue(),
            Image: curview.down('[name=Image]').getValue(),
            Tarif: curview.down('[name=Tarif]').getValue(),
            id: (button.getRecord())?button.getRecord().get('id'):''
        };
        console.log('new produit form ',data);
        if (data.id>0)
            var url = backapp.utils.Config.getProduitSaveUrl()+data.id+'/Save.json';
        else var url = backapp.utils.Config.getProduitSaveUrl()+'Save.json';
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
    }
});
