import { SearchIcon } from "../icons/SearchIcon";


export function SearchBar({onChange}) {
  return (
    <div className="flex h-10 w-50 lg:w-80">
      <label className="flex items-center relative w-full">
      <SearchIcon/>
        <input
          name="product"
          type='text' required
          onChange={onChange}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 text-sm font-normal pl-8"
          placeholder="Search Pokemon..."
        />
      </label>

    </div>
  )
}