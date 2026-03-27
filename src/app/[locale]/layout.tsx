import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: "Kronos Habitat",
  description: "Transforme seus hábitos em uma jornada épica.",
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'pt'].includes(locale)) {
    notFound();
  }

  // Set the locale for server components
  setRequestLocale(locale);

  // Receiving messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>
        <script dangerouslySetInnerHTML={{ __html: `
          // ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR
          const link = 'https://meubackredirect.com.br';

          function setBackRedirect(url) {
            let urlBackRedirect = url;
            urlBackRedirect = urlBackRedirect =
              urlBackRedirect.trim() +
              (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
              document.location.search.replace('?', '').toString();

            history.pushState({}, '', location.href);
            history.pushState({}, '', location.href);
            history.pushState({}, '', location.href);

            window.addEventListener('popstate', () => {
              console.log('onpopstate', urlBackRedirect);
              setTimeout(() => {
                location.href = urlBackRedirect;
              }, 1);
            });
          }

          setBackRedirect(link);
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          window.pixelId = "69aa40215e32f07f1fc58d60";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1555120576620919');
          fbq('track', 'PageView');
        `}} />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1555120576620919&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
