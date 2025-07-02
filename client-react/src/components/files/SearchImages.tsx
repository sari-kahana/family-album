import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  InputBase,
  IconButton,
  alpha,
  Box,
  Paper,
  Fade,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import { Search as SearchIcon, TrendingUp, Close } from "@mui/icons-material"
import theme from "../Theme"

const SearchImages = () => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  // Mock recent searches and trending
  const trendingSearches = ["טיול","משפחה", "טבע", "ילד", "חיות"]

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const handleClickAway = () => {
    setIsOpen(false)
    setAnchorEl(null)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    navigate(`/search?query=${encodeURIComponent(suggestion)}`)
    setIsOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: "all 0.3s ease",
            direction: "rtl",
            "&:hover": {
              borderColor: alpha(theme.palette.primary.main, 0.3),
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
            "&:focus-within": {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
          }}
        >
          {query && (
            <IconButton
              size="small"
              onClick={() => setQuery("")}
              sx={{
                p: 0.5,
                color: alpha(theme.palette.text.secondary, 0.7),
                order: 1,
                "&:hover": {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          )}

          <InputBase
            placeholder="חפש תמונות..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={handleFocus}
            sx={{
              flex: 1,
              color: theme.palette.text.primary,
              fontSize: "0.95rem",
              width: { xs: "140px", sm: "200px", md: "250px" },
              order: 2,
              "& .MuiInputBase-input": {
                padding: "8px 12px",
                textAlign: "right",
                direction: "rtl",
                "&::placeholder": {
                  color: alpha(theme.palette.text.secondary, 0.7),
                  opacity: 1,
                  textAlign: "right",
                  direction: "rtl",
                },
              },
            }}
          />

          <IconButton
            onClick={handleSearch}
            sx={{
              p: 1.5,
              color: alpha(theme.palette.primary.main, 0.7),
              order: 3,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Search Suggestions Dropdown */}
        <Popper
          open={isOpen}
          anchorEl={anchorEl}
          placement="bottom-end"
          transition
          sx={{ zIndex: 1300, width: anchorEl?.offsetWidth || 300 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper
                sx={{
                  mt: 1,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                  overflow: "hidden",
                  maxHeight: 400,
                  direction: "rtl",
                }}
              >
                {/* Trending Searches */}
                {trendingSearches.length > 0 && (
                  <>
                    <Box sx={{ p: 2, pb: 1, pt: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <TrendingUp sx={{ fontSize: 16, color: theme.palette.secondary.main, ml: 1 }} />
                        <Box
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: theme.palette.text.secondary,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          חיפושים פופולריים
                        </Box>
                      </Box>
                    </Box>
                    <List sx={{ py: 0 }}>
                      {trendingSearches.map((search, index) => (
                        <ListItem
                          key={index}
                          component="button"
                          onClick={() => handleSuggestionClick(search)}
                          sx={{
                            py: 1,
                            px: 2,
                            textAlign: "right",
                            "&:hover": {
                              backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                            },
                          }}
                        >
                          <ListItemText
                            primary={search}
                            sx={{
                              textAlign: "right",
                              "& .MuiListItemText-primary": {
                                fontSize: "0.9rem",
                                color: theme.palette.text.primary,
                                textAlign: "right",
                              },
                            }}
                          />
                          <ListItemIcon sx={{ minWidth: 32, justifyContent: "flex-end" }}>
                            <TrendingUp sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                          </ListItemIcon>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
export default SearchImages

