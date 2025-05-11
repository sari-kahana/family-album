import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useState } from 'react';

const Collages = () => {

    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedImages(Array.from(e.target.files));
      }
    };
  
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={4}>
          עיצוב קולאז'ים
        </Typography>
  
        {/* <Typography variant="h6" mb={2}>בחרי תבנית:</Typography>
        <Grid container spacing={2}>
          {collageTemplates.map((template) => (
            <Grid item xs={12} sm={4} key={template.id}>
              <Card
                onClick={() => setSelectedTemplate(template.id)}
                sx={{
                  border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={template.preview}
                  alt={template.name}
                />
                <CardContent>
                  <Typography align="center">{template.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
  
        {selectedTemplate && (
          <Box mt={4}>
            <Typography variant="h6" mb={2}>בחרי תמונות לקולאז':</Typography>
            <Button variant="outlined" component="label">
              העלי תמונות
              <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
            </Button>
  
            <Box mt={2}>
              {selectedImages.length > 0 && (
                <Typography color="success.main">{selectedImages.length} תמונות נבחרו</Typography>
              )}
            </Box>
          </Box>
        )} */}
      </Box>
    );
};

export default Collages;

