import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bookmark, X } from "lucide-react";
import { SavedSearch } from "@/types/jobs";
import { getSavedSearches, deleteSavedSearch } from "@/lib/api/jobs";

interface SavedSearchesProps {
  onApplySearch: (criteria: SavedSearch["criteria"]) => void;
}

const SavedSearches = ({ onApplySearch }: SavedSearchesProps) => {
  const [searches, setSearches] = React.useState<SavedSearch[]>([]);

  React.useEffect(() => {
    setSearches(getSavedSearches());
  }, []);

  const handleDelete = (id: string) => {
    deleteSavedSearch(id);
    setSearches(searches.filter((search) => search.id !== id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Saved Searches</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {searches.length === 0 ? (
            <p className="text-sm text-gray-500">No saved searches yet</p>
          ) : (
            searches.map((search) => (
              <div
                key={search.id}
                className="p-4 border rounded-lg space-y-2 relative group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{search.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2"
                    onClick={() => handleDelete(search.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {search.criteria.search && (
                    <Badge variant="secondary">{search.criteria.search}</Badge>
                  )}
                  {search.criteria.industry && (
                    <Badge variant="secondary">
                      {search.criteria.industry}
                    </Badge>
                  )}
                  {search.criteria.experience && (
                    <Badge variant="secondary">
                      {search.criteria.experience}
                    </Badge>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onApplySearch(search.criteria)}
                >
                  Apply Search
                </Button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SavedSearches;
