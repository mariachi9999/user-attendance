import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { getAttendance } from "../services/user.service";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let users;
  if (req.query.nickname) {
    users = await getRepository(User).find({ nickname: req.query.nickname });
  } else if (req.query.firstname || req.query.lastname) {
    if (!req.query.firstname) {
      users = await getRepository(User).find({
        lastname: req.query.lastname,
      });
    } else if (!req.query.lastname) {
      users = await getRepository(User).find({
        firstname: req.query.firstname,
      });
    } else {
      users = await getRepository(User).find({
        firstname: req.query.firstname,
        lastname: req.query.lastname,
      });
    }
  } else {
    users = await getRepository(User).find();
  }
  return res.json(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("llegó a getUserId");
  const attendance = await getAttendance(req.params.id);
  console.log(attendance.data);
  const results = await getRepository(User).findOne(req.params.id);
  // results!.attendance = JSON.stringify(attendance);
  return res.json({ user: results, attendance: attendance.data });
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("llegó a create");
  console.log(req.body);
  const newUser = await getRepository(User).create(req.body);
  const results = await getRepository(User).save(newUser);
  return res.json(results);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  if (user) {
    getRepository(User).merge(user, req.body);
    const results = await getRepository(User).save(user);
    return res.json(results);
  }

  return res.json({ msg: "Not user found" });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("llegó a delete");
  console.log(req.params);
  const results = await getRepository(User).delete(req.params.id);
  return res.json(results);
};
