import { createRouter, createWebHistory } from "vue-router"

import FundDashboard from "../pages/FundDashboard.vue"
import Dashboard from "../pages/Dashboard.vue"
import History from "../pages/History.vue"
import Profile from "../pages/Profile.vue"
import Investments from "../pages/Investments.vue"
import Marketplace from "../pages/Marketplace.vue"
import MarketplaceItem from "../pages/MarketplaceItem.vue"
import InvestmentItem from "../pages/InvestmentItem.vue"
import CompanyItem from "../pages/CompanyItem.vue"
import Settings from "../pages/Settings.vue"
import Login from "../pages/Login.vue"
import Registration from "../pages/Registration.vue"
import AwaitReview from "../pages/AwaitReview.vue"
import Verification from "../pages/Verification.vue"
import Repayment from "../pages/Repayment.vue"
import Loans from "../pages/Loans.vue"
import LoansItem from "../pages/LoansItem.vue"
import Wallet from "../pages/Wallet.vue"
import Companies from "../pages/Companies.vue"
import Offers from "../pages/Offers.vue"
import OfferDetail from "../pages/OfferDetail.vue"
import MyCampaigns from "../pages/MyCampaigns.vue"
import Notifications from "../pages/Notifications.vue"
import GuarantorRegistration from "../pages/GuarantorRegistration.vue"
import Logs from "../pages/Logs.vue"
import { authGuard } from "./guard"

const routes = [
  {
    path: `/`,
    name: "Dashboard",
    component: Dashboard,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/history`,
    name: "History",
    component: History,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/marketplace`,
    name: "Marketplace",
    component: Marketplace,
    meta: {
      authRequired: true,
      accessRole: ["investor"],
    },
  },
  {
    path: `/marketplace/:id`,
    name: "MarketplaceItem",
    component: MarketplaceItem,
    meta: {
      authRequired: true,
      accessRole: ["investor"],
    },
  },
  {
    path: `/companies`,
    name: "Companies",
    component: Companies,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/logs`,
    name: "Logs",
    component: Logs,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/notifications`,
    name: "Notifications",
    component: Notifications,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/myCampaigns`,
    name: "MyCampaigns",
    component: MyCampaigns,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/company/:id`,
    name: "CompanyItem",
    component: CompanyItem,
    meta: {
      authRequired: true,
      accessRole: ["investor"],
    },
  },
  {
    path: `/user-company/:id`,
    name: "UserCompanyItem",
    component: CompanyItem,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/investments`,
    name: "Investments",
    component: Investments,
    meta: {
      authRequired: true,
      accessRole: ["investor"],
    },
  },
  {
    path: `/loans`,
    name: "Loans",
    component: Loans,
    meta: {
      authRequired: true,
      accessRole: ["borrower"]
    },
  },
  {
    path: `/loans/:id`,
    name: "LoansItem",
    component: LoansItem,
    meta: {
      authRequired: true,
      accessRole: ["borrower"],
    },
  },
  {
    path: `/offers`,
    name: "Offers",
    component: Offers,
    meta: {
      authRequired: true,
      accessRole: ["borrower", "guarantor"],
    },
  },
  {
    path: `/offers/:id`,
    name: "OfferDetail",
    component: OfferDetail,
    meta: {
      authRequired: true,
      accessRole:["borrower", "guarantor"],
    },
  },
  {
    path: `/guarantees`,
    name: "Guarantees",
    component: Offers,
    meta: {
      authRequired: true,
      accessRole: ["guarantor"],
    },
  },
  {
    path: `/guarantees/:id`,
    name: "GuaranteesDetail",
    component: OfferDetail,
    meta: {
      authRequired: true,
      accessRole: ["guarantor"],
    },
  },
  {
    path: `/investments/:id`,
    name: "InvestmentItem",
    component: InvestmentItem,
    meta: {
      authRequired: true,
      accessRole: ["investor"],
    },
  },
  {
    path: `/wallet`,
    name: "Wallet",
    component: Wallet,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/profile`,
    name: "Profile",
    component: Profile,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/settings`,
    name: "Settings",
    component: Settings,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/login`,
    name: "Login",
    component: Login,
    meta: {
      layout: 'empty',
    },
  },
  {
    path: `/registration`,
    name: "Registration",
    component: Registration,
    meta: {
      layout: 'empty',
    },
  },
  {
    path: `/guarantor-registration/:token`,
    name: "GuarantorRegistration",
    component: GuarantorRegistration,
    meta: {
      layout: 'empty',
    },
  },
  {
    path: '/await-review',
    name: 'AwaitReview',
    component: AwaitReview,
    meta: {
      authRequired: true,
      layout: 'empty',
    },
  },
  {
    path: '/verification',
    name: 'Verification',
    component: Verification,
    meta: {
      authRequired: true,
      layout: 'empty',
    },
  },
  {
    path: `/repayment`,
    name: "Repayment",
    component: Repayment,
    meta: {
      authRequired: true,
    },
  },
  {
    path: `/funddashboard`,
    name: "FundDashboard",
    component: FundDashboard,
  },
]
export const router = createRouter({
  history: createWebHistory(`/public/`),
  routes,
})

router.beforeEach(authGuard)
