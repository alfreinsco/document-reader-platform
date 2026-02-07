'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: Set<string>;
  selectedDocType: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  onDocTypeChange: (type: string, checked: boolean) => void;
  onReset: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  selectedDocType,
  onCategoryChange,
  onDocTypeChange,
  onReset,
}: FilterSidebarProps) {
  const isFiltering = selectedCategories.size > 0 || selectedDocType.length > 0;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filter</h3>
        {isFiltering && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator className="mb-4" />

      <div className="space-y-4">
        {/* Document Type Filter */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-foreground">Tipe Dokumen</h4>
          <div className="space-y-2">
            {['pdf', 'image'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedDocType.includes(type)}
                  onCheckedChange={(checked) => {
                    onDocTypeChange(type, checked as boolean);
                  }}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  {type.toUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Category Filter */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-foreground">Kategori</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.has(category)}
                  onCheckedChange={(checked) => {
                    onCategoryChange(category, checked as boolean);
                  }}
                />
                <Label
                  htmlFor={`cat-${category}`}
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground capitalize"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
