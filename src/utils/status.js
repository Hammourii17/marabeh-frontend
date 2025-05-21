export const STATUS = {
  NOTIFY_BORROWER: 'Notify borrower',
  BORROWER_OTP: 'Borrower OTP',
  BORROWER_OTP_SIGNED: 'Borrower OTP signed',
  WAITING_UNDERWRITER_REVIEW: 'Waiting underwriter review',
  APPROVED_BY_UNDERWRITER: 'Approved by underwriter',
  REJECTED_BY_BACKOFFICE: 'Rejected by backoffice',
  UNDER_REVISION: 'Under revision',
  SEND_FINAL_OFFER: 'Send final offer',
  APPROVED_BY_BORROWER: 'Approved by borrower',
  CANCELLED_BY_BORROWER: 'Cancelled by borrower',

  // CampaignStatusChoices
  CROWDFUNDING_AGREEMENT_OTP: 'Crowdfunding agreement OTP',
  CROWDFUNDING_AGREEMENT_SIGNED: 'Borrower signed crowdfunding agreement',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  ACTIVE: 'Active',
  COLLECTED: 'Collected',
  PARTIALLY_COLLECTED: 'Partially Collected',
  LOAN_SIGNED: 'Loan Signed',
  SETTLE: 'Settle',

  // GuarantorStatus
  CREATED: 'Added to organization',
  SENT_NOTIFY: 'Notification is sent',
  REGISTERED: 'Registered',

  // LoanChoices
  CREATING_DEAL: 'Creating deal',
  CERTIFICATE_OF_PURCHASE: 'Certificate of purchase',
  ASSIGN_DEAL: 'Assign deal',
  SIGNING_AGREEMENT_OTP: 'Borrower signing of the agreement with OTP',
  SIGNING_AGREEMENT_SIGNED: 'Borrower signed the agreement',

  // RepaymentPeriodChoices
  MONTH: 'Month',
  QUARTER: 'Quarter',
  SEMI_ANNUAL: 'Semi-annual',
  ANNUAL: 'Annual',

  // CollateralTypes
  REAL_ESTATE: 'Real estate',
  ASSETS: 'Assets',
  VEHICLES: 'Vehicles',
  BANK_GUARANTEE_LETTER: 'Bank Letter of Guarantee',
  ASSIGNMENT_OF_PROCEEDS: 'Assignment of Proceeds',

  // CollateralStatusTypes
  NEW: 'New',
  EVALUATED: 'Evaluated',
  ASSIGNED: 'Assigned',
  RELEASED_BACK: 'Released back',
  CANCELLED: 'Cancelled',

  // CollateralGuaranteeTypes
  PERFORMANCE_GUARANTEE: 'Performance Guarantee',
  FINANCIAL_GUARANTEE: 'Financial Guarantee',

  // CollateralVehicleTypes
  SEDAN: 'Sedan',
  SUV: 'SUV',
  TRUCK: 'Truck',
  MOTORCYCLE: 'Motorcycle',

  // CollateralConditionTypes
  NEW: 'New',
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  FAIR: 'Fair',

  // CollateralOwnershipTypes
  OWNED: 'Owned',
  LEASED: 'Leased',

  // CollateralDepreciationRiskTypes
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',

  // CollateralAssetTypes
  EQUIPMENT: 'Equipment',
  MACHINERY: 'Machinery',

  // CollateralVehicleInspectionStatusTypes
  PENDING: 'Pending',
  APPROVED: 'Approved',
  CONDITIONALLY_APPROVED: 'Conditionally Approved',
  NEEDS_REPAIR: 'Needs Repair',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',

  // CollateralVehiclePrimaryUseTypes
  PERSONAL: 'Personal',
  COMMERCIAL: 'Commercial',

  // PaymentScheduleStatusChoices
  PENDING: 'Pending',
  OVERDUE: 'Overdue',
  PAID: 'Paid',
  CANCELLED: 'Cancelled',

  // PaymentStatusChoices
  PENDING: 'Pending',
  PAID: 'Paid',
  CANCELLED: 'Cancelled',

  // OrganizationStatusChoices
  REVIEW: 'Review',
  INITIAL_CHECK: 'Initial check',
  KYB_CHECK: 'KYB Check',
  KYB_OTP: 'KYB Otp',
  KYB_COMPLETE: 'KYB Complete',
  INITIAL_DATA_GATHERING: 'Initial Data Gathering',
  FINISH_DATA_GATHERING: 'Data gathering was finished',
  COMPLETED: 'Completed',

  // IdentificationType
  NATIONAL_ID: 'National ID',
  RESIDENT_ID: 'Resident ID',
  PASSPORT: 'Passport',
  GCC_ID: 'GCC ID',
  ENDOWMENT_DEED_NO: 'Endowment Deed No',
  LICENSE_NO: 'License No',
  CR_NATIONAL_ID: 'CR National ID',
  FOREIGN_CR_NO: 'Foreign CR No',
  GOV_NATIONAL_ID: 'Gov National ID',

  // UserRolesChoices
  DELEGATOR_INVESTOR: 'Delegator institutional investor',
  DELEGATOR_BORROWER: 'Delegator institutional borrower',
  INDIVIDUAL_INVESTOR: 'Individual investor',
  INDIVIDUAL_BORROWER: 'Individual borrower',
  SUPERVISOR: 'Supervisor',
  RM_BORROWER: 'Relationship manager of borrower',
  RM_INVESTOR: 'Relationship manager of investor',
  MANAGER: 'Manager',
  COLLECTION_AGENT: 'Collection Agent',
  LEGAL_AGENT: 'Legal Agent',
  COLLECTION_SUPERVISOR: 'Collection Supervisor',
  COLLECTION_MANAGER: 'Collection Manager',
  UNDERWRITER: 'Underwriter',
  CREDIT_MANAGER: 'Credit Manager',
  OPERATIONS_OFFICER: 'Operations Officer',
  OPERATIONS_SUPERVISOR: 'Operations Supervisor',
  OPERATIONS_MANAGER: 'Operations Manager',
}
