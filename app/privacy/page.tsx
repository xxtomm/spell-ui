import SiteHeader from "@/components/site-header";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex min-h-dvh flex-col pt-14">
      <SiteHeader />
      <main className="flex flex-1 flex-col px-4 py-12 sm:px-5 sm:py-16 md:px-6">
        <article className="mx-auto w-full max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: March 25, 2026
            </p>
          </header>

          <div className="flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Overview
              </h2>
              <p>
                Spell UI (<Link href="https://spell.sh" className="underline underline-offset-4 hover:text-foreground">spell.sh</Link>)
                is an open-source collection of UI components that you can copy and paste into your projects. We respect your privacy
                and collect only what is necessary to run the site and its
                sponsorship features. This policy explains what data we collect,
                how we use it, and your rights.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Account Data
              </h2>
              <p>
                When you sign in with Google or GitHub OAuth, we receive and
                store your <strong>name</strong>, <strong>email address</strong>,
                and <strong>profile image URL</strong>. This information is used
                solely to identify your account on the site.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Session Data
              </h2>
              <p>
                To maintain your session and for basic security purposes, we
                record your <strong>IP address</strong> and{" "}
                <strong>user agent</strong> string when you sign in. This data is
                tied to your session and is not used for tracking or profiling.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Sponsorship & Payment Data
              </h2>
              <p>
                Sponsorship payments are processed entirely by{" "}
                <strong>Whop</strong>. We do not collect, store, or have access
                to your credit card details or other payment credentials. Whop
                handles all payment processing and billing.
              </p>
              <p>
                If you become a sponsor, we store your{" "}
                <strong>sponsor profile information</strong> such as a logo URL
                and website URL, which you provide for display on the site and
                GitHub README.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Analytics
              </h2>
              <p>
                We use <strong>Vercel Analytics</strong> and{" "}
                <strong>Vercel Speed Insights</strong> to understand how the site
                is used and to monitor performance. These tools collect anonymous,
                aggregated data. No personally identifiable information is sent
                to Vercel Analytics.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Data Storage
              </h2>
              <p>
                All application data (accounts, sessions, sponsor profiles) is
                stored in a <strong>Turso</strong> database (SQLite). Data is not
                replicated to third-party services beyond what is described in
                this policy.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Data Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties. Data is shared only with the
                service providers mentioned above (Whop for payments, Vercel for
                hosting and analytics, Turso for database storage) as necessary
                to operate the site.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Your Rights
              </h2>
              <p>
                You can request deletion of your account and associated data at
                any time. Since authentication is handled through OAuth, you can
                also revoke access from your Google or GitHub account settings.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. Changes will
                be reflected on this page with an updated date.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Contact
              </h2>
              <p>
                If you have questions or concerns about this privacy policy,
                please reach out on our{" "}
                <Link
                  href={siteConfig.links.discord}
                  className="underline underline-offset-4 hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord server
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
