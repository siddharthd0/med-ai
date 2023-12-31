import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Text,
  Button,
  Badge,
  Modal,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = [
  "Patient Name",
  "Email",
  "Doctors Note",
  "Start Time",
  "Urgency",
  "Provider",
  "Exam Room",
  "Phone Number",
];

export function AppointmentTable() {

  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getAiAppointment");
      const data = await response.json();
      console.log("Received Data: ", data);

      // Assuming data[0].generated_schedule is the array of appointments (Note the change here)
      const fetchedAppointments =
        data.length > 0 ? data[0].generated_schedule : [];

      // Normalize exam_room and phoneNumber to ensure they are plain numbers/strings
      const normalizedAppointments = fetchedAppointments.map((app) => ({
        ...app,
        exam_room: app.exam_room, // Assuming these are already numbers
        phoneNumber: app.phoneNumber, // Assuming these are already numbers
      }));

      console.log("Fetched Appointments: ", normalizedAppointments);
      setAppointments(normalizedAppointments);
    }

    fetchData();
  }, []);

  const sendNotification = async (appointment) => {
     let { email, phoneNumber, doctors_note, change_reason } = appointment; // Make sure these fields exist in your `appointment` object
    change_reason = change_reason || "No reason provided, preferred time given";
    console.log("Sending notification with data:", { email, phoneNumber, doctors_note, change_reason });
    try {
      // Make a POST request to your new API route to send the email and SMS
      const response = await fetch('/api/ai-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phoneNumber, doctors_note, change_reason}),
      });
      
      const data = await response.json();
      console.log('Notification response:', data);

      if (response.status !== 200) {
        console.error('Failed to send notification:', data);
      }
    } catch (error) {
      console.error('Error occurred while sending the notification:', error);
    }
  };


  return (
    <div className="flex justify-center items-start min-h-screen mt-20 mb-40">
      <Card className="max-h-screen overflow-auto w-full pb-4 mx-10">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                AI Scheduled Appointments
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all appointments scheduled by AI, including a filter
                system to your liking.
              </Typography>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-24">
            <Tabs value="all" className="w-full md:w-max ">
              <TabsHeader className="bg-gradient-to-tr from-blue-500/[.25] to-cyan-400/[.25] ">
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72 mr-4.5">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5 " />}
              />
            </div>
          </div> */}
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map(
                (
                  {
                    start_time,
                    exam_room,
                    provider,
                    patient,
                    email,
                    urgency,
                    doctors_note,
                    phoneNumber,
                  },
                  index
                ) => {
                  const classes =
                    index === appointments.length - 1
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {patient}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {doctors_note}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {start_time}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {urgency}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {provider}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {exam_room}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phoneNumber}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
       
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          {/* Your footer content here */}
        </CardFooter>
      </Card>
    </div>
  );
}
