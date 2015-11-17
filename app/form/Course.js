Ext.define('backapp.form.Course', {
    xtype: 'formCourse',
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.Toggle',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio'
    ],
    config: {
        iconCls: 'comment',
        items: [
            
            {
                xtype: 'fieldset',
                instructions: '',
                defaults: {
                    labelWidth: '0%'
                },
                items: [
                    {
                        xtype         : 'textareafield',
                        name : 'Commentaire',
                        label: 'Commentaire',
                        cls: 'ypm-input-pink',
                        placeHolder   : 'Laissez un commentaire ...',
                        maxRows: 4,
                        autoCapitalize: false,
                        required      : 1,
                        clearIcon     : false
                    },
                    {
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'enregistrercomm',
                        text: 'Enregistrer'
                    },
                    {
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'back',
                        text: 'Retour à l\'historique'
                    }
                ]
            },
            
        ]
    },
    setRecord: function (record){
        console.log('formcourse', record)
        if (this.down('[xtype=textareafield]'))
            this.down('[xtype=textareafield]').setValue(record.get('valet_comment'));
    }
});
