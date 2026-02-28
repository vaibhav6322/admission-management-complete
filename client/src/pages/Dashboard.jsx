import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import api from "../services/api";

export default function Dashboard() {

  const [data, setData] = useState(null);

    //  LOAD DASHBOARD DATA
  useEffect(() => {
    api.get("/dashboard")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <h3>Loading Dashboard...</h3>;

  return (
    <div>

      <Typography variant="h4" mb={3}>
        Admission Dashboard
      </Typography>

//    SUMMARY CARDS
      <Grid container spacing={3}>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography>Total Programs</Typography>
              <Typography variant="h5">
                {data.stats.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography>
                Pending Documents
              </Typography>
              <Typography variant="h5">
                {data.pendingDocs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography>
                Fee Pending
              </Typography>
              <Typography variant="h5">
                {data.pendingFees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      //  BAR CHART
      <Paper sx={{ mt: 4, p: 3 }}>

        <Typography variant="h6">
          Intake vs Filled Seats
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={data.stats}>
            <XAxis dataKey="program" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="filled" />
          </BarChart>
        </ResponsiveContainer>

      </Paper>

      {/* ================= PROGRAM TABLE ================= */}
      <Paper sx={{ mt: 4, p: 3 }}>

        <Typography variant="h6">
          Seat Status
        </Typography>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Program</TableCell>
              <TableCell>Intake</TableCell>
              <TableCell>Filled</TableCell>
              <TableCell>Remaining</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {data.stats.map((p, i) => (

              <TableRow key={i}>
                <TableCell>
                  {p.program}
                </TableCell>

                <TableCell>
                  {p.intake}
                </TableCell>

                <TableCell>
                  {p.filled}
                </TableCell>

                <TableCell>
                  {p.remaining}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </div>
  );
}