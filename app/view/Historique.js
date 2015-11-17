Ext.define('backapp.view.Historique', {
    extend: 'Ext.Container',
    xtype: 'histo',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'backapp.form.Course'
    ],
    config: {
        cls: 'valet-list-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Historique des courses',
               cls: 'header',
               items: [
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-navicon',
                        cls: 'open-socials',
                        handler: function(){
                            backapp.utils.Config.toggleMenu();
                        }
                    },
                    {
                        xtype: 'spacer'
                    }/*,
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-share-alt',
                        cls: 'open-socials',
                        handler: function(){
                            if(Ext.Viewport.getMenus().right.isHidden()){
                                Ext.Viewport.showMenu('right');
                            }
                            else
                            {
                                Ext.Viewport.hideMenu('right');
                            }
                        }
                    }*/
               ]
           },
           {
                style: 'margin: 10px 30px',
                align: 'center',
                items:[
                    /*{
                        cls: 'valet-search-container',
                         height: 70,
                         html: 
                            '<div class="valet-search m-bluegrey-bg-100 m-bluegrey-borderb-400">'+
                                 '<span class="valet-search-address">125 Avenue de la République<br>75001 Paris</span>'+
                                 '<i class="fa fa-refresh m-bluegrey-bg-400"></i><i class="fa fa-crosshairs m-bluegrey-bg-400"></i>'+
                             '</div>'+
                             '<div class="valet-search-form m-bluegrey-bg-100 m-bluegrey-borderb-400">'+
                                 '<form>'+
                                     '<button type="submit" class="m-bluegrey-bg-400">'+
                                         '<i class="fa fa-search"></i>'+
                                     '</button>'+
                                     '<input type="text" name="address" id="address" placeholder="Adresse...">'+
                                 '</form>'+
                             '</div>'
                    },*/
                    {
                        title: 'Historique',
                        iconCls: 'bookmarks',
                        style: 'overflow:hidden',
                        width: '100%',
                        action:'HistoCourse',
                        height: '100%',
                        xtype: 'list',
                        store: 'Courses',
                        cls: 'histo-list',
                        itemTpl:  '<div class="histo-item">'+
                                '<img src="{vehicule_photo}" class="float-left valet-avatar" alt="img">'+
                                '<span class="valet-dist valet-near">{amount} crédits</span>'+
                                '<h2>{client}</h2>'+
                                '<span class="valet-hours">{vehicule_detail}</span>'+
                                '<span class="valet-hours">{app_time}</span>'+
                            '</div>',
                        grouped: false,
                        pinHeaders: false,
                        plugins: [
                            {
                                xclass: 'Ext.plugin.ListPaging',
                                autoPaging: true,
                                loadMoreText: 'Chargement...',
                                noMoreRecordsText: 'Pas plus d\'enregistrements'
                            },
                            {
                                xclass: 'Ext.plugin.PullRefresh',
                                pullText: 'Glissez vers le bas pour rafraichir.',
                                releaseText:'Relachez pour rafraichir.',
                                loadingText: 'Chargement en cours ...',
                                loadedText: 'Chargement reussi.',
                                lastUpdatedText: 'Mise à jour:  '
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
