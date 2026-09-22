/**
 * Minimal recharts-compatible shim using pure SVG.
 * Exports: BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
 *          RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
 */
import { useRef, type ReactNode } from 'react';

// ─── ResponsiveContainer ─────────────────────────────────────────────────────

interface ResponsiveContainerProps {
  width?: string | number;
  height?: number;
  children: ReactNode;
}
export function ResponsiveContainer({ height, children }: ResponsiveContainerProps) {
  return (
    <div style={{ width: '100%', height: height ?? 300 }}>
      {children}
    </div>
  );
}

// ─── BarChart ─────────────────────────────────────────────────────────────────

interface BarChartProps {
  data: Record<string, any>[];
  barSize?: number;
  children?: ReactNode;
}

export function BarChart({ data, children }: BarChartProps) {
  const bars: BarConfig[] = [];
  const cells: Map<number, string> = new Map();
  let xKey = 'name';
  let yMax = 0;

  function traverse(node: any) {
    if (!node) return;
    const arr = Array.isArray(node) ? node : [node];
    arr.forEach((child: any) => {
      if (!child?.type) return;
      const name = (child.type as any)?.displayName ?? child.type?.name ?? '';
      if (name === 'Bar') {
        bars.push({ dataKey: child.props.dataKey, fill: child.props.fill ?? '#1e3a5f', radius: child.props.radius ?? [0,0,0,0], children: child.props.children });
      }
      if (name === 'XAxis') xKey = child.props.dataKey ?? 'name';
      if (child.props?.children) traverse(child.props.children);
    });
  }
  traverse(children);

  data.forEach(d => {
    bars.forEach(b => {
      const v = Number(d[b.dataKey] ?? 0);
      if (v > yMax) yMax = v;
    });
  });
  yMax = yMax || 1;

  const barW = Math.max(20, Math.min(40, Math.floor(320 / Math.max(data.length, 1)) - 8));
  const chartH = 180;
  const labelH = 40;
  const totalH = chartH + labelH;
  const svgW = data.length * (barW + 8) + 48;

  function barColor(cfg: BarConfig, dataIdx: number): string {
    // Check for Cell children
    const cellArr = cfg.children ? (Array.isArray(cfg.children) ? cfg.children : [cfg.children]) : [];
    const cellChild = cellArr[dataIdx] as any;
    if (cellChild?.props?.fill) return cellChild.props.fill;
    return cfg.fill;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width="100%" height={totalH} viewBox={`0 0 ${svgW} ${totalH}`}>
        {/* Y-axis grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = chartH - pct * chartH;
          return (
            <g key={pct}>
              <line x1={40} y1={y} x2={svgW} y2={y} stroke="#e2e8f0" strokeWidth={1} />
              <text x={36} y={y + 4} fontSize={9} fill="#94a3b8" textAnchor="end">{Math.round(pct * yMax)}</text>
            </g>
          );
        })}
        {/* Bars */}
        {data.map((d, di) => {
          const x = 44 + di * (barW + 8);
          return (
            <g key={di}>
              {bars.map((bar, bi) => {
                const val = Number(d[bar.dataKey] ?? 0);
                const h = (val / yMax) * chartH;
                const y = chartH - h;
                const fill = barColor(bar, di);
                return (
                  <g key={bi}>
                    <rect x={x} y={y} width={barW} height={h} fill={fill} rx={Array.isArray(bar.radius) ? bar.radius[0] ?? 0 : 0} />
                    <title>{`${d[xKey]}: ${val}`}</title>
                  </g>
                );
              })}
              <text x={x + barW / 2} y={chartH + 14} fontSize={9} fill="#64748b" textAnchor="middle"
                style={{ overflow: 'hidden' }}>
                {String(d[xKey] ?? '').split(' ').slice(0, 2).join(' ')}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface BarConfig { dataKey: string; fill: string; radius: number | number[]; children?: ReactNode }

export function Bar({ dataKey, fill, radius, children }: { dataKey: string; fill?: string; radius?: number | number[]; children?: ReactNode }) { return null; }
Bar.displayName = 'Bar';
export function XAxis({ dataKey }: { dataKey?: string }) { return null; }
XAxis.displayName = 'XAxis';
export function YAxis({ domain, tick }: { domain?: any; tick?: any }) { return null; }
YAxis.displayName = 'YAxis';
export function Tooltip({ formatter }: { formatter?: any }) { return null; }
Tooltip.displayName = 'Tooltip';
export function Cell({ fill }: { fill?: string }) { return null; }
Cell.displayName = 'Cell';

// ─── RadarChart ───────────────────────────────────────────────────────────────

interface RadarDataPoint { [key: string]: string | number }

interface RadarChartProps {
  data: RadarDataPoint[];
  children?: ReactNode;
}

export function RadarChart({ data, children }: RadarChartProps) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const n = data.length;
  const radars: Array<{ dataKey: string; fill: string; stroke: string; fillOpacity: number }> = [];
  let angleKey = 'skill';

  function traverse(node: any) {
    if (!node) return;
    const arr = Array.isArray(node) ? node : [node];
    arr.forEach((child: any) => {
      if (!child?.type) return;
      const name = (child.type as any)?.displayName ?? child.type?.name ?? '';
      if (name === 'Radar') {
        radars.push({
          dataKey: child.props.dataKey,
          fill: child.props.fill ?? '#1e3a5f',
          stroke: child.props.stroke ?? '#1e3a5f',
          fillOpacity: child.props.fillOpacity ?? 0.3,
        });
      }
      if (name === 'PolarAngleAxis') angleKey = child.props.dataKey ?? 'skill';
      if (child.props?.children) traverse(child.props.children);
    });
  }
  traverse(children);

  function point(idx: number, value: number, max: number) {
    const angle = (idx / n) * 2 * Math.PI - Math.PI / 2;
    const dist = (value / max) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  }

  function labelPoint(idx: number) {
    const angle = (idx / n) * 2 * Math.PI - Math.PI / 2;
    const dist = r + 18;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  }

  // Determine max value
  let maxVal = 100;
  data.forEach(d => {
    radars.forEach(rad => {
      const v = Number(d[rad.dataKey] ?? 0);
      if (v > maxVal) maxVal = v;
    });
  });

  // Grid circles
  const gridLevels = [0.25, 0.5, 0.75, 1];

  // Spoke lines
  const spokes = data.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x2: cx + r * Math.cos(angle), y2: cy + r * Math.sin(angle) };
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid circles */}
        {gridLevels.map(lvl => (
          <polygon
            key={lvl}
            points={data.map((_, i) => {
              const ang = (i / n) * 2 * Math.PI - Math.PI / 2;
              return `${cx + r * lvl * Math.cos(ang)},${cy + r * lvl * Math.sin(ang)}`;
            }).join(' ')}
            fill="none" stroke="#e2e8f0" strokeWidth={1}
          />
        ))}
        {/* Spokes */}
        {spokes.map((s, i) => (
          <line key={i} x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="#e2e8f0" strokeWidth={1} />
        ))}
        {/* Radar series */}
        {radars.map((rad, ri) => {
          const pts = data.map((d, i) => {
            const val = Number(d[rad.dataKey] ?? 0);
            const p = point(i, val, maxVal);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <polygon key={ri} points={pts} fill={rad.fill} fillOpacity={rad.fillOpacity} stroke={rad.stroke} strokeWidth={1.5} />
          );
        })}
        {/* Labels */}
        {data.map((d, i) => {
          const lp = labelPoint(i);
          const label = String(d[angleKey] ?? '');
          return (
            <text key={i} x={lp.x} y={lp.y} fontSize={9} fill="#475569" textAnchor="middle" dominantBaseline="middle">
              {label.split(' ').map((word, wi) => (
                <tspan key={wi} x={lp.x} dy={wi === 0 ? 0 : 11}>{word}</tspan>
              ))}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function Radar({ dataKey, stroke, fill, fillOpacity }: { dataKey: string; stroke?: string; fill?: string; fillOpacity?: number; name?: string }) { return null; }
Radar.displayName = 'Radar';
export function PolarGrid() { return null; }
PolarGrid.displayName = 'PolarGrid';
export function PolarAngleAxis({ dataKey, tick }: { dataKey?: string; tick?: any }) { return null; }
PolarAngleAxis.displayName = 'PolarAngleAxis';
export function PolarRadiusAxis({ angle, domain, tick }: { angle?: number; domain?: any; tick?: any }) { return null; }
PolarRadiusAxis.displayName = 'PolarRadiusAxis';
export function Legend() { return null; }
Legend.displayName = 'Legend';
