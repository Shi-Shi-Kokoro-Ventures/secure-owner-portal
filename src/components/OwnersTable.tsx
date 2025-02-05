import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const OwnersTable = () => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#4C8DAE] hover:bg-[#4C8DAE]">
            <TableHead className="text-white font-semibold">Name</TableHead>
            <TableHead className="text-white font-semibold">Phone</TableHead>
            <TableHead className="text-white font-semibold">Email</TableHead>
            <TableHead className="text-white font-semibold text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-gray-100">
            <TableCell colSpan={4} className="text-center py-8">
              No data available in table
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="p-4 text-sm text-gray-600 border-t">
        Showing 0 to 0 of 0 entries
      </div>
    </div>
  );
};