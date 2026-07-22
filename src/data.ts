import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgePercent,
  BedDouble,
  Bike,
  BookOpen,
  Boxes,
  Building2,
  CalendarDays,
  CarFront,
  ChartNoAxesColumnIncreasing,
  CircleUserRound,
  Compass,
  CreditCard,
  Gift,
  HeartPulse,
  History,
  Home,
  HousePlug,
  ListChecks,
  Map,
  MapPin,
  Package,
  PackageSearch,
  Plane,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Tag,
  Ticket,
  TramFront,
  UserRound,
  Utensils,
  WalletCards,
} from "lucide-react";

export type Milestone = 3 | 5 | 7;
export type MiniAppId =
  | "market"
  | "travel"
  | "living"
  | "wellbeing"
  | "ride"
  | "express"
  | "privileges";

export type CoreDestination =
  | "/core/home"
  | "/core/wallet"
  | "/core/inbox"
  | "/core/all"
  | "/core/search"
  | "/core/assistant"
  | "/core/profile";

interface RoadmapFunctionBase {
  id: string;
  menu: string;
  label: string;
  availableFrom: 3 | 5;
  partner: string;
  pending?: boolean;
}

interface CoreRoadmapFunction extends RoadmapFunctionBase {
  miniApp?: undefined;
  coreDestination: CoreDestination;
}

interface MiniAppRoadmapFunction extends RoadmapFunctionBase {
  miniApp: MiniAppId;
  coreDestination?: undefined;
}

export type RoadmapFunction = CoreRoadmapFunction | MiniAppRoadmapFunction;

const coreItem = (
  id: string,
  menu: string,
  label: string,
  availableFrom: 3 | 5,
  partner: string,
  coreDestination: CoreDestination,
): CoreRoadmapFunction => ({
  id,
  menu,
  label,
  availableFrom,
  partner,
  coreDestination,
});

const miniItem = (
  id: string,
  menu: string,
  label: string,
  availableFrom: 3 | 5,
  partner: string,
  miniApp: MiniAppId,
  pending = false,
): MiniAppRoadmapFunction => ({
  id,
  menu,
  label,
  availableFrom,
  partner,
  miniApp,
  pending,
});

export const roadmapFunctions: RoadmapFunction[] = [
  coreItem("recommendations", "All (AI)", "Recommendations", 3, "Internal / AI", "/core/all"),
  coreItem("support", "All (AI)", "Support", 3, "Internal", "/core/all"),
  coreItem("ai-assistant", "All (AI)", "AI Assistant", 5, "AI provider", "/core/assistant"),
  coreItem("search", "All (AI)", "Search", 5, "Search / AI provider", "/core/search"),
  coreItem("journey-planner", "All (AI)", "Journey Planner", 5, "Search / AI provider", "/core/assistant"),
  coreItem("wallet-dashboard", "Wallet", "Dashboard", 3, "Wallet platform", "/core/wallet"),
  coreItem("wallet-balance", "Wallet", "Balance", 3, "Wallet platform", "/core/wallet"),
  coreItem("transactions", "Wallet", "Transaction history", 3, "Wallet platform", "/core/wallet"),
  coreItem("transfer", "Wallet", "Transfer", 3, "Wallet platform", "/core/wallet"),
  coreItem("receive", "Wallet", "Receive", 3, "Wallet platform", "/core/wallet"),
  coreItem("qr-payment", "Wallet", "QR Payment", 3, "Wallet / payment partner", "/core/wallet"),
  coreItem("top-up", "Wallet", "Top up", 3, "Wallet / payment partner", "/core/wallet"),
  coreItem("rewards", "Wallet", "Rewards", 3, "Loyalty platform", "/core/wallet"),
  coreItem("linked-account", "Wallet", "Linked Account", 3, "Wallet / identity platform", "/core/wallet"),
  coreItem("all-id", "Wallet", "ALL ID", 3, "Identity platform", "/core/wallet"),
  coreItem("cards", "Wallet", "Cards", 5, "Wallet / card provider", "/core/wallet"),
  coreItem("language", "Settings", "Language", 3, "Internal", "/core/profile"),
  coreItem("privacy", "Settings", "Privacy", 3, "Internal", "/core/profile"),
  coreItem("notifications", "Settings", "Notifications", 3, "Internal", "/core/profile"),
  coreItem("connected-accounts", "Settings", "Connected Accounts", 3, "Internal", "/core/profile"),
  coreItem("devices", "Settings", "Devices", 3, "Internal", "/core/profile"),
  coreItem("about", "Settings", "About", 3, "Internal", "/core/profile"),
  coreItem("personal-information", "Profile", "Personal Information", 3, "Internal", "/core/profile"),
  coreItem("identity-verification", "Profile", "Identity Verification", 3, "Identity / KYC provider", "/core/profile"),
  coreItem("security", "Profile", "Security", 3, "Internal", "/core/profile"),
  coreItem("payment-methods", "Profile", "Payment Methods", 3, "Wallet / payment partner", "/core/profile"),
  coreItem("preferences", "Profile", "Preferences", 3, "Internal", "/core/profile"),
  coreItem("inbox", "Notification", "Inbox", 3, "Notification platform", "/core/inbox"),
  coreItem("system-notifications", "Notification", "System", 3, "Notification platform", "/core/inbox"),
  coreItem("transaction-notifications", "Notification", "Transactions", 3, "Notification platform", "/core/inbox"),
  coreItem("promotions", "Notification", "Promotions", 3, "Notification platform", "/core/inbox"),
  miniItem("taladi-grocer", "Market", "Taladi — Grocer", 3, "Taladi", "market"),
  miniItem("taladi-beauty", "Market", "Taladi — Beauty", 3, "Taladi", "market"),
  miniItem("other-marketplace", "Market", "Other-brand marketplace", 5, "TBD", "market"),
  miniItem("travel-deals", "Travel", "Travel deals / coupons", 3, "Taladi", "travel"),
  miniItem("hotel", "Travel", "OTA — Hotel", 5, "All Hotel / OTA partner", "travel", true),
  miniItem("dining", "Travel", "OTA — Dining", 5, "Hungry Hub", "travel", true),
  miniItem("wellness-spa", "Travel", "OTA — Wellness & Spa", 5, "Gowabi / Wellkub / Walex Go", "travel", true),
  miniItem("attraction", "Travel", "OTA — Attraction", 5, "Wandeedee", "travel", true),
  miniItem("tour-program", "Travel", "OTA — Tour Program", 5, "Wandeedee", "travel", true),
  miniItem("transfer-limo", "Travel", "OTA — Transfer / Limo", 5, "Wandeedee", "travel", true),
  miniItem("flights", "Travel", "OTA — Flights", 5, "FareOK", "travel", true),
  miniItem("condo-services", "Living", "Condo services", 3, "Silverman", "living"),
  miniItem("rent-to-own", "Living", "Rent-to-own marketplace", 3, "Stayverse", "living"),
  miniItem("telemed", "Wellbeing", "Telemed", 5, "TBD", "wellbeing", true),
  miniItem("telepharma", "Wellbeing", "Telepharma", 5, "TBD", "wellbeing", true),
  miniItem("insurance", "Wellbeing", "Insurance", 5, "MyInsurance", "wellbeing", true),
  miniItem("protection", "Wellbeing", "Protection", 5, "MyProtection", "wellbeing", true),
  miniItem("grab", "Ride", "Grab", 5, "Grab", "ride", true),
  miniItem("bolt", "Ride", "Bolt", 5, "Bolt", "ride", true),
  miniItem("muvmi", "Ride", "Muvmi", 5, "Muvmi", "ride", true),
  miniItem("lineman", "Ride", "Lineman", 5, "Lineman", "ride", true),
  miniItem("songwai", "Express", "SongWai Express", 3, "SongWai Express", "express"),
  miniItem("lalamove", "Express", "Lalamove", 5, "Lalamove", "express"),
  miniItem("cold-chain", "Express", "Fresh / Cold-chain Delivery", 5, "TBD", "express"),
  miniItem("food-coupon", "Privileges", "My Coupon — Food & Beverage", 3, "Value Design / Benefit One", "privileges"),
  miniItem("redeem-shopping", "Privileges", "Redeem Point — Shopping", 3, "Value Design / Benefit One", "privileges"),
  miniItem("redeem-entertainment", "Privileges", "Redeem Point — Entertainment", 3, "Value Design / Benefit One", "privileges"),
];

export interface MiniNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface MiniAppDefinition {
  id: MiniAppId;
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  availableFrom: 3 | 5;
  prompts?: Partial<Record<string, string>>;
  detailTitle: string;
  detailCta: string;
  nav: [MiniNavItem, MiniNavItem, MiniNavItem, MiniNavItem];
}

export const miniApps: Record<MiniAppId, MiniAppDefinition> = {
  market: {
    id: "market",
    title: "Market",
    eyebrow: "Groceries, beauty & everyday shopping",
    icon: ShoppingBasket,
    availableFrom: 3,
    detailTitle: "Review this item",
    detailCta: "Add to cart",
    nav: [
      { id: "shop", label: "Shop", icon: Store },
      { id: "categories", label: "Categories", icon: Boxes },
      { id: "cart", label: "Cart", icon: ShoppingCart },
      { id: "orders", label: "Orders", icon: ListChecks },
    ],
  },
  travel: {
    id: "travel",
    title: "Travel",
    eyebrow: "Plan and book a complete journey",
    icon: Plane,
    availableFrom: 3,
    prompts: { search: "Where would you like to go?" },
    detailTitle: "Build this trip",
    detailCta: "Check availability",
    nav: [
      { id: "explore", label: "Explore", icon: Compass },
      { id: "search", label: "Search", icon: Search },
      { id: "trips", label: "Trips", icon: Map },
      { id: "saved", label: "Saved", icon: Star },
    ],
  },
  living: {
    id: "living",
    title: "Living",
    eyebrow: "Home, property & resident services",
    icon: Building2,
    availableFrom: 3,
    detailTitle: "Request this service",
    detailCta: "Submit request",
    nav: [
      { id: "overview", label: "Overview", icon: Home },
      { id: "services", label: "Services", icon: HousePlug },
      { id: "requests", label: "Requests", icon: ListChecks },
      { id: "account", label: "Account", icon: UserRound },
    ],
  },
  wellbeing: {
    id: "wellbeing",
    title: "Wellbeing",
    eyebrow: "Care, pharmacy & protection",
    icon: HeartPulse,
    availableFrom: 5,
    detailTitle: "Choose your care",
    detailCta: "Continue",
    nav: [
      { id: "discover", label: "Discover", icon: Compass },
      { id: "care", label: "Care", icon: HeartPulse },
      { id: "protection", label: "Protection", icon: ShieldCheck },
      { id: "activity", label: "Activity", icon: Activity },
    ],
  },
  ride: {
    id: "ride",
    title: "Ride",
    eyebrow: "Compare and book a ride",
    icon: CarFront,
    availableFrom: 5,
    prompts: { book: "Choose a pickup location" },
    detailTitle: "Confirm your ride",
    detailCta: "Request ride",
    nav: [
      { id: "book", label: "Book", icon: MapPin },
      { id: "trips", label: "Trips", icon: History },
      { id: "saved", label: "Saved", icon: Star },
      { id: "account", label: "Account", icon: UserRound },
    ],
  },
  express: {
    id: "express",
    title: "Express",
    eyebrow: "Send and track every delivery",
    icon: Package,
    availableFrom: 3,
    prompts: {
      send: "Choose pickup and destination",
      track: "Enter tracking number",
    },
    detailTitle: "Create a delivery",
    detailCta: "Review delivery",
    nav: [
      { id: "send", label: "Send", icon: Send },
      { id: "track", label: "Track", icon: PackageSearch },
      { id: "orders", label: "Orders", icon: ListChecks },
      { id: "account", label: "Account", icon: UserRound },
    ],
  },
  privileges: {
    id: "privileges",
    title: "Privileges",
    eyebrow: "Coupons, points & member rewards",
    icon: Gift,
    availableFrom: 3,
    detailTitle: "Use this benefit",
    detailCta: "Redeem benefit",
    nav: [
      { id: "discover", label: "Discover", icon: Sparkles },
      { id: "coupons", label: "Coupons", icon: Ticket },
      { id: "points", label: "Points", icon: ChartNoAxesColumnIncreasing },
      { id: "rewards", label: "Rewards", icon: Gift },
    ],
  },
};
export const miniAppOrder: MiniAppId[] = [
  "market",
  "travel",
  "living",
  "wellbeing",
  "ride",
  "express",
  "privileges",
];

export const serviceIcons: Partial<Record<string, LucideIcon>> = {
  "taladi-grocer": ShoppingBasket,
  "taladi-beauty": ShoppingBag,
  "other-marketplace": Store,
  "travel-deals": BadgePercent,
  hotel: BedDouble,
  dining: Utensils,
  "wellness-spa": HeartPulse,
  attraction: Ticket,
  "tour-program": Map,
  "transfer-limo": CarFront,
  flights: Plane,
  "condo-services": Building2,
  "rent-to-own": Home,
  telemed: HeartPulse,
  telepharma: Activity,
  insurance: ShieldCheck,
  protection: ShieldCheck,
  grab: CarFront,
  bolt: Bike,
  muvmi: TramFront,
  lineman: Bike,
  songwai: Package,
  lalamove: Send,
  "cold-chain": Package,
  "food-coupon": Utensils,
  "redeem-shopping": ShoppingBag,
  "redeem-entertainment": Ticket,
  cards: CreditCard,
  rewards: Gift,
  "all-id": CircleUserRound,
  "journey-planner": CalendarDays,
  "ai-assistant": Sparkles,
  search: Search,
  "wallet-dashboard": WalletCards,
};
