import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip
} from "@mui/material";
import api from "../../services/api";

export default function AdmissionConfirmation() {

  const [admissions, setAdmissions] = useState([]);

    //  LOAD ADMISSIONS
  const loadAdmissions = async () => {
    const res = await api.get("/admission");
    setAdmissions(res.data);
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

    //  CONFIRM ADMISSION
  const confirmAdmission = async (id) => {

    try {

      await api.post(
        "/admission/confirm",
        { admissionId: id }
      );

      alert("Admission Confirmed ");

      loadAdmissions();

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Confirmation Failed"
      );
    }
  };

  return (
    <Paper sx={{ p: 4 }}>

      <Typography variant="h5">
        Admission Confirmation
      </Typography>

      <Table sx={{ mt: 2 }}>

        <TableHead>
          <TableRow>
            <TableCell>Applicant</TableCell>
            <TableCell>Program</TableCell>
            <TableCell>Quota</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Admission No</TableCell>
            <TableCell>Action</TableCell>
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

              {/* Fee Status */}
              <TableCell>
                <Chip
                  label={a.feeStatus}
                  color={
                    a.feeStatus === "Paid"
                      ? "success"
                      : "warning"
                  }
                />
              </TableCell>

              {/* Admission Status */}
              <TableCell>
                <Chip
                  label={a.status}
                  color="primary"
                />
              </TableCell>

              {/* Admission Number */}
              <TableCell>
                {a.admissionNumber || "-"}
              </TableCell>

              {/* Confirm Button */}
              <TableCell>

                {!a.admissionNumber && (
                  <Button
                    variant="contained"
                    disabled={
                      a.feeStatus !== "Paid"
                    }
                    onClick={() =>
                      confirmAdmission(a._id)
                    }
                  >
                    Confirm
                  </Button>
                )}

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
}