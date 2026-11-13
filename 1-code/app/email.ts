/**
 * The letter Jess receives when someone presses "Seal & send".
 * Email-safe HTML: tables + inline styles, fonts that every inbox has.
 */
export type Letter = {
  name: string;
  brand: string;
  email: string;
  message: string;
  lookName?: string;
  lookItems?: string;
  /** cid of the inline doll picture, if one was attached */
  lookCid?: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const INK = "#2A1E1C";
const MUTED = "#8A7A76";
const ROSE = "#C9577F";
const PINK = "#F3CAD5";
const BLUSH = "#FBE3EA";
const PAPER = "#FFFDF8";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'Courier New', Courier, monospace";

const label = (t: string) =>
  `<p style="margin:0 0 4px;font:600 10px/1 ${MONO};letter-spacing:2px;text-transform:uppercase;color:${MUTED}">${t}</p>`;

export function letterHtml(l: Letter) {
  const date = new Date().toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Dublin" });
  const body = esc(l.message).replace(/\r?\n/g, "<br>");
  const reply = `mailto:${encodeURIComponent(l.email)}?subject=${encodeURIComponent(`Re: your note to Jess${l.brand ? ` (${l.brand})` : ""}`)}`;

  const look = l.lookName
    ? `
      <tr><td style="padding:8px 36px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BLUSH};border-radius:14px">
          <tr>
            ${l.lookCid ? `<td width="150" valign="top" style="padding:16px 0 16px 16px">
              <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;padding:8px 8px 0;box-shadow:0 2px 6px rgba(60,30,40,.15)">
                <tr><td><img src="cid:${l.lookCid}" width="126" alt="The paper doll look they styled" style="display:block;width:126px;height:auto;border:0"></td></tr>
                <tr><td style="padding:6px 0 8px;text-align:center;font:italic 12px ${SERIF};color:${INK}">styled for you ♡</td></tr>
              </table>
            </td>` : ""}
            <td valign="middle" style="padding:18px 20px">
              ${label("they dressed your doll")}
              <p style="margin:0 0 8px;font:italic 22px/1.2 ${SERIF};color:${INK}">${esc(l.lookName)}</p>
              ${l.lookItems ? `<p style="margin:0;font:14px/1.5 ${SERIF};color:${MUTED}">${esc(l.lookItems)}</p>` : ""}
            </td>
          </tr>
        </table>
      </td></tr>`
    : "";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>A new letter</title></head>
<body style="margin:0;padding:0;background:${PINK}">
  <div style="display:none;max-height:0;overflow:hidden">${esc(l.name)}${l.brand ? ` from ${esc(l.brand)}` : ""} sealed a letter for you ♡</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PINK}">
    <tr><td align="center" style="padding:32px 14px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
        <tr><td align="center" style="padding:0 0 14px;font:600 10px/1 ${MONO};letter-spacing:3px;text-transform:uppercase;color:${ROSE}">✦ &nbsp;you've got mail&nbsp; ✦</td></tr>
        <tr><td style="background:${PAPER};border-radius:6px;box-shadow:0 10px 30px rgba(120,50,70,.18)">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="height:8px;background:repeating-linear-gradient(90deg,${ROSE} 0 10px,${PAPER} 10px 20px);border-radius:6px 6px 0 0;font-size:0;line-height:0">&nbsp;</td></tr>
            <tr><td style="padding:30px 36px 6px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td style="font:600 10px/1.4 ${MONO};letter-spacing:2px;text-transform:uppercase;color:${MUTED}">${date}<br>jessicakayleyyy.com</td>
                <td align="right"><span style="display:inline-block;width:46px;height:46px;line-height:46px;border-radius:50%;background:${ROSE};color:#fff;text-align:center;font:italic 22px/46px ${SERIF}">J</span></td>
              </tr></table>
            </td></tr>
            <tr><td style="padding:14px 36px 0;font:italic 34px/1.1 ${SERIF};color:${INK}">Dear Jess,</td></tr>
            <tr><td style="padding:16px 36px 6px;font:17px/1.65 ${SERIF};color:${INK}">${body}</td></tr>
            <tr><td style="padding:12px 36px 22px;font:italic 17px/1.5 ${SERIF};color:${INK}">love,<br><span style="font-size:26px;color:${ROSE}">${esc(l.name)}</span></td></tr>
            ${look}
            <tr><td style="padding:22px 36px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px dashed #E6C9D2">
                <tr>
                  <td valign="top" style="padding:16px 10px 0 0" width="50%">${label("from")}<p style="margin:0;font:16px/1.4 ${SERIF};color:${INK}">${esc(l.name)}</p></td>
                  <td valign="top" style="padding:16px 0 0" width="50%">${label("brand")}<p style="margin:0;font:16px/1.4 ${SERIF};color:${INK}">${l.brand ? esc(l.brand) : "—"}</p></td>
                </tr>
                <tr><td colspan="2" style="padding:12px 0 0">${label("email")}<p style="margin:0;font:16px/1.4 ${SERIF}"><a href="mailto:${esc(l.email)}" style="color:${ROSE}">${esc(l.email)}</a></p></td></tr>
              </table>
            </td></tr>
            <tr><td align="center" style="padding:26px 36px 32px">
              <a href="${reply}" style="display:inline-block;padding:13px 30px;border-radius:999px;background:${INK};color:#fff;text-decoration:none;font:600 11px/1 ${MONO};letter-spacing:2px;text-transform:uppercase">write back ♡</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td align="center" style="padding:16px 0 0;font:italic 13px ${SERIF};color:${ROSE}">sealed &amp; sent from your portfolio</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
