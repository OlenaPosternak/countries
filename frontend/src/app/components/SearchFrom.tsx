interface SearchFormProps {
  isLoading: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchForm = ({ search, setSearch }: SearchFormProps) => {
  return (
    <div className="flex gap-2 my-4">
      <input
        className="border border-gray-300 rounded-md px-2 py-1 outline-none"
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
      />
      <button
        className="bg-purple-500 w-20 text-white rounded-md px-2 py-1 disabled:opacity-50"
        onClick={() => setSearch("")}
        disabled={!search}
      >
        Clear
      </button>
    </div>
  );
};
