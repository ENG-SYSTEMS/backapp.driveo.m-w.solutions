Ext.define('backapp.utils.Slot', {
    extend: 'Ext.picker.Slot',
    xtype: 'pickerslot',
    alternateClassName: 'Ext.Picker.Slot',
    onScrollEnd : function (scroller, x, y) {
        var me = this,
            index = Math.round(y / me.getPicker().bar.dom.getBoundingClientRect().height),
            viewItems = me.getViewItems(),
            item = viewItems[index];

        if (item) {
            me.selectedIndex = index;
            me.selectedNode = item;

            me.fireEvent('slotpick', me, me.getValue(), me.selectedNode);
        }
    },
    /**
     * Sets the value of this slot
     * @private
     */
    setValue: function(value) {
        return this.doSetValue(value);
    },

    doSetValue: function(value, animated) {
        if (!this.container) {
            //we don't want to call this until the slot has been rendered
            this._value = value;
            return;
        }else this.rendered = true;

        var store = this.getStore(),
            viewItems = this.getViewItems(),
            valueField = this.getValueField(),
            index, item;

        index = store.findExact(valueField, value);

        if (index == -1) {
            index = 0;
        }

        item = Ext.get(viewItems[index]);

        this.selectedIndex = index;
        if (item) {
            this.scrollToItem(item, (animated) ? {
                duration: 100
            } : false);
            this.select(this.selectedIndex);
        }

        this._value = value;
    }

});