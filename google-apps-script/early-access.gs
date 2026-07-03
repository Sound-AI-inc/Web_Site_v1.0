/**
 * Google Apps Script — bind to spreadsheet:
 * https://docs.google.com/spreadsheets/d/1eoznqewvQkgnHLXNnrutP_cu2NFlKvAIJTEmsV0gvTU/edit
 *
 * Setup:
 * 1. Extensions → Apps Script → paste this file
 * 2. Deploy → New deployment → Web app
 * 3. Execute as: Me | Who has access: Anyone
 * 4. Copy deployment URL → Vercel env GOOGLE_SHEETS_WEBAPP_URL
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

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const body = JSON.parse(e.postData.contents);
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
      body.newsletter ? "Yes" : "No",
      body.consent ? "Yes" : "No",
    ]);

    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: "SoundAI Early Access" })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
