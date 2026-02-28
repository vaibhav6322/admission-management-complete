import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Chip
} from "@mui/material";
import api from "../../services/api";

export default function FeeUpdate() {

  const [admissions, setAdmissions] = useState([]);

    //  LOAD ADMISSIONS
  const loadAdmissions = async () => {
    const res = await api.get("/admission");
    setAdmissions(res.data);
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

    //  UPDATE FEE STATUS
  const updateFee = async (id, status) => {

    await api.patch(
      "/admission/fee",
      {
        admissionId: id,
        feeStatus: status
      }
    );

    loadAdmissions();
  };

  return (
    <Paper sx={{ p: 4 }}>

      <Typography variant="h5">
        Fee Status Update
      </Typography>

      <Table sx={{ mt: 2 }}>

        <TableHead>
          <TableRow>
            <TableCell>Applicant</TableCell>
            <TableCell>Program</TableCell>
            <TableCell>Quota</TableCell>
            <TableCell>Seat Status</TableCell>
            <TableCell>Fee Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {admissions.map(a => (

            <TableRow key={a._id}>

              <TableCell>
                {a.applicant?.firstName}
              </TableCell>

              <TableCell>
                {a.program?.name}
              </TableCell>

              <TableCell>
                {a.quota}
              </TableCell>

              <TableCell>
                <Chip
                  label={a.status}
                  color="primary"
                />
              </TableCell>

              {/* Fee Update Dropdown */}
              <TableCell>

                <Select
                  value={a.feeStatus}
                  onChange={e =>
                    updateFee(
                      a._id,
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="Pending">
                    Pending
                  </MenuItem>

                  <MenuItem value="Paid">
                    Paid
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