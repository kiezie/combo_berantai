Ext.define('comboBerantai', {

    extend: 'Ext.form.Panel',
    alias : 'widget.panelComboBerantai',

    layout: 'anchor',

    border: false,

    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90,
        allowBlank: false,
        anchor: '100%'
    },

    initComponent: function() {
        var me = this;

        var store_propinsi = Ext.create('jsonDataStore', {
            pageSize: 10,
            fields: ['ID', 'PROPINSI'],
            url: 'store/propinsiStore.php',
            autoLoad: true
        });

        var store_kabupaten = Ext.create('jsonDataStore', {
            pageSize: 10,
            fields: ['ID', 'KABUPATEN'],
            url: 'store/kabupatenStore.php'
        });

        var store_kecamatan = Ext.create('jsonDataStore', {
            pageSize: 10,
            fields: ['ID', 'KECAMATAN'],
            url: 'store/kecamatanStore.php'
        });

        Ext.applyIf(me, {
            items: [{
                xtype: 'combobox',
                name: 'propinsi',
                fieldLabel: 'Propinsi',
                store: store_propinsi,
                valueField: 'ID',
                displayField: 'PROPINSI',
                queryMode: 'remote',
                typeAhead: true,
                queryDelay: 100,
                minChars:0,
                triggerAction:'all',
                emptyText: 'Pilih propinsi',
                listConfig: {
                    loadingText: 'Loading...',
                    getInnerTpl: function() {
                        return '{PROPINSI}';
                    }
                },
                pageSize: store_propinsi.pageSize,
                listeners: {
                    select: function(c, record) {
                        var combo_kabupaten = me.down('[name=kabupaten]');
                        var combo_kecamatan = me.down('[name=kecamatan]');

                        combo_kabupaten.reset();
                        combo_kabupaten.getStore().getProxy().extraParams['propinsi_id']=c.getValue();
                        combo_kabupaten.getStore().loadPage(1);

                        combo_kecamatan.reset();
                        combo_kecamatan.getStore().removeAll();
                    }
                }
            }, {
                xtype: 'combobox',
                name: 'kabupaten',
                fieldLabel: 'Kabupaten',
                store: store_kabupaten,
                valueField: 'ID',
                displayField: 'KABUPATEN',
                queryMode: 'remote',
                typeAhead: true,
                queryDelay: 100,
                minChars:0,
                triggerAction:'all',
                emptyText: 'Pilih kabupaten',
                listConfig: {
                    loadingText: 'Loading...',
                    getInnerTpl: function() {
                        return '{KABUPATEN}';
                    }
                },
                pageSize: store_kabupaten.pageSize,
                listeners: {
                    select: function(c, record) {
                        var combo_kecamatan = me.down('[name=kecamatan]');

                        combo_kecamatan.reset();
                        combo_kecamatan.getStore().getProxy().extraParams['propinsi_id']=me.down('[name=propinsi]').getValue();
                        combo_kecamatan.getStore().getProxy().extraParams['kabupaten_id']=c.getValue();

                        combo_kecamatan.getStore().loadPage(1);

                    }
                }
            }, {
                xtype: 'combobox',
                name: 'kecamatan',
                fieldLabel: 'Kecamatan',
                store: store_kecamatan,
                valueField: 'ID',
                displayField: 'KECAMATAN',
                queryMode: 'remote',
                typeAhead: true,
                queryDelay: 100,
                minChars:0,
                triggerAction:'all',
                emptyText: 'Pilih kecamatan',
                listConfig: {
                    loadingText: 'Loading...',
                    getInnerTpl: function() {
                        return '{KECAMATAN}';
                    }
                },
                pageSize: store_kecamatan.pageSize
            }]
        });

        this.callParent(arguments);
    }

});