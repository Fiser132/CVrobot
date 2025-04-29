// /components/ui/Table.tsx

const Table = () => (
    <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="text-left px-4 py-3 font-medium">Požiadavky</th>
            <th className="text-left px-4 py-3 font-medium">Moje praxe</th>
            <th className="text-left px-4 py-3 font-medium">V rokoch</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200 even:bg-gray-50 odd:bg-white">
            <td className="px-4 py-3 text-sm">- [Požiadavka na pracovnú pozíciu]</td>
            <td className="px-4 py-3 text-sm">- [Vaša prax]</td>
            <td className="px-4 py-3 text-sm">- [Časové obdobie]</td>
          </tr>
          <tr className="border-t border-gray-200 even:bg-gray-50 odd:bg-white">
            <td className="px-4 py-3 text-sm">- [Požiadavka na pracovnú pozíciu]</td>
            <td className="px-4 py-3 text-sm">- [Vaša prax]</td>
            <td className="px-4 py-3 text-sm">- [Časové obdobie]</td>
          </tr>
          <tr className="border-t border-gray-200 even:bg-gray-50 odd:bg-white">
            <td className="px-4 py-3 text-sm">- [Požiadavka na pracovnú pozíciu]</td>
            <td className="px-4 py-3 text-sm">- [Vaša prax]</td>
            <td className="px-4 py-3 text-sm">- [Časové obdobie]</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
  
  export default Table