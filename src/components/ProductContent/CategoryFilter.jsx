function CategoryFilter({ toggleCategory }) {
  return (
    <div className="border sm:min-w-60 absolute top-5 z-10 bg-white px-4 py-2">
      {/* category filter */}
      <div>
        <p className="uppercase text-sm mb-3 font-medium">categories</p>
        <div className="flex flex-col">
          <p className="flex gap-2 capitalize">
            <input
              onChange={toggleCategory}
              value={"men's clothing"}
              className="w-3"
              type="checkbox"
            />{" "}
            Men
          </p>
          <p className="flex gap-2 capitalize">
            <input
              onChange={toggleCategory}
              value={"women's clothing"}
              className="w-3"
              type="checkbox"
            />{" "}
            Women
          </p>
          <p className="flex gap-2 capitalize">
            <input
              onChange={toggleCategory}
              value={"jewelery"}
              className="w-3"
              type="checkbox"
            />{" "}
            jewelery
          </p>
          <p className="flex gap-2 capitalize">
            <input
              onChange={toggleCategory}
              value={"electronics"}
              className="w-3"
              type="checkbox"
            />{" "}
            Electronics
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
