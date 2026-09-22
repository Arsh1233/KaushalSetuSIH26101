/**
 * Minimal react-router-dom compatible implementation.
 * Supports: BrowserRouter, Routes, Route, NavLink, Outlet,
 *           useNavigate, useParams, useLocation, useSearchParams, Navigate
 */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
}

interface RouterCtx {
  location: Location;
  navigate: (to: string, opts?: { replace?: boolean; state?: unknown }) => void;
  params: Record<string, string>;
  outlet: ReactNode;
}

interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
  _layoutElement?: ReactNode;
}

// ─── Router context ──────────────────────────────────────────────────────────

const RouterContext = createContext<RouterCtx>({
  location: { pathname: '/', search: '', hash: '', state: null },
  navigate: () => {},
  params: {},
  outlet: null,
});

const OutletContext = createContext<ReactNode>(null);

// ─── Utils ────────────────────────────────────────────────────────────────────

function parseLocation(): Location {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: (window.history.state as any)?.usr ?? null,
  };
}

function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  if (pattern === '*') return {};
  const patternSegments = pattern.split('/').filter(Boolean);
  const pathSegments = pathname.split('/').filter(Boolean);
  if (patternSegments.length !== pathSegments.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const ps = patternSegments[i]!;
    const seg = pathSegments[i]!;
    if (ps.startsWith(':')) {
      params[ps.slice(1)] = decodeURIComponent(seg);
    } else if (ps !== seg) {
      return null;
    }
  }
  return params;
}

// ─── BrowserRouter ────────────────────────────────────────────────────────────

interface BrowserRouterProps { children: ReactNode }
export function BrowserRouter({ children }: BrowserRouterProps) {
  const [location, setLocation] = useState(parseLocation);

  useEffect(() => {
    const onPop = () => setLocation(parseLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts: { replace?: boolean; state?: unknown } = {}) => {
    const state = { usr: opts.state ?? null };
    if (opts.replace) {
      window.history.replaceState(state, '', to);
    } else {
      window.history.pushState(state, '', to);
    }
    setLocation(parseLocation());
    window.scrollTo(0, 0);
  }, []);

  return (
    <RouterContext.Provider value={{ location, navigate, params: {}, outlet: null }}>
      {children}
    </RouterContext.Provider>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

interface RoutesProps { children: ReactNode }
export function Routes({ children }: RoutesProps) {
  const { location, navigate } = useContext(RouterContext);

  // Collect route configs
  const configs = collectRouteConfigs(children);

  // Find matching route (depth-first: layout → child)
  const match = findMatch(configs, location.pathname);
  if (!match) return null;

  return (
    <RouterContext.Provider value={{ location, navigate, params: match.params, outlet: match.element }}>
      {match.layoutElement ?? match.element}
    </RouterContext.Provider>
  );
}

function collectRouteConfigs(children: ReactNode, parentPath = ''): RouteConfig[] {
  const configs: RouteConfig[] = [];
  Children_forEach(children, (child: any) => {
    if (!child || child.type !== Route) return;
    const path: string | undefined = child.props.path;
    const element: ReactNode = child.props.element;
    const childRoutes = child.props.children;

    if (!path && element) {
      // Layout route — collect children with this as layout
      const subs = collectRouteConfigs(childRoutes, parentPath);
      subs.forEach(sub => configs.push({ ...sub, _layoutElement: element }));
    } else if (path) {
      const fullPath = path;
      if (childRoutes) {
        const subs = collectRouteConfigs(childRoutes, fullPath);
        subs.forEach(sub => configs.push({ ...sub, _layoutElement: element }));
      } else {
        configs.push({ path: fullPath, element, _layoutElement: undefined });
      }
    }
  });
  return configs;
}

function findMatch(configs: RouteConfig[], pathname: string) {
  for (const cfg of configs) {
    const params = matchPath(cfg.path, pathname);
    if (params !== null) {
      return { params, element: cfg.element, layoutElement: cfg._layoutElement };
    }
  }
  return null;
}

function Children_forEach(children: ReactNode, fn: (child: ReactNode) => void) {
  if (!children) return;
  const arr = Array.isArray(children) ? children : [children];
  arr.forEach(c => {
    if (Array.isArray(c)) c.forEach(fn);
    else fn(c);
  });
}

// ─── Route ────────────────────────────────────────────────────────────────────

interface RouteProps {
  path?: string;
  element?: ReactNode;
  children?: ReactNode;
}
export function Route(_props: RouteProps): null { return null; }

// ─── Outlet ───────────────────────────────────────────────────────────────────

export function Outlet() {
  const { outlet } = useContext(RouterContext);
  return <>{outlet}</>;
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

interface NavLinkProps {
  to: string;
  children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
  className?: string | ((props: { isActive: boolean }) => string);
  end?: boolean;
}
export function NavLink({ to, children, className, end }: NavLinkProps) {
  const { location, navigate } = useContext(RouterContext);
  const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
  const cls = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <a
      href={to}
      className={cls}
      onClick={(e) => { e.preventDefault(); navigate(to); }}
      aria-current={isActive ? 'page' : undefined}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
}

// ─── Navigate ─────────────────────────────────────────────────────────────────

interface NavigateProps { to: string; replace?: boolean }
export function Navigate({ to, replace }: NavigateProps) {
  const { navigate } = useContext(RouterContext);
  useEffect(() => { navigate(to, { replace }); }, []);
  return null;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useParams<T extends Record<string, string>>(): Partial<T> {
  const { params } = useContext(RouterContext);
  return params as Partial<T>;
}

export function useLocation(): Location {
  const { location } = useContext(RouterContext);
  return location;
}

export function useSearchParams(): [URLSearchParams, (p: URLSearchParams) => void] {
  const { location, navigate } = useContext(RouterContext);
  const params = new URLSearchParams(location.search);
  const set = (p: URLSearchParams) => {
    navigate(`${location.pathname}?${p.toString()}`, { replace: true });
  };
  return [params, set];
}

// ─── Link ─────────────────────────────────────────────────────────────────────

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { to: string }
export function Link({ to, children, ...rest }: LinkProps) {
  const { navigate } = useContext(RouterContext);
  return (
    <a href={to} onClick={(e) => { e.preventDefault(); navigate(to); }} {...rest}>
      {children}
    </a>
  );
}
