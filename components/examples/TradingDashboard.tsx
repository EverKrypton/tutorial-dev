const CANDLES = [
  { x: 6, o: 62, c: 54, h: 48, l: 66, up: false },
  { x: 18, o: 54, c: 58, h: 50, l: 62, up: true },
  { x: 30, o: 58, c: 49, h: 45, l: 61, up: false },
  { x: 42, o: 49, c: 52, h: 44, l: 56, up: true },
  { x: 54, o: 52, c: 41, h: 37, l: 55, up: false },
  { x: 66, o: 41, c: 45, h: 36, l: 48, up: true },
  { x: 78, o: 45, c: 38, h: 33, l: 49, up: false },
  { x: 90, o: 38, c: 30, h: 25, l: 41, up: false },
  { x: 102, o: 30, c: 34, h: 27, l: 36, up: true },
  { x: 114, o: 34, c: 26, h: 21, l: 37, up: false },
  { x: 126, o: 26, c: 29, h: 22, l: 32, up: true },
  { x: 138, o: 29, c: 20, h: 16, l: 32, up: false },
  { x: 150, o: 20, c: 24, h: 15, l: 27, up: true },
  { x: 162, o: 24, c: 17, h: 12, l: 27, up: false },
  { x: 174, o: 17, c: 21, h: 13, l: 23, up: true },
  { x: 186, o: 21, c: 12, h: 8, l: 24, up: false },
  { x: 198, o: 12, c: 16, h: 9, l: 19, up: true },
  { x: 210, o: 16, c: 9, h: 5, l: 19, up: false },
];

const ASKS = [
  ["68.412,50", "0,412", 72],
  ["68.401,20", "1,204", 58],
  ["68.394,80", "0,806", 46],
  ["68.388,10", "2,140", 34],
];

const BIDS = [
  ["68.375,40", "1,882", 62],
  ["68.369,10", "0,940", 48],
  ["68.360,00", "3,016", 36],
  ["68.354,70", "1,122", 24],
];

const POSITIONS = [
  ["BTC", "0,42", "64.120,00", "+1.812,40"],
  ["ETH", "3,10", "3.180,20", "-142,80"],
  ["SOL", "48,0", "148,90", "+604,10"],
];

export function TradingDashboard() {
  return (
    <div className="dv dv--trading">
      <div className="dv-tr-head">
        <div className="dv-pair">
          <i />
          <div>
            <b>BTC / USDT</b>
            <span>Spot · Binance</span>
          </div>
        </div>
        <div className="dv-price">
          <b>68.384,20</b>
          <span>+2,84% hoy</span>
        </div>
      </div>

      <div className="dv-tr-grid">
        <div className="dv-candles">
          <svg viewBox="0 0 216 92" preserveAspectRatio="none" role="img" aria-label="Velas de BTC">
            {CANDLES.map((c) => (
              <g key={c.x}>
                <line
                  x1={c.x}
                  x2={c.x}
                  y1={c.h}
                  y2={c.l}
                  stroke={c.up ? "#34c08a" : "#f2545b"}
                  strokeWidth="1"
                  opacity="0.7"
                />
                <rect
                  x={c.x - 3}
                  y={Math.min(c.o, c.c)}
                  width="6"
                  height={Math.max(2, Math.abs(c.c - c.o))}
                  fill={c.up ? "#34c08a" : "#f2545b"}
                  rx="1"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="dv-book">
          <div className="bh">
            <span>Precio</span>
            <span>Tamaño</span>
          </div>
          {ASKS.map(([price, size, w]) => (
            <div className="br ask" key={price}>
              <span className="fill" style={{ width: `${w}%` }} />
              <span>{price}</span>
              <span>{size}</span>
            </div>
          ))}
          <div className="mid">68.384,20</div>
          {BIDS.map(([price, size, w]) => (
            <div className="br bid" key={price}>
              <span className="fill" style={{ width: `${w}%` }} />
              <span>{price}</span>
              <span>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dv-positions">
        <div className="pr h">
          <span>Par</span>
          <span>Cant.</span>
          <span>Entrada</span>
          <span>PnL</span>
        </div>
        {POSITIONS.map(([pair, qty, entry, pnl]) => (
          <div className="pr" key={pair}>
            <span>{pair}</span>
            <span>{qty}</span>
            <span>{entry}</span>
            <span className={pnl.startsWith("+") ? "pos" : ""} style={pnl.startsWith("-") ? { color: "#f2545b" } : undefined}>
              {pnl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
