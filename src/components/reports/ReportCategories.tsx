import { BarChart3, FileText } from "lucide-react";

interface CategoryCard {
  icon: JSX.Element;
  label: string;
  count: number;
}

export const ReportCategories = () => {
  const categories: CategoryCard[] = [
    {
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      label: "Financial Reports",
      count: 12
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "Property Reports",
      count: 8
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "Tenant Reports",
      count: 15
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "Custom Reports",
      count: 5
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, index) => (
        <div key={index} className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            {category.icon}
            <span className="text-sm font-medium">{category.label}</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{category.count}</p>
        </div>
      ))}
    </div>
  );
};