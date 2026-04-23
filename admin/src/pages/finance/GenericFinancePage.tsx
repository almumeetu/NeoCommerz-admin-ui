import { PageHeader } from '../../components/PageHeaders';

export const GenericFinancePage = ({ title }: { title: string }) => (
  <div className="p-8">
    <PageHeader title={title} subtitle={`Manage your ${title.toLowerCase()} data.`} />
    <div className="bg-white border border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400 italic">
      {title} Content Coming Soon
    </div>
  </div>
);
