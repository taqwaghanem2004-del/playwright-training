# Purchase Order Test Plan (Dynamics 365 F&O)

Author: Taqwa Ghanem

> Actual result (all test cases): Not executed. No authorized D365 F&O environment was available. Expected results are based on general D365 F&O procurement behavior and the course material (Module 8, Procure-to-Pay).

## Scope

Procure-to-Pay: create and confirm a purchase order, product receipt and inventory update, vendor invoice posting.

## Expected status and data changes per stage

| Stage | Status | Data change |
|---|---|---|
| Create | Open order, Draft | New PO, no inventory or financial impact |
| Confirm | Confirmed | Order sent to the vendor, no inventory or financial impact yet |
| Product receipt | Received | On-hand inventory increases |
| Vendor invoice | Invoiced | Ledger voucher created, vendor balance increases |

## Test cases

### TC-PO-01: Verify that a purchase order can be created with valid data

- **Preconditions and data:** Active vendor, released product, warehouse. Quantity 10, unit price 5.00.
- **Steps:**
  1. Open New purchase order.
  2. Select the vendor.
  3. Add a line (item, quantity, price).
  4. Save.
- **Expected result:** PO number is generated, total is 50.00, status is Open order, approval status is Draft.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-02: Verify that the system prevents saving a purchase order without a vendor

- **Preconditions and data:** Same environment. Vendor field left empty.
- **Steps:**
  1. Open New purchase order.
  2. Leave the vendor empty.
  3. Add a line.
  4. Save.
- **Expected result:** Error message is shown, no PO number is generated.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-03: Verify that vendor information defaults correctly into the purchase order

- **Preconditions and data:** Vendor with a defined currency, payment terms and address.
- **Steps:**
  1. Select the vendor.
  2. Observe the defaulted fields.
- **Expected result:** Currency, payment terms and address match the vendor record.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-04: Verify that the system rejects zero or negative quantity on a purchase order line

- **Preconditions and data:** Quantity values 0 and -5.
- **Steps:**
  1. Enter 0 on the line and save.
  2. Enter -5 on the line and save.
- **Expected result:** Validation message is shown and the line is not saved (or the documented system rule is observed and recorded).
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-05: Verify that a purchase order can be confirmed

- **Preconditions and data:** Saved PO with at least one line (from TC-PO-01).
- **Steps:**
  1. Open the PO.
  2. Purchase tab, then Confirm.
- **Expected result:** Approval status changes from Draft to Confirmed, document status shows Purchase order.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-06: Verify that a purchase order without lines cannot be confirmed

- **Preconditions and data:** Saved PO header with no lines.
- **Steps:**
  1. Open the PO.
  2. Try to Confirm.
- **Expected result:** Error message is shown and the status stays Draft.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-07: Verify that a full product receipt updates the order status

- **Preconditions and data:** Confirmed PO, quantity 10.
- **Steps:**
  1. Post a product receipt for quantity 10 with a packing slip number.
- **Expected result:** Product receipt document is created, PO line status is Received.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-08: Verify that a partial product receipt leaves the remaining quantity open

- **Preconditions and data:** Confirmed PO, quantity 10.
- **Steps:**
  1. Post a product receipt for quantity 6 only.
- **Expected result:** Received = 6, remaining = 4, the line stays open.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-09: Verify that on-hand inventory increases after product receipt

- **Preconditions and data:** Record on-hand quantity before receipt (for example 20).
- **Steps:**
  1. Post a receipt for 10.
  2. Open the on-hand inventory list for the item and warehouse.
- **Expected result:** Physical inventory is 30 (increase of 10) in the correct warehouse.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-10: Verify that a vendor invoice can be posted after a full receipt

- **Preconditions and data:** Fully received PO. Invoice amount 50.00 matches the PO.
- **Steps:**
  1. Create the vendor invoice from the PO.
  2. Verify amount and tax.
  3. Post.
- **Expected result:** Invoice is posted, PO status is Invoiced, vendor balance increases by 50.00.
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-11: Verify that the system blocks invoicing for more than the received quantity

- **Preconditions and data:** Received 6 of 10 (from TC-PO-08).
- **Steps:**
  1. Try to post an invoice for quantity 10.
- **Expected result:** Matching error is shown and the invoice is not posted (depends on the company's matching policy).
- **Actual result:** Not executed (no authorized D365 F&O environment).

### TC-PO-12: Verify the financial posting created by the vendor invoice

- **Preconditions and data:** Posted vendor invoice (from TC-PO-10).
- **Steps:**
  1. Open the voucher and ledger entries of the posted invoice.
- **Expected result:** Correct accounts, amount, currency and tax. Posting status is Posted.
- **Actual result:** Not executed (no authorized D365 F&O environment).

## Needs validation in a real environment

Menu names, approval states and the matching policy depend on the organization's configuration and must be confirmed in a real D365 F&O environment.
