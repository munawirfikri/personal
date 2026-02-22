import React from 'react';

interface EditorCardProps<T> {
  items: T[];
  loading: boolean;
  onDelete: (id: string, name: string) => void;
  onAdd: () => void;
  addButtonText: string;
  renderFields: (item: T) => React.ReactNode;
  getItemName: (item: T) => string;
}

export function EditorCard<T extends { id: string }>({
  items,
  loading,
  onDelete,
  onAdd,
  addButtonText,
  renderFields,
  getItemName,
}: EditorCardProps<T>) {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.id} className="bg-surface p-6 rounded-xl border border-border relative group">
          <button
            onClick={() => {
              if (confirm(`Delete "${getItemName(item)}"?`)) {
                onDelete(item.id, getItemName(item));
              }
            }}
            className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Delete
          </button>
          {renderFields(item)}
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
      >
        {addButtonText}
      </button>
    </div>
  );
}
