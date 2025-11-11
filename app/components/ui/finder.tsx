import { Search, ExternalLink } from 'lucide-react'
import { FinderItems } from '@/app/data/mock/menu'
import { CATEGORIES } from '@/app/data/mock/menu'
import React, { useMemo, useState, useEffect } from 'react'

interface FinderProps {
    onClose?: () => void;
}

const Finder = ({ onClose }: FinderProps) => {
    const [query, setQuery] = useState('')
    const [activeLabel, setActiveLabel] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return FinderItems
        return FinderItems.filter((i) =>
            `${i.label} ${i.description ?? ''}`.toLowerCase().includes(q)
        )
    }, [query])

    const flatLabels = useMemo(() => filtered.map((i) => i.label), [filtered])

    useEffect(() => {
        if (query.trim()) {
            setIsSearching(true)
            const timer = setTimeout(() => setIsSearching(false), 300)
            return () => clearTimeout(timer)
        } else {
            setIsSearching(false)
        }
    }, [query])

    useEffect(() => {
        if (filtered.length) setActiveLabel(filtered[0].label)
        else setActiveLabel(null)
    }, [filtered])
    
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose?.()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])
    return (
        <>
            {/* Centered overlay container */}
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose?.()
                    }
                }}
            >
                <section
                    role="dialog"
                    aria-modal="true"
                    className="w-[90%] sm:w-[600px] lg:w-[720px] flex flex-col gap-y-2 rounded-2xl border border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4px] transition-all duration-300 max-h-[80svh] overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3">
                        <Search className="size-5 text-white/70" />
                        <input
                            type="text"
                            placeholder="Search…"
                            className="w-full bg-transparent outline-none text-white/90 placeholder:text-white/40 text-base"
                            style={{ fontSize: '16px' }}
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (!flatLabels.length) return
                                const idx = activeLabel ? flatLabels.indexOf(activeLabel) : -1
                                if (e.key === 'ArrowDown') {
                                    e.preventDefault()
                                    const next = flatLabels[(idx + 1) % flatLabels.length]
                                    setActiveLabel(next)
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault()
                                    const next = flatLabels[(idx - 1 + flatLabels.length) % flatLabels.length]
                                    setActiveLabel(next)
                                } else if (e.key === 'Enter' && idx >= 0) {
                                    const item = filtered[idx]
                                    if (!item?.href) return
                                    if (item.href.startsWith('http')) {
                                        window.open(item.href, '_blank')
                                    } else {
                                        window.location.assign(item.href)
                                    }
                                }
                            }}
                        />
                        <kbd className="hidden sm:flex items-center gap-1 rounded-md bg-white/10 text-white/70 text-[10px] px-2 py-1">
                            ⌘
                            <span className="tracking-wide">K</span>
                        </kbd>
                    </div>
                    {/* Body */}
                    <div className="px-2 pb-2 overflow-hidden border-b border-t border-white/5">
                        <div className="max-h-[60svh] overflow-auto pr-1">
                            {isSearching && query.trim() ? (
                                <div className="flex items-center justify-center py-8">
                                    <p className="text-sm text-white/60">Searching...</p>
                                </div>
                            ) : filtered.length === 0 && query.trim() ? (
                                <div className="flex items-center justify-center py-8">
                                    <p className="text-sm text-white/60">No results found</p>
                                </div>
                            ) : (
                                CATEGORIES.map((cat) => {
                                    const items = filtered.filter((i) => i.category?.label === cat.label)
                                    if (!items.length) return null
                                    return (
                                        <section key={cat.label} className="mb-3">
                                            <h4 className="px-3 pb-1 text-[11px] uppercase tracking-wide text-white/40">{cat.label}</h4>
                                            <ul className="divide-y divide-white/5">
                                                {items.map((item, idx) => (
                                                    <li
                                                        key={`${item.label}-${idx}`} 
                                                        className={`group flex items-start gap-3 px-3 py-2 rounded-md cursor-pointer transition ${activeLabel === item.label ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                                        onMouseEnter={() => setActiveLabel(item.label)}
                                                        onClick={() => {
                                                            if (!item.href) return
                                                            if (item.href.startsWith('http')) {
                                                                window.open(item.href, '_blank')
                                                            } else {
                                                                window.location.assign(item.href)
                                                            }
                                                        }}
                                                    >
                                                        <span className="mt-1 size-2 rounded-full bg-white/30" />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm text-white/90 truncate">{item.label}</span>
                                                                {item.href?.startsWith('http') && (
                                                                    <ExternalLink className="size-3 text-white/30" />
                                                                )}
                                                            </div>
                                                            {item.description && (
                                                                <p className="text-[11px] text-white/60 group-hover:text-white/80 truncate">{item.description}</p>
                                                            )}
                                                        </div>
                                                    
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-end px-4 py-2 text-[11px] text-white/50">
                        <span>Esc to close</span>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Finder