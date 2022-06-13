import express, { Request, Response } from "express";
import { authenticateToken } from '../utils/jwtAuth';
import { collections } from "../database/database";
import { JobPosition } from "../consume-api-service/models/domain";


export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = (await collections.jobs!.find({}).toArray()) as unknown as JobPosition[];
        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send(error);//.message);
    }
}

export const postJob = async (req: Request, res: Response) => {
    try {
        const newJob = req.body as JobPosition;
        const result = await collections.jobs!.insertOne(newJob);

        result
            ? res.status(201).send(`Successfully created a new job with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new job.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);//.message);
    }
}