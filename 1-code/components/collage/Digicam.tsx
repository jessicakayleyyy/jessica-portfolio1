/** A silver point-and-shoot camera. Whatever you pass as children shows on its screen. */
export function Digicam({ children, width = 320, height = 196 }: { children: React.ReactNode; width?: number; height?: number }) {
  return (
    <div className="cam" style={{ width, height }}>
      <div className="cam-screen">{children}</div>
      <div className="cam-ctrl" aria-hidden="true">
        <div className="cam-btns"><i /><i className="rec" /></div>
        <div className="cam-dial" />
        <div className="cam-btns"><i /><i /></div>
      </div>
      <span className="cam-brand" aria-hidden="true">JL · 12MP</span>
    </div>
  );
}
