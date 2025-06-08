import { Box, Typography } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

const HomePage = () => {
  return (
      <Box
        sx={{
          textAlign: 'center',
          borderRadius: 4,
          px: { xs: 5, sm: 12 },
          py: { xs: 6, sm: 10 },
          boxShadow: 6,
          backdropFilter: 'blur(6px)',
        }}
      >
        <CameraAlt sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />

        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Rubik", "Segoe UI", sans-serif',
            fontWeight: 700,
            color: 'primary.main',
            mb: 3,
          }}
        >
          PicFamily
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Rubik", "Arial", sans-serif',
            color: 'primary.light',
            mb: 5,
          }}
        >
          כל הזיכרונות היקרים — במקום אחד
        </Typography>
      </Box>
  );
};

export default HomePage;
