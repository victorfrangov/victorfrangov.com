import {notFound} from "next/navigation"
import {NextIntlClientProvider} from "next-intl"
import {setRequestLocale} from "next-intl/server"

export function generateStaticParams() {
  return [{locale: "en"}, {locale: "fr"}]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  const {locale} = params
  setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
}