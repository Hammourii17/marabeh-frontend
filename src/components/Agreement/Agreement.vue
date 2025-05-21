<template>
  <div class="agreement">
    <div class="flex items-center justify-between mb-8 mt-8">
      <h1 class="text-2xl font-bold text-gray-800">{{ content.title }}</h1>
    </div>
    <n-scrollbar
      class="terms-text-container"
      style="max-height: 600px"
    >
      <div
        class="terms-text"
        v-html="content.html"
      ></div>
    </n-scrollbar>

    <n-form
      ref="formRef"
      :model="formValue"
      class="flex flex-col flex-1"
    >
      <div class="agreement-buttons">
        <n-form-item path="termsOfUse">
          <n-checkbox
            v-model:checked="formValue.isChecked"
            class="w-full"
            size="large"
          >
            {{ props.checkboxText }}
          </n-checkbox>
        </n-form-item>
        <n-button
          :disabled="!formValue.isChecked"
          class="w-[43%] border rounded-[12px]"
          size="large"
          type="success"
          @click="emit('accept')"
        >
          {{ props.buttonText }}
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { NButton, NCheckbox, NForm, NFormItem, NScrollbar } from 'naive-ui'
  import { ref, computed, defineProps } from 'vue'
  import { getHijriDateAndDay, formatDateToDDMMYYYY } from '@/utils/date'

  const props = defineProps({
    crowdFoundingData: {
      type: Object,
      default: null,
    },
    guarantorData: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'signup',
    },
    checkboxText: {
      type: String,
      default: 'I agree',
    },
    verificationText: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'Agree',
    },
  })

  const emit = defineEmits(['accept'])
  const formRef = ref(null)
  const formValue = ref({
    isChecked: false,
    termsOfUse: false,
  })

  const content = computed(() => {
    const companyName = props.crowdFoundingData?.offer?.organization ?? ''
    const crNumber = props.crowdFoundingData?.user?.organization?.cr_number ?? ''
    const address =
      props.crowdFoundingData?.user?.organization?.full_info_commercial_registration?.address
        ?.general?.address ?? ''

    const dateCreate =
      props.type === 'draftOffer'
        ? props.crowdFoundingData?.offer
        : props.crowdFoundingData?.campaing

    const hjriData = dateCreate?.created_at ? getHijriDateAndDay(dateCreate.created_at) : ''
    const date = dateCreate?.created_at ? formatDateToDDMMYYYY(dateCreate?.created_at) : ''

    const guarantorFields = {
      guarantorName: props.guarantorData?.guarantor?.full_name,
      type: props.guarantorData?.guarantor?.role_type,
      id: props.guarantorData?.guarantor?.id,
      phoneNumber: props.guarantorData?.guarantor?.phone_number,
      borrowerName: props.guarantorData?.offer?.organization_data?.name,
      borrowerCR: props.guarantorData?.offer?.organization_data?.cr_number,
      borrowerCompanyPhone: props.guarantorData?.offer?.organization_data?.phone,
      financeAmount: props.guarantorData?.offer?.finance_amount,
      tenure: props.guarantorData?.offer?.tenure,
      period: props.guarantorData?.offer?.period,
    }

    const items = {
      signupInvestor: {
        title: 'Terms of Use signup Investor',
        html: `
          <div class="container mx-auto  space-y-8">
            <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 1: Introduction and General Information</h1>
                <h2 class="text-lg font-semibold">Introduction</h2>
                <p>
                  Tamathal Solutions operates as an electronic platform licensed by the Saudi Central Bank to connect small
                  and medium-sized business owners with investors through Sharia-compliant crowdfunding. The platform
                  provides direct financing services, and investing through it is considered high-risk, potentially
                  involving loss of capital, as well as financial and technical risks. The investor acknowledges their legal
                  capacity to make investment decisions under the laws of Saudi Arabia.
                </p>
              </section>

              <!-- Page 2 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 2: Investor Data Table</h1>
              </section>

              <!-- Page 3 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 3: Definitions and Interpretation</h1>
                <h2 class="text-lg font-semibold">Definitions</h2>
                <p><strong>Contract:</strong> Refers to this agreement and its signed annexes.</p>
                <p><strong>Anti-Money Laundering Law:</strong> The law issued under Royal Decree No. (M/20) and its
                  amendments.</p>
                <p><strong>Debt-based Crowdfunding:</strong> Collecting funds from participants through a digital platform
                  granted to the institutional beneficiary under a financing contract.</p>
                <p><strong>Applicable Laws:</strong> Includes any law related to this contract within Saudi Arabia.</p>
                <p><strong>Beneficiary:</strong> Small or medium enterprises registered in the kingdom seeking funding via
                  the platform.</p>
                <p><strong>Working Day:</strong> Any day except Friday, Saturday, and public holidays in the kingdom.</p>
                <p><strong>Confidential Information:</strong> Includes all information disclosed by one party to another
                  related to the terms of this agreement.</p>
              </section>

              <!-- Page 4 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 4: Key Definitions Table</h1>
              </section>

              <!-- Page 5 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 5: Scope of the Agreement</h1>
                <h2 class="text-lg font-semibold">Scope of the Agreement</h2>
                <p>
                  Tamathal Solutions is an electronic platform licensed by the Saudi Central Bank, managed to connect small
                  and medium-sized business owners with investors via debt-based crowdfunding. The investor agrees to invest
                  in opportunities available on the platform based on their investment decision. Once the offer is fully
                  subscribed, the opportunity is closed, and the funding is accepted by the beneficiary, with the investor
                  receiving payments and profit margins according to the repayment schedule unless the beneficiary defaults
                  or fails to make payments.
                </p>
              </section>

              <!-- Page 6 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 6: Terminologies Table</h1>
              </section>

              <!-- Page 7 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 7: Legal Information</h1>
                <h2 class="text-lg font-semibold">Legal Information</h2>
                <p>The company is licensed by the Saudi Central Bank to provide debt-based crowdfunding services.</p>
                <p>The company operates in accordance with Sharia-compliant rules and standards.</p>
                <p>The company conducts a thorough review of financing requests and evaluates associated risks.</p>
                <p>The company bears no responsibility for future changes or the expiration of guarantees provided by the
                  beneficiary after funding completion.</p>
              </section>

              <!-- Page 8 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 8: Registration and "Know Your Customer" Principle</h1>
                <h2 class="text-lg font-semibold">Registration</h2>
                <p>The investor registers on the platform and submits all required documents.</p>
                <p>The investor acknowledges that all submitted documents are valid and lawful under the laws of Saudi
                  Arabia.</p>
                <p>The company reviews the documents and decides on granting the investor access to the platform.</p>
                <p>The investor bears responsibility for securing their account and preventing unauthorized access.</p>

                <h2 class="text-lg font-semibold">"Know Your Customer" Principle</h2>
                <p>
                  The company adheres to verifying the investor's identity through applicable regulations, including
                  anti-money laundering measures.
                </p>
                <p>
                  The investor commits to periodically updating identity and national address details and notifying the
                  company of any changes immediately.
                </p>
                <p>
                  The company may review and change the investor classification based on updated data provided.
                </p>
              </section>

              <!-- Page 9 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 9: Registration Table</h1>
              </section>

              <!-- Page 10 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 10: Investment Risks</h1>
                <h2 class="text-lg font-semibold">Investment Risks</h2>
                <p>
                  The investor understands that investing in debt-based crowdfunding is high-risk and may result in the
                  total loss of capital.
                </p>
                <p>
                  The investor relies on their own judgment or financial advisors when making investment decisions.
                </p>
                <p>
                  Investments on the platform may not be easily liquidated during emergencies.
                </p>
                <p>
                  The investor assumes all financial and technical risks without any liability on the company.
                </p>
              </section>

              <!-- Page 11 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 11: Fees and Payments</h1>
                <h2 class="text-lg font-semibold">Fees and Payments</h2>
                <p>
                  All fees owed to the company are deducted from the investor's wallet on the platform, as per the stated
                  fee schedule.
                </p>
                <p>
                  The company reserves the right to amend the fee and commission schedule based on instructions from the
                  Saudi Central Bank, notifying the investor of changes.
                </p>
                <p>
                  If the investor requests a withdrawal, funds are transferred to the bank account registered with the
                  company.
                </p>
                <p>
                  The investor bears full responsibility in case of incorrect banking details.
                </p>

                <h2 class="text-lg font-semibold">Additional Conditions</h2>
                <p>
                  In case of incorrect transfers due to a technical error, the investor must promptly return the amount upon
                  the company's notification.
                </p>
                <p>
                  Accounts are suspended if there is insufficient balance to cover the due fees.
                </p>
                <p>
                  The company reserves the right to deduct any due fees directly from the investor's electronic wallet.
                </p>
              </section>

              <!-- Page 12 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 12: Fee Schedule</h1>
              </section>

              <!-- Page 13 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 13: Custody and Clearing</h1>
                <h2 class="text-lg font-semibold">Custody and Clearing</h2>
                <p>
                  The company, as the platform operator, opens an electronic wallet in the investor's name and deposits
                  investment-related funds into it.
                </p>
                <p>
                  The investor can deposit and withdraw available cash funds from their electronic wallet according to the
                  company's internal policies.
                </p>
                <p>
                  Returns or profits from the investment are deposited in a joint account with the partner bank.
                </p>
                <p>
                  The custodian reserves the right to reject any deposit or withdrawal that violates applicable laws or
                  policies.
                </p>

                <h2 class="text-lg font-semibold">Additional Notes</h2>
                <p>
                  In case of any error or system failure, the company is not liable for resulting losses.
                </p>
                <p>
                  All accounts are linked to an integration interface with the partner bank to ensure efficiency and
                  accuracy.
                </p>
                <p>
                  The investor is responsible for complying with anti-money laundering policies and updating their data
                  continuously.
                </p>
              </section>

              <!-- Page 14 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 14: Custody and Clearing Policies Table</h1>
              </section>

              <!-- Page 15 -->
              <section class="space-y-4">
                <h1 class="text-xl font-bold">Page 15: Account Suspension, Freezing, and Closure</h1>
                <h2 class="text-lg font-semibold">Account Suspension</h2>
                <p>
                  The company reserves the right to suspend accounts in case of the investor breaching any terms of the
                  agreement or conditions.
                </p>
                <p>
                  Accounts may be suspended based on instructions from regulatory or judicial authorities.
                </p>
                <p>
                  Suspension includes stopping operations except deposits until documents are updated or reasons for
                  suspension are removed.
                </p>

                <h2 class="text-lg font-semibold">Account Freezing</h2>
                <p>
                  Accounts are frozen if the investor's identification expires and an updated version is not provided.
                </p>
                <p>
                  Freezing includes halting all financial operations until the required data is updated.
                </p>

                <h2 class="text-lg font-semibold">Account Closure</h2>
                <p>
                  Accounts may be closed in the following cases:
                </p>
                <ul class="list-disc pl-6">
                  <li>At the investor's request if no active investments exist.</li>
                  <li>In case of misleading or fraudulent information provided by the investor.</li>
                  <li>
                    If the account is unused for 5 years with no active investments or balance, the company reserves the
                    right to close it automatically.
                  </li>
                </ul>

                <h2 class="text-lg font-semibold">Additional Notes</h2>
                <p>
                  The company reserves the right to take necessary actions to ensure compliance with regulatory
                  instructions.
                </p>
                <p>
                  In case of closure due to breach or provision of false information, the company holds no responsibility
                  for losses.
                </p>
                <p>
                  Only deposited funds in the investor's electronic wallet are refunded, without affecting existing
                  investments.
                </p>
              </section>
            </div>
        `,
      },
      signupBorrower: {
        title: 'Terms of Use signup Borrower',
        html: `
        <div class="container mx-auto  space-y-8">
          <!-- Agreement Title -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 1: Introduction and General Information</h1>
            <h2 class="text-lg font-semibold">Introduction</h2>
            <p>
              Tamathal Solutions operates as an electronic platform licensed by the Saudi Central Bank to connect small
              and medium-sized business owners with investors through Sharia-compliant crowdfunding. The platform
              provides direct financing services, and investing through it is considered high-risk, potentially
              involving loss of capital, as well as financial and technical risks. The investor acknowledges their legal
              capacity to make investment decisions under the laws of Saudi Arabia.
            </p>
          </section>

          <!-- Page 2 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 2: Investor Data Table</h1>
          </section>

          <!-- Page 3 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 3: Definitions and Interpretation</h1>
            <h2 class="text-lg font-semibold">Definitions</h2>
            <p><strong>Contract:</strong> Refers to this agreement and its signed annexes.</p>
            <p><strong>Anti-Money Laundering Law:</strong> The law issued under Royal Decree No. (M/20) and its
              amendments.</p>
            <p><strong>Debt-based Crowdfunding:</strong> Collecting funds from participants through a digital platform
              granted to the institutional beneficiary under a financing contract.</p>
            <p><strong>Applicable Laws:</strong> Includes any law related to this contract within Saudi Arabia.</p>
            <p><strong>Beneficiary:</strong> Small or medium enterprises registered in the kingdom seeking funding via
              the platform.</p>
            <p><strong>Working Day:</strong> Any day except Friday, Saturday, and public holidays in the kingdom.</p>
            <p><strong>Confidential Information:</strong> Includes all information disclosed by one party to another
              related to the terms of this agreement.</p>
          </section>

          <!-- Page 4 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 4: Key Definitions Table</h1>
          </section>

          <!-- Page 5 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 5: Scope of the Agreement</h1>
            <h2 class="text-lg font-semibold">Scope of the Agreement</h2>
            <p>
              Tamathal Solutions is an electronic platform licensed by the Saudi Central Bank, managed to connect small
              and medium-sized business owners with investors via debt-based crowdfunding. The investor agrees to invest
              in opportunities available on the platform based on their investment decision. Once the offer is fully
              subscribed, the opportunity is closed, and the funding is accepted by the beneficiary, with the investor
              receiving payments and profit margins according to the repayment schedule unless the beneficiary defaults
              or fails to make payments.
            </p>
          </section>


          <!-- Definitions -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Definitions</h2>
            <p>
              <strong>Set of Guarantees and Attached Models:</strong> The preamble is an integral part of this
              agreement, complementing and interpreting it. The borrower shall provide the following guarantees and
              models after accepting the goods sale contract:
            </p>
            <ul class="list-disc pl-6">
              <li>Promissory Note</li>
              <li>Performance and Indemnity Guarantee</li>
              <li>Repayment Schedule</li>
              <li>Direct Debit Authorization</li>
            </ul>
          </section>
        </div>
      `,
      },
      signupGuarantor: {
        title: 'Terms of Use onboarding Guarantor',
        html: `
        <div class="container mx-auto  space-y-8">
          <!-- Agreement Title -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 1: Introduction and General Information</h1>
            <h2 class="text-lg font-semibold">Introduction</h2>
            <p>
              Tamathal Solutions operates as an electronic platform licensed by the Saudi Central Bank to connect small
              and medium-sized business owners with investors through Sharia-compliant crowdfunding. The platform
              provides direct financing services, and investing through it is considered high-risk, potentially
              involving loss of capital, as well as financial and technical risks. The investor acknowledges their legal
              capacity to make investment decisions under the laws of Saudi Arabia.
            </p>
          </section>

          <!-- Page 2 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 2: Guarantor Data Table</h1>
          </section>

          <!-- Page 3 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 3: Definitions and Interpretation</h1>
            <h2 class="text-lg font-semibold">Definitions</h2>
            <p><strong>Contract:</strong> Refers to this agreement and its signed annexes.</p>
            <p><strong>Anti-Money Laundering Law:</strong> The law issued under Royal Decree No. (M/20) and its
              amendments.</p>
            <p><strong>Debt-based Crowdfunding:</strong> Collecting funds from participants through a digital platform
              granted to the institutional beneficiary under a financing contract.</p>
            <p><strong>Applicable Laws:</strong> Includes any law related to this contract within Saudi Arabia.</p>
            <p><strong>Beneficiary:</strong> Small or medium enterprises registered in the kingdom seeking funding via
              the platform.</p>
            <p><strong>Working Day:</strong> Any day except Friday, Saturday, and public holidays in the kingdom.</p>
            <p><strong>Confidential Information:</strong> Includes all information disclosed by one party to another
              related to the terms of this agreement.</p>
          </section>

          <!-- Page 4 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 4: Key Definitions Table</h1>
          </section>

          <!-- Page 5 -->
          <section class="space-y-4">
            <h1 class="text-xl font-bold">Page 5: Scope of the Agreement</h1>
            <h2 class="text-lg font-semibold">Scope of the Agreement</h2>
            <p>
              Tamathal Solutions is an electronic platform licensed by the Saudi Central Bank, managed to connect small
              and medium-sized business owners with investors via debt-based crowdfunding. The investor agrees to invest
              in opportunities available on the platform based on their investment decision. Once the offer is fully
              subscribed, the opportunity is closed, and the funding is accepted by the beneficiary, with the investor
              receiving payments and profit margins according to the repayment schedule unless the beneficiary defaults
              or fails to make payments.
            </p>
          </section>

          <!-- Introduction -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Introduction</h2>
            <p class="mb-2">
              The first party, an electronic platform (<a
                href="https://www.marabeh.com"
                class="text-blue-500 underline"
              >www.marabeh.com</a>), is licensed by the Saudi Central Bank
              to operate debt-based crowdfunding with license number ............... to connect emerging, small, and
              medium-sized business owners with investors.
            </p>
            <p class="mb-2">
              The second party seeks funding through Tamathal Solutions' debt-based crowdfunding platform via executing
              Tawarruq transactions in compliance with Sharia principles and under the terms and conditions of this
              agreement. Both parties, having full legal and Sharia-compliant capacity, agree to the following terms and
              conditions:
            </p>
          </section>

          <!-- Definitions -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Definitions</h2>
            <p>
              <strong>Set of Guarantees and Attached Models:</strong> The preamble is an integral part of this
              agreement, complementing and interpreting it. The borrower shall provide the following guarantees and
              models after accepting the goods sale contract:
            </p>
            <ul class="list-disc pl-6">
              <li>Promissory Note</li>
              <li>Performance and Indemnity Guarantee</li>
              <li>Repayment Schedule</li>
              <li>Direct Debit Authorization</li>
            </ul>
          </section>
        </div>
      `,
      },
      crowdfunding: {
        title: 'Crowdfunding Agreement',
        html: `
        <div class="container mx-auto  space-y-8">
          <section>
              <h2 class="text-2xl font-bold">Introduction</h2>
              <p>
                  A crowdfunding agreement outlines the terms and conditions between the crowdfunding platform, the project creator, and the contributors. It is a legally binding document that ensures transparency, accountability, and fairness among all parties involved.
              </p>
          </section>

          <section>
              <h2 class="text-xl text-bold mb-2">Credit Facility Agreement</h2>
              <p class="mb-2"><strong>Date:</strong> <span class="underline decoration-sky-500">${hjriData?.hijriDate} ${hjriData?.dayOfWeek}</span>, corresponding to <span class="underline decoration-sky-500">${date}</span></p>

              <h3 class="text-xl text-bold mb-2">Parties’ Information</h3>

              <p class="mb-2"><strong>Party One:</strong><br>
              Marabeh Growth Company for Debt-Based Crowdfunding,<br>
              Commercial Registration Number: 1009052059,<br>
              Address: Al-Sulaimania District, Prince Mohammed bin Abdulaziz Road</p>

              <p class="mb-3"><strong>Party Two:</strong><br>
              <span class="underline decoration-sky-500">${companyName}</span>,<br>
              Commercial Registration Number (CR): <span class="underline decoration-sky-500">${crNumber}</span>,<br>
              Located at: <span class="underline decoration-sky-500">${address}</span></p>

              <h3 class="mb-2 text-bold">Preamble</h3>
              <p>Whereas the <strong>First Party</strong> is an electronic platform licensed by the Saudi Central Bank to operate in debt-based crowdfunding under license number (..........). The platform facilitates the connection between entrepreneurs, small and medium-sized enterprises (SMEs), and investors through debt-based crowdfunding.</p>

              <p>And whereas the <strong>Second Party</strong> seeks financing from the <strong>First Party</strong> via the Marabeh Growth debt-based crowdfunding platform through the execution of <strong>Tawarruq transactions</strong> in compliance with Shariah standards and regulations, under the terms, conditions, and commitments set forth in this agreement, both parties—being fully legally and religiously competent—have agreed to the following terms and conditions:</p>

              <h3 class="mb-3">Definitions</h3>
              <table class="mb-4">
                  <tbody>
                    <tr>
                      <th>Term</th>
                      <th>Definition</th>
                    </tr>
                    <tr>
                        <td><strong>Debt-Based Crowdfunding Platform</strong></td>
                        <td>An electronic platform managed by Marabeh Growth, used to facilitate debt-based crowdfunding transactions through <strong>Tawarruq</strong> in compliance with Shariah regulations.</td>
                    </tr>
                    <tr>
                        <td><strong>Repayment Schedule</strong></td>
                        <td>A schedule outlining due dates and amounts payable, accessible via the <strong>Second Party’s</strong> dashboard on the Marabeh Growth platform.</td>
                    </tr>
                    <tr>
                        <td><strong>Settlement</strong></td>
                        <td>The process of transferring the financing amount from the company’s pooled account to the <strong>Second Party’s</strong> account after collecting funds from investors.</td>
                    </tr>
                    <tr>
                        <td><strong>Settlement Date</strong></td>
                        <td>The date on which the financing amount is transferred from the company’s account to the <strong>Second Party’s</strong> account.</td>
                    </tr>
                  </tbody>
              </table>

              <h3>Collateral & Attached Documents</h3>
              <p>The preamble above is an integral part of this agreement and serves to complement and interpret it accordingly. The borrower shall provide the following collateral and documents upon acceptance of the <strong>commodity sale contract</strong>:</p>
              <ul>
                  <li>Promissory Note</li>
                  <li>Performance and Indemnity Guarantee</li>
                  <li>Repayment Schedule</li>
              </ul>
          </section>

          <section>
              <h2>Responsibilities of the Parties</h2>
              <p>
                  The agreement delineates the roles and responsibilities of each party:
              </p>
              <h3>Project Creator</h3>
              <ul>
                  <li>Provide accurate and truthful information about the project.</li>
                  <li>Use funds exclusively for the stated purpose.</li>
                  <li>Deliver promised rewards or returns within the agreed timeframe.</li>
              </ul>
              <h3>Contributors</h3>
              <ul>
                  <li>Provide valid payment details and adhere to contribution guidelines.</li>
                  <li>Acknowledge that contributions may not be refundable under certain conditions.</li>
              </ul>
              <h3>Platform Provider</h3>
              <ul>
                  <li>Facilitate secure payment processing and fund distribution.</li>
                  <li>Ensure transparency and enforce compliance with terms.</li>
              </ul>
          </section>

          <section>
              <h2>Dispute Resolution</h2>
              <p>
                  In case of disputes, the agreement should outline the resolution process, such as mediation, arbitration, or legal action. It may also specify the jurisdiction and governing laws.
              </p>
          </section>

          <section>
              <h2>Termination and Amendments</h2>
              <p>
                  The agreement should specify conditions under which it can be terminated or amended, such as failure to meet funding goals or mutual consent of the parties.
              </p>
          </section>

          <section>
              <h2>Conclusion</h2>
              <p>
                  A well-drafted crowdfunding agreement is crucial for the success of any crowdfunding campaign. It protects the interests of all parties and fosters trust and accountability.
              </p>
          </section>

          <footer>
              <p>&copy; 2025 Crowdfunding Agreement Guide. All rights reserved.</p>
          </footer>
        </div>
      `,
      },
      loan: {
        title: 'Loan agreement',
        html: `
        <div class="container mx-auto  space-y-8">
          <!-- TODO текст из chatgpt -->
          <h2>Agreement for Loan Generation</h2>
          <p>
              This Agreement ("Agreement") is entered into by and between the following parties for the purpose of outlining the responsibilities, obligations, and steps required in the loan generation phase of the Islamic banking crowdfunding process. This document not only formalizes the process but also ensures that all actions undertaken align with the principles of Islamic finance.
          </p>
          <ul>
              <li><strong>Party A:</strong> [Insert Name of the Relationship Manager or Authorized Representative]</li>
              <li><strong>Party B:</strong> [Insert Name of the Delegate(s) or Borrower]</li>
              <li><strong>Platform Provider:</strong> [Insert Name of the Crowdfunding Platform]</li>
          </ul>

          <h3>Purpose</h3>
          <p>
              The primary purpose of this Agreement is to facilitate the structured completion of the campaign through the generation of a loan and associated promissory note. This process plays a pivotal role in ensuring a transparent, accountable, and seamless transition from the crowdfunding phase to the loan implementation phase. By executing this Agreement, all parties acknowledge their commitment to adhere to the defined steps and ensure compliance with the ethical and financial standards set forth.
          </p>
          <p>
              This step serves as a cornerstone in the crowdfunding process, marking the transformation of investor contributions into actionable financial support for the borrower. By defining the roles and responsibilities of each party, the Agreement minimizes ambiguities and fosters trust among all stakeholders.
          </p>

          <h3>Terms and Conditions</h3>
          <ol>
              <li><strong>Document Generation:</strong> Party A, acting as the authorized representative, shall generate the agreement and promissory note using the platform's "CREATE A DEAL" functionality. This action ensures that all necessary legal and financial documents are prepared in compliance with the principles of Islamic finance. The system's functionality is designed to provide accuracy and efficiency in this critical step.</li>
              <li><strong>Notification:</strong> Upon successful generation of the required documents, Party B will receive an automated notification via email. This email serves as an official prompt for Party B to log into the platform, review the agreement, and proceed with the necessary actions. The notification mechanism is integral to maintaining timely communication between the parties involved.</li>
              <li><strong>Signing Process:</strong> Party B is required to electronically sign the agreement and promissory note by clicking the "SIGN" button within the platform. The signing process is facilitated in a secure simulation mode, ensuring that all actions are recorded and verifiable. This process not only upholds transparency but also provides a digital audit trail for future reference.</li>
              <li><strong>Obligations:</strong>
                  <ul>
                      <li>Party A is obligated to ensure that all generated documents meet the necessary legal and Islamic financial standards. This includes verifying the accuracy of the information and the alignment of the terms with Sharia principles.</li>
                      <li>Party B agrees to thoroughly review the provided documents, ensuring an understanding of the terms and conditions before proceeding with the signing process. By signing, Party B confirms their acceptance of the outlined responsibilities and obligations.</li>
                  </ul>
              </li>
              <li><strong>Completion:</strong> Upon successful signing by Party B, the system will automatically update the campaign status to "Agreement Signed." This update signifies the formal completion of this critical step and allows the process to progress to the next phase. The platform ensures that all stakeholders are promptly informed of the status change.</li>
          </ol>

          <h3>Dispute Resolution</h3>
          <p>
              Recognizing the importance of resolving potential disagreements amicably, this Agreement outlines the dispute resolution framework. Any disputes arising from this Agreement shall be resolved in accordance with the governing laws specified in the platform's terms of service and the principles of Islamic finance. The parties agree to engage in good faith negotiations before pursuing alternative legal remedies.
          </p>
          <p>
              This approach underscores the commitment to upholding the values of fairness and cooperation, which are fundamental to the Islamic finance ethos.
          </p>

          <h3>Signatures</h3>
          <p>
              By signing this Agreement, the undersigned parties affirm their understanding and acceptance of the terms and conditions outlined herein. This act signifies their commitment to fulfilling their respective roles and responsibilities in the loan generation process.
          </p>

          <footer>
              <p>&copy; 2025 Crowdfunding Agreement Guide. All rights reserved.</p>
          </footer>
        </div>
      `,
      },
      verification: {
        title: `Confirm company phone number: ${props.verificationText}`,
        html: `
        <div class="container mx-auto  space-y-8">
          <h1>Terms of Use - Company Phone Number</h1>

          <p>Welcome to our company. By using our services and contacting us via our company phone number, you agree to the following terms and conditions:</p>

          <h1>General Terms</h1>
          <ul>
              <li>All calls to our phone support are logged to ensure compliance with regulatory requirements and to improve service quality.</li>
              <li>By contacting us, you acknowledge and agree that we may use your information to assist with your inquiry and follow up if needed.</li>
              <li>You are responsible for providing accurate and truthful information during the call.</li>
              <li>Inappropriate behavior, including abusive language or threats towards our staff, will not be tolerated and may result in legal action.</li>
          </ul>

          <h1>Service Availability</h1>
          <ul>
              <li>Our phone service is available to customers within supported regions. Please verify the availability of services in your area before calling.</li>
              <li>We strive to minimize downtime but cannot guarantee uninterrupted service due to factors beyond our control, such as technical issues or natural disasters.</li>
              <li>Our support staff will make every reasonable effort to resolve your issue promptly and efficiently.</li>
              <li>Service limitations may apply depending on the nature of your inquiry or the product/service in question.</li>
          </ul>

          <h1>Customer Responsibilities</h1>
          <ul>
              <li>You agree to use the phone service responsibly and for its intended purpose.</li>
              <li>Ensure that the phone number you use to contact us is active and capable of receiving return calls if necessary.</li>
              <li>Maintain confidentiality by avoiding sharing sensitive information such as PINs or account passwords over the phone.</li>
              <li>Provide clear and concise details about your inquiry to help us assist you effectively.</li>
          </ul>

          <h1>Contact Information</h1>
          <ul>
              <li>Email: <a href="mailto:support@company.com">support@company.com</a></li>
              <li>Website: <a href="https://www.company.com">www.company.com</a></li>
              <li>Phone: Please refer to the contact section on our website for the latest phone numbers.</li>
              <li>Address: Our office locations can be found on the "Contact Us" page of our website.</li>
          </ul>

          <p>Thank you for contacting our company. We look forward to assisting you with your needs.</p>
        </div>
      `,
      },
      draftOffer: {
        title: 'Draft Offer Agreement',
        html: `
          <div class="container mx-auto  space-y-8">
              <section>
                <h2 class="text-2xl font-bold">Introduction</h2>
                <p>
                    A draft offer agreement outlines the terms and conditions between the crowdfunding platform, the project creator, and the contributors. It is a legally binding document that ensures transparency, accountability, and fairness among all parties involved.
                </p>
            </section>
              <section>
                <h2>Draf Agreement</h2>
                <h2 class="text-xl text-bold mb-2">Credit Facility Agreement</h2>
              <p class="mb-2"><strong>Date:</strong> <span class="underline decoration-sky-500">${hjriData?.hijriDate} ${hjriData?.dayOfWeek}</span>, corresponding to <span class="underline decoration-sky-500">${date}</span></p>

              <h3 class="text-xl text-bold mb-2">Parties’ Information</h3>

              <p class="mb-2"><strong>Party One:</strong><br>
              Marabeh Growth Company for Debt-Based Crowdfunding,<br>
              Commercial Registration Number: 1009052059,<br>
              Address: Al-Sulaimania District, Prince Mohammed bin Abdulaziz Road</p>

              <p class="mb-3"><strong>Party Two:</strong><br>
              <span class="underline decoration-sky-500">${companyName}</span>,<br>
              Commercial Registration Number (CR): <span class="underline decoration-sky-500">${crNumber}</span>,<br>
              Located at: <span class="underline decoration-sky-500">${address}</span></p>

              <h3 class="mb-2 text-bold">Preamble</h3>
              <p>Whereas the <strong>First Party</strong> is an electronic platform licensed by the Saudi Central Bank to operate in debt-based crowdfunding under license number (..........). The platform facilitates the connection between entrepreneurs, small and medium-sized enterprises (SMEs), and investors through debt-based crowdfunding.</p>

              <p>And whereas the <strong>Second Party</strong> seeks financing from the <strong>First Party</strong> via the Marabeh Growth debt-based crowdfunding platform through the execution of <strong>Tawarruq transactions</strong> in compliance with Shariah standards and regulations, under the terms, conditions, and commitments set forth in this agreement, both parties—being fully legally and religiously competent—have agreed to the following terms and conditions:</p>

              <h3 class="mb-3">Definitions</h3>
              <table class="mb-4">
                  <tbody>
                    <tr>
                      <th>Term</th>
                      <th>Definition</th>
                    </tr>
                    <tr>
                        <td><strong>Debt-Based Crowdfunding Platform</strong></td>
                        <td>An electronic platform managed by Marabeh Growth, used to facilitate debt-based crowdfunding transactions through <strong>Tawarruq</strong> in compliance with Shariah regulations.</td>
                    </tr>
                    <tr>
                        <td><strong>Repayment Schedule</strong></td>
                        <td>A schedule outlining due dates and amounts payable, accessible via the <strong>Second Party’s</strong> dashboard on the Marabeh Growth platform.</td>
                    </tr>
                    <tr>
                        <td><strong>Settlement</strong></td>
                        <td>The process of transferring the financing amount from the company’s pooled account to the <strong>Second Party’s</strong> account after collecting funds from investors.</td>
                    </tr>
                    <tr>
                        <td><strong>Settlement Date</strong></td>
                        <td>The date on which the financing amount is transferred from the company’s account to the <strong>Second Party’s</strong> account.</td>
                    </tr>
                  </tbody>
              </table>

              <h3>Guarantor's Obligations</h3>
              <p>By signing this agreement, the Guarantor agrees to assume responsibility for repaying the Borrower’s financial obligations in case of default. This includes the total outstanding balance as specified.</p>

              <h3>Dispute Resolution</h3>
              <p>Any disputes arising from this Agreement shall be resolved through arbitration in accordance with applicable laws.</p>

              <h3>Acceptance</h3>
              <p>By acknowledging this Agreement, the undersigned affirm their understanding and acceptance of the terms herein.</p>
          </section>

          <footer>
              <p>&copy; 2025 Guarantor Agreement. All rights reserved.</p>
          </footer>
      </div>

      `,
      },
      guarantor: {
        title: 'Guarantor Agreement',
        html: `
          <div class="container mx-auto space-y-8">
          <section>
              <p><strong>Common information:</strong></p>
              <ul>
                  <li>Guarantor Name: <span class="underline decoration-sky-500">${guarantorFields.guarantorName}</span></li>
                  <li>Type: <span class="underline decoration-sky-500">${guarantorFields.type}</span></li>
                  <li>ID: <span class="underline decoration-sky-500">${guarantorFields.id}</span></li>
                  <li>Phone Number: <span class="underline decoration-sky-500">${guarantorFields.phoneNumber}</span></li>
                  <li>Borrower Name: <span class="underline decoration-sky-500">${guarantorFields.borrowerName}</span></li>
                  <li>Borrower CR: <span class="underline decoration-sky-500">${guarantorFields.borrowerCR}</span></li>
                  <li>Borrower Company Phone: <span class="underline decoration-sky-500">${guarantorFields.borrowerCompanyPhone}</span></li>
                  <li>Finance Amount: <span class="underline decoration-sky-500">${guarantorFields.financeAmount}</span></li>
                  <li>Tenure: <span class="underline decoration-sky-500">${guarantorFields.tenure} ${guarantorFields.period}</span></li>
              </ul>
          </section>

          <section>
              <h2 class="text-xl text-bold mb-2">Guarantor Commitment Agreement</h2>

              <h3 class="text-xl text-bold mb-2">Parties’ Information</h3>
              <p class="mb-2"><strong>Guarantor:</strong><br>
                  <span class="underline decoration-sky-500">${guarantorFields.guarantorName}</span>,<br>
                  ID: <span class="underline decoration-sky-500">${guarantorFields.id}</span>,<br>
                  Phone Number: <span class="underline decoration-sky-500">${guarantorFields.phoneNumber}</span>
              </p>
              <p class="mb-3"><strong>Borrower:</strong><br>
                  <span class="underline decoration-sky-500">${guarantorFields.borrowerName}</span>,<br>
                  Commercial Registration (CR): <span class="underline decoration-sky-500">${guarantorFields.borrowerCR}</span>,<br>
                  Company Phone: <span class="underline decoration-sky-500">${guarantorFields.borrowerCompanyPhone}</span>
              </p>

              <h3 class="mb-2 text-bold">Preamble</h3>
              <p>Whereas the <strong>Guarantor</strong> agrees to provide financial backing for the <strong>Borrower</strong> under the terms specified in this Agreement, ensuring repayment obligations are met.</p>

              <h3 class="mb-3">Definitions</h3>
              <table class="mb-4">
                  <tbody>
                      <tr>
                          <th>Term</th>
                          <th>Definition</th>
                      </tr>
                      <tr>
                          <td><strong>Guarantor</strong></td>
                          <td>An individual or entity assuming financial responsibility in the event of the Borrower’s default.</td>
                      </tr>
                      <tr>
                          <td><strong>Finance Amount</strong></td>
                          <td>The principal amount provided to the Borrower.</td>
                      </tr>
                      <tr>
                          <td><strong>Total Amount</strong></td>
                          <td>The total sum including fees, interest, and other obligations.</td>
                      </tr>
                      <tr>
                          <td><strong>Tenure</strong></td>
                          <td>The period agreed upon for loan repayment.</td>
                      </tr>
                  </tbody>
              </table>

              <h3>Guarantor's Obligations</h3>
              <p>By signing this agreement, the Guarantor agrees to assume responsibility for repaying the Borrower’s financial obligations in case of default. This includes the total outstanding balance as specified.</p>

              <h3>Dispute Resolution</h3>
              <p>Any disputes arising from this Agreement shall be resolved through arbitration in accordance with applicable laws.</p>

              <h3>Acceptance</h3>
              <p>By acknowledging this Agreement, the undersigned affirm their understanding and acceptance of the terms herein.</p>
          </section>

          <footer>
              <p>&copy; 2025 Guarantor Agreement. All rights reserved.</p>
          </footer>
      </div>
      `,
      },
      invest: {
        title: 'Investment Agreement',
        html: `
          <div class="container mx-auto space-y-8">
            <p>
                This Investment Agreement ("Agreement") is entered into by and between the following parties for the purpose of outlining the terms and conditions under which the Investor will provide funding to the Company. This document formalizes the investment process and ensures that all parties understand their rights and obligations.
            </p>

            <h3>Purpose</h3>
            <p>
                The primary purpose of this Agreement is to formalize the investment process, including the amount of funding, the equity or debt terms, and the rights and obligations of both the Investor and the Company. This Agreement ensures transparency and mutual understanding between the parties.
            </p>
            <p>
                By executing this Agreement, the Investor agrees to provide funding to the Company, and the Company agrees to use the funds in accordance with the terms outlined herein. This Agreement also sets forth the conditions under which the investment will be made and the rights of the Investor in relation to the Company.
            </p>

            <h3>Terms and Conditions</h3>
            <ol>
                <li><strong>Investment Amount:</strong> The Investor agrees to provide an investment of [Insert Amount] to the Company. This amount will be transferred to the Company's account within [Insert Number] business days of the execution of this Agreement.</li>
                <li><strong>Equity or Debt Terms:</strong>
                    <ul>
                        <li>If the investment is in the form of equity, the Investor will receive [Insert Percentage]% of the Company's shares.</li>
                        <li>If the investment is in the form of debt, the Company agrees to repay the principal amount plus [Insert Interest Rate]% interest within [Insert Timeframe].</li>
                    </ul>
                </li>
                <li><strong>Use of Funds:</strong> The Company agrees to use the investment funds solely for the purposes outlined in the business plan provided to the Investor. Any deviation from this plan must be approved in writing by the Investor.</li>
                <li><strong>Investor Rights:</strong>
                    <ul>
                        <li>The Investor shall have the right to receive regular financial reports from the Company, including but not limited to quarterly financial statements and annual audits.</li>
                        <li>The Investor shall have the right to participate in major decisions affecting the Company, as outlined in the Shareholders' Agreement (if applicable).</li>
                    </ul>
                </li>
                <li><strong>Confidentiality:</strong> Both parties agree to keep the terms of this Agreement and any related discussions confidential, except as required by law or with the prior written consent of the other party.</li>
                <li><strong>Termination:</strong> This Agreement may be terminated by mutual consent of both parties or in the event of a material breach by either party. Upon termination, any unused funds shall be returned to the Investor, and any equity or debt obligations shall be settled in accordance with the terms of this Agreement.</li>
            </ol>

            <h3>Dispute Resolution</h3>
            <p>
                Any disputes arising from this Agreement shall be resolved through good faith negotiations between the parties. If a resolution cannot be reached, the dispute shall be submitted to binding arbitration in accordance with the rules of [Insert Arbitration Institution]. The arbitration shall take place in [Insert Location], and the language of the arbitration shall be [Insert Language].
            </p>
            <p>
                This approach ensures that any disagreements are resolved in a fair and efficient manner, minimizing disruption to both parties.
            </p>

            <h3>Signatures</h3>
            <p>
                By signing this Agreement, the undersigned parties acknowledge that they have read, understood, and agreed to the terms and conditions outlined herein. This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements or understandings, whether written or oral.
            </p>

            <footer>
                <p>&copy; 2025 Investment Agreement Guide. All rights reserved.</p>
            </footer>
        </div>
        `,
      },
    }

    return items[props.type] || {}
  })
</script>

<style>
  .agreement-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
