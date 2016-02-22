/**
 * @class backapp.controller.FullScreen
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('backapp.controller.FullScreen', {
    extend: 'backapp.controller.Main',

    /**
     * Private fileds
     */
    popup: null,
    origHauteur: 0,
    origContainer: null,
    origTitle: null,
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            gotofullscreen: '[action=gotofullscreen]'
        },

        control: {
            gotofullscreen: {
                tap: 'onGotofullscreenTap'
            }
        },
        routes: {
        }
    },
    onGotofullscreenTap: function (btn) {
        if (!this.popup)
            this.showPopup(btn);
        else
            this.hidePopup(btn);
    },
    showPopup: function (btn) {
        var container = btn.up(),
            me=this;
        console.log('showPOpup fullscreen');

        //detection d'un iframe
        var iframe =  container.element.down('iframe');

        if (iframe && !greenkub.config.Main.getConnectionState()){
            Ext.toast('Cette fonctionnalité n\'est disponible que lorsque vous êtes connecté à internet. Veuillez vous connecter et réessayer.',2000);
        }else {
            //creation du popup
            this.popup = Ext.create('Ext.Panel',{
                xtype: 'panel',
                centered: true,
                height: '100%',
                itemId: 'modalPanel',
                width: '100%',
                hideOnMaskTap: true,
                modal: true,
                scrollable: false,
                hideAnimation: {
                    type: 'popOut',
                    duration: 300,
                    easing: 'ease-out'
                },
                showAnimation: {
                    type: 'popIn',
                    duration: 300,
                    easing: 'ease-in'
                },
                items: [
                ]
            });

            //on sauvegarde l'emplacement d'origine
            this.origContainer = container.up();
            this.origTitle = btn.getText();
            this.origHauteur = container.getHeight();
            //on affiche le popup
            Ext.Viewport.getActiveItem().add(this.popup);

            this.popup.show();
            this.popup.on('show', function () {
                //on ajoute le contenu dans le popup
                me.popup.add(container);

                //on modifie la hauteur
                container.setHeight(Ext.getBody().getHeight() - 10);

                //dans le cas d'un iframe on modifie la baslie pour faire apparapitre le contenu en plein ecran
                if (iframe) {
                    container.getInnerItems()[0].setHidden(false);

                    //alors on modifie l'attribut src et le display
                    iframe.set({src: iframe.getAttribute('src-data')});
                    iframe.setStyle('display', 'block');
                }

                //on modifie le bouton
                btn.setText('Sortir du mode plein écran');


            });
        }
    },
    hidePopup: function (btn) {
        var container = btn.up(),
            me = this;
        console.log('HIDEPOpup fullscreen');

        //on ferme le popup
        this.popup.hide();

        //on rétablit la hauteur
        container.setHeight(me.origHauteur);

        //on repositionne le contenu
        me.origContainer.add(container);

        //dans le cas d'un iframe on modifie la baslie pour faire apparapitre le contenu en plein ecran
        var iframe =  container.element.down('iframe');
        if (iframe){
            container.getInnerItems()[0].setHidden(true);

            //alors on modifie l'attribut src et le display
            iframe.set({src: ''});
            iframe.setStyle('display','none');
        }

        //on modifie le bouton
        btn.setText(me.origTitle);

        this.popup.on('hide', function () {
            //on détruit le popup
            Ext.Viewport.getActiveItem().remove(me.popup);
            me.popup.destroy();
            me.popup = null;
        });
    }
});
