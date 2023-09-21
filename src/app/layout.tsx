import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Separator } from '@/components/ui/separator'
import SidebarNav from '@/components/sidebar-menu'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Teste de Componentes',
  description: 'Gerado e desenvolvido por Luiggi Sales @luiggisales',
}

const sidebarNavItems = [
  {
    title: "Upload",
    href: "/",
  },
  {
    title: "Input Custom",
    href: "/input-custom",
  },
  {
    title: "Input Mask",
    href: "/input-mask",
  },
]

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className='hidden space-y-6 p-10 pb-16 md:block'>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Componentes</h2>
            <p className="text-muted-foreground">
              Manage components
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 w-full">{children}</div> {/* lg:max-w-2xl */}
            <Toaster/>
          </div>
        </div>
      </body>
    </html>
  )
}
