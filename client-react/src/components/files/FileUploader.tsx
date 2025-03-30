// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       // שלב 1: קבלת Presigned URL מהשרת
//       const response = await axios.get('https://localhost:7263/api/upload/presigned-url', {
//         params: { fileName: file.name }
//       });

//       const presignedUrl = response.data.url;

//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axios.put(presignedUrl, file, {
//         headers: {
//           'Content-Type': file.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       alert('הקובץ הועלה בהצלחה!');
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//   );
// };

// export default FileUploader;

import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MyGallery from "./MyGallery";
import { useParams } from "react-router-dom";

const FileUploader = () => {

  const { id } = useParams<{ id: string }>();
  const albumId = parseInt(id || '0');

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get(
        "https://localhost:7263/api/upload/presigned-url",
        {
          params: {
            fileName: file.name,
            albumId: albumId // שלח את מזהה האלבום יחד עם שם הקובץ
          }
        }
      );

      const presignedUrl = response.data.url;

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      alert("הקובץ הועלה בהצלחה!");
      setProgress(0);
      setFile(null);

    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          העלאת תמונה
        </Typography>

        <input type="file" onChange={handleFileChange} style={{ marginBottom: 10 }} />

        {file && (
          <Typography variant="body2" color="text.secondary">
            קובץ נבחר: {file.name}
          </Typography>
        )}

        {progress > 0 && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {progress}%
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={!file}
          fullWidth
        >
          העלה קובץ
        </Button>
      </CardActions>
    </Card>
  );
};
export default FileUploader;
