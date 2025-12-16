-- 100 Test Transactions for company_id: 4627699e-5510-4ded-aede-423443f2644a
-- Run this in Supabase SQL Editor

INSERT INTO raw_transactions (id, company_id, date, amount, description, source, txn_id) VALUES
-- January 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-03', 1250.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-01-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-05', 890.50, 'Client Payment - Invoice #1001', 'PnL-Deposit', 'TXN-2025-01-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-08', 2100.00, 'Consulting Services', 'PnL-Deposit', 'TXN-2025-01-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-12', 450.75, 'Product Sales', 'PnL-Deposit', 'TXN-2025-01-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-15', 3200.00, 'Project Milestone Payment', 'PnL-Deposit', 'TXN-2025-01-005'),
-- January 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-02', -150.00, 'Google Ads', 'PnL-Expense', 'TXN-2025-01-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-06', -89.99, 'Software Subscription - Zoom', 'PnL-Expense', 'TXN-2025-01-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-10', -500.00, 'Virtual Assistant - Upwork', 'PnL-Expense', 'TXN-2025-01-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-14', -75.50, 'Office Supplies', 'PnL-Expense', 'TXN-2025-01-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-01-18', -1200.00, 'Inventory Purchase', 'PnL-Expense', 'TXN-2025-01-010'),

-- February 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-02', 1875.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-02-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-07', 2450.00, 'Client Payment - Invoice #1002', 'PnL-Deposit', 'TXN-2025-02-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-11', 980.25, 'Product Sales', 'PnL-Deposit', 'TXN-2025-02-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-15', 5500.00, 'Large Project Payment', 'PnL-Deposit', 'TXN-2025-02-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-20', 750.00, 'Consulting Fee', 'PnL-Deposit', 'TXN-2025-02-005'),
-- February 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-01', -200.00, 'Facebook Ads', 'PnL-Expense', 'TXN-2025-02-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-05', -149.00, 'QuickBooks Subscription', 'PnL-Expense', 'TXN-2025-02-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-09', -425.00, 'Bookkeeping Services', 'PnL-Expense', 'TXN-2025-02-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-14', -850.00, 'Equipment Purchase', 'PnL-Expense', 'TXN-2025-02-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-02-22', -65.00, 'Domain Renewal', 'PnL-Expense', 'TXN-2025-02-010'),

-- March 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-03', 3200.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-03-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-08', 1650.00, 'Client Payment - Invoice #1003', 'PnL-Deposit', 'TXN-2025-03-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-12', 4800.00, 'Project Completion', 'PnL-Deposit', 'TXN-2025-03-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-18', 920.00, 'Affiliate Commission', 'PnL-Deposit', 'TXN-2025-03-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-25', 2100.00, 'Recurring Service Fee', 'PnL-Deposit', 'TXN-2025-03-005'),
-- March 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-02', -175.00, 'Google Ads', 'PnL-Expense', 'TXN-2025-03-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-07', -299.00, 'Asana Subscription', 'PnL-Expense', 'TXN-2025-03-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-11', -1500.00, 'Contractor Payment', 'PnL-Expense', 'TXN-2025-03-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-16', -45.00, 'Shipping Supplies', 'PnL-Expense', 'TXN-2025-03-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-03-22', -680.00, 'Insurance Premium', 'PnL-Expense', 'TXN-2025-03-010'),

-- April 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-01', 2750.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-04-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-06', 1890.00, 'Consulting Services', 'PnL-Deposit', 'TXN-2025-04-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-10', 6200.00, 'Enterprise Client', 'PnL-Deposit', 'TXN-2025-04-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-15', 1100.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-04-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-22', 3400.00, 'Project Milestone', 'PnL-Deposit', 'TXN-2025-04-005'),
-- April 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-03', -250.00, 'Meta Advertising', 'PnL-Expense', 'TXN-2025-04-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-08', -89.00, 'Shopify Fees', 'PnL-Expense', 'TXN-2025-04-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-12', -750.00, 'Virtual Assistant', 'PnL-Expense', 'TXN-2025-04-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-18', -1800.00, 'Inventory Restock', 'PnL-Expense', 'TXN-2025-04-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-04-25', -120.00, 'Software Tools', 'PnL-Expense', 'TXN-2025-04-010'),

-- May 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-02', 4100.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-05-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-07', 2200.00, 'Client Payment', 'PnL-Deposit', 'TXN-2025-05-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-13', 1560.00, 'Consulting Fee', 'PnL-Deposit', 'TXN-2025-05-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-19', 7500.00, 'Major Project', 'PnL-Deposit', 'TXN-2025-05-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-26', 890.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-05-005'),
-- May 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-01', -300.00, 'Google Ads', 'PnL-Expense', 'TXN-2025-05-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-05', -450.00, 'Accounting Services', 'PnL-Expense', 'TXN-2025-05-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-10', -2200.00, 'Manufacturer Payment', 'PnL-Expense', 'TXN-2025-05-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-16', -85.00, 'Hosting Fees', 'PnL-Expense', 'TXN-2025-05-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-05-23', -550.00, 'Marketing Materials', 'PnL-Expense', 'TXN-2025-05-010'),

-- June 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-03', 3800.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-06-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-09', 2650.00, 'Consulting Services', 'PnL-Deposit', 'TXN-2025-06-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-14', 1200.00, 'Affiliate Income', 'PnL-Deposit', 'TXN-2025-06-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-20', 4500.00, 'Project Payment', 'PnL-Deposit', 'TXN-2025-06-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-27', 1780.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-06-005'),
-- June 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-02', -180.00, 'Facebook Ads', 'PnL-Expense', 'TXN-2025-06-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-06', -99.00, 'Zoom Subscription', 'PnL-Expense', 'TXN-2025-06-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-11', -920.00, 'Contractor Payment', 'PnL-Expense', 'TXN-2025-06-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-18', -1650.00, 'Inventory Purchase', 'PnL-Expense', 'TXN-2025-06-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-06-25', -75.00, 'Shipping Costs', 'PnL-Expense', 'TXN-2025-06-010'),

-- July 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-01', 5200.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-07-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-08', 3100.00, 'Client Payment', 'PnL-Deposit', 'TXN-2025-07-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-14', 1890.00, 'Consulting Fee', 'PnL-Deposit', 'TXN-2025-07-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-21', 8500.00, 'Enterprise Contract', 'PnL-Deposit', 'TXN-2025-07-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-28', 2200.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-07-005'),
-- July 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-03', -350.00, 'Google Ads', 'PnL-Expense', 'TXN-2025-07-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-07', -149.00, 'QuickBooks Fee', 'PnL-Expense', 'TXN-2025-07-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-12', -800.00, 'Virtual Assistant', 'PnL-Expense', 'TXN-2025-07-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-19', -2500.00, 'Manufacturer Order', 'PnL-Expense', 'TXN-2025-07-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-07-26', -200.00, 'Marketing Tools', 'PnL-Expense', 'TXN-2025-07-010'),

-- August 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-04', 4600.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-08-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-11', 2800.00, 'Consulting Services', 'PnL-Deposit', 'TXN-2025-08-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-18', 1450.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-08-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-22', 6800.00, 'Project Completion', 'PnL-Deposit', 'TXN-2025-08-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-29', 1900.00, 'Recurring Revenue', 'PnL-Deposit', 'TXN-2025-08-005'),
-- August 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-02', -275.00, 'Meta Ads', 'PnL-Expense', 'TXN-2025-08-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-08', -120.00, 'Software Subscriptions', 'PnL-Expense', 'TXN-2025-08-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-15', -550.00, 'Accounting Services', 'PnL-Expense', 'TXN-2025-08-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-21', -1800.00, 'Inventory Restock', 'PnL-Expense', 'TXN-2025-08-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-08-28', -95.00, 'Domain & Hosting', 'PnL-Expense', 'TXN-2025-08-010'),

-- September 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-02', 5500.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-09-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-09', 3200.00, 'Client Payment', 'PnL-Deposit', 'TXN-2025-09-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-15', 2100.00, 'Consulting Fee', 'PnL-Deposit', 'TXN-2025-09-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-22', 4200.00, 'Project Milestone', 'PnL-Deposit', 'TXN-2025-09-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-28', 1650.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-09-005'),
-- September 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-01', -400.00, 'Google Ads', 'PnL-Expense', 'TXN-2025-09-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-06', -189.00, 'CRM Software', 'PnL-Expense', 'TXN-2025-09-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-12', -1100.00, 'Contractor Payment', 'PnL-Expense', 'TXN-2025-09-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-19', -2200.00, 'Manufacturer Payment', 'PnL-Expense', 'TXN-2025-09-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-09-25', -150.00, 'Office Supplies', 'PnL-Expense', 'TXN-2025-09-010'),

-- October 2025 - Income
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-03', 6200.00, 'Shopify Sales Transfer', 'PnL-Deposit', 'TXN-2025-10-001'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-10', 2900.00, 'Consulting Services', 'PnL-Deposit', 'TXN-2025-10-002'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-16', 1800.00, 'Product Sales', 'PnL-Deposit', 'TXN-2025-10-003'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-23', 9500.00, 'Enterprise Deal', 'PnL-Deposit', 'TXN-2025-10-004'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-30', 2400.00, 'Recurring Service', 'PnL-Deposit', 'TXN-2025-10-005'),
-- October 2025 - Expenses
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-02', -320.00, 'Facebook Ads', 'PnL-Expense', 'TXN-2025-10-006'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-08', -149.00, 'QuickBooks', 'PnL-Expense', 'TXN-2025-10-007'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-14', -850.00, 'Virtual Assistant', 'PnL-Expense', 'TXN-2025-10-008'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-21', -2800.00, 'Inventory Order', 'PnL-Expense', 'TXN-2025-10-009'),
(gen_random_uuid(), '4627699e-5510-4ded-aede-423443f2644a', '2025-10-28', -450.00, 'Insurance', 'PnL-Expense', 'TXN-2025-10-010');

-- Verify count
SELECT COUNT(*) as total_transactions FROM raw_transactions WHERE company_id = '4627699e-5510-4ded-aede-423443f2644a';

