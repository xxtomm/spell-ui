import SiteHeader from "@/components/site-header";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="relative flex min-h-dvh flex-col pt-14">
      <SiteHeader />
      <main className="flex flex-1 flex-col px-4 py-12 sm:px-5 sm:py-16 md:px-6">
        <article className="mx-auto w-full max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: March 25, 2026
            </p>
          </header>

          <div className="flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                About Spell UI
              </h2>
              <p>
                Spell UI (<Link href="https://spell.sh" className="underline underline-offset-4 hover:text-foreground">spell.sh</Link>)
                is an open-source collection of UI components that you can copy and paste into your projects. The components
                themselves are released under the{" "}
                <strong>MIT License</strong>, meaning you are free to use, copy,
                modify, and distribute them in your own projects. These terms
                govern your use of the Spell UI website and its associated
                services (accounts, sponsorships).
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                User Accounts
              </h2>
              <p>
                You may create an account by signing in with Google or GitHub
                OAuth. You are responsible for maintaining the security of your
                OAuth credentials. We reserve the right to suspend or terminate
                accounts that violate these terms or are used for abusive
                purposes.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Sponsorship
              </h2>
              <p>
                Sponsorship of Spell UI is entirely voluntary. Sponsorships are
                recurring monthly subscriptions processed by{" "}
                <strong>Whop</strong>. By becoming a sponsor, you agree to
                Whop&apos;s terms of service in addition to these terms.
              </p>
              <p>
                Sponsorship payments are <strong>non-refundable</strong>. You may
                cancel your sponsorship at any time, which will take effect at
                the end of the current billing period. Sponsor benefits (such as
                logo placement) will remain active until the end of the paid
                period.
              </p>
              <p>
                We reserve the right to decline or remove any sponsor profile
                content (logos, links) that we consider inappropriate,
                misleading, or unrelated to legitimate businesses or projects.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Open-Source License
              </h2>
              <p>
                The UI components provided by Spell UI are licensed under the
                MIT License. You may use them freely in personal and commercial
                projects. The MIT License applies to the component source code
                only. The Spell UI website, branding, and documentation design
                are not covered by this license.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Disclaimer of Warranties
              </h2>
              <p>
                Spell UI is provided <strong>&quot;as is&quot;</strong> and{" "}
                <strong>&quot;as available&quot;</strong> without warranties of
                any kind, whether express or implied. We do not guarantee that
                the site or its components will be error-free, uninterrupted, or
                free of defects. You use the components and the site at your own
                risk.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Spell UI and its
                maintainers shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of the site, its components, or any sponsorship arrangement.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Changes to These Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Changes
                will be posted on this page with an updated date. Continued use
                of the site after changes are posted constitutes acceptance of
                the revised terms.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Contact
              </h2>
              <p>
                If you have questions about these terms, please reach out on
                our{" "}
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
