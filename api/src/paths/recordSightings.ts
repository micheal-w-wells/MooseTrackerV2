import { Operation } from "express-openapi";
import { RequestHandler } from "express";
import { openDb, insertSightingMoose } from "../Db/db";

export interface MooseSightingPostBody {
  clientSightingId: string;
  region: string;
  subRegion: string;
  date: Date;
  hoursOut: number;
  tickHairLoss: number;
  bullCount: number;
  cowCount: number;
  calfCount: number;
  unknownCount: number;
}

function postMooseSightings(): RequestHandler {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      await insertSightingMoose(req.body);
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  };
}

export const POST: Operation = postMooseSightings();
POST.apiDoc = {
  summary: "Uploads moose sighting data",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            required: [
              "clientSightingId",
              "date",
              "hoursOut",
              "region",
              "subRegion",
              "tickHairLoss",
              "bullCount",
              "cowCount",
              "calfCount",
              "unknownCount",
            ],
            properties: {
              clientSightingId: {
                type: "string",
              },
              date: {
                type: "string",
              },
              hoursOut: {
                type: "number",
              },
              region: {
                type: "number",
                minimum: 1,
                maximum: 8,
              },
              subRegion: {
                type: "number",
                minimum: 1,
                maximum: 99,
              },
              tickHairLoss: {
                type: "number",
                minimum: -1,
                maximum: 5,
              },
              bullCount: {
                type: "number",
                minimum: 0,
              },
              cowCount: {
                type: "number",
                minimum: 0,
              },
              calfCount: {
                type: "number",
                minimum: 0,
              },
              unknownCount: {
                type: "number",
                minimum: 0,
              },
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "A success response",
      // schema: {
      //   type: "json",
      //   properties: {},
      // },
    },
    default: {
      description: "An error occurred",
      // schema: {
      //   additionalProperties: true,
      // },
    },
  },
};
