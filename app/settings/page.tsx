"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SiteHeader from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SponsorSettings {
  id: string;
  tierId: string;
  logoUrl: string | null;
  logoDarkUrl: string | null;
  websiteUrl: string | null;
}

export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [sponsor, setSponsor] = useState<SponsorSettings | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoDarkUrl, setLogoDarkUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [savingSponsor, setSavingSponsor] = useState(false);
  const [savedSponsor, setSavedSponsor] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingDark, setUploadingDark] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?callbackUrl=/settings");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/sponsor/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.sponsor) {
          setSponsor(data.sponsor);
          setLogoUrl(data.sponsor.logoUrl ?? "");
          setLogoDarkUrl(data.sponsor.logoDarkUrl ?? "");
          setWebsiteUrl(data.sponsor.websiteUrl ?? "");
        }
      })
      .catch(() => {});
  }, [session?.user]);

  const originalName = session?.user?.name ?? "";

  const hasUnsavedChanges =
    name.trim() !== originalName ||
    (sponsor &&
      (logoUrl.trim() !== (sponsor.logoUrl ?? "") ||
        logoDarkUrl.trim() !== (sponsor.logoDarkUrl ?? "") ||
        websiteUrl.trim() !== (sponsor.websiteUrl ?? "")));

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || saving) return;
    setSaving(true);
    setSaved(false);
    try {
      await authClient.updateUser({ name: name.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSponsor(e: React.FormEvent) {
    e.preventDefault();
    if (savingSponsor) return;
    setSavingSponsor(true);
    setSavedSponsor(false);
    try {
      await fetch("/api/sponsor/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl: logoUrl.trim(), logoDarkUrl: logoDarkUrl.trim(), websiteUrl: websiteUrl.trim() }),
      });
      setSponsor((prev) =>
        prev ? { ...prev, logoUrl: logoUrl.trim(), logoDarkUrl: logoDarkUrl.trim(), websiteUrl: websiteUrl.trim() } : prev,
      );
      setSavedSponsor(true);
      setTimeout(() => setSavedSponsor(false), 2000);
    } finally {
      setSavingSponsor(false);
    }
  }

  if (isPending || !session?.user) return null;

  const nameDisabled = saving || name.trim() === originalName;
  const sponsorDisabled =
    savingSponsor ||
    (logoUrl.trim() === (sponsor?.logoUrl ?? "") &&
      logoDarkUrl.trim() === (sponsor?.logoDarkUrl ?? "") &&
      websiteUrl.trim() === (sponsor?.websiteUrl ?? ""));

  return (
    <div className="relative flex min-h-dvh pt-14">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col px-4 py-12 sm:px-5 sm:py-16 md:px-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <h1 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">
            Settings
          </h1>

          <form
            onSubmit={handleSaveName}
            className="overflow-hidden rounded-xl border border-border bg-muted/15"
          >
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-balance text-xl font-medium">Display Name</h2>
                <p className="text-pretty text-sm text-muted-foreground">
                  This is your display name on Spell UI.
                </p>
              </div>
              <Input
                id="settings-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                maxLength={32}
                required
                placeholder={originalName || "Your name…"}
                onChange={(e) => setName(e.target.value)}
                className="max-w-xs bg-background dark:bg-background"
              />
            </div>
            <div className="flex items-center justify-between border-t border-border bg-background px-6 py-3">
              <p className="text-sm text-muted-foreground">
                Max 32 characters.
              </p>
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={nameDisabled}
                className="cursor-pointer shadow-none transition-[color,background-color] active:scale-[0.96] disabled:bg-secondary-foreground/15 disabled:text-secondary-foreground"
              >
                {saving ? "Saving…" : saved ? "Saved" : "Save"}
              </Button>
            </div>
          </form>

          {sponsor && (
            <form
              onSubmit={handleSaveSponsor}
              className="overflow-hidden rounded-xl border border-border bg-muted/15"
            >
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-balance text-xl font-medium">Sponsor Profile</h2>
                  <p className="text-pretty text-sm text-muted-foreground">
                    Customize how your sponsorship appears on the site.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="settings-logo-upload" className="text-sm font-medium">
                    Logo
                  </label>
                  <div className="flex items-center gap-4">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo preview"
                        width={96}
                        height={40}
                        className="h-10 max-w-24 object-contain"
                      />
                    ) : (
                      <div className="flex size-14 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                        No logo
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="settings-logo-upload"
                        className="inline-flex h-8 cursor-pointer items-center rounded-md border border-border bg-background px-3 text-sm font-medium transition-[color,background-color,scale] active:scale-[0.96] hover:bg-muted"
                      >
                        {uploading ? "Uploading…" : "Upload Image"}
                      </label>
                      <input
                        id="settings-logo-upload"
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        disabled={uploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploading(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch("/api/sponsor/upload-logo", {
                              method: "POST",
                              body: formData,
                            });
                            const data = await res.json();
                            if (data.url) {
                              setLogoUrl(data.url);
                              setSponsor((prev) =>
                                prev ? { ...prev, logoUrl: data.url } : prev,
                              );
                            }
                          } finally {
                            setUploading(false);
                            e.target.value = "";
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        SVG recommended. Max 2&nbsp;MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="settings-logo-dark-upload" className="text-sm font-medium">
                    Dark Mode Logo{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    {logoDarkUrl ? (
                      <img
                        src={logoDarkUrl}
                        alt="Dark logo preview"
                        width={96}
                        height={40}
                        className="h-10 max-w-24 rounded bg-zinc-900 p-1.5 object-contain"
                      />
                    ) : (
                      <div className="flex size-14 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                        No logo
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="settings-logo-dark-upload"
                        className="inline-flex h-8 cursor-pointer items-center rounded-md border border-border bg-background px-3 text-sm font-medium transition-[color,background-color,scale] active:scale-[0.96] hover:bg-muted"
                      >
                        {uploadingDark ? "Uploading…" : "Upload Image"}
                      </label>
                      <input
                        id="settings-logo-dark-upload"
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        disabled={uploadingDark}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingDark(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch("/api/sponsor/upload-logo", {
                              method: "POST",
                              body: formData,
                            });
                            const data = await res.json();
                            if (data.url) {
                              setLogoDarkUrl(data.url);
                              setSponsor((prev) =>
                                prev ? { ...prev, logoDarkUrl: data.url } : prev,
                              );
                            }
                          } finally {
                            setUploadingDark(false);
                            e.target.value = "";
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        If not set, logo will be auto-inverted in dark mode.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="settings-website"
                    className="text-sm font-medium"
                  >
                    Website URL
                  </label>
                  <Input
                    id="settings-website"
                    name="url"
                    type="url"
                    autoComplete="url"
                    value={websiteUrl}
                    placeholder="https://example.com"
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="max-w-sm bg-background dark:bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Where your logo links to when clicked.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border bg-background px-6 py-3">
                <p className="text-sm text-muted-foreground">
                  Changes are reflected across the site.
                </p>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={sponsorDisabled}
                  className="cursor-pointer shadow-none transition-[color,background-color] active:scale-[0.96] disabled:bg-secondary-foreground/15 disabled:text-secondary-foreground"
                >
                  {savingSponsor
                    ? "Saving…"
                    : savedSponsor
                      ? "Saved"
                      : "Save"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
