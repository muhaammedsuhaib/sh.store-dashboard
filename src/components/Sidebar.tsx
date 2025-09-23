import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Home, Menu, X, Package, ShoppingCart, Users, LineChart, Settings as SettingsIcon } from 'lucide-react'

type SidebarProps = {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
}

type NavItem =
	| { title: string; icon: any; hasDropdown: false; to: string }
	| { title: string; icon: any; hasDropdown: true; dropdownItems: { label: string; to: string }[] }

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
	const [activeDropdown, setActiveDropdown] = useState<string>('')
	const location = useLocation()
	const navigate = useNavigate()
	const [hovering, setHovering] = useState(false)
	const isExpanded = isOpen || hovering

	const navItems: NavItem[] = [
		{ title: 'Dashboard', icon: Home, hasDropdown: false, to: '/' },
		{
			title: 'Products',
			icon: Package,
			hasDropdown: true,
			dropdownItems: [
				{ label: 'All Products', to: '/products' },
				{ label: 'Add Product', to: '/products/new' },
				{ label: 'Categories', to: '/products/categories' },
			],
		},
		{
			title: 'Orders',
			icon: ShoppingCart,
			hasDropdown: true,
			dropdownItems: [
				{ label: 'All Orders', to: '/orders' },
				{ label: 'Pending', to: '/orders/pending' },
				{ label: 'Completed', to: '/orders/completed' },
			],
		},
		{
			title: 'Customers',
			icon: Users,
			hasDropdown: true,
			dropdownItems: [
				{ label: 'Customer List', to: '/customers' },
				{ label: 'Segments', to: '/customers/segments' },
			],
		},
		{ title: 'Analytics', icon: LineChart, hasDropdown: false, to: '/analytics' },
		{
			title: 'Settings',
			icon: SettingsIcon,
			hasDropdown: true,
			dropdownItems: [
				{ label: 'Preferences', to: '/settings' },
				{ label: 'Security', to: '/settings/security' },
				{ label: 'Notifications', to: '/settings/notifications' },
			],
		},
	]

	useEffect(() => {
		// auto-open dropdown that contains the current route
		for (const item of navItems) {
			if (item.hasDropdown) {
				const match = item.dropdownItems.some((d) => location.pathname.startsWith(d.to.split('#')[0]))
				if (match) {
					setActiveDropdown(item.title)
					return
				}
			}
		}
		setActiveDropdown('')
	}, [location.pathname])

	return (
		<>
			<div
				className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
				onClick={() => setIsOpen(false)}
			/>

			<aside
				className={`bg-white text-black transition-all duration-300 ease-in-out text-sm border-r border-[rgba(0,0,0,0.08)] fixed inset-y-0 left-0 z-40 ${isExpanded ? 'w-64' : 'w-16'}`}
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
			>
				<div className="p-4 flex justify-between items-center border-b border-[rgba(0,0,0,0.08)]">
					<h1
						className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-[#3B40E8] ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
					>
						Dashboard
					</h1>
					<button onClick={() => setIsOpen(!isOpen)} className="hover:bg-[#F3F5F7] p-2 rounded-lg" aria-label="Toggle sidebar">
						{isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
					</button>
				</div>

				<nav className="mt-2">
					{navItems.map((item) => (
						<div key={item.title}>
							<div
								className="px-4 py-3 hover:bg-[#F3F5F7] cursor-pointer flex items-center justify-between"
								onClick={() => {
									if (item.hasDropdown && isExpanded) {
										setActiveDropdown(activeDropdown === item.title ? '' : item.title)
										return
									}
									if ('to' in item) {
										navigate(item.to)
										setIsOpen(false)
									}
								}}
							>
								<div className="flex items-center">
									{(() => {
										const isActiveLink = () => {
											if ('to' in item) {
												if (item.to === '/') return location.pathname === '/'
												return location.pathname === item.to || location.pathname.startsWith(item.to + '/')
											}
											return false
										}
										const isActiveIcon = isActiveLink() || (item.hasDropdown && activeDropdown === item.title)
										return (
											<item.icon size={20} strokeWidth={1.5} color={isActiveIcon ? '#3B40E8' : '#000'} />
										)
									})()}
									{'to' in item ? (
										<NavLink
											to={item.to}
											className={({ isActive }) =>
												`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? 'w-32 opacity-100' : 'w-0 opacity-0'} ${isActive ? 'text-[#3B40E8] font-medium' : ''}`
											}
										>
											{item.title}
										</NavLink>
									) : (
										<span className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
											{item.title}
										</span>
									)}
								</div>
								{item.hasDropdown && isExpanded && (
									<ChevronDown size={16} strokeWidth={1.5} className={`transition-transform duration-200 ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
								)}
							</div>

							{item.hasDropdown && isExpanded && activeDropdown === item.title && (
								<div className="bg-[#f5f5f5] overflow-hidden transition-all duration-200">
									{item.dropdownItems?.map((dropdownItem: any) => (
										<NavLink
											key={dropdownItem.label}
											to={dropdownItem.to}
											className={({ isActive }) => `block px-11 py-2 hover:bg-[#f1f1f1] cursor-pointer text-sm ${isActive ? 'text-[#3B40E8] font-medium' : ''}`}
										>
											{dropdownItem.label}
										</NavLink>
									))}
								</div>
							)}
						</div>
					))}
				</nav>
			</aside>
		</>
	)
}


