Ext.define('backapp.utils.LoadMaskCustom', {
    extend: Ext.LoadMask,
    xtype: 'loadmaskypm',
    config: {
        indicator: false,
        oldmessage: '<div class="spinner windcatcher"><div class="blade"></div><div class="blade"></div><div class="blade"></div><div class="blade"></div><div class="blade"></div><div class="blade"></div><div class="blade"></div><div class="blade"></div></div>'
    },
    applyIndicator: function (){
        return false;
    },
    applyMessage: function (m) {
        return this.getOldmessage()+m;
    }
});