import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "src/components/styled/WidgetWrapper";
import { useTheme } from "@emotion/react";
import { setAppointments } from "src/redux";
import AppointRequest from "./AppointRequest";
import { Typography } from "@mui/material";
const Appointment = ({ userId, UserAppointments }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  return (
    <>
      <WidgetWrapper>
        <Typography variant="h5" color={dark}>
          Your Appointment Requests
        </Typography>
        {UserAppointments?.map((appointment, index) => (
          <AppointRequest
            key={index}
            requestId={appointment._id}
            sender={appointment.createdBy}
            message={appointment.description}
          />
        ))}
      </WidgetWrapper>
    </>
  );
};

export default Appointment;
