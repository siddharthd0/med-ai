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
  Button,
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

const TABLE_HEAD = ["Patient Name", "Email", "Nature", "Preferred Time", "Reason", "Phone Number"];

export function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getAiAppointments"); 
      const data = await response.json();
      console.log("Recieved Data: ", data);
      const fetchedAppointments = data.generated_schedule.objects;
      console.log("Fetched Appointments: ", fetchedAppointments);
      setAppointments(fetchedAppointments);
    }
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen mt-20 mb-40">
      <Card className="max-h-screen overflow-auto w-full pb-4 mx-10">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Appointments
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all appointments, including a filter
                system to your liking.
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
          </div>
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
                    nature,
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
                         {nature}
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
