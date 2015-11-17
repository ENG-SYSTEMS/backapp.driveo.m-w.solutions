Ext.define('backapp.model.Lieu', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'name',      type: 'string'},
            {name: 'description',      type: 'string'},
            {name: 'isExclusive',      type: 'boolean'},
            {name: 'type',      type: 'string'},
            {name: 'typeIcon',      type: 'string'},
            {name: 'created_at',      type: 'date'},
            {name: 'deleted_at',      type: 'date'},
            {name: 'postalCode',      type: 'string'},
            {name: 'city',      type: 'string'}
        ]

    }
});
