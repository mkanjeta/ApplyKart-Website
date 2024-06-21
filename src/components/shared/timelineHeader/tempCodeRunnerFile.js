const cllHello = () => {
    
    <input
    type = "text"
    className = "banner-searchbar"
                        placeholder="Search Jobs By Title"
                        value={search}
                        list="titles"
                        style={{ minHeight: "33px", padding: "0px 10px 0px 30px", border: "2px solid blue" }}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
  }