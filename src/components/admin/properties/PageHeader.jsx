// components/properties/PageHeader.jsx
import { Button } from '@/components/ui/button';
import { Building2, Download } from 'lucide-react';

const PageHeader = ({ title, description, onManage, onExport }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={onManage}>
            <Building2 className="h-4 w-4" />
            Manage listings
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
