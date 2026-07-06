import React, { useState, useEffect } from "react";
import type { AgeGroup, Language, IngestResult } from "../lib/types";
import type { Strings } from "../lib/translations";

interface UploadSectionProps {
  t: Strings;
  profile: AgeGroup;
  setProfile: (profile: AgeGroup) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFile: (file: File | null) => void;
  triggerPipeline: () => void;
  file: File | null;
  isProcessing: boolean;
  errorMsg: string | null;
  ingestResult: IngestResult | null;
  isSimpleMode: boolean;
  lang: string;
}

export default function UploadSection({
  t,
  profile,
  setProfile,
  handleFileUpload,
  setFile,
  triggerPipeline,
  file,
  isProcessing,
  errorMsg,
  ingestResult,
  isSimpleMode,
  lang,
}: UploadSectionProps) {
  const uniformFontSize = "0.85rem";
  const uniformDescSize = "0.75rem";

  // Helper to convert programmatically generated canvas data to blobs
  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const fetchSampleFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const handleLoadSample = async (type: "image" | "audio" | "video") => {
    try {
      let sampleFile: File;
      if (type === "image") {
        sampleFile = await fetchSampleFile("/samples/sample_messy_desktop.png", "sample_messy_desktop.png", "image/png");
      } else if (type === "audio") {
        sampleFile = await fetchSampleFile("/samples/sample_voice_log.wav", "sample_voice_log.wav", "audio/wav");
      } else {
        sampleFile = await fetchSampleFile("/samples/sample_focus_clip.mp4", "sample_focus_clip.mp4", "video/mp4");
      }
      setFile(sampleFile);
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error("Failed to load sample signal:", err);
    }
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1500);
    };
  }, [file]);

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
          <option value="adult">{t.profiles["adult"]}</option>
          <option value="student">{t.profiles["student"]}</option>
          <option value="senior">{t.profiles["senior"]}</option>
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
        {file && (
          <div style={{ fontSize: uniformDescSize, color: "var(--accent-teal)", fontWeight: 600, marginBottom: "0.5rem" }}>
            Selected: {file.name} ({Math.round(file.size / 1024) || 1} KB)
          </div>
        )}
        {file && previewUrl && (
          <div style={{
            marginTop: "0.25rem",
            marginBottom: "0.75rem",
            padding: "0.5rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-canvas)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", alignSelf: "flex-start", fontWeight: 600 }}>
              Life Signal Preview:
            </span>
            {file.type.startsWith("image/") && (
              <img
                src={previewUrl}
                alt="Selected signal preview"
                style={{ maxWidth: "100%", maxHeight: "320px", borderRadius: "var(--radius-sm)", objectFit: "contain", border: "1px solid var(--border-subtle)" }}
              />
            )}
            {file.type.startsWith("audio/") && (
              <div style={{ width: "100%", padding: "0.75rem", backgroundColor: "oklch(14% 0.025 260 / 0.8)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                <p style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>🎵 {file.name}</p>
                <audio
                  src={previewUrl}
                  controls
                  style={{ width: "100%", height: "48px" }}
                />
              </div>
            )}
            {file.type.startsWith("video/") && (
              <video
                src={previewUrl}
                controls
                style={{ width: "100%", maxHeight: "320px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", backgroundColor: "oklch(10% 0.02 260)" }}
              />
            )}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: uniformDescSize, color: "var(--text-secondary)", fontWeight: 600 }}>
            Or try a sample life signal:
          </span>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button
              onClick={() => handleLoadSample("image")}
              className="btn btn-secondary"
              style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem", flex: 1, cursor: "pointer" }}
              type="button"
            >
              🖼️ Image
            </button>
            <button
              onClick={() => handleLoadSample("audio")}
              className="btn btn-secondary"
              style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem", flex: 1, cursor: "pointer" }}
              type="button"
            >
              🎵 Audio
            </button>
            <button
              onClick={() => handleLoadSample("video")}
              className="btn btn-secondary"
              style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem", flex: 1, cursor: "pointer" }}
              type="button"
            >
              🎥 Video
            </button>
          </div>
        </div>
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
