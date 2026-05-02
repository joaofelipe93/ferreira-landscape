import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash2, Plus, Search, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { PublishStatus } from '@/types'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
  width?: string
}

interface ContentTableProps<T extends { id: string; status: PublishStatus }> {
  title: string
  items: T[]
  columns: Column<T>[]
  newHref: string
  editHref: (item: T) => string
  onDelete: (id: string) => void
  onToggleStatus: (id: string, status: PublishStatus) => void
  searchKey?: keyof T
}

export function ContentTable<T extends { id: string; status: PublishStatus; updated_at?: string }>({
  title,
  items,
  columns,
  newHref,
  editHref,
  onDelete,
  onToggleStatus,
  searchKey,
}: ContentTableProps<T>) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filtered = items.filter((item) => {
    const matchSearch =
      !search ||
      !searchKey ||
      String(item[searchKey]).toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || item.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {items.length} total · {items.filter((i) => i.status === 'published').length} published
          </p>
        </div>
        <Button asChild>
          <Link to={newHref}>
            <Plus className="w-4 h-4" />
            New {title.replace(/s$/, '')}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {searchKey && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}
            <div className="flex gap-2">
              {(['all', 'published', 'draft'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                    statusFilter === s
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      className={`text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide ${col.width ?? ''}`}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No items found
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      {columns.map((col) => (
                        <td key={String(col.key)} className="px-4 py-3">
                          {col.render
                            ? col.render(item)
                            : String(item[col.key as keyof T] ?? '')}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title={item.status === 'published' ? 'Set to Draft' : 'Publish'}
                            onClick={() =>
                              onToggleStatus(
                                item.id,
                                item.status === 'published' ? 'draft' : 'published'
                              )
                            }
                          >
                            {item.status === 'published' ? (
                              <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                            ) : (
                              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                          </Button>
                          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                            <Link to={editHref(item)}>
                              <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Item</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this item? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => onDelete(item.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
