import {notFound} from "next/navigation"
import {NextIntlClientProvider} from "next-intl"
import {setRequestLocale} from "next-intl/server"

export function generateStaticParams() {
  return [{locale: "en"}, {locale: "fr"}]
}

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
}