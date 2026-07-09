/**
 * Google Apps Script — bind to spreadsheet:
 * https://docs.google.com/spreadsheets/d/1eoznqewvQkgnHLXNnrutP_cu2NFlKvAIJTEmsV0gvTU/edit
 *
 * Setup:
 * 1. Open the spreadsheet → Extensions → Apps Script
 * 2. Replace Code.gs with this file
 * 3. Run `testAppendRow` once and authorize the script
 * 4. Deploy → New deployment → Web app
 *    Execute as: Me | Who has access: Anyone
 * 5. Copy the Web App URL ending in /exec (NOT /dev)
 * 6. Vercel env: GOOGLE_SHEETS_WEBAPP_URL=<exec URL>
 * 7. Redeploy the marketing site on Vercel
 */

const SPREADSHEET_ID = "1eoznqewvQkgnHLXNnrutP_cu2NFlKvAIJTEmsV0gvTU";
const SHEET_NAME = "Early Access Web";

const HEADERS = [
  "Timestamp",
  "First Name",
  "Last Name",
  "Email",
  "Country",
  "Profession",
  "Music Experience",
  "Role Type",
  "Discovery Source",
  "Interested Plan",
  "Newsletter",
  "Consent",
];

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return e.parameter || {};
    }
  }
  return (e && e.parameter) || {};
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function appendEarlyAccessRow_(body) {
  const sheet = getOrCreateSheet_();
  sheet.appendRow([
    new Date(),
    body.firstName || "",
    body.lastName || "",
    body.email || "",
    body.country || "",
    body.profession || "",
    body.musicExperience || "",
    body.roleType || "",
    body.discoverySource || "",
    body.interestedPlan || "",
    body.newsletter === true || body.newsletter === "true" ? "Yes" : "No",
    body.consent === true || body.consent === "true" ? "Yes" : "No",
  ]);
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const body = parseBody_(e);
    if (!body.email) {
      return jsonResponse_({ ok: false, error: "Email is required." });
    }
    appendEarlyAccessRow_(body);
    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "SoundAI Early Access", sheet: SHEET_NAME });
}

/** Run manually once from Apps Script editor to verify permissions. */
function testAppendRow() {
  appendEarlyAccessRow_({
    firstName: "Test",
    lastName: "User",
    email: "test+" + new Date().getTime() + "@soundai.local",
    country: "Test",
    profession: "QA",
    musicExperience: "professional",
    roleType: "producer",
    discoverySource: "Apps Script test",
    interestedPlan: "trial",
    newsletter: false,
    consent: true,
  });
}
