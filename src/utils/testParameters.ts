// Test user credentials
export const testUsers = {
  propertyManager: {
    email: 'manager@test.com',
    password: 'test123',
  },
  owner: {
    email: 'owner@test.com',
    password: 'test123',
  },
  tenant: {
    email: 'tenant@test.com',
    password: 'test123',
  },
};

// Test payment methods
export const testPaymentMethods = {
  creditCards: {
    visa: {
      success: '4111 1111 1111 1111',
      decline: '4000 0000 0000 0002',
      cvvFailure: '4000 0000 0000 0101',
      expiredCard: '4000 0000 0000 0069',
      authRequired: '4000 0025 0000 3155',
    },
    mastercard: {
      success: '5555 5555 5555 4444',
      decline: '5105 1051 0510 5100',
    },
  },
  testAmounts: {
    success: 100.00,
    decline: 50.00,
    error: 99.99,
  },
};

// Test maintenance requests
export const testMaintenanceRequests = {
  urgent: {
    title: 'Water Leak',
    description: 'Urgent water leak in kitchen',
    priority: 'high',
    category: 'plumbing',
  },
  routine: {
    title: 'Light Bulb Replacement',
    description: 'Living room light bulb needs replacement',
    priority: 'low',
    category: 'electrical',
  },
};

// Test properties
export const testProperties = {
  residential: {
    name: 'Test Apartment Complex',
    address: '123 Test Street',
    units: 10,
    occupancyRate: 0.8,
  },
  commercial: {
    name: 'Test Office Building',
    address: '456 Test Avenue',
    units: 5,
    occupancyRate: 0.9,
  },
};

// Test documents
export const testDocuments = {
  lease: {
    name: 'Test Lease Agreement',
    type: 'lease',
    size: '250KB',
  },
  maintenance: {
    name: 'Maintenance Report',
    type: 'report',
    size: '150KB',
  },
};

// Test notifications
export const testNotifications = {
  payment: {
    title: 'Payment Received',
    message: 'Rent payment received for Unit 101',
    type: 'success',
  },
  maintenance: {
    title: 'New Maintenance Request',
    message: 'Urgent maintenance request submitted for Unit 102',
    type: 'warning',
  },
};