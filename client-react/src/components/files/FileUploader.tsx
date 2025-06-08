// import React, { useState } from 'react';
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
//       const response = await axiosInstance.get('/upload/presigned-url', {
//         params: { fileName: file.name }
//       });

//       const presignedUrl = response.data.url;

//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axiosInstance.put(presignedUrl, file, {
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
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const FileUploader = () => {

  const { id } = useParams<{ id: string }>();
  const albumId = parseInt(id || '0');

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axiosInstance.get(
        "/upload/presigned-url",
        {
          params: {
            fileName: file.name,
            albumId: albumId // שלח את מזהה האלבום יחד עם שם הקובץ
          }
        }
      );

      const presignedUrl = response.data.url;

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axiosInstance.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      // שלב 3: עדכון המידע על התמונה בשרת (אם נדרש)
      await axiosInstance.post('/Image', {
        name: file.name,
        S3URL: `https://pictures-testpnoren.s3.us-east-1.amazonaws.com/${file.name}`,
        albumId: albumId, // שלח את מזהה האלבום
        ownerId: Number(localStorage.getItem('userId')) ?? undefined // שלח את מזהה המשתמש
      });

      alert("הקובץ הועלה בהצלחה!");
      setProgress(0);
      setFile(null);
      navigate(`/albums/${albumId}`); // חזור לאלבום לאחר ההעלאה


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
