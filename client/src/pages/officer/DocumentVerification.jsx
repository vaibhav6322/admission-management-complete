import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Typography
} from "@mui/material";
import api from "../../services/api";

export default function DocumentVerification() {

  const [applicants, setApplicants] = useState([]);

  const loadApplicants = async () => {
    const res = await api.get("/applicant");
    setApplicants(res.data);
  };

  useEffect(() => {
    loadApplicants();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(
      "/applicant/verify-documents",
      {
        applicantId: id,
        status
      }
    );

    loadApplicants();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">
        Document Verification
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Marks</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {applicants.map(a => (
            <TableRow key={a._id}>
              <TableCell>
                {a.firstName}
              </TableCell>

              <TableCell>
                {a.category}
              </TableCell>

              <TableCell>
                {a.marks}
              </TableCell>

              <TableCell>
                <Select
                  value={a.documents?.status}
                  onChange={e =>
                    updateStatus(
                      a._id,
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="Pending">
                    Pending
                  </MenuItem>

                  <MenuItem value="Submitted">
                    Submitted
                  </MenuItem>

                  <MenuItem value="Verified">
                    Verified
                  </MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </Paper>
  );
}