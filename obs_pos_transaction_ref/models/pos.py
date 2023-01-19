from odoo import fields, models,tools,api

class pos_config(models.Model):
    _inherit = 'pos.config' 

    allow_payment_ref = fields.Boolean('Allow Transanction/Payment Reference in POS',default=True)



class PosPaymentMethod(models.Model):
    _inherit = 'pos.payment.method'

    hide_pay_ref = fields.Boolean('Payment Ref',)

class PosPayment(models.Model):
    _inherit = 'pos.payment' 

    transaction_reference = fields.Char("POS Payemnt Reference")
    value = fields.Char("Value")
    bank_name = fields.Char("Bank Name")
    data = fields.Char("Data")



class PosOrder(models.Model):
    _inherit = "pos.order"

    def _payment_fields(self, order, ui_paymentline):
        result = super(PosOrder, self)._payment_fields(order, ui_paymentline)
        if 'transaction_reference' in ui_paymentline:
            result['transaction_reference'] = ui_paymentline['transaction_reference']
        if 'value' in ui_paymentline:
            result['value'] = ui_paymentline['value']
        if 'bank_name' in ui_paymentline:
            result['bank_name'] = ui_paymentline['bank_name']
        if 'data' in ui_paymentline:
            result['data'] = ui_paymentline['data']

        return result


