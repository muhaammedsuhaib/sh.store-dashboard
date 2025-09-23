import { useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

type LayoutProps = {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="min-h-dvh bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className={`${sidebarOpen ? 'lg:pl-64' : 'lg:pl-16'} transition-[padding] duration-300`}>
				<header className="sticky top-0 z-20 h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur flex items-center px-4 gap-3">
					<button
						className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
						onClick={() => setSidebarOpen((v) => !v)}
						aria-label="Toggle sidebar"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
							<path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
						</svg>
					</button>
					<div className="font-medium">Shop Dashboard</div>
				</header>

				<main className="p-4">
					{children}
				</main>
			</div>
		</div>
	)
}


