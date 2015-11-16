export default {
  'globalNamespace': 'STRIPE',
  'config': [
    {
      namespace: 'CUSTOMERS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'BALANCE',
      actions: ['RETRIEVE']
    },
    {
      namespace: 'TRANSACTIONS',
      actions: ['RETRIEVE', 'LIST']
    },
    {
      namespace: 'EVENTS',
      actions: ['RETRIEVE', 'LIST']
    },
    {
      namespace: 'CHARGES',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'COUPONS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'INVOICES',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'INVOICEITEMS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'PLANS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'SUBSCRIPTIONS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'PRODUCTS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'SKUS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'ORDERS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'DELETE', 'LIST']
    },
    {
      namespace: 'TRANSFERS',
      actions: ['CREATE', 'RETRIEVE', 'UPDATE', 'LIST']
    }
  ]
};
