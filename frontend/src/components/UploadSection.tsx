import type { AgeGroup, Language, IngestResult } from "../lib/types";
import type { Strings } from "../lib/translations";

interface UploadSectionProps {
  t: Strings;
  profile: AgeGroup;
  setProfile: (profile: AgeGroup) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerPipeline: () => void;
  file: File | null;
  isProcessing: boolean;
  errorMsg: string | null;
  ingestResult: IngestResult | null;
  isSimpleMode: boolean;
}

export default function UploadSection({
  t,
  profile,
  setProfile,
  lang,
  setLang,
  handleFileUpload,
  triggerPipeline,
  file,
  isProcessing,
  errorMsg,
  ingestResult,
  isSimpleMode,
}: UploadSectionProps) {
  const uniformFontSize = isSimpleMode ? "1.05rem" : "0.85rem";
  const uniformDescSize = isSimpleMode ? "0.95rem" : "0.75rem";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      {/* Profile Selection */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label
          htmlFor="profile-select"
          style={{
            display: "block",
            fontSize: uniformFontSize,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {t.profileLabel}
        </label>
        <select
          id="profile-select"
          value={profile}
          onChange={(e) => setProfile(e.target.value as AgeGroup)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-canvas)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-subtle)",
            fontWeight: 600,
            fontSize: uniformFontSize,
            cursor: "pointer",
          }}
        >
          <option value="adult">{t.profiles.adult}</option>
          <option value="student">{t.profiles.student}</option>
          <option value="senior">{t.profiles.senior}</option>
        </select>
      </div>

      {/* Language Selection */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label
          htmlFor="lang-select"
          style={{
            display: "block",
            fontSize: uniformFontSize,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Select Language
        </label>
        <select
          id="lang-select"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-canvas)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-subtle)",
            fontSize: uniformFontSize,
            cursor: "pointer",
          }}
        >
          {Object.entries(t.languages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* File Ingestion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="file-upload"
          style={{
            display: "block",
            fontSize: uniformFontSize,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {t.uploadSignal}
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*,audio/*,video/*,text/*"
          onChange={handleFileUpload}
          style={{
            marginBottom: "0.5rem",
            display: "block",
            fontSize: uniformFontSize,
            width: "100%",
          }}
        />
        <p
          style={{
            fontSize: uniformDescSize,
            color: "var(--text-muted)",
            marginBottom: "0.75rem",
            lineHeight: 1.4,
          }}
        >
          {t.uploadHelp}
        </p>
        <button
          onClick={triggerPipeline}
          disabled={!file || isProcessing}
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: isSimpleMode ? "1rem 2rem" : "0.75rem 1.5rem",
            fontSize: uniformFontSize,
          }}
          aria-busy={isProcessing}
        >
          {isProcessing ? "Processing..." : t.generatePlan}
        </button>

        {/* Error display */}
        {errorMsg && (
          <div
            role="alert"
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "oklch(65% 0.22 15 / 0.15)",
              border: "1px solid var(--accent-rose)",
              fontSize: uniformDescSize,
              color: "var(--accent-rose)",
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Ingest summary */}
        {ingestResult && (
          <div
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "oklch(68% 0.18 185 / 0.12)",
              border: "1px solid var(--accent-teal)",
              fontSize: uniformDescSize,
            }}
          >
            <p
              style={{
                fontWeight: 600,
                color: "var(--accent-teal)",
                marginBottom: "0.25rem",
              }}
            >
              {t.ingestSummary}
            </p>
            <p>
              Nodes: {ingestResult.nodes_extracted} · Edges:{" "}
              {ingestResult.edges_extracted} · Events:{" "}
              {ingestResult.events_extracted}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
