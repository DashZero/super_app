import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  Gift,
  Grid2X2,
  Home,
  Inbox,
  Menu,
  MessageCircleMore,
  MoreHorizontal,
  QrCode,
  ScanLine,
  Search,
  Send,
  Settings,
  Sparkles,
  UserRound,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
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
  miniAppOrder,
  miniApps,
  roadmapFunctions,
  serviceIcons,
  type Milestone,
  type MiniAppId,
  type RoadmapFunction,
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

interface PrototypeContextValue {
  milestone: Milestone;
  showFuture: boolean;
  setMilestone: (value: Milestone) => void;
  setShowFuture: (value: boolean) => void;
  openMiniApp: (id: MiniAppId, detailId?: string) => void;
  closeMiniApp: () => void;
  goCore: (path: string) => void;
  notify: (message: string) => void;
}

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

const usePrototype = () => {
  const value = useContext(PrototypeContext);
  if (!value) throw new Error("PrototypeContext is missing");
  return value;
};

const firstTabByMiniApp = (id: MiniAppId) => miniApps[id].nav[0].id;

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [milestone, setMilestone] = useState<Milestone>(3);
  const [showFuture, setShowFuture] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const originRef = useRef<OriginState | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
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
    navigate(`${detailId ? `${base}/detail/${detailId}` : base}${location.search}`);
    requestAnimationFrame(() => viewportRef.current?.scrollTo({ top: 0 }));
  };

  const closeMiniApp = () => {
    const origin = originRef.current;
    originRef.current = null;
    if (!origin) {
      goCore("/core/home");
      return;
    }
    setMilestone(origin.milestone);
    navigate(origin.route);
    window.setTimeout(() => viewportRef.current?.scrollTo({ top: origin.scrollTop }), 0);
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
    }),
    [milestone, showFuture, location.pathname, location.search],
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
      {milestone === 7 && (
        <p className="roadmap-note">
          Month 7 currently matches Month 5 in the supplied roadmap.
        </p>
      )}
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
          <strong>Everything you need, in one place.</strong>
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
            milestone >= 5 ? goCore("/core/assistant") : openMiniApp("travel")
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
        <div><strong>Delivery in progress</strong><small>Track your SongWai order</small></div>
        <span>Now</span>
      </div>
    </>
  );
}

function HomeVariantC() {
  const { milestone, showFuture, openMiniApp } = usePrototype();
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
        <div><span>Complete directory</span><strong>{milestone === 3 ? 36 : 58} functions</strong></div>
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
    <button className={`service-tile ${disabled ? "future" : ""}`} disabled={disabled} onClick={onOpen}>
      <span className="service-icon"><Icon size={23} /></span>
      <strong>{app.title}</strong>
      {disabled ? <small>Month {app.availableFrom}</small> : <small>{app.eyebrow.split(",")[0]}</small>}
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
      <PageHeading title="All services" subtitle={`${milestone === 3 ? 36 : 58} roadmap functions`} />
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
  const { miniAppId, tabId, detailId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { milestone, showFuture, closeMiniApp, notify } = usePrototype();

  if (!miniAppId || !(miniAppId in miniApps)) return <Navigate to="/core/home" replace />;
  const id = miniAppId as MiniAppId;
  const app = miniApps[id];
  const activeTab = app.nav.find((tab) => tab.id === tabId) ?? app.nav[0];
  const entries = roadmapFunctions.filter(
    (entry) => entry.miniApp === id && (entry.availableFrom <= milestone || showFuture),
  );
  const detail = entries.find((entry) => entry.id === detailId);
  const result = new URLSearchParams(location.search).get("result");
  const goTab = (nextTab: string) => {
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.delete("result");
    const query = nextSearch.toString();
    navigate(`/mini/${id}/${nextTab}${query ? `?${query}` : ""}`);
  };
  const openDetail = (entry: RoadmapFunction) => {
    if (entry.availableFrom > milestone) {
      notify(`${entry.label} becomes available in Month ${entry.availableFrom}`);
      return;
    }
    navigate(`/mini/${id}/${activeTab.id}/detail/${entry.id}${location.search}`);
  };
  const backToTab = () => navigate(`/mini/${id}/${activeTab.id}${location.search}`);
  const goToResult = (targetTab: string, resultId: string) => {
    const nextSearch = new URLSearchParams(location.search);
    nextSearch.set("result", resultId);
    navigate(`/mini/${id}/${targetTab}?${nextSearch.toString()}`);
  };
  const completeDetail = () => {
    if (id === "market") return goToResult("cart", "added");
    if (id === "travel") return goToResult("trips", "trip-added");
    if (id === "ride") return goToResult("trips", "ride-booked");
    if (id === "privileges") return goToResult("rewards", "redeemed");
    notify(`${detail?.label ?? app.title}: prototype action completed`);
  };
  const completeTask = () => {
    if (id === "express" && activeTab.id === "track") return goToResult("track", "tracked");
    notify(`${activeTab.label}: prototype action completed`);
  };

  return (
    <div className="mini-app-screen">
      <header className="mini-app-header">
        <button className={`icon-button ${detail ? "" : "invisible"}`} onClick={backToTab} aria-label="Back within service">
          <ArrowLeft size={21} />
        </button>
        <div><small>ALL mini-app</small><strong>{detail?.label ?? app.title}</strong></div>
        <button className="close-button" onClick={closeMiniApp} aria-label="Close service and return to ALL">
          <X size={22} />
        </button>
      </header>
      <div className="mini-app-content">
        {detail ? (
          <MiniAppDetail entry={detail} appId={id} onAction={completeDetail} />
        ) : (
          <MiniAppLanding
            appId={id}
            tabId={activeTab.id}
            tabLabel={activeTab.label}
            entries={entries}
            result={result}
            onOpen={openDetail}
            onTaskAction={completeTask}
          />
        )}
      </div>
      <nav className="bottom-nav mini-bottom-nav" aria-label={`${app.title} navigation`}>
        {app.nav.map(({ id: navId, label, icon: Icon }) => (
          <button key={navId} className={activeTab.id === navId ? "active" : ""} onClick={() => goTab(navId)}>
            <Icon size={21} strokeWidth={1.8} />
            <span>{label}</span>
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
  onTaskAction,
}: {
  appId: MiniAppId;
  tabId: string;
  tabLabel: string;
  entries: RoadmapFunction[];
  result: string | null;
  onOpen: (entry: RoadmapFunction) => void;
  onTaskAction: () => void;
}) {
  const app = miniApps[appId];
  const Icon = app.icon;
  const { milestone } = usePrototype();
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
