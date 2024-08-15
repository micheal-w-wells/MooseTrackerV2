import { useEffect, useRef } from "react";
import "./Sightings.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useSelector, useDispatch } from "react-redux";
import { SYNC_SIGHTINGS_TO_DB } from "../state/actions";
import { formatDateString } from "../util";

export const Sightings = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;

  const dispatch = useDispatch();
  console.log("%Sightings render:" + ref.current.toString(), "color: yellow");

  const storedSightings = useSelector((state: any) => state.MooseSightingsState.allSightings);

  const currentPage = window.location.href;

  return (
    <div className="sightingContainer">
      <span className="wrapper">
        <div className="sightingHeader">
          <div className="sightingHeadingText">
            <h2>All Sightings</h2>
          </div>
          <button className="syncButton" onClick={() => dispatch({ type: SYNC_SIGHTINGS_TO_DB, payload: {} })}>
            Sync
          </button>
        </div>
        <div className="sightingText">
          {storedSightings?.length > 0 ?
            storedSightings?.map((sighting: any) => {
              return (
                <Accordion key={sighting.id} className="sighting">
                  <AccordionSummary className="sightingHeader" aria-controls="panel-content">
                    <div className="sightingDate">{formatDateString(sighting.dateFrom)} to {formatDateString(sighting.dateTo)}</div>
                    <div className="sightingStatus">&nbsp;({sighting.status})</div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>{sighting.region} {sighting.subRegion}</div>
                    <div>Moose count: {sighting.mooseCount}</div>
                    {/* TODO: tick hair loss not yet implemented */}
                    {/* <div>Tick hair loss: {sighting.tickHairLoss} </div> */}
                    <div>Sync date: {sighting.syncDate ?? '(not synced)'}</div>
                  </AccordionDetails>
                </Accordion>
              );
            })
            :
            <p className="noSightings">No stored sightings currently</p>
          }
        </div>
      </span>
    </div>
  );
};
