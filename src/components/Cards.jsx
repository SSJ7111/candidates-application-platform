import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { CardHeader } from "@mui/material";

const Cards = ({ jdList }) => {
  return (
    <>
      <Card sx={{ width: 260 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 230, height: 50 }}
              variant="square"
              aria-label="logoUrl"
            >
              {jdList.logoUrl}
            </Avatar>
          }
        >
          {jdList.companyName}
        </CardHeader>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Position: {jdList.jobRole}
          </Typography>
          <Typography sx={{ fontSize: 12, marginBottom: 1 }}>
            Description: {jdList.jobDetailsFromCompany}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Salary: {jdList.maxJdSalary} {jdList.salaryCurrencyCode}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Job Location: {jdList.location}
          </Typography>
          <Typography variant="body2">
            Experience: {jdList.minExp} - {jdList.maxExp}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Apply</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Cards;
