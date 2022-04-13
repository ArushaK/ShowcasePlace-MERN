import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: 1,
    title: "Empire State Building",
    description: "One of the most famous sky scrapers",
    imageUrl: "xyz",
    address: "20c NYC",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: 2,
    title: "Empire State Building",
    description: "One of the most famous sky scrapers",
    imageUrl: "xyz",
    address: "20c NYC",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

function UserPlaces(props) {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
