import { Inter } from "next/font/google";
import "../../css/globals.css";
import "../../css/euclidCircularA.css";
import Header from "./header";
const inter = Inter({ subsets: ["latin"] });
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { metadata } from "@/app/lib/metadata";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const { title, description } = metadata[locale as "en" | "es"].home;
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} className="bg-white dark:bg-gray-950">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </head>
      <body className={`font-euclidCircularA ` + inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="mt-5 bg-white dark:bg-gray-950 text-black dark:text-gray-300">
            <Header />
            <main className="flex flex-col row-start-2 items-center sm:items-center justify-center">
              {children}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
