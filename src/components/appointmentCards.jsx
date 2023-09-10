// AppointmentCards.js
import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button, Select } from "@material-tailwind/react";

const AppointmentCards = () => {
  const [appointments, setAppointments] = useState([]);
  const [isNotificationSent, setNotificationSent] = useState(false);
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getAiAppointment");
      const data = await response.json();
      const fetchedAppointments =
        data.length > 0 ? data[0].generated_schedule : [];
      setAppointments(fetchedAppointments);
    }
    fetchData();
  }, []);

  const sendNotification = async (appointment) => {
    let { email, phoneNumber, doctors_note, change_reason, start_time } =
      appointment; // Make sure these fields exist in your `appointment` object
    change_reason = change_reason || "No reason provided, preferred time given";
    console.log("Sending notification with data:", {
      email,
      phoneNumber,
      doctors_note,
      change_reason,
      start_time,
    });
    try {
      // Make a POST request to your new API route to send the email and SMS
      const response = await fetch("/api/ai-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phoneNumber,
          doctors_note,
          change_reason,
          start_time,
        }),
      });

      const data = await response.json();
      console.log("Notification response:", data);

      if (response.status !== 200) {
        console.error("Failed to send notification:", data);
      }
    } catch (error) {
      console.error("Error occurred while sending the notification:", error);
    }
  };
  const filteredAppointments = filter === "all" ? appointments : appointments.filter(appointment => appointment.urgency === filter);

  return (
    <>
      <h1 className="mx-24 my-4 text-3xl font-semibold text-gray-800">
        Appointments
      </h1>
      
      <div className=" mx-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {appointments.map((appointment, index) => {
          const appointmentDate = new Date(appointment.start_time);
          const userFriendlyDate = `${appointmentDate.toLocaleDateString()} at ${appointmentDate.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}`;
          return (
            <Card key={index}>
              <CardBody>
                <Typography variant="h5" color="blue-gray">
                  <strong>Patient Name:</strong> {appointment.patient}
                </Typography>
                <Typography color="blue-gray" className="mt-1 ">
                  <strong>Patient Email:</strong> {appointment.email}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Nature:</strong> {appointment.nature}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Start Time:</strong> {userFriendlyDate} (Modified by
                  MedSched AI)
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Urgency:</strong> {appointment.urgency}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Exam Room:</strong> {appointment.exam_room}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Phone:</strong> {appointment.phoneNumber}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Doctors Note:</strong> {appointment.doctors_note}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  <strong>Change Reason:</strong>{" "}
                  {appointment.change_reason || "Preferred Time Available"}
                </Typography>
                <div style={{ marginTop: "auto" }}>
                  <Button
                    className="mt-8 float-bottom"
                    onClick={() => sendNotification(appointment)}
                  >
                    Send Notification
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default AppointmentCards;
