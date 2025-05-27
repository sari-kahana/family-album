import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchImages = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <TextField
        size="small"
        placeholder="חפש..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <IconButton color="primary" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchImages;
