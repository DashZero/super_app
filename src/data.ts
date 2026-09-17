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
  Map as MapIcon,
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
  availableFrom: Milestone;
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
  availableFrom: Milestone,
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
  availableFrom: Milestone,
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
  miniItem("taladi-marketplace", "Taladi", "Taladi Marketplace", 3, "Taladi", "market"),
  miniItem("other-marketplace", "Market", "Other-brand marketplace", 5, "TBD", "market"),
  miniItem("hotel", "Travel", "OTA — Hotel", 5, "All Hotel / OTA partner", "travel"),
  miniItem("dining", "Travel", "OTA — Dining", 7, "Hungry Hub", "travel", true),
  miniItem("wellness-spa", "Travel", "OTA — Wellness & Spa", 7, "Gowabi / Wellkub / Walex Go", "travel", true),
  miniItem("attraction", "Travel", "OTA — Attraction", 7, "Wandeedee", "travel", true),
  miniItem("tour-program", "Travel", "OTA — Tour Program", 7, "Wandeedee", "travel", true),
  miniItem("transfer-limo", "Travel", "OTA — Transfer / Limo", 7, "Wandeedee", "travel", true),
  miniItem("flights", "Travel", "OTA — Flights", 7, "FareOK", "travel", true),
  miniItem("condo-services", "Living", "Condo services", 5, "Silverman", "living", true),
  miniItem("rent-to-own", "Living", "Rent-to-own marketplace", 5, "Stayverse", "living", true),
  miniItem("telemed", "Wellbeing", "Telemed", 7, "TBD", "wellbeing", true),
  miniItem("telepharma", "Wellbeing", "Telepharma", 7, "TBD", "wellbeing", true),
  miniItem("insurance", "Wellbeing", "Insurance", 7, "MyInsurance", "wellbeing", true),
  miniItem("protection", "Wellbeing", "Protection", 7, "MyProtection", "wellbeing", true),
  miniItem("grab", "Ride", "Grab", 7, "Grab", "ride", true),
  miniItem("bolt", "Ride", "Bolt", 7, "Bolt", "ride", true),
  miniItem("muvmi", "Ride", "Muvmi", 7, "Muvmi", "ride", true),
  miniItem("lineman", "Ride", "Lineman", 7, "Lineman", "ride", true),
  miniItem("songwai", "Express", "SongWai Express", 5, "SongWai Express", "express", true),
  miniItem("lalamove", "Express", "Lalamove", 7, "Lalamove", "express", true),
  miniItem("cold-chain", "Express", "Fresh / Cold-chain Delivery", 7, "TBD", "express", true),
  miniItem("food-coupon", "Privileges", "My Coupon — Food & Beverage", 5, "Value Design / Benefit One", "privileges", true),
  miniItem("redeem-shopping", "Privileges", "Redeem Point — Shopping", 5, "Value Design / Benefit One", "privileges", true),
  miniItem("redeem-entertainment", "Privileges", "Redeem Point — Entertainment", 5, "Value Design / Benefit One", "privileges", true),
];

// Category identifiers stay open-ended so adding a future category only
// requires a new category record and its inventory data.
export type MarketplaceCategoryId = string;

export type MarketplaceItemKind = "product" | "coupon" | "voucher" | "deal";
export type MarketplaceArtTone = "lime" | "coral" | "sky" | "violet" | "amber";

export interface MarketplaceCategory {
  id: MarketplaceCategoryId;
  label: string;
  icon: LucideIcon;
  order: number;
  popular: boolean;
}

export interface MarketplaceItem {
  id: string;
  categoryId: MarketplaceCategoryId;
  kind: MarketplaceItemKind;
  name: string;
  merchant: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  options: string[];
  featured?: boolean;
  travelEssential?: boolean;
  artTone: MarketplaceArtTone;
}

export interface CartLine {
  itemId: string;
  quantity: number;
}

export const marketplaceCategories: MarketplaceCategory[] = [
  { id: "grocery", label: "Grocery", icon: ShoppingBasket, order: 1, popular: true },
  { id: "coupons", label: "Coupons", icon: Ticket, order: 2, popular: true },
  { id: "vouchers", label: "Vouchers", icon: Gift, order: 3, popular: true },
  { id: "deals", label: "Deals", icon: BadgePercent, order: 4, popular: true },
  { id: "beauty", label: "Beauty", icon: ShoppingBag, order: 5, popular: true },
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "thai-snack-box",
    categoryId: "grocery",
    kind: "product",
    name: "Thai snack discovery box",
    merchant: "Taladi Select",
    price: 249,
    badge: "Popular",
    description: "A travel-friendly mix of sweet and savoury Thai favourites.",
    options: ["Classic mix", "Less spicy"],
    featured: true,
    travelEssential: true,
    artTone: "amber",
  },
  {
    id: "tropical-fruit-box",
    categoryId: "grocery",
    kind: "product",
    name: "Ready-to-eat tropical fruit box",
    merchant: "Fresh Market Bangkok",
    price: 390,
    description: "Seasonal fruit prepared for convenient hotel delivery.",
    options: ["Small box", "Sharing box"],
    artTone: "lime",
  },
  {
    id: "riverfront-dining-coupon",
    categoryId: "coupons",
    kind: "coupon",
    name: "Riverfront dining coupon",
    merchant: "Bangkok Dining Club",
    price: 199,
    originalPrice: 400,
    badge: "Save ฿201",
    description: "A digital dining coupon redeemable at participating riverfront restaurants.",
    options: ["Digital coupon"],
    featured: true,
    artTone: "coral",
  },
  {
    id: "cafe-two-for-one",
    categoryId: "coupons",
    kind: "coupon",
    name: "Thai café two-for-one coupon",
    merchant: "Local Café Network",
    price: 89,
    badge: "2 for 1",
    description: "Enjoy two selected drinks for the price of one at participating cafés.",
    options: ["Digital coupon"],
    artTone: "amber",
  },
  {
    id: "thai-massage-voucher",
    categoryId: "vouchers",
    kind: "voucher",
    name: "Traditional Thai massage e-voucher",
    merchant: "Siam Wellness Partners",
    price: 699,
    originalPrice: 900,
    badge: "Tourist pick",
    description: "A prepaid 60-minute massage voucher with clear redemption instructions.",
    options: ["60 minutes"],
    featured: true,
    travelEssential: true,
    artTone: "violet",
  },
  {
    id: "shopping-cash-voucher",
    categoryId: "vouchers",
    kind: "voucher",
    name: "Central shopping cash voucher",
    merchant: "Retail Rewards Thailand",
    price: 500,
    description: "A digital cash voucher for selected shops and participating counters.",
    options: ["฿500 value", "฿1,000 value"],
    artTone: "sky",
  },
  {
    id: "tourist-connectivity-deal",
    categoryId: "deals",
    kind: "deal",
    name: "Tourist SIM and connectivity deal",
    merchant: "Thailand Connect",
    price: 499,
    originalPrice: 650,
    badge: "7 days",
    description: "A convenient connectivity bundle for a short stay in Thailand.",
    options: ["eSIM", "Physical SIM"],
    featured: true,
    travelEssential: true,
    artTone: "sky",
  },
  {
    id: "arrival-essentials-bundle",
    categoryId: "deals",
    kind: "deal",
    name: "Thailand arrival essentials bundle",
    merchant: "Taladi Travel Picks",
    price: 349,
    originalPrice: 480,
    description: "Everyday arrival essentials bundled for hotel or residence delivery.",
    options: ["Standard", "Family"],
    travelEssential: true,
    artTone: "lime",
  },
  {
    id: "travel-sunscreen",
    categoryId: "beauty",
    kind: "product",
    name: "SPF50 travel sunscreen",
    merchant: "Thai Beauty Lab",
    price: 320,
    badge: "Bestseller",
    description: "Lightweight high-protection sunscreen sized for days out in Thailand.",
    options: ["50 ml", "100 ml"],
    featured: true,
    travelEssential: true,
    artTone: "coral",
  },
  {
    id: "botanical-travel-set",
    categoryId: "beauty",
    kind: "product",
    name: "Thai botanical travel set",
    merchant: "Heritage Beauty",
    price: 590,
    originalPrice: 720,
    description: "A compact cleanser, moisturiser and body-care set with Thai botanicals.",
    options: ["Original", "Sensitive skin"],
    artTone: "violet",
  },
];

export const marketplaceItemById = new globalThis.Map(
  marketplaceItems.map((item) => [item.id, item]),
);

export type TravelArtTone = "indigo" | "sunset" | "sea" | "forest" | "sand";

export interface TravelDestination {
  id: string;
  name: string;
  region: string;
  propertyCount: number;
  tagline: string;
  artTone: TravelArtTone;
}

export interface TravelRoomOption {
  id: string;
  name: string;
  bed: string;
  pricePerNight: number;
  benefits: string[];
}

export interface TravelHotel {
  id: string;
  destinationId: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  amenities: string[];
  freeCancellation: boolean;
  featured?: boolean;
  artTone: TravelArtTone;
  rooms: TravelRoomOption[];
}

export const travelDestinations: TravelDestination[] = [
  { id: "bangkok", name: "Bangkok", region: "Central Thailand", propertyCount: 12048, tagline: "City stays, food and culture", artTone: "indigo" },
  { id: "phuket", name: "Phuket", region: "Southern Thailand", propertyCount: 6231, tagline: "Beaches and island escapes", artTone: "sea" },
  { id: "chiang-mai", name: "Chiang Mai", region: "Northern Thailand", propertyCount: 4382, tagline: "Temples, cafés and mountains", artTone: "forest" },
  { id: "pattaya", name: "Pattaya", region: "Eastern Thailand", propertyCount: 5129, tagline: "Easy seaside weekends", artTone: "sunset" },
];

export const travelHotels: TravelHotel[] = [
  {
    id: "riverline-bangkok",
    destinationId: "bangkok",
    name: "Riverline Bangkok Hotel",
    area: "Riverside · 500 m from BTS",
    rating: 9.1,
    reviewCount: 2840,
    pricePerNight: 2890,
    originalPrice: 3650,
    badge: "Top value",
    description: "A modern riverside stay with quick access to Bangkok's old town, shopping and evening dining.",
    amenities: ["River view", "Pool", "Breakfast", "Airport pickup"],
    freeCancellation: true,
    featured: true,
    artTone: "indigo",
    rooms: [
      { id: "city-king", name: "City King", bed: "1 king bed", pricePerNight: 2890, benefits: ["Free cancellation", "Breakfast included"] },
      { id: "river-balcony", name: "River Balcony", bed: "1 king bed · balcony", pricePerNight: 3490, benefits: ["River view", "Breakfast included"] },
    ],
  },
  {
    id: "sukhumvit-loft",
    destinationId: "bangkok",
    name: "Sukhumvit Urban Loft",
    area: "Asok · 200 m from MRT",
    rating: 8.7,
    reviewCount: 1942,
    pricePerNight: 2150,
    originalPrice: 2780,
    badge: "Limited deal",
    description: "Compact design-led rooms in a central neighbourhood with convenient airport and rail connections.",
    amenities: ["City centre", "Gym", "Late check-in", "Workspace"],
    freeCancellation: true,
    featured: true,
    artTone: "sunset",
    rooms: [
      { id: "smart-queen", name: "Smart Queen", bed: "1 queen bed", pricePerNight: 2150, benefits: ["Free cancellation", "Pay at property"] },
      { id: "corner-studio", name: "Corner Studio", bed: "1 king bed", pricePerNight: 2690, benefits: ["City view", "Breakfast available"] },
    ],
  },
  {
    id: "old-town-courtyard",
    destinationId: "bangkok",
    name: "Old Town Courtyard Stay",
    area: "Rattanakosin · Near Grand Palace",
    rating: 8.9,
    reviewCount: 866,
    pricePerNight: 1780,
    description: "A quiet heritage-inspired base for exploring temples, markets and Bangkok's historic neighbourhoods.",
    amenities: ["Old town", "Courtyard", "Local breakfast", "Tour desk"],
    freeCancellation: false,
    artTone: "sand",
    rooms: [
      { id: "heritage-twin", name: "Heritage Twin", bed: "2 single beds", pricePerNight: 1780, benefits: ["Local breakfast", "Welcome drink"] },
      { id: "courtyard-king", name: "Courtyard King", bed: "1 king bed", pricePerNight: 2290, benefits: ["Courtyard view", "Late checkout"] },
    ],
  },
  {
    id: "kata-bay-resort",
    destinationId: "phuket",
    name: "Kata Bay Resort",
    area: "Kata Beach · 4-minute walk",
    rating: 9.0,
    reviewCount: 1560,
    pricePerNight: 3290,
    originalPrice: 4200,
    badge: "Beach pick",
    description: "A relaxed beach stay with family-friendly pools and easy access to sunset viewpoints.",
    amenities: ["Near beach", "2 pools", "Family rooms", "Breakfast"],
    freeCancellation: true,
    featured: true,
    artTone: "sea",
    rooms: [
      { id: "garden-room", name: "Garden Room", bed: "1 king or 2 twins", pricePerNight: 3290, benefits: ["Free cancellation", "Breakfast included"] },
      { id: "pool-access", name: "Pool Access Room", bed: "1 king bed", pricePerNight: 4190, benefits: ["Pool access", "Breakfast included"] },
    ],
  },
  {
    id: "nimman-garden-house",
    destinationId: "chiang-mai",
    name: "Nimman Garden House",
    area: "Nimman · Café district",
    rating: 9.3,
    reviewCount: 720,
    pricePerNight: 1890,
    badge: "Guest favourite",
    description: "A calm garden property near cafés, galleries and Chiang Mai's creative district.",
    amenities: ["Garden", "Café", "Bicycle hire", "Coworking"],
    freeCancellation: true,
    featured: true,
    artTone: "forest",
    rooms: [
      { id: "garden-queen", name: "Garden Queen", bed: "1 queen bed", pricePerNight: 1890, benefits: ["Free cancellation", "Breakfast included"] },
      { id: "terrace-suite", name: "Terrace Suite", bed: "1 king bed", pricePerNight: 2590, benefits: ["Private terrace", "Breakfast included"] },
    ],
  },
  {
    id: "pattaya-sunset-club",
    destinationId: "pattaya",
    name: "Pattaya Sunset Club",
    area: "Jomtien · Beachfront",
    rating: 8.6,
    reviewCount: 1310,
    pricePerNight: 2390,
    originalPrice: 2990,
    description: "An easy seaside escape with spacious rooms and a sunset-facing rooftop pool.",
    amenities: ["Beachfront", "Rooftop pool", "Parking", "Family rooms"],
    freeCancellation: true,
    artTone: "sunset",
    rooms: [
      { id: "sea-view-twin", name: "Sea View Twin", bed: "2 single beds", pricePerNight: 2390, benefits: ["Free cancellation", "Sea view"] },
      { id: "family-suite", name: "Family Suite", bed: "1 king + sofa bed", pricePerNight: 3290, benefits: ["Breakfast included", "Sleeps 3"] },
    ],
  },
];

export const travelHotelById = new globalThis.Map(
  travelHotels.map((hotel) => [hotel.id, hotel]),
);

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
  availableFrom: Milestone;
  pending?: boolean;
  prompts?: Partial<Record<string, string>>;
  detailTitle: string;
  detailCta: string;
  nav: [MiniNavItem, MiniNavItem, MiniNavItem, MiniNavItem];
}

export const miniApps: Record<MiniAppId, MiniAppDefinition> = {
  market: {
    id: "market",
    title: "Taladi",
    eyebrow: "Essentials, vouchers & local travel deals",
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
    availableFrom: 5,
    prompts: { search: "Where would you like to go?" },
    detailTitle: "Build this trip",
    detailCta: "Check availability",
    nav: [
      { id: "explore", label: "Explore", icon: Compass },
      { id: "search", label: "Search", icon: Search },
      { id: "trips", label: "Trips", icon: MapIcon },
      { id: "saved", label: "Saved", icon: Star },
    ],
  },
  living: {
    id: "living",
    title: "Living",
    eyebrow: "Home, property & resident services",
    icon: Building2,
    availableFrom: 5,
    pending: true,
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
    availableFrom: 7,
    pending: true,
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
    availableFrom: 7,
    pending: true,
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
    availableFrom: 5,
    pending: true,
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
    availableFrom: 5,
    pending: true,
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
  "taladi-marketplace": ShoppingBasket,
  "other-marketplace": Store,
  hotel: BedDouble,
  dining: Utensils,
  "wellness-spa": HeartPulse,
  attraction: Ticket,
  "tour-program": MapIcon,
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
