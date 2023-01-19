{
    'name': 'POS Payment Reference | POS Transaction Reference in POS Interface',
    'summary': 'POS Transaction/Payment Reference in POS Interface',
    'description': """POS Transaction/Payment Reference in POS Interface""",
    'version': '15.1.1.2',
    'category': 'Point of Sale',
    'sequence': 1,
    "author" : "Odoobridge Solution",
    "email": 'support@odoobridge.com',
    "license": 'OPL-1',
    'price': 10,
    'currency': 'EUR',
    'depends': ['point_of_sale'],
    'data': [
        'views/views.xml',
        # 'views/templates.xml'
    ],
    'demo': [],
    'images': ['static/description/main_screenshot.png'],
    'installable': True,
    'auto_install': False,
    'application': True,
    'assets': {
        'point_of_sale.assets': [
            'obs_pos_transaction_ref/static/src/js/pos.js',
            'obs_pos_transaction_ref/static/src/js/PaymentScreen.js',
            'obs_pos_transaction_ref/static/src/js/PaymentRefData.js',
        ],
        'web.assets_qweb': [
            'obs_pos_transaction_ref/static/src/xml/pos.xml',
        ],        
    },    
}
