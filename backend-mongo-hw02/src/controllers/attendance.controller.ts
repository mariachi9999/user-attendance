import { Request, Response } from "express";
import { getMongoManager, getRepository } from "typeorm";
import { Attendance } from "../entity/Attendance";

// const manager = getMongoManager();

export const getAttendance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("llegó a getAttendance");
  let attendances;
  attendances = await getRepository(Attendance).find();
  return res.json(attendances);
};

export const getAttendanceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.params.id);
  const results = await getRepository(Attendance).find({
    user_id: req.params.id,
  });
  return res.json(results);
};

export const createAttendance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("llegó a create");
  console.log(req.body);
  const { start_time, end_time, date, notes, user_id } = req.body;
  const attendance = new Attendance();
  attendance.start_time = start_time;
  attendance.end_time = end_time;
  attendance.date = date;
  attendance.notes = notes;
  attendance.user_id = user_id;

  const results = await getRepository(Attendance).save(attendance);
  return res.json(results);
};

export const updateAttendance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const attendance = await getRepository(Attendance).findOne(req.params.id);
  if (attendance) {
    getRepository(Attendance).merge(attendance, req.body);
    const results = await getRepository(Attendance).save(attendance);
    return res.json(results);
  }

  return res.json({ msg: "Not attendance found" });
};

export const deleteAttendance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("llegó a delete");
  console.log(req.body);
  const { id, user_id } = req.body;
  const attendance = await getRepository(Attendance).findOne(id);
  console.log(attendance.user_id);
  console.log(user_id);
  let results;
  if (attendance.user_id === user_id) {
    results = await getRepository(Attendance).delete(id);
  } else {
    results = {
      message:
        "Sorry, you couldn´t delete this attendance because it´s not register on this user id.",
    };
    return res.status(403).json({ results, status: 403 });
  }

  return res.json(results);
};
