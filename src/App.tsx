import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  Gift,
  Grid2X2,
  Heart,
  Home,
  Inbox,
  Menu,
  MessageCircleMore,
  MapPin,
  Minus,
  MoreHorizontal,
  Plus,
  QrCode,
  ScanLine,
  Search,
  Send,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  marketplaceCategories,
  marketplaceItemById,
  marketplaceItems,
  miniAppOrder,
  miniApps,
  roadmapFunctions,
  serviceIcons,
  travelDestinations,
  travelHotelById,
  travelHotels,
  type CartLine,
  type MarketplaceCategoryId,
  type MarketplaceItem,
  type Milestone,
  type MiniAppId,
  type RoadmapFunction,
  type TravelHotel,
  type TravelRoomOption,
} from "./data";

type CorePath =
  | "/core/home"
  | "/core/wallet"
  | "/core/qr"
  | "/core/inbox"
  | "/core/all";

interface OriginState {
  route: string;
  scrollTop: number;
  milestone: Milestone;
}

interface SimulatedTravelTrip {
  hotelId: string;
  roomId: string;
  dateId: string;
  guests: number;
}

interface PrototypeContextValue {
  milestone: Milestone;
  showFuture: boolean;
  setMilestone: (value: Milestone) => void;
  setShowFuture: (value: boolean) => void;
  openMiniApp: (id: MiniAppId, detailId?: string) => void;
  closeMiniApp: () => void;
  goCore: (path: string) => void;
  notify: (message: string) => void;
  cartLines: CartLine[];
  addToCart: (itemId: string, quantity: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  savedTravelHotelIds: string[];
  toggleSavedTravelHotel: (hotelId: string) => void;
  travelTrip: SimulatedTravelTrip | null;
  saveTravelTrip: (trip: SimulatedTravelTrip) => void;
  scrollViewportToTop: () => void;
}

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

const usePrototype = () => {
  const value = useContext(PrototypeContext);
  if (!value) throw new Error("PrototypeContext is missing");
  return value;
};

const firstTabByMiniApp = (id: MiniAppId) => miniApps[id].nav[0].id;

const milestoneFromSearch = (search: string): Milestone => {
  const value = new URLSearchParams(search).get("milestone");
  return value === "5" || value === "7" ? Number(value) as Milestone : 3;
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [milestone, setMilestoneState] = useState<Milestone>(() => milestoneFromSearch(location.search));
  const [showFuture, setShowFuture] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [savedTravelHotelIds, setSavedTravelHotelIds] = useState<string[]>([]);
  const [travelTrip, setTravelTrip] = useState<SimulatedTravelTrip | null>(null);
  const originRef = useRef<OriginState | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const setMilestone = (value: Milestone) => {
    setMilestoneState(value);
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.set("milestone", String(value));
    navigate(`${location.pathname}?${nextSearch.toString()}`, { replace: true });
  };

  const goCore = (path: string) => {
    navigate(`${path}${location.search}`);
    requestAnimationFrame(() => viewportRef.current?.scrollTo({ top: 0 }));
  };

  const openMiniApp = (id: MiniAppId, detailId?: string) => {
    originRef.current = {
      route: `${location.pathname}${location.search}`,
      scrollTop: viewportRef.current?.scrollTop ?? 0,
      milestone,
    };
    const base = `/mini/${id}/${firstTabByMiniApp(id)}`;
    const resolvedDetailId = id === "market" || (id === "travel" && detailId === "hotel") ? undefined : detailId;
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.set("milestone", String(milestone));
    const query = nextSearch.toString();
    navigate(`${resolvedDetailId ? `${base}/detail/${resolvedDetailId}` : base}${query ? `?${query}` : ""}`);
    requestAnimationFrame(() => viewportRef.current?.scrollTo({ top: 0 }));
  };

  const closeMiniApp = () => {
    const origin = originRef.current;
    originRef.current = null;
    if (!origin) {
      goCore("/core/home");
      return;
    }
    setMilestoneState(origin.milestone);
    navigate(origin.route);
    window.setTimeout(() => viewportRef.current?.scrollTo({ top: origin.scrollTop }), 0);
  };

  const scrollViewportToTop = () => {
    window.requestAnimationFrame(() => viewportRef.current?.scrollTo({ top: 0 }));
  };

  const addToCart = (itemId: string, quantity: number) => {
    setCartLines((current) => {
      const existing = current.find((line) => line.itemId === itemId);
      if (!existing) return [...current, { itemId, quantity }];
      return current.map((line) =>
        line.itemId === itemId
          ? { ...line, quantity: line.quantity + quantity }
          : line,
      );
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartLines((current) => current.filter((line) => line.itemId !== itemId));
      return;
    }
    setCartLines((current) =>
      current.map((line) =>
        line.itemId === itemId ? { ...line, quantity } : line,
      ),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartLines((current) => current.filter((line) => line.itemId !== itemId));
  };

  const toggleSavedTravelHotel = (hotelId: string) => {
    setSavedTravelHotelIds((current) =>
      current.includes(hotelId)
        ? current.filter((savedId) => savedId !== hotelId)
        : [...current, hotelId],
    );
  };

  const saveTravelTrip = (trip: SimulatedTravelTrip) => {
    setTravelTrip(trip);
  };

  const contextValue = useMemo<PrototypeContextValue>(
    () => ({
      milestone,
      showFuture,
      setMilestone,
      setShowFuture,
      openMiniApp,
      closeMiniApp,
      goCore,
      notify,
      cartLines,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      savedTravelHotelIds,
      toggleSavedTravelHotel,
      travelTrip,
      saveTravelTrip,
      scrollViewportToTop,
    }),
    [milestone, showFuture, location.pathname, location.search, cartLines, savedTravelHotelIds, travelTrip],
  );

  return (
    <PrototypeContext.Provider value={contextValue}>
      <main className="prototype-stage">
        <PresentationPanel />
        <section className="phone-wrap" aria-label="ALL Super App mobile wireframe">
          <div className="phone-frame">
            <StatusBar />
            <div className="phone-viewport" ref={viewportRef}>
              <Routes>
                <Route path="/core/home" element={<HomeScreen />} />
                <Route path="/core/wallet" element={<WalletScreen />} />
                <Route path="/core/wallet/:flow" element={<WalletFlow />} />
                <Route path="/core/qr" element={<QrFlow />} />
                <Route path="/core/qr/:step" element={<QrFlow />} />
                <Route path="/core/inbox" element={<InboxScreen />} />
                <Route path="/core/all" element={<AllServicesScreen />} />
                <Route path="/core/search" element={<SearchScreen />} />
                <Route path="/core/assistant" element={<AssistantScreen />} />
                <Route path="/core/profile" element={<ProfileScreen />} />
                <Route
                  path="/mini/:miniAppId/:tabId"
                  element={<MiniAppScreen />}
                />
                <Route
                  path="/mini/:miniAppId/:tabId/detail/:detailId"
                  element={<MiniAppScreen />}
                />
                <Route
                  path="/mini/:miniAppId/:tabId/product/:productId"
                  element={<MiniAppScreen />}
                />
                <Route
                  path="/mini/:miniAppId/:tabId/hotel/:hotelId"
                  element={<MiniAppScreen />}
                />
                <Route path="*" element={<Navigate to="/core/home" replace />} />
              </Routes>
            </div>
            <div className="home-indicator" />
          </div>
        </section>
        <PrototypeSwitcher />
        {toast && <div className="toast">{toast}</div>}
      </main>
    </PrototypeContext.Provider>
  );
}

function PresentationPanel() {
  const { milestone, setMilestone, showFuture, setShowFuture } = usePrototype();
  const availableCount = roadmapFunctions.filter(
    (entry) => entry.availableFrom <= milestone,
  ).length;
  const audience = milestone === 3
    ? "International tourists"
    : "Thai users · International tourists · Foreign residents";

  return (
    <aside className="presentation-panel">
      <p className="prototype-label">Clickable wireframe</p>
      <h1>ALL Super App</h1>
      <p className="presentation-copy">
        Compare roadmap scope and test how core navigation hands off to focused
        category mini-apps.
      </p>
      <div className="milestone-picker" aria-label="Roadmap milestone">
        {([3, 5, 7] as Milestone[]).map((value) => (
          <button
            className={milestone === value ? "active" : ""}
            key={value}
            onClick={() => setMilestone(value)}
          >
            Month {value}
          </button>
        ))}
      </div>
      <label className="future-toggle">
        <input
          type="checkbox"
          checked={showFuture}
          onChange={(event) => setShowFuture(event.target.checked)}
        />
        <span>Show future features</span>
      </label>
      <div className="scope-stat">
        <strong>{availableCount}</strong>
        <span>roadmap functions visible</span>
      </div>
      <p className="roadmap-note">Audience · {audience}</p>
      <div className="legend">
        <span><i className="legend-dot live" /> Available</span>
        <span><i className="legend-dot future" /> Future</span>
        <span><i className="legend-dot pending" /> Partner pending</span>
      </div>
    </aside>
  );
}

function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span>9:41</span>
      <div className="status-notch" />
      <span className="status-signals">● ◒ ▰</span>
    </div>
  );
}

function CoreHeader({ compact = false }: { compact?: boolean }) {
  const { milestone, goCore, notify } = usePrototype();
  return (
    <header className={`core-header ${compact ? "compact" : ""}`}>
      <button className="brand-mark" onClick={() => goCore("/core/home")} aria-label="Home">
        ALL
      </button>
      {!compact && <span className="header-greeting">Good morning</span>}
      <div className="header-actions">
        <button
          className="icon-button"
          aria-label="Search"
          onClick={() =>
            milestone >= 5
              ? goCore("/core/search")
              : notify("Search becomes available in Month 5")
          }
        >
          <Search size={19} />
        </button>
        <button className="icon-button" aria-label="Notifications" onClick={() => goCore("/core/inbox")}>
          <Bell size={19} />
        </button>
        <button className="avatar-button" aria-label="Profile" onClick={() => goCore("/core/profile")}>
          PC
        </button>
      </div>
    </header>
  );
}

interface CoreScaffoldProps {
  children: ReactNode;
  active: CorePath;
  header?: boolean;
  className?: string;
}

function CoreScaffold({ children, active, header = true, className = "" }: CoreScaffoldProps) {
  return (
    <div className={`core-screen ${className}`}>
      {header && <CoreHeader />}
      <div className="core-content">{children}</div>
      <CoreNav active={active} />
    </div>
  );
}

const coreNav: Array<{ path: CorePath; label: string; icon: LucideIcon }> = [
  { path: "/core/home", label: "Home", icon: Home },
  { path: "/core/wallet", label: "Wallet", icon: WalletCards },
  { path: "/core/qr", label: "QR", icon: QrCode },
  { path: "/core/inbox", label: "Inbox", icon: Inbox },
  { path: "/core/all", label: "All", icon: Menu },
];

function CoreNav({ active }: { active: CorePath }) {
  const { goCore } = usePrototype();
  return (
    <nav className="bottom-nav core-bottom-nav" aria-label="Core navigation">
      {coreNav.map(({ path, label, icon: Icon }) => (
        <button
          key={path}
          className={active === path ? "active" : ""}
          onClick={() => goCore(path)}
        >
          <Icon size={21} strokeWidth={1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function HomeScreen() {
  const [searchParams] = useSearchParams();
  const variant = (searchParams.get("variant") ?? "A").toUpperCase();
  return (
    <CoreScaffold active="/core/home" className={`home-variant variant-${variant.toLowerCase()}`}>
      {variant === "B" ? <HomeVariantB /> : variant === "C" ? <HomeVariantC /> : <HomeVariantA />}
    </CoreScaffold>
  );
}

function QuickActions() {
  const { goCore } = usePrototype();
  const actions = [
    { label: "Transfer", icon: ArrowUpRight, path: "/core/wallet/transfer" },
    { label: "Receive", icon: ArrowDownLeft, path: "/core/wallet/receive" },
    { label: "QR Pay", icon: ScanLine, path: "/core/qr" },
    { label: "Rewards", icon: Gift, path: "/core/wallet" },
  ];
  return (
    <div className="quick-actions">
      {actions.map(({ label, icon: Icon, path }) => (
        <button key={label} onClick={() => goCore(path)}>
          <span><Icon size={20} /></span>
          {label}
        </button>
      ))}
    </div>
  );
}

function useAvailableMiniApps() {
  const { milestone, showFuture } = usePrototype();
  return miniAppOrder
    .map((id) => miniApps[id])
    .filter((app) => app.availableFrom <= milestone || showFuture);
}

function HomeVariantA() {
  const { milestone, openMiniApp, goCore } = usePrototype();
  const apps = useAvailableMiniApps();
  return (
    <>
      {milestone >= 5 ? (
        <button className="search-field" onClick={() => goCore("/core/search")}>
          <Search size={17} /> Search services, trips and more
        </button>
      ) : (
        <div className="milestone-intro">
          <span>Month 3 launch</span>
          <strong>Tourist Wallet + Taladi Marketplace</strong>
        </div>
      )}
      <PlaceholderBanner label="Promotion / campaign image" />
      <QuickActions />
      <SectionTitle title="Services" action="View all" />
      <div className="service-grid">
        {apps.map((app) => (
          <MiniAppTile key={app.id} appId={app.id} onOpen={() => openMiniApp(app.id)} />
        ))}
      </div>
      <SectionTitle title="Recommended for you" action="Refresh" />
      <div className="offer-row">
        <PlaceholderCard label="Member offer" />
        <PlaceholderCard label="Travel deal" />
      </div>
    </>
  );
}

function HomeVariantB() {
  const { milestone, openMiniApp, goCore } = usePrototype();
  const apps = useAvailableMiniApps();
  return (
    <>
      <section className="journey-hero">
        <div>
          <p>What do you want to do?</p>
          <h2>Plan your next move</h2>
        </div>
        <Sparkles size={25} />
        <button
          onClick={() =>
            milestone >= 5 ? goCore("/core/assistant") : openMiniApp("market")
          }
        >
          {milestone >= 5 ? "Ask ALL Assistant" : "Explore launch services"}
          <ArrowRight size={16} />
        </button>
      </section>
      <QuickActions />
      <SectionTitle title="Popular journeys" />
      <div className="journey-stack">
        {apps.slice(0, 4).map((app, index) => {
          const Icon = app.icon;
          return (
            <button key={app.id} onClick={() => openMiniApp(app.id)}>
              <span className="journey-number">0{index + 1}</span>
              <span className="journey-icon"><Icon size={21} /></span>
              <span><strong>{app.title}</strong><small>{app.eyebrow}</small></span>
              <ChevronRight size={18} />
            </button>
          );
        })}
      </div>
      <SectionTitle title="Your week" />
      <div className="timeline-card">
        <i />
        <div><strong>Coupon expires soon</strong><small>Food & beverage reward</small></div>
        <span>2d</span>
      </div>
      <div className="timeline-card">
        <i />
        {milestone >= 5 ? (
          <><div><strong>Delivery in progress</strong><small>Track your SongWai order</small></div><span>Now</span></>
        ) : (
          <><div><strong>Travel essentials ready</strong><small>Open Taladi marketplace</small></div><span>New</span></>
        )}
      </div>
    </>
  );
}

function HomeVariantC() {
  const { milestone, showFuture, openMiniApp } = usePrototype();
  const visibleCount = roadmapFunctions.filter(
    (entry) => entry.availableFrom <= milestone || showFuture,
  ).length;
  const grouped = useMemo(() => {
    const visible = roadmapFunctions.filter(
      (entry) => entry.availableFrom <= milestone || showFuture,
    );
    return miniAppOrder
      .map((id) => ({
        app: miniApps[id],
        entries: visible.filter((entry) => entry.miniApp === id),
      }))
      .filter(({ entries }) => entries.length > 0);
  }, [milestone, showFuture]);

  return (
    <>
      <div className="directory-heading">
        <div><span>Complete directory</span><strong>{visibleCount} functions</strong></div>
        <Grid2X2 size={22} />
      </div>
      <QuickActions />
      <div className="directory-list">
        {grouped.map(({ app, entries }) => {
          const Icon = app.icon;
          return (
            <section key={app.id}>
              <button className="directory-category" onClick={() => openMiniApp(app.id)}>
                <span><Icon size={20} /></span>
                <strong>{app.title}</strong>
                <small>{entries.length} services</small>
                <ChevronRight size={17} />
              </button>
              <div className="directory-links">
                {entries.slice(0, 3).map((entry) => (
                  <button
                    key={entry.id}
                    disabled={entry.availableFrom > milestone}
                    onClick={() => openMiniApp(app.id, entry.id)}
                  >
                    {entry.label}
                    {entry.availableFrom > milestone && <em>M{entry.availableFrom}</em>}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function MiniAppTile({ appId, onOpen }: { appId: MiniAppId; onOpen: () => void }) {
  const { milestone } = usePrototype();
  const app = miniApps[appId];
  const Icon = app.icon;
  const disabled = app.availableFrom > milestone;
  return (
    <button className={`service-tile ${disabled ? "future" : app.pending ? "pending" : ""}`} disabled={disabled} onClick={onOpen}>
      <span className="service-icon"><Icon size={23} /></span>
      <strong>{app.title}</strong>
      {disabled ? <small>Month {app.availableFrom}</small> : app.pending ? <small>Partner pilot</small> : <small>{app.eyebrow.split(",")[0]}</small>}
    </button>
  );
}

function PlaceholderBanner({ label }: { label: string }) {
  return (
    <div className="placeholder-banner">
      <div className="placeholder-art"><span>IMAGE</span></div>
      <div><small>Placeholder</small><strong>{label}</strong><span>Campaign message goes here</span></div>
    </div>
  );
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="placeholder-card">
      <div className="placeholder-box">IMAGE</div>
      <strong>{label}</strong>
      <span>Supporting placeholder copy</span>
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="section-title"><h2>{title}</h2>{action && <button>{action}</button>}</div>
  );
}

function WalletScreen() {
  const { goCore } = usePrototype();
  return (
    <CoreScaffold active="/core/wallet">
      <PageHeading title="Wallet" subtitle="Your money and rewards" />
      <section className="balance-card">
        <span>Available balance</span>
        <strong>฿ — — —</strong>
        <small>Balance placeholder</small>
      </section>
      <div className="quick-actions wallet-actions">
        <button onClick={() => goCore("/core/wallet/transfer")}><span><ArrowUpRight size={20} /></span>Transfer</button>
        <button onClick={() => goCore("/core/wallet/receive")}><span><ArrowDownLeft size={20} /></span>Receive</button>
        <button onClick={() => goCore("/core/qr")}><span><QrCode size={20} /></span>QR Pay</button>
        <button onClick={() => goCore("/core/wallet/top-up")}><span><CreditCard size={20} /></span>Top up</button>
      </div>
      <SectionTitle title="Recent activity" action="See all" />
      <WireList rows={["Coffee shop", "Wallet top up", "Member reward"]} />
    </CoreScaffold>
  );
}

function WalletFlow() {
  const { flow = "transfer" } = useParams();
  const { goCore, notify } = usePrototype();
  const isSuccess = flow === "success";
  if (isSuccess) {
    return (
      <CoreScaffold active="/core/wallet">
        <ResultState
          title="Transfer complete"
          description="Prototype confirmation — no money was moved."
          onDone={() => goCore("/core/wallet")}
        />
      </CoreScaffold>
    );
  }
  return (
    <CoreScaffold active="/core/wallet">
      <PageHeading title={flow === "receive" ? "Receive money" : flow === "top-up" ? "Top up" : "Transfer"} subtitle="Wireframe action" back={() => goCore("/core/wallet")} />
      {flow === "receive" ? (
        <div className="qr-placeholder"><QrCode size={96} /><strong>Your receive code</strong><span>QR placeholder</span></div>
      ) : (
        <div className="wire-form">
          <label>Recipient or account<div className="input-placeholder">Select account</div></label>
          <label>Amount<div className="input-placeholder">฿ 0.00</div></label>
          <label>Note<div className="input-placeholder">Optional message</div></label>
        </div>
      )}
      <button
        className="primary-button"
        onClick={() => flow === "receive" ? notify("Share action placeholder") : goCore("/core/wallet/success")}
      >
        {flow === "receive" ? "Share code" : "Review and confirm"}
      </button>
    </CoreScaffold>
  );
}

function QrFlow() {
  const { step = "scan" } = useParams();
  const { goCore } = usePrototype();
  if (step === "success") {
    return (
      <CoreScaffold active="/core/qr">
        <ResultState title="Payment complete" description="Prototype confirmation — no payment was processed." onDone={() => goCore("/core/home")} />
      </CoreScaffold>
    );
  }
  return (
    <CoreScaffold active="/core/qr" className="scanner-screen">
      <PageHeading title="Scan to pay" subtitle="Camera placeholder" />
      <div className="scanner-placeholder"><span /><QrCode size={112} /><small>Position a QR code inside the frame</small></div>
      <button className="primary-button" onClick={() => goCore("/core/qr/success")}>Simulate successful scan</button>
    </CoreScaffold>
  );
}

function InboxScreen() {
  return (
    <CoreScaffold active="/core/inbox">
      <PageHeading title="Inbox" subtitle="Updates across ALL" />
      <div className="segmented"><button className="active">All</button><button>Transactions</button><button>Offers</button></div>
      <WireList rows={["Payment received", "Your delivery is on the way", "New member privilege", "Security update"]} />
    </CoreScaffold>
  );
}

function AllServicesScreen() {
  const { milestone, showFuture, openMiniApp, goCore } = usePrototype();
  const visible = roadmapFunctions.filter((entry) => entry.availableFrom <= milestone || showFuture);
  const grouped = Array.from(new Set(visible.map((entry) => entry.menu))).map((menu) => ({
    menu,
    entries: visible.filter((entry) => entry.menu === menu),
  }));
  return (
    <CoreScaffold active="/core/all">
      <PageHeading title="All services" subtitle={`${visible.length} roadmap functions`} />
      <button className="search-field" onClick={() => milestone >= 5 ? goCore("/core/search") : undefined}>
        <Search size={17} /> {milestone >= 5 ? "Search all services" : "Search arrives in Month 5"}
      </button>
      <div className="all-service-groups">
        {grouped.map(({ menu, entries }) => (
          <section key={menu}>
            <h2>{menu}</h2>
            {entries.map((entry) => (
              <RoadmapRow key={entry.id} entry={entry} onOpen={() => entry.miniApp ? openMiniApp(entry.miniApp, entry.id) : goCore(entry.coreDestination)} />
            ))}
          </section>
        ))}
      </div>
    </CoreScaffold>
  );
}

function RoadmapRow({ entry, onOpen }: { entry: RoadmapFunction; onOpen: () => void }) {
  const { milestone } = usePrototype();
  const Icon = serviceIcons[entry.id] ?? MoreHorizontal;
  const future = entry.availableFrom > milestone;
  return (
    <button className={`roadmap-row ${future ? "future" : ""}`} disabled={future} onClick={onOpen}>
      <span><Icon size={18} /></span>
      <div><strong>{entry.label}</strong><small>{entry.partner}</small></div>
      {future && <em>Month {entry.availableFrom}</em>}
      {!future && entry.pending && <em className="pending-badge">Partner pending</em>}
      {!future && <ChevronRight size={16} />}
    </button>
  );
}

function SearchScreen() {
  const { openMiniApp } = usePrototype();
  return (
    <CoreScaffold active="/core/all">
      <PageHeading title="Search" subtitle="Available from Month 5" />
      <div className="search-input"><Search size={18} /><span>Try “weekend trip”</span></div>
      <SectionTitle title="Suggested results" />
      {miniAppOrder.slice(0, 5).map((id) => {
        const app = miniApps[id];
        return <RoadmapRow key={id} entry={{ id, menu: app.title, label: app.title, partner: app.eyebrow, availableFrom: app.availableFrom, miniApp: id }} onOpen={() => openMiniApp(id)} />;
      })}
    </CoreScaffold>
  );
}

function AssistantScreen() {
  const { openMiniApp } = usePrototype();
  return (
    <CoreScaffold active="/core/all">
      <PageHeading title="ALL Assistant" subtitle="Journey-planning wireframe" />
      <div className="assistant-hero"><Sparkles size={30} /><strong>How can ALL help today?</strong><span>Ask about travel, services, rewards or payments.</span></div>
      <div className="chat-bubble user">Plan a weekend wellness trip.</div>
      <div className="chat-bubble assistant">I can combine travel, dining and wellness options into one journey.</div>
      <button className="primary-button" onClick={() => openMiniApp("travel")}>Open suggested journey <ArrowRight size={17} /></button>
    </CoreScaffold>
  );
}

function ProfileScreen() {
  const { notify } = usePrototype();
  return (
    <CoreScaffold active="/core/all">
      <PageHeading title="Profile" subtitle="Identity and preferences" />
      <div className="profile-summary"><div>PC</div><span><strong>Prototype User</strong><small>ALL ID · Verification placeholder</small></span></div>
      {[
        [UserRound, "Personal information"],
        [CircleUserRound, "Identity verification"],
        [CreditCard, "Payment methods"],
        [Settings, "Settings"],
        [MessageCircleMore, "Support"],
      ].map(([Icon, label]) => {
        const RowIcon = Icon as LucideIcon;
        return <button className="profile-row" key={label as string} onClick={() => notify(`${label} screen placeholder`)}><RowIcon size={19} /><span>{label as string}</span><ChevronRight size={17} /></button>;
      })}
    </CoreScaffold>
  );
}

function MiniAppScreen() {
  const { miniAppId, tabId, detailId, productId, hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    milestone,
    showFuture,
    closeMiniApp,
    notify,
    cartLines,
    addToCart,
    saveTravelTrip,
    scrollViewportToTop,
  } = usePrototype();

  if (!miniAppId || !(miniAppId in miniApps)) return <Navigate to="/core/home" replace />;
  const id = miniAppId as MiniAppId;
  const app = miniApps[id];
  if (app.availableFrom > milestone && !showFuture) {
    return <Navigate to={`/core/home${location.search}`} replace />;
  }
  const activeTab = app.nav.find((tab) => tab.id === tabId) ?? app.nav[0];
  const entries = roadmapFunctions.filter(
    (entry) => entry.miniApp === id && (entry.availableFrom <= milestone || showFuture),
  );
  const detail = entries.find((entry) => entry.id === detailId);
  const product = productId ? marketplaceItemById.get(productId) : undefined;
  const travelHotel = hotelId ? travelHotelById.get(hotelId) : undefined;
  const result = new URLSearchParams(location.search).get("result");
  const goTab = (nextTab: string) => {
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.delete("result");
    if (id === "travel" && nextTab !== "trips") {
      nextSearch.delete("hotel");
      nextSearch.delete("room");
      nextSearch.delete("service");
    }
    const query = nextSearch.toString();
    navigate(`/mini/${id}/${nextTab}${query ? `?${query}` : ""}`);
    scrollViewportToTop();
  };
  const openDetail = (entry: RoadmapFunction) => {
    if (entry.availableFrom > milestone) {
      notify(`${entry.label} becomes available in Month ${entry.availableFrom}`);
      return;
    }
    navigate(`/mini/${id}/${activeTab.id}/detail/${entry.id}${location.search}`);
  };
  const openProduct = (item: MarketplaceItem) => {
    navigate(`/mini/market/shop/product/${item.id}${location.search}`);
    scrollViewportToTop();
  };
  const openTravelHotel = (hotel: TravelHotel) => {
    navigate(`/mini/travel/${activeTab.id}/hotel/${hotel.id}${location.search}`);
    scrollViewportToTop();
  };
  const backToTab = () => {
    navigate(`/mini/${id}/${activeTab.id}${location.search}`);
    scrollViewportToTop();
  };
  const goToResult = (targetTab: string, resultId: string) => {
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.set("result", resultId);
    navigate(`/mini/${id}/${targetTab}?${nextSearch.toString()}`);
    scrollViewportToTop();
  };
  const completeDetail = () => {
    if (id === "market") return goToResult("cart", "added");
    if (id === "travel") {
      const nextSearch = new URLSearchParams(location.search);
      nextSearch.set("result", "service-preview");
      if (detail) nextSearch.set("service", detail.id);
      navigate(`/mini/travel/trips?${nextSearch.toString()}`);
      scrollViewportToTop();
      return;
    }
    if (id === "ride") return goToResult("trips", "ride-booked");
    if (id === "privileges") return goToResult("rewards", "redeemed");
    notify(`${detail?.label ?? app.title}: prototype action completed`);
  };
  const completeTask = () => {
    if (id === "express" && activeTab.id === "track") return goToResult("track", "tracked");
    notify(`${activeTab.label}: prototype action completed`);
  };
  const reserveTravelRoom = (hotel: TravelHotel, room: TravelRoomOption) => {
    const nextSearch = new URLSearchParams(location.search);
    const dateParam = nextSearch.get("dates") ?? travelDateOptions[0].id;
    const dateId = travelDateOptions.some((option) => option.id === dateParam) ? dateParam : travelDateOptions[0].id;
    const guestsParam = Number(nextSearch.get("guests") ?? 2);
    const guests = Number.isFinite(guestsParam) ? Math.min(6, Math.max(1, guestsParam)) : 2;
    saveTravelTrip({ hotelId: hotel.id, roomId: room.id, dateId, guests });
    nextSearch.set("result", "trip-added");
    nextSearch.set("hotel", hotel.id);
    nextSearch.set("room", room.id);
    const query = nextSearch.toString();
    navigate(`/mini/travel/trips${query ? `?${query}` : ""}`);
    scrollViewportToTop();
  };
  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const headerTitle = hotelId
    ? travelHotel?.name ?? "Stay unavailable"
    : productId
    ? product?.name ?? "Product unavailable"
    : detail?.label ?? app.title;

  return (
    <div className="mini-app-screen">
      <header className="mini-app-header">
        <button className={`icon-button ${detail || productId || hotelId ? "" : "invisible"}`} onClick={backToTab} aria-label="Back within service">
          <ArrowLeft size={21} />
        </button>
        <div><small>{id === "market" ? "One Taladi marketplace" : "ALL mini-app"}</small><strong>{headerTitle}</strong></div>
        <button className="close-button" onClick={closeMiniApp} aria-label="Close service and return to ALL">
          <X size={22} />
        </button>
      </header>
      <div className="mini-app-content">
        {hotelId && id === "travel" ? (
          travelHotel ? (
            <TravelHotelDetail
              hotel={travelHotel}
              onReserve={(room) => reserveTravelRoom(travelHotel, room)}
            />
          ) : (
            <TravelHotelMissing onBack={backToTab} />
          )
        ) : productId && id === "market" ? (
          product ? (
            <TaladiProductDetail
              item={product}
              onAdd={(quantity) => {
                addToCart(product.id, quantity);
                goToResult("cart", "added");
              }}
            />
          ) : (
            <TaladiProductMissing onBack={backToTab} />
          )
        ) : detail ? (
          <MiniAppDetail entry={detail} appId={id} onAction={completeDetail} />
        ) : (
          <MiniAppLanding
            appId={id}
            tabId={activeTab.id}
            tabLabel={activeTab.label}
            entries={entries}
            result={result}
            onOpen={openDetail}
            onOpenProduct={openProduct}
            onOpenTravelHotel={openTravelHotel}
            onTaskAction={completeTask}
          />
        )}
      </div>
      <nav className="bottom-nav mini-bottom-nav" aria-label={`${app.title} navigation`}>
        {app.nav.map(({ id: navId, label, icon: Icon }) => (
          <button key={navId} className={activeTab.id === navId ? "active" : ""} onClick={() => goTab(navId)}>
            <Icon size={21} strokeWidth={1.8} />
            <span>{label}</span>
            {id === "market" && navId === "cart" && cartCount > 0 ? <em className="nav-badge">{cartCount}</em> : null}
          </button>
        ))}
      </nav>
    </div>
  );
}

function MiniAppLanding({
  appId,
  tabId,
  tabLabel,
  entries,
  result,
  onOpen,
  onOpenProduct,
  onOpenTravelHotel,
  onTaskAction,
}: {
  appId: MiniAppId;
  tabId: string;
  tabLabel: string;
  entries: RoadmapFunction[];
  result: string | null;
  onOpen: (entry: RoadmapFunction) => void;
  onOpenProduct: (item: MarketplaceItem) => void;
  onOpenTravelHotel: (hotel: TravelHotel) => void;
  onTaskAction: () => void;
}) {
  const app = miniApps[appId];
  const Icon = app.icon;
  const { milestone } = usePrototype();
  if (appId === "market") {
    return (
      <TaladiMarketplaceLanding
        tabId={tabId}
        result={result}
        onOpenProduct={onOpenProduct}
      />
    );
  }
  if (appId === "travel") {
    return (
      <TravelExperience
        tabId={tabId}
        result={result}
        entries={entries}
        onOpenService={onOpen}
        onOpenHotel={onOpenTravelHotel}
      />
    );
  }
  const discoveryEntries = entriesForMiniTab(appId, tabId, entries);
  const isDiscovery = discoveryEntries !== null;
  return (
    <>
      <section className="mini-app-hero">
        <div><small>{tabLabel}</small><h1>{app.title}</h1><p>{app.eyebrow}</p></div>
        <span><Icon size={31} /></span>
      </section>
      {(tabLabel === "Search" || tabLabel === "Track" || tabLabel === "Book" || tabLabel === "Send") && (
        <div className="mini-search"><Search size={17} /><span>{app.prompts?.[tabLabel.toLowerCase()] ?? `Search ${app.title.toLowerCase()}`}</span></div>
      )}
      {isDiscovery ? (
        <>
          <PlaceholderBanner label={`${app.title} campaign`} />
          <SectionTitle title={miniSectionTitle(tabLabel)} action="See all" />
          <div className="mini-entry-list">
          {discoveryEntries.length > 0 ? discoveryEntries.map((entry) => {
          const future = entry.availableFrom > milestone;
          const EntryIcon = serviceIcons[entry.id] ?? app.icon;
          return (
            <button key={entry.id} className={future ? "future" : ""} disabled={future} onClick={() => onOpen(entry)}>
              <span><EntryIcon size={21} /></span>
              <div><strong>{entry.label}</strong><small>{entry.partner}</small></div>
              {future ? <em>Month {entry.availableFrom}</em> : entry.pending ? <em>Partner pending</em> : null}
              {!future && <ChevronRight size={17} />}
            </button>
          );
          }) : <EmptyState label={`No ${tabLabel.toLowerCase()} services yet`} />}
          </div>
        </>
      ) : (
        <MiniTaskTab appId={appId} tabId={tabId} tabLabel={tabLabel} result={result} onAction={onTaskAction} />
      )}
    </>
  );
}

const travelDestinationById = new Map(
  travelDestinations.map((destination) => [destination.id, destination]),
);
const travelDateOptions = [
  { id: "weekend", label: "28–30 Jul", nights: 2 },
  { id: "midweek", label: "3–6 Aug", nights: 3 },
  { id: "long-stay", label: "10–15 Aug", nights: 5 },
];

interface TravelSearchCriteria {
  destinationId: string;
  dateId: string;
  guests: number;
}

function TravelExperience({
  tabId,
  result,
  entries,
  onOpenService,
  onOpenHotel,
}: {
  tabId: string;
  result: string | null;
  entries: RoadmapFunction[];
  onOpenService: (entry: RoadmapFunction) => void;
  onOpenHotel: (hotel: TravelHotel) => void;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destinationParam = searchParams.get("destination") ?? "bangkok";
  const destinationId = travelDestinationById.has(destinationParam) ? destinationParam : "bangkok";
  const dateParam = searchParams.get("dates") ?? travelDateOptions[0].id;
  const dateId = travelDateOptions.some((option) => option.id === dateParam) ? dateParam : travelDateOptions[0].id;
  const guestsParam = Number(searchParams.get("guests") ?? 2);
  const guests = Number.isFinite(guestsParam) ? Math.min(6, Math.max(1, guestsParam)) : 2;

  const routeWithCriteria = (targetTab: "explore" | "search", criteria: TravelSearchCriteria) => {
    const next = new URLSearchParams(searchParams);
    next.delete("result");
    next.delete("hotel");
    next.delete("room");
    next.delete("service");
    next.set("destination", criteria.destinationId);
    next.set("dates", criteria.dateId);
    next.set("guests", String(criteria.guests));
    navigate(`/mini/travel/${targetTab}?${next.toString()}`);
  };
  const browseStays = () => routeWithCriteria("explore", { destinationId, dateId, guests });

  if (tabId === "search") {
    return (
      <TravelSearchResults
        criteria={{ destinationId, dateId, guests }}
        onSearch={(criteria) => routeWithCriteria("search", criteria)}
        onOpenHotel={onOpenHotel}
      />
    );
  }
  if (tabId === "trips") {
    return <TravelTrips result={result} onBrowse={browseStays} />;
  }
  if (tabId === "saved") {
    return <TravelSaved onBrowse={browseStays} onOpenHotel={onOpenHotel} />;
  }
  return (
    <TravelExplore
      criteria={{ destinationId, dateId, guests }}
      entries={entries}
      onSearch={(criteria) => routeWithCriteria("search", criteria)}
      onOpenService={onOpenService}
      onOpenHotel={onOpenHotel}
    />
  );
}

function TravelExplore({
  criteria,
  entries,
  onSearch,
  onOpenService,
  onOpenHotel,
}: {
  criteria: TravelSearchCriteria;
  entries: RoadmapFunction[];
  onSearch: (criteria: TravelSearchCriteria) => void;
  onOpenService: (entry: RoadmapFunction) => void;
  onOpenHotel: (hotel: TravelHotel) => void;
}) {
  const featuredHotels = travelHotels.filter((hotel) => hotel.featured);
  return (
    <div className="travel-experience">
      <section className="travel-title-row">
        <div><span>Thailand travel</span><h1>Find your next stay</h1><p>Compare trusted hotels and build a trip in a few taps.</p></div>
        <span className="travel-mark"><BedDouble size={25} /></span>
      </section>
      <div className="travel-service-rail" aria-label="Available travel services">
        {entries.map((entry) => {
          const EntryIcon = serviceIcons[entry.id] ?? BedDouble;
          const label = entry.id === "hotel" ? "Stays" : entry.label.replace("OTA — ", "");
          return (
            <button
              className={entry.id === "hotel" ? "active" : ""}
              key={entry.id}
              onClick={() => entry.id === "hotel" ? onSearch(criteria) : onOpenService(entry)}
            >
              <EntryIcon size={17} /><span>{label}</span>
            </button>
          );
        })}
      </div>
      <section className="travel-search-hero">
        <span className="wire-kicker">Hotel search</span>
        <h2>Thailand stays for every kind of trip</h2>
        <TravelSearchBox key={`${criteria.destinationId}-${criteria.dateId}-${criteria.guests}`} criteria={criteria} onSearch={onSearch} />
      </section>
      <button className="travel-deal-banner" onClick={() => onSearch({ ...criteria, destinationId: "bangkok" })}>
        <span><strong>Member prices in Bangkok</strong><small>Sample savings up to 25% for this demo</small></span>
        <ArrowRight size={18} />
      </button>
      <SectionTitle title="Popular destinations" />
      <div className="travel-destination-rail">
        {travelDestinations.map((destination) => (
          <button key={destination.id} onClick={() => onSearch({ ...criteria, destinationId: destination.id })}>
            <TravelDestinationArt destination={destination} />
            <strong>{destination.name}</strong>
            <small>{destination.propertyCount.toLocaleString("en-US")} stays</small>
          </button>
        ))}
      </div>
      <SectionTitle title="Recommended stays" />
      <div className="travel-hotel-list compact-list">
        {featuredHotels.map((hotel) => (
          <TravelHotelCard key={hotel.id} hotel={hotel} onOpen={onOpenHotel} />
        ))}
      </div>
    </div>
  );
}

function TravelSearchBox({
  criteria,
  onSearch,
}: {
  criteria: TravelSearchCriteria;
  onSearch: (criteria: TravelSearchCriteria) => void;
}) {
  const [destinationId, setDestinationId] = useState(criteria.destinationId);
  const [dateId, setDateId] = useState(criteria.dateId);
  const [guests, setGuests] = useState(criteria.guests);
  const currentDateIndex = Math.max(0, travelDateOptions.findIndex((option) => option.id === dateId));
  const currentDates = travelDateOptions[currentDateIndex];
  const cycleDates = () => {
    const nextDate = travelDateOptions[(currentDateIndex + 1) % travelDateOptions.length];
    setDateId(nextDate.id);
  };
  return (
    <div className="travel-search-box">
      <label className="travel-destination-input">
        <MapPin size={17} />
        <span><small>Destination</small>
          <select value={destinationId} onChange={(event) => setDestinationId(event.target.value)} aria-label="Travel destination">
            {travelDestinations.map((destination) => <option key={destination.id} value={destination.id}>{destination.name}</option>)}
          </select>
        </span>
        <ChevronRight size={16} />
      </label>
      <div className="travel-search-fields">
        <button onClick={cycleDates} aria-label={`Travel dates ${currentDates.label}. Select next date range`}>
          <CalendarDays size={17} /><span><small>Dates</small><strong>{currentDates.label}</strong></span>
        </button>
        <div className="travel-guest-field">
          <Users size={17} />
          <span><small>Guests</small><strong>{guests} {guests === 1 ? "guest" : "guests"}</strong></span>
          <span className="travel-guest-controls">
            <button onClick={() => setGuests((current) => Math.max(1, current - 1))} aria-label="Remove a guest"><Minus size={12} /></button>
            <button onClick={() => setGuests((current) => Math.min(6, current + 1))} aria-label="Add a guest"><Plus size={12} /></button>
          </span>
        </div>
      </div>
      <button className="travel-search-button" onClick={() => onSearch({ destinationId, dateId, guests })}>
        Search stays <Search size={16} />
      </button>
    </div>
  );
}

type TravelSort = "recommended" | "price" | "rating" | "flexible";

function TravelSearchResults({
  criteria,
  onSearch,
  onOpenHotel,
}: {
  criteria: TravelSearchCriteria;
  onSearch: (criteria: TravelSearchCriteria) => void;
  onOpenHotel: (hotel: TravelHotel) => void;
}) {
  const [sort, setSort] = useState<TravelSort>("recommended");
  const destination = travelDestinationById.get(criteria.destinationId) ?? travelDestinations[0];
  const dates = travelDateOptions.find((option) => option.id === criteria.dateId) ?? travelDateOptions[0];
  const matchingHotels = travelHotels.filter((hotel) => hotel.destinationId === destination.id);
  const visibleHotels = [...matchingHotels]
    .filter((hotel) => sort !== "flexible" || hotel.freeCancellation)
    .sort((left, right) => {
      if (sort === "price") return left.pricePerNight - right.pricePerNight;
      if (sort === "rating") return right.rating - left.rating;
      return Number(Boolean(right.featured)) - Number(Boolean(left.featured));
    });
  return (
    <div className="travel-experience travel-results-page">
      <section className="travel-results-heading">
        <span className="wire-kicker">Stay results</span>
        <h1>{destination.name}</h1>
        <p>{dates.label} · {criteria.guests} guests · {visibleHotels.length} demo stays</p>
      </section>
      <TravelSearchBox key={`${criteria.destinationId}-${criteria.dateId}-${criteria.guests}`} criteria={criteria} onSearch={onSearch} />
      <div className="travel-filter-rail" aria-label="Sort and filter stays">
        {([
          ["recommended", "Recommended"],
          ["price", "Lowest price"],
          ["rating", "Guest rating"],
          ["flexible", "Free cancellation"],
        ] as const).map(([id, label]) => (
          <button key={id} className={sort === id ? "active" : ""} onClick={() => setSort(id)} aria-pressed={sort === id}>
            {id === "recommended" ? <SlidersHorizontal size={13} /> : null}{label}
          </button>
        ))}
      </div>
      {visibleHotels.length > 0 ? (
        <div className="travel-hotel-list">
          {visibleHotels.map((hotel) => <TravelHotelCard key={hotel.id} hotel={hotel} onOpen={onOpenHotel} />)}
        </div>
      ) : (
        <EmptyState label={`No flexible stays in ${destination.name}`} />
      )}
    </div>
  );
}

function TravelDestinationArt({ destination }: { destination: (typeof travelDestinations)[number] }) {
  return (
    <span className={`travel-destination-art tone-${destination.artTone}`}>
      <MapPin size={25} />
      <small>{destination.region}</small>
    </span>
  );
}

function TravelHotelArt({ hotel, large = false }: { hotel: TravelHotel; large?: boolean }) {
  return (
    <span className={`travel-hotel-art tone-${hotel.artTone} ${large ? "large" : ""}`}>
      {hotel.badge ? <em>{hotel.badge}</em> : null}
      <BedDouble size={large ? 58 : 34} strokeWidth={1.45} />
      <small>HOTEL</small>
    </span>
  );
}

function TravelHotelCard({ hotel, onOpen }: { hotel: TravelHotel; onOpen: (hotel: TravelHotel) => void }) {
  const { savedTravelHotelIds, toggleSavedTravelHotel } = usePrototype();
  const saved = savedTravelHotelIds.includes(hotel.id);
  return (
    <article className="travel-hotel-card">
      <button className="travel-hotel-main" onClick={() => onOpen(hotel)}>
        <TravelHotelArt hotel={hotel} />
        <span className="travel-hotel-copy">
          <span className="travel-rating"><b>{hotel.rating}</b><small>Excellent · {hotel.reviewCount.toLocaleString("en-US")} reviews</small></span>
          <strong>{hotel.name}</strong>
          <small>{hotel.area}</small>
          {hotel.freeCancellation ? <em>Free cancellation</em> : null}
          <span className="travel-hotel-price">
            <small>per night</small>
            {hotel.originalPrice ? <del>{formatBaht(hotel.originalPrice)}</del> : null}
            <b>{formatBaht(hotel.pricePerNight)}</b>
          </span>
        </span>
      </button>
      <button
        className={`travel-save-button ${saved ? "saved" : ""}`}
        onClick={() => toggleSavedTravelHotel(hotel.id)}
        aria-label={`${saved ? "Remove" : "Save"} ${hotel.name}`}
        aria-pressed={saved}
      >
        <Heart size={15} fill={saved ? "currentColor" : "none"} />
      </button>
    </article>
  );
}

function TravelHotelDetail({ hotel, onReserve }: { hotel: TravelHotel; onReserve: (room: TravelRoomOption) => void }) {
  const { savedTravelHotelIds, toggleSavedTravelHotel } = usePrototype();
  const [searchParams] = useSearchParams();
  const roomParam = searchParams.get("room");
  const initialRoomId = hotel.rooms.some((room) => room.id === roomParam)
    ? roomParam ?? ""
    : hotel.rooms[0]?.id ?? "";
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const saved = savedTravelHotelIds.includes(hotel.id);
  const selectedRoom = hotel.rooms.find((room) => room.id === selectedRoomId) ?? hotel.rooms[0];
  const dateId = searchParams.get("dates") ?? travelDateOptions[0].id;
  const dateOption = travelDateOptions.find((option) => option.id === dateId) ?? travelDateOptions[0];
  const guestsValue = Number(searchParams.get("guests") ?? 2);
  const guests = Number.isFinite(guestsValue) ? Math.min(6, Math.max(1, guestsValue)) : 2;
  if (!selectedRoom) return <TravelHotelMissing onBack={() => window.history.back()} />;
  const total = selectedRoom.pricePerNight * dateOption.nights;
  return (
    <div className="travel-hotel-detail">
      <div className="travel-detail-art-wrap">
        <TravelHotelArt hotel={hotel} large />
        <button
          className={`travel-detail-save ${saved ? "saved" : ""}`}
          onClick={() => toggleSavedTravelHotel(hotel.id)}
          aria-label={`${saved ? "Remove" : "Save"} ${hotel.name}`}
          aria-pressed={saved}
        ><Heart size={17} fill={saved ? "currentColor" : "none"} /></button>
      </div>
      <section className="travel-detail-copy">
        <span className="travel-rating"><b>{hotel.rating}</b><small>Excellent · {hotel.reviewCount.toLocaleString("en-US")} reviews</small></span>
        <h1>{hotel.name}</h1>
        <p className="travel-location"><MapPin size={13} /> {hotel.area}</p>
        <p>{hotel.description}</p>
        <div className="travel-amenities">
          {hotel.amenities.map((amenity) => <span key={amenity}><Check size={11} />{amenity}</span>)}
        </div>
      </section>
      <section className="travel-stay-summary">
        <div><CalendarDays size={17} /><span><small>Stay</small><strong>{dateOption.label} · {dateOption.nights} nights</strong></span></div>
        <div><Users size={17} /><span><small>Guests</small><strong>{guests} {guests === 1 ? "guest" : "guests"}</strong></span></div>
      </section>
      <section className="travel-room-section">
        <span className="wire-kicker">Choose a room</span>
        <h2>Available options</h2>
        <div className="travel-room-list">
          {hotel.rooms.map((room) => (
            <button key={room.id} className={selectedRoom.id === room.id ? "active" : ""} onClick={() => setSelectedRoomId(room.id)} aria-pressed={selectedRoom.id === room.id}>
              <span><strong>{room.name}</strong><small>{room.bed}</small></span>
              <span>{room.benefits.map((benefit) => <small key={benefit}><Check size={10} />{benefit}</small>)}</span>
              <b>{formatBaht(room.pricePerNight)}<small>/night</small></b>
            </button>
          ))}
        </div>
      </section>
      <section className="travel-price-summary">
        <span><small>{dateOption.nights} nights · taxes included in demo</small><strong>{formatBaht(total)}</strong></span>
        <button onClick={() => onReserve(selectedRoom)}>Reserve room <ArrowRight size={16} /></button>
      </section>
      <p className="travel-demo-note">Prototype only — no reservation or payment will be made.</p>
    </div>
  );
}

function TravelTrips({ result, onBrowse }: { result: string | null; onBrowse: () => void }) {
  const { milestone, showFuture, travelTrip, scrollViewportToTop } = usePrototype();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const service = roadmapFunctions.find(
    (entry) =>
      entry.id === searchParams.get("service")
      && entry.miniApp === "travel"
      && (entry.availableFrom <= milestone || showFuture),
  );
  if (result === "service-preview" && service) {
    const ServiceIcon = serviceIcons[service.id] ?? Sparkles;
    return (
      <section className="travel-trips-page">
        <div className="travel-service-preview">
          <span><ServiceIcon size={27} /></span><small>Partner availability demo</small><h1>{service.label}</h1>
          <p>Sample availability was checked with {service.partner}. No booking or request was created.</p>
        </div>
        <div className="travel-reference"><span>Prototype status</span><strong>Availability previewed</strong></div>
        <button className="secondary-button" onClick={onBrowse}>Back to Travel</button>
      </section>
    );
  }
  const queryGuestsValue = Number(searchParams.get("guests") ?? 2);
  const queryTrip: SimulatedTravelTrip | null = searchParams.get("hotel") && searchParams.get("room")
    ? {
        hotelId: searchParams.get("hotel") ?? "",
        roomId: searchParams.get("room") ?? "",
        dateId: searchParams.get("dates") ?? travelDateOptions[0].id,
        guests: Number.isFinite(queryGuestsValue) ? Math.min(6, Math.max(1, queryGuestsValue)) : 2,
      }
    : null;
  const activeTrip = travelTrip ?? queryTrip;
  const hotel = activeTrip ? travelHotelById.get(activeTrip.hotelId) : undefined;
  const room = hotel?.rooms.find((candidate) => candidate.id === activeTrip?.roomId);
  const dateOption = travelDateOptions.find((option) => option.id === activeTrip?.dateId) ?? travelDateOptions[0];
  const openTripHotel = () => {
    if (!hotel || !room || !activeTrip) return;
    const next = new URLSearchParams(searchParams);
    next.delete("result");
    next.delete("service");
    next.set("hotel", hotel.id);
    next.set("room", room.id);
    next.set("dates", activeTrip.dateId);
    next.set("guests", String(activeTrip.guests));
    navigate(`/mini/travel/trips/hotel/${hotel.id}?${next.toString()}`);
    scrollViewportToTop();
  };
  if (hotel && room && activeTrip) {
    return (
      <section className="travel-trips-page">
        {result === "trip-added" ? (
          <div className="travel-trip-success"><span><Check size={25} /></span><small>Demo reservation created</small><h1>Your stay is ready</h1><p>This confirmation is simulated and no booking was placed.</p></div>
        ) : (
          <div className="travel-trips-overview"><span className="wire-kicker">Your travel</span><h1>Upcoming stay</h1><p>Your simulated reservation remains available for this browser session.</p></div>
        )}
        <button className="travel-booking-card" onClick={openTripHotel}>
          <TravelHotelArt hotel={hotel} />
          <span><small>Upcoming · {dateOption.label}</small><strong>{hotel.name}</strong><em>{room.name} · {dateOption.nights} nights · {activeTrip.guests} guests</em><b>{formatBaht(room.pricePerNight * dateOption.nights)}</b></span>
          <ChevronRight size={17} />
        </button>
        <div className="travel-reference"><span>Prototype reference</span><strong>ALL-TRIP-0726</strong></div>
        <button className="secondary-button" onClick={onBrowse}>Browse another stay</button>
      </section>
    );
  }
  return (
    <section className="taladi-simple-page travel-empty-page">
      <span className="wire-kicker">Your travel</span><h1>Trips</h1><p>Hotel reservations created in this demo will appear here.</p>
      <EmptyState label="No upcoming stays yet" />
      <button className="primary-button" onClick={onBrowse}>Find a stay</button>
    </section>
  );
}

function TravelSaved({ onBrowse, onOpenHotel }: { onBrowse: () => void; onOpenHotel: (hotel: TravelHotel) => void }) {
  const { savedTravelHotelIds } = usePrototype();
  const savedHotels = savedTravelHotelIds.flatMap((hotelId) => {
    const hotel = travelHotelById.get(hotelId);
    return hotel ? [hotel] : [];
  });
  return (
    <section className="travel-saved-page">
      <span className="wire-kicker">Shortlist</span><h1>Saved stays</h1><p>Keep interesting hotels together while comparing your trip.</p>
      {savedHotels.length > 0 ? (
        <div className="travel-hotel-list">{savedHotels.map((hotel) => <TravelHotelCard key={hotel.id} hotel={hotel} onOpen={onOpenHotel} />)}</div>
      ) : (
        <><EmptyState label="No saved stays yet" /><button className="primary-button" onClick={onBrowse}>Browse popular stays</button></>
      )}
    </section>
  );
}

function TravelHotelMissing({ onBack }: { onBack: () => void }) {
  return (
    <section className="taladi-simple-page travel-empty-page">
      <EmptyState label="This stay is no longer available" />
      <button className="primary-button" onClick={onBack}>Return to Travel</button>
    </section>
  );
}

const marketplaceCategoryIds = new Set<string>(
  marketplaceCategories.map((category) => category.id),
);
const marketplaceCategoryById = new Map(
  marketplaceCategories.map((category) => [category.id, category]),
);
const bahtFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatBaht(value: number) {
  return `฿${bahtFormatter.format(value)}`;
}

function TaladiMarketplaceLanding({
  tabId,
  result,
  onOpenProduct,
}: {
  tabId: string;
  result: string | null;
  onOpenProduct: (item: MarketplaceItem) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());
  const categoryParam = searchParams.get("category");
  const validCategory = categoryParam && marketplaceCategoryIds.has(categoryParam)
    ? categoryParam as MarketplaceCategoryId
    : null;
  const invalidCategory = Boolean(categoryParam && !validCategory);
  const selectedCategory: MarketplaceCategoryId | "all" = validCategory ?? "all";

  const selectCategory = (categoryId: MarketplaceCategoryId | "all") => {
    const next = new URLSearchParams(searchParams);
    next.delete("result");
    if (categoryId === "all") next.delete("category");
    else next.set("category", categoryId);
    setSearchParams(next);
  };
  const openCategory = (categoryId: MarketplaceCategoryId | "all") => {
    const next = new URLSearchParams(searchParams);
    next.delete("result");
    if (categoryId === "all") next.delete("category");
    else next.set("category", categoryId);
    const query = next.toString();
    navigate(`/mini/market/shop${query ? `?${query}` : ""}`);
  };

  if (tabId === "categories") {
    return <TaladiCategoryDirectory onSelect={openCategory} />;
  }
  if (tabId === "cart") {
    return <TaladiCart result={result} onContinue={() => openCategory("all")} />;
  }
  if (tabId === "orders") {
    return (
      <section className="taladi-simple-page">
        <span className="wire-kicker">Taladi activity</span>
        <h1>Orders</h1>
        <p>Completed purchases will appear here when checkout is added to the prototype.</p>
        <EmptyState label="No marketplace orders yet" />
      </section>
    );
  }

  const visibleItems = marketplaceItems.filter((item) => {
    const categoryMatches = selectedCategory === "all" || item.categoryId === selectedCategory;
    const categoryLabel = marketplaceCategoryById.get(item.categoryId)?.label ?? "";
    const searchMatches = !deferredSearchTerm || [item.name, item.merchant, categoryLabel]
      .some((value) => value.toLowerCase().includes(deferredSearchTerm));
    return categoryMatches && searchMatches;
  });
  const isFiltered = selectedCategory !== "all" || Boolean(deferredSearchTerm);
  const selectedLabel = selectedCategory === "all"
    ? "All marketplace items"
    : marketplaceCategoryById.get(selectedCategory)?.label ?? "Marketplace items";

  return (
    <div className="taladi-marketplace">
      <section className="taladi-title-row">
        <div><span>Thailand marketplace</span><h1>Taladi</h1><p>Shop essentials, vouchers and local travel deals in one place.</p></div>
        <span className="taladi-mark">T</span>
      </section>
      <label className="taladi-search">
        <Search size={17} />
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products, coupons and deals"
          aria-label="Search Taladi marketplace"
        />
      </label>
      <SectionTitle title="Popular categories" />
      <div className="taladi-category-rail" aria-label="Popular marketplace categories">
        <button className={selectedCategory === "all" ? "active" : ""} onClick={() => selectCategory("all")}>
          <span><Grid2X2 size={20} /></span><strong>All</strong>
        </button>
        {marketplaceCategories
          .filter((category) => category.popular)
          .slice()
          .sort((left, right) => left.order - right.order)
          .map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                className={selectedCategory === category.id ? "active" : ""}
                key={category.id}
                onClick={() => selectCategory(category.id)}
              >
                <span><CategoryIcon size={20} /></span><strong>{category.label}</strong>
              </button>
            );
          })}
      </div>
      {invalidCategory ? <p className="taladi-notice">That category is unavailable. Showing all Taladi items.</p> : null}
      {isFiltered ? (
        <>
          <SectionTitle title={deferredSearchTerm ? "Search results" : selectedLabel} />
          {visibleItems.length > 0 ? (
            <div className="taladi-product-grid">
              {visibleItems.map((item) => <MarketplaceProductCard key={item.id} item={item} onOpen={onOpenProduct} />)}
            </div>
          ) : (
            <EmptyState label="No products match this search" />
          )}
        </>
      ) : (
        <>
          <section className="taladi-campaign">
            <span>Made for your Thailand stay</span>
            <h2>Essentials and local deals, ready when you arrive.</h2>
            <p>Discover trusted products, digital vouchers and tourist-friendly offers.</p>
            <button onClick={() => selectCategory("deals")}>Explore travel deals <ArrowRight size={15} /></button>
          </section>
          <SectionTitle title="Featured vouchers & deals" />
          <div className="taladi-featured-rail">
            {marketplaceItems
              .filter((item) => item.featured && (item.kind === "coupon" || item.kind === "voucher" || item.kind === "deal"))
              .map((item) => <MarketplaceProductCard key={item.id} item={item} onOpen={onOpenProduct} compact />)}
          </div>
          <SectionTitle title="Popular near you" />
          <div className="taladi-product-grid">
            {marketplaceItems.filter((item) => item.featured).slice(0, 6).map((item) => (
              <MarketplaceProductCard key={item.id} item={item} onOpen={onOpenProduct} />
            ))}
          </div>
          <SectionTitle title="Travel essentials" />
          <div className="taladi-product-grid">
            {marketplaceItems.filter((item) => item.travelEssential).map((item) => (
              <MarketplaceProductCard key={item.id} item={item} onOpen={onOpenProduct} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MarketplaceProductCard({
  item,
  onOpen,
  compact = false,
}: {
  item: MarketplaceItem;
  onOpen: (item: MarketplaceItem) => void;
  compact?: boolean;
}) {
  const category = marketplaceCategoryById.get(item.categoryId);
  return (
    <button className={`taladi-product-card ${compact ? "compact" : ""}`} onClick={() => onOpen(item)}>
      <MarketplaceProductArt item={item} />
      <span className="taladi-product-copy">
        <small>{category?.label} · {item.merchant}</small>
        <strong>{item.name}</strong>
        <span className="taladi-price">
          <b>{formatBaht(item.price)}</b>
          {item.originalPrice ? <del>{formatBaht(item.originalPrice)}</del> : null}
        </span>
      </span>
    </button>
  );
}

function MarketplaceProductArt({ item, large = false }: { item: MarketplaceItem; large?: boolean }) {
  const CategoryIcon = marketplaceCategoryById.get(item.categoryId)?.icon ?? ShoppingCart;
  return (
    <span className={`taladi-product-art tone-${item.artTone} ${large ? "large" : ""}`}>
      {item.badge ? <em>{item.badge}</em> : null}
      <CategoryIcon size={large ? 60 : 34} strokeWidth={1.55} />
      <small>PRODUCT</small>
    </span>
  );
}

function TaladiCategoryDirectory({
  onSelect,
}: {
  onSelect: (categoryId: MarketplaceCategoryId) => void;
}) {
  return (
    <section className="taladi-simple-page">
      <span className="wire-kicker">Scalable marketplace directory</span>
      <h1>All categories</h1>
      <p>New categories can be added to the catalog without creating another mini-app.</p>
      <div className="taladi-category-directory">
        {marketplaceCategories.slice().sort((left, right) => left.order - right.order).map((category) => {
          const CategoryIcon = category.icon;
          const itemCount = marketplaceItems.filter((item) => item.categoryId === category.id).length;
          return (
            <button key={category.id} onClick={() => onSelect(category.id)}>
              <span><CategoryIcon size={25} /></span>
              <strong>{category.label}</strong>
              <small>{itemCount} sample items</small>
              <ChevronRight size={17} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TaladiProductDetail({
  item,
  onAdd,
}: {
  item: MarketplaceItem;
  onAdd: (quantity: number) => void;
}) {
  const [selectedOption, setSelectedOption] = useState(item.options[0] ?? "Standard");
  const [quantity, setQuantity] = useState(1);
  const category = marketplaceCategoryById.get(item.categoryId);
  return (
    <div className="taladi-product-detail">
      <MarketplaceProductArt item={item} large />
      <section className="taladi-detail-copy">
        <span>{category?.label} · {item.kind}</span>
        <h1>{item.name}</h1>
        <p className="taladi-merchant">Sold by {item.merchant}</p>
        <div className="taladi-detail-price">
          <strong>{formatBaht(item.price)}</strong>
          {item.originalPrice ? <del>{formatBaht(item.originalPrice)}</del> : null}
        </div>
        <p>{item.description}</p>
      </section>
      <section className="taladi-option-panel">
        <strong>Choose an option</strong>
        <div className="taladi-option-list">
          {item.options.map((option) => (
            <button className={selectedOption === option ? "active" : ""} key={option} onClick={() => setSelectedOption(option)}>
              {option}
            </button>
          ))}
        </div>
        <div className="taladi-quantity-row">
          <span><strong>Quantity</strong><small>{selectedOption}</small></span>
          <div>
            <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
            <strong>{quantity}</strong>
            <button onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
          </div>
        </div>
      </section>
      <button className="primary-button" onClick={() => onAdd(quantity)}>
        Add {quantity} to cart · {formatBaht(item.price * quantity)} <ShoppingCart size={17} />
      </button>
    </div>
  );
}

function TaladiProductMissing({ onBack }: { onBack: () => void }) {
  return (
    <section className="taladi-simple-page">
      <EmptyState label="This Taladi product is unavailable" />
      <button className="primary-button" onClick={onBack}>Return to marketplace</button>
    </section>
  );
}

function TaladiCart({ result, onContinue }: { result: string | null; onContinue: () => void }) {
  const { cartLines, updateCartQuantity, removeFromCart } = usePrototype();
  const detailedLines = cartLines.flatMap((line) => {
    const item = marketplaceItemById.get(line.itemId);
    return item ? [{ ...line, item }] : [];
  });
  const subtotal = detailedLines.reduce(
    (total, line) => total + line.item.price * line.quantity,
    0,
  );
  if (detailedLines.length === 0) {
    return (
      <section className="taladi-simple-page taladi-empty-cart">
        <EmptyState label="Your Taladi cart is empty" />
        <button className="primary-button" onClick={onContinue}>Start shopping</button>
      </section>
    );
  }
  return (
    <section className="taladi-simple-page">
      <span className="wire-kicker">Taladi marketplace</span>
      <h1>Your cart</h1>
      <p>Review the products added during this prototype session.</p>
      {result === "added" ? <p className="taladi-cart-success"><Check size={16} /> Item added to your cart</p> : null}
      <div className="taladi-cart-lines">
        {detailedLines.map(({ item, quantity }) => (
          <article key={item.id}>
            <MarketplaceProductArt item={item} />
            <div><strong>{item.name}</strong><small>{item.merchant}</small><b>{formatBaht(item.price * quantity)}</b></div>
            <div className="taladi-cart-controls">
              <button onClick={() => updateCartQuantity(item.id, quantity - 1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={14} /></button>
              <span>{quantity}</span>
              <button onClick={() => updateCartQuantity(item.id, quantity + 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={14} /></button>
              <button className="remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={14} /></button>
            </div>
          </article>
        ))}
      </div>
      <div className="taladi-cart-summary"><span>Subtotal</span><strong>{formatBaht(subtotal)}</strong></div>
      <p className="taladi-checkout-note">Checkout and payment are intentionally outside this wireframe.</p>
      <button className="secondary-button" onClick={onContinue}>Continue shopping</button>
    </section>
  );
}

function entriesForMiniTab(
  appId: MiniAppId,
  tabId: string,
  entries: RoadmapFunction[],
): RoadmapFunction[] | null {
  const discoveryTabs: Record<MiniAppId, string[]> = {
    market: ["shop"],
    travel: ["explore", "search"],
    living: ["overview", "services"],
    wellbeing: ["discover", "care", "protection"],
    ride: ["book"],
    express: ["send"],
    privileges: ["discover", "coupons"],
  };
  if (!discoveryTabs[appId].includes(tabId)) return null;
  if (appId === "wellbeing" && tabId === "care") {
    return entries.filter((entry) => entry.id === "telemed" || entry.id === "telepharma");
  }
  if (appId === "wellbeing" && tabId === "protection") {
    return entries.filter((entry) => entry.id === "insurance" || entry.id === "protection");
  }
  if (appId === "privileges" && tabId === "coupons") {
    return entries.filter((entry) => entry.id === "food-coupon");
  }
  return entries;
}

const miniResults: Record<string, { title: string; detail: string }> = {
  added: { title: "Item added to cart", detail: "Market prototype cart updated" },
  "trip-added": { title: "Trip added", detail: "Saved to your upcoming travel" },
  "ride-booked": { title: "Ride requested", detail: "Driver matching is simulated" },
  tracked: { title: "Parcel in transit", detail: "Latest scan · Distribution centre" },
  redeemed: { title: "Benefit redeemed", detail: "Reward added to your activity" },
};

function MiniTaskTab({
  appId,
  tabId,
  tabLabel,
  result,
  onAction,
}: {
  appId: MiniAppId;
  tabId: string;
  tabLabel: string;
  result: string | null;
  onAction: () => void;
}) {
  const resultState = result ? miniResults[result] : undefined;
  if (resultState) {
    return (
      <div className="mini-result">
        <span><Check size={30} /></span>
        <h2>{resultState.title}</h2>
        <p>{resultState.detail}</p>
        <WireList rows={["Prototype reference", "Status updated just now"]} />
      </div>
    );
  }
  if (appId === "express" && tabId === "track") {
    return (
      <section className="task-panel">
        <span className="wire-kicker">Tracking wireframe</span>
        <h2>Find a delivery</h2>
        <p>Use a simulated reference to preview the tracking result.</p>
        <div className="input-placeholder">Tracking number</div>
        <button className="primary-button" onClick={onAction}>Simulate tracking <Search size={17} /></button>
      </section>
    );
  }
  const sampleRows: Record<string, string[]> = {
    cart: ["Cart items", "Delivery method"],
    orders: ["Current orders", "Past orders"],
    trips: ["Upcoming trips", "Past trips"],
    saved: ["Saved places", "Saved services"],
    requests: ["Open requests", "Request history"],
    account: ["Personal details", "Payment preferences"],
    activity: ["Appointments", "Policy activity"],
    points: ["Points balance", "Points history"],
    rewards: ["Active rewards", "Redemption history"],
    categories: ["Groceries", "Beauty & personal care", "More marketplaces"],
  };
  return (
    <section className="task-panel">
      <span className="wire-kicker">{miniApps[appId].title} task</span>
      <h2>{tabLabel}</h2>
      <p>This tab has its own task-focused state rather than repeating the service directory.</p>
      <WireList rows={sampleRows[tabId] ?? [`${tabLabel} overview`, `${tabLabel} history`]} />
    </section>
  );
}

function miniSectionTitle(tabLabel: string) {
  if (["Trips", "Orders", "Requests", "Activity", "Saved", "Account", "Cart"].includes(tabLabel)) return `Your ${tabLabel.toLowerCase()}`;
  return "Available services";
}

function MiniAppDetail({ entry, appId, onAction }: { entry: RoadmapFunction; appId: MiniAppId; onAction: () => void }) {
  const Icon = serviceIcons[entry.id] ?? miniApps[appId].icon;
  return (
    <>
      <div className="partner-placeholder"><span>PARTNER / SERVICE WEBVIEW</span><Icon size={62} /><strong>{entry.label}</strong><small>{entry.partner}</small></div>
      <section className="detail-copy">
        <span className="wire-kicker">Wireframe detail</span>
        <h2>{miniApps[appId].detailTitle}</h2>
        <p>Content, imagery, prices and availability will be supplied by the service partner.</p>
      </section>
      <div className="wire-form compact-form">
        <label>Primary selection<div className="input-placeholder">Choose an option</div></label>
        <label>Date or time<div className="input-placeholder">Select availability</div></label>
      </div>
      <button className="primary-button" onClick={onAction}>{miniApps[appId].detailCta} <ArrowRight size={17} /></button>
    </>
  );
}

function PageHeading({ title, subtitle, back }: { title: string; subtitle: string; back?: () => void }) {
  return (
    <div className="page-heading">
      {back && <button className="icon-button" onClick={back}><ArrowLeft size={20} /></button>}
      <div><h1>{title}</h1><p>{subtitle}</p></div>
    </div>
  );
}

function WireList({ rows }: { rows: string[] }) {
  return (
    <div className="wire-list">
      {rows.map((row, index) => (
        <button key={row}>
          <span className="wire-list-icon">{index + 1}</span>
          <div><strong>{row}</strong><small>Placeholder details · Today</small></div>
          <ChevronRight size={16} />
        </button>
      ))}
    </div>
  );
}

function ResultState({ title, description, onDone }: { title: string; description: string; onDone: () => void }) {
  return (
    <div className="result-state">
      <span><Check size={40} /></span>
      <h1>{title}</h1>
      <p>{description}</p>
      <button className="primary-button" onClick={onDone}>Done</button>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="empty-state"><Clock3 size={24} /><strong>{label}</strong><span>Placeholder state</span></div>;
}

const variants = [
  { key: "A", label: "Service grid" },
  { key: "B", label: "Journey hub" },
  { key: "C", label: "Compact directory" },
];

function PrototypeSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKey = (searchParams.get("variant") ?? "A").toUpperCase();
  const currentIndex = Math.max(0, variants.findIndex((variant) => variant.key === currentKey));

  const cycle = (direction: -1 | 1) => {
    const nextIndex = (currentIndex + direction + variants.length) % variants.length;
    const next = new URLSearchParams(searchParams);
    next.set("variant", variants[nextIndex].key);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") cycle(-1);
      if (event.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (
    import.meta.env.PROD &&
    import.meta.env.VITE_SHOW_PROTOTYPE_SWITCHER !== "true"
  ) return null;
  return (
    <div className="prototype-switcher" aria-label="Prototype layout variant">
      <button onClick={() => cycle(-1)} aria-label="Previous layout"><ArrowLeft size={18} /></button>
      <span><small>Home layout</small><strong>{variants[currentIndex].key} — {variants[currentIndex].label}</strong></span>
      <button onClick={() => cycle(1)} aria-label="Next layout"><ArrowRight size={18} /></button>
    </div>
  );
}
